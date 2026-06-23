/* ICONOCRACY Cabinet — reusable theme filter UI */
const { createElement: h, useState } = React;

function ThemeFilter({ themes, active, onChange }) {
  return h('div', { className: 'theme-filter', role: 'group', 'aria-label': 'Filtrar por tema' }, [
    h('button', {
      className: 'theme-chip' + (active === 'all' ? ' is-active' : ''),
      onClick: () => onChange('all'),
      'aria-pressed': active === 'all'
    }, 'Todos'),
    themes.map(t => h('button', {
      key: t.id,
      className: 'theme-chip' + (active === t.id ? ' is-active' : ''),
      onClick: () => onChange(t.id),
      'aria-pressed': active === t.id
    }, t.label))
  ]);
}

function useThemeFilter(items, themeKey = 'themes') {
  const [active, setActive] = useState('all');
  const filtered = active === 'all'
    ? items
    : items.filter(item => (item[themeKey] || []).includes(active));
  return { active, setActive, filtered };
}

if (typeof window !== 'undefined') {
  window.CabinetThemeFilter = ThemeFilter;
  window.useCabinetThemeFilter = useThemeFilter;
}
