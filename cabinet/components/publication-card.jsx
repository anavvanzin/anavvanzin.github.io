/* ICONOCRACY Cabinet — publication card */
const { createElement: h } = React;
const { Eyebrow, SeedBadge } = window.CabinetUtils;

function PublicationCard({ pub, index }) {
  const reduced = window.CabinetUtils.useReducedMotion();
  const delay = reduced ? 0 : `${index * 90}ms`;

  return h('article', { className: 'pub-card', style: { animationDelay: delay } }, [
    h('header', { className: 'pub-header' }, [
      h(Eyebrow, null, `${pub.year} · ${pub.venue}`),
      pub.status === 'seed' && h(SeedBadge)
    ]),
    h('h2', { className: 'pub-title' }, pub.title),
    h('p', { className: 'pub-summary' }, pub.summary),
    h('p', { className: 'pub-abstract' }, pub.abstract),
    h('a', { href: pub.route, className: 'pub-link', 'aria-label': `Ver detalhes de ${pub.title}` }, 'Ver detalhes →')
  ]);
}

if (typeof window !== 'undefined') window.CabinetPublicationCard = PublicationCard;
