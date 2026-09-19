#!/usr/bin/env python3
"""Sprites da Vigilante: mini-lâminas pixeladas (miko, bakuto, mariposa) + variante com chochin aceso."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

SRC = Path("sorte/assets")
DST = Path("assets/vigilante")
DST.mkdir(parents=True, exist_ok=True)

PERSONAGENS = {"miko": "miko-vendada", "bakuto": "bakuto", "mariposa": "mariposa-da-alma"}
W, H = 64, 96

def pixelar(slug):
    img = Image.open(SRC / f"{slug}.webp").convert("RGB")
    img = img.resize((W, H), Image.LANCZOS)          # reduz suave
    img = img.quantize(colors=12).convert("RGB")      # posteriza
    img = img.resize((W, H), Image.NEAREST)           # endurece os pixels
    return img.convert("RGBA")

def com_lanterna(img):
    base = img.copy()
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    cx, cy, r = W - 14, H - 18, 14
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 176, 66, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(6))
    base = Image.alpha_composite(base, glow)
    d2 = ImageDraw.Draw(base)
    d2.ellipse([cx - 4, cy - 5, cx + 4, cy + 5], fill=(255, 209, 130, 255))   # corpo do chochin
    d2.line([cx, cy - 9, cx, cy - 5], fill=(239, 229, 207, 255), width=1)     # haste
    return base

for personagem, slug in PERSONAGENS.items():
    base = pixelar(slug)
    base.save(DST / f"{personagem}.png")
    com_lanterna(base).save(DST / f"{personagem}-lanterna.png")
    print(f"{personagem}: ok")
print("OK — 6 sprites")
