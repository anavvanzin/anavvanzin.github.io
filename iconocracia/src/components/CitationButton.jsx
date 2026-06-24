// src/components/CitationButton.jsx — ABNT citation export control.
// Usage:
//   <CitationButton item={it} />                 // single item
//   <CitationButton items={[it1, it2]} />       // multiple items
//   <CitationButton item={it} compact />        // icon-only button
// Opens a small popover menu with copy / .txt / .bib actions.
(function () {
  const { useState, useRef, useEffect } = React;

  const ICON_COPY = React.createElement("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
    React.createElement("rect", { x: 9, y: 9, width: 13, height: 13, rx: 2, ry: 2 }),
    React.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
  );

  const ICON_FILE = React.createElement("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
    React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
    React.createElement("polyline", { points: "14 2 14 8 20 8" })
  );

  const ICON_QUOTE = React.createElement("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
    React.createElement("path", { d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" }),
    React.createElement("path", { d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" })
  );

  function CitationButton({ item, items: itemsProp, compact, label }) {
    const items = Array.isArray(itemsProp) ? itemsProp : (item ? [item] : []);
    const count = items.length;
    const [open, setOpen] = useState(false);
    const [flash, setFlash] = useState(null);
    const btnRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
      if (!open) return;
      function onClick(e) {
        if (!menuRef.current || !menuRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
      function onKey(e) {
        if (e.key === "Escape") setOpen(false);
      }
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("mousedown", onClick);
        document.removeEventListener("keydown", onKey);
      };
    }, [open]);

    if (!count) return null;

    const plain = window.AbntLib.formatPlainText(items);
    const bib = window.AbntLib.formatBibTeX(items);
    const title = count === 1 ? items[0].title : `${count} itens selecionados`;

    async function doCopy() {
      const ok = await window.AbntLib.copyText(plain);
      setFlash(ok ? "Copiado" : "Erro ao copiar");
      setTimeout(() => setFlash(null), 1800);
    }

    function doDownloadTxt() {
      window.AbntLib.downloadBlob(plain, count === 1 ? `${items[0].id || "citação"}.txt` : "iconocracia-citacoes.txt", "text/plain;charset=utf-8");
    }

    function doDownloadBib() {
      window.AbntLib.downloadBlob(bib, count === 1 ? `${items[0].id || "citação"}.bib` : "iconocracia-citacoes.bib", "application/x-bibtex;charset=utf-8");
    }

    const btnStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: compact ? 0 : "6px 10px",
      width: compact ? 28 : undefined,
      height: compact ? 28 : undefined,
      borderRadius: 999,
      border: "1px solid var(--c-border, var(--border))",
      background: "var(--c-panel, var(--surface-card))",
      color: "var(--c-ink-2, var(--text-secondary))",
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      letterSpacing: "1px",
      textTransform: "uppercase",
    };

    return React.createElement("div", { style: { position: "relative", display: "inline-block" }, ref: menuRef },
      React.createElement("button", {
        type: "button",
        ref: btnRef,
        onClick: () => setOpen((o) => !o),
        "aria-expanded": open,
        "aria-haspopup": "menu",
        "aria-label": label || (count === 1 ? `Exportar citação ABNT de ${title}` : `Exportar citações ABNT dos ${count} itens selecionados`),
        title: count === 1 ? "Exportar citação ABNT" : "Exportar citações ABNT",
        style: btnStyle,
      }, ICON_QUOTE, !compact && React.createElement("span", null, "Citar")),

      open && React.createElement("div", {
        role: "menu",
        "aria-label": "Ações de exportação da citação",
        style: {
          position: "absolute",
          top: "calc(100% + 6px)",
          right: 0,
          zIndex: 100,
          minWidth: 180,
          background: "var(--c-panel, var(--surface-card))",
          border: "1px solid var(--c-border, var(--border))",
          borderRadius: "var(--radius-sm)",
          boxShadow: "0 8px 30px rgba(0,0,0,.14)",
          padding: "6px",
          fontFamily: "var(--font-body)",
        },
      },
        React.createElement("div", {
          style: {
            padding: "6px 8px 8px",
            borderBottom: "1px solid var(--c-border, var(--border))",
            marginBottom: 4,
          },
        },
          React.createElement("div", { style: { fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 13, color: "var(--c-ink, var(--text-primary))", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 220 } }, title),
          React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--c-ink-3, var(--text-tertiary))", letterSpacing: ".5px", marginTop: 2 } }, count === 1 ? "ABNT NBR 6023:2025" : `${count} referências ABNT`)
        ),

        React.createElement(MenuItem, { icon: ICON_COPY, label: "Copiar texto", onClick: doCopy, flash }),
        React.createElement(MenuItem, { icon: ICON_FILE, label: "Download .txt", onClick: doDownloadTxt }),
        React.createElement(MenuItem, { icon: ICON_FILE, label: "Download .bib", onClick: doDownloadBib })
      )
    );
  }

  function MenuItem({ icon, label, onClick, flash }) {
    const isFlash = flash && label.startsWith("Copiar") && flash;
    return React.createElement("button", {
      type: "button",
      role: "menuitem",
      onClick: onClick,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        padding: "7px 9px",
        border: "none",
        borderRadius: "var(--radius-sm)",
        background: isFlash ? "rgba(138,95,168,.12)" : "transparent",
        color: isFlash ? "var(--state-active, var(--brand-amethyst))" : "var(--c-ink, var(--text-primary))",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: ".5px",
        textAlign: "left",
      },
      onMouseEnter: (e) => { e.currentTarget.style.background = "color-mix(in srgb, var(--c-gold, var(--gold)) 12%, transparent)"; },
      onMouseLeave: (e) => { e.currentTarget.style.background = isFlash ? "rgba(138,95,168,.12)" : "transparent"; },
    }, icon, isFlash || label);
  }

  window.CitationButton = CitationButton;
})();
