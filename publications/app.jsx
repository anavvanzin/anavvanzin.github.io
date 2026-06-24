/* ICONOCRACY Cabinet — Publications listing app */
const { createElement: h } = React;
const { Nav, Footer, PublicationCard } = window;
const { Eyebrow } = window.CabinetUtils;

function App() {
  const pubs = window.CabinetPublications;
  return h('div', { className: 'page-shell' }, [
    h(Nav, { backTo: '/', backLabel: 'Mesa' }),
    h('main', { id: 'main', className: 'page-main' }, [
      h(Eyebrow, { className: 'page-eyebrow' }, 'Publicações'),
      h('h1', { className: 'page-title' }, 'Trabalhos, comunicações e traduções'),
      h('p', { className: 'page-lede' },
        'Textos produzidos no âmbito da pesquisa em história e iconografia jurídica. Entradas marcadas como “conteúdo de substituição” serão atualizadas com referências finais após publicação.'
      ),
      h('div', { className: 'pub-list' },
        pubs.map((p, i) => h(PublicationCard, { key: p.id, pub: p, index: i }))
      )
    ]),
    h(Footer)
  ]);
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
