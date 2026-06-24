/* ICONOCRACY Cabinet — Practice / projects app */
const { createElement: h } = React;
const { Nav, Footer } = window;
const { Eyebrow, SectionRule, SeedBadge } = window.CabinetUtils;

function App() {
  const projects = window.CabinetProjects;
  return h('div', { className: 'page-shell' }, [
    h(Nav, { backTo: '/', backLabel: 'Mesa' }),
    h('main', { id: 'main', className: 'page-main' }, [
      h(Eyebrow, { className: 'page-eyebrow' }, 'Prática'),
      h('h1', { className: 'page-title' }, 'Pesquisa, ensino e extensão'),
      h('div', { className: 'practice-grid' }, [
        h('div', { className: 'practice-intro' }, [
          h('p', null,
            'Além da tese, o trabalho acontece em grupo de pesquisa, comunicações em encontros acadêmicos, traduções e oficinas de leitura iconográfica.'
          ),
          h(SectionRule)
        ]),
        h('div', { className: 'project-list' },
          projects.map(p => h('article', { key: p.id, className: 'project-card' }, [
            h('p', { className: 'project-meta' }, `${p.institution} · ${p.year}`),
            p.status === 'seed' && h(SeedBadge),
            h('h3', null, p.title),
            h('p', { className: 'project-role' }, p.role),
            h('p', null, p.summary),
            p.link && h('a', { href: p.link, target: '_blank', rel: 'noopener noreferrer', className: 'rubric-link' }, 'Mais informações →')
          ]))
        )
      ])
    ]),
    h(Footer)
  ]);
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
