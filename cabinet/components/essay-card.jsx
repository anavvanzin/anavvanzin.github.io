/* ICONOCRACY Cabinet — Marginalia essay card */
const { createElement: h } = React;
const { Eyebrow, SeedBadge } = window.CabinetUtils;

function EssayCard({ essay, index }) {
  const reduced = window.CabinetUtils.useReducedMotion();
  const delay = reduced ? 0 : `${index * 90}ms`;

  return h('a', {
    href: essay.route,
    className: 'essay-card',
    style: { animationDelay: delay },
    'aria-label': `Ensaio: ${essay.title}`
  }, [
    h('div', { className: 'essay-card-header' }, [
      h(Eyebrow, { className: 'essay-card-date' }, essay.date),
      essay.status === 'seed' && h(SeedBadge)
    ]),
    h('h2', { className: 'essay-card-title' }, essay.title),
    h('p', { className: 'essay-card-summary' }, essay.summary)
  ]);
}

if (typeof window !== 'undefined') window.CabinetEssayCard = EssayCard;
