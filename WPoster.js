/*IIFE*/
(function(){
  // Helper to translate/choose lang
  const L = (lang, pt, en) => lang === 'en' ? en : pt;

  // Normalize typographic dashes coming from the source markdown/JSON:
  // `---` → em dash, numeric `--` (page ranges) → en dash.
  const T = (s) => (s == null ? '' : String(s))
    .replace(/\s---\s/g, ' — ')
    .replace(/---/g, '—')
    .replace(/(\d)\s*--\s*(\d)/g, '$1–$2');

  // Render a paragraph opening with an illuminated drop-cap on its first letter.
  function renderDropCapParagraph(text, className) {
    const cleaned = T(text).trim();
    if (!cleaned) return null;
    const m = cleaned.match(/^([A-Za-zÀ-ÖØ-öø-ÿ])([\s\S]*)$/);
    if (!m) {
      return React.createElement("p", { className: className }, cleaned);
    }
    return React.createElement("p", { className: className },
      React.createElement("span", { className: "poster-drop-cap" }, m[1]),
      m[2]
    );
  }

  // ── Tabula: a single academic plate rendered from the thesis JSON ──
  function renderTabula(rawText, lang) {
    try {
      const cleanJson = rawText.replace(/\\_/g, '_').replace(/\\\[/g, '[').replace(/\\\]/g, ']');
      const d = JSON.parse(cleanJson);
      const m = d._meta || {};
      const el = React.createElement;

      const tituloEn = "The Visual Contract: female allegory and sexual contract in the history of legal culture";
      const abstract = lang === 'en' ? (m.abstract_en || m.resumo) : m.resumo;

      const sectionHead = (num, pt, en) => el("h2", { className: "tabula-h2" },
        el("span", { className: "tabula-num" }, num),
        L(lang, pt, en)
      );

      // Banner
      const banner = el("header", { className: "poster-banner tabula-banner" },
        el("div", { className: "tabula-eyebrow" }, "Iuris Memoria · Tabula · PPGD/UFSC · MMXXVI"),
        el("h1", null, lang === 'en' ? tituloEn : T(m.titulo_principal)),
        el("div", { className: "tabula-alt" }, el("em", null, T(m.titulo_alternativo))),
        el("div", { className: "poster-meta tabula-meta" },
          el("span", null, el("strong", null, T(m.autora))),
          el("span", null, T(m.afiliacao)),
          el("span", null, L(lang, "Grupo ", "Group ") + T(m.grupo_pesquisa)),
          m.versao ? el("span", null, T(m.versao)) : null
        ),
        Array.isArray(m.palavras_chave) ? el("div", { className: "tabula-kws" },
          m.palavras_chave.slice(0, 8).map((k, i) => el("span", { className: "tabula-kw", key: i }, T(k)))
        ) : null
      );

      // Abstract with drop-cap
      const abstractEl = renderDropCapParagraph(abstract, "tabula-abstract");

      // I · Theses
      const theses = el("section", null,
        sectionHead("I", "Teses principais", "Main theses"),
        el("div", { className: "tabula-grid2" },
          (d.theses || []).map((t) => el("article", { className: "tabula-card", key: t.id },
            el("div", { className: "tabula-tid" }, T(t.id)),
            el("h3", null, T(t.titulo)),
            el("div", { className: "tabula-sub" }, el("em", null, T(t.subtitulo))),
            el("p", null, T(t.resumo)),
            el("p", { className: "tabula-arg" },
              el("strong", { className: "tabula-lbl" }, L(lang, "Argumento central", "Central argument")),
              T(t.argumento_central)
            )
          ))
        )
      );

      // II · Timeline + Regimes
      const tl = (d.genealogy_timeline && d.genealogy_timeline.fases) || [];
      const regimes = (d.regimes_iconocraticos && d.regimes_iconocraticos.regimes) || [];
      const timeline = el("section", null,
        sectionHead("II", "Linha do tempo genealógica & regimes", "Genealogical timeline & regimes"),
        el("div", { className: "tabula-grid2" },
          el("div", null,
            tl.map((f, i) => el("div", { className: "tabula-fase", key: i },
              el("h4", null, T(f.nome)),
              el("span", { className: "tabula-per" }, T(f.periodo)),
              el("div", { className: "tabula-sub" }, el("em", null, T(f.subtitulo))),
              el("p", null, T(f.descricao_geral))
            ))
          ),
          el("div", null,
            regimes.map((r, i) => el("div", { className: "tabula-regime", key: i },
              el("h4", null, T(r.nome)),
              r.subtitulo ? el("span", { className: "tabula-per" }, T(r.subtitulo)) : null,
              el("p", null, T(r.descricao))
            ))
          )
        )
      );

      // Paradox feature (blockquote lives here)
      const pp = d.political_paradox || {};
      const paradox = el("section", { className: "tabula-paradox" },
        el("div", { className: "tabula-eyebrow" }, T(pp.id) + L(lang, " · O paradoxo", " · The paradox")),
        el("h3", null, T(pp.nome)),
        el("blockquote", { className: "tabula-enun" }, T(pp.enunciado)),
        pp.formulacao_warner ? el("div", { className: "tabula-warner" }, T(pp.formulacao_warner)) : null
      );

      // III · Iconographic mapping (table)
      const icon = el("section", null,
        sectionHead("III", "Mapeamento iconográfico", "Iconographic mapping"),
        el("div", { className: "poster-table-container" },
          el("table", { className: "poster-table tabula-table" },
            el("thead", null, el("tr", null,
              el("th", null, L(lang, "Figura", "Figure")),
              el("th", null, L(lang, "Atributo convencional", "Conventional attribute")),
              el("th", null, L(lang, "Significado político", "Political meaning"))
            )),
            el("tbody", null,
              (d.iconographic_mapping || []).map((ic, i) => el("tr", { key: i },
                el("td", { className: "tabula-fig" }, T(ic.figura)),
                el("td", null, T(ic.atributo_convencional)),
                el("td", null, T(ic.significado_politico || ic.contrato_visual))
              ))
            )
          )
        )
      );

      // IV · Concepts network
      const nos = (d.concepts_network && d.concepts_network.nos) || [];
      const concepts = el("section", null,
        sectionHead("IV", "Rede de conceitos", "Concept network"),
        el("div", { className: "tabula-grid3" },
          nos.map((n, i) => el("div", { className: "tabula-no", key: i },
            el("strong", null, T(n.conceito)),
            el("span", { className: "tabula-tipo" }, T(n.tipo)),
            el("p", null, T(n.definicao))
          ))
        )
      );

      // V · References (ABNT) — ul/li
      const refs = (d.references_abnt && d.references_abnt.references) || [];
      const references = el("section", null,
        el("h2", { className: "tabula-h2" },
          el("span", { className: "tabula-num" }, "V"),
          L(lang, "Referências", "References"),
          el("span", { className: "tabula-abnt" }, "ABNT NBR 6023:2025")
        ),
        el("ul", { className: "poster-references tabula-refs" },
          refs.map((r, i) => el("li", { key: i }, T(typeof r === 'string' ? r : (r.citacao || r.referencia || ''))))
        )
      );

      // Footer with the ecosystem link + methodology
      const footer = el("footer", { className: "poster-footer tabula-footer" },
        el("span", null, "ana vanzin · ",
          el("a", { href: "/" }, "anavanzin.com")),
        el("span", null, L(lang, "Projeto Iconocracia · ", "Iconocracia project · "),
          el("a", { href: "https://iconocracia.com", target: "_blank", rel: "noopener" }, "iconocracia.com ↗")),
        el("span", null, el("a", { href: "/metodologia/" }, L(lang, "ver metodologia", "view methodology"))),
        el("span", { className: "tabula-date" }, T(m.data_publicacao) + " · " + T(m.status))
      );

      return el("div", { className: "tabula" },
        banner, abstractEl, theses, timeline, paradox, icon, concepts, references, footer
      );
    } catch (err) {
      return React.createElement("div", { style: { color: 'var(--rubric)', padding: '16px' } },
        "Error parsing JSON: " + err.message
      );
    }
  }

  // WPoster Component — renders the single Tabula plate
  function WPoster({ lang, standalone }) {
    const [content, setContent] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [zoomed, setZoomed] = React.useState(false);

    const scrollPos = React.useRef(0);
    const lastScrollY = React.useRef(0);
    const rootRef = React.useRef(null);
    const isZooming = React.useRef(false);

    const SOURCE = '/docs/genealogia-alegoria-feminina.md';

    React.useEffect(() => {
      let active = true;
      setLoading(true);
      setError(null);
      fetch(SOURCE)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch poster content');
          return res.text();
        })
        .then(text => {
          if (active) { setContent(text); setLoading(false); }
        })
        .catch(err => {
          if (active) { console.error(err); setError(err.message); setLoading(false); }
        });
      return () => { active = false; };
    }, []);

    React.useEffect(() => {
      const handleDocKeyDown = (e) => {
        if (e.key === 'Escape') { isZooming.current = false; setZoomed(false); }
      };
      window.addEventListener('keydown', handleDocKeyDown);
      return () => window.removeEventListener('keydown', handleDocKeyDown);
    }, []);

    // Capture non-zero scroll position before browser auto-focus scrolls to 0
    React.useEffect(() => {
      const target = (rootRef.current && !standalone) ? rootRef.current : window;
      const handleScroll = () => {
        if (!zoomed && !isZooming.current) {
          const val = target === window ? window.scrollY : target.scrollTop;
          if (val !== 0) { lastScrollY.current = val; }
        }
      };
      target.addEventListener('scroll', handleScroll);
      return () => target.removeEventListener('scroll', handleScroll);
    }, [zoomed, standalone]);

    // Preserve scroll across zoom to prevent layout shrinkage from resetting scrollY
    React.useEffect(() => {
      const target = (rootRef.current && !standalone) ? rootRef.current : window;
      if (zoomed) {
        if (!scrollPos.current) {
          scrollPos.current = lastScrollY.current || (target === window ? window.scrollY : target.scrollTop);
        }
      } else {
        const saved = scrollPos.current;
        if (saved !== undefined && saved !== null && saved !== 0) {
          if (target === window) { window.scrollTo(0, saved); } else { target.scrollTop = saved; }
          scrollPos.current = 0;
        }
      }
    }, [zoomed, standalone]);

    const handlePosterClick = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) return;
      const target = (rootRef.current && !standalone) ? rootRef.current : window;
      scrollPos.current = lastScrollY.current || (target === window ? window.scrollY : target.scrollTop);
      isZooming.current = true;
      setZoomed(true);
    };

    const handleKeyDown = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const target = (rootRef.current && !standalone) ? rootRef.current : window;
        scrollPos.current = lastScrollY.current || (target === window ? window.scrollY : target.scrollTop);
        isZooming.current = true;
        setZoomed(true);
      }
      if (e.key === 'Escape') { e.preventDefault(); isZooming.current = false; setZoomed(false); }
    };

    return React.createElement("div", {
      ref: rootRef,
      className: "poster-root-container tabula-root" + (standalone ? " standalone" : ""),
      style: {
        padding: standalone ? '40px 24px' : '0',
        maxWidth: standalone ? '1180px' : '100%',
        margin: '0 auto',
        height: standalone ? 'auto' : '100%',
        overflow: standalone ? 'visible' : 'auto'
      }
    },
      zoomed && React.createElement("div", {
        className: "zoom-backdrop poster-backdrop",
        onClick: (e) => { e.stopPropagation(); setZoomed(false); }
      }),
      React.createElement("div", {
        className: "poster poster-bezel-outer poster-window-zoom" + (zoomed ? " zoomed" : ""),
        onClick: handlePosterClick,
        onMouseDown: () => {
          if (!zoomed) {
            const target = (rootRef.current && !standalone) ? rootRef.current : window;
            scrollPos.current = lastScrollY.current || (target === window ? window.scrollY : target.scrollTop);
            isZooming.current = true;
          }
        },
        onPointerDown: () => {
          if (!zoomed) {
            const target = (rootRef.current && !standalone) ? rootRef.current : window;
            scrollPos.current = lastScrollY.current || (target === window ? window.scrollY : target.scrollTop);
            isZooming.current = true;
          }
        },
        onKeyDown: handleKeyDown,
        tabIndex: 0
      },
        React.createElement("div", { className: "poster-grain" }),
        React.createElement("div", { className: "poster-bezel-inner" },
          loading ? React.createElement("div", { className: "poster-loading" }, L(lang, "Carregando tabula…", "Loading tabula…")) :
          error ? React.createElement("div", { style: { color: 'var(--rubric)', padding: '24px', textAlign: 'center' } }, error) :
          renderTabula(content, lang)
        )
      )
    );
  }

  // Register WPoster component
  window.avapp = window.avapp || {};
  window.avapp.WPoster = WPoster;
})();
