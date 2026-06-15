/* @ds-bundle: {"format":3,"namespace":"AnaVanzinDesignSystem_b45a86","components":[{"name":"FootnoteRef","sourcePath":"components/content/FootnoteRef.jsx"},{"name":"Footnotes","sourcePath":"components/content/FootnoteRef.jsx"},{"name":"PublicationEntry","sourcePath":"components/content/PublicationEntry.jsx"},{"name":"SectionRule","sourcePath":"components/content/SectionRule.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"RubricLink","sourcePath":"components/core/RubricLink.jsx"},{"name":"DesktopIcon","sourcePath":"components/desktop/DesktopIcon.jsx"},{"name":"Dock","sourcePath":"components/desktop/Dock.jsx"},{"name":"Window","sourcePath":"components/desktop/Window.jsx"},{"name":"BlindfoldHero","sourcePath":"components/site/BlindfoldHero.jsx"},{"name":"NavBar","sourcePath":"components/site/NavBar.jsx"},{"name":"SiteFooter","sourcePath":"components/site/SiteFooter.jsx"}],"sourceHashes":{"components/content/FootnoteRef.jsx":"7ba61a7f552d","components/content/PublicationEntry.jsx":"0346867b5cdc","components/content/SectionRule.jsx":"87dbb565ead7","components/core/Button.jsx":"37f6f8c5d357","components/core/Eyebrow.jsx":"985e0442c257","components/core/RubricLink.jsx":"60ca22471f88","components/desktop/DesktopIcon.jsx":"d1ce65f06c3b","components/desktop/Dock.jsx":"0609d20e7b7d","components/desktop/Window.jsx":"bb5b5cd85541","components/site/BlindfoldHero.jsx":"079f9c988b9f","components/site/NavBar.jsx":"a6b96e1896f2","components/site/SiteFooter.jsx":"d197a80c8fc6","ui_kits/desktop/Desktop.jsx":"9b7b178fe36c","ui_kits/desktop/WindowContents.jsx":"1f8558d08852","ui_kits/desktop/icons.jsx":"8dcd2dca9b8e","ui_kits/website/ScreensContent.jsx":"e641854e50d6","ui_kits/website/ScreensHome.jsx":"25165d15b726","uploads/app.js":"bbbfa2cd21a2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AnaVanzinDesignSystem_b45a86 = window.AnaVanzinDesignSystem_b45a86 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/FootnoteRef.jsx
try { (() => {
/** Superscript rubric footnote marker linking to a Footnotes list. */
function FootnoteRef({
  n,
  style
}) {
  return /*#__PURE__*/React.createElement("sup", {
    style: {
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `#fn-${n}`,
    id: `fnref-${n}`,
    style: {
      color: 'var(--accent)',
      textDecoration: 'none',
      fontSize: '0.72em',
      fontWeight: 600,
      ...style
    }
  }, n));
}

/** Footnote list: hairline rule above, author-year-page register. */
function Footnotes({
  notes = [],
  style
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 'var(--space-4) 0 0',
      borderTop: 'var(--rule-w-hairline) solid var(--rule-hairline)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      fontSize: 'var(--text-footnote)',
      color: 'var(--text-muted)',
      maxWidth: '52ch',
      ...style
    }
  }, notes.map((note, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    id: `fn-${i + 1}`,
    style: {
      display: 'flex',
      gap: '0.6em'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `#fnref-${i + 1}`,
    style: {
      color: 'var(--accent)',
      textDecoration: 'none',
      fontWeight: 600
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", null, note))));
}
Object.assign(__ds_scope, { FootnoteRef, Footnotes });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FootnoteRef.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/** Square-cornered button. outline (default) inverts to ink on hover; solid is ink; quiet is text-only. */
function Button({
  children,
  variant = 'outline',
  size = 'md',
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const pad = size === 'sm' ? '6px 14px' : size === 'lg' ? '14px 30px' : '10px 22px';
  const fs = size === 'sm' ? '12px' : '13px';
  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 'var(--tracking-caps)',
    fontSize: fs,
    padding: pad,
    borderRadius: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background var(--duration-ui) ease, color var(--duration-ui) ease',
    opacity: disabled ? 0.4 : 1
  };
  const looks = {
    outline: {
      background: hover && !disabled ? 'var(--ink)' : 'transparent',
      color: hover && !disabled ? 'var(--paper)' : 'var(--ink)',
      border: '1px solid var(--ink)'
    },
    solid: {
      background: press ? 'var(--rubric)' : hover && !disabled ? 'color-mix(in srgb, var(--ink) 88%, var(--paper))' : 'var(--ink)',
      color: 'var(--paper)',
      border: '1px solid var(--ink)'
    },
    quiet: {
      background: 'transparent',
      color: hover && !disabled ? 'var(--accent-hover)' : 'var(--accent)',
      border: '1px solid transparent',
      textDecoration: 'underline',
      textUnderlineOffset: '0.2em',
      textDecorationThickness: '1px'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...looks[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
/** Tracked-out uppercase Garamond label. The brand's eyebrow/small-caps device. */
function Eyebrow({
  children,
  color = 'rubric',
  as: Tag = 'div',
  style
}) {
  return /*#__PURE__*/React.createElement(Tag, {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      fontSize: 'var(--text-eyebrow)',
      color: color === 'ink' ? 'var(--ink)' : color === 'muted' ? 'var(--text-faint)' : 'var(--rubric)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionRule.jsx
try { (() => {
/** Section opening: rubric eyebrow, Garamond title, strong ink rule beneath. */
function SectionRule({
  eyebrow,
  title,
  lang,
  id,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    id: id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      ...style
    }
  }, eyebrow ? /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, eyebrow) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-4)',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-h2)',
      lineHeight: 'var(--leading-heading)',
      margin: 0
    }
  }, title), lang ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-small)',
      color: 'var(--text-faint)'
    }
  }, lang) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: 'var(--rule-w-strong) solid var(--ink)'
    }
  }));
}
Object.assign(__ds_scope, { SectionRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionRule.jsx", error: String((e && e.message) || e) }); }

// components/core/RubricLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Rubric text link. external adds the → device after the label. */
function RubricLink({
  href = '#',
  children,
  external = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href
  }, external ? {
    target: '_blank',
    rel: 'noreferrer'
  } : {}, {
    style: {
      color: 'var(--accent)',
      textDecoration: 'underline',
      textDecorationThickness: '1px',
      textUnderlineOffset: '0.18em',
      transition: 'color var(--duration-ui) ease',
      ...style
    }
  }, rest), children, external ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2009\u2192") : null);
}
Object.assign(__ds_scope, { RubricLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/RubricLink.jsx", error: String((e && e.message) || e) }); }

// components/content/PublicationEntry.jsx
try { (() => {
/** Bibliography-style entry: year in marginalia, italic Garamond title, footnote-style meta. */
function PublicationEntry({
  year,
  title,
  href,
  meta,
  note,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(56px, 80px) 1fr',
      gap: '0 var(--space-5)',
      padding: 'var(--space-5) 0',
      borderTop: 'var(--rule-w-hairline) solid var(--rule-hairline)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 'var(--text-h3)',
      color: 'var(--text-faint)',
      lineHeight: 1.2
    }
  }, year), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontStyle: 'italic',
      fontSize: 'var(--text-h3)',
      lineHeight: 'var(--leading-tight)',
      margin: 0
    }
  }, href ? /*#__PURE__*/React.createElement(__ds_scope.RubricLink, {
    href: href,
    style: {
      color: 'var(--ink)',
      textDecorationColor: 'var(--rubric)'
    }
  }, title) : title), meta ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-small)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, meta) : null, note ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-footnote)',
      color: 'var(--text-faint)',
      margin: 0
    }
  }, note) : null));
}
Object.assign(__ds_scope, { PublicationEntry });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PublicationEntry.jsx", error: String((e && e.message) || e) }); }

