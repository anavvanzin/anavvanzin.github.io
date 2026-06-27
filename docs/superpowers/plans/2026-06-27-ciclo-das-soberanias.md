# Ciclo das Soberanias Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the "Ciclo das Soberanias" (Cycle of Sovereignty) in `ampulheta.html`, allowing the physical hourglass simulation to cycle through 5 female legal allegories (Justitia, Marianne, Britannia, Germania, Helvetia) with dynamic collision segments, woodcut illustrations, and historical quotes upon each flip.

**Architecture:** 
- An array of allegory objects containing their name, canvas rendering logic, collision segment coordinates, and specific quote sets.
- A state index tracking the active allegory.
- A dynamic collision solver that runs against the active allegory's collision lines.
- Smooth CSS 3D scale and 180° rotation on the canvas outer frame with cubic-bezier curves.

**Tech Stack:** Vanilla HTML5, Canvas 2D Physics, CSS Transitions, Vanilla JS.

## Global Constraints
- Target file: `/Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch/ampulheta.html`
- Aesthetics: Vanguard Protocol (paper velino texture, ink `#211B16`, rubric `#9B2C1C`, gold `#9C7C3D`).
- Typography: *Cormorant Garamond* for serifs/quotes, *Hanken Grotesk* for sans-serif.

---

### Task 1: Allegory State Configuration & Data Setup

**Files:**
- Modify: `ampulheta.html`

**Interfaces:**
- Produces: `const ALLEGORIES` array containing metadata and quotes for the 5 allegories, and a global `let activeAllegoryIndex = 0` to track the current index.

- [ ] **Step 1: Define the ALLEGORIES structure and quotes**
  Replace the existing `QUOTES` array and initial definitions in `ampulheta.html` with:
  ```javascript
  const ALLEGORIES = [
    {
      name: "IUSTITIA",
      quotes: [
        { text: "A primeira Justitia vendada não nasceu como virtude — nasceu como sátira, na xilogravura de 1494 do Narrenschiff.", author: "Sebastian Brant, Das Narrenschiff (Basel, 1494)" },
        { text: "A venda que hoje cega a Justiça contra a parcialidade nasceu para cegá-la à verdade dos fatos: a sátira contra os juízes tolos.", author: "Ana Vanzin, Iconocracia" },
        { text: "A espada pune, a balança equilibra, a venda protege. A normalização de um erro satírico tornou-se o maior emblema do direito moderno.", author: "Ana Vanzin, Iconocracia" }
      ]
    },
    {
      name: "MARIANNE",
      quotes: [
        { text: "O barrete frígio e a lança tornam o corpo feminino o receptáculo da própria liberdade revolucionária e da soberania nacional.", author: "Maurice Agulhon, Marianne au Combat" },
        { text: "A República não é neutra: ela se reveste de carne e sangue na imagem de Marianne para disputar a devoção popular com as imagens religiosas.", author: "Ana Vanzin, Iconocracia" }
      ]
    },
    {
      name: "BRITANNIA",
      quotes: [
        { text: "Britannia governa as águas: a fusão heráldica entre o império marítimo e o escudo de lei civil consagra a divindade insular.", author: "Madge Dresser, The Britannia Iconography" },
        { text: "Com o tridente em punho e o escudo romano, a soberania britânica contrapõe a fluidez do mar à rigidez da lei constitucional.", author: "Ana Vanzin, Iconocracia" }
      ]
    },
    {
      name: "GERMANIA",
      quotes: [
        { text: "Germania empunha a espada imperial deitada sob o carvalho: o corpo da mulher se confunde com as fronteiras do solo e da floresta.", author: "Heinrich Heine, Lieder" },
        { text: "A alegoria territorializada: a Germania de 1848 estabiliza o espírito nacional em uma pose monumental de proteção armada.", author: "Ana Vanzin, Iconocracia" }
      ]
    },
    {
      name: "HELVETIA",
      quotes: [
        { text: "Nas montanhas, Helvetia guarda os passos alpinos com lança e escudo da confederação, personificando a neutralidade armada.", author: "François de Capitani, Helvetia" },
        { text: "O isolamento virtuoso em pose clássica: Helvetia é a sentinela que traduz a geografia alpina em soberania jurídica pacificada.", author: "Ana Vanzin, Iconocracia" }
      ]
    }
  ];
  let activeAllegoryIndex = 0;
  let currentQuoteIndex = 0;
  ```

