// Manifesto da Iconocracia — React app: theme engine, slides, navigation,
// fullscreen, speaker notes, print-to-PDF, presentation mode, Tweaks.
(function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const D = window.ManifestoData;

  // ── i18n ──────────────────────────────────────────────────────────────
  const L = (o, lang) => (o && typeof o === "object" && ("pt" in o || "en" in o) ? (o[lang] ?? o.pt) : o);

  // ── theme engine ──────────────────────────────────────────────────────
  const ACCENTS = {
    rubric: "#9B2C1C", amethyst: "#8A5FA8", gold: "#9C7C3D", green: "#2A7A5A", plate: "#1D2548",
  };
  function themeVars(tone, accent, scale) {
    const A = ACCENTS[accent] || accent || ACCENTS.rubric;
    const light = {
      ground: "#F2EAD9", paper: "#F2EAD9", panel: "#F8F2E4",
      ink: "#211B16", ink70: "#4A413A", ink50: "#7A6E62", ink15: "rgba(33,27,22,.14)",
      hair: "rgba(33,27,22,.22)", dot: "rgba(33,27,22,.13)",
    };
    const cabinet = {
      ground: "#171D38", paper: "#171D38", panel: "#1F274A",
      ink: "#EFE6D2", ink70: "#C7BCA6", ink50: "#8E866F", ink15: "rgba(239,230,210,.14)",
      hair: "rgba(212,168,94,.34)", dot: "rgba(239,230,210,.16)",
    };
    const t = tone === "cabinet" ? cabinet : light;
    return {
      "--m-ground": t.ground, "--m-paper": t.paper, "--m-panel": t.panel,
      "--m-ink": t.ink, "--m-ink-70": t.ink70, "--m-ink-50": t.ink50, "--m-ink-15": t.ink15,
      "--m-hair": t.hair, "--m-dot": t.dot, "--m-accent": A,
      "--m-scale": String(scale),
    };
  }

  // ── one slide ─────────────────────────────────────────────────────────
  function Slide({ s, lang, dir, idx, showFolio, riscoW, printing }) {
    const cls = ["m-slide", "m-kind-" + s.kind, printing ? "" : "on", dir ? "dir-" + dir : ""].join(" ");
    return (
      <section className={cls} data-screen-label={"manifesto " + s.folio} key={idx}>
        {showFolio && <span className="m-folio">{s.folio}</span>}
        {s.kind === "cover" && (
          <>
            <p className="m-eb">{L(D.meta.kicker, lang)}</p>
            <h1 className="m-display">{D.meta.title}<span className="m-band" aria-hidden="true" /></h1>
            <p className="m-sub">{L(D.meta.subtitle, lang)}</p>
          </>
        )}
        {s.kind === "phrase" && (
          <>
            <p className="m-phrase" dangerouslySetInnerHTML={{ __html: L(s.phrase, lang) }} />
            {s.risco && <div className="m-risco" aria-hidden="true" style={{ "--risco-w": riscoW + "px" }} />}
            {s.sub && <p className="m-sub">{L(s.sub, lang)}</p>}
          </>
        )}
        {s.kind === "close" && (
          <>
            <p className="m-phrase sm" dangerouslySetInnerHTML={{ __html: L(s.phrase, lang) }} />
            {s.sub && <p className="m-sub">{L(s.sub, lang)}</p>}
            <div className="m-sign">
              <span className="m-rule" aria-hidden="true" />
              <h2 className="m-name">{D.meta.author}</h2>
              <p className="m-role">{L(D.meta.role, lang)}</p>
            </div>
          </>
        )}
      </section>
    );
  }

  const TWEAK_DEFAULTS = {
    tone: "claro", accent: "rubric", scale: 1.0, speed: "container",
    risco: 120, folio: true, dots: true, grain: true,
    autoplay: false, interval: 6, coverTitle: "",
  };
  const SPEEDS = { lenta: 900, container: 600, rápida: 320 };

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const N = D.slides.length;

    const [i, setI] = useState(() => {
      try { const s = parseInt(localStorage.getItem("av_manifesto_i")); if (!isNaN(s) && s >= 0 && s < N) return s; } catch (e) {}
      return 0;
    });
    const [lang, setLang] = useState(() => { try { return localStorage.getItem("av_lang") === "en" ? "en" : "pt"; } catch (e) { return "pt"; } });
    const [dir, setDir] = useState(null);
    const [notes, setNotes] = useState(false);
    const [fs, setFs] = useState(false);
    const [printing, setPrinting] = useState(false);
    const liveTitle = (t.coverTitle || "").trim();
    if (liveTitle) D.meta.title = liveTitle;

    const go = useCallback((n) => {
      setI((cur) => {
        const next = Math.max(0, Math.min(N - 1, n));
        setDir(next > cur ? "next" : next < cur ? "prev" : null);
        try { localStorage.setItem("av_manifesto_i", String(next)); } catch (e) {}
        return next;
      });
    }, [N]);

    // persist lang + broadcast
    useEffect(() => {
      try { localStorage.setItem("av_lang", lang); } catch (e) {}
      document.documentElement.lang = lang;
      window.dispatchEvent(new CustomEvent("av:lang", { detail: { lang } }));
    }, [lang]);

    // keyboard
    useEffect(() => {
      const onKey = (e) => {
        if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(i + 1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
        else if (e.key === "Home") go(0);
        else if (e.key === "End") go(N - 1);
        else if (e.key.toLowerCase() === "n") setNotes((v) => !v);
        else if (e.key.toLowerCase() === "f") toggleFs();
        else if (e.key === "Escape") setNotes(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [i, go, N]);

    // autoplay / presentation mode
    useEffect(() => {
      if (!t.autoplay || printing) return;
      const ms = Math.max(2, Number(t.interval) || 6) * 1000;
      const id = setTimeout(() => go(i >= N - 1 ? 0 : i + 1), ms);
      return () => clearTimeout(id);
    }, [t.autoplay, t.interval, i, printing, go, N]);

    // fullscreen
    const toggleFs = useCallback(() => {
      const el = document.documentElement;
      if (!document.fullscreenElement) { (el.requestFullscreen || el.webkitRequestFullscreen || function(){}).call(el); }
      else { (document.exitFullscreen || document.webkitExitFullscreen || function(){}).call(document); }
    }, []);
    useEffect(() => {
      const h = () => setFs(!!document.fullscreenElement);
      document.addEventListener("fullscreenchange", h);
      return () => document.removeEventListener("fullscreenchange", h);
    }, []);

    // print: reveal all slides during print, restore after
    useEffect(() => {
      const before = () => setPrinting(true);
      const after = () => setPrinting(false);
      window.addEventListener("beforeprint", before);
      window.addEventListener("afterprint", after);
      return () => { window.removeEventListener("beforeprint", before); window.removeEventListener("afterprint", after); };
    }, []);
    const doPrint = () => { setPrinting(true); setTimeout(() => { window.print(); }, 60); };

    const speedMs = SPEEDS[t.speed] ?? 600;
    const style = {
      ...themeVars(t.tone, t.accent, t.scale),
      "--m-speed": speedMs + "ms",
    };
    const rootCls = ["m-root", t.grain ? "grain" : "", printing ? "printing" : "", t.tone === "cabinet" ? "cabinet" : ""].join(" ");

    const cur = D.slides[i];

    return (
      <div className={rootCls} style={style}>
        {/* top bar */}
        <header className="m-top">
          <a className="m-brand" href="../index.html" title="← voltar à mesa">
            <img src="../assets/sun-seal.svg" alt="" /><b>ana vanzin</b>
          </a>
          <span className="m-word">{lang === "en" ? "manifesto · the core" : "manifesto · o núcleo"}</span>
          <span className="m-tools">
            <button className={"m-lang" + (lang === "pt" ? " on" : "")} onClick={() => setLang("pt")} aria-pressed={lang === "pt"}>PT</button>
            <button className={"m-lang" + (lang === "en" ? " on" : "")} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
            <span className="m-sep" />
            <button className={"m-ic" + (notes ? " on" : "")} onClick={() => setNotes((v) => !v)} title="Notas do orador (N)" aria-label="Notas">❧</button>
            <button className="m-ic" onClick={doPrint} title="Imprimir / PDF" aria-label="Imprimir">⎙</button>
            <button className={"m-ic" + (fs ? " on" : "")} onClick={toggleFs} title="Tela cheia (F)" aria-label="Tela cheia">⤢</button>
            <span className="m-sep" />
            <a className="m-ic" href="impressa.html" title={lang === "en" ? "Printed essay version" : "Versão impressa — ensaio"} aria-label={lang === "en" ? "Printed essay version" : "Versão impressa"}>❡</a>
          </span>
        </header>

        {/* click zones */}
        {!printing && <><div className="m-zone l" onClick={() => go(i - 1)} aria-hidden="true" /><div className="m-zone r" onClick={() => go(i + 1)} aria-hidden="true" /></>}

        {/* deck */}
        <div className="m-deck">
          {printing
            ? D.slides.map((s, n) => <Slide key={n} s={s} idx={n} lang={lang} showFolio={t.folio} riscoW={t.risco} printing />)
            : <Slide key={i} s={cur} idx={i} lang={lang} dir={dir} showFolio={t.folio} riscoW={t.risco} />}
        </div>

        {/* speaker notes drawer */}
        {notes && !printing && (
          <aside className="m-notes" aria-label="Notas do orador">
            <p className="m-notes-h">{lang === "en" ? "Speaker note" : "Nota do orador"} · <span>{cur.folio}</span></p>
            <p className="m-notes-b">{L(cur.note, lang)}</p>
          </aside>
        )}

        {/* controls */}
        {!printing && (
          <nav className="m-nav">
            <button className="m-arw" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Anterior">‹</button>
            {t.dots && (
              <div className="m-dots">
                {D.slides.map((s, n) => (
                  <button key={n} className="m-dot" aria-current={n === i} aria-label={"slide " + (n + 1)} onClick={() => go(n)} />
                ))}
              </div>
            )}
            <button className="m-arw" onClick={() => go(i + 1)} disabled={i === N - 1} aria-label="Próximo">›</button>
          </nav>
        )}
        {!printing && <div className="m-count">{String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</div>}

        {/* Tweaks */}
        <TweaksPanel title="Tweaks">
          <TweakSection label={lang === "en" ? "Surface" : "Superfície"}>
            <TweakRadio label={lang === "en" ? "Tone" : "Tom"} value={t.tone}
              options={[{ value: "claro", label: lang === "en" ? "paper" : "papel" }, { value: "cabinet", label: lang === "en" ? "cabinet" : "gabinete" }]}
              onChange={(v) => setTweak("tone", v)} />
            <TweakColor label={lang === "en" ? "Accent" : "Acento"} value={t.accent}
              options={["rubric", "amethyst", "gold", "green", "plate"].map((k) => ({ value: k, color: ACCENTS[k] }))}
              onChange={(v) => setTweak("accent", v)} />
            <TweakToggle label={lang === "en" ? "Paper grain" : "Textura de papel"} value={t.grain} onChange={(v) => setTweak("grain", v)} />
          </TweakSection>

          <TweakSection label={lang === "en" ? "Type & rhythm" : "Tipo & ritmo"}>
            <TweakSlider label={lang === "en" ? "Type scale" : "Escala tipográfica"} value={t.scale} min={0.8} max={1.3} step={0.05} onChange={(v) => setTweak("scale", v)} />
            <TweakSlider label={lang === "en" ? "Rubric line" : "Linha rubrica"} value={t.risco} min={0} max={320} step={10} unit="px" onChange={(v) => setTweak("risco", v)} />
            <TweakSelect label={lang === "en" ? "Transition" : "Transição"} value={t.speed}
              options={[{ value: "lenta", label: lang === "en" ? "slow" : "lenta" }, { value: "container", label: lang === "en" ? "medium" : "média" }, { value: "rápida", label: lang === "en" ? "fast" : "rápida" }]}
              onChange={(v) => setTweak("speed", v)} />
          </TweakSection>

          <TweakSection label={lang === "en" ? "Chrome" : "Interface"}>
            <TweakToggle label={lang === "en" ? "Roman folio" : "Folio romano"} value={t.folio} onChange={(v) => setTweak("folio", v)} />
            <TweakToggle label="Dots" value={t.dots} onChange={(v) => setTweak("dots", v)} />
          </TweakSection>

          <TweakSection label={lang === "en" ? "Presentation" : "Apresentação"}>
            <TweakToggle label={lang === "en" ? "Auto-advance" : "Avanço automático"} value={t.autoplay} onChange={(v) => setTweak("autoplay", v)} />
            <TweakSlider label={lang === "en" ? "Interval" : "Intervalo"} value={t.interval} min={2} max={15} step={1} unit="s" onChange={(v) => setTweak("interval", v)} />
            <TweakText label={lang === "en" ? "Cover title" : "Título da capa"} value={t.coverTitle} placeholder="Iconocracia" onChange={(v) => setTweak("coverTitle", v)} />
          </TweakSection>
        </TweaksPanel>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
