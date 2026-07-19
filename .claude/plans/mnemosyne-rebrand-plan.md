# Full Rebranding → "Mnemosyne Viva" (anavanzin.com)

## Pre-work — Skills install (curated · persistent) — DO FIRST, then pause for confirmation before the rebrand build

**Where:** copy selected skill folders into the repo's **`.claude/skills/`** (project-scoped
→ loads in every future session on this repo = persistent) and **commit**. Add `.claude/` to
the deploy strip lists (`scripts/stage-worker-assets.sh` + `.github/workflows/deploy-pages.yml`)
so the skills are **not** published to anavanzin.com (both deploys stage all tracked files).
Method: clone each source repo to `/tmp`, `cp -R` the chosen skill dirs, commit. (New skills
load at session start — they won't appear in *this* session's listing until reload.)

**From `AlterLab-IEU/AlterLab-Academic-Skills` (academic — law/history/DH/social science):**
`core/`: alterlab-deep-research, alterlab-paper-writer, alterlab-paper-reviewer,
alterlab-citation-verifier, alterlab-thesis-supervisor, alterlab-skill-finder,
alterlab-teaching-design · `writing-tools/`: alterlab-literature-review,
alterlab-citation-management, alterlab-peer-review, alterlab-research-grants ·
`research-tools/`: alterlab-qualitative-methods, alterlab-mixed-methods, alterlab-open-science,
alterlab-research-ethics, alterlab-citation-graph · `domain-specific/`:
alterlab-digital-humanities, alterlab-social-science-methods · `social-science-workflow/`:
alterlab-ssci-orchestrator, alterlab-qualitative-analysis, alterlab-text-as-data.
*(Skip: bioinformatics, cheminformatics, clinical, databases, finance, turkish-academia, lab-integrations.)*

**From `wondelai/skills` (design/UX — feeds the rebrand):** refactoring-ui, web-typography,
ux-heuristics, top-design, design-everyday-things, microinteractions.

**Mined from `hesreallyhim/awesome-claude-code` (design, for the rebrand):**
StyleSeed (`bitjaru/styleseed` — ~74 design-judgment rules, brand-agnostic skin systems),
UI Craft (`educlopez/ui-craft` — design-engineering, Nielsen heuristics, a11y). Clone + copy
their SKILL.md folder(s). *(awesome-claude-code itself is a link list, not a pack.)*

~29 curated skills total. Verify each has a `SKILL.md` after copy.

## Context

