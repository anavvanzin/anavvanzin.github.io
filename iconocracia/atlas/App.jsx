// atlas/App.jsx — Atlas page root, loads generated JSON and keeps all parts.
const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakColor, TweakSlider, TweakText } = window;
const P = window.AtlasParts;
const { loadCorpus, loadStats, buildSummary } = window.CorpusLoader;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tone": "claro",
  "accent": "#8A5FA8",
  "scale": 1.1,
  "density": "regular",
  "heroSplit": "texto dominante",
  "title": "A alegoria feminina ",
  "kicker": "ICONOCRACIA · Tese de Doutorado · PPGD/UFSC"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [corpus, setCorpus] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const theme = P.atlasTheme(t);

  React.useEffect(() => {
    const saved = window.ThemeManager?.get?.() || { tone: "claro", palette: "amethyst" };
    document.body.style.background = saved.tone === "escuro" ? "var(--c-ground)" : "var(--surface-page)";
    document.documentElement.setAttribute("data-tone", saved.tone);
    document.documentElement.setAttribute("data-palette", saved.palette);
  }, []);

  React.useEffect(() => {
    document.body.style.background = theme["--c-ground"];
  }, [theme["--c-ground"]]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const items = await loadCorpus();
        if (cancelled) return;
        const s = await loadStats(items);
        if (cancelled) return;
        setCorpus(items);
        setStats(s);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const data = React.useMemo(() => {
    if (!corpus) return window.AtlasData;
    const summary = stats ? buildSummary(stats, corpus) : [];
    return { ...window.AtlasData, corpus, stats, summary };
  }, [corpus, stats]);

  return React.createElement('div', {
    className: 'atlas-root',
    style: { ...theme, background: 'var(--c-ground)', color: 'var(--c-ink)', fontFamily: 'var(--font-body)' }
  },
    React.createElement('div', { className: 'grain-overlay' }),
    React.createElement(window.ThemeToggle, { position: 'bottom-right' }),
    React.createElement('div', { style: { position: 'relative', zIndex: 2 } },
      React.createElement(P.Nav, { tone: t.tone }),
      React.createElement('div', { className: 'reveal' },
        React.createElement(P.Hero, { t }),
        React.createElement(P.Stats, { data: data.summary })
      ),
      React.createElement(P.Argument),
      React.createElement(P.Anatomia),
      React.createElement(P.CorpusWall, { t, corpus: data.corpus }),
      React.createElement(P.AtlasBand),
      React.createElement(P.Radiografia),
      React.createElement(P.Lexico),
      React.createElement(P.Method),
      React.createElement(P.Colophon)
    ),
    (loading || error) && React.createElement('div', {
      className: 'mono',
      style: {
        position: 'fixed', bottom: 48, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
        padding: '8px 16px', borderRadius: 999,
        background: error ? 'rgba(178,54,54,.92)' : 'rgba(29,37,72,.85)',
        color: '#F8F5EE', fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase'
      }
    }, error ? `Erro ao carregar corpus: ${error}` : 'Carregando corpus…'),
    React.createElement(TweaksPanel, null,
      React.createElement(TweakSection, { label: 'Tom & paleta' }),
      React.createElement(TweakRadio, { label: 'Tom', value: t.tone, options: ['claro', 'cabinet'], onChange: (v) => setTweak('tone', v) }),
      React.createElement(TweakColor, { label: 'Acento', value: t.accent, options: ['#8A5FA8', '#A04030', '#B8924A', '#2A7A5A', '#1D2548'], onChange: (v) => setTweak('accent', v) }),
      React.createElement(TweakSection, { label: 'Tipografia' }),
      React.createElement(TweakSlider, { label: 'Escala', value: t.scale, min: 0.85, max: 1.25, step: 0.05, onChange: (v) => setTweak('scale', v) }),
      React.createElement(TweakSection, { label: 'Layout' }),
      React.createElement(TweakRadio, { label: 'Densidade', value: t.density, options: ['compacto', 'regular', 'amplo'], onChange: (v) => setTweak('density', v) }),
      React.createElement(TweakSelect, { label: 'Proporção do herói', value: t.heroSplit, options: ['equilíbrio', 'imagem dominante', 'texto dominante'], onChange: (v) => setTweak('heroSplit', v) }),
      React.createElement(TweakSection, { label: 'Texto' }),
      React.createElement(TweakText, { label: 'Título', value: t.title, onChange: (v) => setTweak('title', v) }),
      React.createElement(TweakText, { label: 'Kicker', value: t.kicker, onChange: (v) => setTweak('kicker', v) })
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