- [ ] **Step 2: Commit initial state configuration**
  ```bash
  git add ampulheta.html
  git commit -m "chore: setup cycles and quotes for the 5 allegories"
  ```

---

### Task 2: Vector Engravings & Physics Segments for the 5 Allegories

**Files:**
- Modify: `ampulheta.html`

**Interfaces:**
- Consumes: `activeAllegoryIndex`
- Produces: `function drawActiveAllegory()` drawing the active illustration, and `function initActiveSegments()` populating `activeSegments` array for sand collision.

- [ ] **Step 1: Implement visual drawing routines for each allegory**
  Define detailed Canvas 2D functions for each figure simulating 15th-century woodcut hatching lines inside `ampulheta.html`:
  ```javascript
  const activeSegments = [];

  function drawHatching(leftBound, rightBound, startY, endY, step) {
    ctx.strokeStyle = 'color-mix(in srgb, var(--ink) 12%, transparent)';
    ctx.lineWidth = 0.8;
    for (let l = startY; l < endY; l += step) {
      ctx.beginPath();
      ctx.moveTo(leftBound(l), l);
      ctx.lineTo(rightBound(l), l);
      ctx.stroke();
    }
  }

  function drawIustitia() {
    ctx.save();
    // Silhueta Dourada
    ctx.fillStyle = 'var(--gold-soft)';
    ctx.beginPath();
    ctx.arc(cx, cy + 74, 9, 0, Math.PI * 2);
    ctx.moveTo(cx - 10, cy + 80);
    ctx.lineTo(cx - 28, cy + 92);
    ctx.lineTo(cx - 32, cy + 135);
    ctx.lineTo(cx + 32, cy + 135);
    ctx.lineTo(cx + 28, cy + 92);
    ctx.lineTo(cx + 10, cy + 80);
    ctx.fill();

    // Hachuras
    drawHatching(
      (l) => cx - 18 - ((l - (cy + 86)) / 49) * 14,
      (l) => cx + 18 + ((l - (cy + 86)) / 49) * 14,
      cy + 86, cy + 135, 3.5
    );

    // Contorno Ink
    ctx.strokeStyle = 'color-mix(in srgb, var(--ink) 25%, transparent)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy + 74, 9, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 80); ctx.lineTo(cx - 28, cy + 92); ctx.lineTo(cx - 32, cy + 135);
    ctx.moveTo(cx + 10, cy + 80); ctx.lineTo(cx + 28, cy + 92); ctx.lineTo(cx + 32, cy + 135);
    ctx.stroke();

    // Espada
    ctx.beginPath();
    ctx.moveTo(cx + 44, cy + 64); ctx.lineTo(cx + 44, cy + 104);
    ctx.moveTo(cx + 39, cy + 96); ctx.lineTo(cx + 49, cy + 96);
    ctx.stroke();

    // Balança
    ctx.beginPath();
    ctx.moveTo(cx - 28, cy + 92); ctx.lineTo(cx - 48, cy + 92);
    ctx.moveTo(cx - 48, cy + 92); ctx.lineTo(cx - 56, cy + 108); ctx.lineTo(cx - 40, cy + 108);
    ctx.closePath();
    ctx.moveTo(cx - 58, cy + 108); ctx.lineTo(cx - 38, cy + 108);
    ctx.stroke();

    // Venda Rubrica
    ctx.fillStyle = 'var(--rubric)';
    ctx.fillRect(cx - 7, cy + 72, 14, 3.5);
    ctx.restore();
  }

  function drawMarianne() {
    ctx.save();
    // Silhueta Dourada
    ctx.fillStyle = 'var(--gold-soft)';
    ctx.beginPath();
    ctx.arc(cx, cy + 76, 9, 0, Math.PI * 2); // Cabeça
    // Barrete frígio
    ctx.moveTo(cx - 9, cy + 71);
    ctx.quadraticCurveTo(cx - 14, cy + 62, cx - 2, cy + 58);
    ctx.quadraticCurveTo(cx + 8, cy + 60, cx + 7, cy + 70);
    // Corpo
    ctx.moveTo(cx - 10, cy + 82);
    ctx.lineTo(cx - 25, cy + 94);
    ctx.lineTo(cx - 30, cy + 135);
    ctx.lineTo(cx + 30, cy + 135);
    ctx.lineTo(cx + 25, cy + 94);
    ctx.lineTo(cx + 10, cy + 82);
    ctx.fill();

    // Hachuras
    drawHatching(
      (l) => cx - 16 - ((l - (cy + 86)) / 49) * 14,
      (l) => cx + 16 + ((l - (cy + 86)) / 49) * 14,
      cy + 86, cy + 135, 3.5
    );

    // Contornos Ink
    ctx.strokeStyle = 'color-mix(in srgb, var(--ink) 25%, transparent)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy + 76, 9, 0, Math.PI * 2);
    ctx.stroke();

    // Barrete
    ctx.beginPath();
    ctx.moveTo(cx - 9, cy + 71);
    ctx.quadraticCurveTo(cx - 14, cy + 62, cx - 2, cy + 58);
    ctx.quadraticCurveTo(cx + 8, cy + 60, cx + 7, cy + 70);
    ctx.stroke();

    // Ombros
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 82); ctx.lineTo(cx - 25, cy + 94); ctx.lineTo(cx - 30, cy + 135);
    ctx.moveTo(cx + 10, cy + 82); ctx.lineTo(cx + 25, cy + 94); ctx.lineTo(cx + 30, cy + 135);
    ctx.stroke();

    // Lança com Bandeira
    ctx.beginPath();
    ctx.moveTo(cx - 44, cy + 56); ctx.lineTo(cx - 44, cy + 135); // Mastro
    ctx.stroke();
    // Bandeira ondulando
    ctx.fillStyle = 'var(--gold-soft)';
    ctx.beginPath();
    ctx.moveTo(cx - 44, cy + 58);
    ctx.bezierCurveTo(cx - 58, cy + 54, cx - 52, cy + 72, cx - 68, cy + 68);
    ctx.lineTo(cx - 68, cy + 84);
    ctx.bezierCurveTo(cx - 52, cy + 88, cx - 58, cy + 70, cx - 44, cy + 74);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Detalhe Rubrica na Bandeira
    ctx.fillStyle = 'var(--rubric)';
    ctx.beginPath();
    ctx.moveTo(cx - 44, cy + 58);
    ctx.bezierCurveTo(cx - 49, cy + 56, cx - 48, cy + 62, cx - 52, cy + 61);
    ctx.lineTo(cx - 52, cy + 76);
    ctx.bezierCurveTo(cx - 48, cy + 77, cx - 49, cy + 72, cx - 44, cy + 74);
    ctx.closePath();
    ctx.fill();

    // Barrete Cocarde rubrica
    ctx.fillStyle = 'var(--rubric)';
    ctx.beginPath();
    ctx.arc(cx + 4, cy + 67, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawBritannia() {
    ctx.save();
    // Silhueta Dourada
    ctx.fillStyle = 'var(--gold-soft)';
    ctx.beginPath();
    ctx.arc(cx, cy + 76, 9, 0, Math.PI * 2); // Cabeça
    // Elmo crista
    ctx.moveTo(cx - 5, cy + 67);
    ctx.quadraticCurveTo(cx, cy + 56, cx + 5, cy + 67);
    // Corpo
    ctx.moveTo(cx - 10, cy + 82);
    ctx.lineTo(cx - 24, cy + 94);
    ctx.lineTo(cx - 28, cy + 135);
    ctx.lineTo(cx + 28, cy + 135);
    ctx.lineTo(cx + 24, cy + 94);
    ctx.lineTo(cx + 10, cy + 82);
    ctx.fill();

    // Hachuras
    drawHatching(
      (l) => cx - 16 - ((l - (cy + 86)) / 49) * 12,
      (l) => cx + 16 + ((l - (cy + 86)) / 49) * 12,
      cy + 86, cy + 135, 3.5
    );

    // Contorno Ink
    ctx.strokeStyle = 'color-mix(in srgb, var(--ink) 25%, transparent)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy + 76, 9, 0, Math.PI * 2);
    ctx.stroke();

    // Crista do Elmo
    ctx.fillStyle = 'var(--rubric)';
    ctx.beginPath();
    ctx.moveTo(cx - 4, cy + 67);
    ctx.bezierCurveTo(cx - 8, cy + 54, cx + 8, cy + 54, cx + 4, cy + 67);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Ombros
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 82); ctx.lineTo(cx - 24, cy + 94); ctx.lineTo(cx - 28, cy + 135);
    ctx.moveTo(cx + 10, cy + 82); ctx.lineTo(cx + 24, cy + 94); ctx.lineTo(cx + 30, cy + 135);
    ctx.stroke();

    // Tridente
    ctx.beginPath();
    ctx.moveTo(cx + 42, cy + 52); ctx.lineTo(cx + 42, cy + 135); // Haste
    ctx.moveTo(cx + 35, cy + 56); ctx.lineTo(cx + 49, cy + 56); // Travessa
    ctx.moveTo(cx + 35, cy + 44); ctx.lineTo(cx + 35, cy + 56);
    ctx.moveTo(cx + 49, cy + 44); ctx.lineTo(cx + 49, cy + 56);
    ctx.moveTo(cx + 42, cy + 40); ctx.lineTo(cx + 42, cy + 56);
    ctx.stroke();

    // Escudo circular no braço esquerdo
    ctx.fillStyle = 'var(--gold-soft)';
    ctx.beginPath();
    ctx.arc(cx - 42, cy + 110, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Detalhes da bandeira Union Jack no escudo (Rubric)
    ctx.strokeStyle = 'var(--rubric)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 42, cy + 90); ctx.lineTo(cx - 42, cy + 130);
    ctx.moveTo(cx - 62, cy + 110); ctx.lineTo(cx - 22, cy + 110);
    ctx.stroke();

    ctx.restore();
  }

  function drawGermania() {
    ctx.save();
    // Silhueta Dourada
    ctx.fillStyle = 'var(--gold-soft)';
    ctx.beginPath();
    ctx.arc(cx, cy + 76, 9, 0, Math.PI * 2); // Cabeça
    // Ombros e Tronco
    ctx.moveTo(cx - 10, cy + 82);
    ctx.lineTo(cx - 28, cy + 94);
    ctx.lineTo(cx - 32, cy + 135);
    ctx.lineTo(cx + 32, cy + 135);
    ctx.lineTo(cx + 28, cy + 94);
    ctx.lineTo(cx + 10, cy + 82);
    ctx.fill();

    // Hachuras
    drawHatching(
      (l) => cx - 18 - ((l - (cy + 86)) / 49) * 14,
      (l) => cx + 18 + ((l - (cy + 86)) / 49) * 14,
      cy + 86, cy + 135, 3.5
    );

    // Contorno Ink
    ctx.strokeStyle = 'color-mix(in srgb, var(--ink) 25%, transparent)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy + 76, 9, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 82); ctx.lineTo(cx - 28, cy + 94); ctx.lineTo(cx - 32, cy + 135);
    ctx.moveTo(cx + 10, cy + 82); ctx.lineTo(cx + 28, cy + 94); ctx.lineTo(cx + 32, cy + 135);
    ctx.stroke();

    // Coroa de Carvalho (Rubric)
    ctx.strokeStyle = 'var(--rubric)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(cx, cy + 71, 10, Math.PI, Math.PI * 2);
    ctx.stroke();

    // Espada imperial apoiada no colo
    ctx.strokeStyle = 'color-mix(in srgb, var(--ink) 25%, transparent)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx - 40, cy + 120); ctx.lineTo(cx + 40, cy + 120); // Lâmina horizontal
    ctx.moveTo(cx - 32, cy + 115); ctx.lineTo(cx - 32, cy + 125); // Guarda
    ctx.moveTo(cx - 40, cy + 120); ctx.lineTo(cx - 46, cy + 120); // Cabo
    ctx.stroke();

    ctx.restore();
  }

  function drawHelvetia() {
    ctx.save();
    // Silhueta Dourada
    ctx.fillStyle = 'var(--gold-soft)';
    ctx.beginPath();
    ctx.arc(cx, cy + 76, 9, 0, Math.PI * 2); // Cabeça
    // Corpo
    ctx.moveTo(cx - 10, cy + 82);
    ctx.lineTo(cx - 26, cy + 94);
    ctx.lineTo(cx - 30, cy + 135);
    ctx.lineTo(cx + 30, cy + 135);
    ctx.lineTo(cx + 26, cy + 94);
    ctx.lineTo(cx + 10, cy + 82);
    ctx.fill();

    // Hachuras
    drawHatching(
      (l) => cx - 17 - ((l - (cy + 86)) / 49) * 13,
      (l) => cx + 17 + ((l - (cy + 86)) / 49) * 13,
      cy + 86, cy + 135, 3.5
    );

    // Contorno Ink
    ctx.strokeStyle = 'color-mix(in srgb, var(--ink) 25%, transparent)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy + 76, 9, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 82); ctx.lineTo(cx - 26, cy + 94); ctx.lineTo(cx - 30, cy + 135);
    ctx.moveTo(cx + 10, cy + 82); ctx.lineTo(cx + 26, cy + 94); ctx.lineTo(cx + 30, cy + 135);
    ctx.stroke();

    // Lança vertical
    ctx.beginPath();
    ctx.moveTo(cx + 42, cy + 48); ctx.lineTo(cx + 42, cy + 135);
    ctx.stroke();

    // Escudo triangular da confederação no braço esquerdo
    ctx.fillStyle = 'var(--gold-soft)';
    ctx.beginPath();
    ctx.moveTo(cx - 48, cy + 92);
    ctx.lineTo(cx - 28, cy + 92);
    ctx.lineTo(cx - 38, cy + 122);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cruz Suíça no escudo (Rubric)
    ctx.fillStyle = 'var(--rubric)';
    ctx.fillRect(cx - 40, cy + 101, 4, 12);
    ctx.fillRect(cx - 44, cy + 105, 12, 4);

    ctx.restore();
  }

  function drawActiveAllegory() {
    switch (activeAllegoryIndex) {
      case 0: drawIustitia(); break;
      case 1: drawMarianne(); break;
      case 2: drawBritannia(); break;
      case 3: drawGermania(); break;
      case 4: drawHelvetia(); break;
    }
  }
  ```

