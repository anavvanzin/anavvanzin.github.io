# Sala de Leitura — Implementation Plan

> **For agentic workers:** Use subagent-driven-development (recommended) or executing-plans to implement task-by-task.

**Goal:** Create a React-based reading room component with theme filtering, bilingual support, and 4 annotated shelves.
**Architecture:** React component (`WSalaLeitura.js`) rendered inside the desktop window system.
**Tech Stack:** React (via CDN), vanilla CSS (using existing tokens), embedded data.

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `WSalaLeitura.js` | React component with data + UI |
| Modify | `window-contents.js` | Register component in exports |
| Modify | `Desktop.js` | Add to REG, MENUS, DESK_ICONS, MENU_LABEL |
| Modify | `index.html` | Add script tag |

---

### Task 1: Create WSalaLeitura.js

**Files:**
- Create: `WSalaLeitura.js`

**Steps:**

- [ ] **Step 1: Write the data layer**
  Embed the 6 themes and 4 shelves with all reading items directly in the component file as JS objects.

- [ ] **Step 2: Write the ThemeFilter component**
  Row of pill buttons. Active state = rubric fill. Calls `setActiveTheme(slug)`.

- [ ] **Step 3: Write the Shelf component**
  Header with title + theme tags + note. Reading list as styled table.

- [ ] **Step 4: Write the main WSalaLeitura component**
  Combines ThemeFilter + filtered Shelves. Uses `useState` for active theme. Filters shelves by theme match.

- [ ] **Step 5: Register on window**
  `window.WSalaLeitura = WSalaLeitura;`

- [ ] **Step 6: Commit**
  ```bash
  git add WSalaLeitura.js
  git commit -m "feat(sala-de-leitura): add React reading room component"
  ```

---

### Task 2: Integrate into Desktop

**Files:**
- Modify: `window-contents.js`
- Modify: `Desktop.js`
- Modify: `index.html`

**Steps:**

- [ ] **Step 1: Register in window-contents.js exports**
  Add `WSalaLeitura` to the exports object.

- [ ] **Step 2: Add to Desktop.js REG**
  ```js
  leitura: { title: { pt: 'sala de leitura', en: 'reading room' }, w: 860, Body: WSalaLeitura },
  ```
  (Note: "leitura" already exists for Leitura-Iconografia. Need to use a different key or replace.)

- [ ] **Step 3: Update MENUS and MENU_LABEL**
  Change existing "leitura" entry or add new "sala" entry.

- [ ] **Step 4: Add script tag in index.html**
  ```html
  <script src="WSalaLeitura.js"></script>
  ```

- [ ] **Step 5: Test**
  Open desktop, click "Leitura" or "Sala", verify shelves render.

- [ ] **Step 6: Commit**
  ```bash
  git add -A
  git commit -m "feat(desktop): integrate Sala de Leitura component"
  ```

---

### Task 3: Push and Verify

- [ ] **Step 1: Push**
  ```bash
  git push origin main
  ```

- [ ] **Step 2: Verify live on anavanzin.com**
