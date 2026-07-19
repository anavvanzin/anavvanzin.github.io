# Full Rebranding → "Mnemosyne Viva" (anavanzin.com)

## Pre-work — Skills install (curated · persistent) — DO FIRST, then pause for confirmation before the rebrand build

**Where:** copy selected skill folders into the repo's **`.claude/skills/`** (project-scoped
→ loads in every future session on this repo = persistent) and **commit**. Keep `.claude/`
out of the published site via **`.gitattributes`** (`.claude export-ignore` +
`.claude/** export-ignore`) — both deploy paths build from `git archive HEAD`, which
honors `export-ignore`. ✅ Already in place and verified. *(Not done in
`scripts/stage-worker-assets.sh` or `.github/workflows/deploy-pages.yml`; don't look
for it there, and don't add a redundant `rm -rf`. See "Verified corrections" § A.)*
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

**Phase 1 — Canonical tokens.** ⚠️ *Corrected 2026-07-19 — see "Verified corrections".*
There is **no single source**. Root `styles.css` does **not** import `tokens/*.css`
(line 1 imports only `fonts/fonts.css`; the `/* ===== tokens/colors.css ===== */`
lines are section *comments* over an independent palette). Three palettes must be
edited separately:

1. Root `styles.css` `:root` — the one that reaches the **main site** (home, `/mesa/`,
   `poster.html`, and every `styles.css`-linked page). ink `#211B16`, paper `#F2EAD9`,
   `--rubric #9B2C1C`, gold `#9C7C3D`/`--gold-2 #B7934C`, `--lilac #B49AD4`.
2. `tokens/*.css` — consumed **only** by `apresentacao/index.html` (+ one
   `assets/*.dc.html` mockup). ink `#1A1612`, paper `#EFE5CF`, `--terracotta #A04030`,
   `--brand-amethyst #8A5FA8`, `--deep-blue #1D2548`.
3. `iconocracia/tokens/*.css` — **byte-identical copy** of `tokens/*` (diff clean on
   all 4 files), imported by `iconocracia/styles.css`. "Reconcile" = apply the same
   edit twice. Consider deduping to one source in a follow-up, not mid-rebrand.

Map the semantic aliases in each: `--rubric/--accent/--terracotta → --sienna`,
`--gold/--gold-2/--gold-bright → --ochre`, `--amethyst/--lilac/--brand-amethyst → --aged`,
`--navy/--deep-blue/--cabinet-* → --night`, `--paper/--ink/--cream` as above; add
`--sienna-dark`, `--soft`, radii (2/4/8 — currently `--radius-sm:4px`, `--radius:10px`),
stroke. `--font-display: 'Playfair Display', …`; `--font-body: 'DM Sans', …`
(the supplied CSS calls it `--font-text`; **keep the repo's `--font-body`**).

**Phase 2 — Propagate (partial, NOT automatic).** Only `styles.css` consumers inherit
from the Phase 1 step 1 edit. `editorial.css` and `_ds_bundle.js` follow. Editing
`tokens/*` propagates **only to `apresentacao/`** — not the main site.

**Tabula:** `WPoster.js` contains zero hex and zero font-family (2 `var(--rubric)` uses
only) — nothing to change there. `.tabula` CSS lives in root `styles.css` **lines
583–625**, not a separate file. Change `styles.css:585` `font-family:'Crimson Pro',
Georgia, serif` → `var(--font-body)`. ⚠️ `.tabula` also has **hardcoded escapes that
will orphan the poster page** unless changed: local overrides `--amethyst:#7A5C93` and
`--indigo:#1B2B4A` (line 584), plus literals `#F4ECD8` (603), `#EFE6D2` (615),
`#F4ECDA` (617–618), `#D8CDBA` (619), `rgba(33,27,22,.12)` (603),
`rgba(184,146,74,.4)` (619).

**Phase 3 — Manual edits** (sources that hardcode hex, won't inherit).
⚠️ *The original list missed ~35 files.* Full verified inventory:

- Inline `<style>` palettes: `index.html`, `landing/index.html`, `video/index.html`,
  `manifesto/index.html`, `manifesto/impressa.html`, `manifesto/manifesto/index.html`,
  `ampulheta.html`.
- **`styles.css` itself** — has `#F2EAD9 #211B16 #9B2C1C #9C7C3D #EFE5CF` *outside* `:root`.
- Pixel-art **cursor** hexes in `index.html` — `index.html:45` and `:50`, two `data:` SVGs
  (`%23D8B45A %23211B16 %23B08D3C %23C98424 %23F4ECD8` / `%239B2C1C %23D8B45A %23211B16 %23F4ECD8`).
- JS palettes: `iconocracia/atlas/parts.js`, `manifesto/manifesto.app.js`,
  `iconocracia/radiografia/app.js`, `ampulheta-native.js`.
- **JSX twins — must move in lockstep or they silently drift:**
  `iconocracia/atlas/parts.jsx`, `iconocracia/radiografia/app.jsx`,
  `manifesto/app.jsx`, `manifesto/manifesto/app.jsx`, `assets/IconocraciaVideo.jsx`.
- Cross-system leak `iconocracia/sysbar.css` (`#9B2C1C ×3, #211B16 ×2, #F2EAD9, #7D2316`).
- `#5a514a` at **both** `corpus/ficha.css:58` **and** `iconocracia/corpus/ficha.css:58`
  (the second was not named in the original list).
- **Root pages missed:** `advocacia.html`, `conceitos.html`, `mae.html`, `mover-se.html`,
  `perfil.html`, `readme.html`, `sobre.html`, `trabalhos.html`.
- **Sections missed:** `mesa/index.html`, `mesa/index 2.html`, `metodologia/index.html`,
  `sala-de-leitura/index.html`, `grupoiusgentium/index.html`,
  `publicacoes/{index,contrato-visual,maria-marianne,vrouwe-justitia}.html`,
  `atlas/{index,britannia,justitia,marianne,republica}.html`,
  `marginalia/{index,balanca,fachada,justica-nao-nasceu-cega}.html`.
- **Iconocracia missed:** `iconocracia/index.html`, `iconocracia/atlas/index.html`,
  `iconocracia/radiografia/index.html`, `iconocracia/atlas-lab/{index.html,app.js,app.jsx}`,
  `iconocracia/tokens/colors.css`.

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

**Phase 6 — Tests in lockstep** (assert literal hexes/fonts — must update together).
Run with `npm test` (→ `playwright test`).
- `tests/tier1-coverage.spec.js:46-58` — T1.F2.1 paper `rgb(242,234,217)` →
  `rgb(245,240,230)`; T1.F2.2 ink `rgb(33,27,22)` → `rgb(17,17,17)` and h1
  `rgb(155,44,28)` → `rgb(139,58,26)`. Test **titles** embed the old hexes too.
- `tests/tier2-boundaries.spec.js:72-76` — T2.F2.3 bezel `rgb(156,124,61)` →
  `rgb(212,175,55)`. `:85-103` — T2.F2.5 contrast literals.
  ⚠️ T2.F2.5 re-derives contrast from two literals it defines itself; it never reads
  the page, so it passes whatever you type. New values compute ≈17.6:1 vs threshold
  `>7.0` — passes, but the test proves nothing. Consider making it read live CSS.
- `tests/tier3-combinations.spec.js:9-16` — h1 `/Cormorant Garamond|serif/` →
  `/Playfair Display|serif/`; p `/Crimson Pro|serif/` → `/DM Sans|sans-serif/`.
  ⚠️ **Silent-pass trap:** the current `/Crimson Pro|serif/i` already matches
  `"DM Sans", Arial, sans-serif` — because `serif` is a substring of `sans-serif`.
  This test cannot fail the way it looks like it can. Anchor the regex.
  Also: the p assertion only passes once the Phase 2 `.tabula` font change lands.
- Re-run the whole suite; Tabula specs key off classes/structure and should hold.
  ⚠️ "known-flaky T5.5" is ambiguous — there are **two**:
  `tier5-adversarial.spec.js:100` (scroll preservation) and
  `tier5-adversarial-challenger2.spec.js:96` (workflow-leak regression).
  Identify which before waiving it.

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

---

## Verified corrections (2026-07-19)

Every claim in this plan was checked against the repo before execution. Eight
discrepancies found; Phases 1, 2, 3 and 6 above were rewritten accordingly. The
remaining four are new work items not in the original plan:

**A. `.claude/` is correctly excluded — but by a mechanism the plan text misdescribes.**
*(An earlier draft of this section claimed `.claude/` would leak to production. That was
wrong. Verified and retracted 2026-07-19 — recorded here so nobody "fixes" it twice.)*

The pre-work section says `.claude/` was added to the two deploy strip lists
(`scripts/stage-worker-assets.sh`, `.github/workflows/deploy-pages.yml`). Neither file
mentions `.claude`. The exclusion is real, just implemented elsewhere:

- **`.gitattributes`** holds `.claude export-ignore` and `.claude/** export-ignore`.
- **Both** deploy paths build from `git archive HEAD`, which honors `export-ignore`.

Verified empirically: 295 files are tracked under `.claude/`, and
`git archive HEAD | tar -x` extracts **0** of them. `git check-attr export-ignore
.claude/plans/mnemosyne-rebrand-plan.md` → `export-ignore: set`.

→ **No code change needed.** Do not add `rm -rf _site/.claude` to the workflow; it is
redundant. The only defect is documentation: update the pre-work paragraph to say
`.gitattributes`, not the two strip lists. Grepping the workflow/script for `.claude`
will always look like a leak — check `.gitattributes` first.

(`.assetsignore` *also* lists `**/.claude`, giving the Worker path a second layer.)

**B. Token source files are outside the repo, under different names.**
Plan references `mnemosynevivadesigntokens.json` / `mnemosynevivasitetokens.css`.
Actual: `/Users/ana/Downloads/mnemosyne-viva-design-tokens.json` and
`mnemosyne-viva-site-tokens.css` (hyphenated). Values match this plan's table exactly.
→ **Vendor both into the repo** (e.g. `tokens/source/`) before starting, so the brand
spec is version-controlled and not dependent on `~/Downloads`.
Note `--soft: #E8DDC8` exists in the JSON but is **absent** from the CSS.

**C. Phase 0 is genuinely pending.** `fonts/fetch_fonts.py` `FAMILIES` currently holds 5:
Instrument Serif, Crimson Pro, JetBrains Mono, Cormorant Garamond, Hanken Grotesk.
Playfair Display and DM Sans are absent. `fonts/fonts.css` defines the same 5.

**D. One file already violates Verification step 3.**
`aula_di_avancado (1).html:11` loads Playfair Display + DM Sans from
`fonts.googleapis.com` at runtime. Unmentioned in the plan. Either migrate it to the
self-hosted pipeline or explicitly scope it out.

**Confirmed accurate:** the token value table; all 13 originally-listed Phase 3 files
exist and hardcode hex; both cursor SVGs; all Phase 4 assets exist (`monogram-av.svg`,
`monogram-av-inverse.svg`) and all SVG marks hardcode the old palette; `malleus/*` has
**no** old-palette hexes (out-of-scope note holds); `quotes/style.css`,
`future?/mockup-manifesto.html` and `assets/Iconocracia - Manifesto.dc.html` do hit,
so the Verification step-2 grep will not be clean repo-wide.

**Also true but unrelated to the rebrand:** old-palette hexes and Cormorant/Hanken are
hardcoded as *constraints* in 15 doc files — `docs/superpowers/plans/2026-06-27-ciclo-das-soberanias.md`,
`docs/superpowers/specs/2026-06-27-ampulheta-caotica-design.md`,
`docs/superpowers/specs/2026-06-23-manifesto-design.md`, and 10 files under `.agents/`.
Phase 7 only rewrites `CLAUDE.md`. These other docs will keep instructing future agents
to use the retired palette. Worth a sweep once the rebrand lands.
