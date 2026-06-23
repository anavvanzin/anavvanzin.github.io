# Manifesto · O Núcleo — Implementation Plan

> **For agentic workers:** Use subagent-driven-development (recommended) or executing-plans to implement task-by-task.

**Goal:** Create a cinematic slide-based Manifesto page for anavanzin.com with 6 animated slides, keyboard/dot/arrow navigation, and localStorage persistence.
**Architecture:** Standalone HTML page (`manifesto.html`) using vanilla JS, reusing existing CSS tokens from `styles.css`. No React dependency.
**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS, existing font files and brand assets.

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `manifesto.html` | Standalone slide presentation page |
| Modify | `Desktop.js` | Add "Manifesto" to MENUS + MENU_LABEL + open behavior |
| Modify | `index.html` | Add `manifesto.html` link (optional, for direct access) |

---

### Task 1: Create manifesto.html — Structure & Styles

**Files:**
- Create: `manifesto.html`

**Steps:**

- [ ] **Step 1: Write the HTML structure**
  Create `manifesto.html` with:
  - `<!doctype html>`, lang="pt", viewport meta, title "Manifesto · ana vanzin"
  - Favicon: `assets/sun-seal.svg`
  - Stylesheet: `styles.css` (existing tokens)
  - Inline `<style>` block for manifesto-specific styles
  - Top bar (`.top`) with brand, section label, back link
  - Slide deck (`.deck`) with 6 `<section class="slide">` elements
  - Navigation controls (`.nav`) with prev/next buttons and dots
  - Counter (`.count`)

- [ ] **Step 2: Write the CSS (inline in `<style>`)**
  Include all styles from the HiFi reference:
  - Body: `background: var(--paper)`, dot grid overlay, `overflow: hidden`
  - Top bar: fixed, 48px, backdrop-blur, border-bottom
  - Slides: absolute positioned, flex center, `display: none` / `.on` = `display: flex`
  - Cover slide: large display text with rubric band
  - Content slides: phrase + subtitle + optional risco
  - Closing slide: author name + metadata
  - Controls: fixed bottom, arrow buttons with double-bezel shadow
  - Dots: 9px squares, rubric fill when active
  - Counter: JetBrains Mono, bottom-right
  - Click zones: left/right 24% width
  - Entrance animation: `@keyframes rise` (translateY 20px → 0)
  - Risco animation: `@keyframes risco` (width 0 → 120px)
  - `prefers-reduced-motion`: disable all animations

- [ ] **Step 3: Write the slide content**
  Populate 6 slides with exact content from the HiFi:
  - Slide i (cover): eyebrow "manifesto · o núcleo da tese", display "Iconocracia" with band, subtitle
  - Slide ii: phrase "A primeira Justitia vendada...", risco, subtitle
  - Slide iii: phrase "A nação tem corpo de mulher", subtitle
  - Slide iv: phrase "Ler a alegoria como imagem...", subtitle
  - Slide v: phrase "Do escárnio à imparcialidade...", risco, subtitle
  - Slide vi (closing): name "ana vanzin", meta "história e iconografia jurídica · PPGD/UFSC"

- [ ] **Step 4: Write the JavaScript**
  Add `<script>` at bottom with:
  - Query all `.slide` elements
  - Build dots dynamically
  - `go(n)` function: toggle `.on` class, reflow to replay animation, update dots/count, persist to localStorage
  - Arrow button click handlers
  - Click zone handlers (left zone = prev, right zone = next)
  - Keyboard handler (ArrowRight/Space = next, ArrowLeft = prev)
  - Initialize: read localStorage, call `go(i)`
  - `prev.disabled` / `next.disabled` at bounds

- [ ] **Step 5: Verify in browser**
  Open `manifesto.html` directly in browser. Check:
  - Cover slide renders with rubric band
  - All 6 slides navigate correctly
  - Animations play on slide change
  - Keyboard navigation works
  - State persists on reload
  - Reduced motion mode works

- [ ] **Step 6: Commit**
  ```bash
  git add manifesto.html
  git commit -m "feat(manifesto): add cinematic slide presentation page"
  ```

---

### Task 2: Integrate Manifesto into Desktop Navigation

**Files:**
- Modify: `Desktop.js` (MENUS, MENU_LABEL, open function)

**Steps:**

- [ ] **Step 1: Add "manifesto" to MENUS array**
  In `Desktop.js`, find:
  ```js
  const MENUS = ['sobre', 'tese', 'leitura', 'conceitos', 'publicacoes', 'ius', 'contato'];
  ```
  Change to:
  ```js
  const MENUS = ['sobre', 'tese', 'leitura', 'manifesto', 'conceitos', 'publicacoes', 'ius', 'contato'];
  ```

- [ ] **Step 2: Add labels to MENU_LABEL**
  Find the MENU_LABEL object and add:
  ```js
  pt: { ..., manifesto: 'Manifesto', ... }
  en: { ..., manifesto: 'Manifesto', ... }
  ```

- [ ] **Step 3: Add open behavior for manifesto**
  In the `open` function, add before the existing `setSel(id)` line:
  ```js
  if (id === 'manifesto') { window.location.href = 'manifesto.html'; return; }
  ```
  (Similar to how 'conceitos' and 'quotes' redirect to separate pages.)

- [ ] **Step 4: Test navigation**
  Open `index.html` in browser. Click "Manifesto" in menu bar. Verify it opens `manifesto.html`.

- [ ] **Step 5: Commit**
  ```bash
  git add Desktop.js
  git commit -m "feat(desktop): add Manifesto to navigation menu"
  ```

---

### Task 3: Final Push

**Steps:**

- [ ] **Step 1: Verify all changes**
  ```bash
  git status
  git log --oneline -3
  ```

- [ ] **Step 2: Push to remote**
  ```bash
  git push origin main
  ```

- [ ] **Step 3: Verify live**
  Wait for GitHub Pages deploy. Open `anavanzin.com/manifesto.html`. Verify all 6 slides work.

---

## Success Criteria

- [ ] `manifesto.html` loads with correct fonts and colors
- [ ] All 6 slides render with proper typography
- [ ] Entrance animations play on slide change
- [ ] Risco (rubric line) animates on slides ii and v
- [ ] Navigation: arrows, dots, keyboard, click zones all work
- [ ] State persists across page reloads (localStorage)
- [ ] "← leitura" back link works
- [ ] Desktop menu "Manifesto" link opens the page
- [ ] Mobile: text scales via clamp(), controls accessible
- [ ] Reduced motion: no animations
- [ ] No console errors
