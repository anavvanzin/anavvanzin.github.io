#!/usr/bin/env bash
# Build a clean asset tree for Cloudflare Workers (wrangler assets.directory).
# Avoids uploading .git packs and other local/tooling files that break the
# 25 MiB per-asset limit (root cause of Workers Builds failures since 2026-06-24).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${ROOT}/.worker-assets"

rm -rf "${DEST}"
mkdir -p "${DEST}"

# Tracked files only — never .git objects, node_modules, or local junk.
git -C "${ROOT}" archive HEAD | tar -x -C "${DEST}"

# Drop oversize media that exceeds the Workers 25 MiB per-asset limit
OVERSIZE=(
  "assets/wallpaper-engine-ukiyo-e-flowing-topography-1779795277375 (1).mp4"
  "assets/tropical_iconocracy_conference.mp4"
  "assets/tropical_iconocracy_conference_v2.mp4"
  "assets/tropical_iconocracy_vertical_v2.mp4"
)
for rel in "${OVERSIZE[@]}"; do
  rm -f "${DEST}/${rel}"
done

# Belt-and-suspenders ignore file inside the staged tree
cp "${ROOT}/.assetsignore" "${DEST}/.assetsignore"

python3 - <<'PY' "${DEST}"
import sys
from pathlib import Path
root = Path(sys.argv[1])
limit = 25 * 1024 * 1024
bad = []
for p in root.rglob("*"):
    if p.is_file() and p.stat().st_size > limit:
        bad.append((p.stat().st_size, p.relative_to(root).as_posix()))
if bad:
    for size, name in sorted(bad, reverse=True):
        print(f"OVERSIZE {size/1024/1024:.1f} MiB  {name}", file=sys.stderr)
    sys.exit("Worker assets contain files over the 25 MiB Cloudflare limit")
print(f"Staged worker assets OK → {root}")
PY
