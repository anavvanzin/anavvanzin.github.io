// src/components/FilterPanel.jsx — faceted filter UI for Atlas and Atlas Lab.
// Dimensions: regime, country, support, year range. URL sync is handled by useFilters.
(function () {
  const { useState, useMemo } = React;

  const REGIME_LABELS = {
    FUNDACIONAL: "Fundacional",
    NORMATIVO: "Normativo",
    MILITAR: "Militar",
    CONTRA_ALEGORIA: "Contra-Alegoria",
    "CONTRA-ALEGORIA": "Contra-Alegoria",
    CRÍTICO: "Crítico",
    "NÃO ALEGÓRICO": "Não Alegórico",
    NÃO_ALEGÓRICO: "Não Alegórico",
    PENDENTE: "Pendente",
    "NÃO CLASSIFICADO": "Não Classificado",
  };

  const REGIME_COLORS = {
    FUNDACIONAL: "var(--fundacional, #5B3FA0)",
    NORMATIVO: "var(--normativo, #2A7A5A)",
    MILITAR: "var(--militar, #A02828)",
    CONTRA_ALEGORIA: "var(--contra-alegoria, #A04030)",
    "CONTRA-ALEGORIA": "var(--contra-alegoria, #A04030)",
    CRÍTICO: "var(--state-active, #8A5FA8)",
    "NÃO ALEGÓRICO": "var(--warm-gray, #7D756D)",
    NÃO_ALEGÓRICO: "var(--warm-gray, #7D756D)",
    PENDENTE: "var(--marble, #9A9690)",
    "NÃO CLASSIFICADO": "var(--marble, #9A9690)",
  };

  function sortByLabel(list) {
    return list.slice().sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
  }

  function groupCountries(countries) {
    const known = { BR: "Américas", FR: "Europa", DE: "Europa", UK: "Europa", BE: "Europa", IT: "Europa", PT: "Europa", ES: "Europa", NL: "Europa", CH: "Europa", AT: "Europa", US: "Américas", MX: "Américas", AR: "Américas", UY: "Américas" };
    const groups = {};
    for (const c of countries) {
      const g = known[c] || "Outros";
      (groups[g] = groups[g] || []).push(c);
    }
    const order = ["Europa", "Américas", "Outros"];
    return order.filter((g) => groups[g]).map((g) => ({ group: g, items: sortByLabel(groups[g]) }));
  }

  function Chip({ active, onClick, color, children, count }) {
    return React.createElement("button", {
      type: "button",
      "aria-pressed": active,
      onClick,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        borderRadius: 999,
        border: `1.5px solid ${active ? color : "var(--c-border, var(--border))"}`,
        background: active ? `color-mix(in srgb, ${color} 14%, var(--c-panel, var(--surface-card)))` : "var(--c-panel, var(--surface-card))",
        color: active ? color : "var(--c-ink, var(--text-primary))",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: ".5px",
        lineHeight: 1.2,
        transition: "background .15s, border-color .15s, color .15s",
      },
    }, children, count != null && React.createElement("span", { style: { fontSize: 8, opacity: 0.8 } }, `(${count})`));
  }

  function Checkbox({ checked, onChange, color, label }) {
    return React.createElement("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 0",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: 13,
        color: "var(--c-ink, var(--text-primary))",
      },
    },
      React.createElement("input", {
        type: "checkbox",
        checked,
        onChange,
        style: { accentColor: color || "var(--state-active)", width: 16, height: 16, flexShrink: 0 },
      }),
      React.createElement("span", { style: { flex: 1 } }, label)
    );
  }

  function Section({ title, children, right }) {
    return React.createElement("details", {
      open: true,
      style: { borderBottom: "1px solid var(--c-border, var(--border))" },
    },
      React.createElement("summary", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "10px 0",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "var(--c-gold, var(--accent-gold))",
          listStyle: "none",
        },
      },
        React.createElement("span", null, title),
        right
      ),
      React.createElement("div", { style: { padding: "0 0 14px", display: "flex", flexDirection: "column", gap: 4 } }, children)
    );
  }

  function FilterPanel({ filters, domain, onToggle, onSetYear, onClear, resultCount, compact }) {
    const [minVal, maxVal] = useMemo(() => {
      const mn = domain.yearMin != null ? domain.yearMin : 1200;
      const mx = domain.yearMax != null ? domain.yearMax : 2025;
      return [mn, mx];
    }, [domain.yearMin, domain.yearMax]);

    const yearMin = filters.yearMin === "" ? minVal : Number(filters.yearMin);
    const yearMax = filters.yearMax === "" ? maxVal : Number(filters.yearMax);

    return React.createElement("div", {
      style: {
        background: "var(--c-panel, var(--surface-card))",
        border: "1px solid var(--c-border, var(--border))",
        borderRadius: "var(--radius-sm)",
        padding: compact ? "12px 14px" : "16px 18px",
        fontFamily: "var(--font-body)",
        color: "var(--c-ink, var(--text-primary))",
        boxShadow: "var(--shadow-card, 0 4px 18px rgba(0,0,0,.06))",
      },
    },
      // header
      React.createElement("div", {
        style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 },
      },
        React.createElement("div", null,
          React.createElement("div", {
            style: { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--c-gold, var(--accent-gold))" },
          }, "Filtros"),
          React.createElement("div", {
            style: { fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: compact ? 18 : 20, color: "var(--c-ink, var(--text-primary))" },
          }, `${resultCount} resultado${resultCount === 1 ? "" : "s"}`)
        ),
        React.createElement("button", {
          type: "button",
          onClick: onClear,
          style: {
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "1px",
            textTransform: "uppercase",
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid var(--c-border, var(--border))",
            background: "transparent",
            color: "var(--c-ink-2, var(--text-secondary))",
            cursor: "pointer",
          },
        }, "Limpar")
      ),

      // regime
      React.createElement(Section, { title: "Regime" },
        sortByLabel(domain.regimes).map((r) =>
          React.createElement(Chip, {
            key: r,
            active: filters.regime.includes(r),
            color: REGIME_COLORS[r] || "var(--state-active)",
            onClick: () => onToggle("regime", r),
          }, REGIME_LABELS[r] || r)
        )
      ),

      // country
      React.createElement(Section, {
        title: "País",
        right: React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--c-ink-3, var(--text-tertiary))" } }, `${domain.countries.length} opções`),
      },
        groupCountries(domain.countries).map(({ group, items }) =>
          React.createElement("div", { key: group, style: { marginBottom: 8 } },
            React.createElement("div", {
              style: { fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "1px", textTransform: "uppercase", color: "var(--c-ink-3, var(--text-tertiary))", marginBottom: 4 },
            }, group),
            React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } },
              items.map((c) =>
                React.createElement(Chip, {
                  key: c,
                  active: filters.country.includes(c),
                  color: "var(--accent, var(--terracotta))",
                  onClick: () => onToggle("country", c),
                }, c)
              )
            )
          )
        )
      ),

      // support
      React.createElement(Section, { title: "Suporte" },
        sortByLabel(domain.supports).map((s) =>
          React.createElement(Checkbox, {
            key: s,
            checked: filters.support.includes(s),
            color: "var(--state-active)",
            onChange: () => onToggle("support", s),
            label: s,
          })
        )
      ),

      // year range
      React.createElement(Section, {
        title: "Ano",
        right: React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--c-ink-3, var(--text-tertiary))" } }, `${minVal}–${maxVal}`),
      },
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
            React.createElement("input", {
              type: "range",
              min: minVal,
              max: maxVal,
              value: Math.min(yearMin, yearMax),
              onChange: (e) => onSetYear("yearMin", e.target.value),
              style: { flex: 1 },
              "aria-label": "Ano mínimo",
            }),
            React.createElement("input", {
              type: "number",
              min: minVal,
              max: maxVal,
              value: Math.min(yearMin, yearMax),
              onChange: (e) => onSetYear("yearMin", e.target.value),
              style: { width: 72, fontFamily: "var(--font-mono)", fontSize: 12, padding: "4px 6px", border: "1px solid var(--c-border)", borderRadius: 6, background: "var(--c-ground, var(--surface-page))", color: "var(--c-ink)" },
            })
          ),
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
            React.createElement("input", {
              type: "range",
              min: minVal,
              max: maxVal,
              value: Math.max(yearMin, yearMax),
              onChange: (e) => onSetYear("yearMax", e.target.value),
              style: { flex: 1 },
              "aria-label": "Ano máximo",
            }),
            React.createElement("input", {
              type: "number",
              min: minVal,
              max: maxVal,
              value: Math.max(yearMin, yearMax),
              onChange: (e) => onSetYear("yearMax", e.target.value),
              style: { width: 72, fontFamily: "var(--font-mono)", fontSize: 12, padding: "4px 6px", border: "1px solid var(--c-border)", borderRadius: 6, background: "var(--c-ground, var(--surface-page))", color: "var(--c-ink)" },
            })
          )
        )
      )
    );
  }

  window.FilterPanel = FilterPanel;
})();
