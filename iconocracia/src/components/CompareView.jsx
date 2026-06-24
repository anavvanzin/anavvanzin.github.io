// src/components/CompareView.jsx — side-by-side comparison table + radar chart.
// Renders up to 4 selected items as columns: metadata, radar, and a 10-row
// indicator table. Mobile degrades to stacked cards.
(function () {
  const { useState, useEffect, useMemo } = React;
  const MAX_SERIES = 4;

  const ICONOCRACY_INDICATORS = window.ICONOCRACY_INDICATORS || [
    { id: "FEI", label: "Exposição / Flesh", description: "Flesh Exposure Index (FEI)" },
    { id: "CII", label: "Idealização Clássica", description: "Classical Idealisation (CII)" },
    { id: "PRI", label: "Rigidez Postural", description: "Postural Rigidity (PRI)" },
    { id: "LEG", label: "Legitimação", description: "Legitimation (LEG)" },
    { id: "AUT", label: "Autoridade / Atemporalidade", description: "Authority / Agelessness (AUT)" },
    { id: "JUD", label: "Juridicidade", description: "Judiciality (JUD)" },
    { id: "SEN", label: "Serenidade", description: "Serenity / Militancy (SEN)" },
    { id: "SEM", label: "Semântica / Narrativa", description: "Semantic / Narrative (SEM)" },
    { id: "COM", label: "Comunicação / Serialidade", description: "Communication / Seriality (COM)" },
    { id: "ABS", label: "Inscrição Estatal / Abstração", description: "State Inscription / Absorption (ABS)" },
  ];

  const REGIME = window.IC_REGIME || {
    FUNDACIONAL: { roman: "I", label: "Fundacional-Sacrificial", color: "#6B52B0" },
    NORMATIVO: { roman: "II", label: "Normativo-Jurídico", color: "#2A7A5A" },
    MILITAR: { roman: "III", label: "Militar-Imperial", color: "#B23636" },
    CONTRA_ALEGORIA: { roman: "IV", label: "Contra-Alegoria", color: "#A04030" },
    "CONTRA-ALEGORIA": { roman: "IV", label: "Contra-Alegoria", color: "#A04030" },
    CRÍTICO: { roman: "V", label: "Crítico", color: "#8A5FA8" },
    "NÃO ALEGÓRICO": { roman: "·", label: "Não Alegórico", color: "#6F665C" },
    NÃO_ALEGÓRICO: { roman: "·", label: "Não Alegórico", color: "#6F665C" },
    PENDENTE: { roman: "?", label: "Pendente", color: "#9A9AB0" },
    "NÃO CLASSIFICADO": { roman: "?", label: "Não Classificado", color: "#9A9AB0" },
  };

  function reg(id) {
    return REGIME[id] || REGIME["NÃO CLASSIFICADO"] || { roman: "?", label: id || "—", color: "#9A9AB0" };
  }

  function useViewport() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
    useEffect(() => {
      const f = () => setW(window.innerWidth);
      window.addEventListener("resize", f);
      return () => window.removeEventListener("resize", f);
    }, []);
    return w;
  }

  function Radar({ series, size = 260 }) {
    const cx = size / 2, cy = size / 2, R = size / 2 - 38, N = ICONOCRACY_INDICATORS.length;
    const ang = (i) => (Math.PI * 2 * i) / N - Math.PI / 2;
    const pt = (i, rad) => [cx + Math.cos(ang(i)) * rad, cy + Math.sin(ang(i)) * rad];
    const poly = (scores) => ICONOCRACY_INDICATORS.map((ind, i) => pt(i, ((scores[ind.id] || 0) / 3) * R).join(",")).join(" ");
    const dashStyles = ["none", "5 3", "2 2", "7 4"];
    const fillOpacity = [0.16, 0.12, 0.10, 0.08];

    return React.createElement("svg", {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      style: { display: "block", maxWidth: "100%" },
      role: "img",
      "aria-label": `Radar comparativo dos dez indicadores iconométricos entre ${series.length} espécime${series.length > 1 ? "s" : ""}`,
    },
      [1, 2, 3].map((ring) => React.createElement("polygon", {
        key: ring,
        points: ICONOCRACY_INDICATORS.map((_, i) => pt(i, (ring / 3) * R).join(",")).join(" "),
        fill: "none",
        stroke: "var(--c-border, var(--border))",
        strokeWidth: 1,
        opacity: ring === 3 ? 0.8 : 0.4,
      })),

      ICONOCRACY_INDICATORS.map((ind, i) => {
        const [x, y] = pt(i, R);
        const [lx, ly] = pt(i, R + 16);
        return React.createElement("g", { key: ind.id },
          React.createElement("line", { x1: cx, y1: cy, x2: x, y2: y, stroke: "var(--c-border, var(--border))", strokeWidth: 1, opacity: 0.4 }),
          React.createElement("text", {
            x: lx, y: ly,
            textAnchor: "middle",
            dominantBaseline: "middle",
            style: { fontFamily: "var(--font-mono)", fontSize: 8, fill: "var(--c-ink-3, var(--text-tertiary))", letterSpacing: ".3px" },
          }, ind.id)
        );
      }),

      series.map((s, si) => React.createElement("polygon", {
        key: si,
        points: poly(s.scores),
        fill: s.color,
        fillOpacity: fillOpacity[si % fillOpacity.length],
        stroke: s.color,
        strokeWidth: 2,
        strokeDasharray: dashStyles[si % dashStyles.length],
      })),

      series.map((s, si) => ICONOCRACY_INDICATORS.map((ind, i) => {
        const [x, y] = pt(i, ((s.scores[ind.id] || 0) / 3) * R);
        return React.createElement("circle", {
          key: `${si}-${i}`, cx: x, cy: y, r: 2.4, fill: s.color,
        });
      }))
    );
  }

  function CompareView({ selected, onClose }) {
    if (!selected || !selected.length) return null;
    const vw = useViewport();
    const stack = vw < 880;
    const tight = vw < 560;
    const series = selected.slice(0, MAX_SERIES).map((it) => ({
      id: it.id,
      label: it.title,
      color: reg(it.regime).color,
      scores: it.indicators || {},
    }));

    return React.createElement("div", {
      role: "dialog",
      "aria-modal": true,
      "aria-label": "Comparação lado a lado",
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 2147483646,
        background: "var(--c-ground, var(--surface-page))",
        color: "var(--c-ink, var(--text-primary))",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn .25s var(--ease-out) both",
      },
    },
      // chrome
      React.createElement("div", {
        style: {
          position: "sticky",
          top: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: tight ? "10px 14px" : "14px 24px",
          background: "var(--c-panel, var(--surface-card))",
          borderBottom: "1px solid var(--c-border, var(--border))",
          boxShadow: "0 1px 12px rgba(0,0,0,.06)",
          flexWrap: "wrap",
        },
      },
        React.createElement("div", {
          style: { fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: tight ? 18 : 22, color: "var(--c-ink, var(--text-primary))" },
        }, "Comparação iconométrica"),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
          window.PresentMode && React.createElement("button", {
            type: "button",
            onClick: () => {
              if (typeof window.openPresentMode === "function") window.openPresentMode(selected, 0);
            },
            "aria-label": "Apresentar comparação",
            style: {
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid var(--c-border, var(--border))",
              background: "var(--c-panel, var(--surface-card))",
              color: "var(--c-ink, var(--text-primary))",
              cursor: "pointer",
            },
          }, "Apresentar"),
          React.createElement("button", {
            type: "button",
            onClick: onClose,
            "aria-label": "Fechar comparação",
            style: {
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid var(--c-border, var(--border))",
              background: "var(--c-panel, var(--surface-card))",
              color: "var(--c-ink, var(--text-primary))",
              cursor: "pointer",
            },
          }, "Fechar")
        )
      ),

      // radar (full width, centered)
      React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          padding: tight ? "18px 14px" : "26px 24px",
          background: "color-mix(in srgb, var(--c-panel, var(--surface-card)) 40%, transparent)",
          borderBottom: "1px solid var(--c-border, var(--border))",
        },
      },
        React.createElement(Radar, { series, size: stack ? Math.min(vw - 28, 320) : 320 })
      ),

      // grid of columns
      React.createElement("div", {
        style: {
          flex: 1,
          display: "grid",
          gridTemplateColumns: stack ? "1fr" : `repeat(${Math.min(series.length, MAX_SERIES)}, minmax(220px, 1fr))`,
          gap: 0,
          padding: tight ? "14px" : "20px 24px 40px",
        },
      },
        series.map((s, idx) => {
          const it = selected[idx];
          const r = reg(it.regime);
          return React.createElement("div", {
            key: it.id,
            style: {
              borderRight: !stack && idx < series.length - 1 ? "1px solid var(--c-border, var(--border))" : "none",
              padding: stack ? "0 0 22px" : "0 18px",
              borderBottom: stack && idx < series.length - 1 ? "1px solid var(--c-border, var(--border))" : "none",
            },
          },
            // plate
            React.createElement("figure", {
              style: { margin: "0 0 14px", position: "relative", height: stack ? 240 : 200, overflow: "hidden", borderRadius: "var(--radius-sm)", border: "1px solid var(--c-border, var(--border))", background: "var(--navy-mid, #1D2548)" },
            },
              React.createElement("img", {
                src: it.img,
                alt: it.title,
                style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
              }),
              React.createElement("figcaption", {
                style: {
                  position: "absolute", left: 0, right: 0, bottom: 0,
                  background: "linear-gradient(180deg, transparent, rgba(13,16,30,.94))",
                  padding: "24px 10px 8px",
                },
              },
                React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "1.5px", color: "var(--gold-bright, #D4A85E)", textTransform: "uppercase" } }, `${it.country} · ${it.year} · ${it.support}`),
                React.createElement("div", { style: { fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15, color: "#F4ECD8", marginTop: 1, lineHeight: 1.15 } }, it.title)
              )
            ),

            // metadata
            React.createElement("div", { style: { marginBottom: 14 } },
              React.createElement("span", {
                style: {
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "1.5px", textTransform: "uppercase",
                  color: r.color, border: `1px solid ${r.color}`, borderRadius: 999, padding: "2px 8px",
                  background: `color-mix(in srgb, ${r.color} 12%, transparent)`,
                },
              },
                React.createElement("span", { style: { fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 11 } }, r.roman),
                r.label
              ),
              React.createElement("p", { style: { fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.55, color: "var(--c-ink-2, var(--text-secondary))", margin: "8px 0 0" } }, it.archive)
            ),

            // indicator table column
            React.createElement("table", {
              style: { width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)", fontSize: 13 },
            },
              React.createElement("thead", null,
                React.createElement("tr", null,
                  React.createElement("th", { style: { textAlign: "left", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "1px", textTransform: "uppercase", color: "var(--c-ink-3, var(--text-tertiary))", padding: "6px 4px", borderBottom: "1px solid var(--c-border, var(--border))" } }, "Indicador"),
                  React.createElement("th", { style: { textAlign: "right", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "1px", textTransform: "uppercase", color: "var(--c-ink-3, var(--text-tertiary))", padding: "6px 4px", borderBottom: "1px solid var(--c-border, var(--border))" } }, "Valor")
                )
              ),
              React.createElement("tbody", null,
                ICONOCRACY_INDICATORS.map((ind) => {
                  const v = (it.indicators && it.indicators[ind.id]) || 0;
                  return React.createElement("tr", { key: ind.id },
                    React.createElement("td", { style: { padding: "5px 4px", borderBottom: "1px solid color-mix(in srgb, var(--c-border, var(--border)) 50%, transparent)", color: "var(--c-ink-2, var(--text-secondary))" } },
                      React.createElement("div", { style: { fontWeight: 500 } }, ind.label),
                      React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--c-ink-3, var(--text-tertiary))", letterSpacing: ".5px" } }, ind.id)
                    ),
                    React.createElement("td", { style: { padding: "5px 4px", borderBottom: "1px solid color-mix(in srgb, var(--c-border, var(--border)) 50%, transparent)", textAlign: "right" } },
                      React.createElement("span", {
                        style: {
                          display: "inline-block",
                          minWidth: 22,
                          padding: "2px 6px",
                          borderRadius: 999,
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          textAlign: "center",
                          background: `color-mix(in srgb, ${r.color} ${Math.max(10, (v / 3) * 60)}%, transparent)`,
                          color: v > 1 ? "#F4ECD8" : "var(--c-ink, var(--text-primary))",
                        },
                      }, v)
                    )
                  );
                })
              )
            )
          );
        })
      )
    );
  }

  window.CompareView = CompareView;
  window.CompareRadar = Radar;
})();
