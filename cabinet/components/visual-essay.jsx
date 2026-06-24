/* ICONOCRACY Cabinet — flagship visual essay template */
const { createElement: h } = React;
const { Eyebrow, SectionRule, SeedBadge } = window.CabinetUtils;

function VisualEssay({ essay }) {
  return h('article', { className: 'visual-essay' }, [
    h('header', { className: 'essay-header' }, [
      h(Eyebrow, null, 'Ensaio visual'),
      h('h1', { className: 'essay-title' }, essay.title),
      h('p', { className: 'essay-lede' }, essay.lede),
      essay.status === 'seed' && h(SeedBadge)
    ]),

    h('div', { className: 'essay-chapters' },
      (essay.sections || []).map((section, i) => h('section', { key: i, className: 'essay-chapter' }, [
        h('h2', null, section.heading),
        h('p', null, section.body)
      ]))
    ),

    h(SectionRule),

    h('aside', { className: 'essay-related' }, [
      h('h3', null, 'Para continuar'),
      h('ul', null, [
        h('li', null, h('a', { href: '/marginalia/' }, 'Ler os ensaios Marginalia')),
        h('li', null, h('a', { href: '/iconocracy/object-example.html' }, 'Ver página de objeto-exemplo')),
        h('li', null, h('a', { href: '/atlas/' }, 'Entrar no Atlas da Pesquisa'))
      ])
    ])
  ]);
}

if (typeof window !== 'undefined') window.CabinetVisualEssay = VisualEssay;