- [ ] **Step 2: Define dynamic collision segment loaders**
  Update the collision lines array dynamically when switching active allegory:
  ```javascript
  function initActiveSegments() {
    activeSegments.length = 0;
    const jy = cy + 90;

    // Segmentos básicos compartilhados do corpo
    activeSegments.push(new Wall(cx - 10, jy - 22, cx + 10, jy - 22));
    activeSegments.push(new Wall(cx - 10, jy - 22, cx - 10, jy - 10));
    activeSegments.push(new Wall(cx + 10, jy - 22, cx + 10, jy - 10));
    activeSegments.push(new Wall(cx - 10, jy - 10, cx - 28, jy + 2));
    activeSegments.push(new Wall(cx + 10, jy - 10, cx + 28, jy + 2));

    // Barreiras específicas de colisão por alegoria
    if (activeAllegoryIndex === 0) {
      // Justitia
      activeSegments.push(new Wall(cx - 28, jy + 2, cx - 48, jy + 2));
      activeSegments.push(new Wall(cx - 58, jy + 18, cx - 38, jy + 18));
      activeSegments.push(new Wall(cx + 28, jy + 2, cx + 48, jy + 2));
      activeSegments.push(new Wall(cx + 44, jy - 26, cx + 44, jy + 14));
      activeSegments.push(new Wall(cx - 28, jy + 2, cx - 32, cy + 135));
      activeSegments.push(new Wall(cx + 28, jy + 2, cx + 32, cy + 135));
    } else if (activeAllegoryIndex === 1) {
      // Marianne
      activeSegments.push(new Wall(cx - 44, cy + 56, cx - 44, cy + 135));
      activeSegments.push(new Wall(cx - 25, jy + 2, cx - 30, cy + 135));
      activeSegments.push(new Wall(cx + 25, jy + 2, cx + 30, cy + 135));
    } else if (activeAllegoryIndex === 2) {
      // Britannia
      activeSegments.push(new Wall(cx + 42, cy + 52, cx + 42, cy + 135));
      // Escudo circular colisor (aproximado por 2 segmentos retos na borda superior)
      activeSegments.push(new Wall(cx - 62, cy + 110, cx - 42, cy + 90));
      activeSegments.push(new Wall(cx - 42, cy + 90, cx - 22, cy + 110));
      activeSegments.push(new Wall(cx - 24, jy + 2, cx - 28, cy + 135));
      activeSegments.push(new Wall(cx + 24, jy + 2, cx + 30, cy + 135));
    } else if (activeAllegoryIndex === 3) {
      // Germania
      activeSegments.push(new Wall(cx - 40, cy + 120, cx + 40, cy + 120)); // Espada colisor
      activeSegments.push(new Wall(cx - 28, jy + 2, cx - 32, cy + 135));
      activeSegments.push(new Wall(cx + 28, jy + 2, cx + 32, cy + 135));
    } else if (activeAllegoryIndex === 4) {
      // Helvetia
      activeSegments.push(new Wall(cx + 42, cy + 48, cx + 42, cy + 135)); // Lança
      activeSegments.push(new Wall(cx - 48, cy + 92, cx - 28, cy + 92)); // Escudo topo
      activeSegments.push(new Wall(cx - 26, jy + 2, cx - 30, cy + 135));
      activeSegments.push(new Wall(cx + 26, jy + 2, cx + 30, cy + 135));
    }
  }
  ```