// components/desktop/DesktopIcon.jsx
try { (() => {
/** A desktop icon: glyph above a label. Single-click selects (rubric highlight),
 *  double-click opens. Pass any node as `icon` (svg, img, brand mark). */
function DesktopIcon({
  icon,
  label,
  selected = false,
  onSelect,
  onOpen,
  width = 84,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    onPointerDown: e => {
      if (e.stopPropagation) e.stopPropagation();
      if (onSelect) onSelect();
    },
    onDoubleClick: onOpen,
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
      width,
      padding: 3,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: 3,
      outline: selected ? '1.5px solid var(--rubric)' : '1.5px solid transparent',
      outlineOffset: 1
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: 1.2,
      textAlign: 'center',
      padding: '1px 5px',
      background: selected ? 'var(--rubric)' : 'transparent',
      color: selected ? 'var(--paper)' : 'var(--ink)'
    }
  }, label));
}
Object.assign(__ds_scope, { DesktopIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/desktop/DesktopIcon.jsx", error: String((e && e.message) || e) }); }

// components/desktop/Dock.jsx
try { (() => {
/** Bottom dock: ink bar with the site wordmark and a tab per open window.
 *  Active window tab is filled paper; minimized tabs are faded. */
function Dock({
  brand = 'anavanzin.com',
  items = [],
  onItemClick,
  hint,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 36,
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '0 12px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.26em',
      fontSize: 11,
      color: 'var(--gold-2)',
      whiteSpace: 'nowrap'
    }
  }, brand), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 16,
      background: 'rgba(242,234,217,0.25)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      overflow: 'hidden'
    }
  }, items.map(it => {
    const on = it.active && !it.minimized;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onPointerDown: e => {
        if (e.stopPropagation) e.stopPropagation();
      },
      onClick: () => onItemClick && onItemClick(it.id),
      style: {
        background: on ? 'var(--paper)' : 'transparent',
        color: on ? 'var(--ink)' : 'var(--paper)',
        border: '1px solid ' + (on ? 'var(--paper)' : 'rgba(242,234,217,0.35)'),
        borderRadius: 0,
        padding: '3px 10px',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 12.5,
        whiteSpace: 'nowrap',
        opacity: it.minimized ? 0.6 : 1
      }
    }, it.title);
  })), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 11,
      color: 'rgba(242,234,217,0.5)',
      whiteSpace: 'nowrap'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Dock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/desktop/Dock.jsx", error: String((e && e.message) || e) }); }

// components/desktop/Window.jsx
try { (() => {
/** A System-7-style window: hairline title bar with stripe flanks, square close
 *  (left) and minimize (right) boxes, square corners, hard offset outline. */
function Window({
  title,
  active = true,
  width = 480,
  onClose,
  onMinimize,
  onTitleDown,
  bodyPad = 22,
  children,
  style
}) {
  const stripes = active ? 'repeating-linear-gradient(to bottom, var(--ink) 0 1px, transparent 1px 3px)' : 'none';
  const flank = {
    flex: 1,
    height: 11,
    alignSelf: 'center',
    background: stripes,
    opacity: active ? 0.9 : 0,
    minWidth: 12
  };
  const box = {
    width: 15,
    height: 15,
    border: '1.5px solid var(--ink)',
    background: 'var(--paper)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    cursor: 'pointer',
    boxSizing: 'border-box',
    opacity: active ? 1 : 0.4
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      background: 'var(--paper)',
      border: '1px solid var(--ink)',
      borderRadius: 0,
      boxShadow: active ? '5px 5px 0 0 var(--ink)' : '3px 3px 0 0 var(--ink-50)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    onPointerDown: onTitleDown,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      height: 30,
      padding: '0 9px',
      background: 'var(--paper)',
      borderBottom: '1px solid var(--ink)',
      cursor: onTitleDown ? 'grab' : 'default',
      userSelect: 'none',
      touchAction: 'none'
    }
  }, onClose ? /*#__PURE__*/React.createElement("button", {
    "aria-label": "Fechar",
    onClick: onClose,
    onPointerDown: e => e.stopPropagation(),
    style: box
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 15
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: flank
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
      color: active ? 'var(--ink)' : 'var(--text-faint)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: flank
  }), onMinimize ? /*#__PURE__*/React.createElement("button", {
    "aria-label": "Minimizar",
    onClick: onMinimize,
    onPointerDown: e => e.stopPropagation(),
    style: box
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 1.5,
      background: 'var(--ink)'
    }
  })) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 15
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: bodyPad
    }
  }, children));
}
Object.assign(__ds_scope, { Window });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/desktop/Window.jsx", error: String((e && e.message) || e) }); }

// components/site/BlindfoldHero.jsx
try { (() => {
/**
 * The signature hero: name very large in Garamond, one thin rubric line at
 * blindfold height. The line's draw-in is the site's only animation and is
 * gated on prefers-reduced-motion.
 */
function BlindfoldHero({
  name = 'ana vanzin',
  subtitle,
  lede,
  animate = true,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-8) 0 var(--space-7)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @keyframes av-blindfold-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .av-blindfold-line { transform-origin: left center; }
        @media (prefers-reduced-motion: no-preference) {
          .av-blindfold-line[data-animate="true"] {
            animation: av-blindfold-draw var(--duration-reveal) var(--ease-page) both;
            animation-delay: 250ms;
          }
        }
      `), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 'var(--text-hero)',
      lineHeight: 'var(--leading-display)',
      letterSpacing: '0.01em',
      margin: 0
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "av-blindfold-line",
    "data-animate": animate ? 'true' : 'false',
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: '42%',
      height: 1,
      background: 'var(--rubric)'
    }
  })), subtitle ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      fontSize: 'var(--text-eyebrow)',
      color: 'var(--rubric)',
      marginTop: 'var(--space-5)'
    }
  }, subtitle) : null, lede ? /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: '52ch',
      fontSize: 'var(--text-lead)',
      lineHeight: 1.55,
      marginTop: 'var(--space-5)'
    }
  }, lede) : null);
}
Object.assign(__ds_scope, { BlindfoldHero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/BlindfoldHero.jsx", error: String((e && e.message) || e) }); }

// components/site/NavBar.jsx
try { (() => {
/** Site header: lockup left, small-caps Garamond nav right, active item underlined in rubric. */
function NavBar({
  items = [],
  activeId,
  onSelect,
  lockupSrc = 'assets/lockup.svg',
  langToggle,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      padding: 'var(--space-5) 0',
      borderBottom: 'var(--rule-w-hairline) solid var(--rule-hairline)',
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "ana vanzin \u2014 in\xEDcio",
    style: {
      display: 'flex',
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: lockupSrc,
    alt: "ana vanzin",
    style: {
      height: 44,
      width: 'auto'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "principal",
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-5)',
      flexWrap: 'wrap'
    }
  }, items.map(item => {
    const active = item.id === activeId;
    return /*#__PURE__*/React.createElement("a", {
      key: item.id,
      href: item.href || '#' + item.id,
      onClick: onSelect ? e => {
        e.preventDefault();
        onSelect(item.id);
      } : undefined,
      "aria-current": active ? 'page' : undefined,
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-caps)',
        fontSize: '13px',
        color: active ? 'var(--rubric)' : 'var(--ink)',
        textDecoration: 'none',
        borderBottom: active ? '1px solid var(--rubric)' : '1px solid transparent',
        paddingBottom: 3,
        transition: 'color var(--duration-ui) ease, border-color var(--duration-ui) ease'
      }
    }, item.label);
  }), langToggle ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: 'var(--text-faint)',
      letterSpacing: '0.1em'
    }
  }, langToggle) : null));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteFooter.jsx
try { (() => {
/** Inverse ink footer: seal, contact line, printer's flourish. */
function SiteFooter({
  sealSrc = 'assets/seal.svg',
  email = 'ana@anavanzin.com',
  lines = [],
  style
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: 'var(--space-7) var(--page-pad)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-4)',
      textAlign: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: sealSrc,
    alt: "",
    width: "56",
    height: "56",
    style: {
      filter: 'invert(1) hue-rotate(180deg) saturate(0)',
      opacity: 0.92
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${email}`,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      fontSize: 'var(--text-eyebrow)',
      color: 'var(--paper)',
      textDecoration: 'none',
      borderBottom: '1px solid var(--rubric)',
      paddingBottom: 3
    }
  }, email), lines.map((line, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: 0,
      fontSize: 'var(--text-small)',
      color: 'var(--ink-30)',
      maxWidth: '52ch'
    }
  }, line)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      color: 'var(--ink-50)'
    }
  }, "\u2767"));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/desktop/Desktop.jsx
