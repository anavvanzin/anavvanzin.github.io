// Atlas Lab — interactive inquiry surface for the ICONOCRACY module.
// Refactored for TL-06 to load generated corpus data via src/lib/corpus.js,
// with static seed fallback and preserved Atlas Lab functionality.
// No Firebase / no lucide — notes persist in localStorage,
// icons are inline SVG, and the stepper is purely reflective (no AI backend).
(function () {
const { useState, useEffect } = React;
const { loadCorpus } = window.CorpusLoader;

// Regimes mapped to the ICONOCRACIA regime hues (matches the main Atlas).
const REGIME = {
  "FUNDACIONAL":   { roman: "I",  label: "Fundacional-Sacrificial", color: "#6B52B0" },
  "NORMATIVO":     { roman: "II", label: "Normativo-Jurídico",      color: "#2A7A5A" },
  "MILITAR":       { roman: "III",label: "Militar-Imperial",        color: "#B23636" },
  "CONTRA_ALEGORIA":{ roman: "IV", label: "Contra-Alegoria",         color: "#A04030" },
  "CONTRA-ALEGORIA":{ roman: "IV", label: "Contra-Alegoria",         color: "#A04030" },
  "CRÍTICO":       { roman: "V",  label: "Crítico",                 color: "#8A5FA8" },
  "NÃO ALEGÓRICO": { roman: "·",  label: "Não Alegórico",           color: "#6F665C" },
  "NÃO_ALEGÓRICO": { roman: "·",  label: "Não Alegórico",           color: "#6F665C" },
  "PENDENTE":      { roman: "?",  label: "Pendente",                color: "#9A9AB0" },
  "NÃO CLASSIFICADO":{ roman: "?", label: "Não Classificado",        color: "#9A9AB0" },
};

// Lab UI configuration is independent of corpus data.
const ATLAS_LAB_PLATFORM = {
  id: 'atlas-lab',
  name: 'Atlas Lab',
  version: 'v1',
  status: 'generated-corpus',
  mission: 'Atlas Lab is the umbrella research platform for guided visual inquiry.',
  uiNote: 'Observe first. Compare before concluding. Notes support reflection and are saved locally.',
  canonicalDataNotice: 'Canonical repository data remains in data/processed/records.jsonl and corpus/corpus-data.json.',
  featuredModuleId: 'iconocracy',
};
const ATLAS_LAB_MODULES = {
  iconocracy: { id: 'iconocracy', shortName: 'ICONOCRACY', displayName: 'ICONOCRACY', subtitle: 'Contrato Sexual Visual na iconocracia jurídica ocidental' }
};

const ICONOCRACY_INDICATORS = [
  { id: 'FEI', label: 'Exposição / Flesh',        description: 'Flesh Exposure Index (FEI)' },
  { id: 'CII', label: 'Idealização Clássica',      description: 'Classical Idealisation (CII)' },
  { id: 'PRI', label: 'Rigidez Postural',          description: 'Postural Rigidity (PRI)' },
  { id: 'LEG', label: 'Legitimação',               description: 'Legitimation (LEG)' },
  { id: 'AUT', label: 'Autoridade / Atemporalidade',description: 'Authority / Agelessness (AUT)' },
  { id: 'JUD', label: 'Juridicidade',              description: 'Judiciality (JUD)' },
  { id: 'SEN', label: 'Serenidade',                description: 'Serenity / Militancy (SEN)' },
  { id: 'SEM', label: 'Semântica / Narrativa',    description: 'Semantic / Narrative (SEM)' },
  { id: 'COM', label: 'Comunicação / Serialidade', description: 'Communication / Seriality (COM)' },
  { id: 'ABS', label: 'Inscrição Estatal / Abstração', description: 'State Inscription / Absorption (ABS)' },
];

const ICONOCRACY_PANELS_V1 = [
  { id: 'P1', order: 1, slug: 'maes-fundacionais',        label: 'Mães Fundacionais',       panelType: 'regime-surface', regime: 'FUNDACIONAL', summary: 'Introduz a superfície maternal-allegórica fundadora e enquadra como a polis legitima-se por imagem feminizada de origem.', modes: ['learning', 'research'] },
  { id: 'P2', order: 2, slug: 'calcificacao-da-justitia', label: 'Calcificação da Justitia', panelType: 'regime-surface', regime: 'NORMATIVO',     summary: 'Destaca a transição da alegoria móvel para o corpo jurídico rígido, especialmente na iconografia da justiça.', modes: ['learning', 'research'] },
  { id: 'P3', order: 3, slug: 'enrijecimento-tegumentar', label: 'Enrijecimento Tegumentar', panelType: 'regime-surface', regime: 'MILITAR',       summary: 'Foca o endurecimento, proteção e mobilização do corpo feminino alegórico sob regimes visuais militares ou imperiais.', modes: ['research'] },
  { id: 'P4', order: 4, slug: 'hegemonia-marmorea',       label: 'Hegemonia Marmórea',       panelType: 'regime-surface', regime: 'FUNDACIONAL',   summary: 'Acompanha como monumentalidade, permanência material e normatividade racializada convergem no palco público da autoridade.', modes: ['research'] },
  { id: 'P5', order: 5, slug: 'ubiquidade-intima',        label: 'Ubiquidade Íntima',        panelType: 'regime-surface', regime: 'NORMATIVO',     summary: 'Reserva espaço para formas recorrentes, portáteis e menos monumentais que ainda reproduzem o script iconocrático.', modes: ['learning', 'research'] },
];

const NOTE_PREFIX = "atlaslab.note.";
const loadNote = (k) => { try { return localStorage.getItem(NOTE_PREFIX + k) || ""; } catch (e) { return ""; } };
const saveNote = (k, v) => { try { localStorage.setItem(NOTE_PREFIX + k, v); } catch (e) {} };

const reg = (id) => REGIME[id] || REGIME["NÃO CLASSIFICADO"] || { roman: "?", label: id || "—", color: "#9A9AB0" };

// ── responsive viewport hook (inline styles can't carry media queries) ──
function useViewport() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const f = () => setW(window.innerWidth);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return w;
}

// ── small inline glyphs ───────────────────────────────────────
const Glyph = ({ d, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const IcoEye    = <Glyph d={<><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z"/><circle cx="12" cy="12" r="3"/></>} />;
const IcoLayers = <Glyph d={<><path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="M2 16l10 5 10-5"/></>} />;

// ── regime badge ──────────────────────────────────────────────
function RegimeBadge({ id, small }) {
  const r = reg(id);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: small ? 8 : 9, letterSpacing: "1.5px", textTransform: "uppercase", color: r.color, border: `1px solid ${r.color}`, borderRadius: 999, padding: small ? "2px 7px" : "3px 9px", background: `color-mix(in srgb, ${r.color} 12%, transparent)` }}>
      <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: small ? 11 : 12 }}>{r.roman}</span>
      {r.label}
    </span>
  );
}

