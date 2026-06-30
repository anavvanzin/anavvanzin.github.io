# Handoff Report — Physics & Motion Choreographer

## 1. Observation
From inspecting the root files and specifications, the following details were observed:

- **Window Layout & Styling (`desktop-app.js`, lines 394–403)**:
  ```js
  } : {
    position: 'absolute',
    left: win.x,
    top: win.y,
    width: winW(win.id),
    zIndex: win.z,
    background: 'var(--paper)',
    border: '1px solid var(--ink)',
    boxShadow: active ? '5px 5px 0 0 var(--ink)' : '3px 3px 0 0 var(--ink-50)'
  };
  ```
- **Window Drag Pointer Events (`desktop-app.js`, lines 735–758)**:
  ```js
  React.useEffect(() => {
    const move = e => {
      if (!drag.current) return;
      const {
        id,
        dx,
        dy
      } = drag.current;
      setWins(ws => ws.map(w => w.id === id ? {
        ...w,
        x: Math.max(0, Math.min(e.clientX - dx, window.innerWidth - 60)),
        y: Math.max(34, Math.min(e.clientY - dy, window.innerHeight - 60))
      } : w));
    };
    const up = () => {
      drag.current = null;
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    // ...
  ```
- **Global Motion Tokens (`styles.css`, lines 134–136)**:
  ```css
  --ease-page: cubic-bezier(0.22, 1, 0.36, 1); /* @kind other */
  --duration-reveal: 900ms; /* @kind other */
  --duration-ui: 150ms; /* @kind other */
  ```
- **Reduced Motion Support (`styles.css`, lines 183–189)**:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

---

## 2. Logic Chain
The observations highlight several opportunities to implement high-performance, GPU-accelerated motion choreography simulating mass and inertia:

1. **State Update Frequency vs. Render Cost**:
   - *Observation*: `desktop-app.js` runs a pointer event listener that updates React state (`wins` coordinates) on every cursor move.
   - *Inference*: Updating state on every pixel movement triggers full virtual DOM reconciliation of the entire desktop app. When complex elements like iframes (`WAmpulheta`) or large text contents are active, this creates noticeable drag lag.
   - *Solution*: De-couple dragging from React state updates. Update the DOM element's style directly using raw JS transforms during dragging, and dispatch the final coordinate to React state *only* once on `pointerup`.

2. **Reflow/Repaint Overhead**:
   - *Observation*: Windows are positioned using `left: win.x` and `top: win.y`, and focus states modify `boxShadow`.
   - *Inference*: Changes to `left`, `top`, and `box-shadow` trigger layout reflows and paint operations on the CPU, violating the performance requirement to only animate `transform` and `opacity` using GPU acceleration.
   - *Solution*: Set initial positioning at `left: 0`, `top: 0`, and use `transform: translate3d(win.x, win.y, 0)` for placement. Render the solid shadow as a nested layer or pseudo-element (`::after`), and transition its offset via `transform: translate3d(...)` to offload shadows completely to the GPU compositor.

3. **Simulating Mass and Inertia with Cubic-Bezier Curves**:
   - *Observation*: Classic spring equations define displacement over time with potential oscillation.
   - *Inference*: CSS transitions cannot oscillate multiple times naturally, but a single-overshoot curve (where $y_2 > 1.0$) simulates underdamped spring physics ($\zeta \approx 0.5 - 0.7$) very well. Heavy deceleration simulates inertia and mass ($\zeta \ge 1.0$).
   - *Solution*:
     - **Hover Pop (Icons)**: Fast, bouncy spring: `cubic-bezier(0.34, 1.56, 0.64, 1.0)` over `300ms` (overshoots by $15\%$).
     - **Window Open / Focus**: Crisp snap spring: `cubic-bezier(0.175, 0.885, 0.32, 1.15)` over `400ms` (overshoots by $7\%$, settles fast).
     - **Heavy Inertial Deceleration (Minimize / Swipe)**: Heavy, smooth decay: `cubic-bezier(0.16, 1, 0.3, 1)` over `480ms` (exponential ease-out, no bounce, simulating sliding mass).

---

## 3. Caveats
- Browser compatibility of CSS custom properties inside keyframes/transitions: CSS variables used inside transitions or transforms are supported by all modern browsers, but dynamic updates of those values must be applied inline on the specific element to avoid style recalculation cascading.
- React refactor scope: De-coupling the pointer-move dragging handler from React state requires keeping track of the current DOM reference (`ref`) of the active window frame.

---

## 4. Conclusion
To implement the motion system safely and performantly:
- **Never animate layout properties** (`top`, `left`, `width`, `height`, `box-shadow`). Shift window positioning to `transform: translate3d()`.
- **Shift shadow transitions to transform offsets**: Animate a shadow layer using `transform: translate3d(3px, 3px, 0)` to `translate3d(5px, 5px, 0)` instead of transitioning the `box-shadow` property value.
- **Implement spring easing curves**: Use `cubic-bezier(0.34, 1.56, 0.64, 1.0)` for bouncy hover effects, and `cubic-bezier(0.175, 0.885, 0.32, 1.15)` for snappy window transitions.
- **Decouple drag events**: Write inline pointer event handlers that mutate `style.transform` directly during pointer move, updating React state only on release to eliminate 60Hz virtual DOM reconciliation lag.

---

## 5. Verification Method
- **Layout Compliance**: Check that `styles.css` contains the new cubic-bezier tokens and classes.
- **Frame Rate Auditing**: Run Chrome DevTools Performance Audit (via `lighthouse_audit` or performance timeline trace) while dragging windows or hovering icons to verify rendering occurs at 60/120fps with zero layout thrashing (no red warning flags).
- **Reduced Motion Verification**: Ensure `@media (prefers-reduced-motion: reduce)` rules correctly override the transform and transition durations to `0.01ms`.
