/* ICONOCRACY Cabinet — reusable Atlas object page template */
const { createElement: h } = React;
const { Eyebrow, SectionRule, SeedBadge } = window.CabinetUtils;

function ObjectPage({ object }) {
  if (!object) return h('p', null, 'Objeto não encontrado.');

  return h('article', { className: 'object-page' }, [
    h('header', { className: 'object-header' }, [
      h(Eyebrow, null, `${object.date || 's.d.'} · ${object.location || '—'} · ${object.medium || '—'}`),
      h('h1', { className: 'object-title' }, object.title),
      h('p', { className: 'object-creator' }, object.creator || '—'),
      object.status === 'seed' && h(SeedBadge)
    ]),

    object.imageUrl && h('figure', { className: 'object-figure' }, [
      h('img', { src: object.imageUrl, alt: object.title }),
      h('figcaption', null, object.imageRights || '')
    ]),

    h('div', { className: 'object-grid' }, [
      h('section', { className: 'object-section' }, [
        h('h2', null, 'Função jurídica/política'),
        h('p', null, object.legalFunction)
      ]),
      h('section', { className: 'object-section' }, [
        h('h2', null, 'Interpretação'),
        h('p', null, object.interpretation)
      ]),
      h('section', { className: 'object-section' }, [
        h('h2', null, 'O que notar'),
        h('p', null, object.whatToNotice)
      ])
    ]),

    h(SectionRule),

    h('div', { className: 'object-meta' }, [
      h('div', { className: 'meta-block' }, [
        h('h3', null, 'Temas'),
        h('ul', null, (object.themes || []).map(t => h('li', { key: t }, t)))
      ]),
      h('div', { className: 'meta-block' }, [
        h('h3', null, 'Atributos visuais'),
        h('ul', null, (object.visualAttributes || []).map(a => h('li', { key: a }, a)))
      ])
    ])
  ]);
}

if (typeof window !== 'undefined') window.CabinetObjectPage = ObjectPage;
