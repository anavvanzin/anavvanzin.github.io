/* ICONOCRACY Cabinet — hero for the Cabinet landing */
const { createElement: h } = React;

function CabinetHero() {
  return h('section', { className: 'cabinet-hero', 'aria-labelledby': 'cabinet-hero-title' }, [
    h('div', { className: 'hero-inner' }, [
      h('p', { className: 'hero-eyebrow' }, 'ICONOCRACIA · plataforma pública de pesquisa'),
      h('h1', { id: 'cabinet-hero-title', className: 'hero-title' },
        'Ana Vanzin studies how law imagines itself.'
      ),
      h('p', { className: 'hero-support' },
        'Through bodies, allegories, objects, architecture, and images of authority.'
      ),
      h('p', { className: 'hero-summary' },
        'Este Cabinet é um ponto de entrada para a tese ICONOCRACIA: uma cartografia comparada do corpo feminino alegórico na cultura jurídica, entre o incunábulo e o constitucionalismo moderno.'
      )
    ]),
    h('figure', { className: 'hero-ornament', style: { margin: '2.5rem auto 0', maxWidth: 520, textAlign: 'center' } }, [
      h('img', {
        src: '/assets/ornaments/moodboard-blindfold.jpg',
        alt: 'Justiça vendada sobre um manuscrito iluminado — composição decorativa',
        loading: 'lazy',
        style: { maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', border: '1px solid var(--ink, #1A1612)' }
      }),
      h('figcaption', { style: { fontSize: 11, opacity: 0.55, marginTop: 6, fontStyle: 'italic', letterSpacing: '0.02em' } },
        'composição decorativa · imagem gerada por IA'
      )
    ])
  ]);
}

if (typeof window !== 'undefined') window.CabinetHero = CabinetHero;
