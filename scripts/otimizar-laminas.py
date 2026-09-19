#!/usr/bin/env python3
"""Converte as 28 lâminas MUJO (PNG ~2-3 MB) para webp otimizado em sorte/assets/."""
from pathlib import Path
from PIL import Image

SRC = Path("/Users/ana/Research/o-grande-jogo-das-alegorias/ALEGORIAS/MUJO_28_images")
DST = Path(__file__).resolve().parent.parent / "sorte" / "assets"
DST.mkdir(parents=True, exist_ok=True)

SLUGS = {
    1: "mao-esqueletica", 2: "caveira-derretida", 3: "mariposa-da-alma",
    4: "namakubi", 5: "aoandon", 6: "chochin", 7: "bakuto", 8: "jigoku",
    9: "inoshikacho", 10: "torre-de-raijin", 11: "tsukimi", 12: "chomurasaki",
    13: "sapo-do-tofu", 14: "caveira-e-crisantemo", 15: "katana-893",
    16: "leque-de-chama", 17: "gashadokuro", 18: "yamabushi",
    19: "centesima-chama", 20: "danca-de-ikkyu", 21: "kitsunebi",
    22: "eremita", 23: "fudo-da-balanca", 24: "miko-vendada",
    25: "julgamento-do-tengu", 26: "espelho-de-enma", 27: "chamas-iguais",
    28: "testemunhas-de-pedra",
}

for n, slug in SLUGS.items():
    matches = list(SRC.glob(f"{n}_*.png"))
    assert len(matches) == 1, f"esperava 1 arquivo para {n}, achei {matches}"
    img = Image.open(matches[0]).convert("RGB")
    img.thumbnail((720, 1035), Image.LANCZOS)
    out = DST / f"{slug}.webp"
    img.save(out, "WEBP", quality=82, method=6)
    print(f"{out.name}: {out.stat().st_size // 1024} KB")
print("OK — 28 lâminas")