Ana designed a complete new brand system — **Mnemosyne Viva / ICONOCRACIA** — and
supplied moodboards + design tokens (`mnemosynevivadesigntokens.json`,
`mnemosynevivasitetokens.css`). She confirmed it as the direction ("my favorite
indeed"). This **replaces** the earlier tentative "Direction A". The site today
carries five drifting palettes and Cormorant/Hanken type; this rebrand unifies
everything to one canonical Mnemosyne token system + Playfair Display / DM Sans,
applied **site-wide**.

**Locked decisions:**
- **Name**: the site stays **ana vanzin** (`anavanzin.com`) with the new aesthetic.
  "Mnemosyne Viva" may appear as the editorial-house label for the acervo/atlas,
  but it is **not** the site name and not the focus. `iconocracia.com` stays the
  linked research property.
- **Wordmark**: **replace** the ornate illuminated "ana vanzin.com" cross-stitch
  wordmark with a clean Playfair/woodcut treatment ("ana vanzin · ler é método").
- **Scope**: apply site-wide, staged, all in the existing PR (#68, branch
  `claude/full-rebranding-b8uqck`).

## The Mnemosyne Viva token system (canonical)

| Token | Value | Role |
|---|---|---|
| `--ink` | `#111111` | preto de impressão (text, rules) |
| `--paper` | `#F5F0E6` | papel creme (page ground) |
| `--cream` | `#FFF9EF` | card / panel surface |
| `--sienna` | `#8B3A1A` | primary accent (was rubric) |
| `--sienna-dark` | `#632713` | hover / deep accent |
| `--ochre` | `#D4AF37` | ouro antigo — ornament, frames (was gold) |
| `--aged` | `#7B5E3C` | tinta envelhecida — secondary (replaces amethyst) |
| `--soft` | `#E8DDC8` | soft fill / hairline ground |
| `--line` | `#2A211A` | rule ink | `--muted` `#756451` meta |
| `--night` | `#15110E` | dark ground (footer, cabinet, featured panel) |
| display | **Playfair Display** (fallback Cormorant, Georgia, serif) |
| text | **DM Sans** (fallback Arial, sans) · mono stays JetBrains Mono |
| radius | 2 / 4 / 8 · stroke 1 / 1.5 / 2 |

Design notes (from the JSON): editorial house for archive/atlas/ICONOCRACIA;
**no corporate gradients or dashboard metaphors**; traceable archive cards with
source/fallback states.

## Implementation (staged, one PR)

**Phase 0 — Fonts (hard prerequisite).** Add to `fonts/fetch_fonts.py` `FAMILIES`:
`"Playfair Display": ("playfair-display","Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600")`
and `"DM Sans": ("dm-sans","DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400")`.
Run `python3 fonts/fetch_fonts.py` (keeps existing families so nothing breaks
mid-migration) → downloads woff2 + regenerates `fonts/fonts.css`. Self-hosted,
no runtime CDN (matches the existing pipeline).

**Phase 1 — Canonical tokens.** Set Mnemosyne values as the single source in
`tokens/colors.css` + `tokens/typography.css` and the root `styles.css` `:root`,
and reconcile the `iconocracia/tokens/` duplicate to match. Map the semantic
aliases so consumers follow automatically: `--rubric/--accent → --sienna`,
`--gold → --ochre`, `--amethyst/--lilac → --aged`, `--navy/--deep-blue → --night`,
`--paper/--ink/--cream` as above; add `--sienna-dark`, `--soft`, radii, stroke.
`--font-display: 'Playfair Display', …`; `--font-body: 'DM Sans', …`.

**Phase 2 — Propagate (automatic).** `editorial.css`, `_ds_bundle.js` (pure token
consumer), every `styles.css`-linked page, and the **Tabula** (`WPoster.js` +
`.tabula` CSS, which already use tokens) inherit the new palette/type with no edit.
Change `.tabula` body font-family from `'Crimson Pro'` → `var(--font-body)` (DM Sans).

**Phase 3 — Manual edits** (sources that hardcode hex, won't inherit):
- Inline `<style>` palettes: `index.html`, `landing/index.html`, `video/index.html`,
  `manifesto/index.html`, `manifesto/impressa.html`, `manifesto/manifesto/index.html`,
  `ampulheta.html`.
- Pixel-art **cursor** hexes in `index.html` (two `data:` SVGs).
- JS palettes: `iconocracia/atlas/parts.js`, `manifesto/manifesto.app.js`,
  `iconocracia/radiografia/app.js`, `ampulheta-native.js`.
- Cross-system leak `iconocracia/sysbar.css`; stray `#5a514a` in both `corpus/ficha.css`.

**Phase 4 — Wordmark & imagery.**
- Replace the masthead: swap `assets/wordmark.{png,webp}` for a new Playfair/woodcut
  wordmark **or** a CSS text wordmark ("ana vanzin" Playfair + "ler é método…" DM Sans).
  Simplest robust path: CSS/`<h1>` text wordmark in the new type (no raster dependency).
- Recolor SVG marks to the Mnemosyne palette: `assets/seal.svg`, `sun-seal.svg`,
  `monogram-av*.svg`, `lockup.svg`, `justitia-mark.svg`, `laurel.svg`.
- Regenerate rasters (need image generation): `assets/og-image.png`,
  `assets/avatar-pixel.png` (favicon). Flag which Ana wants redrawn.

**Phase 5 — Naming (light).** Keep "ana vanzin" throughout. Optionally introduce
"Mnemosyne Viva" as the acervo/atlas house label (e.g., a kicker on `iconocracia/`
or an acervo landing). Low priority; confirm placement with Ana.

**Phase 6 — Tests in lockstep** (assert literal hexes/fonts — must update together):
- `tests/tier1-coverage.spec.js` T1.F2.1 paper `rgb(245,240,230)`, T1.F2.2 ink
  `rgb(17,17,17)` + banner accent `rgb(139,58,26)`.
- `tests/tier2-boundaries.spec.js` T2.F2.3 inner bezel ochre `rgb(212,175,55)`;
  T2.F2.5 contrast literals (ink `#111` on paper `#F5F0E6`).
- `tests/tier3-combinations.spec.js` T3.1 h1 `/Playfair Display|serif/`, p `/DM Sans|sans-serif/`.
- Re-run the whole suite; the Tabula specs key off classes/structure and should hold.

**Phase 7 — Design-system rules.** Rewrite the **CLAUDE.md "Design system"** section
to the single Mnemosyne Viva system (retire the two-token-set description; update the
"no Arial/Helvetica" note — DM Sans is the text face, Arial only a fallback; radius is
now 2–4–8, not 0). This codifies the rules (the intent behind
`/create_design_system_rules`).

**Out of scope / deliberately unchanged:** `malleus/*` and `quotes/*` (independent
dark themes) and `future?/` + `assets/*.dc.html` mockups — leave unless Ana asks.

## Critical files
`fonts/fetch_fonts.py`, `fonts/fonts.css`; `tokens/{colors,typography,spacing}.css`,
`iconocracia/tokens/*`, root `styles.css`; inline-palette pages (`index.html`, …);
JS palettes (`iconocracia/atlas/parts.js`, `manifesto/manifesto.app.js`, …);
`WPoster.js` + `.tabula` CSS; `assets/wordmark.*` + SVG marks; the six poster test
specs; `CLAUDE.md`.

## Verification
1. `npm test` (Playwright) green with updated assertions (known-flaky T5.5 aside).
2. `npx http-server . -p 8080` visual pass: `/`, `/mesa/`, `poster.html` (tabula),
   `iconocracia/`, `iconocracia/atlas/`, `manifesto/` — one coherent Mnemosyne palette,
   Playfair headings + DM Sans body, no orphaned old hexes (grep `#F2EAD9|#211B16|#9B2C1C|#9C7C3D|#EFE5CF|#A04030` → 0 in migrated files).
3. Fonts load from `/fonts/*.woff2` only (no `fonts.googleapis.com` at runtime).
4. Contrast ink-on-paper ≥ AA. 5. Vercel preview on PR #68.

## Deliverable
Continue on `claude/full-rebranding-b8uqck` (PR #68), staged commits: fonts → tokens →
manual/JS → wordmark/imagery → tests → CLAUDE.md.
