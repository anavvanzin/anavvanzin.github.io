# Physics & Motion Choreography Analysis

This document analyzes the motion design and physics choreography for the anavvanzin.com retro desktop application, proposing performance-focused spring physics implementations and GPU-accelerated optimizations.

---

## 1. Interaction Paradigms & Motion Targets

The system has four core visual interaction states that require physics-based motion choreography:
1. **Desktop Icons Hover/Press**: Tactile feedback on file, folder, and app icons.
2. **Active Window Focus**: Visual transition when a window is focused and rises to the foreground.
3. **Window Zoom (Minimize/Maximize/Open)**: The scale and translation transition of windows opening or minimizing.
4. **Layout Expansions (Sala de Leitura / Fio Rubrico)**: Staggered entry and elastic reveal of cards, knots, and columns.

---

## 2. Spring Physics Mechanics

A real physical spring-mass-damper system is governed by:
$$m \ddot{x} + c \dot{x} + k x = 0$$

Where:
- $m$ is the mass (simulates inertia).
- $k$ is the stiffness (force of the spring).
- $c$ is the damping coefficient (friction/resistance).

For UI design, the damping ratio $\zeta$ defines the quality of motion:
- **Underdamped ($\zeta < 1.0$)**: The UI will overshoot and oscillate before settling. A $\zeta \approx 0.5$ is highly elastic (bouncy), while $\zeta \approx 0.707$ (Butterworth response) has a very small, crisp overshoot (4.6%) and settles rapidly, feeling natural and clean.
- **Critically Damped ($\zeta = 1.0$)**: The fastest response without overshoot. Excellent for heavy mass transitions where oscillation feels distracting.

---

## 3. CSS Cubic-Bezier vs JS Interpolation

We evaluate two implementation routes for these animations:

### A. CSS `cubic-bezier` Approximations (GPU-Accelerated)
By setting control points where $y_2 > 1.0$, we simulate a single-overshoot spring transition.

| Movement Type | Cubic-Bezier Value | Timing | Feel / Damping Analogy |
|---|---|---|---|
| **Hover Pop (Icons)** | `cubic-bezier(0.34, 1.56, 0.64, 1.0)` | `320ms` | Light spring, high responsiveness ($\zeta \approx 0.5$, $15\%$ overshoot) |
| **Window Open / Focus** | `cubic-bezier(0.175, 0.885, 0.32, 1.15)` | `420ms` | Balanced spring ($\zeta \approx 0.7$, $7\%$ overshoot, fast settling) |
| **Heavy Deceleration** | `cubic-bezier(0.16, 1.0, 0.3, 1.0)` | `480ms` | Critically/Overdamped ($\zeta \ge 1.0$, heavy mass, smooth decay, no bounce) |

### B. JS Spring Interpolation (True Physics)
Using a `requestAnimationFrame` solver to dynamically update inline style transforms:
```js
class Spring {
  constructor(mass = 1, stiffness = 150, damping = 16) {
    this.m = mass;
    this.k = stiffness;
    this.c = damping;
    this.x = 0; // Position
    this.v = 0; // Velocity
    this.target = 0;
  }
  update(dt) {
    const force = -this.k * (this.x - this.target) - this.c * this.v;
    const a = force / this.m;
    this.v += a * dt;
    this.x += this.v * dt;
    return this.x;
  }
}
```

---

## 4. Performance & GPU Optimization Recommendations

### A. Drag & Layout Performance
Currently, window dragging in `desktop-app.js` is implemented by modifying React state (`x` and `y` properties) on every single cursor movement:
```js
setWins(ws => ws.map(w => w.id === id ? {
  ...w,
  x: Math.max(0, Math.min(e.clientX - dx, window.innerWidth - 60)),
  y: Math.max(34, Math.min(e.clientY - dy, window.innerHeight - 60))
} : w));
```
And this maps to inline style properties:
```js
left: win.x,
top: win.y,
```
**Issues**:
1. Modifying `left`/`top` properties triggers the browser layout engine, causing full reflows and repaints.
2. Triggering React state updates at 60Hz causes complete Virtual DOM diffs and re-renders of the root `Desktop` and all child windows.

**GPU Optimizations**:
- **Translate3D Positioning**: Set `left: 0`, `top: 0` initially, and place the window using `transform: translate3d(win.x, win.y, 0)`. Transforms are handled by the GPU compositor, avoiding browser reflows.
- **De-coupled React Dragging**: During drag events, modify the DOM node's inline `.style.transform` directly using raw JS pointer listeners. Dispatch the final coordinate to React state *only* on `pointerup`. This reduces React re-renders from $\approx 60$ per second to exactly **one** at the end of the drag.

### B. Shadow Optimization
Currently, the shadow changes when a window is active:
```js
boxShadow: active ? '5px 5px 0 0 var(--ink)' : '3px 3px 0 0 var(--ink-50)'
```
Transitions on `box-shadow` trigger expensive CPU repaints.
**GPU Optimization**:
Render the shadow as a solid pseudo-element `::after` (or separate div) offset by `translate3d(3px, 3px, 0)` and with opacity `0.5`. On focus, transition its `transform` to `translate3d(5px, 5px, 0)` and opacity to `1.0` using a spring cubic-bezier. This offloads the entire shadow transition to the GPU compositor thread.
