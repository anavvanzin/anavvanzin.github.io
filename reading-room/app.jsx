/* ICONOCRACY Cabinet — Reading Room app */
const { createElement: h } = React;
const { Nav, Footer, BibliographyEntry, ThemeFilter } = window;
const { Eyebrow, useCabinetThemeFilter } = window.CabinetUtils;

function App() {
  const shelves = window.CabinetShelves;
  const themes = window.CabinetThemes;
  const allReadings = shelves.flatMap(s => s.readings.map(r => ({ ...r, shelf: s.title })));
  const { active, setActive, filtered } = useCabinetThemeFilter(allReadings, 'themes');

  return h('div', { className: 'page-shell' }, [
    h(Nav, { backTo: '/', backLabel: 'Mesa' }),
    h('main', { id: 'main', className: 'page-main' }, [
      h(Eyebrow, { className: 'page-eyebrow' }, 'Reading Room'),
      h('h1', { className: 'page-title' }, 'Prateleiras de leitura'),
      h('p', { className: 'page-lede' },
        'Uma biblioteca de trabalho: obras que sustentam a pesquisa, organizadas por estante. Cada entrada traz uma anotação pessoal, não apenas a citação.'
      ),
      h(ThemeFilter, { themes, active, onChange: setActive }),
      active === 'all'
        ? h('div', { className: 'reading-room' },
            shelves.map(shelf => h('section', { key: shelf.id, className: 'shelf' }, [
              h('h2', { className: 'shelf-title' }, shelf.title),
              h('div', { className: 'bib-grid' },
                shelf.readings.map(r => h(BibliographyEntry, { key: r.id, entry: r }))
              )
            ]))
          )
        : h('div', { className: 'reading-room' }, [
            h('h2', { className: 'shelf-title' }, `Filtrado por tema: ${themes.find(t => t.id === active)?.label || active}`),
            h('div', { className: 'bib-grid' },
              filtered.map(r => h(BibliographyEntry, { key: r.id, entry: r }))
            )
          ])
    ]),
    h(Footer)
  ]);
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
