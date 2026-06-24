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
    ])
  ]);
}

if (typeof window !== 'undefined') window.CabinetHero = CabinetHero;
