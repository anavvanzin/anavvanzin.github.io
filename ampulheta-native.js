/*IIFE*/(function () {
  const ALLEGORIES = [
    {
      name: 'IUSTITIA',
      quotes: [
        { text: 'A primeira Justitia vendada não nasceu como virtude — nasceu como sátira, na xilogravura de 1494 do Narrenschiff.', author: 'Sebastian Brant, Das Narrenschiff (Basel, 1494)' },
        { text: 'A venda que hoje cega a Justiça contra a parcialidade nasceu para cegá-la à verdade dos fatos: a sátira contra os juízes tolos.', author: 'Ana Vanzin, Iconocracia' },
        { text: 'A espada pune, a balança equilibra, a venda protege. A normalização de um erro satírico tornou-se o maior emblema do direito moderno.', author: 'Ana Vanzin, Iconocracia' }
      ]
    },
    {
      name: 'MARIANNE',
      quotes: [
        { text: 'O barrete frígio e a lança tornam o corpo feminino o receptáculo da própria liberdade revolucionária e da soberania nacional.', author: 'Maurice Agulhon, Marianne au Combat' },
        { text: 'A República não é neutra: ela se reveste de carne e sangue na imagem de Marianne para disputar a devoção popular com as imagens religiosas.', author: 'Ana Vanzin, Iconocracia' }
      ]
    },
    {
      name: 'BRITANNIA',
      quotes: [
        { text: 'Britannia governa as águas: a fusão heráldica entre o império marítimo e o escudo de lei civil consagra a divindade insular.', author: 'Madge Dresser, The Britannia Iconography' },
        { text: 'Com o tridente em punho e o escudo romano, a soberania britânica contrapõe a fluidez do mar à rigidez da lei constitucional.', author: 'Ana Vanzin, Iconocracia' }
      ]
    },
    {
      name: 'GERMANIA',
      quotes: [
        { text: 'Germania empunha a espada imperial deitada sob o carvalho: o corpo da mulher se confunde com as fronteiras do solo e da floresta.', author: 'Heinrich Heine, Lieder' },
        { text: 'A alegoria territorializada: a Germania de 1848 estabiliza o espírito nacional em uma pose monumental de proteção armada.', author: 'Ana Vanzin, Iconocracia' }
      ]
    },
    {
      name: 'HELVETIA',
      quotes: [
        { text: 'Nas montanhas, Helvetia guarda os passos alpinos com lança e escudo da confederação, personificando a neutralidade armada.', author: 'François de Capitani, Helvetia' },
        { text: 'O isolamento virtuoso em pose clássica: Helvetia é a sentinela que traduz a geografia alpina em soberania jurídica pacificada.', author: 'Ana Vanzin, Iconocracia' }
      ]
    }
  ];

  const C = {
    ink: '#111111',
    rubric: '#8B3A1A',
    gold2: '#D4AF37'
  };

  const WIDTH = 300;
  const HEIGHT = 400;
  const GRAVITY = 0.18;
  const PARTICLE_COUNT = 80;
  const PARTICLE_RADIUS = 3.5;
  const RESTITUTION = 0.16;
  const FRICTION = 0.96;

  function initParticles() {
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: WIDTH / 2 + (Math.random() - 0.5) * 55,
        y: 50 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 0,
        r: PARTICLE_RADIUS + (Math.random() - 0.5) * 0.8,
        color: Math.random() > 0.55 ? C.rubric : C.gold2
      });
    }
    return particles;
  }

  function initWalls() {
    const neckWidth = 13;
    const neckHeight = 8;
    const cy = HEIGHT / 2;
    const cx = WIDTH / 2;
    return [
      [12, cy - 135, cx - neckWidth, cy - neckHeight],
      [WIDTH - 12, cy - 135, cx + neckWidth, cy - neckHeight],
      [cx - neckWidth, cy - neckHeight, cx - neckWidth, cy + neckHeight],
      [cx + neckWidth, cy - neckHeight, cx + neckWidth, cy + neckHeight],
      [cx - neckWidth, cy + neckHeight, 12, cy + 135],
      [cx + neckWidth, cy + neckHeight, WIDTH - 12, cy + 135],
      [12, cy - 135, 12, cy + 135],
      [WIDTH - 12, cy - 135, WIDTH - 12, cy + 135],
      [12, cy - 135, WIDTH - 12, cy - 135],
      [12, cy + 135, WIDTH - 12, cy + 135]
    ];
  }

  function checkCircleLineCollision(circle, line) {
    const abx = line.x2 - line.x1;
    const aby = line.y2 - line.y1;
    const acx = circle.x - line.x1;
    const acy = circle.y - line.y1;
    const ab2 = abx * abx + aby * aby;
    if (ab2 === 0) return;

    let t = (acx * abx + acy * aby) / ab2;
    t = Math.max(0, Math.min(1, t));

    const closestX = line.x1 + t * abx;
    const closestY = line.y1 + t * aby;
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < circle.r) {
      const normalX = dx / dist;
      const normalY = dy / dist;
      circle.x = closestX + normalX * circle.r;
      circle.y = closestY + normalY * circle.r;
      const speedAlongNormal = circle.vx * normalX + circle.vy * normalY;
      circle.vx = (circle.vx - 2 * speedAlongNormal * normalX) * RESTITUTION;
      circle.vy = (circle.vy - 2 * speedAlongNormal * normalY) * RESTITUTION;
    }
  }

  function resolveCollisions(particles, walls) {
    for (const p of particles) {
      for (const w of walls) {
        checkCircleLineCollision(p, w);
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = p1.r + p2.r;
        if (dist < minDist) {
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;
          p1.x -= nx * overlap * 0.5;
          p1.y -= ny * overlap * 0.5;
          p2.x += nx * overlap * 0.5;
          p2.y += ny * overlap * 0.5;
          const kx = p1.vx - p2.vx;
          const ky = p1.vy - p2.vy;
          const impulse = 2 * (kx * nx + ky * ny) / 2;
          p1.vx = (p1.vx - impulse * nx) * RESTITUTION;
          p1.vy = (p1.vy - impulse * ny) * RESTITUTION;
          p2.vx = (p2.vx + impulse * nx) * RESTITUTION;
          p2.vy = (p2.vy + impulse * ny) * RESTITUTION;
        }
      }
    }
  }

  function createEngine(canvas, callbacks) {
    const ctx = canvas.getContext('2d');
    const cx = WIDTH / 2;
    const cy = HEIGHT / 2;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const flipDuration = prefersReducedMotion ? 1 : 48;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const walls = initWalls().map(([x1, y1, x2, y2]) => ({ x1, y1, x2, y2 }));
    let particles = initParticles();
    let angle = 0;
    let targetAngle = 0;
    let flipProgress = 1;
    let flipStartAngle = 0;
    let isFlipping = false;
    let pendingAllegoryAdvance = false;
    let running = true;
    let raf = 0;

    function draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      ctx.strokeStyle = 'rgba(17,17,17,0.012)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < WIDTH; x += 12) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < HEIGHT; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle);
      ctx.translate(-cx, -cy);

      for (const w of walls) {
        ctx.beginPath();
        ctx.moveTo(w.x1, w.y1);
        ctx.lineTo(w.x2, w.y2);
        ctx.strokeStyle = C.ink;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.restore();
    }

    function update() {
      if (flipProgress < 1) {
        flipProgress += 1 / flipDuration;
        if (flipProgress >= 1) {
          flipProgress = 1;
          angle = targetAngle;
          isFlipping = false;
          if (pendingAllegoryAdvance) {
            pendingAllegoryAdvance = false;
            callbacks.onAdvanceAllegory();
          }
        } else if (!prefersReducedMotion) {
          const t = flipProgress;
          const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          angle = flipStartAngle + (targetAngle - flipStartAngle) * ease;
        } else {
          angle = targetAngle;
        }
      }

      for (const p of particles) {
        const gx = Math.sin(angle) * GRAVITY;
        const gy = Math.cos(angle) * GRAVITY;
        p.vx += gx;
        p.vy += gy;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;
      }
      resolveCollisions(particles, walls);
    }

    function loop() {
      if (running) {
        update();
        draw();
      }
      raf = requestAnimationFrame(loop);
    }

    function setRunning(next) {
      running = next;
      if (running) draw();
    }

    function flip() {
      if (isFlipping) return;
      isFlipping = true;
      flipProgress = 0;
      flipStartAngle = angle;
      targetAngle = angle + Math.PI;
      pendingAllegoryAdvance = true;
      const deg = targetAngle * 180 / Math.PI;
      callbacks.onFrameTransform(
        prefersReducedMotion
          ? 'rotate(' + deg + 'deg)'
          : 'scale(0.94) rotate(' + deg + 'deg)'
      );
    }

    function reset() {
      angle = 0;
      targetAngle = 0;
      flipProgress = 1;
      isFlipping = false;
      pendingAllegoryAdvance = false;
      particles = initParticles();
      callbacks.onResetAllegory();
      callbacks.onFrameTransform('none');
      draw();
    }

    loop();

    return {
      flip,
      reset,
      setRunning,
      destroy() {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
  }

  const btnBase = {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    border: '1px solid var(--ink)',
    padding: '6px 12px',
    cursor: 'pointer',
    background: 'var(--ink)',
    color: 'var(--paper)'
  };

  const AmpulhetaNative = React.memo(function AmpulhetaNative() {
    const canvasRef = React.useRef(null);
    const rootRef = React.useRef(null);
    const engineRef = React.useRef(null);
    const [allegoryIndex, setAllegoryIndex] = React.useState(0);
    const [quoteIndex, setQuoteIndex] = React.useState(0);
    const [frameTransform, setFrameTransform] = React.useState('none');

    const allegory = ALLEGORIES[allegoryIndex];
    const quote = allegory.quotes[quoteIndex];
    const drop = quote.text.charAt(0);
    const rest = quote.text.slice(1);

    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return undefined;

      engineRef.current = createEngine(canvas, {
        onAdvanceAllegory() {
          setAllegoryIndex((i) => (i + 1) % ALLEGORIES.length);
          setQuoteIndex(0);
        },
        onResetAllegory() {
          setAllegoryIndex(0);
          setQuoteIndex(0);
        },
        onFrameTransform(transform) {
          setFrameTransform(transform);
        }
      });

      const root = rootRef.current;
      let observer;
      if (root && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries) => {
            const visible = entries.some((e) => e.isIntersecting);
            engineRef.current?.setRunning(visible && !document.hidden);
          },
          { threshold: 0.08 }
        );
        observer.observe(root);
      }

      const onVisibility = () => {
        if (!engineRef.current) return;
        const visible = root
          ? root.getBoundingClientRect().bottom > 0 && root.getBoundingClientRect().top < window.innerHeight
          : !document.hidden;
        engineRef.current.setRunning(visible && !document.hidden);
      };
      document.addEventListener('visibilitychange', onVisibility);

      return () => {
        observer?.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        engineRef.current?.destroy();
        engineRef.current = null;
      };
    }, []);

    return /*#__PURE__*/React.createElement('div', {
      ref: rootRef,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        userSelect: 'none'
      }
    }, /*#__PURE__*/React.createElement('p', {
      style: {
        margin: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--gold)'
      }
    }, '❧ ', allegory.name, ' ❧'), /*#__PURE__*/React.createElement('div', {
      style: { display: 'flex', gap: 8, flexWrap: 'wrap' }
    }, /*#__PURE__*/React.createElement('button', {
      type: 'button',
      style: btnBase,
      onClick: () => engineRef.current?.flip()
    }, 'Girar'), /*#__PURE__*/React.createElement('button', {
      type: 'button',
      style: { ...btnBase, background: 'transparent', color: 'var(--ink)' },
      onClick: () => engineRef.current?.reset()
    }, 'Reiniciar'), /*#__PURE__*/React.createElement('button', {
      type: 'button',
      style: { ...btnBase, background: 'transparent', color: 'var(--ink)' },
      onClick: () => setQuoteIndex((i) => (i + 1) % allegory.quotes.length)
    }, 'Outra citação')), /*#__PURE__*/React.createElement('div', {
      style: {
        background: 'var(--paper-deep)',
        border: '1px solid var(--ink)',
        boxShadow: '3px 3px 0 0 var(--ink)',
        padding: 5,
        transform: frameTransform,
        transition: 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
        maxWidth: 320,
        margin: '0 auto',
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement('div', {
      style: {
        border: '1px solid var(--gold)',
        aspectRatio: '3 / 4',
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement('canvas', {
      ref: canvasRef,
      style: { display: 'block', width: '100%', height: '100%' }
    }))), /*#__PURE__*/React.createElement('blockquote', {
      style: {
        margin: 0,
        padding: '12px 0 0',
        borderTop: '1px solid var(--rule-hairline)'
      }
    }, /*#__PURE__*/React.createElement('p', {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        lineHeight: 1.5,
        color: 'var(--text-body)',
        textAlign: 'justify'
      }
    }, /*#__PURE__*/React.createElement('span', {
      'aria-hidden': true,
      style: {
        float: 'left',
        fontFamily: 'var(--font-display)',
        fontSize: 40,
        fontWeight: 600,
        lineHeight: 0.82,
        marginTop: 4,
        marginRight: 6,
        color: 'var(--rubric)'
      }
    }, drop), rest), /*#__PURE__*/React.createElement('footer', {
      style: {
        marginTop: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--gold)'
      }
    }, quote.author)));
  });

  Object.assign(window.avapp = window.avapp || {}, { AmpulhetaNative });
})();
