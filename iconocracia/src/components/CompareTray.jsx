// src/components/CompareTray.jsx — persistent selection tray.
// Shows selected plates as thumbnails with remove actions and a button to
// open the full side-by-side comparison view.
(function () {
  const { useState } = React;

  const btnBase = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 999,
    border: "1px solid var(--c-border, var(--border))",
    background: "var(--c-panel, var(--surface-card))",
    color: "var(--c-ink, var(--text-primary))",
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background .15s, color .15s, border-color .15s, transform .15s",
  };

  function CompareTray({ compare, onOpen }) {
    const { selected, count, max, remove, clear, canAdd } = compare;
    const [open, setOpen] = useState(true);
    if (!count) return null;

    return React.createElement("div", {
      role: "region",
      "aria-label": "Bandeja de comparação",
      style: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483640,
        background: "var(--c-panel, var(--surface-card))",
        color: "var(--c-ink, var(--text-primary))",
        borderTop: "1px solid var(--c-border, var(--border))",
        boxShadow: "0 -8px 40px rgba(0,0,0,.12)",
        padding: open ? "14px 18px 18px" : "8px 18px",
        transition: "padding .2s var(--ease-out)",
        fontFamily: "var(--font-body)",
      },
    },
      // header / collapse toggle
      React.createElement("div", {
        style: { display: "flex", alignItems: "center", gap: 14, marginBottom: open ? 12 : 0 },
      },
        React.createElement("button", {
          type: "button",
          onClick: () => setOpen((o) => !o),
          "aria-expanded": open,
          "aria-label": open ? "Recolher bandeja" : "Expandir bandeja",
          style: { ...btnBase, width: 28, height: 28, padding: 0 },
        }, open ? "−" : "+"),
        React.createElement("div", {
          style: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--c-ink-3, var(--text-tertiary))" },
        }, "Comparação ", React.createElement("strong", { style: { color: "var(--c-ink, var(--text-primary))" } }, `${count}/${max}`)),
        React.createElement("div", { style: { flex: 1 } }),
        React.createElement("button", {
          type: "button",
          onClick: onOpen,
          style: {
            ...btnBase,
            background: "var(--accent, var(--terracotta))",
            color: "#F4ECD8",
            borderColor: "var(--accent, var(--terracotta))",
          },
        }, "Comparar"),
        window.CitationButton && React.createElement(window.CitationButton, {
          items: selected,
          label: `Exportar ${selected.length} citação${selected.length > 1 ? "ões" : ""} ABNT`,
        }),
        React.createElement("button", {
          type: "button",
          onClick: clear,
          "aria-label": "Limpar seleção",
          title: "Limpar seleção",
          style: { ...btnBase, padding: "8px 10px" },
        }, "×")
      ),

      open && React.createElement("div", {
        style: { display: "flex", gap: 12, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 2 },
      },
        selected.map((it) => React.createElement("div", {
          key: it.id,
          style: {
            flex: "0 0 auto",
            width: 140,
            position: "relative",
            border: "1px solid var(--c-border, var(--border))",
            borderRadius: "var(--radius-sm)",
            overflow: "hidden",
            background: "var(--c-ground, var(--surface-page))",
          },
        },
          React.createElement("img", {
            src: it.img,
            alt: it.title,
            loading: "lazy",
            style: { width: "100%", height: 86, objectFit: "cover", display: "block" },
          }),
          React.createElement("div", {
            style: { padding: "6px 8px 8px" },
          },
            React.createElement("div", {
              style: { fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 12, lineHeight: 1.15, color: "var(--c-ink, var(--text-primary))", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
            }, it.title),
            React.createElement("div", {
              style: { fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--c-ink-3, var(--text-tertiary))", letterSpacing: ".5px", marginTop: 2 },
            }, `${it.country} · ${it.year}`)
          ),
          React.createElement("button", {
            type: "button",
            onClick: () => remove(it.id),
            "aria-label": `Remover ${it.title} da comparação`,
            title: "Remover",
            style: {
              position: "absolute",
              top: 4,
              right: 4,
              width: 22,
              height: 22,
              borderRadius: 999,
              border: "1px solid var(--c-border, var(--border))",
              background: "var(--c-panel, var(--surface-card))",
              color: "var(--c-ink, var(--text-primary))",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              lineHeight: 1,
            },
          }, "×")
        )),

        canAdd && React.createElement("div", {
          style: {
            flex: "0 0 auto",
            width: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed var(--c-border, var(--border))",
            borderRadius: "var(--radius-sm)",
            color: "var(--c-ink-3, var(--text-tertiary))",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "1px",
            textTransform: "uppercase",
            textAlign: "center",
            padding: "0 8px",
          },
        }, `Selecione até ${max - count} a mais`)
      )
    );
  }

  window.CompareTray = CompareTray;
})();
