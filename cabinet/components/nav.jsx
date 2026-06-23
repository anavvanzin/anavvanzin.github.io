/* ICONOCRACY Cabinet — global navigation */
const { createElement: h } = React;

function Nav({ backTo = '/', backLabel = 'Mesa' }) {
  const links = [
    { href: '/iconocracy/', label: 'Cabinet' },
    { href: '/marginalia/', label: 'Marginalia' },
    { href: '/publications/', label: 'Publicações' },
    { href: '/reading-room/', label: 'Reading Room' },
    { href: '/practice/', label: 'Prática' },
    { href: '/about/', label: 'Sobre' }
  ];

  return h('header', { className: 'cabinet-nav', role: 'banner' }, [
    h('nav', { className: 'cabinet-nav-inner', 'aria-label': 'Navegação do Cabinet' }, [
      h('a', { className: 'nav-home', href: backTo, 'aria-label': `Voltar para ${backLabel}` },
        h('span', { className: 'nav-mark' }, 'AV'),
        h('span', { className: 'nav-label' }, backLabel === 'Mesa' ? 'ana vanzin' : 'Cabinet')
      ),
      h('ul', { className: 'nav-links' }, links.map((l) =>
        h('li', { key: l.href },
          h('a', { href: l.href, className: 'nav-link' }, l.label)
        )
      ))
    ])
  ]);
}

if (typeof window !== 'undefined') window.CabinetNav = Nav;
