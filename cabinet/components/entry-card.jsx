/* ICONOCRACY Cabinet — interactive entry cards for the six symbols */
const { createElement: h } = React;

const ICONS = {
  blindfold: (color) => h('svg', { viewBox: '0 0 64 64', width: 48, height: 48, fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', 'aria-hidden': 'true' }, [
    h('path', { d: 'M12 28c8-6 32-6 40 0' }),
    h('path', { d: 'M12 28v12c8 6 32 6 40 0V28' }),
    h('circle', { cx: 24, cy: 34, r: 3 }),
    h('circle', { cx: 40, cy: 34, r: 3 })
  ]),
  scale: (color) => h('svg', { viewBox: '0 0 64 64', width: 48, height: 48, fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', 'aria-hidden': 'true' }, [
    h('path', { d: 'M32 8v28' }),
    h('path', { d: 'M16 36h32' }),
    h('path', { d: 'M10 46c4-4 8-4 12 0' }),
    h('path', { d: 'M42 46c4-4 8-4 12 0' })
  ]),
  sword: (color) => h('svg', { viewBox: '0 0 64 64', width: 48, height: 48, fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', 'aria-hidden': 'true' }, [
    h('path', { d: 'M20 44L44 20' }),
    h('path', { d: 'M44 20l-4-4' }),
    h('path', { d: 'M24 48l-4-4' }),
    h('circle', { cx: 46, cy: 18, r: 4 })
  ]),
  crown: (color) => h('svg', { viewBox: '0 0 64 64', width: 48, height: 48, fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', 'aria-hidden': 'true' }, [
    h('path', { d: 'M12 48h40' }),
    h('path', { d: 'M12 48L20 24l12 12 12-12 8 24' }),
    h('circle', { cx: 32, cy: 20, r: 3 })
  ]),
  folio: (color) => h('svg', { viewBox: '0 0 64 64', width: 48, height: 48, fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', 'aria-hidden': 'true' }, [
    h('rect', { x: 14, y: 10, width: 36, height: 44 }),
    h('path', { d: 'M22 22h20' }),
    h('path', { d: 'M22 30h20' }),
    h('path', { d: 'M22 38h12' })
  ]),
  rubric: (color) => h('svg', { viewBox: '0 0 64 64', width: 48, height: 48, fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', 'aria-hidden': 'true' }, [
    h('path', { d: 'M10 14h44' }),
    h('path', { d: 'M10 26h28' }),
    h('path', { d: 'M10 38h44' }),
    h('path', { d: 'M10 50h36' }),
    h('path', { d: 'M46 50l12-24', stroke: '#A04030', strokeWidth: 3 })
  ])
};

function EntryCard({ symbol, index }) {
  const reduced = window.CabinetUtils.useReducedMotion();
  const delay = reduced ? 0 : `${index * 80}ms`;
  const icon = ICONS[symbol.icon] || ICONS.folio;

  return h('a', {
    href: symbol.route,
    className: 'entry-card',
    style: { animationDelay: delay },
    'aria-label': `${symbol.title}: ${symbol.label}`
  }, [
    h('div', { className: 'entry-card-icon' }, icon(symbol.color)),
    h('div', { className: 'entry-card-body' }, [
      h('span', { className: 'entry-card-label' }, symbol.label),
      h('h3', { className: 'entry-card-title' }, symbol.title),
      h('p', { className: 'entry-card-summary' }, symbol.summary)
    ]),
    h('span', { className: 'entry-card-arrow', 'aria-hidden': 'true' }, '→')
  ]);
}

if (typeof window !== 'undefined') window.CabinetEntryCard = EntryCard;
