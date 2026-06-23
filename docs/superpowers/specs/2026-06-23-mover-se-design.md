# Design Spec: Mover-se (Navigation Studio)

**Date:** 2026-06-23
**Status:** Approved (user said "Ambos")
**Project:** anavvanzin.com

## Overview

Mover-se is a navigation studio — a place where users move between the site's sections using one of 4 coexisting paradigms. It's a standalone page (like Manifesto) because each paradigm requires full-screen real estate for its animations and interactions.

## Architecture

- **Type:** Standalone HTML page (`mover-se.html`)
- **Rendering:** Vanilla HTML/CSS/JS (lightweight, fast)
- **Data:** 5 hardcoded sections (thesis, publications, ius gentium, practice, contact)
- **State:** Active paradigm persisted in localStorage (`av_moverse_mode`)
- **Entry point:** Linked from desktop menu ("Mover-se")

## Navigation Paradigms

### 1. Fio Rubrico (Rubric Thread)
- Single rubric-colored thread descends vertically through the page
- Each section is a "knot" on the thread
- Clicking a knot expands the section content
- Thread animates from top to bottom (scaleY)
- Knots pop with spring animation

### 2. Margem Viva (Living Margin)
- Sticky sidebar menu on the left (208px)
- Vertical gutter (1.5px ink line) separating menu from content
- Content panel on the right with section details
- Menu items slide in from left with staggered delays
- Mobile: sidebar becomes horizontal scrollable menu

### 3. A Venda (The Blindfold)
- Each section is covered by a dark overlay (ink background)
- Overlay has rubric left border and "vendado — toque para revelar" text
- Clicking lifts the overlay (translateY -100%)
- "Replay" button re-covers all sections
- Sections drop in with staggered rise animation

### 4. Fichário (Card Catalog)
- Filter chips at top (type-based: tese, texto, nota, prática, contato)
- Grid of cards below (auto-fill, minmax 220px)
- Each card shows: cota (AV·341), type badge, title, gloss
- Cards pop into grid with spring animation
- Hover: slight lift + shadow

## Sections Data

| # | Roman | Title | Gloss | Type | Folio |
|---|-------|-------|-------|------|-------|
| i | i | tese | Iconocracia — as imagens do direito | tese | 01 |
| 1 | ii | publicações | artigos, capítulos e ensaios | texto | 14 |
| 2 | iii | ius gentium | notas de direito internacional | nota | 28 |
| 3 | iv | advocacia | atuação e áreas | prática | 41 |
| 4 | v | contato | ana@anavanzin.com | contato | 52 |

## Visual Design

### Palette
- Background: `var(--paper)` with dot grid
- Text: `var(--ink)` primary
- Accent: `var(--rubric)` for thread, knots, active states
- Blindfold overlay: `var(--ink)` with `var(--rubric)` left border

### Typography
- Section titles: `var(--font-display)`, 600 weight, clamp(1.6rem, 3.6vw, 2.3rem)
- Roman numerals: `var(--font-display)`, italic, 600, rubric color
- Glosses: `var(--text-small)`, `var(--ink-50)`
- Fichário cota: JetBrains Mono, 11px, rubric

### Animations
- **Rise:** translateY(16px) → 0, cubic-bezier(0.22,1,0.36,1)
- **SlideL:** translateX(-14px) → 0
- **Pop:** scale(0.5) → scale(1.14) → scale(1), spring curve
- **Thread:** scaleY(0) → scaleY(1)
- **CardIn:** translateY(14px) scale(0.94) → 0
- All use staggered delays via CSS custom properties

## File Structure

```
anavvanzin/
├── mover-se.html          ← NEW (standalone page)
├── styles.css             ← REUSE (tokens)
├── assets/sun-seal.svg    ← EXISTING
└── fonts/fonts.css        ← EXISTING
```

## Integration

1. **Desktop.js:** Add "mover-se" to MENUS → opens `mover-se.html` in new tab
2. **index.html:** No changes needed

## Success Criteria

- [ ] All 4 paradigms render correctly
- [ ] Paradigm switcher works (bottom controls or tweaks panel)
- [ ] Fio Rubrico: thread animates, knots expand on click
- [ ] Margem Viva: sticky sidebar, content switching
- [ ] A Venda: blindfold lift animation, replay button
- [ ] Fichário: chip filtering, card grid
- [ ] All entrance animations play with staggered delays
- [ ] State persists across reloads
- [ ] Keyboard navigation works
- [ ] Mobile responsive
- [ ] Reduced motion support