// ── image plate with graceful fallback ────────────────────────
function Plate({ it, h = 220, onClick, selected, onPresent }) {
  const r = reg(it.regime);
  const [bad, setBad] = useState(false);
  return (
    <figure onClick={onClick} style={{ margin: 0, position: "relative", height: h, overflow: "hidden", cursor: onClick ? "pointer" : "default", background: "var(--navy-mid, #1D2548)", border: `1px solid ${selected ? "var(--brand-amethyst)" : "var(--gold)"}`, outline: selected ? "1px solid var(--brand-amethyst)" : "none", outlineOffset: 3, borderRadius: "var(--radius-sm)", boxShadow: selected ? "0 0 0 3px rgba(138,95,168,.22)" : "var(--shadow-plate)", transition: "box-shadow .15s, border-color .15s" }}>
      {!bad ? (
        <img src={it.img} alt={it.title} loading="lazy" onError={() => setBad(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 16, textAlign: "center", background: `linear-gradient(160deg, ${r.color}22, #0E142C)` }}>
          <span style={{ color: r.color }}>{IcoLayers}</span>
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15, color: "var(--ivory-light, #F4ECD8)" }}>{it.title}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 7.5, letterSpacing: "1.5px", color: "var(--faded-on-dark, #9A9AB0)", textTransform: "uppercase" }}>{it.archive}</span>
        </div>
      )}
      <span style={{ position: "absolute", top: 8, left: 8, width: 10, height: 10, borderRadius: "50%", background: r.color, boxShadow: "0 0 0 2px rgba(0,0,0,.3)" }} />
      {(onPresent || window.CitationButton) && (
        <div style={{ position: "absolute", top: 8, right: 8, zIndex: 3, display: "flex", gap: 6 }}>
          {onPresent && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onPresent(it); }}
              aria-label={`Apresentar ${it.title}`}
              title="Apresentar"
              style={{
                width: 28, height: 28, borderRadius: 999, border: "1px solid rgba(244,236,216,.55)",
                background: "rgba(13,16,30,.55)", color: "#F4ECD8", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </button>
          )}
          {window.CitationButton && React.createElement("div", { style: { flexShrink: 0 } }, React.createElement(window.CitationButton, { item: it, compact: true }))}
        </div>
      )}
      <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg,transparent,rgba(13,16,30,.94))", padding: "26px 10px 8px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 7.5, letterSpacing: "1.5px", color: "var(--gold-bright, #D4A85E)", textTransform: "uppercase" }}>{it.country} · {it.year} · {it.support}</div>
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, color: "#F4ECD8", marginTop: 1, lineHeight: 1.15 }}>{it.title}</div>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

