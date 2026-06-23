/* ICONOCRACY Cabinet — Reading Room bibliography entry */
const { createElement: h } = React;

function BibliographyEntry({ entry }) {
  return h('article', { className: 'bib-entry' }, [
    h('header', { className: 'bib-header' }, [
      h('p', { className: 'bib-meta' }, `${entry.author} · ${entry.year}`),
      h('h3', { className: 'bib-title' }, entry.title)
    ]),
    h('p', { className: 'bib-citation' }, entry.citation),
    h('p', { className: 'bib-annotation' }, entry.annotation)
  ]);
}

if (typeof window !== 'undefined') window.CabinetBibliographyEntry = BibliographyEntry;
