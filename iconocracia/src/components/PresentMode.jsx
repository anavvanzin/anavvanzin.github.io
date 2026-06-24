// src/components/PresentMode.jsx — full-screen presentation overlay.
// Renders any plate or comparison set with minimal chrome: large image + caption.
// Keyboard: Esc to close, Left/Right arrows to navigate, Tab traps focus.
// Touch: swipe left/right navigates. Focus is restored to the trigger on close.
(function () {
  const { useState, useEffect, useRef, useCallback, useMemo } = React;

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
    const [h, setH] = useState(typeof window !== "undefined" ? window.innerHeight : 800);
    useEffect(() => {
      const onResize = () => { setW(window.innerWidth); setH(window.innerHeight); };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);
    return { width: w, height: h };
  }

  // Simple focus trap: keep Tab cycling through focusable elements inside overlay.
  function trapFocus(container, event) {
    if (event.key !== "Tab" || !container) return;
    const focusable = Array.from(
      container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.disabled && el.offsetParent !== null);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function PresentMode({ items, startIndex = 0, onClose }) {
    const [index, setIndex] = useState(Math.max(0, Math.min(startIndex, (items || []).length - 1)));
    const [showHint, setShowHint] = useState(true);
    const [badImages, setBadImages] = useState({});
    const overlayRef = useRef(null);
    const closeBtnRef = useRef(null);
    const prevFocusRef = useRef(null);
    const touchStart = useRef(null);
    const viewport = useViewport();
    const isNarrow = viewport.width < 720;

    const total = (items || []).length;
    const current = items && items[index];

    const go = useCallback((delta) => {
      if (total <= 1) return;
      setIndex((i) => {
        const next = i + delta;
        if (next < 0) return total - 1;
        if (next >= total) return 0;
        return next;
      });
    }, [total]);

    const close = useCallback(() => {
      if (onClose) onClose();
    }, [onClose]);

    // Hide body scroll while open; restore on close.
    useEffect(() => {
      if (typeof document === "undefined") return;
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }, []);

    // Save previous focus, then move focus into overlay.
    useEffect(() => {
      if (typeof document === "undefined") return;
      prevFocusRef.current = document.activeElement;
      // Focus close button on mount after a frame so the overlay is in the DOM.
      const id = requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
      return () => {
        cancelAnimationFrame(id);
        // Restore focus to the trigger element if still in DOM.
        if (prevFocusRef.current && typeof prevFocusRef.current.focus === "function") {
          try { prevFocusRef.current.focus(); } catch (e) {}
        }
      };
    }, []);

    // Keyboard listeners: Esc, arrows, focus trap.
    useEffect(() => {
      function onKey(e) {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
        } else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
          e.preventDefault();
          go(1);
        } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
          e.preventDefault();
          go(-1);
        } else {
          trapFocus(overlayRef.current, e);
        }
      }
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [close, go]);

    // Auto-hide keyboard hint after first open.
    useEffect(() => {
      if (!showHint) return;
      const id = setTimeout(() => setShowHint(false), 2600);
      return () => clearTimeout(id);
    }, [showHint]);

    const handleImageError = (id) => {
      setBadImages((m) => ({ ...m, [id]: true }));
    };

    // Touch swipe handling.
    const onTouchStart = (e) => {
      touchStart.current = e.changedTouches[0].clientX;
    };
    const onTouchEnd = (e) => {
      if (touchStart.current == null || total <= 1) return;
      const dx = e.changedTouches[0].clientX - touchStart.current;
      if (Math.abs(dx) > 50) {
        go(dx < 0 ? 1 : -1);
      }
      touchStart.current = null;
    };

    if (!current) return null;

    const r = reg(current.regime);
    const counter = total > 1 ? `${index + 1} / ${total}` : null;

    return React.createElement("div", {
      ref: overlayRef,
      role: "dialog",
      "aria-modal": true,
      "aria-label": "Modo apresentação",
      onTouchStart,
      onTouchEnd,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        background: "var(--c-ground, var(--surface-page, #171D38))",
        color: "var(--c-ink, var(--text-primary, #EFE6D2))",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        animation: "fadeIn .2s var(--ease-out) both",
      },
    },
      // Top chrome: close + counter + nav arrows
      React.createElement("div", {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: isNarrow ? "10px 14px" : "16px 24px",
          background: "linear-gradient(180deg, rgba(0,0,0,.42), transparent)",
          pointerEvents: "none",
        },
      },
        React.createElement("button", {
          ref: closeBtnRef,
          type: "button",
          onClick: close,
          "aria-label": "Fechar apresentação (Esc)",
          style: {
            pointerEvents: "auto",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid rgba(244,236,216,.45)",
            background: "rgba(13,16,30,.55)",
            color: "#F4ECD8",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          },
        }, "×", !isNarrow && " Fechar"),
        counter && React.createElement("span", {
          style: {
            pointerEvents: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "1.5px",
            color: "#F4ECD8",
            background: "rgba(13,16,30,.55)",
            padding: "6px 12px",
            borderRadius: 999,
          },
        }, counter)
      ),

      // Main image stage
      React.createElement("div", {
        style: {
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isNarrow ? "48px 0 96px" : "56px 80px 110px",
          boxSizing: "border-box",
        },
      },
        total > 1 && React.createElement("button", {
          type: "button",
          onClick: () => go(-1),
          "aria-label": "Anterior",
          style: {
            position: "absolute",
            left: isNarrow ? 8 : 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            width: isNarrow ? 36 : 44,
            height: isNarrow ? 36 : 44,
            borderRadius: 999,
            border: "1px solid rgba(244,236,216,.35)",
            background: "rgba(13,16,30,.45)",
            color: "#F4ECD8",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          },
        }, "‹"),

        React.createElement("figure", {
          style: {
            margin: 0,
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          },
        },
          badImages[current.id]
            ? React.createElement("div", {
                style: {
                  width: Math.min(viewport.width * 0.8, 420),
                  height: Math.min(viewport.height * 0.5, 320),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  border: `1px solid ${r.color}`,
                  borderRadius: "var(--radius-sm)",
                  background: `color-mix(in srgb, ${r.color} 12%, rgba(13,16,30,.9))`,
                  color: "#F4ECD8",
                  textAlign: "center",
                  padding: 24,
                },
              },
                React.createElement("span", { style: { fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20 } }, current.title),
                React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", opacity: .7 } }, current.archive || "Imagem não disponível")
              )
            : React.createElement("img", {
                src: current.img,
                alt: current.title,
                onError: () => handleImageError(current.id),
                style: {
                  maxWidth: "100%",
                  maxHeight: isNarrow ? "calc(100vh - 170px)" : "calc(100vh - 180px)",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "0 24px 80px rgba(0,0,0,.45)",
                },
              }),

          // Bottom caption overlay
          React.createElement("figcaption", {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              padding: isNarrow ? "18px 16px 22px" : "22px 24px 28px",
              background: "linear-gradient(180deg, transparent, rgba(13,16,30,.92))",
              color: "#F4ECD8",
            },
          },
            React.createElement("div", {
              style: {
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
                maxWidth: 1080,
                margin: "0 auto",
              },
            },
              React.createElement("div", { style: { minWidth: 0 } },
                React.createElement("div", {
                  style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "1.5px",
                    color: "var(--c-gold, #D4A85E)",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  },
                }, `${current.country} · ${current.year} · ${current.support}`),
                React.createElement("div", {
                  style: {
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: isNarrow ? 20 : 26,
                    lineHeight: 1.15,
                    color: "#F4ECD8",
                  },
                }, current.title)
              ),
              React.createElement("span", {
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: r.color,
                  border: `1px solid ${r.color}`,
                  borderRadius: 999,
                  padding: "3px 10px",
                  background: `color-mix(in srgb, ${r.color} 12%, transparent)`,
                  flexShrink: 0,
                },
              },
                React.createElement("span", { style: { fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 12 } }, r.roman),
                r.label
              )
            )
          )
        ),

        total > 1 && React.createElement("button", {
          type: "button",
          onClick: () => go(1),
          "aria-label": "Próxima",
          style: {
            position: "absolute",
            right: isNarrow ? 8 : 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            width: isNarrow ? 36 : 44,
            height: isNarrow ? 36 : 44,
            borderRadius: 999,
            border: "1px solid rgba(244,236,216,.35)",
            background: "rgba(13,16,30,.45)",
            color: "#F4ECD8",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          },
        }, "›")
      ),

      // Keyboard hint
      showHint && React.createElement("div", {
        style: {
          position: "absolute",
          bottom: isNarrow ? 100 : 108,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          pointerEvents: "none",
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "#F4ECD8",
          background: "rgba(13,16,30,.7)",
          padding: "6px 12px",
          borderRadius: 999,
          opacity: showHint ? 1 : 0,
          transition: "opacity .6s var(--ease-out)",
          whiteSpace: "nowrap",
        },
      }, total > 1 ? "← → navegar · Esc sair" : "Esc para sair")
    );
  }

  window.PresentMode = PresentMode;
})();