// ── citation export for the current comparison selection ─────
function CitationSelection({ items }) {
  if (!items || !items.length) return null;
  return React.createElement(window.CitationButton, {
    items: items,
    label: `Exportar ${items.length} citação${items.length > 1 ? "ões" : ""} ABNT`,
  });
}

// ── iconometric bars for one entry ────────────────────────────
function IndicatorBars({ it, compact }) {
  const r = reg(it.regime);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: compact ? 3 : 5 }}>
      {ICONOCRACY_INDICATORS.map((ind) => {
        const v = (it.indicators && it.indicators[ind.id]) || 0;
        return (
          <div key={ind.id} style={{ display: "flex", alignItems: "center", gap: 9 }} title={ind.description}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--warm-gray, #6F665C)", width: compact ? 30 : 118, textAlign: "right", letterSpacing: ".3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{compact ? ind.id : ind.label}</span>
            <div style={{ flex: 1, height: 6, background: "color-mix(in srgb, var(--ink) 8%, transparent)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: (v / 3 * 100) + "%", height: "100%", background: r.color, borderRadius: 3 }} />
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--ink-3, #8D8377)", width: 8 }}>{v}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── radar comparing up to two entries ─────────────────────────
function Radar({ series, size = 300 }) {
  const cx = size / 2, cy = size / 2, R = size / 2 - 38, N = ICONOCRACY_INDICATORS.length;
  const ang = (i) => (Math.PI * 2 * i) / N - Math.PI / 2;
  const pt = (i, rad) => [cx + Math.cos(ang(i)) * rad, cy + Math.sin(ang(i)) * rad];
  const poly = (scores) => ICONOCRACY_INDICATORS.map((ind, i) => pt(i, ((scores[ind.id] || 0) / 3) * R).join(",")).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }} role="img" aria-label="Radar comparativo dos dez indicadores iconométricos entre as duas figuras selecionadas">
      {[1, 2, 3].map((ring) => (
        <polygon key={ring} points={ICONOCRACY_INDICATORS.map((_, i) => pt(i, (ring / 3) * R).join(",")).join(" ")} fill="none" stroke="var(--light-border,#D4C19A)" strokeWidth="1" opacity={ring === 3 ? .8 : .4} />
      ))}
      {ICONOCRACY_INDICATORS.map((ind, i) => {
        const [x, y] = pt(i, R);
        const [lx, ly] = pt(i, R + 16);
        return (
          <g key={ind.id}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--light-border,#D4C19A)" strokeWidth="1" opacity=".4" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "var(--font-mono)", fontSize: 8, fill: "var(--warm-gray,#6F665C)", letterSpacing: ".3px" }}>{ind.id}</text>
          </g>
        );
      })}
      {series.map((s, si) => (
        <polygon key={si} points={poly(s.scores)} fill={`color-mix(in srgb, ${s.color} ${si ? 10 : 18}%, transparent)`} stroke={s.color} strokeWidth="2" strokeDasharray={si ? "5 3" : "none"} />
      ))}
      {series.map((s, si) => ICONOCRACY_INDICATORS.map((ind, i) => {
        const [x, y] = pt(i, ((s.scores[ind.id] || 0) / 3) * R);
        return <circle key={si + "-" + i} cx={x} cy={y} r="2.4" fill={s.color} />;
      }))}
    </svg>
  );
}

// ── LEARNING MODE ─────────────────────────────────────────────
const STEPS = [
  { k: "descrever", n: "01", label: "Descrever", prompt: "Antes de interpretar: descreva o que vê. Corpo, vestes, atributos, enquadramento, inscrições. Só o visível." },
  { k: "comparar",  n: "02", label: "Comparar",  prompt: "Coloque a peça-guia ao lado da comparação. O que se repete entre as duas? O que muda? Onde o corpo endurece?" },
  { k: "hipotese",  n: "03", label: "Hipótese",  prompt: "Arrisque uma leitura. Que função do Estado este corpo executa — e a quem ela serve?" },
];

function panelHeroFor(p, entriesById) {
  // Prefer an entry whose regime matches the panel regime; fall back to the first entry of that regime.
  const match = Object.values(entriesById).find((it) => it.regime === p.regime);
  return match || Object.values(entriesById)[0];
}
function panelComparisonFor(p, entriesById, hero) {
  const others = Object.values(entriesById).filter((it) => it.id !== hero.id && it.regime === p.regime);
  return others.slice(0, 2);
}

// ── notebook export · gathers every saved note into a Markdown dossier ──
function gatherNotes(panels) {
  const out = [];
  panels.forEach((p) => {
    const stepNotes = STEPS.map((s) => ({ label: s.label, text: loadNote(p.id + "." + s.k) })).filter((x) => x.text.trim());
    const research = loadNote(p.id + ".research");
    if (stepNotes.length || research.trim()) out.push({ panel: p, stepNotes, research });
  });
  return out;
}
function countNotes(panels) {
  return gatherNotes(panels).reduce((n, d) => n + d.stepNotes.length + (d.research.trim() ? 1 : 0), 0);
}
function downloadNotes(panels) {
  const data = gatherNotes(panels);
  let md = "# ICONOCRACIA · Atlas Lab — Caderno de inquérito\n\n";
  md += "_A alegoria feminina como tecnologia visual do Estado · exportado em " + new Date().toLocaleString("pt-BR") + "_\n\n";
  if (!data.length) { md += "_(Nenhuma anotação registrada ainda.)_\n"; }
  data.forEach((d) => {
    md += "## " + d.panel.label + "\n\n";
    if (d.panel.summary) md += "> " + d.panel.summary + "\n\n";
    d.stepNotes.forEach((s) => { md += "**" + s.label + "** — " + s.text + "\n\n"; });
    if (d.research.trim()) md += "**Nota de pesquisa** — " + d.research + "\n\n";
  });
  md += "\n---\n_ICONOCRACIA · Ana Vanzin · PPGD/UFSC · anavanzin.com/iconocracia_\n";
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "atlas-lab-caderno.md";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function LearningView({ panel, entriesById }) {
  const hero = panelHeroFor(panel, entriesById);
  const comps = panelComparisonFor(panel, entriesById, hero);
  const comp = comps[0] || Object.values(entriesById).find((it) => it.id !== hero.id) || hero;
  const [step, setStep] = useState(0);
  const [notes, setNotes] = useState({});
  const vw = useViewport();
  const stack = vw < 680;

  useEffect(() => {
    const init = {};
    STEPS.forEach((s) => { init[s.k] = loadNote(panel.id + "." + s.k); });
    setNotes(init); setStep(0);
  }, [panel.id]);

  if (!hero) {
    return (
      <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-2)", padding: "20px 0" }}>
        Nenhuma entrada do corpus disponível para este painel.
      </div>
    );
  }
  const setNote = (k, v) => { setNotes((n) => ({ ...n, [k]: v })); saveNote(panel.id + "." + k, v); };
  const done = STEPS.filter((s) => (notes[s.k] || "").trim().length > 0).length;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: stack ? "1fr" : "1.15fr 1fr", gap: 18, marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "2px", color: "var(--gold)", textTransform: "uppercase", marginBottom: 6 }}>Peça-guia</div>
          <Plate it={hero} h={stack ? 260 : 320} onPresent={(it) => openPlatePresent(it, entriesById)} />
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "2px", color: "var(--gold)", textTransform: "uppercase", marginBottom: 6 }}>Comparação</div>
          <Plate it={comp} h={stack ? 260 : 320} onPresent={(it) => openPlatePresent(it, entriesById)} />
        </div>
      </div>

      {/* stepper */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {STEPS.map((s, i) => {
          const active = i === step, filled = (notes[s.k] || "").trim().length > 0;
          return (
            <button key={s.k} onClick={() => setStep(i)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 14px", cursor: "pointer", border: `1px solid ${active ? "var(--brand-amethyst)" : "var(--light-border)"}`, background: active ? "rgba(138,95,168,.08)" : "var(--surface-card,#FBF7EE)", borderRadius: "var(--radius-sm)" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, background: filled ? "var(--brand-amethyst)" : "transparent", border: `1.5px solid ${filled ? "var(--brand-amethyst)" : "var(--light-border)"}`, boxShadow: active ? "0 0 0 3px rgba(138,95,168,.18)" : "none" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "1px", color: "var(--ink-3,#8D8377)" }}>{s.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, color: "var(--ink)" }}>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* current step body */}
      <div style={{ background: "var(--surface-folio,#F3ECDB)", border: "1px solid var(--light-border)", borderLeft: "3px solid var(--brand-amethyst)", borderRadius: "var(--radius-sm)", padding: "18px 20px" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2,#6F665C)", margin: "0 0 12px" }}>{STEPS[step].prompt}</p>
        <textarea value={notes[STEPS[step].k] || ""} onChange={(e) => setNote(STEPS[step].k, e.target.value)} placeholder="Escreva sua leitura…" rows={4} aria-label={"Anotação da etapa " + STEPS[step].label}
          style={{ width: "100%", boxSizing: "border-box", resize: "vertical", border: "1px solid var(--light-border)", borderRadius: "var(--radius-sm)", background: "var(--surface-card,#FBF7EE)", padding: "11px 13px", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink)", lineHeight: 1.55, outline: "none" }} />
        {step === 1 && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "2px", color: "var(--gold)", textTransform: "uppercase", marginBottom: 8 }}>Iconometria · peça-guia vs comparação</div>
            <Radar series={[{ scores: hero.indicators, color: reg(hero.regime).color, label: hero.title }, { scores: comp.indicators, color: reg(comp.regime).color, label: comp.title }]} size={260} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "1px", color: "var(--ink-3,#8D8377)" }}>{done}/3 etapas anotadas · salvo localmente</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={navBtn(step === 0)}>Anterior</button>
          <button onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))} disabled={step === STEPS.length - 1} style={navBtn(step === STEPS.length - 1, true)}>Próxima</button>
        </div>
      </div>
    </div>
  );
}
const navBtn = (disabled, primary) => ({ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", padding: "8px 16px", borderRadius: "var(--radius-sm)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? .4 : 1, border: `1px solid ${primary ? "var(--terracotta)" : "var(--light-border)"}`, background: primary ? "var(--terracotta)" : "transparent", color: primary ? "var(--cream,#F3ECDB)" : "var(--ink-2,#6F665C)" });

// ── RESEARCH MODE ─────────────────────────────────────────────
function pairQuestion(a, b) {
  return `Compare ${a.title} (${a.country}, ${a.year}) com ${b.title} (${b.country}, ${b.year}) pelos dez indicadores: onde o corpo endurece, e que função isso serve?`;
}

function openPlatePresent(it, entriesById) {
  const all = Object.values(entriesById);
  const idx = all.findIndex((x) => x.id === it.id);
  if (typeof window.openPresentMode === "function") {
    window.openPresentMode(all, Math.max(0, idx));
  }
}

function ResearchView({ panel, entriesById, compare }) {
  const hero = panelHeroFor(panel, entriesById);
  const candidates = Object.values(entriesById).filter((it) => it.id !== hero.id);
  const [sel, setSel] = useState([hero.id, (candidates[0] || hero).id]);
  const [rnote, setRnote] = useState("");
  const vw = useViewport();
  const stack = vw < 900;

  // faceted filters for the research entry rail
  const filterState = window.useFilters({ corpus: [hero, ...candidates] });
  const { filtered, domain, filters, toggle: toggleFilter, setYear, clear, resultCount } = filterState;
  const [filterOpen, setFilterOpen] = useState(false);
  const activeFilters = filters.regime.length + filters.country.length + filters.support.length + (filters.yearMin || filters.yearMax ? 1 : 0);
  const showFilters = vw >= 720;

  useEffect(() => {
    const h = panelHeroFor(panel, entriesById);
    const cands = Object.values(entriesById).filter((it) => it.id !== h.id);
    setSel([h.id, (cands[0] || h).id]);
    setRnote(loadNote(panel.id + ".research"));
  }, [panel.id, entriesById]);

  const toggle = (id) => setSel((s) => {
    if (s.includes(id)) { return s.length > 1 ? s.filter((x) => x !== id) : s; }
    return [s[s.length - 1], id];
  });
  const setResearchNote = (v) => { setRnote(v); saveNote(panel.id + ".research", v); };

  const A = entriesById[sel[0]], B = entriesById[sel[1]];
  if (!A || !B) return null;
  const question = pairQuestion(A, B);

  const middle = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <Radar series={[{ scores: A.indicators, color: reg(A.regime).color }, { scores: B.indicators, color: reg(B.regime).color }]} size={stack ? 280 : 300} />
      <div style={{ background: "var(--surface-folio,#F3ECDB)", border: "1px solid var(--light-border)", borderLeft: "3px solid var(--terracotta)", borderRadius: "var(--radius-sm)", padding: "12px 14px", width: "100%", boxSizing: "border-box" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "2px", color: "var(--terracotta)", textTransform: "uppercase", marginBottom: 5 }}>Pergunta-guia</div>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, lineHeight: 1.35, color: "var(--ink)", margin: 0 }}>{question}</p>
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "2px", color: "var(--gold)", textTransform: "uppercase", marginBottom: 6 }}>Nota de pesquisa · salva localmente</div>
        <textarea value={rnote} onChange={(e) => setResearchNote(e.target.value)} placeholder="Registre a codificação, a divergência entre as duas figuras, a interpretação…" rows={4} aria-label="Nota de pesquisa"
          style={{ width: "100%", boxSizing: "border-box", resize: "vertical", border: "1px solid var(--light-border)", borderRadius: "var(--radius-sm)", background: "var(--surface-card,#FBF7EE)", padding: "11px 13px", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink)", lineHeight: 1.55, outline: "none" }} />
      </div>
    </div>
  );

  return (
    <div>
      {/* entry rail for this panel */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "2px", color: "var(--gold)", textTransform: "uppercase" }}>Entradas do painel · {resultCount} disponíveis · selecione duas</div>
        {!showFilters && React.createElement("button", {
          type: "button",
          onClick: () => setFilterOpen((o) => !o),
          "aria-expanded": filterOpen,
          style: {
            display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", border: `1px solid ${filterOpen ? "var(--brand-amethyst)" : "var(--light-border)"}`,
            borderRadius: 999, background: filterOpen ? "rgba(138,95,168,.08)" : "transparent", color: "var(--ink)", cursor: "pointer",
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "1px", textTransform: "uppercase"
          }
        }, "Filtros", activeFilters > 0 && React.createElement("span", { style: { background: "var(--brand-amethyst)", color: "#F4ECD8", borderRadius: 999, padding: "1px 5px", fontSize: 8, marginLeft: 4 } }, activeFilters))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: showFilters ? "minmax(260px, 300px) 1fr" : "1fr", gap: 18, alignItems: "start", marginBottom: 22 }}>
        {(showFilters || filterOpen) && (
          showFilters ? (
            <window.FilterPanel
              filters={filters}
              domain={domain}
              onToggle={toggleFilter}
              onSetYear={setYear}
              onClear={clear}
              resultCount={resultCount}
              compact={false}
            />
          ) : (
            <div style={{ position: "fixed", inset: 0, zIndex: 2147483639, background: "var(--surface-page,#EFE5CF)", overflowY: "auto", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, color: "var(--ink)" }}>Filtros</span>
                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  aria-label="Fechar filtros"
                  style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid var(--light-border)", background: "var(--surface-card,#FBF7EE)", color: "var(--ink)", cursor: "pointer", fontSize: 18 }}
                >×</button>
              </div>
              <window.FilterPanel
                filters={filters}
                domain={domain}
                onToggle={toggleFilter}
                onSetYear={setYear}
                onClear={clear}
                resultCount={resultCount}
                compact={true}
              />
            </div>
          )
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(118px, 1fr))", gap: 12 }}>
          {filtered.map((it) => (
            <div key={it.id} style={{ position: "relative" }}>
              <Plate it={it} h={150} onClick={() => toggle(it.id)} selected={sel.includes(it.id)} onPresent={(it) => openPlatePresent(it, entriesById)} />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); compare.toggle(it.id); }}
                aria-pressed={compare.has(it.id)}
                aria-label={compare.has(it.id) ? `Remover ${it.title} da comparação` : `Adicionar ${it.title} à comparação`}
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  border: `1px solid ${compare.has(it.id) ? "var(--brand-amethyst)" : "rgba(244,236,216,.55)"}`,
                  background: compare.has(it.id) ? "var(--brand-amethyst)" : "rgba(13,16,30,.55)",
                  color: compare.has(it.id) ? "#F4ECD8" : "#F4ECD8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  lineHeight: 1,
                  zIndex: 2,
                }}
              >
                {compare.has(it.id) ? "−" : "+"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* comparison workspace */}
      {stack ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {middle}
          <div style={{ display: "grid", gridTemplateColumns: vw < 560 ? "1fr" : "1fr 1fr", gap: 18 }}>
            <CompareCol it={A} entriesById={entriesById} />
            <CompareCol it={B} entriesById={entriesById} />
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px 1fr", gap: 20, alignItems: "start" }}>
          <CompareCol it={A} align="left" entriesById={entriesById} />
          {middle}
          <CompareCol it={B} align="right" entriesById={entriesById} />
        </div>
      )}
    </div>
  );
}

