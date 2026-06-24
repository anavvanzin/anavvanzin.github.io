// src/hooks/useTheme.js — tone + accent palette persistence.
// Reads/writes 'atlaslab-theme' from localStorage, applies data-tone/data-palette
// to the <html> element, and exposes a tiny API for React components.
(function () {
  const STORAGE_KEY = "atlaslab-theme";
  const DEFAULT_TONE = "claro";
  const DEFAULT_PALETTE = "amethyst";
  const VALID_TONES = ["claro", "cabinet", "escuro"];
  const VALID_PALETTES = ["amethyst", "terracotta", "gold", "emerald", "navy"];

  function readSystemTone() {
    if (typeof window === "undefined" || !window.matchMedia) return "claro";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
  }

  function loadSaved() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(tone, palette) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ tone, palette }));
    } catch (e) {
      // storage may be disabled; theme still applies in-memory
    }
  }

  function apply(tone, palette) {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.setAttribute("data-tone", VALID_TONES.includes(tone) ? tone : DEFAULT_TONE);
    html.setAttribute("data-palette", VALID_PALETTES.includes(palette) ? palette : DEFAULT_PALETTE);
  }

  function getInitial() {
    const saved = loadSaved();
    const tone = saved?.tone || readSystemTone();
    const palette = saved?.palette || DEFAULT_PALETTE;
    return { tone, palette };
  }

  // Apply immediately so non-React surfaces see the theme before React mounts.
  (function boot() {
    const initial = getInitial();
    apply(initial.tone, initial.palette);
  })();

  // React hook
  function useTheme() {
    const [state, setState] = React.useState(getInitial);

    const setTone = React.useCallback((tone) => {
      const next = VALID_TONES.includes(tone) ? tone : DEFAULT_TONE;
      setState((s) => {
        const nextState = { ...s, tone: next };
        apply(nextState.tone, nextState.palette);
        saveTheme(nextState.tone, nextState.palette);
        return nextState;
      });
    }, []);

    const setPalette = React.useCallback((palette) => {
      const next = VALID_PALETTES.includes(palette) ? palette : DEFAULT_PALETTE;
      setState((s) => {
        const nextState = { ...s, palette: next };
        apply(nextState.tone, nextState.palette);
        saveTheme(nextState.tone, nextState.palette);
        return nextState;
      });
    }, []);

    React.useEffect(() => {
      apply(state.tone, state.palette);
      saveTheme(state.tone, state.palette);
    }, [state.tone, state.palette]);

    return {
      tone: state.tone,
      palette: state.palette,
      setTone,
      setPalette,
      tones: VALID_TONES,
      palettes: VALID_PALETTES,
    };
  }

  // Imperative API for plain JS / legacy surfaces
  window.ThemeManager = {
    get: getInitial,
    set: (tone, palette) => {
      apply(tone, palette);
      saveTheme(
        VALID_TONES.includes(tone) ? tone : DEFAULT_TONE,
        VALID_PALETTES.includes(palette) ? palette : DEFAULT_PALETTE
      );
    },
    apply,
    VALID_TONES,
    VALID_PALETTES,
  };

  window.useTheme = useTheme;
})();
