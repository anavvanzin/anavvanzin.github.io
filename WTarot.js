(function () {
  function WTarot({ lang }) {
    return React.createElement('iframe', {
      src: '/tarot/',
      title: lang === 'en' ? 'Tarô da Iconocracia — draw and shuffle' : 'Tarô da Iconocracia — sortear e embaralhar',
      style: { display: 'block', width: '100%', height: '100%', minHeight: '60vh', border: 0 }
    });
  }
  Object.assign(window.avapp = window.avapp || {}, { WTarot });
})();
