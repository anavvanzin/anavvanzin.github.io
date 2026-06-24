/* ICONOCRACY Cabinet — About page app */
const { createElement: h } = React;
const { Nav, Footer } = window;
const { Eyebrow, SectionRule } = window.CabinetUtils;

function App() {
  return h('div', { className: 'page-shell' }, [
    h(Nav, { backTo: '/', backLabel: 'Mesa' }),
    h('main', { id: 'main', className: 'page-main' }, [
      h(Eyebrow, { className: 'page-eyebrow' }, 'Sobre'),
      h('h1', { className: 'page-title' }, 'Ana Vanzin'),
      h('div', { className: 'about-grid' }, [
        h('figure', { className: 'about-photo' }, [
          h('img', { src: '../assets/avo.png', alt: 'Ana Vanzin em foto de arquivo pessoal' })
        ]),
        h('div', { className: 'about-bio' }, [
          h('p', null,
            'Advogada e historiadora do direito. Doutoranda no Programa de Pós-Graduação em Direito da Universidade Federal de Santa Catarina (PPGD/UFSC), integrante do Grupo Ius Gentium.'
          ),
          h('p', null,
            'A tese ',
            h('em', null, 'ICONOCRACIA — A alegoria feminina como tecnologia visual do Estado'),
            ' investiga como o direito se imaginou, entre o incunábulo e o constitucionalismo moderno, por meio de corpos, alegorias, objetos, arquitetura e imagens de autoridade.'
          ),
          h(SectionRule),
          h('p', null, [
            h('strong', null, 'Contato: '), ' ',
            h('a', { href: 'mailto:anavvanzin@outlook.com', className: 'rubric-link' }, 'anavvanzin@outlook.com')
          ]),
          h('p', null, [
            h('a', { href: 'http://lattes.cnpq.br/9079096818962275', target: '_blank', rel: 'noopener noreferrer', className: 'rubric-link' }, 'Currículo Lattes'),
            ' · ',
            h('a', { href: '/atlas/', className: 'rubric-link' }, 'Atlas da Pesquisa')
          ])
        ])
      ])
    ]),
    h(Footer)
  ]);
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
