# Design Spec: Sala de Leitura (React)

**Date:** 2026-06-23
**Status:** Draft → Pending User Approval
**Project:** anavvanzin.com

## Overview

The Sala de Leitura is an annotated reading room — shelves of books, articles, and sources organized by research theme. It renders inside the desktop window system as a React component, consistent with the existing architecture.

## Architecture

- **Type:** React component (`WSalaLeitura.js`) rendered inside desktop windows
- **Data:** Embedded in component (6 themes, 4 shelves, ~12 reading items)
- **State:** Active theme filter (`useState`)
- **Bilingual:** PT primary, EN secondary (toggled via desktop language)

## Data Structure

### Themes (6)
| # | Slug | PT | EN |
|---|------|----|----|
| 01 | justica-cegueira | justiça e cegueira | justice and blindness |
| 02 | nacao-republica | nação e república | nation and republic |
| 03 | direito-violencia | direito e violência | law and violence |
| 04 | alegoria-feminina | alegoria feminina | feminine allegory |
| 05 | soberania-visual | soberania visual | visual sovereignty |
| 06 | colonialidade-ver | colonialidade do ver | coloniality of seeing |

### Shelves (4)
| Slug | PT | Items |
|------|----|-------|
| lei-imagem | Lei e imagem | 3 books |
| alegoria-corpo | Alegoria e corpo | 3 books |
| metodo | Método: atlas e iconologia | 3 books |
| nacao-genero | Nação, gênero e direito | 2 books |

### Reading Item Shape
```
{ author, year, title: { pt, en }, line: { pt, en } }
```

## Components

### 1. ShelfHeader
- Shelf title (large, serif)
- Theme tags (pill buttons showing which themes this shelf belongs to)
- Shelf note (italic subtitle)

### 2. ReadingList
- Table-like layout: author | title (italic) | year | research line
- Alternating row subtle background
- Responsive: stacks on mobile

### 3. ThemeFilter
- Row of pill buttons (one per theme + "all")
- Active state: filled background in rubric color
- Filters shelves by theme (hides non-matching)

### 4. WindowHeader
- Standard double-bezel title bar
- Title: "sala de leitura" / "reading room"
- Monogram icon

## Visual Design

### Palette
- Background: `var(--paper)` with dot grid
- Text: `var(--ink)` primary, `var(--ink-70)` secondary
- Accent: `var(--rubric)` for active filters, links
- Shelf headers: `var(--ink)` with `var(--rubric)` number

### Typography
- Shelf titles: `var(--font-display)`, 600 weight, `clamp(1.4rem, 3vw, 2rem)`
- Reading items: `var(--font-body)`, 14px, line-height 1.6
- Title column: `var(--font-display)`, italic
- Year column: `var(--font-display)`, 500 weight, faint color
- Research line: italic, `var(--ink-70)`

### Layout
- Shelves stacked vertically with 48px gap
- Each shelf: header + note + reading list
- Reading list: CSS grid (author 1fr | title 1.5fr | year 0.3fr | line 1.5fr)
- Mobile: single column, year moves to top-right of each item

## Interaction Flow

```
User clicks "Leitura" in desktop menu
  → Window opens with WSalaLeitura component
  → All 4 shelves displayed
  → User clicks theme filter pill
  → Non-matching shelves fade out (opacity transition)
  → User clicks "all" to reset
```

## File Structure

```
anavvanzin/
├── WSalaLeitura.js       ← NEW (React component)
├── window-contents.js    ← MODIFY (register component)
├── Desktop.js            ← MODIFY (add to REG, MENUS, DESK_ICONS)
└── styles.css            ← REUSE (tokens)
```

## Success Criteria

- [ ] All 4 shelves render with correct data
- [ ] Theme filter works (filters shelves by theme)
- [ ] Bilingual support (PT/EN toggle)
- [ ] Responsive layout (mobile stacks)
- [ ] Integrates with desktop window system
- [ ] Animations: shelf entrance (fadeSlideUp)
- [ ] No console errors