try { (() => {
/* ana vanzin desktop — window manager, menu bar, dock, boot. */
const {
  FolderIcon,
  DocIcon,
  MailIcon,
  GroupIcon,
  ImageIcon,
  SealIcon,
  QuoteIcon,
  CloseBox
} = window;
const {
  WSobre,
  WTese,
  WPublicacoes,
  WIus,
  WContato,
  WJustitia,
  WCv
} = window;
const REG = {
  sobre: {
    title: {
      pt: 'sobre.txt',
      en: 'about.txt'
    },
    w: 440,
    Body: WSobre
  },
  tese: {
    title: {
      pt: 'tese',
      en: 'thesis'
    },
    w: 560,
    Body: WTese
  },
  publicacoes: {
    title: {
      pt: 'publicações',
      en: 'publications'
    },
    w: 520,
    Body: WPublicacoes
  },
  ius: {
    title: {
      pt: 'ius gentium',
      en: 'ius gentium'
    },
    w: 440,
    Body: WIus
  },
  curriculo: {
    title: {
      pt: 'currículo',
      en: 'curriculum'
    },
    w: 460,
    Body: WCv
  },
  contato: {
    title: {
      pt: 'contato',
      en: 'contact'
    },
    w: 420,
    Body: WContato
  },
  justitia: {
    title: {
      pt: 'justitia.png',
      en: 'justitia.png'
    },
    w: 360,
    Body: WJustitia
  }
};
const regTitle = (id, lang) => REG[id].title[lang] || REG[id].title.pt;
const DESK_ICONS = [{
  id: 'sobre',
  label: {
    pt: 'sobre.txt',
    en: 'about.txt'
  },
  Icon: DocIcon
}, {
  id: 'tese',
  label: {
    pt: 'tese',
    en: 'thesis'
  },
  Icon: FolderIcon
}, {
  id: 'conceitos',
  label: {
    pt: 'conceitos',
    en: 'concepts'
  },
  Icon: SealIcon
}, {
  id: 'quotes',
  label: {
    pt: 'citações',
    en: 'quotes'
  },
  Icon: QuoteIcon
}, {
  id: 'publicacoes',
  label: {
    pt: 'publicações',
    en: 'publications'
  },
  Icon: FolderIcon
}, {
  id: 'ius',
  label: {
    pt: 'ius gentium',
    en: 'ius gentium'
  },
  Icon: GroupIcon
}, {
  id: 'curriculo',
  label: {
    pt: 'currículo',
    en: 'curriculum'
  },
  Icon: DocIcon
}, {
  id: 'justitia',
  label: {
    pt: 'justitia.png',
    en: 'justitia.png'
  },
  Icon: ImageIcon
}, {
  id: 'contato',
  label: {
    pt: 'contato',
    en: 'contact'
  },
  Icon: MailIcon
}];
const MENUS = ['sobre', 'tese', 'conceitos', 'publicacoes', 'ius', 'contato'];
const MENU_LABEL = {
  pt: {
    sobre: 'Sobre',
    tese: 'Tese',
    conceitos: 'Conceitos',
    publicacoes: 'Perfis',
    ius: 'Ius Gentium',
    contato: 'Contato'
  },
  en: {
    sobre: 'About',
    tese: 'Thesis',
    conceitos: 'Concepts',
    publicacoes: 'Profiles',
    ius: 'Ius Gentium',
    contato: 'Contact'
  }
};
const UI = {
  pt: {
    welcome: 'bem-vinda',
    tagline: 'direito & iconografia',
    enter: 'entrar →',
    dockHint: 'clique duplo · arraste pela barra',
    dockHintM: 'toque · arraste a barra',
    clk: 'pt-BR'
  },
  en: {
    welcome: 'welcome',
    tagline: 'law & iconography',
    enter: 'enter →',
    dockHint: 'double-click · drag the title bar',
    dockHintM: 'tap · drag the bar',
    clk: 'en-GB'
  }
};
const winW = id => Math.min(REG[id].w, (typeof window !== 'undefined' ? window.innerWidth : 1280) - 24);
function useIsMobile() {
  const [m, setM] = React.useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const fn = () => setM(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return m;
}

/* ---- striped (System-7) title bar ---- */
function ChromeBox({
  children,
  active,
  onClick,
  label
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseDown: e => e.stopPropagation(),
    onPointerDown: e => e.stopPropagation(),
    "aria-label": label,
    style: {
      width: 15,
      height: 15,
      border: '1.5px solid var(--ink)',
      background: 'var(--paper)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      cursor: 'pointer',
      boxSizing: 'border-box',
      opacity: active ? 1 : 0.4,
      lineHeight: 0
    }
  }, children);
}
function TitleBar({
  title,
  active,
  onClose,
  onMin,
  onDown,
  draggable = true
}) {
  const stripes = active ? 'repeating-linear-gradient(to bottom, var(--ink) 0 1px, transparent 1px 3px)' : 'none';
  const flank = {
    flex: 1,
    height: 11,
    alignSelf: 'center',
    background: stripes,
    opacity: active ? 0.9 : 0,
    minWidth: 12
  };
  return /*#__PURE__*/React.createElement("div", {
    onPointerDown: draggable ? onDown : undefined,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      height: draggable ? 30 : 38,
      padding: '0 9px',
      background: 'var(--paper)',
      borderBottom: '1px solid var(--ink)',
      cursor: draggable ? 'grab' : 'default',
      userSelect: 'none',
      touchAction: 'none'
    }
  }, /*#__PURE__*/React.createElement(ChromeBox, {
    active: active,
    onClick: onClose,
    label: "Fechar"
  }), /*#__PURE__*/React.createElement("div", {
    style: flank
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
      color: active ? 'var(--ink)' : 'var(--text-faint)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: flank
  }), /*#__PURE__*/React.createElement(ChromeBox, {
    active: active,
    onClick: onMin,
    label: "Minimizar"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 1.5,
      background: 'var(--ink)'
    }
  })));
}
function WindowFrame({
  win,
  active,
  onClose,
  onMin,
  onFocus,
  onDragStart,
  lang,
  isMobile
}) {
  const reg = REG[win.id];
  const Body = reg.Body;
  const frame = isMobile ? {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '100%',
    zIndex: 9500 + win.z,
    background: 'var(--paper)',
    border: '1px solid var(--ink)',
    borderRadius: '16px 16px 0 0',
    boxShadow: '0 -4px 0 0 var(--ink)'
  } : {
    position: 'absolute',
    left: win.x,
    top: win.y,
    width: winW(win.id),
    zIndex: win.z,
    background: 'var(--paper)',
    border: '1px solid var(--ink)',
    boxShadow: active ? '5px 5px 0 0 var(--ink)' : '3px 3px 0 0 var(--ink-50)'
  };
  return /*#__PURE__*/React.createElement("div", {
    onPointerDown: () => onFocus(win.id),
    style: frame
  }, /*#__PURE__*/React.createElement(TitleBar, {
    title: regTitle(win.id, lang),
    active: active || isMobile,
    onClose: () => onClose(win.id),
    onMin: () => onMin(win.id),
    onDown: e => onDragStart(e, win.id),
    draggable: !isMobile
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: win.id === 'justitia' ? 12 : 22,
      maxHeight: isMobile ? '70vh' : '58vh',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Body, {
    lang: lang
  })));
}
function Clock({
  lang
}) {
  const [t, setT] = React.useState('');
  React.useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString(UI[lang].clk, {
      hour: '2-digit',
      minute: '2-digit'
    }));
    tick();
    const i = setInterval(tick, 15000);
    return () => clearInterval(i);
  }, [lang]);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.12em',
      fontSize: 13,
      color: 'var(--gold)'
    }
  }, t);
}
function Boot({
  onEnter,
  lang
}) {
  const u = UI[lang];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'var(--paper)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 22,
      textAlign: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'min(420px, 86vw)',
      border: '1px solid var(--ink)',
      boxShadow: '5px 5px 0 0 var(--ink)',
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 30,
      borderBottom: '1px solid var(--ink)',
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '0 9px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 13,
      height: 13,
      border: '1.5px solid var(--ink)',
      display: 'inline-block',
      boxSizing: 'border-box'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 11,
      background: 'repeating-linear-gradient(to bottom, var(--ink) 0 1px, transparent 1px 3px)',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 14,
      whiteSpace: 'nowrap'
    }
  }, u.welcome), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 11,
      background: 'repeating-linear-gradient(to bottom, var(--ink) 0 1px, transparent 1px 3px)',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 13
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '34px 28px 30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel-justitia.png",
    alt: "",
    style: {
      height: 150,
      imageRendering: 'pixelated'
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 40,
      lineHeight: 1,
      margin: 0,
      whiteSpace: 'nowrap'
    }
  }, "ana vanzin"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200,
      height: 1,
      background: 'var(--rubric)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.22em',
      fontSize: 11,
      color: 'var(--gold)'
    }
  }, u.tagline), /*#__PURE__*/React.createElement("button", {
    onClick: onEnter,
    style: {
      marginTop: 12,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      fontSize: 13,
      padding: '11px 26px',
      background: 'var(--ink)',
      color: 'var(--paper)',
      border: '1px solid var(--ink)',
      borderRadius: 0,
      cursor: 'pointer'
    }
  }, u.enter))));
}
function Desktop() {
  const [booted, setBooted] = React.useState(() => {
    try {
      return localStorage.getItem('av_booted') === '1';
    } catch (e) {
      return false;
    }
  });
  const [wins, setWins] = React.useState([{
    id: 'tese',
    x: 250,
    y: 92,
    z: 2,
    min: false
  }, {
    id: 'justitia',
    x: 760,
    y: 150,
    z: 1,
    min: false
  }]);
  const [zTop, setZTop] = React.useState(3);
  const [sel, setSel] = React.useState(null);
  const drag = React.useRef(null);
  const isMobile = useIsMobile();
  const [lang, setLang] = React.useState(() => {
    try {
      const s = localStorage.getItem('av_lang');
      return s === 'pt' || s === 'en' ? s : 'pt';
    } catch (e) {
      return 'pt';
    }
  });
  const setLangP = l => {
    setLang(l);
    try {
      localStorage.setItem('av_lang', l);
    } catch (e) {}
  };
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const enter = () => {
    setBooted(true);
    try {
      localStorage.setItem('av_booted', '1');
    } catch (e) {}
  };
  const focus = id => setWins(ws => {
    const z = zTop;
    setZTop(p => p + 1);
    return ws.map(w => w.id === id ? {
      ...w,
      z,
      min: false
    } : w);
  });
  const open = id => {
    if (id === 'conceitos') {
      window.location.href = 'conceitos.html';
      return;
    }
    if (id === 'quotes') {
      window.location.href = 'quotes/';
      return;
    }
    setSel(id);
    setWins(ws => {
      const z = zTop;
      setZTop(p => p + 1);
      if (ws.some(w => w.id === id)) return ws.map(w => w.id === id ? {
        ...w,
        z,
        min: false
      } : w);
      const n = ws.filter(w => !w.min).length;
      const x = Math.min(160 + n * 32, Math.max(12, window.innerWidth - winW(id) - 16));
      return [...ws, {
        id,
        x,
        y: 78 + n * 28,
        z,
        min: false
      }];
    });
  };
  const close = id => setWins(ws => ws.filter(w => w.id !== id));
  const minimize = id => setWins(ws => ws.map(w => w.id === id ? {
    ...w,
    min: true
  } : w));
  const dragStart = (e, id) => {
    focus(id);
    const w = wins.find(x => x.id === id);
    drag.current = {
      id,
      dx: e.clientX - w.x,
      dy: e.clientY - w.y
    };
  };
  React.useEffect(() => {
    const move = e => {
      if (!drag.current) return;
      const {
        id,
        dx,
        dy
      } = drag.current;
      setWins(ws => ws.map(w => w.id === id ? {
        ...w,
        x: Math.max(0, Math.min(e.clientX - dx, window.innerWidth - 60)),
        y: Math.max(34, Math.min(e.clientY - dy, window.innerHeight - 60))
      } : w));
    };
    const up = () => {
      drag.current = null;
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);
  const visible = wins.filter(w => !w.min);
  const topId = visible.reduce((a, w) => !a || w.z > a.z ? w : a, null)?.id;
  return /*#__PURE__*/React.createElement("div", {
    onPointerDown: () => setSel(null),
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--paper)',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel-justitia.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: '4%',
      bottom: 40,
      height: '80%',
      width: 'auto',
      imageRendering: 'pixelated',
      opacity: 0.15,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 34,
      background: 'var(--paper)',
      borderBottom: '1px solid var(--ink)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 16px',
      zIndex: 9000
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(SealIcon, {
    size: 20
  }), !isMobile && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap'
    }
  }, "ana vanzin")), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 16,
      background: 'var(--rule-hairline)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? 13 : 16,
      overflowX: isMobile ? 'auto' : 'hidden',
      flex: isMobile ? 1 : '0 1 auto',
      minWidth: 0
    }
  }, MENUS.map(id => /*#__PURE__*/React.createElement("button", {
    key: id,
    onPointerDown: e => e.stopPropagation(),
    onClick: () => open(id),
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 13.5,
      color: 'var(--ink)',
      padding: '4px 2px',
      whiteSpace: 'nowrap',
      borderBottom: topId === id ? '1.5px solid var(--rubric)' : '1.5px solid transparent'
    }
  }, MENU_LABEL[lang][id]))), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      border: '1px solid var(--ink)',
      borderRadius: 999,
      overflow: 'hidden'
    }
  }, ['pt', 'en'].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onPointerDown: e => e.stopPropagation(),
    onClick: () => setLangP(l),
    style: {
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.12em',
      padding: '2px 9px',
      lineHeight: 1.6,
      background: lang === l ? 'var(--ink)' : 'var(--paper)',
      color: lang === l ? 'var(--paper)' : 'var(--text-faint)'
    }
  }, l.toUpperCase()))), !isMobile && /*#__PURE__*/React.createElement(Clock, {
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    style: isMobile ? {
      position: 'absolute',
      top: 42,
      left: 0,
      right: 0,
      bottom: 42,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(86px, 1fr))',
      gap: 16,
      padding: '20px 14px 28px',
      zIndex: 1,
      alignContent: 'start'
    } : {
      position: 'absolute',
      top: 50,
      left: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      zIndex: 1
    }
  }, DESK_ICONS.map(({
    id,
    label,
    Icon
  }) => {
    const active = sel === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onPointerDown: e => {
        e.stopPropagation();
        setSel(id);
      },
      onDoubleClick: () => open(id),
      onClick: e => {
        if (isMobile || e.detail === 0) open(id);
      },
      style: {
        background: 'none',
        border: 0,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        width: isMobile ? 'auto' : 84,
        padding: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: isMobile ? {
        width: '100%',
        height: 64,
        background: 'var(--paper-deep)',
        border: '1px solid var(--ink)',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: active ? '2px solid var(--rubric)' : '2px solid transparent',
        outlineOffset: -2
      } : {
        padding: 3,
        outline: active ? '1.5px solid var(--rubric)' : '1.5px solid transparent',
        outlineOffset: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 44
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        lineHeight: 1.2,
        textAlign: 'center',
        background: active ? 'var(--rubric)' : 'transparent',
        color: active ? 'var(--paper)' : 'var(--ink)',
        padding: '1px 5px'
      }
    }, label[lang]));
  })), visible.map(w => /*#__PURE__*/React.createElement(WindowFrame, {
    key: w.id,
    win: w,
    active: topId === w.id,
    onClose: close,
    onMin: minimize,
    onFocus: focus,
    onDragStart: dragStart,
    lang: lang,
    isMobile: isMobile
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 36,
      background: 'var(--ink)',
      color: 'var(--paper)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 12px',
      zIndex: 9000
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.26em',
      fontSize: 11,
      color: 'var(--gold-2)',
      whiteSpace: 'nowrap'
    }
  }, "anavanzin.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 16,
      background: 'rgba(242,234,217,0.25)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      overflow: 'hidden'
    }
  }, wins.map(w => {
    const on = !w.min && topId === w.id;
    return /*#__PURE__*/React.createElement("button", {
      key: w.id,
      onPointerDown: e => e.stopPropagation(),
      onClick: () => w.min ? focus(w.id) : topId === w.id ? minimize(w.id) : focus(w.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: on ? 'var(--paper)' : 'transparent',
        color: on ? 'var(--ink)' : 'var(--paper)',
        border: '1px solid ' + (on ? 'var(--paper)' : 'rgba(242,234,217,0.35)'),
        borderRadius: 0,
        padding: '3px 10px',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 12.5,
        whiteSpace: 'nowrap',
        opacity: w.min ? 0.6 : 1
      }
    }, regTitle(w.id, lang));
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 11,
      color: 'rgba(242,234,217,0.5)',
      whiteSpace: 'nowrap'
    }
  }, UI[lang][isMobile ? 'dockHintM' : 'dockHint'])), !booted && /*#__PURE__*/React.createElement(Boot, {
    onEnter: enter,
    lang: lang
  }));
}
window.Desktop = Desktop;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/desktop/Desktop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/desktop/WindowContents.jsx
try { (() => {
/* Window contents for the ana vanzin desktop. Compose brand components.
   Bilingual: each component takes { lang } ('pt' | 'en'). */
const _DS = window.AnaVanzinDesignSystem_b45a86;
const {
  Eyebrow,
  RubricLink,
  PublicationEntry,
  FootnoteRef,
  Footnotes
} = _DS;
const L = (lang, pt, en) => lang === 'en' ? en : pt;
const win_h2 = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 26,
  lineHeight: 1.1,
  margin: 0
};
const win_lead = {
  fontSize: 16,
  lineHeight: 1.6,
  margin: 0,
  maxWidth: '60ch'
};
const win_p = {
  fontSize: 15,
  lineHeight: 1.62,
  margin: 0,
  color: 'var(--text-muted)',
  maxWidth: '60ch'
};
const stack = g => ({
  display: 'flex',
  flexDirection: 'column',
  gap: g
});
function WSobre({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(16)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, L(lang, 'Sobre', 'About')), /*#__PURE__*/React.createElement("h2", {
    style: win_h2
  }, "ana vanzin"), /*#__PURE__*/React.createElement("p", {
    style: win_lead
  }, L(lang, 'Advogada e historiadora do direito. Doutoranda no PPGD/UFSC, com pesquisa em história e iconografia jurídica.', 'Lawyer and legal historian. PhD candidate at PPGD/UFSC, researching legal history and iconography.')), /*#__PURE__*/React.createElement("p", {
    style: win_p
  }, L(lang, /*#__PURE__*/React.createElement(React.Fragment, null, "A tese ", /*#__PURE__*/React.createElement("em", null, "Iconocracia"), " estuda as alegorias femininas do direito \u2014 Justitia, a Rep\xFAblica-como-mulher \u2014 entre o incun\xE1bulo e o constitucionalismo moderno."), /*#__PURE__*/React.createElement(React.Fragment, null, "The thesis ", /*#__PURE__*/React.createElement("em", null, "Iconocracy"), " studies the female allegories of law \u2014 Justitia, the Republic-as-woman \u2014 between the incunabulum and modern constitutionalism."))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--rule-hairline)',
      paddingTop: 14,
      ...stack(6)
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "ink",
    style: {
      fontSize: 11
    }
  }, L(lang, 'Atuação', 'Focus')), /*#__PURE__*/React.createElement("p", {
    style: {
      ...win_p,
      margin: 0
    }
  }, L(lang, 'Direito público · história constitucional · patrimônio cultural', 'Public law · constitutional history · cultural heritage'))));
}
function WTese({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(16)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, L(lang, 'Tese · Iconocracia', 'Thesis · Iconocracy')), /*#__PURE__*/React.createElement("h2", {
    style: win_h2
  }, L(lang, 'A venda como sátira', 'The blindfold as satire')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 116px',
      gap: 22,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: stack(12)
  }, /*#__PURE__*/React.createElement("p", {
    style: win_lead
  }, L(lang, /*#__PURE__*/React.createElement(React.Fragment, null, "A primeira Justitia vendada n\xE3o nasceu como virtude \u2014 nasceu como s\xE1tira, na xilogravura de 1494 do ", /*#__PURE__*/React.createElement("em", null, "Narrenschiff"), /*#__PURE__*/React.createElement(FootnoteRef, {
    n: 1
  }), "."), /*#__PURE__*/React.createElement(React.Fragment, null, "The first blindfolded Justitia was not born as a virtue \u2014 it was born as satire, in the 1494 woodcut of the ", /*#__PURE__*/React.createElement("em", null, "Narrenschiff"), /*#__PURE__*/React.createElement(FootnoteRef, {
    n: 1
  }), "."))), /*#__PURE__*/React.createElement("p", {
    style: win_p
  }, L(lang, 'Investiga-se como a venda, o gume e a balança foram lidos, satirizados e normalizados na cultura jurídica europeia.', 'It investigates how the blindfold, the blade and the scales were read, satirised and normalised in European legal culture.')), /*#__PURE__*/React.createElement(Footnotes, {
    notes: ["Brant, Sebastian. Das Narrenschiff. Basel, 1494, fol. 22v."],
    style: {
      marginTop: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--ink)',
      background: 'var(--paper-deep)',
      padding: 6,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel-justitia.png",
    alt: "",
    style: {
      width: '100%',
      imageRendering: 'pixelated'
    }
  }))));
}
function WPublicacoes({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(8)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, L(lang, 'Publicações', 'Publications')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PublicationEntry, {
    year: "2025",
    title: "A venda de Justitia: s\xE1tira e virtude no Narrenschiff",
    href: "#",
    meta: "Revista Sequ\xEAncia, n. 96, p. 1\u201328."
  }), /*#__PURE__*/React.createElement(PublicationEntry, {
    year: "2024",
    title: "A Rep\xFAblica como mulher: alegoria e constitui\xE7\xE3o",
    href: "#",
    meta: "Direito e Pr\xE1xis, v. 15, n. 2."
  }), /*#__PURE__*/React.createElement(PublicationEntry, {
    year: "2023",
    title: "Iconografia jur\xEDdica: um programa de pesquisa",
    meta: L(lang, 'Capítulo, Ed. UFSC.', 'Chapter, UFSC Press.'),
    note: L(lang, 'no prelo', 'in press')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement(RubricLink, {
    href: "#",
    external: true
  }, L(lang, 'Currículo Lattes', 'Lattes CV'))));
}
function WIus({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(16)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Ius Gentium"), /*#__PURE__*/React.createElement("h2", {
    style: win_h2
  }, L(lang, 'Grupo de pesquisa', 'Research group')), /*#__PURE__*/React.createElement("p", {
    style: win_lead
  }, L(lang, 'História da cultura jurídica, PPGD/UFSC. Linha: iconografia e iconologia do direito.', 'Legal-culture history, PPGD/UFSC. Strand: iconography and iconology of law.')), /*#__PURE__*/React.createElement("p", {
    style: win_p
  }, L(lang, 'Encontros quinzenais, abertos a graduação e pós-graduação.', 'Fortnightly meetings, open to undergraduate and graduate students.')), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(RubricLink, {
    href: "#",
    external: true
  }, L(lang, 'Diretório CNPq', 'CNPq Directory'))));
}
function WContato({
  lang
}) {
  const [sent, setSent] = React.useState(false);
  const input = {
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    color: 'var(--ink)',
    background: 'var(--paper)',
    border: '1px solid var(--ink-50)',
    borderRadius: 0,
    padding: '8px 10px',
    outlineColor: 'var(--rubric)',
    width: '100%',
    boxSizing: 'border-box'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: stack(16)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, L(lang, 'Contato', 'Contact')), /*#__PURE__*/React.createElement("p", {
    style: win_lead
  }, /*#__PURE__*/React.createElement(RubricLink, {
    href: "mailto:ana@anavanzin.com"
  }, "ana@anavanzin.com")), sent ? /*#__PURE__*/React.createElement("p", {
    style: {
      ...win_p,
      borderTop: '1px solid var(--rule-hairline)',
      paddingTop: 14
    }
  }, L(lang, 'Mensagem registrada. Resposta em até cinco dias úteis.', 'Message received. Reply within five business days.')) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      ...stack(12),
      maxWidth: 340
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: stack(6)
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "ink",
    style: {
      fontSize: 11
    }
  }, L(lang, 'Nome', 'Name')), /*#__PURE__*/React.createElement("input", {
    required: true,
    style: input
  })), /*#__PURE__*/React.createElement("label", {
    style: stack(6)
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "ink",
    style: {
      fontSize: 11
    }
  }, L(lang, 'Mensagem', 'Message')), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    rows: "3",
    style: {
      ...input,
      resize: 'vertical'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      fontSize: 13,
      padding: '9px 20px',
      background: 'var(--ink)',
      color: 'var(--paper)',
      border: '1px solid var(--ink)',
      borderRadius: 0,
      cursor: 'pointer'
    }
  }, L(lang, 'Enviar', 'Send')))));
}
function WCv({
  lang
}) {
  const rows = L(lang, [['2023–', 'Doutorado em Direito', 'PPGD/UFSC · história e iconografia jurídica'], ['2021', 'Mestrado em Direito', 'PPGD/UFSC · cultura jurídica'], ['2018', 'Graduação em Direito', 'UFSC'], ['2019', 'Inscrição na OAB', 'OAB/SC']], [['2023–', 'PhD in Law', 'PPGD/UFSC · legal history & iconography'], ['2021', 'Master in Law', 'PPGD/UFSC · legal culture'], ['2018', 'LL.B. in Law', 'UFSC'], ['2019', 'Bar admission (OAB)', 'OAB/SC']]);
  return /*#__PURE__*/React.createElement("div", {
    style: stack(14)
  }, /*#__PURE__*/React.createElement(Eyebrow, null, L(lang, 'Currículo', 'Curriculum')), /*#__PURE__*/React.createElement("div", null, rows.map(([y, t, m], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '72px 1fr',
      gap: 18,
      padding: '12px 0',
      borderTop: '1px solid var(--rule-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 18,
      color: 'var(--text-faint)'
    }
  }, y), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 1.15
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, m))))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement(RubricLink, {
    href: "#",
    external: true
  }, L(lang, 'Currículo Lattes', 'Lattes CV'))));
}
function WJustitia({
  lang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: stack(0)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink)',
      padding: 12,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/pixel-justitia-sky.png",
    alt: "Justitia, pixel art",
    style: {
      maxWidth: '100%',
      maxHeight: 420,
      imageRendering: 'pixelated',
      border: '1px solid var(--gold-2)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid var(--rule-hairline)',
      paddingTop: 10,
      marginTop: 10,
      fontSize: 12,
      color: 'var(--text-faint)',
      letterSpacing: '0.04em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "justitia.png"), /*#__PURE__*/React.createElement("span", null, "1086 \xD7 1448 \xB7 16-bit")));
}
Object.assign(window, {
  WSobre,
  WTese,
  WPublicacoes,
  WIus,
  WContato,
  WJustitia,
  WCv
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/desktop/WindowContents.jsx", error: String((e && e.message) || e) }); }

// ui_kits/desktop/icons.jsx
try { (() => {
/* Retro desktop icons for the ana vanzin OS — crisp, pixel-leaning, brand palette.
   Exposed on window for sibling babel scripts. */

const _crisp = {
  shapeRendering: 'crispEdges'
};
function FolderIcon({
  size = 46
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "11",
    width: "22",
    height: "8",
    fill: "var(--gold)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "16",
    width: "40",
    height: "26",
    fill: "var(--gold-2)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "16",
    width: "40",
    height: "6",
    fill: "var(--gold)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "22",
    x2: "44",
    y2: "22",
    stroke: "var(--ink)",
    strokeWidth: "1.2"
  }));
}
function DocIcon({
  size = 46
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 4 H32 L39 11 V44 H11 Z",
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M32 4 V11 H39 Z",
    fill: "var(--paper-deep)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "20",
    x2: "34",
    y2: "20",
    stroke: "var(--rubric)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "26",
    x2: "34",
    y2: "26",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "31",
    x2: "34",
    y2: "31",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "36",
    x2: "28",
    y2: "36",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }));
}
function MailIcon({
  size = 46
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "12",
    width: "38",
    height: "26",
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 13 L24 28 L43 13",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 37 L19 24 M43 37 L29 24",
    fill: "none",
    stroke: "var(--ink-50)",
    strokeWidth: "1.2"
  }));
}
function GroupIcon({
  size = 46
}) {
  /* Ius Gentium — a stacked-rings device echoing the seal */
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "18",
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "13",
    fill: "none",
    stroke: "var(--gold)",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "22",
    r: "5",
    fill: "var(--rubric)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "29",
    cy: "22",
    r: "5",
    fill: "var(--ink)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 34 q6 -8 13 -8 q7 0 13 8",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "1.4"
  }));
}
function ImageIcon({
  size = 46,
  src = '../../assets/pixel-justitia.png'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      background: 'var(--paper)',
      border: '1.6px solid var(--ink)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      height: '112%',
      width: 'auto',
      imageRendering: 'pixelated',
      marginBottom: '-4%'
    }
  }));
}
function SealIcon({
  size = 46,
  src = '../../assets/sun-seal.svg'
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    width: size,
    height: size,
    style: {
      display: 'block'
    }
  });
}
function QuoteIcon({
  size = 46
}) {
  /* Citações — open quotation marks over a citation rule */
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    style: _crisp,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "8",
    width: "36",
    height: "32",
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "8",
    width: "36",
    height: "6",
    fill: "var(--gold)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "14",
    x2: "42",
    y2: "14",
    stroke: "var(--ink)",
    strokeWidth: "1.1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 20 h6 v7 h-3 l-3 4 z",
    fill: "var(--rubric)",
    stroke: "var(--ink)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 20 h6 v7 h-3 l-3 4 z",
    fill: "var(--rubric)",
    stroke: "var(--ink)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "13",
    y1: "35",
    x2: "35",
    y2: "35",
    stroke: "var(--ink-50)",
    strokeWidth: "1.4"
  }));
}
function CloseBox({
  active
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 13,
      height: 13,
      border: '1.5px solid var(--ink)',
      background: 'var(--paper)',
      display: 'inline-block',
      boxSizing: 'border-box',
      opacity: active ? 1 : 0.4
    }
  });
}
Object.assign(window, {
  FolderIcon,
  DocIcon,
  MailIcon,
  GroupIcon,
  ImageIcon,
  SealIcon,
  QuoteIcon,
  CloseBox
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/desktop/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ScreensContent.jsx
try { (() => {
const DSC = window.AnaVanzinDesignSystem_b45a86;
const {
  SectionRule,
  PublicationEntry,
  Eyebrow,
  RubricLink,
  Button
} = DSC;
function PagePublicacoes() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: 'var(--space-7) 0 var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(SectionRule, {
    eyebrow: "Publica\xE7\xF5es",
    title: "Publica\xE7\xF5es",
    lang: "Publications"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PublicationEntry, {
    year: "2025",
    title: "A venda de Justitia: s\xE1tira e virtude no Narrenschiff",
    href: "#",
    meta: "Revista Sequ\xEAncia, n. 96, p. 1\u201328."
  }), /*#__PURE__*/React.createElement(PublicationEntry, {
    year: "2024",
    title: "A Rep\xFAblica como mulher: alegoria e constitui\xE7\xE3o",
    href: "#",
    meta: "Revista Direito e Pr\xE1xis, v. 15, n. 2."
  }), /*#__PURE__*/React.createElement(PublicationEntry, {
    year: "2023",
    title: "Iconografia jur\xEDdica: um programa de pesquisa",
    meta: "Cap\xEDtulo em obra coletiva, Ed. UFSC.",
    note: "no prelo"
  })), /*#__PURE__*/React.createElement(RubricLink, {
    href: "#",
    external: true
  }, "Curr\xEDculo Lattes"));
}
function PageIusGentium() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: 'var(--space-7) 0 var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(SectionRule, {
    eyebrow: "Ius Gentium",
    title: "Grupo de pesquisa",
    lang: "Research group"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 'var(--measure)',
      fontSize: 'var(--text-lead)',
      lineHeight: 1.55
    }
  }, "Ius Gentium \u2014 grupo de pesquisa em hist\xF3ria da cultura jur\xEDdica, PPGD/UFSC."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 'var(--measure)',
      color: 'var(--text-muted)'
    }
  }, "Linha de pesquisa: iconografia e iconologia do direito. Encontros quinzenais, abertos a estudantes de gradua\xE7\xE3o e p\xF3s-gradua\xE7\xE3o."), /*#__PURE__*/React.createElement(RubricLink, {
    href: "#",
    external: true
  }, "Diret\xF3rio CNPq"));
}
function PageAdvocacia() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: 'var(--space-7) 0 var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(SectionRule, {
    eyebrow: "Advocacia",
    title: "Pr\xE1tica jur\xEDdica",
    lang: "Legal practice"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 'var(--measure)',
      fontSize: 'var(--text-lead)',
      lineHeight: 1.55
    }
  }, "Consultoria e pareceres em direito p\xFAblico, com \xEAnfase em hist\xF3ria constitucional e fundamenta\xE7\xE3o hist\xF3rica de teses."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      borderTop: '1px solid var(--rule-hairline)',
      paddingTop: 'var(--space-4)',
      maxWidth: 'var(--measure)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "ink",
    style: {
      fontSize: 12
    }
  }, "Atua\xE7\xE3o"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-muted)'
    }
  }, "Pareceres hist\xF3ricos-jur\xEDdicos \xB7 consultoria em patrim\xF4nio cultural \xB7 direito administrativo")));
}
function PageContato({
  onSend,
  sent
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: 'var(--space-7) 0 var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(SectionRule, {
    eyebrow: "Contato",
    title: "Contato",
    lang: "Contact"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 'var(--measure)'
    }
  }, /*#__PURE__*/React.createElement(RubricLink, {
    href: "mailto:ana@anavanzin.com"
  }, "ana@anavanzin.com")), sent ? /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 'var(--measure)',
      color: 'var(--text-muted)',
      borderTop: '1px solid var(--rule-hairline)',
      paddingTop: 'var(--space-4)'
    }
  }, "Mensagem registrada. Resposta em at\xE9 cinco dias \xFAteis.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSend();
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      maxWidth: '48ch'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "ink",
    style: {
      fontSize: 11
    }
  }, "Nome"), /*#__PURE__*/React.createElement("input", {
    required: true,
    style: inputStyleAv
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "ink",
    style: {
      fontSize: 11
    }
  }, "Mensagem"), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    rows: "4",
    style: {
      ...inputStyleAv,
      resize: 'vertical'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    type: "submit"
  }, "Enviar"))));
}
const inputStyleAv = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-base)',
  color: 'var(--ink)',
  background: 'transparent',
  border: '1px solid var(--ink-50)',
  borderRadius: 0,
  padding: '10px 12px',
  outlineColor: 'var(--rubric)'
};
Object.assign(window, {
  PagePublicacoes,
  PageIusGentium,
  PageAdvocacia,
  PageContato
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ScreensContent.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ScreensHome.jsx
try { (() => {
const DS = window.AnaVanzinDesignSystem_b45a86;
const {
  BlindfoldHero,
  SectionRule,
  Eyebrow,
  RubricLink,
  Button,
  FootnoteRef,
  Footnotes
} = DS;
function PageHome({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(BlindfoldHero, {
    subtitle: "advogada \xB7 historiadora do direito",
    lede: "Doutoranda no PPGD/UFSC. A tese Iconocracia estuda as alegorias femininas do direito \u2014 Justitia, a Rep\xFAblica-como-mulher \u2014 na hist\xF3ria e na iconografia jur\xEDdica."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      alignItems: 'center',
      paddingBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => go('tese')
  }, "A tese"), /*#__PURE__*/React.createElement(RubricLink, {
    href: "#publicacoes",
    onClick: e => {
      e.preventDefault();
      go('publicacoes');
    }
  }, "Publica\xE7\xF5es")));
}
function PageTese() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: 'var(--space-7) 0 var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SectionRule, {
    eyebrow: "Tese",
    title: "Iconocracia",
    lang: "Doctoral thesis"
  }), /*#__PURE__*/React.createElement("div", {
    className: "av-aside-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 120px',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      maxWidth: 'var(--measure)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lead)',
      lineHeight: 1.55
    }
  }, "A primeira Justitia vendada n\xE3o nasceu como virtude \u2014 nasceu como s\xE1tira, na xilogravura de 1494 do ", /*#__PURE__*/React.createElement("em", null, "Narrenschiff"), " em que um bobo cobre os olhos da Justi\xE7a", /*#__PURE__*/React.createElement(FootnoteRef, {
    n: 1
  }), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "A tese investiga como as alegorias femininas do direito \u2014 Justitia, a Rep\xFAblica-como-mulher \u2014 foram constru\xEDdas, satirizadas e normalizadas entre o incun\xE1bulo e o constitucionalismo moderno."), /*#__PURE__*/React.createElement(Footnotes, {
    notes: ["Brant, Sebastian. Das Narrenschiff. Basel, 1494, fol. 22v."],
    style: {
      marginTop: 'var(--space-4)'
    }
  })), /*#__PURE__*/React.createElement("aside", {
    style: {
      borderLeft: '1px solid var(--rule-hairline)',
      paddingLeft: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/justitia-mark.svg",
    alt: "",
    width: "72"
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    color: "muted",
    style: {
      fontSize: 11
    }
  }, "Programa"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-small)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "PPGD/UFSC"))));
}
Object.assign(window, {
  PageHome,
  PageTese
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ScreensHome.jsx", error: String((e && e.message) || e) }); }

// uploads/app.js
try { (() => {
/* ============================================
   ICONOCRATIC ATLAS — Application Logic
   ============================================ */

(function () {
  "use strict";

  // ─── DATA ─────────────────────────────────────
  var panelData = [{
    number: "Painel I",
    title: "Mães Fundacionais",
    desc: "Constelação dedicada ao regime fundacional-sacrificial, onde a alegoria feminina é convocada como mãe da nação: parindo, amamentando ou sangrando pela pátria. Marianne sobre as barricadas, a República brasileira oferecendo o seio ao povo — imagens que fundem maternidade e soberania, naturalizando o sacrifício feminino como ato fundador.",
    indicators: "FEI alto (2–3), MVI alto (2–3). Corporalidade e vulnerabilidade maternal são os traços dominantes.",
    chapters: "Capítulo 2 (Regime Fundacional), Capítulo 5 (Maternidade e Sangue)"
  }, {
    number: "Painel II",
    title: "Justiça como Templo",
    desc: "A alegoria feminina é desencarnada e transformada em arquitetura: Justitia nos frontões de tribunais, nos tímpanos de palácios de justiça, nos vitrais de assembleias. O corpo feminino torna-se suporte material do edifício jurídico, perdendo carnalidade em favor de gravidade institucional.",
    indicators: "FEI baixo (0–1), CII alto (2–3), SMI alto (2–3). Classicismo e materialidade simbólica dominam.",
    chapters: "Capítulo 3 (Regime Normativo-Jurídico), Capítulo 6 (Suporte Forense)"
  }, {
    number: "Painel III",
    title: "Corpos em Armas",
    desc: "Quando a alegoria feminina empunha armas: Britannia com seu tridente e escudo, Columbia com sua espada, Germania com seu gládio. O corpo feminino é militarizado para legitimar a expansão imperial e a defesa nacional — uma feminização paradoxal da violência estatal.",
    indicators: "AMCP alto (2–3), WI alto (2–3). Armamento e branquitude convergem no ideal marcial.",
    chapters: "Capítulo 4 (Regime Militar-Imperial), Capítulo 7 (Crise Bélica)"
  }, {
    number: "Painel IV",
    title: "República Branca",
    desc: "A racialização como dispositivo visual do regime iconocrático. O ideal clássico greco-romano opera como vetor de branquitude: pele de mármore, feições europeias, drapeado neoclássico. Em países mestiços como o Brasil, a alegoria republicana é sistematicamente embranquecida.",
    indicators: "CII alto (2–3), WI alto (2–3), RI=1. O clássico é o racial.",
    chapters: "Capítulo 4 (Racialização), Capítulo 8 (Ideal Clássico como Vetor Racial)"
  }, {
    number: "Painel V",
    title: "Ubiquidade Íntima",
    desc: "A alegoria feminina nos objetos do cotidiano: moedas que passam de mão em mão, selos que selam correspondências, cédulas que circulam nos bolsos. A ubiquidade íntima do regime normativo — a imagem alegórica penetra o espaço privado sem ser percebida como dispositivo de poder.",
    indicators: "Todos os suportes = moeda/selo. Regime normativo em circulação material íntima.",
    chapters: "Capítulo 3 (Circulação Íntima), Capítulo 6 (Suporte Numismático)"
  }, {
    number: "Painel VI",
    title: "Damas de Ferro",
    desc: "A fronteira entre alegoria e biografia: quando mulheres reais são alegoricizadas (Marianne como Brigitte Bardot, Britannia como Boadiceia) ou quando alegorias ganham biografias (a Justitia que 'vê' ou 'não vê'). O índice Alegoria-Biografia marca essa dissolução de fronteiras.",
    indicators: "AI alto (2–3). A fusão entre corpo real e corpo simbólico é o traço definidor.",
    chapters: "Capítulo 9 (Fronteira Alegoria-Biografia), Capítulo 10 (Personificação Política)"
  }, {
    number: "Painel VII",
    title: "Justiça Contestada",
    desc: "Quando a alegoria é destruída, vandalizada, parodiada ou subvertida: estátuas de Justitia derrubadas, Marianne pichada, Columbia reimaginada como indígena. A contestação pública do regime iconocrático revela sua fragilidade e os limites do poder simbólico.",
    indicators: "Índices 'quebrados': baixo SMI, baixo CII, contestação material dos atributos tradicionais.",
    chapters: "Capítulo 11 (Contestação Visual), Capítulo 12 (Destruição Iconoclasta)"
  }, {
    number: "Painel VIII",
    title: "Transatlântico",
    desc: "As travessias: como as alegorias migram entre continentes, transformando-se na passagem. A Marianne francesa que se torna a República brasileira, a Britannia que inspira Columbia, as Justitias que se multiplicam nos tribunais do mundo. O Nachleben warburguiano — a sobrevivência das formas — em escala atlântica.",
    indicators: "Misto: todos os países, todos os regimes. A ênfase está na migração e transformação.",
    chapters: "Capítulo 13 (Nachleben Atlântico), Capítulo 14 (Síntese Comparativa)"
  }];
  var indicatorData = [{
    code: "FEI",
    name: "Feminine Embodiment Index",
    scale: "0–3",
    definition: "Mede o grau de corporalidade feminina na imagem: de abstração completa (0) a sensualização explícita (3). Captura como o corpo feminino é mobilizado — ou ocultado — pelo regime iconocrático.",
    levels: ["0 = Sem corpo visível", "1 = Corpo coberto/abstrato", "2 = Corpo parcialmente revelado", "3 = Corpo sensualizado"],
    panels: "Painéis I, V, VI"
  }, {
    code: "CII",
    name: "Classical Ideal Index",
    scale: "0–3",
    definition: "Avalia a aderência ao ideal clássico greco-romano: drapeado, postura contrapposto, atributos mitológicos, feições europeizadas. O classicismo como gramática visual do poder ocidental.",
    levels: ["0 = Nenhum elemento clássico", "1 = Referência leve", "2 = Predominantemente clássico", "3 = Integralmente clássico"],
    panels: "Painéis II, IV, VIII"
  }, {
    code: "PRI",
    name: "Posture & Realm Index",
    scale: "serena / militante / sacrificial",
    definition: "Classifica a postura corporal e o domínio simbólico da alegoria: serena (regime normativo), militante (regime militar), sacrificial (regime fundacional).",
    levels: ["Serena = Postura estática, contemplativa", "Militante = Postura ativa, combativa", "Sacrificial = Postura de entrega, sofrimento"],
    panels: "Painéis I, III, VII"
  }, {
    code: "SMI",
    name: "Symbolic Material Index",
    scale: "0–3",
    definition: "Quantifica a presença e densidade de atributos simbólicos tradicionais: balança, espada, coroa de louros, barrete frígio, toga, livro da lei.",
    levels: ["0 = Sem atributos", "1 = Um atributo", "2 = Dois ou três atributos", "3 = Saturação simbólica (4+)"],
    panels: "Painéis II, V, VII"
  }, {
    code: "SMS",
    name: "Symbolic Meaning Score",
    scale: "serena / militante / sacrificial",
    definition: "Avalia a carga semântica dos atributos simbólicos presentes: se remetem à ordem jurídica (serena), à força militar (militante) ou ao sacrifício fundacional (sacrificial).",
    levels: ["Serena = Balança, livro, toga", "Militante = Espada, escudo, tridente", "Sacrificial = Sangue, seio, correntes"],
    panels: "Painéis I, II, III"
  }, {
    code: "AMCP",
    name: "Armament & Crisis Profile",
    scale: "0–3",
    definition: "Mede o grau de militarização da imagem: presença de armas, armaduras, cenários bélicos, linguagem visual de crise e defesa nacional.",
    levels: ["0 = Sem elementos bélicos", "1 = Referência indireta", "2 = Armas visíveis", "3 = Cenário de guerra"],
    panels: "Painéis III, VII"
  }, {
    code: "MVI",
    name: "Maternal-Vulnerability Index",
    scale: "0–3",
    definition: "Captura a presença de maternidade, vulnerabilidade corporal e sacrifício na representação alegórica. O seio exposto, a criança ao colo, o sangue derramado.",
    levels: ["0 = Sem vulnerabilidade", "1 = Leve sugestão maternal", "2 = Maternidade explícita", "3 = Sacrifício/sofrimento maternal"],
    panels: "Painéis I, VI"
  }, {
    code: "WI",
    name: "Whiteness Index",
    scale: "0–3",
    definition: "Avalia o grau de branquitude da representação: cor da pele, feições, tipo de cabelo, conformidade com o ideal estético europeu ocidental.",
    levels: ["0 = Não-branca", "1 = Ambígua/mestiça", "2 = Predominantemente branca", "3 = Branquitude idealizada"],
    panels: "Painéis III, IV, VIII"
  }, {
    code: "RI",
    name: "Racial Idealisation",
    scale: "0 / 1",
    definition: "Variável binária: a imagem apresenta idealização racial explícita? RI=1 quando a alegoria é deliberadamente embranquecida em contexto nacional multirracial.",
    levels: ["0 = Sem idealização racial", "1 = Idealização racial presente"],
    panels: "Painel IV"
  }, {
    code: "AI",
    name: "Allegory-Biography Index",
    scale: "0–3",
    definition: "Mede a dissolução da fronteira entre alegoria e pessoa real: de separação completa (0) a fusão total (3), quando uma mulher real se torna indistinguível da alegoria nacional.",
    levels: ["0 = Alegoria pura", "1 = Referência biográfica leve", "2 = Mescla evidente", "3 = Fusão total alegoria-pessoa"],
    panels: "Painéis VI, VIII"
  }];

  // ─── NAVIGATION ───────────────────────────────

  var nav = document.querySelector(".nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var allNavLinks = document.querySelectorAll(".nav__link");

  // Sticky nav shadow
  function handleScroll() {
    if (window.scrollY > 10) {
      nav.classList.add("nav--scrolled");
    } else {
      nav.classList.remove("nav--scrolled");
    }
    updateActiveLink();
  }
  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close mobile menu on link click
  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Active nav link based on scroll
  function updateActiveLink() {
    var sections = document.querySelectorAll("section[id]");
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        allNavLinks.forEach(function (link) {
          link.classList.remove("nav__link--active");
          if (link.getAttribute("data-section") === id) {
            link.classList.add("nav__link--active");
          }
        });
      }
    });
  }

  // ─── THEME TOGGLE ─────────────────────────────

  var themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", function () {
    var html = document.documentElement;
    var current = html.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
  });

  // ─── PANEL MODALS ─────────────────────────────

  var panelCards = document.querySelectorAll(".panel-card");
  var modalBackdrop = document.getElementById("panelModal");
  var modalNumber = document.getElementById("modalNumber");
  var modalTitle = document.getElementById("modalTitle");
  var modalDesc = document.getElementById("modalDesc");
  var modalIndicators = document.getElementById("modalIndicators");
  var modalChapters = document.getElementById("modalChapters");
  var warburgGrid = document.getElementById("warburgGrid");
  var modalCloseBtn = modalBackdrop.querySelector(".modal__close");

  // Pre-fill warburg grid with 12 slots
  var imagePlaceholderSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="warburg-grid__slot-inner"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>';
  function buildWarburgSlots() {
    warburgGrid.innerHTML = "";
    for (var i = 0; i < 12; i++) {
      var slot = document.createElement("div");
      slot.className = "warburg-grid__slot";
      slot.innerHTML = imagePlaceholderSVG;
      warburgGrid.appendChild(slot);
    }
  }
  function openPanel(index) {
    var data = panelData[index];
    if (!data) return;
    modalNumber.textContent = data.number;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalIndicators.textContent = data.indicators;
    modalChapters.textContent = data.chapters;
    buildWarburgSlots();
    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalCloseBtn.focus();
  }
  function closePanel() {
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  panelCards.forEach(function (card) {
    card.addEventListener("click", function () {
      var index = parseInt(card.getAttribute("data-panel"), 10);
      openPanel(index);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var index = parseInt(card.getAttribute("data-panel"), 10);
        openPanel(index);
      }
    });
  });
  modalCloseBtn.addEventListener("click", closePanel);
  modalBackdrop.addEventListener("click", function (e) {
    if (e.target === modalBackdrop) {
      closePanel();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) {
      closePanel();
    }
  });

  // ─── INDICATOR CARDS ──────────────────────────

  var indicatorsGrid = document.getElementById("indicatorsGrid");
  function buildIndicatorCards() {
    indicatorData.forEach(function (ind) {
      var card = document.createElement("div");
      card.className = "indicator-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-expanded", "false");
      var levelsHTML = ind.levels.map(function (l) {
        var parts = l.split(" = ");
        return '<span class="indicator-card__level"><strong>' + parts[0] + '</strong> = ' + (parts[1] || '') + '</span>';
      }).join("");
      card.innerHTML = '<div class="indicator-card__header">' + '<span class="indicator-card__code">' + ind.code + '</span>' + '<span class="indicator-card__name">' + ind.name + '</span>' + '<span class="indicator-card__scale">' + ind.scale + '</span>' + '<svg class="indicator-card__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' + '</div>' + '<div class="indicator-card__body">' + '<p class="indicator-card__definition">' + ind.definition + '</p>' + '<div class="indicator-card__levels">' + levelsHTML + '</div>' + '<p class="indicator-card__panels">Painéis relacionados: <span>' + ind.panels + '</span></p>' + '</div>';
      card.addEventListener("click", function () {
        toggleIndicator(card);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleIndicator(card);
        }
      });
      indicatorsGrid.appendChild(card);
    });
  }
  function toggleIndicator(card) {
    var isExpanded = card.classList.contains("is-expanded");
    // Close all others
    document.querySelectorAll(".indicator-card.is-expanded").forEach(function (c) {
      c.classList.remove("is-expanded");
      c.setAttribute("aria-expanded", "false");
    });
    if (!isExpanded) {
      card.classList.add("is-expanded");
      card.setAttribute("aria-expanded", "true");
    }
  }
  buildIndicatorCards();

  // ─── SCROLL REVEAL FALLBACK ───────────────────
  // For browsers without scroll-driven animations support
  if (!CSS.supports("animation-timeline", "scroll()")) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    document.querySelectorAll(".fade-in").forEach(function (el) {
      el.style.opacity = "0";
      observer.observe(el);
    });
  }

  // ─── INITIAL SCROLL CHECK ─────────────────────
  handleScroll();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/app.js", error: String((e && e.message) || e) }); }

__ds_ns.FootnoteRef = __ds_scope.FootnoteRef;

__ds_ns.Footnotes = __ds_scope.Footnotes;

__ds_ns.PublicationEntry = __ds_scope.PublicationEntry;

__ds_ns.SectionRule = __ds_scope.SectionRule;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.RubricLink = __ds_scope.RubricLink;

__ds_ns.DesktopIcon = __ds_scope.DesktopIcon;

__ds_ns.Dock = __ds_scope.Dock;

__ds_ns.Window = __ds_scope.Window;

__ds_ns.BlindfoldHero = __ds_scope.BlindfoldHero;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

})();
