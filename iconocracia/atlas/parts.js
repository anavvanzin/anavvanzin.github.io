// Atlas-site — theme engine, shared atoms, and section components.
(function () {
  const D = window.AtlasData;
  const REG = {
    FUNDACIONAL: "var(--c-fund)",
    NORMATIVO: "var(--c-norm)",
    MILITAR: "var(--c-mil)",
    CONTRA_ALEGORIA: "var(--c-accent)"
  };

  // Resolve an asset path → inlined blob URL when bundled standalone (keyed by
  // filename via <meta name="ext-resource-dependency">), else the original path.
  const RES = p => {
    const f = String(p).split("/").pop();
    return window.__resources && window.__resources[f] || p;
  };

  // ── Theme → CSS custom properties ───────────────────────────────
  function atlasTheme(t) {
    const light = {
      "--c-ground": "#EFE5CF",
      "--c-panel": "#F8F5EE",
      "--c-panel-2": "rgba(255,255,255,.42)",
      "--c-ink": "#1A1612",
      "--c-ink-2": "#6F665C",
      "--c-ink-3": "#8D8377",
      "--c-border": "#D4C19A",
      "--c-hair": "rgba(184,146,74,.5)",
      "--c-gold": "#B8924A",
      "--c-plate": "#1D2548",
      "--c-on-accent": "#F8F5EE",
      "--c-grain": "var(--grain)"
    };
    const dark = {
      "--c-ground": "#171D38",
      "--c-panel": "#1F274A",
      "--c-panel-2": "rgba(255,255,255,.05)",
      "--c-ink": "#EFE6D2",
      "--c-ink-2": "#C7BCA6",
      "--c-ink-3": "#9A9276",
      "--c-border": "rgba(184,146,74,.34)",
      "--c-hair": "rgba(184,146,74,.4)",
      "--c-gold": "#D4A85E",
      "--c-plate": "#0E142C",
      "--c-on-accent": "#0E142C",
      "--c-grain": "none"
    };
    const base = t.tone === "cabinet" ? dark : light;
    const dens = {
      compacto: ["56px", "16px"],
      regular: ["88px", "22px"],
      amplo: ["124px", "32px"]
    }[t.density] || ["88px", "22px"];
    return {
      ...base,
      "--c-accent": t.accent || "#A04030",
      "--c-fund": "#6B52B0",
      "--c-norm": "#2A7A5A",
      "--c-mil": "#B23636",
      "--scale": t.scale || 1,
      "--t-hero": "calc(62px * var(--scale))",
      "--t-h1": "calc(38px * var(--scale))",
      "--t-h2": "calc(25px * var(--scale))",
      "--t-h3": "calc(19px * var(--scale))",
      "--t-body": "calc(16px * var(--scale))",
      "--t-small": "calc(13px * var(--scale))",
      "--pad-sec": dens[0],
      "--gap": dens[1]
    };
  }
  const heroCols = s => ({
    "equilíbrio": "1.05fr .95fr",
    "imagem dominante": "0.78fr 1.22fr",
    "texto dominante": "1.45fr .7fr"
  })[s] || "1.05fr .95fr";
  const corpusMin = d => ({
    compacto: "150px",
    regular: "182px",
    amplo: "232px"
  })[d] || "182px";

  // ── Atoms ────────────────────────────────────────────────────────
  const Cap = ({
    children,
    style
  }) => /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: "calc(10px * var(--scale))",
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--c-gold)",
      ...style
    }
  }, children);
  const DoubleRule = ({
    style
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--c-gold)",
      borderBottom: "1px solid var(--c-gold)",
      height: 4,
      ...style
    }
  });
  function Plate({
    it,
    label
  }) {
    return /*#__PURE__*/React.createElement("figure", {
      style: {
        margin: 0,
        position: "relative",
        aspectRatio: "3/4",
        overflow: "hidden",
        background: "var(--c-plate)",
        border: "1px solid var(--c-gold)",
        boxShadow: "var(--shadow-plate)",
        borderRadius: "var(--radius-sm)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: RES(it.img),
      alt: it.title,
      loading: "lazy",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), label !== false && /*#__PURE__*/React.createElement("figcaption", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(180deg,transparent,rgba(13,16,30,.92))",
        borderTop: "1px solid var(--c-gold)",
        padding: "18px 9px 7px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mono",
      style: {
        fontSize: 7,
        letterSpacing: "2px",
        color: "var(--c-gold)",
        textTransform: "uppercase"
      }
    }, it.country, " \xB7 ", it.year, " \xB7 ", it.support), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "calc(13px * var(--scale))",
        color: "#E8DCC4",
        marginTop: 2,
        lineHeight: 1.15
      }
    }, it.title)));
  }
  function Badge({
    children,
    color
  }) {
    return /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 9,
        letterSpacing: "1px",
        padding: "3px 9px",
        borderRadius: 999,
        background: `color-mix(in srgb, ${color} 18%, transparent)`,
        color
      }
    }, children);
  }

  // ── Sections ─────────────────────────────────────────────────────
  function Nav({
    tone,
    onTone
  }) {
    const links = [["argumento", "Tese"], ["anatomia", "Anatomia"], ["corpus", "Corpus"], ["atlas", "Atlas"], ["radiografia", "Radiografia"], ["lexico", "Léxico"], ["metodo", "Método"]];
    const jump = id => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({
        top: el.offsetTop - 64,
        behavior: "smooth"
      });
    };
    return /*#__PURE__*/React.createElement("nav", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "14px 40px",
        background: "color-mix(in srgb, var(--c-ground) 86%, transparent)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--c-border)"
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "https://anavanzin.com/",
      className: "mono",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 9,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "var(--c-ink-3)",
        textDecoration: "none"
      },
      onMouseEnter: e => e.currentTarget.style.color = "var(--c-accent)",
      onMouseLeave: e => e.currentTarget.style.color = "var(--c-ink-3)"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "10",
      viewBox: "0 0 15 11",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 5.5H1M6 1 1 5.5 6 10"
    })), "anavanzin.com"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        height: 18,
        background: "var(--c-border)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "calc(20px * var(--scale))",
        letterSpacing: "3px",
        color: "var(--c-ink)"
      }
    }, "ICONOCRACIA"), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 8,
        letterSpacing: "2.5px",
        color: "var(--c-gold)",
        textTransform: "uppercase"
      }
    }, "Atlas")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: "auto",
        display: "flex",
        gap: 18,
        alignItems: "center"
      }
    }, links.map(([id, l]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => jump(id),
      className: "mono",
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 10,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "var(--c-ink-2)",
        padding: 0
      },
      onMouseEnter: e => e.currentTarget.style.color = "var(--c-accent)",
      onMouseLeave: e => e.currentTarget.style.color = "var(--c-ink-2)"
    }, l))));
  }
  function Hero({
    t
  }) {
    const d = D.thesis;
    return /*#__PURE__*/React.createElement("header", {
      id: "topo",
      style: {
        padding: "var(--pad-sec) 40px",
        display: "grid",
        gridTemplateColumns: heroCols(t.heroSplit),
        gap: "56px",
        alignItems: "center",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 200,
        height: 1,
        background: "var(--c-gold)",
        marginBottom: 24,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        top: -3,
        width: 64,
        height: 1,
        background: "var(--c-accent)"
      }
    })), /*#__PURE__*/React.createElement(Cap, null, t.kicker || d.kicker), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-hero)",
        lineHeight: 1.02,
        color: "var(--c-ink)",
        margin: "16px 0 0",
        maxWidth: "15ch"
      }
    }, t.title || d.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "calc(18px * var(--scale))",
        lineHeight: 1.65,
        color: "var(--c-ink-2)",
        margin: "22px 0 0",
        maxWidth: "54ch"
      }
    }, d.lede), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14,
        marginTop: 26,
        flexWrap: "wrap"
      },
      className: "mono"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "var(--c-ink-3)"
      }
    }, d.author), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "var(--c-ink-3)"
      }
    }, "\xB7 ", d.group), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "var(--c-gold)"
      }
    }, "\xB7 ", d.year))), /*#__PURE__*/React.createElement("figure", {
      style: {
        margin: 0,
        position: "relative",
        aspectRatio: "4/5",
        border: "1px solid var(--c-gold)",
        overflow: "hidden",
        background: "var(--c-plate)",
        boxShadow: "var(--shadow-plate)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: RES(d.heroImg),
      alt: d.heroCap,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 8,
        left: 8,
        width: 16,
        height: 16,
        borderTop: "1px solid var(--c-gold)",
        borderLeft: "1px solid var(--c-gold)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        bottom: 8,
        right: 8,
        width: 16,
        height: 16,
        borderBottom: "1px solid var(--c-gold)",
        borderRight: "1px solid var(--c-gold)"
      }
    }), /*#__PURE__*/React.createElement("figcaption", {
      className: "mono",
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(180deg,transparent,rgba(13,16,30,.94))",
        padding: "26px 12px 9px",
        fontSize: 8,
        letterSpacing: "1.5px",
        color: "var(--c-gold)",
        textTransform: "uppercase",
        lineHeight: 1.5
      }
    }, d.heroCap)));
  }
  function Stats() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "0 40px calc(var(--pad-sec) * .6)",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "var(--gap)"
      }
    }, D.stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: "relative",
        background: "var(--c-panel)",
        border: "1px solid var(--c-border)",
        padding: "18px 18px 14px",
        backgroundImage: "var(--c-grain)",
        backgroundSize: "200px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: i % 2 ? "var(--c-accent)" : "var(--c-gold)"
      }
    }), /*#__PURE__*/React.createElement(Cap, null, s.l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "calc(40px * var(--scale))",
        lineHeight: 1,
        color: "var(--c-ink)",
        marginTop: 4
      }
    }, s.v), /*#__PURE__*/React.createElement("div", {
      className: "mono",
      style: {
        fontSize: 8,
        letterSpacing: "1px",
        color: "var(--c-ink-3)",
        marginTop: 6
      }
    }, s.s))));
  }
  function Argument() {
    const a = D.argument;
    return /*#__PURE__*/React.createElement("section", {
      id: "argumento",
      style: {
        padding: "var(--pad-sec) 40px",
        borderTop: "1px solid var(--c-border)"
      }
    }, /*#__PURE__*/React.createElement(Cap, null, a.cap), /*#__PURE__*/React.createElement(DoubleRule, {
      style: {
        margin: "16px 0 32px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.4fr .9fr",
        gap: "56px",
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "calc(20px * var(--scale))",
        lineHeight: 1.85,
        color: "var(--c-ink)",
        margin: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "calc(64px * var(--scale))",
        lineHeight: .7,
        color: "var(--c-accent)",
        float: "left",
        padding: "6px 12px 0 0"
      }
    }, a.drop), a.body), /*#__PURE__*/React.createElement("blockquote", {
      style: {
        margin: 0,
        paddingLeft: 20,
        borderLeft: "3px solid var(--c-accent)",
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "calc(24px * var(--scale))",
        lineHeight: 1.3,
        color: "var(--c-ink)"
      }
    }, a.pull)));
  }
  function Anatomia() {
    const a = D.anatomia;
    return /*#__PURE__*/React.createElement("section", {
      id: "anatomia",
      style: {
        padding: "var(--pad-sec) 40px",
        borderTop: "1px solid var(--c-border)"
      }
    }, /*#__PURE__*/React.createElement(Cap, null, a.cap), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-h1)",
        color: "var(--c-ink)",
        margin: "6px 0 0"
      }
    }, a.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "calc(18px * var(--scale))",
        color: "var(--c-ink-2)",
        lineHeight: 1.78,
        maxWidth: "60ch",
        margin: "14px 0 0"
      }
    }, a.lede), /*#__PURE__*/React.createElement(DoubleRule, {
      style: {
        margin: "26px 0 32px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "360px 1fr",
        gap: "56px",
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("figure", {
      style: {
        margin: 0,
        position: "relative",
        border: "1px solid var(--c-gold)",
        background: "var(--c-plate)",
        boxShadow: "var(--shadow-plate)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: RES(a.fig),
      alt: "",
      loading: "lazy",
      style: {
        display: "block",
        width: "100%",
        aspectRatio: "3/4",
        objectFit: "cover"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "11%",
        bottom: "7%",
        width: 1,
        background: "linear-gradient(180deg,var(--c-gold),rgba(184,146,74,.18))",
        transform: "translateX(-.5px)"
      }
    }), a.parts.map(p => /*#__PURE__*/React.createElement("div", {
      key: p.n,
      style: {
        position: "absolute",
        left: p.x,
        top: p.y,
        transform: "translate(-50%,-50%)",
        width: 27,
        height: 27,
        borderRadius: "50%",
        background: "var(--brand-amethyst)",
        border: "1.5px solid #E8DCC4",
        boxShadow: "0 0 0 4px rgba(138,95,168,.3), var(--shadow-plate)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "#F4F0E8"
      }
    }, p.n)), /*#__PURE__*/React.createElement("figcaption", {
      className: "mono",
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(180deg,transparent,rgba(13,16,30,.92))",
        borderTop: "1px solid var(--c-gold)",
        padding: "24px 12px 9px",
        fontSize: 8,
        letterSpacing: "2px",
        color: "var(--c-gold)",
        textTransform: "uppercase"
      }
    }, a.figCap)), /*#__PURE__*/React.createElement("ol", {
      style: {
        listStyle: "none",
        margin: 0,
        padding: 0
      }
    }, a.parts.map((p, i) => /*#__PURE__*/React.createElement("li", {
      key: p.n,
      style: {
        display: "grid",
        gridTemplateColumns: "34px 1fr",
        gap: 20,
        alignItems: "start",
        padding: "20px 0",
        borderTop: i ? "1px solid var(--c-hair)" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: "1.5px solid var(--brand-amethyst)",
        color: "var(--brand-amethyst)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 13
      }
    }, p.n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-h3)",
        color: "var(--c-ink)",
        lineHeight: 1.12
      }
    }, p.el), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "var(--t-body)",
        color: "var(--c-ink-2)",
        lineHeight: 1.62,
        marginTop: 6
      }
    }, p.fn)))))));
  }
  function CorpusWall({
    t
  }) {
    const regs = ["FUNDACIONAL", "NORMATIVO", "MILITAR", "CONTRA_ALEGORIA"];
    return /*#__PURE__*/React.createElement("section", {
      id: "corpus",
      style: {
        padding: "var(--pad-sec) 40px",
        borderTop: "1px solid var(--c-border)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Cap, null, "Corpus iconogr\xE1fico \xB7 ", D.corpus.length, " placas em vitrine"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-h1)",
        color: "var(--c-ink)",
        margin: "6px 0 0"
      }
    }, "A parede de esp\xE9cimes"), /*#__PURE__*/React.createElement("p", {
      className: "mono",
      style: {
        fontSize: 9,
        letterSpacing: "1.5px",
        color: "var(--c-ink-3)",
        textTransform: "uppercase",
        margin: "8px 0 0"
      }
    }, "clique numa placa para abrir a ficha \u2192")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14,
        flexWrap: "wrap"
      }
    }, regs.map(r => /*#__PURE__*/React.createElement("span", {
      key: r,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      },
      className: "mono"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: REG[r]
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        letterSpacing: "1px",
        color: "var(--c-ink-2)",
        textTransform: "uppercase"
      }
    }, D.REGIME_LABEL[r]))))), /*#__PURE__*/React.createElement(DoubleRule, {
      style: {
        margin: "18px 0 24px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill,minmax(${corpusMin(t.density)},1fr))`,
        gap: "var(--gap)"
      }
    }, D.corpus.map(it => /*#__PURE__*/React.createElement("a", {
      key: it.id,
      href: "../corpus/" + it.id + ".html",
      style: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        transition: "transform var(--dur,.25s) var(--ease-out,ease)"
      },
      onMouseEnter: e => {
        e.currentTarget.style.transform = "translateY(-3px)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.transform = "none";
      }
    }, /*#__PURE__*/React.createElement(Plate, {
      it: it
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 8,
        left: 8,
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: REG[it.regime],
        boxShadow: "0 0 0 2px rgba(0,0,0,.25)"
      }
    })))));
  }
  function AtlasBand() {
    return /*#__PURE__*/React.createElement("section", {
      id: "atlas",
      style: {
        padding: "var(--pad-sec) 40px",
        backgroundColor: "#1A2143",
        backgroundImage: "linear-gradient(rgba(184,146,74,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,146,74,.06) 1px, transparent 1px), linear-gradient(160deg,#1A2143,#2A3360)",
        backgroundSize: "24px 24px, 24px 24px, cover",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(Cap, {
      style: {
        color: "#D4A85E"
      }
    }, "O Atlas Iconocr\xE1tico \xB7 oito pain\xE9is \xB7 Warburg"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-h1)",
        color: "#EFE6D2",
        margin: "8px 0 0",
        maxWidth: "20ch"
      }
    }, "Uma montagem que n\xE3o resolve a tens\xE3o \u2014 a habita"), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid #B8924A",
        borderBottom: "1px solid #B8924A",
        height: 4,
        margin: "24px 0 32px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "var(--gap)"
      }
    }, D.panels.map((p, i) => /*#__PURE__*/React.createElement("article", {
      key: p.n,
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "4/5",
        border: "1px solid #B8924A",
        overflow: "hidden",
        background: "#0E142C"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: RES(D.panelImg[i]),
      alt: p.name,
      loading: "lazy",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: .92
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 8,
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "calc(26px * var(--scale))",
        color: "#D4A85E",
        lineHeight: 1
      }
    }, p.n), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "calc(18px * var(--scale))",
        color: "#EFE6D2"
      }
    }, p.name)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "calc(13px * var(--scale))",
        color: "#C7BCA6",
        lineHeight: 1.45,
        margin: "4px 0 0"
      }
    }, p.desc), /*#__PURE__*/React.createElement("div", {
      className: "mono",
      style: {
        fontSize: 8,
        letterSpacing: "1.5px",
        color: "#9A9276",
        marginTop: 4
      }
    }, p.period)))));
  }
  function Radiografia() {
    const r = D.radiografia;
    const Spec = ({
      s
    }) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: "3/4",
        border: "1px solid var(--c-gold)",
        overflow: "hidden",
        background: "var(--c-plate)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: RES(s.img),
      alt: s.title,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Cap, null, s.cap), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-h3)",
        color: "var(--c-ink)",
        margin: "4px 0 10px"
      }
    }, s.title), /*#__PURE__*/React.createElement(Badge, {
      color: REG[s.regime]
    }, D.REGIME_LABEL[s.regime]), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        display: "flex",
        flexDirection: "column",
        gap: 5
      }
    }, r.indicators.map((name, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 8,
        color: "var(--c-ink-3)",
        width: 96,
        textAlign: "right",
        letterSpacing: ".3px"
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 6,
        background: "color-mix(in srgb, var(--c-ink) 8%, transparent)",
        borderRadius: 3,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: s.scores[i] * 10 + "%",
        height: "100%",
        background: "var(--c-mil)",
        borderRadius: 3
      }
    })))))));
    return /*#__PURE__*/React.createElement("section", {
      id: "radiografia",
      style: {
        padding: "var(--pad-sec) 40px",
        borderTop: "1px solid var(--c-border)"
      }
    }, /*#__PURE__*/React.createElement(Cap, null, r.cap), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-h1)",
        color: "var(--c-ink)",
        margin: "6px 0 0"
      }
    }, r.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "var(--t-body)",
        color: "var(--c-ink-2)",
        lineHeight: 1.7,
        maxWidth: "66ch",
        margin: "12px 0 0"
      }
    }, r.desc), /*#__PURE__*/React.createElement(DoubleRule, {
      style: {
        margin: "24px 0 28px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px"
      }
    }, /*#__PURE__*/React.createElement(Spec, {
      s: r.a
    }), /*#__PURE__*/React.createElement(Spec, {
      s: r.b
    })));
  }
  function Lexico() {
    return /*#__PURE__*/React.createElement("section", {
      id: "lexico",
      style: {
        padding: "var(--pad-sec) 40px",
        borderTop: "1px solid var(--c-border)"
      }
    }, /*#__PURE__*/React.createElement(Cap, null, "L\xE9xico \xB7 conceitos da tese"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-h1)",
        color: "var(--c-ink)",
        margin: "6px 0 24px"
      }
    }, "Vocabul\xE1rio iconocr\xE1tico"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--gap)"
      }
    }, D.verbetes.map(v => {
      const orig = v.type === "original";
      const ac = orig ? "var(--c-accent)" : "var(--c-plate)";
      return /*#__PURE__*/React.createElement("div", {
        key: v.term,
        style: {
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 16,
          alignItems: "start",
          background: "var(--c-panel)",
          border: "1px solid var(--c-border)",
          borderLeft: `3px solid ${ac}`,
          padding: "14px 18px",
          backgroundImage: "var(--c-grain)",
          backgroundSize: "200px"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "var(--t-h3)",
          color: "var(--c-ink)",
          lineHeight: 1
        }
      }, v.term), /*#__PURE__*/React.createElement("div", {
        className: "mono",
        style: {
          fontSize: 9,
          letterSpacing: "1.5px",
          color: "var(--c-gold)",
          marginTop: 4
        }
      }, v.source)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "mono",
        style: {
          fontSize: 8,
          letterSpacing: "2px",
          textTransform: "uppercase",
          padding: "3px 8px",
          border: `1px solid ${ac}`,
          color: ac
        }
      }, v.type), /*#__PURE__*/React.createElement("span", {
        className: "mono",
        style: {
          fontSize: 9,
          color: "var(--c-ink-3)"
        }
      }, v.ch)));
    })));
  }
  function Method() {
    return /*#__PURE__*/React.createElement("section", {
      id: "metodo",
      style: {
        padding: "var(--pad-sec) 40px",
        borderTop: "1px solid var(--c-border)"
      }
    }, /*#__PURE__*/React.createElement(Cap, null, "Desenho metodol\xF3gico"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-h1)",
        color: "var(--c-ink)",
        margin: "6px 0 28px"
      }
    }, "Tr\xEAs registros, um argumento"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "var(--gap)"
      }
    }, D.method.map(m => /*#__PURE__*/React.createElement("div", {
      key: m.k,
      style: {
        padding: "22px 22px 26px",
        border: "1px solid var(--c-border)",
        background: "var(--c-panel-2)",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 14,
        height: 14,
        borderTop: "1px solid var(--c-gold)",
        borderLeft: "1px solid var(--c-gold)"
      }
    }), /*#__PURE__*/React.createElement(Cap, null, m.k), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-h2)",
        color: "var(--c-ink)",
        margin: "8px 0 10px"
      }
    }, m.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "var(--t-small)",
        color: "var(--c-ink-2)",
        lineHeight: 1.65,
        margin: 0
      }
    }, m.d)))));
  }
  function Colophon() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        padding: "var(--pad-sec) 40px",
        borderTop: "3px double var(--c-gold)",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: RES("../assets/logo-symbol.png"),
      alt: "",
      style: {
        width: 64,
        height: 64,
        objectFit: "cover",
        borderRadius: 4,
        border: "1px solid var(--c-gold)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "var(--t-h2)",
        color: "var(--c-ink)",
        marginTop: 16
      }
    }, "Iuris Memoria"), /*#__PURE__*/React.createElement("div", {
      className: "mono",
      style: {
        fontSize: 9,
        letterSpacing: "2.5px",
        color: "var(--c-ink-3)",
        textTransform: "uppercase",
        marginTop: 10,
        lineHeight: 1.9
      }
    }, "ICONOCRACIA \xB7 Ius Gentium \xB7 UFSC \xB7 Florian\xF3polis \xB7 MMXXVI", /*#__PURE__*/React.createElement("br", null), "anavvanzin / iconocracy-corpus \xB7 PPGD"));
  }
  window.AtlasParts = {
    atlasTheme,
    Nav,
    Hero,
    Stats,
    Argument,
    Anatomia,
    CorpusWall,
    AtlasBand,
    Radiografia,
    Lexico,
    Method,
    Colophon
  };
})();