# Design Spec: Manifesto · O Núcleo

**Date:** 2026-06-23
**Status:** Draft → Pending User Approval
**Project:** anavvanzin.com

## Overview

The Manifesto is a cinematic slide presentation that communicates the philosophical core of the ICONOCRACIA thesis. It functions as a standalone page (not inside the desktop window system) because slides require full-screen real estate for visual impact.

## Architecture

- **Type:** Standalone HTML page (`manifesto.html`)
- **Rendering:** Vanilla HTML/CSS/JS (no React dependency — keeps it lightweight and fast)
- **Data:** 6 hardcoded slides (content is static, tied to the thesis)
- **State:** Current slide index persisted in `localStorage` (`av_manifesto`)
- **Entry point:** Linked from the desktop's menu bar ("Manifesto") and from the Leitura-Iconografia page

## Slides Content

| # | Type | Eyebrow | Main Phrase | Subtitle |
|---|------|---------|-------------|----------|
| i | Cover | manifesto · o núcleo da tese | **Iconocracia** (with rubric band) | O poder se exerce — e se legitima — pela imagem. |
| ii | Content | — | A primeira Justitia vendada não nasceu como virtude — nasceu como *sátira*. | Narrenschiff, 1494: um bobo ata a venda em zombaria dos tribunais. |
| iii | Content | — | A nação tem corpo de *mulher*. | Justitia, Marianne, Britannia, Germania, a República — a feminilidade de Estado. |
| iv | Content | — | Ler a alegoria como *imagem* — não como ornamento. | Cada atributo carrega uma data, uma polêmica, um corte. |
| v | Content | — | Do escárnio à imparcialidade: uma inversão de *cinco séculos*. | Como uma imagem de crítica se torna emblema de Estado. |
| vi | Closing | — | **ana vanzin** | história e iconografia jurídica · PPGD/UFSC |

## Components

### 1. Top Bar (`.top`)
- Fixed, 48px height, backdrop-blur glass effect
- Brand mark (sun-seal.svg) + "ana vanzin"
- Section label: "manifesto · o núcleo"
- Back link: "← leitura" (returns to desktop or Leitura-Iconografia)

### 2. Slide Deck (`.deck`)
- Full viewport minus top bar and controls
- Each slide is absolutely positioned, toggled via `.on` class
- Slide types: `cover`, `content`, `close`
- Each slide has a folio number (roman numerals: i–vi)

### 3. Navigation Controls
- **Arrow buttons:** Prev/Next with double-bezel styling
- **Dot indicators:** Current slide highlighted in rubric
- **Click zones:** Left 24% = prev, right 24% = next
- **Keyboard:** ArrowRight/Space = next, ArrowLeft = prev
- **Counter:** "01 / 06" in JetBrains Mono, bottom-right

### 4. Animations
- **Entrance:** `rise` — translateY(20px) → 0, cubic-bezier(0.22,1,0.36,1)
- **Risco (rubric line):** width 0 → 120px, cubic-bezier(0.5,0,0.18,1)
- **Staggered delays:** eyebrow 0.12s, phrase 0.2s, subtitle 0.42s
- **Cover band:** Static rubric line across "Iconocracia" text
- **Reduced motion:** All animations disabled via `prefers-reduced-motion`

## Visual Design

### Palette
- Background: `var(--paper)` with dot grid overlay (`radial-gradient`)
- Text: `var(--ink)` for primary, `var(--ink-70)` for secondary
- Accent: `var(--rubric)` for eyebrows, emphasis, active states
- Controls: `var(--paper)` background, `var(--ink)` border, 3px shadow

### Typography
- Display phrases: `var(--font-display)` (Cormorant Garamond), 500 weight
- Subtitles: `var(--font-display)` italic, `var(--text-lead)` size
- Eyebrows: uppercase, `var(--tracking-eyebrow)`, `var(--text-eyebrow)` size
- Counter: JetBrains Mono, 12px

### Layout
- Slides centered vertically and horizontally
- Max phrase width: 18ch (balance)
- Subtitle max-width: 48ch
- Controls fixed at bottom, 56px height

## Interaction Flow

```
User clicks "Manifesto" in desktop menu
  → manifesto.html opens (standalone)
  → First slide (cover) displayed with entrance animation
  → User navigates via arrows / dots / keyboard / click zones
  → Slide state saved to localStorage
  → "← leitura" link returns to the desktop
```

## Error Handling

- If localStorage is unavailable, slides still work (just no persistence)
- If fonts fail to load, Georgia/Times fallback (already in token definitions)
- Keyboard navigation prevents going past bounds (0 to slides.length-1)

## Mobile Considerations

- Slides scale text via `clamp()` functions
- Click zones reduced on mobile (touch-friendly)
- Arrow buttons remain accessible
- No horizontal swipe (vertical scroll disabled via `overflow: hidden`)

## File Structure

```
anavvanzin/
├── manifesto.html          ← NEW (standalone page)
├── styles.css              ← REUSE (tokens already loaded)
├── assets/
│   └── sun-seal.svg        ← EXISTING (brand mark)
└── fonts/
    └── fonts.css           ← EXISTING (font faces)
```

## Integration Points

1. **Desktop.js:** Add "Manifesto" to MENUS array → opens `manifesto.html` in new tab/window
2. **Leitura-Iconografia:** Back link can point to `manifesto.html`
3. **index.html:** No changes needed (manifesto is standalone)

## Success Criteria

- [ ] All 6 slides render correctly with proper typography
- [ ] Entrance animations play on slide change
- [ ] Risco (rubric line) animates on slides ii and v
- [ ] Navigation works: arrows, dots, keyboard, click zones
- [ ] State persists across page reloads (localStorage)
- [ ] Back link returns to desktop
- [ ] Mobile: text scales, controls accessible
- [ ] Reduced motion: no animations
- [ ] Performance: no layout thrashing, GPU-safe animations only