- [ ] **Step 3: Update resolution function to use activeSegments**
  In the collision resolution loop, replace the previous loop over `justitiaSegments` with a loop over `activeSegments`.

- [ ] **Step 4: Commit dynamic drawing and collision features**
  ```bash
  git add ampulheta.html
  git commit -m "feat: implement canvas drawing and dynamic collision segments for all 5 allegories"
  ```

---

### Task 3: Interactive Rotação & Allegory Cycling Engine

**Files:**
- Modify: `ampulheta.html`

**Interfaces:**
- Consumes: `ALLEGORIES`, `activeAllegoryIndex`
- Produces: Visual title block render, citation swap, and 3D frame rotation scale.

- [ ] **Step 1: Implement the showNextQuote function with index progression**
  Rewrite quote rendering to fetch quotes for the active allegory and update the active index on flip:
  ```javascript
  function showNextQuote() {
    const active = ALLEGORIES[activeAllegoryIndex];
    currentQuoteIndex = (currentQuoteIndex + 1) % active.quotes.length;
    const q = active.quotes[currentQuoteIndex];
    const firstChar = q.text.charAt(0);
    const remainingText = q.text.slice(1);
    
    document.getElementById('quote-body').innerHTML = `<span class="drop-cap">${firstChar}</span>${remainingText}`;
    document.getElementById('quote-author').textContent = q.author;
  }
  ```

