// Atlas-site — theme engine, shared atoms, and section components.
(function () {
const D = window.AtlasData;

const REG = { FUNDACIONAL:"var(--c-fund)", NORMATIVO:"var(--c-norm)", MILITAR:"var(--c-mil)", CONTRA_ALEGORIA:"var(--c-accent)" };

// Resolve an asset path → inlined blob URL when bundled standalone (keyed by
// filename via <meta name="ext-resource-dependency">), else the original path.
const RES = (p) => { const f = String(p).split("/").pop(); return (window.__resources && window.__resources[f]) || p; };

// ── Theme → CSS custom properties ───────────────────────────────
function atlasTheme(t) {
  const light = {
    "--c-ground":"#EFE5CF", "--c-panel":"#F8F5EE", "--c-panel-2":"rgba(255,255,255,.42)",
    "--c-ink":"#1A1612", "--c-ink-2":"#6F665C", "--c-ink-3":"#8D8377",
    "--c-border":"#D4C19A", "--c-hair":"rgba(184,146,74,.5)",
    "--c-gold":"#B8924A", "--c-plate":"#1D2548", "--c-on-accent":"#F8F5EE",
    "--c-grain":"var(--grain)",
  };
  const dark = {
    "--c-ground":"#171D38", "--c-panel":"#1F274A", "--c-panel-2":"rgba(255,255,255,.05)",
    "--c-ink":"#EFE6D2", "--c-ink-2":"#C7BCA6", "--c-ink-3":"#9A9276",
    "--c-border":"rgba(184,146,74,.34)", "--c-hair":"rgba(184,146,74,.4)",
    "--c-gold":"#D4A85E", "--c-plate":"#0E142C", "--c-on-accent":"#0E142C",
    "--c-grain":"none",
  };
  const base = t.tone === "cabinet" ? dark : light;
  const dens = { compacto:["56px","16px"], regular:["88px","22px"], amplo:["124px","32px"] }[t.density] || ["88px","22px"];
  return {
    ...base,
    "--c-accent": t.accent || "#A04030",
    "--c-fund":"#6B52B0", "--c-norm":"#2A7A5A", "--c-mil":"#B23636",
    "--scale": t.scale || 1,
    "--t-hero": "calc(62px * var(--scale))",
    "--t-h1": "calc(38px * var(--scale))",
    "--t-h2": "calc(25px * var(--scale))",
    "--t-h3": "calc(19px * var(--scale))",
    "--t-body": "calc(16px * var(--scale))",
    "--t-small": "calc(13px * var(--scale))",
    "--pad-sec": dens[0], "--gap": dens[1],
  };
}
const heroCols = (s) => ({ "equilíbrio":"1.05fr .95fr", "imagem dominante":"0.78fr 1.22fr", "texto dominante":"1.45fr .7fr" }[s] || "1.05fr .95fr");
const corpusMin = (d) => ({ compacto:"150px", regular:"182px", amplo:"232px" }[d] || "182px");

// ── Atoms ────────────────────────────────────────────────────────
const Cap = ({ children, style }) => <div className="mono" style={{ fontSize:"calc(10px * var(--scale))", letterSpacing:"3px", textTransform:"uppercase", color:"var(--c-gold)", ...style }}>{children}</div>;
const DoubleRule = ({ style }) => <div style={{ borderTop:"1px solid var(--c-gold)", borderBottom:"1px solid var(--c-gold)", height:4, ...style }} />;

function Plate({ it, label }) {
  return (
    <figure style={{ margin:0, position:"relative", aspectRatio:"3/4", overflow:"hidden", background:"var(--c-plate)", border:"1px solid var(--c-gold)", boxShadow:"var(--shadow-plate)", borderRadius:"var(--radius-sm)" }}>
      <img src={RES(it.img)} alt={it.title} loading="lazy" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
      {label !== false && (
        <figcaption style={{ position:"absolute", left:0, right:0, bottom:0, background:"linear-gradient(180deg,transparent,rgba(13,16,30,.92))", borderTop:"1px solid var(--c-gold)", padding:"18px 9px 7px" }}>
          <div className="mono" style={{ fontSize:7, letterSpacing:"2px", color:"var(--c-gold)", textTransform:"uppercase" }}>{it.country} · {it.year} · {it.support}</div>
          <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"calc(13px * var(--scale))", color:"#E8DCC4", marginTop:2, lineHeight:1.15 }}>{it.title}</div>
        </figcaption>
      )}
    </figure>
  );
}

