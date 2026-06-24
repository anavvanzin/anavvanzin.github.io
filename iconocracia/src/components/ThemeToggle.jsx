// src/components/ThemeToggle.jsx — floating tone + palette control.
// Works in both Atlas and Atlas Lab via window.useTheme.
(function () {
  const { useState } = React;

  const TONE_OPTIONS = [
    { value: "claro",   label: "Claro",   icon: "☀" },
    { value: "cabinet", label: "Cabinet", icon: "◐" },
    { value: "escuro",  label: "Escuro",  icon: "☾" },
  ];

  const PALETTE_OPTIONS = [
    { value: "amethyst",   label: "Ametista",   color: "#8A5FA8" },
    { value: "terracotta", label: "Terracota",  color: "#A04030" },
    { value: "gold",       label: "Ouro",       color: "#B8924A" },
    { value: "emerald",    label: "Esmeralda",  color: "#2A9D6F" },
    { value: "navy",       label: "Marinho",    color: "#3A5A8C" },
  ];

  const btnBase = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 999,
    border: "1px solid var(--c-border, var(--border))",
    background: "var(--c-panel, var(--surface-card))",
    color: "var(--c-ink, var(--text-primary))",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1,
    transition: "background .15s, color .15s, border-color .15s, transform .15s",
  };

  const swatch = (color, active) => ({
    width: 22,
    height: 22,
    borderRadius: 999,
    background: color,
    boxShadow: active
      ? "0 0 0 2px var(--c-panel), 0 0 0 4px var(--state-active)"
      : "0 0 0 1px rgba(0,0,0,.12)",
    transition: "box-shadow .15s",
  });

  function ThemeToggle({ position = "bottom-right" }) {
    const theme = window.useTheme();
    const [open, setOpen] = useState(false);

    const pos = position === "bottom-left"
      ? { left: 16, bottom: 16 }
      : { right: 16, bottom: 16 };

    return (
      React.createElement("div", {
        style: { position: "fixed", zIndex: 2147483645, ...pos },
      },
        // Toggle button
        React.createElement("button", {
          type: "button",
          "aria-label": "Abrir seletor de tema",
          "aria-expanded": open,
          onClick: () => setOpen((o) => !o),
          style: btnBase,
          onMouseEnter: (e) => { e.currentTarget.style.transform = "scale(1.05)"; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = "scale(1)"; },
        }, "◐"),

        // Popover
        open && React.createElement("div", {
          style: {
            position: "absolute",
            bottom: 46,
            right: position === "bottom-right" ? 0 : "auto",
            left: position === "bottom-left" ? 0 : "auto",
            width: 220,
            padding: "14px 16px",
            borderRadius: 12,
            border: "1px solid var(--c-border, var(--border))",
            background: "var(--c-panel, var(--surface-card))",
            color: "var(--c-ink, var(--text-primary))",
            boxShadow: "0 12px 40px rgba(var(--shadow-color, 26,22,18), .16)",
            fontFamily: "var(--font-mono)",
            animation: "fadeSlideUp .2s var(--ease-out) both",
          },
        },
          React.createElement("div", {
            style: { fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--c-ink-3, var(--text-tertiary))", marginBottom: 10 }
          }, "Tom de página"),
          React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16 } },
            TONE_OPTIONS.map((t) => React.createElement("button", {
              key: t.value,
              type: "button",
              "aria-pressed": theme.tone === t.value,
              "aria-label": t.label,
              title: t.label,
              onClick: () => theme.setTone(t.value),
              style: {
                ...btnBase,
                width: "100%",
                gap: 6,
                fontSize: 12,
                background: theme.tone === t.value ? "var(--state-active)" : btnBase.background,
                color: theme.tone === t.value ? "var(--c-on-accent, var(--text-on-dark))" : btnBase.color,
                borderColor: theme.tone === t.value ? "var(--state-active)" : btnBase.borderColor,
              },
              onMouseEnter: (e) => { if (theme.tone !== t.value) e.currentTarget.style.background = "var(--c-panel-2, var(--surface-folio))"; },
              onMouseLeave: (e) => { if (theme.tone !== t.value) e.currentTarget.style.background = btnBase.background; },
            }, t.icon)
            )
          ),

          React.createElement("div", {
            style: { fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--c-ink-3, var(--text-tertiary))", marginBottom: 10 }
          }, "Paleta de acento"),
          React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } },
            PALETTE_OPTIONS.map((p) => React.createElement("button", {
              key: p.value,
              type: "button",
              "aria-pressed": theme.palette === p.value,
              "aria-label": p.label,
              title: p.label,
              onClick: () => theme.setPalette(p.value),
              style: {
                width: 30,
                height: 30,
                borderRadius: 999,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }, React.createElement("span", { style: swatch(p.color, theme.palette === p.value), "aria-hidden": "true" }))
            )
          )
        )
      )
    );
  }

  window.ThemeToggle = ThemeToggle;
})();
