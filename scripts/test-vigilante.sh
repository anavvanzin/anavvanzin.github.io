#!/bin/bash
set -e
cd "$(dirname "$0")/.."
for p in miko bakuto mariposa; do
  for v in "" "-lanterna"; do
    f="assets/vigilante/$p$v.png"
    [ -f "$f" ] || { echo "FAIL: $f ausente"; exit 1; }
  done
done
python - <<'EOF'
from PIL import Image
for p in ["miko","bakuto","mariposa"]:
    for v in ["","-lanterna"]:
        img = Image.open(f"assets/vigilante/{p}{v}.png")
        assert img.mode == "RGBA", f"{p}{v}: sem canal alfa"
        assert img.width <= 128 and img.height <= 192, f"{p}{v}: grande demais {img.size}"
print("PASS: 6 sprites RGBA")
EOF