function Badge({ children, color }) {
  return <span className="mono" style={{ fontSize:9, letterSpacing:"1px", padding:"3px 9px", borderRadius:999, background:`color-mix(in srgb, ${color} 18%, transparent)`, color }}>{children}</span>;
}

// ── Sections ─────────────────────────────────────────────────────
function Nav({ tone, onTone }) {
  const links = [["argumento","Tese"],["anatomia","Anatomia"],["corpus","Corpus"],["atlas","Atlas"],["radiografia","Radiografia"],["lexico","Léxico"],["metodo","Método"]];
  const jump = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior:"smooth" }); };
  return (
    <nav style={{ position:"sticky", top:0, zIndex:40, display:"flex", alignItems:"center", gap:18, padding:"14px 40px", background:"color-mix(in srgb, var(--c-ground) 86%, transparent)", backdropFilter:"blur(8px)", borderBottom:"1px solid var(--c-border)" }}>
      <a href="https://anavanzin.com/" className="mono" style={{ display:"flex", alignItems:"center", gap:6, fontSize:9, letterSpacing:"2px", textTransform:"uppercase", color:"var(--c-ink-3)", textDecoration:"none" }}
        onMouseEnter={e=>e.currentTarget.style.color="var(--c-accent)"} onMouseLeave={e=>e.currentTarget.style.color="var(--c-ink-3)"}>
        <svg width="14" height="10" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 5.5H1M6 1 1 5.5 6 10"/></svg>
        anavanzin.com
      </a>
      <div style={{ width:1, height:18, background:"var(--c-border)" }} />
      <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
        <span style={{ fontFamily:"var(--font-display)", fontSize:"calc(20px * var(--scale))", letterSpacing:"3px", color:"var(--c-ink)" }}>ICONOCRACIA</span>
        <span className="mono" style={{ fontSize:8, letterSpacing:"2.5px", color:"var(--c-gold)", textTransform:"uppercase" }}>Atlas</span>
      </div>
      <div style={{ marginLeft:"auto", display:"flex", gap:18, alignItems:"center" }}>
        {links.map(([id,l]) => (
          <button key={id} onClick={()=>jump(id)} className="mono" style={{ background:"none", border:"none", cursor:"pointer", fontSize:10, letterSpacing:"1.5px", textTransform:"uppercase", color:"var(--c-ink-2)", padding:0 }}
            onMouseEnter={e=>e.currentTarget.style.color="var(--c-accent)"} onMouseLeave={e=>e.currentTarget.style.color="var(--c-ink-2)"}>{l}</button>
        ))}
      </div>
    </nav>
  );
}

