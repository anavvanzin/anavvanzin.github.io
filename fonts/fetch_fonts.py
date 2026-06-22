#!/usr/bin/env python3
"""Regenerate the self-hosted webfonts for anavanzin.com.

Fetches each family's Google Fonts CSS2, keeps the latin + latin-ext subsets
(full coverage for Portuguese + English), downloads the woff2, and writes a
fonts.css with correct @font-face rules using relative ./ urls.

These are variable fonts: one woff2 carries the whole weight axis, so
byte-identical files (Google serves the same blob for several requested
weights) are collapsed into a single file + one @font-face with a merged
`font-weight: <min> <max>` range. This removes the runtime Google Fonts CDN
dependency for the whole brand site.

Run:  python3 fonts/fetch_fonts.py     (from the repo root, or anywhere)
Output is written next to this script (the fonts/ directory).
"""
import hashlib
import re
import urllib.request
from pathlib import Path

OUT_DIR = Path(__file__).resolve().parent
KEEP_SUBSETS = {"latin", "latin-ext"}
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

# family display name -> (slug, CSS2 query). Order = brand display, brand body, dev mono.
FAMILIES = {
    "Cormorant Garamond": ("cormorant-garamond", "Cormorant+Garamond:ital,wght@0,500;0,600;1,500"),
    "Hanken Grotesk":     ("hanken-grotesk",     "Hanken+Grotesk:wght@400;500;600"),
    "JetBrains Mono":     ("jetbrains-mono",     "JetBrains+Mono:wght@400;500;700"),
}

BLOCK_RE = re.compile(r"/\*\s*(?P<subset>[\w-]+)\s*\*/\s*(?P<face>@font-face\s*\{.*?\})", re.S)


def field(face, name):
    m = re.search(rf"{name}:\s*([^;]+);", face)
    return m.group(1).strip() if m else ""


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=30).read()


def main():
    # purge old woff2 so a regen never leaves orphans
    for old in OUT_DIR.glob("*.woff2"):
        old.unlink()

    # collect faces across all families
    faces = []  # dict(family, slug, style, weight, subset, urange, url)
    for family, (slug, query) in FAMILIES.items():
        css = fetch(f"https://fonts.googleapis.com/css2?family={query}&display=swap").decode("utf-8")
        for m in BLOCK_RE.finditer(css):
            subset = m.group("subset")
            if subset not in KEEP_SUBSETS:
                continue
            face = m.group("face")
            url_m = re.search(r"url\((https://[^)]+\.woff2)\)", face)
            if not url_m:
                continue
            faces.append({
                "family": family, "slug": slug,
                "style": field(face, "font-style"),
                "weight": int(field(face, "font-weight")),
                "subset": subset, "urange": field(face, "unicode-range"),
                "url": url_m.group(1),
            })

    # download once per url, dedupe identical bytes by content hash
    url_bytes, hash_name = {}, {}
    for f in faces:
        if f["url"] not in url_bytes:
            url_bytes[f["url"]] = fetch(f["url"])
        f["hash"] = hashlib.sha256(url_bytes[f["url"]]).hexdigest()

    # group faces sharing (family, style, subset, hash) -> one file + weight range
    groups = {}
    for f in faces:
        groups.setdefault((f["slug"], f["style"], f["subset"], f["hash"]), []).append(f)

    blocks, written = [], {}
    used_names = set()
    for (slug, style, subset, h), members in groups.items():
        weights = sorted({m["weight"] for m in members})
        subtag = subset.replace("-", "")
        styletag = "" if style == "normal" else f"-{style}"
        base = f"{slug}{styletag}-{subtag}"
        name = f"{base}.woff2"
        # disambiguate only if a non-variable family produced two hashes for the same base
        if name in used_names:
            name = f"{base}-{weights[0]}.woff2"
        used_names.add(name)

        if h not in written:
            (OUT_DIR / name).write_bytes(url_bytes[members[0]["url"]])
            written[h] = name

        weight_decl = str(weights[0]) if len(weights) == 1 else f"{min(weights)} {max(weights)}"
        blocks.append((subset, "\n".join([
            "@font-face {",
            f"  font-family: '{members[0]['family']}';",
            f"  font-style: {style};",
            f"  font-weight: {weight_decl};",
            "  font-display: swap;",
            f"  src: url(./{written[h]}) format('woff2');",
            f"  unicode-range: {members[0]['urange']};",
            "}",
        ])))

    header = (
        "/* anavanzin.com - self-hosted webfonts (latin + latin-ext).\n"
        "   Cormorant Garamond (display) + Hanken Grotesk (body/UI) + JetBrains Mono (dev/readme).\n"
        "   Variable fonts: one file per family/style/subset, weight given as a range.\n"
        "   No Google Fonts CDN at runtime. Regenerate via fonts/fetch_fonts.py. */\n\n"
    )
    (OUT_DIR / "fonts.css").write_text(header + "\n".join(b for _, b in blocks) + "\n", encoding="utf-8")
    print(f"{len(faces)} faces -> {len(written)} files, {len(blocks)} @font-face rules")
    for n in sorted(written.values()):
        print(f"  {n}")


if __name__ == "__main__":
    main()
