# Mnemosyne Viva rebrand — close-out plan (PR #68)

**Branch:** `claude/full-rebranding-b8uqck` · **PR:** [#68](https://github.com/anavvanzin/anavvanzin.github.io/pull/68)  
**Close-out decision (2026-07-21):** **Option A** — ship the rebrand **without** Phase 5 (house label "Mnemosyne Viva") and **without** regenerating OG/favicon rasters. Both are waived for Definition of Done / merge readiness.

This document is the execution record + merge gate. Historical phase detail remains below for audit; status marks at the top are authoritative.

---

## Status board

| Phase | Status | Evidence / notes |
|---|---|---|
| Pre-work — curated `.claude/skills/` | **Done** | `b21f0c3`. Deploy-excluded via `.gitattributes` `export-ignore` (not strip scripts). |
| 0 — Fonts (Playfair + DM Sans) | **Done** | `c251593`. Also vendored `tokens/source/`. |
| 1 — Canonical tokens (3 places) | **Done** | `e50e01d` (root `styles.css`) + `454429a` (`tokens/` + `iconocracia/tokens/`). |
| 2 — Propagate (`.tabula`, editorial, DS) | **Done** | Bundled in `e50e01d` (`.tabula` font + orphan hexes in `styles.css`). |
| 3 — Manual / JS / JSX / section pages | **Done** | `dc6ea23` → `8830ae3` → `18b6302` → `b141c23` → `873f3af` (3a–3e). |
| 4 — Wordmark + SVG marks | **Done** (partial by design) | `4faae04` + decision note `078be7d`. Direction A typographic wordmark; SVG seals/monograms recoloured. |
| 4b — OG / favicon raster regen | **Done (post-merge)** | OG via `b700ec3`. Favicons/apple-touch regenerated from Motif D `seal.svg` (2026-07-22). `avatar-pixel.png` kept for mesa window chrome only. |
| 5 — House label "Mnemosyne Viva" | **Waived** | Option A. Site name stays **ana vanzin**; no acervo/atlas kicker required for merge. |
| 6 — Playwright assertions | **Done** | Lockstep in `e50e01d` (tier1–3 colour/font literals + anchored regexes). |
| 7 — `CLAUDE.md` design-system rules | **Done** | `e64f020`. |

**Merge-gate work still open (not phases):** suite green confirmation, visual pass on key URLs, PR #68 title/body rewrite (still Tabula — see below), working-tree hygiene before commit (see Gaps / open-decision checklist).

---

## Definition of Done (Option A)

Ship-ready when **all** of the following are true. Explicitly **excluded** from DoD: Phase 5 (house label) and OG/favicon raster regeneration.

1. **Suite green** — `npm test` (Playwright) passes. Isolated `T5.5` scroll-preservation flake (`tests/tier5-adversarial.spec.js`) may be ignored per `CLAUDE.md` / `AGENTS.md`; do not waive other failures.
2. **Visual pass** (local `npx http-server . -p 8080`, desktop + mobile widths) on:
   - `/`
   - `/mesa/`
   - `/poster.html` (Tabula)
   - `/iconocracia/`
   - `/iconocracia/atlas/`
   - `/manifesto/`
   Expect one coherent Mnemosyne palette, Playfair headings + DM Sans body, typographic wordmark on home, no obvious orphaned old brand chrome.
3. **No brand-hex orphans in-scope** — verification grep (below) returns **0 actionable hits** in migrated trees. Out-of-scope trees and categorical-scale values are **allowed** and do **not** block merge.
4. **Fonts** — runtime loads from `/fonts/*.woff2` only on in-scope pages (no `fonts.googleapis.com` on those surfaces).
5. **PR #68** — title + body rewritten for the Mnemosyne rebrand (current text is still the Tabula poster PR — **required close-out task**).
6. **Contrast** — ink-on-paper remains ≥ AA (Mnemosyne values ≈17.6:1; smoke-check on key URLs).
7. **a11y smoke** — key URLs usable on mobile; `prefers-reduced-motion` respected where motion exists (already codified in `CLAUDE.md` / `styles.css`).
8. **Deploy awareness** — GitHub Pages (canonical `anavanzin.com`) and Cloudflare Worker both stage via `git archive`; Workers **25 MiB per-asset** limit still applies to large `.mp4` (strip lists in `scripts/stage-worker-assets.sh` + `.github/workflows/deploy-pages.yml`). Rebrand does not add new oversize media; do not regress strip lists.

**Not in DoD:** Motifs B/D placement; agent-doc palette sweep; Phase 5 copy; OG/favicon redraw; deduping `tokens/` vs `iconocracia/tokens/`; cleaning `assets/Nova Pasta Com Itens/`.

---

## Scope vs verification (no contradictions)

**"Site-wide"** means: main site + linked surfaces that share the Mnemosyne system (root pages, `/mesa/`, Tabula/`poster.html`, `iconocracia/`, `manifesto/`, `apresentacao/` via `tokens/`, section pages migrated in Phase 3). It does **not** mean every file under the repo root.

### Out of scope (deliberately unchanged — allowed remaining hits)

| Path | Why left alone | Typical leftover |
|---|---|---|
| `quotes/` | Independent theme | e.g. `quotes/style.css` `#EFE5CF` / `#211B16` |
| `future?/` | Mockups | e.g. `future?/mockup-manifesto.html` old `--paper/--ink/--rubric/--gold` |
| `malleus/` | Independent dark theme | No old brand hex required; leave alone |
| `aula_di_avancado (1).html` | Standalone lecture deck | Runtime `fonts.googleapis.com` Playfair/DM Sans — **scoped out** |
| `assets/*.dc.html` mockups | Design drafts | Leave unless Ana asks |

### Not brand debt (do not "fix" as orphans)

- **Categorical / regime / country scales** — `--fundacional`, `--normativo`, `--militar`, `--contra-alegoria` (value `#A04030`), `--country-*`. These encode corpus classification; collapsing them onto sienna/ochre destroys the viz. Same rule for regime colours inside `iconocracia/radiografia/app.js` and `iconocracia/atlas-lab/app.js` (pre-existing inconsistency across those two apps is a data-viz decision, not a branding one).
- **Alias comments** in `styles.css` / tokens that say `/* was #9B2C1C */` while the live value is `var(--sienna)` — documentation of the migration, not orphans.
- **Historical docs** under `.agents/`, `docs/superpowers/` — post-merge sweep (below), not merge-blocking.

### Grep guidance (narrow)

```bash
# Brand orphans only — exclude out-of-scope trees and docs/agents
rg -n '#F2EAD9|#211B16|#9B2C1C|#9C7C3D|#EFE5CF|#8A5FA8|#1D2548|#7A5C93' \
  --glob '!quotes/**' --glob '!future?/**' --glob '!malleus/**' \
  --glob '!aula_di_avancado*' --glob '!assets/*.dc.html' \
  --glob '!.agents/**' --glob '!docs/**' --glob '!.claude/**' \
  --glob '!*.md' --glob '!node_modules/**'

# Do NOT treat these as brand debt:
#   --contra-alegoria / --fundacional / --normativo / --militar / --country-*
# Optional: confirm categorical scales still present and distinct
rg -n '--contra-alegoria|--fundacional|--normativo|--militar|--country-' \
  tokens/colors.css iconocracia/tokens/colors.css
```

Expect **0** hex hits that are live brand values on in-scope pages. Hits only as comments/`was` notes, or the categorical `#A04030` on `--contra-alegoria`, are fine.

---

## Open-decision checklist

| Item | Status |
|---|---|
| Site name = **ana vanzin** (not "Mnemosyne Viva") | **Locked** |
| Wordmark = direction **A** (typographic Playfair + "ler é método") | **Locked** (`078be7d`, shipped `4faae04`) |
| Phase 5 — house label "Mnemosyne Viva" on acervo/atlas | **Waived** (Option A) — may revisit post-merge |
| OG / favicon raster regen | **Waived** (Option A) — keep existing rasters |
| Motif **B** (illuminated initial) — section/chapter use | **Placed** | Home intro lede + `/iconocracia/` hub lede (framed sienna/ochre capital). Reusable `.illuminated` in `styles.css`. |
| Motif **D** (seal + small-caps) — footer / print / future OG | **Placed** | Favicons from `seal.svg`; home `.site-colophon`; iconocracia footer + sysbar brand mark. |
| PR #68 title/body still describe Tabula only | **Remaining close-out task** — rewrite before merge |
| Agent-doc / `.agents` / `docs/superpowers` palette language | **Post-merge** — Phase 7 covered `CLAUDE.md` only |
| Dedupe `tokens/` ↔ `iconocracia/tokens/` to one source | **Follow-up** — not mid-rebrand |
| `assets/Nova Pasta Com Itens/` working-tree relocation mess | **Separate post-merge risk** — do not mix into rebrand commits |

---

## Gaps this plan owns

1. **Categorical-scale do-not-touch** — documented above and in `CLAUDE.md`; verification must not flag `--contra-alegoria` / regime / country tokens as rebrand debt.
2. **PR #68 rewrite** — deliverable for close-out. Current title: *"Redesign poster room as Tabula…"*; body still sells Tabula + workflow-leak removal and explicitly says the site-wide palette is **not** included. Reality on the branch: Tabula base **plus** full Mnemosyne phases 0–4/6/7. Rewrite title/body to lead with Mnemosyne Viva; keep Tabula + leak removal as earlier commits in the same PR narrative.
3. **Agent-doc palette sweep** — `.agents/*`, `docs/superpowers/plans|specs/*` still instruct Cormorant/Hanken / old hexes. **Post-merge** (or a later docs commit); not DoD.
4. **Working tree vs HEAD** — local uncommitted moves under `assets/Nova Pasta Com Itens/` (and mass `D assets/…`) are **not** part of the rebrand. Merge from a clean tree relative to branch HEAD; treat that folder as a separate hygiene task.

---

## a11y / deploy notes (light)

- **Mobile:** include phone-width check on the six key URLs in DoD (wordmark wraps, Tabula plate scroll, mesa shell).
- **Reduced motion:** fades/slides only; honor `prefers-reduced-motion` (see `styles.css` / `CLAUDE.md`).
- **Pages vs Worker:** canonical domain → GitHub Pages; Worker serves staged `.worker-assets/`. Both use `git archive` + strip oversized `.mp4` (>25 MiB). Known oversize tracked media include conference / wallpaper videos — already on strip lists; rebrand must not reintroduce them to the Worker bundle.

---

## Context (locked product decisions)

Ana designed **Mnemosyne Viva / ICONOCRACIA** as the brand system (tokens in `tokens/source/`). It replaces the earlier tentative "Direction A". The live site is unified to one Mnemosyne token system + Playfair Display / DM Sans on in-scope surfaces.

**Locked:**
- **Name**: site stays **ana vanzin** (`anavanzin.com`). "Mnemosyne Viva" is optional editorial-house language — **waived for this ship**.
- **Wordmark**: direction A — clean typographic ("ana vanzin · ler é método").
- **Scope vehicle**: single PR #68 on `claude/full-rebranding-b8uqck`.

### Token system (canonical)

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
| `--line` | `#2A211A` | rule ink · `--muted` `#756451` meta |
| `--night` | `#15110E` | dark ground (footer, cabinet, featured panel) |
| display | **Playfair Display** (fallback Cormorant, Georgia, serif) |
| text | **DM Sans** (fallback Arial, sans) · mono JetBrains Mono |
| radius | 2 / 4 / 8 · stroke 1 / 1.5 / 2 |

Editorial house for archive/atlas/ICONOCRACIA; **no corporate gradients or dashboard metaphors**.

---

## Implementation record (phases — historical detail)

Statuses are on the board above. Detail kept for audit / future agents.

**Phase 0 — Fonts.** ✅ `fonts/fetch_fonts.py` `FAMILIES` includes Playfair Display + DM Sans; `python3 fonts/fetch_fonts.py` → `fonts/fonts.css`. Self-hosted, no runtime CDN on in-scope pages. Commit `c251593`.

**Phase 1 — Canonical tokens.** ✅ Three places (no single import chain):
1. Root `styles.css` `:root` — main site.
2. `tokens/*.css` — `apresentacao/` only.
3. `iconocracia/tokens/*.css` — byte-identical copy for `iconocracia/styles.css`.

Aliases: `--rubric/--accent/--terracotta → --sienna`, golds → `--ochre`, amethyst/lilac → `--aged`, navy/cabinet → `--night`. Keep repo name `--font-body` (not `--font-text`). Commits `e50e01d`, `454429a`.

**Phase 2 — Propagate.** ✅ `styles.css` consumers + `.tabula` (Crimson → `var(--font-body)`; local amethyst/indigo overrides and orphan hexes cleared). `WPoster.js` had no hex/font-family to change.

**Phase 3 — Manual edits.** ✅ Inline palettes, JS/JSX twins, section pages, cursors, sysbar, ficha.css twins — see commits `dc6ea23`…`873f3af`. Inventory in older plan revisions remains a checklist of what was migrated.

**Phase 4 — Wordmark & imagery.** ✅ Direction A live; SVG marks recoloured (`4faae04`). Motifs B/D retained as reusable devices — placement **post-merge**. Raster OG/favicon regen **waived**.

**Phase 5 — Naming.** **Waived** (Option A).

**Phase 6 — Tests.** ✅ Literals updated in tier1–3; silent-pass `serif` substring trap anchored. Known-flaky T5.5 = `tier5-adversarial.spec.js` scroll test (not the challenger2 workflow-leak test).

**Phase 7 — Design-system rules.** ✅ `CLAUDE.md` Mnemosyne section (`e64f020`).

---

## Critical files (shipped surface)

`fonts/fetch_fonts.py`, `fonts/fonts.css`; `tokens/source/*`; `tokens/{colors,typography,spacing}.css`, `iconocracia/tokens/*`, root `styles.css`; migrated inline/JS/JSX pages; `.tabula` in `styles.css`; brand SVGs; Playwright tier1–3; `CLAUDE.md`.

---

## Verified corrections (2026-07-19) — still true, status updated

**A. `.claude/` exclusion** — via `.gitattributes` `export-ignore` + `git archive`, not strip scripts. Do not add redundant `rm -rf`. (`.assetsignore` also lists `**/.claude`.)

**B. Token source** — vendored at `tokens/source/` (`mnemosyne-viva-design-tokens.json`, `mnemosyne-viva-site-tokens.css`). `--soft` lives in JSON; keep in live CSS.

**C. Phase 0** — ~~pending~~ **Done** (`c251593`). Playfair + DM Sans are in `FAMILIES` / `fonts.css`.

**D. `aula_di_avancado (1).html`** — still loads Google Fonts at runtime; **explicitly out of scope** for Option A DoD.

**Out-of-scope leftover hexes** (`quotes/`, `future?/`, mockups) remain expected; grep must exclude them (see Scope vs verification).

**Agent docs** still carry retired palette language — **post-merge** sweep, not Phase 7.

---

## Close-out checklist (merge gate)

- [ ] `npm test` green (T5.5 flake only if isolated)
- [ ] Visual pass: `/`, `/mesa/`, `/poster.html`, `/iconocracia/`, `/iconocracia/atlas/`, `/manifesto/` (desktop + mobile)
- [ ] Brand-orphan grep clean under narrowed scope (categorical scales untouched)
- [ ] Rewrite PR #68 title + body for Mnemosyne rebrand (Tabula as prior work in narrative)
- [ ] Do **not** block on Phase 5, OG/favicon regen, Motifs B/D, agent-doc sweep, or `Nova Pasta Com Itens/`
- [ ] Confirm working tree does not accidentally stage the assets-folder mess into the rebrand merge commit
