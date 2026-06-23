/* ICONOCRACY Cabinet — landing app */
const { createElement: h, Fragment } = React;
const { Nav, Footer, CabinetHero, EntryCard, DrawSymbolCard } = window;

function App() {
  const symbols = window.CabinetSymbols;
  return h('div', { className: 'page-shell' }, [
    h(Nav, { backTo: '/', backLabel: 'Mesa' }),
    h('main', { id: 'main', className: 'page-main' }, [
      h(CabinetHero),
      h('section', { className: 'entries-section', 'aria-labelledby': 'entries-heading' }, [
        h('h2', { id: 'entries-heading', className: 'visually-hidden' }, 'Pontos de entrada'),
        h('div', { className: 'entries-grid' },
          symbols.map((s, i) => h(EntryCard, { key: s.id, symbol: s, index: i }))
        )
      ]),
      h(DrawSymbolCard)
    ]),
    h(Footer)
  ]);
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