- [ ] **Step 2: Update flip button handler to increment active index**
  Ensure the active index cycles through the 5 allegories:
  ```javascript
  document.getElementById('btn-flip').addEventListener('click', function() {
    if (isFlipping) return;
    isFlipping = true;
    flipProgress = 0;
    flipStartAngle = angle;
    targetAngle = angle + Math.PI;
    
    // Cycle allegory
    activeAllegoryIndex = (activeAllegoryIndex + 1) % ALLEGORIES.length;
    currentQuoteIndex = -1; // Reset quote index for the new allegory
    initActiveSegments();   // Load new collision segments

    outerFrame.style.transform = 'scale(0.94) rotate(' + (targetAngle * 180 / Math.PI) + 'deg)';
  });
  ```

- [ ] **Step 3: Draw active allegory name banner in the canvas**
  Add drawing logic to render the active allegory name inside `draw()`:
  ```javascript
  // Draw allegory banner name
  ctx.save();
  ctx.fillStyle = 'var(--gold)';
  ctx.font = 'bold 9px var(--font-mono)';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.12em';
  ctx.fillText('❧ ' + ALLEGORIES[activeAllegoryIndex].name + ' ❧', cx, HEIGHT - 18);
  ctx.restore();
  ```

- [ ] **Step 4: Commit rotation, cycling, and text update logics**
  ```bash
  git add ampulheta.html
  git commit -m "feat: cycle allegories and quotes on hourglass rotation with active banner"
  ```

---

## Plan Verification

### Manual Verification
- Load `ampulheta.html` in the browser or check in the desktop frame.
- Verify that clicking "Girar Ampulheta" triggers a scale/rotation effect.
- Confirm the background illustration changes successfully (e.g. from Justitia to Marianne, then Britannia).
- Verify sand particles collide correctly with the distinct features of the active illustration (e.g., piling on Marianne's flag or Britannia's shield).
- Verify quotes block updates dynamically, displaying the active allegory's name and quotes with correct Drop Caps.