function Hero({ t }) {
  const d = D.thesis;
  return (
    <header id="topo" style={{ padding:"var(--pad-sec) 40px", display:"grid", gridTemplateColumns:heroCols(t.heroSplit), gap:"56px", alignItems:"center", position:"relative" }}>
      <div style={{ position:"relative" }}>
        <div style={{ width:200, height:1, background:"var(--c-gold)", marginBottom:24, position:"relative" }}>
          <span style={{ position:"absolute", left:0, top:-3, width:64, height:1, background:"var(--c-accent)" }} />
        </div>
        <Cap>{t.kicker || d.kicker}</Cap>
        <h1 style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-hero)", lineHeight:1.02, color:"var(--c-ink)", margin:"16px 0 0", maxWidth:"15ch" }}>{(t.title || d.title)}</h1>
        <p style={{ fontFamily:"var(--font-body)", fontSize:"calc(18px * var(--scale))", lineHeight:1.65, color:"var(--c-ink-2)", margin:"22px 0 0", maxWidth:"54ch" }}>{d.lede}</p>
        <div style={{ display:"flex", gap:14, marginTop:26, flexWrap:"wrap" }} className="mono">
          <span style={{ fontSize:11, letterSpacing:"2px", textTransform:"uppercase", color:"var(--c-ink-3)" }}>{d.author}</span>
          <span style={{ fontSize:11, letterSpacing:"2px", textTransform:"uppercase", color:"var(--c-ink-3)" }}>· {d.group}</span>
          <span style={{ fontSize:11, letterSpacing:"2px", textTransform:"uppercase", color:"var(--c-gold)" }}>· {d.year}</span>
        </div>
      </div>
      <figure style={{ margin:0, position:"relative", aspectRatio:"4/5", border:"1px solid var(--c-gold)", overflow:"hidden", background:"var(--c-plate)", boxShadow:"var(--shadow-plate)" }}>
        <img src={RES(d.heroImg)} alt={d.heroCap} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <span style={{ position:"absolute", top:8, left:8, width:16, height:16, borderTop:"1px solid var(--c-gold)", borderLeft:"1px solid var(--c-gold)" }} />
        <span style={{ position:"absolute", bottom:8, right:8, width:16, height:16, borderBottom:"1px solid var(--c-gold)", borderRight:"1px solid var(--c-gold)" }} />
        <figcaption className="mono" style={{ position:"absolute", left:0, right:0, bottom:0, background:"linear-gradient(180deg,transparent,rgba(13,16,30,.94))", padding:"26px 12px 9px", fontSize:8, letterSpacing:"1.5px", color:"var(--c-gold)", textTransform:"uppercase", lineHeight:1.5 }}>{d.heroCap}</figcaption>
      </figure>
    </header>
  );
}

function Stats() {
  return (
    <section style={{ padding:"0 40px calc(var(--pad-sec) * .6)", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"var(--gap)" }}>
      {D.stats.map((s,i) => (
        <div key={i} style={{ position:"relative", background:"var(--c-panel)", border:"1px solid var(--c-border)", padding:"18px 18px 14px", backgroundImage:"var(--c-grain)", backgroundSize:"200px" }}>
          <span style={{ position:"absolute", top:0, left:0, right:0, height:2, background: i%2 ? "var(--c-accent)" : "var(--c-gold)" }} />
          <Cap>{s.l}</Cap>
          <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"calc(40px * var(--scale))", lineHeight:1, color:"var(--c-ink)", marginTop:4 }}>{s.v}</div>
          <div className="mono" style={{ fontSize:8, letterSpacing:"1px", color:"var(--c-ink-3)", marginTop:6 }}>{s.s}</div>
        </div>
      ))}
    </section>
  );
}

function Argument() {
  const a = D.argument;
  return (
    <section id="argumento" style={{ padding:"var(--pad-sec) 40px", borderTop:"1px solid var(--c-border)" }}>
      <Cap>{a.cap}</Cap>
      <DoubleRule style={{ margin:"16px 0 32px" }} />
      <div style={{ display:"grid", gridTemplateColumns:"1.4fr .9fr", gap:"56px", alignItems:"start" }}>
        <p style={{ fontFamily:"var(--font-body)", fontSize:"calc(20px * var(--scale))", lineHeight:1.85, color:"var(--c-ink)", margin:0 }}>
          <span style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"calc(64px * var(--scale))", lineHeight:.7, color:"var(--c-accent)", float:"left", padding:"6px 12px 0 0" }}>{a.drop}</span>
          {a.body}
        </p>
        <blockquote style={{ margin:0, paddingLeft:20, borderLeft:"3px solid var(--c-accent)", fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"calc(24px * var(--scale))", lineHeight:1.3, color:"var(--c-ink)" }}>{a.pull}</blockquote>
      </div>
    </section>
  );
}

