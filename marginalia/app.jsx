/* ICONOCRACY Cabinet — Marginalia listing app */
const { createElement: h } = React;
const { Nav, Footer, EssayCard } = window;
const { Eyebrow, SeedBadge } = window.CabinetUtils;

function App() {
  const essays = window.CabinetEssays;
  return h('div', { className: 'page-shell' }, [
    h(Nav, { backTo: '/', backLabel: 'Mesa' }),
    h('main', { id: 'main', className: 'page-main' }, [
      h(Eyebrow, { className: 'page-eyebrow' }, 'Marginalia'),
      h('h1', { className: 'page-title' }, 'Notas de leitura do arquivo'),
      h('p', { className: 'page-lede' },
        'Ensaios curtos sobre imagens, símbolos e documentos jurídicos. Cada texto é uma anotação de borda — um comentário que não pretende ser a última palavra, mas o ponto de partida para outra leitura.'
      ),
      h('div', { className: 'essay-grid' },
        essays.map((e, i) => h(EssayCard, { key: e.id, essay: e, index: i }))
      )
    ]),
    h(Footer)
  ]);
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
