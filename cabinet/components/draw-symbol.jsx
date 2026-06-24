/* ICONOCRACY Cabinet — "Draw a Legal Symbol" interaction card (stub) */
const { createElement: h, useRef, useState } = React;

function DrawSymbolCard() {
  const canvasRef = useRef(null);
  const [note, setNote] = useState('');

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setNote('');
  };

  return h('section', { className: 'draw-symbol-card' }, [
    h('h2', { className: 'draw-title' }, 'Desenhe um símbolo jurídico'),
    h('p', { className: 'draw-lede' }, 'Use o canvas abaixo para rascunhar uma venda, balança, espada ou coroa. Por enquanto, este é um espaço de anotação visual; em breve será possível comparar traços com o corpus iconográfico.'),
    h('canvas', {
      ref: canvasRef,
      className: 'draw-canvas',
      width: 320,
      height: 240,
      'aria-label': 'Área de desenho para símbolo jurídico'
    }),
    h('div', { className: 'draw-actions' }, [
      h('button', { className: 'draw-btn', onClick: clear }, 'Limpar'),
      h('span', { className: 'draw-note' }, note || 'Nada salvo ainda')
    ])
  ]);
}

if (typeof window !== 'undefined') window.CabinetDrawSymbolCard = DrawSymbolCard;
