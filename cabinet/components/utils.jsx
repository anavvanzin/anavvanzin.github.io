/* ICONOCRACY Cabinet — shared React helpers */
const { createElement: h, Fragment } = React;

function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

function Eyebrow({ children, className, as = 'span' }) {
  return h(as, { className: classNames('eyebrow', className) }, children);
}

function RubricLink({ href, children, external = false }) {
  const props = { className: 'rubric-link', href };
  if (external) props.target = '_blank';
  if (external) props.rel = 'noopener noreferrer';
  return h('a', props, children);
}

function SectionRule() {
  return h('hr', { className: 'section-rule' });
}

function PageShell({ children, title, description, backTo = '/iconocracy/', backLabel = 'Cabinet' }) {
  return h('div', { className: 'page-shell' }, [
    h(Nav, { backTo, backLabel }),
    h('main', { id: 'main', className: 'page-main' }, children),
    h(Footer)
  ]);
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, []);
  return reduced;
}

function SeedBadge() {
  return h('span', { className: 'seed-badge' }, 'conteúdo de substituição');
}

if (typeof window !== 'undefined') {
  window.CabinetUtils = { classNames, Eyebrow, RubricLink, SectionRule, PageShell, useReducedMotion, SeedBadge };
}
