#!/bin/bash
set -e
cd "$(dirname "$0")/.."
count=$(ls sorte/assets/*.webp | grep -v verso | wc -l | tr -d ' ')
[ "$count" = "28" ] || { echo "FAIL: $count lâminas, esperava 28"; exit 1; }
big=$(find sorte/assets -name "*.webp" -size +200k | wc -l | tr -d ' ')
[ "$big" = "0" ] || { echo "FAIL: $big arquivos > 200KB"; find sorte/assets -name "*.webp" -size +200k; exit 1; }
echo "PASS: 28 webp, todos <= 200KB"
