// templates/radiografia/app.jsx — the Radiografia iconométrica tool (x-import target).
// A confronto/sobreposição/prancha comparison of two allegorical specimens, with
// a diagrammatic iconometric overlay and a divergence ledger. Dark "cabinet" tier.
(function () {
  const D = window.RadioData;
  const RES = p => {
    const f = String(p).split("/").pop();
    return window.__resources && window.__resources[f] || p;
  };

  // ── Cabinet palette (dark tier) ──────────────────────────────────
  const C = {
    ground: "#1E1811",
    panel: "#221B15",
    panel2: "rgba(255,255,255,.035)",
    ink: "#FFF9EF",
    ink2: "#E8DDC8",
    ink3: "#756451",
    gold: "#D4AF37",
    goldDim: "rgba(212,168,94,.42)",
    hair: "rgba(184,146,74,.30)",
    plate: "#15110E",
    lacre: "#8B3A1A",
    amethyst: "#7B5E3C"
  };
  const REG = {
    fundacional: "#7E62C8",
    normativo: "#2E8A66",
    militar: "#C04242",
    contra: "#B65440"
  };
  const VBH = 133.333; // viewBox height for uniform 3:4 geometry
  const Y = y => +(y * VBH / 100).toFixed(2);
  const FONT_D = '"Instrument Serif", Georgia, serif';
  const FONT_B = '"Crimson Pro", Georgia, serif';
  const FONT_M = '"JetBrains Mono", ui-monospace, monospace';

  // ── Atoms ────────────────────────────────────────────────────────
  const Cap = ({
    children,
    style,
    color
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_M,
      fontSize: 10,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: color || C.gold,
      ...style
    }
  }, children);
  const Corners = ({
    c,
    inset = 6,
    len = 14
  }) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: inset,
      left: inset,
      width: len,
      height: len,
      borderTop: `1px solid ${c}`,
      borderLeft: `1px solid ${c}`,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: inset,
      right: inset,
      width: len,
      height: len,
      borderTop: `1px solid ${c}`,
      borderRight: `1px solid ${c}`,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: inset,
      left: inset,
      width: len,
      height: len,
      borderBottom: `1px solid ${c}`,
      borderLeft: `1px solid ${c}`,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: inset,
      right: inset,
      width: len,
      height: len,
      borderBottom: `1px solid ${c}`,
      borderRight: `1px solid ${c}`,
      pointerEvents: "none"
    }
  }));

  // ── Iconometric overlay (SVG lines, uniform geometry) ────────────
  function Overlay({
    sp,
    anchor: a,
    layers,
    accent
  }) {
    const g = C.gold,
      dim = C.goldDim;
    const els = [];
    // Eixo / prumo
    if (layers.eixo) {
      els.push(/*#__PURE__*/React.createElement("line", {
        key: "ax",
        x1: a.axisX,
        y1: Y(5),
        x2: a.axisX,
        y2: Y(a.baseY),
        stroke: g,
        strokeWidth: "1",
        strokeDasharray: "2 3",
        vectorEffect: "non-scaling-stroke"
      }));
      els.push(/*#__PURE__*/React.createElement("line", {
        key: "base",
        x1: "6",
        y1: Y(a.baseY),
        x2: "94",
        y2: Y(a.baseY),
        stroke: g,
        strokeWidth: "1",
        vectorEffect: "non-scaling-stroke"
      }));
      els.push(/*#__PURE__*/React.createElement("path", {
        key: "bob",
        d: `M ${a.axisX} ${Y(a.baseY)} l 2.6 4 l -2.6 4 l -2.6 -4 z`,
        fill: C.lacre,
        stroke: g,
        strokeWidth: ".6",
        vectorEffect: "non-scaling-stroke"
      }));
    }
    // Linha dos olhos + vetor do olhar
    if (layers.olhos) {
      els.push(/*#__PURE__*/React.createElement("line", {
        key: "eye",
        x1: "8",
        y1: Y(a.eyeY),
        x2: "92",
        y2: Y(a.eyeY),
        stroke: dim,
        strokeWidth: "1",
        strokeDasharray: "5 4",
        vectorEffect: "non-scaling-stroke"
      }));
      const rad = a.gaze * Math.PI / 180,
        L = 17;
      const x2 = a.headCx + L * Math.cos(rad),
        y2 = a.eyeY + L * Math.sin(rad);
      els.push(/*#__PURE__*/React.createElement("line", {
        key: "gaze",
        x1: a.headCx,
        y1: Y(a.eyeY),
        x2: x2,
        y2: Y(y2),
        stroke: accent,
        strokeWidth: "1.4",
        vectorEffect: "non-scaling-stroke"
      }));
      els.push(/*#__PURE__*/React.createElement("circle", {
        key: "gd",
        cx: a.headCx,
        cy: Y(a.eyeY),
        r: "1.4",
        fill: accent
      }));
      const ah = a.gaze * Math.PI / 180;
      els.push(/*#__PURE__*/React.createElement("path", {
        key: "gah",
        d: `M ${x2} ${Y(y2)} L ${x2 - 3 * Math.cos(ah - 0.4)} ${Y(y2 - 3 * Math.sin(ah - 0.4))} L ${x2 - 3 * Math.cos(ah + 0.4)} ${Y(y2 - 3 * Math.sin(ah + 0.4))} z`,
        fill: accent,
        vectorEffect: "non-scaling-stroke"
      }));
    }
    // Venda
    if (layers.venda && a.hasVenda) {
      els.push(/*#__PURE__*/React.createElement("rect", {
        key: "vd",
        x: "28",
        y: Y(a.vendaY) - 4,
        width: "44",
        height: "8",
        fill: accent,
        opacity: ".30",
        stroke: accent,
        strokeWidth: "1",
        vectorEffect: "non-scaling-stroke"
      }));
    }
    // Balança (protractor)
    if (layers.balanca && a.scale) {
      const s = a.scale,
        rad = s.angle * Math.PI / 180;
      const lx = s.cx - s.len / 2 * Math.cos(rad),
        rx = s.cx + s.len / 2 * Math.cos(rad);
      const ly = s.cy - s.len / 2 * Math.sin(rad),
        ry = s.cy + s.len / 2 * Math.sin(rad);
      els.push(/*#__PURE__*/React.createElement("line", {
        key: "arm",
        x1: lx,
        y1: Y(ly),
        x2: rx,
        y2: Y(ry),
        stroke: g,
        strokeWidth: "1.4",
        vectorEffect: "non-scaling-stroke"
      }));
      els.push(/*#__PURE__*/React.createElement("circle", {
        key: "ful",
        cx: s.cx,
        cy: Y(s.cy),
        r: "1.6",
        fill: "none",
        stroke: g,
        strokeWidth: "1",
        vectorEffect: "non-scaling-stroke"
      }));
      els.push(/*#__PURE__*/React.createElement("path", {
        key: "arc",
        d: `M ${s.cx - 9} ${Y(s.cy)} A 9 ${9 * VBH / 100} 0 0 1 ${s.cx + 9} ${Y(s.cy)}`,
        fill: "none",
        stroke: dim,
        strokeWidth: ".8",
        strokeDasharray: "2 2",
        vectorEffect: "non-scaling-stroke"
      }));
    }
    // Cânone — proportion division bands
    if (layers.canon) {
      const cn = a.canon;
      for (let i = 0; i <= cn.modules; i++) {
        const yy = cn.top + i * cn.unit;
        if (yy > 98) break;
        els.push(/*#__PURE__*/React.createElement("line", {
          key: "cn" + i,
          x1: "6",
          y1: Y(yy),
          x2: "14",
          y2: Y(yy),
          stroke: g,
          strokeWidth: "1",
          vectorEffect: "non-scaling-stroke"
        }));
        els.push(/*#__PURE__*/React.createElement("line", {
          key: "cnd" + i,
          x1: "14",
          y1: Y(yy),
          x2: "86",
          y2: Y(yy),
          stroke: dim,
          strokeWidth: ".6",
          strokeDasharray: "1 5",
          vectorEffect: "non-scaling-stroke"
        }));
      }
      els.push(/*#__PURE__*/React.createElement("line", {
        key: "cnv",
        x1: "10",
        y1: Y(cn.top),
        x2: "10",
        y2: Y(Math.min(cn.top + cn.modules * cn.unit, 98)),
        stroke: g,
        strokeWidth: "1",
        vectorEffect: "non-scaling-stroke"
      }));
    }
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 100 ${VBH}`,
      preserveAspectRatio: "none",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }
    }, els);
  }

  // HTML labels for the overlay (crisp text, positioned in %).
  function OverlayLabels({
    anchor: a,
    layers
  }) {
    const lab = (key, x, y, text, align) => /*#__PURE__*/React.createElement("div", {
      key: key,
      style: {
        position: "absolute",
        left: x + "%",
        top: y + "%",
        transform: align === "r" ? "translate(-100%,-50%)" : "translateY(-50%)",
        fontFamily: FONT_M,
        fontSize: 7.5,
        letterSpacing: "1.2px",
        color: C.gold,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        textShadow: "0 1px 3px rgba(0,0,0,.9)"
      }
    }, text);
    const out = [];
    if (layers.olhos) out.push(lab("eye", 9, a.eyeY - 3, "linha dos olhos"));
    if (layers.eixo) out.push(lab("ax", a.axisX + 1.5, 8, "eixo · prumo"));
    if (layers.canon) for (let i = 0; i < a.canon.modules; i++) {
      const yy = a.canon.top + i * a.canon.unit + 1;
      if (yy < 96) out.push(lab("cn" + i, 1.5, yy, ["I", "II", "III", "IV", "V", "VI"][i] || ""));
    }
    if (layers.venda) out.push(lab("vd", 50, a.hasVenda ? a.vendaY - 7 : a.eyeY - 3, a.hasVenda ? "venda" : "venda ausente"));
    if (layers.balanca && a.scale) out.push(lab("bl", a.scale.cx, a.scale.cy + 7, "balança"));
    return /*#__PURE__*/React.createElement(React.Fragment, null, out);
  }

  // ── Specimen bay ─────────────────────────────────────────────────
  function Bay({
    sp,
    layers,
    accent,
    overlayOn,
    onSwap,
    onAttr,
    side,
    big
  }) {
    const a = D.anchorOf(sp);
    const [hover, setHover] = React.useState(null);
    return /*#__PURE__*/React.createElement("figure", {
      style: {
        margin: 0,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 8,
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement(Cap, {
      color: C.ink3
    }, side), onSwap && /*#__PURE__*/React.createElement("button", {
      onClick: onSwap,
      style: {
        background: "none",
        border: `1px solid ${C.hair}`,
        color: C.ink2,
        fontFamily: FONT_M,
        fontSize: 8.5,
        letterSpacing: "2px",
        textTransform: "uppercase",
        padding: "3px 10px",
        cursor: "pointer",
        borderRadius: 2,
        transition: "all .2s"
      },
      onMouseEnter: e => {
        e.currentTarget.style.color = accent;
        e.currentTarget.style.borderColor = accent;
      },
      onMouseLeave: e => {
        e.currentTarget.style.color = C.ink2;
        e.currentTarget.style.borderColor = C.hair;
      }
    }, "trocar \u25C8")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        aspectRatio: "3/4",
        overflow: "hidden",
        background: C.plate,
        border: `1px solid ${C.gold}`,
        boxShadow: "0 14px 40px rgba(0,0,0,.45)",
        borderRadius: 3
      }
    }, /*#__PURE__*/React.createElement("img", {
      key: sp.id,
      src: RES(sp.img),
      alt: sp.title,
      loading: "lazy",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center top",
        animation: "radioFade .5s ease both"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(120% 90% at 50% 35%, transparent 55%, rgba(8,12,30,.5))",
        pointerEvents: "none"
      }
    }), overlayOn && /*#__PURE__*/React.createElement(Overlay, {
      sp: sp,
      anchor: a,
      layers: layers,
      accent: accent
    }), overlayOn && /*#__PURE__*/React.createElement(OverlayLabels, {
      anchor: a,
      layers: layers
    }), overlayOn && layers.atributos && a.attrs.map((at, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => onAttr && onAttr(at),
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(null),
      style: {
        position: "absolute",
        left: at.x + "%",
        top: at.y + "%",
        transform: "translate(-50%,-50%)",
        width: hover === i ? 15 : 11,
        height: hover === i ? 15 : 11,
        borderRadius: "50%",
        border: `1.4px solid ${accent}`,
        background: hover === i ? accent : "rgba(168,40,31,.22)",
        cursor: "pointer",
        padding: 0,
        transition: "all .18s",
        boxShadow: "0 0 0 3px rgba(8,12,30,.55)"
      }
    }, hover === i && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: "50%",
        bottom: "160%",
        transform: "translateX(-50%)",
        fontFamily: FONT_M,
        fontSize: 8,
        letterSpacing: "1px",
        color: C.ink,
        background: "rgba(12,18,38,.94)",
        border: `1px solid ${C.hair}`,
        padding: "3px 7px",
        whiteSpace: "nowrap",
        textTransform: "uppercase"
      }
    }, at.label))), /*#__PURE__*/React.createElement(Corners, {
      c: C.gold
    })), /*#__PURE__*/React.createElement("figcaption", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: REG[sp.regime],
        boxShadow: `0 0 0 3px ${REG[sp.regime]}22`
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_M,
        fontSize: 9,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: REG[sp.regime]
      }
    }, D.REGIME_LABEL[sp.regime]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_M,
        fontSize: 9,
        letterSpacing: "1.5px",
        color: C.ink3,
        marginLeft: "auto"
      }
    }, sp.country, " \xB7 ", sp.year)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_D,
        fontStyle: "italic",
        fontSize: big ? 30 : 24,
        lineHeight: 1.05,
        color: C.ink
      }
    }, sp.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_M,
        fontSize: 9.5,
        letterSpacing: "1px",
        color: C.ink3,
        marginTop: 4
      }
    }, sp.author, " \xB7 ", sp.support), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: FONT_B,
        fontSize: 14.5,
        lineHeight: 1.6,
        color: C.ink2,
        margin: "10px 0 0",
        paddingLeft: 13,
        borderLeft: `3px solid ${accent}`
      }
    }, sp.note)));
  }

  // ── Divergence ledger ────────────────────────────────────────────
  function Ledger({
    a,
    b,
    accent,
    compact
  }) {
    const inds = D.INDICATORS;
    const ca = REG[a.regime],
      cb = REG[b.regime];
    const totalDiv = inds.reduce((s, i) => s + Math.abs(a.scores[i.key] - b.scores[i.key]), 0);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.panel,
        border: `1px solid ${C.hair}`,
        borderRadius: 4,
        padding: "20px 20px 18px",
        position: "relative",
        boxShadow: "0 10px 30px rgba(0,0,0,.3)"
      }
    }, /*#__PURE__*/React.createElement(Corners, {
      c: C.goldDim,
      inset: 5,
      len: 11
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement(Cap, null, "Radiografia \xB7 ledger de diverg\xEAncia"), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: `1px solid ${C.gold}`,
        borderBottom: `1px solid ${C.gold}`,
        height: 3,
        margin: "11px 0 0"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        margin: "12px 0 14px",
        fontFamily: FONT_M,
        fontSize: 9,
        letterSpacing: "1.5px",
        textTransform: "uppercase"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: ca,
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: ca
      }
    }), a.title), /*#__PURE__*/React.createElement("span", {
      style: {
        color: cb,
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, b.title, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: cb
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: compact ? 11 : 14
      }
    }, inds.map(ind => {
      const va = a.scores[ind.key],
        vb = b.scores[ind.key],
        diff = Math.abs(va - vb),
        strong = diff >= 3;
      return /*#__PURE__*/React.createElement("div", {
        key: ind.key,
        title: ind.gloss
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: FONT_M,
          fontSize: 10,
          color: ca,
          fontWeight: strong ? 700 : 400,
          width: 22
        }
      }, va), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: ind.key === "endurecimento" ? FONT_M : FONT_B,
          fontStyle: ind.key === "endurecimento" ? "normal" : "normal",
          fontSize: ind.key === "endurecimento" ? 10.5 : 13.5,
          letterSpacing: ind.key === "endurecimento" ? "1.5px" : "0",
          color: strong ? C.gold : C.ink2,
          textAlign: "center",
          flex: 1
        }
      }, ind.label), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: FONT_M,
          fontSize: 10,
          color: cb,
          fontWeight: strong ? 700 : 400,
          width: 22,
          textAlign: "right"
        }
      }, vb)), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "relative",
          height: 7,
          background: "rgba(255,255,255,.05)",
          borderRadius: 2
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: -2,
          bottom: -2,
          width: 1,
          background: C.goldDim
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          right: "50%",
          top: 0,
          bottom: 0,
          width: va / 10 * 50 + "%",
          background: ca,
          borderRadius: "2px 0 0 2px",
          opacity: strong && va > vb ? 1 : .78
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: vb / 10 * 50 + "%",
          background: cb,
          borderRadius: "0 2px 2px 0",
          opacity: strong && vb > va ? 1 : .78
        }
      }), strong && /*#__PURE__*/React.createElement("span", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: C.gold,
          boxShadow: `0 0 0 2px ${C.panel}`
        }
      })));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        paddingTop: 13,
        borderTop: `1px solid ${C.hair}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_M,
        fontSize: 9,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: C.ink3
      }
    }, "Diverg\xEAncia total"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_D,
        fontStyle: "italic",
        fontSize: 30,
        color: C.gold,
        lineHeight: 1
      }
    }, totalDiv, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_M,
        fontSize: 10,
        color: C.ink3,
        letterSpacing: "1px"
      }
    }, " / 60"))));
  }

  // ── Specimen picker (modal popover) ──────────────────────────────
  function Picker({
    slot,
    current,
    onPick,
    onClose
  }) {
    const regimes = ["fundacional", "normativo", "militar", "contra"];
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "rgba(10,14,28,.7)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "radioFade .2s ease both"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        width: "min(880px,94vw)",
        maxHeight: "86vh",
        overflow: "auto",
        background: C.ground,
        border: `1px solid ${C.gold}`,
        borderRadius: 6,
        padding: "26px 28px 30px",
        position: "relative",
        boxShadow: "0 40px 100px rgba(0,0,0,.6)"
      }
    }, /*#__PURE__*/React.createElement(Corners, {
      c: C.gold,
      inset: 8,
      len: 16
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement(Cap, null, "Selecionar esp\xE9cime \xB7 prancha ", slot === "a" ? "A" : "B"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: {
        background: "none",
        border: "none",
        color: C.ink2,
        fontFamily: FONT_M,
        fontSize: 14,
        cursor: "pointer"
      }
    }, "\u2715")), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: FONT_D,
        fontStyle: "italic",
        fontSize: 26,
        color: C.ink,
        margin: "4px 0 18px"
      }
    }, "Corpus iconogr\xE1fico \xB7 ", D.SPECIMENS.length, " placas"), regimes.map(rg => {
      const items = D.SPECIMENS.filter(s => s.regime === rg);
      if (!items.length) return null;
      return /*#__PURE__*/React.createElement("div", {
        key: rg,
        style: {
          marginBottom: 20
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: REG[rg]
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: FONT_M,
          fontSize: 9.5,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: REG[rg]
        }
      }, D.REGIME_LABEL[rg]), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          height: 1,
          background: C.hair
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))",
          gap: 14
        }
      }, items.map(s => {
        const sel = s.id === current;
        return /*#__PURE__*/React.createElement("button", {
          key: s.id,
          onClick: () => onPick(s.id),
          disabled: sel,
          style: {
            textAlign: "left",
            background: "none",
            border: "none",
            padding: 0,
            cursor: sel ? "default" : "pointer",
            opacity: sel ? .5 : 1
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            position: "relative",
            aspectRatio: "3/4",
            overflow: "hidden",
            background: C.plate,
            border: `1px solid ${sel ? C.amethyst : C.hair}`,
            borderRadius: 3,
            transition: "border-color .2s"
          },
          onMouseEnter: e => {
            if (!sel) e.currentTarget.style.borderColor = C.gold;
          },
          onMouseLeave: e => {
            if (!sel) e.currentTarget.style.borderColor = C.hair;
          }
        }, /*#__PURE__*/React.createElement("img", {
          src: RES(s.img),
          alt: s.title,
          loading: "lazy",
          style: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top"
          }
        }), sel && /*#__PURE__*/React.createElement("span", {
          style: {
            position: "absolute",
            top: 6,
            right: 6,
            fontFamily: FONT_M,
            fontSize: 7.5,
            letterSpacing: "1px",
            color: C.amethyst,
            background: "rgba(12,18,38,.9)",
            padding: "2px 5px",
            textTransform: "uppercase"
          }
        }, "em uso")), /*#__PURE__*/React.createElement("div", {
          style: {
            fontFamily: FONT_D,
            fontStyle: "italic",
            fontSize: 15,
            color: C.ink,
            marginTop: 7,
            lineHeight: 1.1
          }
        }, s.title), /*#__PURE__*/React.createElement("div", {
          style: {
            fontFamily: FONT_M,
            fontSize: 8,
            letterSpacing: "1px",
            color: C.ink3,
            marginTop: 2
          }
        }, s.country, " \xB7 ", s.year));
      })));
    })));
  }

  // ── Toolbar ──────────────────────────────────────────────────────
  const LAYER_DEFS = [["eixo", "Eixo · prumo"], ["olhos", "Olhar"], ["venda", "Venda"], ["balanca", "Balança"], ["canon", "Cânone"], ["atributos", "Atributos"]];
  const LAYOUTS = [["confronto", "Confronto"], ["sobreposicao", "Sobreposição"], ["prancha", "Prancha"]];
  function Chip({
    on,
    label,
    onClick,
    color
  }) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        fontFamily: FONT_M,
        fontSize: 9,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        padding: "5px 11px",
        borderRadius: 2,
        cursor: "pointer",
        transition: "all .18s",
        border: `1px solid ${on ? color || C.gold : C.hair}`,
        background: on ? `${color || C.gold}22` : "transparent",
        color: on ? color || C.gold : C.ink3,
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: on ? color || C.gold : "transparent",
        border: `1px solid ${on ? color || C.gold : C.ink3}`
      }
    }), label);
  }

  // ── App ──────────────────────────────────────────────────────────
  function RadiografiaApp(props) {
    props = props || {};
    const accent = props.accent || "#8B3A1A";
    const scale = parseFloat(props.scale) || 1;
    const [aId, setA] = React.useState(props.defaultA || D.DEFAULT_A);
    const [bId, setB] = React.useState(props.defaultB || D.DEFAULT_B);
    const [layout, setLayout] = React.useState(LAYOUTS.some(l => l[0] === props.layout) ? props.layout : "confronto");
    const [layers, setLayers] = React.useState({
      eixo: true,
      olhos: true,
      venda: true,
      balanca: true,
      canon: false,
      atributos: true
    });
    const [overlayOn, setOverlayOn] = React.useState(true);
    const [opacity, setOpacity] = React.useState(55);
    const [picker, setPicker] = React.useState(null); // "a" | "b" | null
    const [note, setNote] = React.useState(null);
    const a = D.byId(aId),
      b = D.byId(bId);
    const toggle = k => setLayers(s => ({
      ...s,
      [k]: !s[k]
    }));
    const pick = id => {
      if (picker === "a") setA(id);else setB(id);
      setPicker(null);
    };
    const reset = () => {
      setA(D.DEFAULT_A);
      setB(D.DEFAULT_B);
      setLayout("confronto");
      setLayers({
        eixo: true,
        olhos: true,
        venda: true,
        balanca: true,
        canon: false,
        atributos: true
      });
      setOverlayOn(true);
      setOpacity(55);
      setNote(null);
    };
    React.useEffect(() => {
      document.body.style.background = C.ground;
      return () => {
        document.body.style.background = "";
      };
    }, []);
    const cabinetBG = {
      background: `radial-gradient(120% 80% at 50% 0%, #221B15 0%, #1A1410 55%, #15110E 100%)`
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        ...cabinetBG,
        minHeight: "100vh",
        color: C.ink,
        fontFamily: FONT_B,
        fontSize: `calc(1em * ${scale})`,
        position: "relative",
        padding: "0 0 64px"
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        padding: "34px 44px 22px",
        borderBottom: `1px solid ${C.hair}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 180,
        height: 1,
        background: C.gold,
        marginBottom: 18,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        top: -3,
        width: 56,
        height: 1,
        background: accent
      }
    })), /*#__PURE__*/React.createElement(Cap, null, "ICONOCRACIA \xB7 Radiografia iconom\xE9trica \xB7 Painel IV"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: FONT_D,
        fontStyle: "italic",
        fontSize: 52,
        lineHeight: 1.0,
        color: C.ink,
        margin: "12px 0 0"
      }
    }, "A radiografia da alegoria"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: FONT_B,
        fontSize: 16.5,
        lineHeight: 1.6,
        color: C.ink2,
        margin: "14px 0 0",
        maxWidth: "62ch"
      }
    }, "Confrontar dois corpos aleg\xF3ricos sob a mesma r\xE9gua: medir a venda, o equil\xEDbrio, o ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_M,
        fontSize: 13,
        letterSpacing: "1px"
      }
    }, "ENDURECIMENTO"), ". A iconometria como prova visual do ", /*#__PURE__*/React.createElement("em", {
      style: {
        fontStyle: "italic",
        color: C.ink
      }
    }, "Contrato Sexual Visual"), ".")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        border: `1px solid ${C.hair}`,
        borderRadius: 3,
        overflow: "hidden"
      }
    }, LAYOUTS.map(([k, l]) => /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setLayout(k),
      style: {
        fontFamily: FONT_M,
        fontSize: 9.5,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        padding: "8px 15px",
        cursor: "pointer",
        border: "none",
        borderRight: k !== "prancha" ? `1px solid ${C.hair}` : "none",
        background: layout === k ? C.amethyst : "transparent",
        color: layout === k ? "#fff" : C.ink2,
        transition: "all .2s"
      }
    }, l))), /*#__PURE__*/React.createElement("button", {
      onClick: reset,
      style: {
        fontFamily: FONT_M,
        fontSize: 9,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: C.ink3,
        background: "none",
        border: "none",
        cursor: "pointer"
      }
    }, "\u21BA restaurar")))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 44px",
        borderBottom: `1px solid ${C.hair}`,
        display: "flex",
        alignItems: "center",
        gap: 18,
        flexWrap: "wrap",
        background: "rgba(0,0,0,.12)"
      }
    }, /*#__PURE__*/React.createElement(Cap, {
      color: C.ink3,
      style: {
        fontSize: 9
      }
    }, "Camadas"), /*#__PURE__*/React.createElement(Chip, {
      on: overlayOn,
      label: "Sobrepor",
      color: C.amethyst,
      onClick: () => setOverlayOn(o => !o)
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 1,
        height: 18,
        background: C.hair
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        opacity: overlayOn ? 1 : .4,
        pointerEvents: overlayOn ? "auto" : "none",
        transition: "opacity .2s"
      }
    }, LAYER_DEFS.map(([k, l]) => /*#__PURE__*/React.createElement(Chip, {
      key: k,
      on: layers[k],
      label: l,
      onClick: () => toggle(k),
      color: k === "atributos" || k === "venda" || k === "olhos" ? accent : C.gold
    }))), layout === "sobreposicao" && /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_M,
        fontSize: 9,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: C.ink3
      }
    }, "Opacidade B"), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: "0",
      max: "100",
      value: opacity,
      onChange: e => setOpacity(+e.target.value),
      style: {
        width: 160,
        accentColor: C.amethyst
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_M,
        fontSize: 11,
        color: C.ink2,
        width: 34
      }
    }, opacity, "%"))), /*#__PURE__*/React.createElement("main", {
      style: {
        padding: "30px 44px 0"
      }
    }, layout === "confronto" && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(300px,340px) minmax(0,1fr)",
        gap: 36,
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement(Bay, {
      sp: a,
      layers: layers,
      accent: accent,
      overlayOn: overlayOn,
      onSwap: () => setPicker("a"),
      onAttr: at => setNote({
        sp: a,
        at
      }),
      side: "Prancha A"
    }), /*#__PURE__*/React.createElement(Ledger, {
      a: a,
      b: b,
      accent: accent
    }), /*#__PURE__*/React.createElement(Bay, {
      sp: b,
      layers: layers,
      accent: accent,
      overlayOn: overlayOn,
      onSwap: () => setPicker("b"),
      onAttr: at => setNote({
        sp: b,
        at
      }),
      side: "Prancha B"
    })), layout === "sobreposicao" && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(0,1.05fr) minmax(320px,380px)",
        gap: 40,
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement(Cap, {
      color: C.ink3
    }, "Sobreposi\xE7\xE3o \xB7 A sob B"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setPicker("a"),
      style: {
        background: "none",
        border: `1px solid ${C.hair}`,
        color: REG[a.regime],
        fontFamily: FONT_M,
        fontSize: 8.5,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        padding: "3px 10px",
        cursor: "pointer",
        borderRadius: 2
      }
    }, "A \xB7 ", a.title), /*#__PURE__*/React.createElement("button", {
      onClick: () => setPicker("b"),
      style: {
        background: "none",
        border: `1px solid ${C.hair}`,
        color: REG[b.regime],
        fontFamily: FONT_M,
        fontSize: 8.5,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        padding: "3px 10px",
        cursor: "pointer",
        borderRadius: 2
      }
    }, "B \xB7 ", b.title))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        maxWidth: 560,
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        aspectRatio: "3/4",
        overflow: "hidden",
        background: C.plate,
        border: `1px solid ${C.gold}`,
        borderRadius: 3,
        boxShadow: "0 18px 50px rgba(0,0,0,.5)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: RES(a.img),
      alt: a.title,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center top"
      }
    }), /*#__PURE__*/React.createElement("img", {
      src: RES(b.img),
      alt: b.title,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center top",
        opacity: opacity / 100,
        mixBlendMode: "normal"
      }
    }), overlayOn && /*#__PURE__*/React.createElement(Overlay, {
      sp: a,
      anchor: D.anchorOf(a),
      layers: layers,
      accent: accent
    }), overlayOn && /*#__PURE__*/React.createElement(OverlayLabels, {
      anchor: D.anchorOf(a),
      layers: layers
    }), /*#__PURE__*/React.createElement(Corners, {
      c: C.gold
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: FONT_B,
        fontSize: 14,
        lineHeight: 1.6,
        color: C.ink2,
        margin: "14px 0 0",
        textAlign: "center",
        maxWidth: "56ch",
        marginInline: "auto"
      }
    }, "A r\xE9gua iconom\xE9trica de ", /*#__PURE__*/React.createElement("em", {
      style: {
        color: REG[a.regime]
      }
    }, a.title), " medida contra o corpo de ", /*#__PURE__*/React.createElement("em", {
      style: {
        color: REG[b.regime]
      }
    }, b.title), ". Onde os eixos n\xE3o coincidem, l\xEA-se o ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_M,
        fontSize: 12,
        letterSpacing: "1px"
      }
    }, "ENDURECIMENTO"), "."))), /*#__PURE__*/React.createElement(Ledger, {
      a: a,
      b: b,
      accent: accent
    })), layout === "prancha" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)",
        gap: 40,
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement(Bay, {
      sp: a,
      layers: layers,
      accent: accent,
      overlayOn: overlayOn,
      onSwap: () => setPicker("a"),
      onAttr: at => setNote({
        sp: a,
        at
      }),
      side: "Prancha A \xB7 esp\xE9cime mestre",
      big: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 26
      }
    }, /*#__PURE__*/React.createElement(Bay, {
      sp: b,
      layers: layers,
      accent: accent,
      overlayOn: overlayOn,
      onSwap: () => setPicker("b"),
      onAttr: at => setNote({
        sp: b,
        at
      }),
      side: "Prancha B \xB7 contraprova"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 32,
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(300px,360px)",
        gap: 36,
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.panel2,
        border: `1px solid ${C.hair}`,
        borderRadius: 4,
        padding: "24px 28px",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(Corners, {
      c: C.goldDim,
      inset: 6,
      len: 12
    }), /*#__PURE__*/React.createElement(Cap, null, "Parecer iconom\xE9trico"), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: `1px solid ${C.gold}`,
        borderBottom: `1px solid ${C.gold}`,
        height: 3,
        margin: "12px 0 18px"
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: FONT_B,
        fontSize: 17,
        lineHeight: 1.8,
        color: C.ink,
        margin: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_D,
        fontStyle: "italic",
        fontSize: 52,
        lineHeight: .7,
        color: accent,
        float: "left",
        padding: "4px 12px 0 0"
      }
    }, a.title.charAt(0)), "Confrontados sob a mesma r\xE9gua, ", /*#__PURE__*/React.createElement("em", {
      style: {
        color: REG[a.regime]
      }
    }, a.title), " (", a.year, ") e ", /*#__PURE__*/React.createElement("em", {
      style: {
        color: REG[b.regime]
      }
    }, b.title), " (", b.year, ") revelam a dist\xE2ncia entre a promessa e a norma. O grau de ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_M,
        fontSize: 13,
        letterSpacing: "1px"
      }
    }, "ENDURECIMENTO"), " sobe de ", a.scores.endurecimento, " para ", b.scores.endurecimento, "; os atributos de for\xE7a, de ", a.scores.forca, " a ", b.scores.forca, ". A alegoria n\xE3o muda de g\xEAnero \u2014 muda de fun\xE7\xE3o.")), /*#__PURE__*/React.createElement(Ledger, {
      a: a,
      b: b,
      accent: accent,
      compact: true
    })))), note && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        left: 24,
        bottom: 24,
        zIndex: 70,
        width: 300,
        background: C.ground,
        border: `1px solid ${C.gold}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 4,
        padding: "16px 18px",
        boxShadow: "0 24px 60px rgba(0,0,0,.55)",
        animation: "radioFade .25s ease both"
      }
    }, /*#__PURE__*/React.createElement(Corners, {
      c: C.goldDim,
      inset: 5,
      len: 10
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
      }
    }, /*#__PURE__*/React.createElement(Cap, {
      color: accent,
      style: {
        fontSize: 9
      }
    }, "Atributo \xB7 ", note.sp.title), /*#__PURE__*/React.createElement("button", {
      onClick: () => setNote(null),
      style: {
        background: "none",
        border: "none",
        color: C.ink3,
        cursor: "pointer",
        fontFamily: FONT_M,
        fontSize: 12
      }
    }, "\u2715")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_D,
        fontStyle: "italic",
        fontSize: 22,
        color: C.ink,
        margin: "6px 0 6px"
      }
    }, note.at.label), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: FONT_B,
        fontSize: 14,
        lineHeight: 1.55,
        color: C.ink2,
        margin: 0
      }
    }, "Marca iconogr\xE1fica registrada na radiografia de ", /*#__PURE__*/React.createElement("em", null, note.sp.title), " (", note.sp.year, "). Atributo classificado no regime ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: REG[note.sp.regime]
      }
    }, D.REGIME_LABEL[note.sp.regime].toLowerCase()), ".")), picker && /*#__PURE__*/React.createElement(Picker, {
      slot: picker,
      current: picker === "a" ? aId : bId,
      onPick: pick,
      onClose: () => setPicker(null)
    }), /*#__PURE__*/React.createElement("footer", {
      style: {
        marginTop: 48,
        padding: "0 44px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_M,
        fontSize: 9,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: C.ink3,
        lineHeight: 1.9
      }
    }, "ICONOCRACIA \xB7 Ius Gentium \xB7 UFSC \xB7 Florian\xF3polis \xB7 MMXXVI", /*#__PURE__*/React.createElement("br", null), "A radiografia n\xE3o julga a imagem \u2014 mede o que a imagem fez do corpo.")));
  }
  window.RadiografiaApp = RadiografiaApp;
})();