function Anatomia() {
  const a = D.anatomia;
  return (
    <section id="anatomia" style={{ padding:"var(--pad-sec) 40px", borderTop:"1px solid var(--c-border)" }}>
      <Cap>{a.cap}</Cap>
      <h2 style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h1)", color:"var(--c-ink)", margin:"6px 0 0" }}>{a.title}</h2>
      <p style={{ fontFamily:"var(--font-body)", fontSize:"calc(18px * var(--scale))", color:"var(--c-ink-2)", lineHeight:1.78, maxWidth:"60ch", margin:"14px 0 0" }}>{a.lede}</p>
      <DoubleRule style={{ margin:"26px 0 32px" }} />
      <div style={{ display:"grid", gridTemplateColumns:"360px 1fr", gap:"56px", alignItems:"start" }}>
        {/* annotated figure — the female body read as an apparatus */}
        <figure style={{ margin:0, position:"relative", border:"1px solid var(--c-gold)", background:"var(--c-plate)", boxShadow:"var(--shadow-plate)", borderRadius:"var(--radius-sm)", overflow:"hidden" }}>
          <img src={RES(a.fig)} alt="" loading="lazy" style={{ display:"block", width:"100%", aspectRatio:"3/4", objectFit:"cover" }} />
          {/* plumb line down the central axis of the figure */}
          <div style={{ position:"absolute", left:"50%", top:"11%", bottom:"7%", width:1, background:"linear-gradient(180deg,var(--c-gold),rgba(184,146,74,.18))", transform:"translateX(-.5px)" }} />
          {a.parts.map(p => (
            <div key={p.n} style={{ position:"absolute", left:p.x, top:p.y, transform:"translate(-50%,-50%)", width:27, height:27, borderRadius:"50%", background:"var(--brand-amethyst)", border:"1.5px solid #E8DCC4", boxShadow:"0 0 0 4px rgba(138,95,168,.3), var(--shadow-plate)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-mono)", fontSize:11, color:"#F4F0E8" }}>{p.n}</div>
          ))}
          <figcaption className="mono" style={{ position:"absolute", left:0, right:0, bottom:0, background:"linear-gradient(180deg,transparent,rgba(13,16,30,.92))", borderTop:"1px solid var(--c-gold)", padding:"24px 12px 9px", fontSize:8, letterSpacing:"2px", color:"var(--c-gold)", textTransform:"uppercase" }}>{a.figCap}</figcaption>
        </figure>
        {/* legend — each part of the body → a function of the State */}
        <ol style={{ listStyle:"none", margin:0, padding:0 }}>
          {a.parts.map((p,i) => (
            <li key={p.n} style={{ display:"grid", gridTemplateColumns:"34px 1fr", gap:20, alignItems:"start", padding:"20px 0", borderTop:i ? "1px solid var(--c-hair)" : "none" }}>
              <span style={{ width:30, height:30, borderRadius:"50%", border:"1.5px solid var(--brand-amethyst)", color:"var(--brand-amethyst)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-mono)", fontSize:13 }}>{p.n}</span>
              <div>
                <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h3)", color:"var(--c-ink)", lineHeight:1.12 }}>{p.el}</div>
                <div style={{ fontFamily:"var(--font-body)", fontSize:"var(--t-body)", color:"var(--c-ink-2)", lineHeight:1.62, marginTop:6 }}>{p.fn}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CorpusWall({ t }) {
  const regs = ["FUNDACIONAL","NORMATIVO","MILITAR","CONTRA_ALEGORIA"];
  return (
    <section id="corpus" style={{ padding:"var(--pad-sec) 40px", borderTop:"1px solid var(--c-border)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16 }}>
        <div>
          <Cap>Corpus iconográfico · {D.corpus.length} placas em vitrine</Cap>
          <h2 style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h1)", color:"var(--c-ink)", margin:"6px 0 0" }}>A parede de espécimes</h2>
        </div>
        <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          {regs.map(r => (
            <span key={r} style={{ display:"flex", alignItems:"center", gap:6 }} className="mono">
              <span style={{ width:8, height:8, borderRadius:"50%", background:REG[r] }} />
              <span style={{ fontSize:9, letterSpacing:"1px", color:"var(--c-ink-2)", textTransform:"uppercase" }}>{D.REGIME_LABEL[r]}</span>
            </span>
          ))}
        </div>
      </div>
      <DoubleRule style={{ margin:"18px 0 24px" }} />
      <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fill,minmax(${corpusMin(t.density)},1fr))`, gap:"var(--gap)" }}>
        {D.corpus.map(it => (
          <div key={it.id} style={{ position:"relative" }}>
            <Plate it={it} />
            <span style={{ position:"absolute", top:8, left:8, width:9, height:9, borderRadius:"50%", background:REG[it.regime], boxShadow:"0 0 0 2px rgba(0,0,0,.25)" }} />
          </div>
        ))}
      </div>
    </section>
  );
}

function AtlasBand() {
  return (
    <section id="atlas" style={{ padding:"var(--pad-sec) 40px", backgroundColor:"#1A2143", backgroundImage:"linear-gradient(rgba(184,146,74,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,146,74,.06) 1px, transparent 1px), linear-gradient(160deg,#1A2143,#2A3360)", backgroundSize:"24px 24px, 24px 24px, cover", position:"relative" }}>
      <Cap style={{ color:"#D4A85E" }}>O Atlas Iconocrático · oito painéis · Warburg</Cap>
      <h2 style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h1)", color:"#EFE6D2", margin:"8px 0 0", maxWidth:"20ch" }}>Uma montagem que não resolve a tensão — a habita</h2>
      <div style={{ borderTop:"1px solid #B8924A", borderBottom:"1px solid #B8924A", height:4, margin:"24px 0 32px" }} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"var(--gap)" }}>
        {D.panels.map((p,i) => (
          <article key={p.n} style={{ position:"relative" }}>
            <div style={{ aspectRatio:"4/5", border:"1px solid #B8924A", overflow:"hidden", background:"#0E142C" }}>
              <img src={RES(D.panelImg[i])} alt={p.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:.92 }} />
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:10 }}>
              <span style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"calc(26px * var(--scale))", color:"#D4A85E", lineHeight:1 }}>{p.n}</span>
              <span style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"calc(18px * var(--scale))", color:"#EFE6D2" }}>{p.name}</span>
            </div>
            <p style={{ fontFamily:"var(--font-body)", fontSize:"calc(13px * var(--scale))", color:"#C7BCA6", lineHeight:1.45, margin:"4px 0 0" }}>{p.desc}</p>
            <div className="mono" style={{ fontSize:8, letterSpacing:"1.5px", color:"#9A9276", marginTop:4 }}>{p.period}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Radiografia() {
  const r = D.radiografia;
  const Spec = ({ s }) => (
    <div style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:18 }}>
      <div style={{ aspectRatio:"3/4", border:"1px solid var(--c-gold)", overflow:"hidden", background:"var(--c-plate)" }}><img src={RES(s.img)} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} /></div>
      <div>
        <Cap>{s.cap}</Cap>
        <h3 style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h3)", color:"var(--c-ink)", margin:"4px 0 10px" }}>{s.title}</h3>
        <Badge color={REG[s.regime]}>{D.REGIME_LABEL[s.regime]}</Badge>
        <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:5 }}>
          {r.indicators.map((name,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span className="mono" style={{ fontSize:8, color:"var(--c-ink-3)", width:96, textAlign:"right", letterSpacing:".3px" }}>{name}</span>
              <div style={{ flex:1, height:6, background:"color-mix(in srgb, var(--c-ink) 8%, transparent)", borderRadius:3, overflow:"hidden" }}>
                <div style={{ width:(s.scores[i]*10)+"%", height:"100%", background:"var(--c-mil)", borderRadius:3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <section id="radiografia" style={{ padding:"var(--pad-sec) 40px", borderTop:"1px solid var(--c-border)" }}>
      <Cap>{r.cap}</Cap>
      <h2 style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h1)", color:"var(--c-ink)", margin:"6px 0 0" }}>{r.title}</h2>
      <p style={{ fontFamily:"var(--font-body)", fontSize:"var(--t-body)", color:"var(--c-ink-2)", lineHeight:1.7, maxWidth:"66ch", margin:"12px 0 0" }}>{r.desc}</p>
      <DoubleRule style={{ margin:"24px 0 28px" }} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px" }}>
        <Spec s={r.a} /><Spec s={r.b} />
      </div>
    </section>
  );
}

function Lexico() {
  return (
    <section id="lexico" style={{ padding:"var(--pad-sec) 40px", borderTop:"1px solid var(--c-border)" }}>
      <Cap>Léxico · conceitos da tese</Cap>
      <h2 style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h1)", color:"var(--c-ink)", margin:"6px 0 24px" }}>Vocabulário iconocrático</h2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"var(--gap)" }}>
        {D.verbetes.map(v => {
          const orig = v.type === "original";
          const ac = orig ? "var(--c-accent)" : "var(--c-plate)";
          return (
            <div key={v.term} style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:16, alignItems:"start", background:"var(--c-panel)", border:"1px solid var(--c-border)", borderLeft:`3px solid ${ac}`, padding:"14px 18px", backgroundImage:"var(--c-grain)", backgroundSize:"200px" }}>
              <div>
                <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h3)", color:"var(--c-ink)", lineHeight:1 }}>{v.term}</div>
                <div className="mono" style={{ fontSize:9, letterSpacing:"1.5px", color:"var(--c-gold)", marginTop:4 }}>{v.source}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                <span className="mono" style={{ fontSize:8, letterSpacing:"2px", textTransform:"uppercase", padding:"3px 8px", border:`1px solid ${ac}`, color:ac }}>{v.type}</span>
                <span className="mono" style={{ fontSize:9, color:"var(--c-ink-3)" }}>{v.ch}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="metodo" style={{ padding:"var(--pad-sec) 40px", borderTop:"1px solid var(--c-border)" }}>
      <Cap>Desenho metodológico</Cap>
      <h2 style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h1)", color:"var(--c-ink)", margin:"6px 0 28px" }}>Três registros, um argumento</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"var(--gap)" }}>
        {D.method.map(m => (
          <div key={m.k} style={{ padding:"22px 22px 26px", border:"1px solid var(--c-border)", background:"var(--c-panel-2)", position:"relative" }}>
            <span style={{ position:"absolute", top:0, left:0, width:14, height:14, borderTop:"1px solid var(--c-gold)", borderLeft:"1px solid var(--c-gold)" }} />
            <Cap>{m.k}</Cap>
            <h3 style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h2)", color:"var(--c-ink)", margin:"8px 0 10px" }}>{m.t}</h3>
            <p style={{ fontFamily:"var(--font-body)", fontSize:"var(--t-small)", color:"var(--c-ink-2)", lineHeight:1.65, margin:0 }}>{m.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Colophon() {
  return (
    <footer style={{ padding:"var(--pad-sec) 40px", borderTop:"3px double var(--c-gold)", textAlign:"center" }}>
      <img src={RES("../assets/logo-symbol.png")} alt="" style={{ width:64, height:64, objectFit:"cover", borderRadius:4, border:"1px solid var(--c-gold)" }} />
      <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"var(--t-h2)", color:"var(--c-ink)", marginTop:16 }}>Iuris Memoria</div>
      <div className="mono" style={{ fontSize:9, letterSpacing:"2.5px", color:"var(--c-ink-3)", textTransform:"uppercase", marginTop:10, lineHeight:1.9 }}>
        ICONOCRACIA · Ius Gentium · UFSC · Florianópolis · MMXXVI<br/>
        anavvanzin / iconocracy-corpus · PPGD
      </div>
    </footer>
  );
}

window.AtlasParts = { atlasTheme, Nav, Hero, Stats, Argument, Anatomia, CorpusWall, AtlasBand, Radiografia, Lexico, Method, Colophon };
})();
