/*IIFE*/(function(){
/* ana vanzin desktop — window manager, menu bar, dock, boot. */
const {
  FolderIcon,
  DocIcon,
  MailIcon,
  GroupIcon,
  ImageIcon,
  SealIcon,
  QuoteIcon,
  AtlasIcon,
  WorksIcon,
  CloseBox
} = window.avapp;
const {
  WSobre,
  WTese,
  WPublicacoes,
  WIus,
  WContato,
  WJustitia,
  WCv,
  WVo
} = window.avapp;
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
  },
  vo: {
    title: {
      pt: 'vó.jpg',
      en: 'grandma.jpg'
    },
    w: 360,
    Body: WVo
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
  id: 'iconocracia',
  label: {
    pt: 'iconocracia',
    en: 'iconocracia'
  },
  Icon: AtlasIcon
}, {
  id: 'quotes',
  label: {
    pt: 'citações',
    en: 'quotes'
  },
  Icon: QuoteIcon
}, {
  id: 'trabalhos',
  label: {
    pt: 'trabalhos',
    en: 'works'
  },
  Icon: WorksIcon
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
  id: 'vo',
  label: {
    pt: 'vó.jpg',
    en: 'grandma.jpg'
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
function mobForced() {
  try {
    return localStorage.getItem('av_forcemob') === '1' || /[?&]mob/.test(location.search);
  } catch (e) {
    return false;
  }
}
function useIsMobile() {
  const [m, setM] = React.useState(() => typeof window !== 'undefined' && (mobForced() || window.matchMedia('(max-width: 760px)').matches));
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const fn = () => setM(mobForced() || mq.matches);
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
    borderTop: '1px solid var(--ink)',
    boxShadow: '0 -6px 0 0 var(--ink)'
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
  }, isMobile && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '7px 0 2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 4,
      background: 'var(--ink-30, rgba(0,0,0,0.25))',
      borderRadius: 2
    }
  })), /*#__PURE__*/React.createElement(TitleBar, {
    title: regTitle(win.id, lang),
    active: active || isMobile,
    onClose: () => onClose(win.id),
    onMin: () => onMin(win.id),
    onDown: e => onDragStart(e, win.id),
    draggable: !isMobile
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: win.id === 'justitia' ? 12 : 22,
      maxHeight: isMobile ? '64vh' : '58vh',
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
    src: "assets/pixel-justitia.png",
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
  const [wins, setWins] = React.useState(() => {
    const mob = typeof window !== 'undefined' && (mobForced() || window.matchMedia('(max-width: 760px)').matches);
    return mob ? [] : [{
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
    }];
  });
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
    if (id === 'sobre') {
      window.location.href = 'readme.html';
      return;
    }
    if (id === 'conceitos') {
      window.location.href = 'conceitos.html';
      return;
    }
    if (id === 'iconocracia') {
      window.location.href = 'iconocracia/';
      return;
    }
    if (id === 'quotes') {
      window.location.href = 'quotes/';
      return;
    }
    if (id === 'trabalhos') {
      window.location.href = 'trabalhos.html';
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
    src: "assets/pixel-justitia.png",
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
        height: 76,
        background: 'var(--paper)',
        border: '1px solid var(--ink)',
        borderRadius: 3,
        boxShadow: active ? '3px 3px 0 0 var(--rubric)' : '2px 2px 0 0 var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: active ? '1.5px solid var(--rubric)' : '1.5px solid transparent',
        outlineOffset: -3,
        transition: 'box-shadow .1s ease'
      } : {
        padding: 3,
        outline: active ? '1.5px solid var(--rubric)' : '1.5px solid transparent',
        outlineOffset: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: isMobile ? 46 : 44
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
  })), isMobile && visible.length > 0 && /*#__PURE__*/React.createElement("div", {
    onPointerDown: e => {
      e.stopPropagation();
      minimize(topId);
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 9400,
      background: 'rgba(28,25,20,0.34)'
    }
  }), visible.map(w => /*#__PURE__*/React.createElement(WindowFrame, {
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
(window.avapp = window.avapp || {}).Desktop = Desktop;
})();