/* ICONOCRACY Cabinet — global footer */
const { createElement: h } = React;

function Footer() {
  return h('footer', { className: 'cabinet-footer' }, [
    h('div', { className: 'footer-inner' }, [
      h('p', { className: 'footer-line' },
        '© Ana Vanzin · ICONOCRACIA · PPGD/UFSC · Ius Gentium'
      ),
      h('p', { className: 'footer-line footer-note' },
        'Imagens reproduzidas para fins de pesquisa acadêmica; direitos dos respectivos acervos.'
      ),
      h('p', { className: 'footer-line footer-links' }, [
        h('a', { href: 'mailto:anavvanzin@outlook.com' }, 'contato'),
        ' · ',
        h('a', { href: 'http://lattes.cnpq.br/9079096818962275', target: '_blank', rel: 'noopener noreferrer' }, 'Lattes'),
        ' · ',
        h('a', { href: '/atlas/' }, 'Atlas da Pesquisa')
      ])
    ])
  ]);
}

if (typeof window !== 'undefined') window.CabinetFooter = Footer;
