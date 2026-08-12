#!/usr/bin/env bash
# Build a clean asset tree for Cloudflare Workers (wrangler assets.directory).
# Avoids uploading .git packs and other local/tooling files that break the
# 25 MiB per-asset limit (root cause of Workers Builds failures since 2026-06-24).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${ROOT}/.worker-assets"

rm -rf "${DEST}"
mkdir -p "${DEST}"

# Tracked files only — never .git objects, node_modules, or local junk. Reading
# worktree attributes makes local validation include an edited .gitattributes;
# in CI the worktree and HEAD are identical.
git -C "${ROOT}" archive --worktree-attributes HEAD | tar -x -C "${DEST}"

# The archive contract is shared by Pages and Workers. Fail closed if a future
# edit to .gitattributes accidentally republishes repository infrastructure.
FORBIDDEN=(
  ".agents"
  ".claude"
  ".github"
  ".remember"
  "future?"
  "scripts"
  "tests"
  "AGENTS.md"
  "CLAUDE.md"
  "README.md"
  "package.json"
  "package-lock.json"
  "playwright.config.js"
  "wrangler.jsonc"
  "vercel.json"
)
for rel in "${FORBIDDEN[@]}"; do
  if [[ -e "${DEST}/${rel}" ]]; then
    printf 'Refusing publish tree with internal path: %s\n' "${rel}" >&2
    exit 1
  fi
done

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

limit_bytes=$((25 * 1024 * 1024))
oversize_found=0
while IFS= read -r -d '' path; do
  bytes="$(wc -c < "${path}" | tr -d '[:space:]')"
  if (( bytes > limit_bytes )); then
    rel="${path#"${DEST}/"}"
    printf 'OVERSIZE %s bytes  %s\n' "${bytes}" "${rel}" >&2
    oversize_found=1
  fi
done < <(find "${DEST}" -type f -print0)

if (( oversize_found )); then
  printf 'Worker assets contain files over the 25 MiB Cloudflare limit\n' >&2
  exit 1
fi

printf 'Staged worker assets OK → %s\n' "${DEST}"
