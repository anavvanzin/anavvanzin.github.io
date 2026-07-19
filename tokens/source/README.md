# Mnemosyne Viva — brand source of truth

These two files are the **authored brand spec**, not build output. Nothing generates
them; they were designed by Ana and supplied as the canonical definition of the
Mnemosyne Viva / ICONOCRACIA system (dated 2026-07-02).

| File | Role |
|---|---|
| `mnemosyne-viva-design-tokens.json` | Canonical values: colors, type, layout, components, design notes |
| `mnemosyne-viva-site-tokens.css` | The same palette as CSS custom properties, plus 4 sample component classes |

Vendored into the repo 2026-07-19. They previously existed only in `~/Downloads/`,
which made the brand definition un-versioned and machine-local.

## How these relate to the live CSS

These files are the **reference**. They are not imported by any page. The live token
definitions are hand-maintained in three separate places, and edits must be applied
to each:

1. Root `styles.css` `:root` — reaches the main site (home, `/mesa/`, `poster.html`,
   and every `styles.css`-linked page)
2. `tokens/*.css` — consumed **only** by `apresentacao/`
3. `iconocracia/tokens/*.css` — a byte-identical copy of `tokens/*`, imported by
   `iconocracia/styles.css`

Root `styles.css` does **not** import `tokens/*.css`. The `/* ===== tokens/colors.css ===== */`
lines inside it are section comments, not imports.

## Two naming deltas to preserve

- The CSS here calls the text face `--font-text`. **The repo uses `--font-body`** —
  keep the repo's name when porting.
- `--soft: #E8DDC8` exists in the JSON but is **absent** from the CSS. The JSON is
  authoritative.

## Related

Migration plan and its verified corrections: `.claude/plans/mnemosyne-rebrand-plan.md`.
Fonts are self-hosted via `fonts/fetch_fonts.py` — no runtime Google Fonts CDN.