function CompareCol({ it, entriesById }) {
  return (
    <div>
      <Plate it={it} h={240} onPresent={(it) => openPlatePresent(it, entriesById)} />
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, color: "var(--ink)", lineHeight: 1.18 }}>{it.title}</div>
      </div>
      <div style={{ margin: "9px 0 12px" }}><RegimeBadge id={it.regime} /></div>
      <IndicatorBars it={it} />
      {it.note && <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, lineHeight: 1.55, color: "var(--ink-2,#6F665C)", marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--light-border)" }}>{it.note}</p>}
    </div>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────
function App() {
  const [mode, setMode] = useState("learning");
  const [entries, setEntries] = useState(null);
  const [entriesById, setEntriesById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [presentOpen, setPresentOpen] = useState(false);
  const [presentItems, setPresentItems] = useState([]);
  const [presentStart, setPresentStart] = useState(0);
  const compare = window.useCompare(entriesById);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const items = await loadCorpus();
        if (cancelled) return;
        const byId = Object.fromEntries(items.map((it) => [it.id, it]));
        setEntries(items);
        setEntriesById(byId);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const panels = ICONOCRACY_PANELS_V1.filter((p) => p.modes.includes(mode));
  const [panelId, setPanelId] = useState(panels[0].id);
  useEffect(() => {
    const ps = ICONOCRACY_PANELS_V1.filter((p) => p.modes.includes(mode));
    if (!ps.find((p) => p.id === panelId)) setPanelId(ps[0].id);
  }, [mode]);
  const panel = ICONOCRACY_PANELS_V1.find((p) => p.id === panelId);

  const vw = useViewport();
  const narrow = vw < 880;
  const tight = vw < 560;
  const [nNotes, setNNotes] = useState(0);
  useEffect(() => { setNNotes(countNotes(ICONOCRACY_PANELS_V1)); }, [mode, panelId, entries]);
  const refreshCount = () => setNNotes(countNotes(ICONOCRACY_PANELS_V1));

  const railItems = panels.map((p) => {
    const active = p.id === panelId, r = reg(p.regime);
    return { p, active, r };
  });

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-page,#EFE5CF)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ink-3,#8D8377)" }}>
        Carregando corpus…
      </div>
    );
  }

  if (error || !entries || entries.length === 0) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 40, background: "var(--surface-page,#EFE5CF)", fontFamily: "var(--font-body)", color: "var(--ink)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 24 }}>Não foi possível carregar o corpus</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--terracotta)" }}>{error || "Nenhuma entrada disponível."}</div>
      </div>
    );
  }

  window.openPresentMode = (items, startIndex) => {
    setPresentItems(items || []);
    setPresentStart(startIndex || 0);
    setPresentOpen(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page,#EFE5CF)", backgroundImage: "var(--grain)", backgroundSize: "200px", paddingBottom: compare.count > 0 ? 132 : 0 }}>
      <window.ThemeToggle position="bottom-right" />
      {compareOpen && <window.CompareView selected={compare.selected} onClose={() => setCompareOpen(false)} />}
      {presentOpen && window.PresentMode && <window.PresentMode items={presentItems} startIndex={presentStart} onClose={() => setPresentOpen(false)} />}
      <window.CompareTray compare={compare} onOpen={() => setCompareOpen(true)} />
      {/* header */}
      <header style={{ background: "var(--cabinet-grad)", borderBottom: "1px solid var(--hairline-dark)", padding: tight ? "13px 18px" : "16px 32px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <a href="https://anavanzin.com/" aria-label="Voltar para anavanzin.com" style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: "var(--faded-on-dark,#9A9AB0)", textDecoration: "none" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold-bright,#D4A85E)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--faded-on-dark,#9A9AB0)"}>
          <svg width="14" height="10" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 5.5H1M6 1 1 5.5 6 10"/></svg>
          {tight ? "" : "anavanzin.com"}
        </a>
        <div style={{ width: 1, height: 18, background: "var(--hairline-dark)", flexShrink: 0 }} />
        <div style={{ display: "flex", alignItems: "baseline", gap: tight ? 10 : 16, flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: tight ? 18 : 22, letterSpacing: "3px", color: "var(--ivory-light,#F4ECD8)" }}>ICONOCRACIA</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "2.5px", color: "var(--gold-bright,#D4A85E)", textTransform: "uppercase", whiteSpace: "nowrap" }}>Atlas Lab · v1</span>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          {/* export notebook */}
          <button onClick={() => { downloadNotes(ICONOCRACY_PANELS_V1); refreshCount(); }} title="Baixar todas as anotações em Markdown" aria-label="Exportar caderno de anotações em Markdown"
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", cursor: "pointer", border: "1px solid var(--hairline-dark)", borderRadius: 999, background: "transparent", color: "var(--gold-bright,#D4A85E)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/></svg>
            {tight ? "" : "Exportar"}{nNotes ? <span style={{ background: "var(--brand-amethyst)", color: "#F4ECD8", borderRadius: 999, padding: "1px 6px", fontSize: 8.5 }}>{nNotes}</span> : null}
          </button>
          {/* mode toggle */}
          <div style={{ display: "flex", border: "1px solid var(--hairline-dark)", borderRadius: 999, overflow: "hidden", flexShrink: 0 }}>
            {[["learning", "Aprendizagem"], ["research", "Pesquisa"]].map(([m, lbl]) => (
              <button key={m} onClick={() => setMode(m)} aria-label={lbl} aria-pressed={mode === m} style={{ display: "flex", alignItems: "center", gap: 7, padding: tight ? "8px 12px" : "8px 16px", cursor: "pointer", border: "none", background: mode === m ? "var(--brand-amethyst)" : "transparent", color: mode === m ? "#F4ECD8" : "#CDC8DA", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                {m === "learning" ? IcoEye : IcoLayers}{tight ? "" : lbl}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* mission strip */}
      <div style={{ padding: tight ? "10px 18px" : "10px 32px", background: "color-mix(in srgb, var(--deep-blue) 6%, transparent)", borderBottom: "1px solid var(--light-border)" }}>
        <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 13.5, color: "var(--ink-2,#6F665C)" }}>{ATLAS_LAB_PLATFORM.uiNote}</span>
      </div>

      {narrow ? (
        // ── mobile/tablet: horizontal Prumo strip + full-width main ──
        <div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: tight ? "12px 18px" : "14px 32px", background: "var(--cabinet-grad)", borderBottom: "1px solid var(--hairline-dark)", WebkitOverflowScrolling: "touch" }}>
            {railItems.map(({ p, active, r }) => (
              <button key={p.id} onClick={() => setPanelId(p.id)} aria-current={active ? "true" : undefined} style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0, padding: "8px 14px", cursor: "pointer", borderRadius: 999, border: `1px solid ${active ? "var(--plumb-node)" : "var(--hairline-dark)"}`, background: active ? "rgba(138,95,168,.16)" : "transparent" }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", flexShrink: 0, background: active ? "var(--plumb-node)" : "transparent", border: `1.5px solid ${active ? "var(--plumb-node)" : "var(--hairline-dark)"}` }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: r.color }}>{r.roman}</span>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15, whiteSpace: "nowrap", color: active ? "var(--ivory-light,#F4ECD8)" : "var(--faded-on-dark,#9A9AB0)" }}>{p.label}</span>
              </button>
            ))}
          </div>
          <PanelMain panel={panel} mode={mode} tight={tight} entriesById={entriesById} compare={compare} />
        </div>
      ) : (
        // ── desktop: sticky vertical Prumo rail ──
        <div style={{ display: "grid", gridTemplateColumns: "248px 1fr", alignItems: "start" }}>
          <aside style={{ position: "sticky", top: 0, alignSelf: "start", background: "var(--cabinet-grad)", borderRight: "1px solid var(--hairline-dark)", minHeight: "calc(100vh - 96px)", padding: "20px 0 24px" }}>
            <div style={{ position: "absolute", left: 28, top: 56, bottom: 28, width: 1, background: "var(--plumb-line)", pointerEvents: "none" }} />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "2.5px", color: "var(--gold-bright,#D4A85E)", textTransform: "uppercase", padding: "0 18px 10px 44px" }}>{ATLAS_LAB_MODULES.iconocracy.shortName} · painéis</div>
            {railItems.map(({ p, active, r }) => (
              <button key={p.id} onClick={() => setPanelId(p.id)} aria-current={active ? "true" : undefined} style={{ display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left", padding: "9px 16px 9px 22px", cursor: "pointer", border: "none", background: active ? "rgba(232,220,196,.06)" : "transparent" }}>
                <span style={{ width: 14, height: 14, borderRadius: "50%", flexShrink: 0, background: active ? "var(--plumb-node)" : "transparent", border: `1.5px solid ${active ? "var(--plumb-node)" : "var(--hairline-dark)"}`, boxShadow: active ? "0 0 0 3px var(--plumb-halo)" : "none" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: r.color, width: 22 }}>{p.regime ? reg(p.regime).roman : "·"}</span>
                <span style={{ flex: 1, fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15.5, lineHeight: 1.1, color: active ? "var(--ivory-light,#F4ECD8)" : "var(--faded-on-dark,#9A9AB0)" }}>{p.label}</span>
              </button>
            ))}
            <div style={{ padding: "20px 18px 0 44px", marginTop: 14 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 7, letterSpacing: "2px", color: "var(--faded-on-dark,#9A9AB0)", opacity: .6, lineHeight: 1.8, textTransform: "uppercase" }}>{mode === "learning" ? "Observe · descreva · compare · hipótese" : "Observe · codifique · interprete"}</div>
            </div>
          </aside>
          <PanelMain panel={panel} mode={mode} tight={tight} entriesById={entriesById} compare={compare} />
        </div>
      )}
    </div>
  );
}

function PanelMain({ panel, mode, tight, entriesById, compare }) {
  return (
    <main style={{ padding: tight ? "20px 18px 56px" : "26px 32px 60px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
        <div>
          <RegimeBadge id={panel.regime} />
          <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: tight ? 25 : 30, color: "var(--ink)", margin: "8px 0 4px" }}>{panel.label}</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2,#6F665C)", margin: 0, maxWidth: "70ch" }}>{panel.summary}</p>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "1.5px", color: "var(--ink-3,#8D8377)", textTransform: "uppercase", whiteSpace: "nowrap" }}>{mode === "learning" ? "Modo Aprendizagem" : "Modo Pesquisa"}</span>
      </div>
      <div style={{ borderTop: "1px solid var(--gold)", borderBottom: "1px solid var(--gold)", height: 4, margin: "0 0 26px" }} />
      {mode === "learning" ? <LearningView panel={panel} entriesById={entriesById} /> : <ResearchView panel={panel} entriesById={entriesById} compare={compare} />}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
