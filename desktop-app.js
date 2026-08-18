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
  CloseBox,
  HourglassIcon
} = window.avapp;
const {
  WSobre,
  WTese,
  WPublicacoes,
  WIus,
  WProjects,
  WAdvisor,
  WContato,
  WJustitia,
  WVo,
  WMae,
  WAmpulheta,
  WPoster
} = window.avapp;
const ADVISOR_SITE_URL = 'https://anavanzin.com/arno-dal-ri-site/';
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
  projetos: {
    title: {
      pt: 'projetos-vivos.app',
      en: 'living-projects.app'
    },
    w: 560,
    Body: WProjects
  },
  orientador: {
    title: {
      pt: 'orientação.txt',
      en: 'supervision.txt'
    },
    w: 470,
    Body: WAdvisor
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
  },
  mae: {
    title: {
      pt: 'mãe.jpg',
      en: 'mom.jpg'
    },
    w: 360,
    Body: WMae
  },
  ampulheta: {
    title: {
      pt: 'ampulheta.app',
      en: 'hourglass.app'
    },
    w: 480,
    Body: WAmpulheta
  },
  poster: {
    title: {
      pt: 'tabula',
      en: 'tabula'
    },
    w: 860,
    h: 640,
    Body: WPoster
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
  id: 'radiografia',
  label: {
    pt: 'radiografia',
    en: 'radiografia'
  },
  Icon: SealIcon
}, {
  id: 'marginalia',
  label: {
    pt: 'marginália',
    en: 'marginalia'
  },
  Icon: DocIcon
}, {
  id: 'atlas',
  label: {
    pt: 'atlas',
    en: 'atlas'
  },
  Icon: AtlasIcon
}, {
  id: 'sala-de-leitura',
  label: {
    pt: 'sala de leitura',
    en: 'reading room'
  },
  Icon: FolderIcon
}, {
  id: 'advocacia',
  label: {
    pt: 'advocacia',
    en: 'practice'
  },
  Icon: WorksIcon
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
  id: 'projetos',
  label: {
    pt: 'projetos.app',
    en: 'projects.app'
  },
  Icon: FolderIcon
}, {
  id: 'orientador',
  label: {
    pt: 'orientador',
    en: 'advisor'
  },
  Icon: DocIcon
}, {
  id: 'curriculo',
  label: {
    pt: 'currículo',
    en: 'curriculum'
  },
  Icon: DocIcon
}, {
  id: 'perfil',
  label: {
    pt: 'perfil.card',
    en: 'profile.card'
  },
  Icon: ImageIcon
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
  id: 'mae',
  label: {
    pt: 'mãe.jpg',
    en: 'mom.jpg'
  },
  Icon: ImageIcon
}, {
  id: 'contato',
  label: {
    pt: 'contato',
    en: 'contact'
  },
  Icon: MailIcon
}, {
  id: 'ampulheta',
  label: {
    pt: 'ampulheta.app',
    en: 'hourglass.app'
  },
  Icon: HourglassIcon
}, {
  id: 'poster',
  label: {
    pt: 'tabula',
    en: 'tabula'
  },
  Icon: AtlasIcon
}];
const ICON_TILES = {
  sobre: '/assets/icons/sobre.webp',
  tese: '/assets/icons/metodologia.webp',
  conceitos: '/assets/icons/conceitos.webp',
  iconocracia: '/assets/icons/iconocracia.webp',
  radiografia: '/assets/icons/radiografia.webp',
  marginalia: '/assets/icons/marginalia.webp',
  atlas: '/assets/icons/atlas.webp',
  'sala-de-leitura': '/assets/icons/sala.webp',
  advocacia: '/assets/icons/advocacia.webp',
  quotes: '/assets/icons/citacoes.webp',
  trabalhos: '/assets/icons/trabalhos.webp',
  publicacoes: '/assets/icons/publicacoes.webp',
  ius: '/assets/icons/ius-gentium-v1.png',
  projetos: '/assets/icons/projetos-vivos-v1.png',
  orientador: '/assets/icons/orientador-v1.png',
  curriculo: '/assets/icons/curriculo.webp',
  perfil: '/assets/icons/perfil.webp',
  justitia: '/assets/icons/justitia.webp',
  vo: '/assets/icons/vo.webp',
  mae: '/assets/mae/mae-icon.jpg',
  contato: '/assets/icons/contato-v1.png',
  ampulheta: '/assets/icons/ampulheta-v1.png',
  poster: '/assets/icons/tabula-v1.png'
};
const DESK_GROUPS = [{
  id: 'pesquisa',
  label: {
    pt: 'pesquisa',
    en: 'research'
  },
  tile: '/assets/icons/iconocracia.webp',
  ids: ['tese', 'iconocracia', 'ius', 'projetos', 'atlas', 'conceitos']
}, {
  id: 'arquivo',
  label: {
    pt: 'arquivo',
    en: 'archive'
  },
  tile: '/assets/icons/publicacoes.webp',
  ids: ['radiografia', 'marginalia', 'quotes', 'trabalhos', 'publicacoes', 'poster']
}, {
  id: 'pessoas',
  label: {
    pt: 'pessoas',
    en: 'people'
  },
  tile: '/assets/icons/perfil.webp',
  ids: ['sobre', 'perfil', 'curriculo', 'orientador', 'contato', 'advocacia']
}, {
  id: 'memoria',
  label: {
    pt: 'memória',
    en: 'memory'
  },
  tile: '/assets/icons/justitia.webp',
  ids: ['justitia', 'vo', 'mae', 'ampulheta', 'sala-de-leitura']
}];
const MENUS = ['sobre', 'tese', 'conceitos', 'publicacoes', 'projetos', 'orientador', 'contato'];
const MENU_LABEL = {
  pt: {
    sobre: 'Sobre',
    tese: 'Tese',
    conceitos: 'Conceitos',
    publicacoes: 'Perfis',
    projetos: 'Projetos',
    orientador: 'Orientador',
    contato: 'Contato'
  },
  en: {
    sobre: 'About',
    tese: 'Thesis',
    conceitos: 'Concepts',
    publicacoes: 'Profiles',
    projetos: 'Projects',
    orientador: 'Advisor',
    contato: 'Contact'
  }
};
const UI = {
  pt: {
    welcome: 'bem-vinda',
    tagline: 'direito & iconografia',
    enter: 'entrar →',
    dockHint: 'clique duplo · arraste pela barra',
    clk: 'pt-BR'
  },
  en: {
    welcome: 'welcome',
    tagline: 'law & iconography',
    enter: 'enter →',
    dockHint: 'double-click · drag the title bar',
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
  const [m, setM] = React.useState(() => typeof window !== 'undefined' && (mobForced() || window.matchMedia('(max-width: 1024px)').matches));
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
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
    className: "window-control",
    onClick: onClick,
    onMouseDown: e => e.stopPropagation(),
    onPointerDown: e => e.stopPropagation(),
    "aria-label": label,
    style: {
      width: 'var(--desktop-hit-target)',
      height: 'var(--desktop-hit-target)',
      border: 0,
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      cursor: 'pointer',
      boxSizing: 'border-box',
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 'var(--desktop-control-glyph)',
      height: 'var(--desktop-control-glyph)',
      border: '1.5px solid var(--ink)',
      background: 'var(--paper)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: active ? 1 : 0.4,
      boxSizing: 'border-box'
    }
  }, children));
}
function TitleBar({
  title,
  active,
  onClose,
  onMin,
  onDown,
  titleId,
  lang,
  draggable = true,
  isPoster = false
}) {
  const labels = lang === 'en' ? {
    close: 'Close window',
    closeInactive: 'Close inactive window',
    minimize: 'Minimize',
    minimizeInactive: 'Minimize inactive window'
  } : {
    close: 'Fechar Janela',
    closeInactive: 'Fechar Janela Inativa',
    minimize: 'Minimizar',
    minimizeInactive: 'Minimizar Inativo'
  };
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
      gap: 3,
      height: 'var(--desktop-titlebar-height)',
      padding: '0 3px',
      background: 'var(--paper)',
      borderBottom: '1px solid var(--ink)',
      cursor: draggable ? 'grab' : 'default',
      userSelect: 'none',
      touchAction: 'none',
      position: 'relative',
      zIndex: 1010
    }
  }, /*#__PURE__*/React.createElement(ChromeBox, {
    active: active,
    onClick: onClose,
    label: isPoster ? (active ? labels.close : labels.closeInactive) : labels.close
  }), /*#__PURE__*/React.createElement("div", {
    style: flank
  }), /*#__PURE__*/React.createElement("span", {
    id: titleId,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--desktop-window-title-text)',
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
      color: active ? 'var(--ink)' : 'var(--text-faint)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: flank
  }), /*#__PURE__*/React.createElement(ChromeBox, {
    active: active,
    onClick: onMin,
    label: active ? labels.minimize : labels.minimizeInactive
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
  const titleId = `window-title-${win.id}`;
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
    boxShadow: 'var(--desktop-elevation-sheet)'
  } : {
    position: 'absolute',
    left: win.x,
    top: win.y,
    width: winW(win.id),
    zIndex: win.z,
    background: 'var(--paper)',
    border: '1px solid var(--ink)',
    boxShadow: active ? 'var(--desktop-elevation-active)' : 'var(--desktop-elevation-idle)'
  };
  return /*#__PURE__*/React.createElement("div", {
    onPointerDown: () => onFocus(win.id),
    className: "dwin",
    role: "dialog",
    "aria-labelledby": titleId,
    "aria-modal": isMobile || undefined,
    "data-window-id": win.id,
    tabIndex: -1,
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
    titleId: titleId,
    lang: lang,
    active: active || isMobile,
    onClose: () => onClose(win.id),
    onMin: () => onMin(win.id),
    onDown: e => onDragStart(e, win.id),
    draggable: !isMobile,
    isPoster: win.id === 'poster'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: win.id === 'justitia' ? 12 : (win.id === 'ampulheta' ? 16 : 22),
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
      color: 'var(--rubric)'
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
    src: "/assets/avatar-pixel.png",
    alt: "Ana Vanzin",
    style: {
      height: 168,
      width: 'auto',
      borderRadius: 14,
      border: '1px solid var(--ink)',
      boxShadow: '4px 4px 0 0 var(--ink)'
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
      fontSize: 'var(--desktop-meta-text)',
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
function Desktop({
  skipBoot = false
} = {}) {
  const [booted, setBooted] = React.useState(() => {
    if (skipBoot) return true;
    try {
      return localStorage.getItem('av_booted') === '1';
    } catch (e) {
      return false;
    }
  });
  const [wins, setWins] = React.useState(() => {
    const mob = typeof window !== 'undefined' && (mobForced() || window.matchMedia('(max-width: 1024px)').matches);
    // On compact screens the desk becomes an archive index; a record opens only
    // after its row is chosen, instead of presenting a desktop window by default.
    if (mob) return [];
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const projectsX = Math.max(460, viewportWidth - REG.projetos.w - 24);
    const justitiaX = Math.max(100, projectsX - REG.justitia.w - 26);
    return [{
      id: 'justitia',
      x: justitiaX,
      y: 84,
      z: 2,
      min: false
    }, {
      id: 'projetos',
      x: projectsX,
      y: 104,
      z: 4,
      min: false
    }];
  });
  const [zTop, setZTop] = React.useState(5);
  const [sel, setSel] = React.useState(null);
  const [activeDeskGroup, setActiveDeskGroup] = React.useState('pesquisa');
  const drag = React.useRef(null);
  const isMobile = useIsMobile();
  const selectedDeskGroup = DESK_GROUPS.find(group => group.id === activeDeskGroup) || DESK_GROUPS[0];
  const iconsInView = isMobile ? DESK_ICONS : DESK_ICONS.filter(icon => selectedDeskGroup.ids.includes(icon.id));
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
    setTimeout(() => document.getElementById('main')?.focus({
      preventScroll: true
    }), 0);
  };
  const focusWindowElement = id => setTimeout(() => document.querySelector(`[data-window-id="${id}"]`)?.focus({
    preventScroll: true
  }), 0);
  const focus = id => {
    setWins(ws => {
      const z = zTop;
      setZTop(p => p + 1);
      return ws.map(w => w.id === id ? {
        ...w,
        z,
        min: false
      } : w);
    });
    focusWindowElement(id);
  };
  const open = id => {
    if (id === 'sobre') {
      window.location.href = '/sobre.html';
      return;
    }
    if (id === 'conceitos') {
      window.location.href = '/conceitos.html';
      return;
    }
    if (id === 'iconocracia') {
      window.location.href = '/iconocracia/';
      return;
    }
    if (id === 'radiografia') {
      window.location.href = '/iconocracia/radiografia/';
      return;
    }
    if (id === 'marginalia') {
      window.location.href = '/marginalia/';
      return;
    }
    if (id === 'advocacia') {
      window.location.href = '/advocacia.html';
      return;
    }
    if (id === 'quotes') {
      window.location.href = '/quotes/';
      return;
    }
    if (id === 'trabalhos') {
      window.location.href = '/trabalhos.html';
      return;
    }
    if (id === 'publicacoes') {
      window.location.href = '/publicacoes/';
      return;
    }
    if (id === 'atlas') {
      window.location.href = '/atlas/';
      return;
    }
    if (id === 'sala-de-leitura') {
      window.location.href = '/sala-de-leitura/';
      return;
    }
    if (id === 'curriculo') {
      window.location.href = '/readme.html';
      return;
    }
    if (id === 'perfil') {
      window.location.href = '/perfil.html';
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
      const advisor = id === 'orientador';
      const x = advisor ? Math.min(360, Math.max(112, Math.round(window.innerWidth * 0.18))) : Math.min(160 + n * 32, Math.max(12, window.innerWidth - winW(id) - 16));
      const y = advisor ? Math.min(380, Math.max(84, window.innerHeight - 350)) : 78 + n * 28;
      return [...ws, {
        id,
        x,
        y,
        z,
        min: false
      }];
    });
    focusWindowElement(id);
  };
  const close = id => {
    setWins(ws => ws.filter(w => w.id !== id));
    setTimeout(() => document.querySelector(`[data-app-id="${id}"]`)?.focus({
      preventScroll: true
    }), 0);
  };
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
        y: Math.max(46, Math.min(e.clientY - dy, window.innerHeight - 60))
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
  React.useEffect(() => {
    if (!isMobile || !topId) return undefined;
    const activeWindow = document.querySelector(`[data-window-id="${topId}"]`);
    if (!activeWindow) return undefined;
    activeWindow.focus({
      preventScroll: true
    });
    const keepFocusInside = e => {
      if (e.key !== 'Tab') return;
      const focusable = [...activeWindow.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(element => element.getClientRects().length > 0);
      if (!focusable.length) {
        e.preventDefault();
        activeWindow.focus({
          preventScroll: true
        });
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || !activeWindow.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !activeWindow.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', keepFocusInside);
    return () => window.removeEventListener('keydown', keepFocusInside);
  }, [isMobile, topId]);
  React.useEffect(() => {
    const onKeyDown = e => {
      if (e.key !== 'Escape' || !topId) return;
      // Tabula owns Escape so its poster can leave zoom mode without the
      // desktop manager dismissing the enclosing window in the same event.
      if (topId === 'poster') return;
      const activeWindow = document.querySelector(`[data-window-id="${topId}"]`);
      if (activeWindow?.querySelector('.zoomed')) return;
      e.preventDefault();
      close(topId);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobile, topId]);
  return /*#__PURE__*/React.createElement("main", {
    id: "main",
    tabIndex: -1,
    onPointerDown: () => setSel(null),
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--paper)',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "sr-only"
  }, "ana vanzin \xB7 direito & iconografia"), /*#__PURE__*/React.createElement("img", {
    src: "/assets/landing/bg-justitia.jpg?v=20260811-archive2",
    alt: "",
    "aria-hidden": "true",
    "data-desktop-wallpaper": "illuminated-justitia",
    style: {
      position: 'absolute',
      left: isMobile ? 'auto' : '6%',
      right: isMobile ? '-46%' : 'auto',
      bottom: isMobile ? 48 : 36,
      height: isMobile ? '66%' : '91%',
      width: 'auto',
      maxWidth: isMobile ? 'none' : '58%',
      objectFit: 'contain',
      objectPosition: 'right bottom',
      opacity: 1,
      filter: 'none',
      mixBlendMode: 'normal',
      WebkitMaskImage: 'none',
      maskImage: 'none',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--desktop-titlebar-height)',
      background: 'var(--paper)',
      borderBottom: '1px solid var(--ink)',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? 10 : 16,
      padding: isMobile ? '0 12px' : '0 16px',
      zIndex: 9000
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/avatar-pixel.png",
    alt: "Ana Vanzin",
    width: 22,
    height: 22,
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      objectFit: 'cover',
      objectPosition: 'top center',
      border: '1px solid var(--ink)',
      flexShrink: 0
    }
  }), isMobile ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap'
    }
  }, lang === 'en' ? 'live archive' : 'arquivo vivo') : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap'
    }
  }, "ana vanzin")), !isMobile && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 16,
      background: 'var(--rule-hairline)'
    }
  }), !isMobile && /*#__PURE__*/React.createElement("nav", {
    "aria-label": lang === 'en' ? 'Main navigation' : 'Navega\xE7\xE3o principal',
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
    className: "desktop-menu-item",
    "data-app-id": id,
    onPointerDown: e => e.stopPropagation(),
    onClick: () => open(id),
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 'var(--desktop-ui-text)',
      color: 'var(--ink)',
      minHeight: 'var(--desktop-hit-target)',
      padding: '7px 2px',
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
    "data-lang": l,
    "aria-pressed": lang === l,
    onPointerDown: e => e.stopPropagation(),
    onClick: () => setLangP(l),
    style: {
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.12em',
      minWidth: 'var(--desktop-hit-target)',
      minHeight: 'var(--desktop-hit-target)',
      padding: '7px 9px',
      lineHeight: 1.6,
      background: lang === l ? 'var(--ink)' : 'var(--paper)',
      color: lang === l ? 'var(--paper)' : 'var(--ink)'
    }
  }, l.toUpperCase()))), !isMobile && /*#__PURE__*/React.createElement(Clock, {
    lang: lang
  }))), /*#__PURE__*/React.createElement("div", {
    role: isMobile ? 'navigation' : undefined,
    "aria-label": isMobile ? lang === 'en' ? 'Archive index' : 'Índice do arquivo' : undefined,
    style: isMobile ? {
      position: 'absolute',
      top: 46,
      left: 0,
      right: 0,
      bottom: 54,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 8,
      padding: '26px 16px 32px',
      zIndex: 1,
      alignContent: 'start'
    } : {
      position: 'absolute',
      top: 62,
      left: 16,
      width: 84,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      zIndex: 1
    }
  }, !isMobile && /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": lang === 'en' ? 'Desktop archive sections' : 'Seções do arquivo na mesa',
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: 4,
      marginBottom: 4
    }
  }, DESK_GROUPS.map(group => /*#__PURE__*/React.createElement("button", {
    key: group.id,
    type: "button",
    "aria-pressed": activeDeskGroup === group.id,
    "aria-label": group.label[lang],
    onPointerDown: e => e.stopPropagation(),
    onClick: () => setActiveDeskGroup(group.id),
    title: group.label[lang],
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minWidth: 0,
      minHeight: 38,
      padding: 3,
      border: activeDeskGroup === group.id ? '1.5px solid var(--rubric)' : '1px solid var(--ink)',
      background: activeDeskGroup === group.id ? 'var(--paper)' : 'color-mix(in srgb, var(--paper) 72%, transparent)',
      boxShadow: activeDeskGroup === group.id ? 'var(--desktop-elevation-icon-active)' : 'var(--desktop-elevation-icon)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: group.tile,
    alt: "",
    width: 30,
    height: 30,
    style: {
      width: 30,
      height: 30,
      objectFit: 'cover',
      imageRendering: 'auto'
    }
  })))), !isMobile && /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    style: {
      margin: '-1px 0 3px',
      color: 'var(--rubric)',
      fontSize: 9,
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.12em',
      textAlign: 'center',
      textTransform: 'uppercase',
      textShadow: '0 1px var(--paper)'
    }
  }, selectedDeskGroup.label[lang]), isMobile && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 4px 16px',
      textShadow: '0 1px var(--paper)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--rubric)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.17em',
      textTransform: 'uppercase'
    }
  }, lang === 'en' ? 'portable desk' : 'mesa portátil'), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '7px 0 5px',
      fontFamily: 'var(--font-display)',
      fontSize: 38,
      lineHeight: .95,
      fontWeight: 600,
      letterSpacing: '-0.025em'
    }
  }, lang === 'en' ? 'Live archive' : 'Arquivo vivo'), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 290,
      fontSize: 14,
      lineHeight: 1.45
    }
  }, lang === 'en' ? 'Choose a file, a folder, or a record to begin.' : 'Escolha um documento, uma pasta ou uma ficha para começar.')), iconsInView.map(({
    id,
    label,
    Icon
  }) => {
    const active = sel === id;
    const tile = ICON_TILES[id];
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      className: "desktop-icon",
      "data-app-id": id,
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
        flexDirection: isMobile ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: isMobile ? 'flex-start' : undefined,
        gap: isMobile ? 12 : 5,
        width: isMobile ? '100%' : 84,
        minHeight: isMobile ? 'var(--desktop-hit-target)' : undefined,
        padding: isMobile ? 6 : 3,
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: isMobile ? {
        width: 54,
        height: 54,
        flex: '0 0 54px',
        background: 'color-mix(in srgb, var(--paper) 90%, transparent)',
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(1px)',
        border: '1px solid var(--ink)',
        borderRadius: 'var(--desktop-icon-radius)',
        boxShadow: active ? 'var(--desktop-elevation-icon-active)' : 'var(--desktop-elevation-icon)',
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
    }, tile ? /*#__PURE__*/React.createElement("img", {
      src: tile,
      alt: "",
      width: isMobile ? 54 : 58,
      height: isMobile ? 54 : 58,
      style: {
        width: isMobile ? 54 : 58,
        height: isMobile ? 54 : 58,
        objectFit: 'cover',
        imageRendering: 'auto'
      }
    }) : /*#__PURE__*/React.createElement(Icon, {
      size: isMobile ? 34 : 44
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: isMobile ? 'var(--font-display)' : 'var(--font-body)',
        fontSize: isMobile ? 18 : 12,
        lineHeight: 1.2,
        textAlign: isMobile ? 'left' : 'center',
        background: active ? 'var(--rubric)' : 'transparent',
        color: active ? 'var(--paper)' : 'var(--ink)',
        padding: isMobile ? '5px 8px' : '1px 5px',
        flex: isMobile ? 1 : undefined
      }
    }, label[lang]));
  })), isMobile && visible.length > 0 && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": lang === 'en' ? 'Close active window' : 'Fechar janela ativa',
    onClick: e => {
      e.stopPropagation();
      close(topId);
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 9400,
      width: '100%',
      height: '100%',
      padding: 0,
      border: 0,
      background: 'rgba(28,25,20,0.28)'
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
      height: isMobile ? 'var(--desktop-dock-height-mobile)' : 'var(--desktop-dock-height)',
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
      fontSize: 'var(--desktop-meta-text)',
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
      className: "desktop-dock-item",
      onPointerDown: e => e.stopPropagation(),
      onClick: () => w.min ? focus(w.id) : topId === w.id ? minimize(w.id) : focus(w.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: on ? 'var(--paper)' : 'transparent',
        color: on ? 'var(--ink)' : 'var(--paper)',
        border: '1px solid ' + (on ? 'var(--paper)' : 'var(--desktop-dock-rule)'),
        borderRadius: 0,
        minHeight: isMobile ? 'var(--desktop-hit-target)' : undefined,
        padding: '3px 10px',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 12.5,
        whiteSpace: 'nowrap',
        opacity: w.min ? 0.6 : 1
      }
    }, regTitle(w.id, lang));
  })), !isMobile && /*#__PURE__*/React.createElement("a", {
    href: ADVISOR_SITE_URL,
    "aria-label": lang === 'en' ? 'Responsible advisor: Arno Dal Ri Júnior, PPGD/UFSC' : 'Orientador responsável: Arno Dal Ri Júnior, PPGD/UFSC',
    onPointerDown: e => e.stopPropagation(),
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      minHeight: 28,
      padding: '0 8px 0 10px',
      borderLeft: '2px solid var(--gold-2)',
      background: 'rgba(242,234,217,0.08)',
      color: 'var(--paper)',
      fontFamily: 'var(--font-body)',
      whiteSpace: 'nowrap',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      lineHeight: 1.05
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-2)',
      fontFamily: 'var(--font-display)',
      fontSize: 8,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase'
    }
  }, lang === 'en' ? 'Research advisor · PPGD/UFSC' : 'Orientação · PPGD/UFSC'), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--paper)',
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      fontWeight: 600,
      textDecoration: 'underline',
      textDecorationColor: 'rgba(220,181,77,0.62)',
      textUnderlineOffset: '0.18em'
    }
  }, 'Arno Dal Ri Júnior')), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      color: 'var(--gold-2)',
      fontSize: 14,
      lineHeight: 1
    }
  }, '↗'))), !booted && /*#__PURE__*/React.createElement(Boot, {
    onEnter: enter,
    lang: lang
  }));
}
(window.avapp = window.avapp || {}).Desktop = Desktop;
})();
