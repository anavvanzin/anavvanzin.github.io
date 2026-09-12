(function(){
  const { createElement: el, useState, useEffect } = React;
  const L = (lang, pt, en) => lang === 'en' ? en : pt;

  const siteAsset = path => path ? new URL(path, window.location.origin + '/').href : undefined;

  // Dialectical Tarot Component
  function WTarot({ lang, onClose }) {
    const [deck, setDeck] = useState([]);
    const [corpus, setCorpus] = useState([]);
    const [selected, setSelected] = useState([]); // Array of 2 indices
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      Promise.all([
        fetch('/data/tarot.json').then(r => r.json()),
        fetch('/data/corpus.json').then(r => r.json())
      ]).then(([tarotData, corpusData]) => {
        setDeck(tarotData);
        setCorpus(corpusData);
        setLoading(false);
      }).catch(err => {
        console.error("Failed to load tarot/corpus data", err);
        setLoading(false);
      });
    }, []);

    const toggleCard = (idx) => {
      if (selected.includes(idx)) {
        setSelected(selected.filter(i => i !== idx));
      } else {
        if (selected.length < 2) {
          setSelected([...selected, idx]);
        } else {
          setSelected([selected[1], idx]);
        }
      }
    };

    const renderTension = () => {
      if (selected.length < 2) return null;
      const c1 = deck[selected[0]];
      const c2 = deck[selected[1]];
      
      const searchTerms = (c) => [
        c.title.toLowerCase(),
        c.id.toLowerCase()
      ];

      const t1 = searchTerms(c1);
      const t2 = searchTerms(c2);

      const matches = (item, terms) => {
        const text = [
          item.title,
          item.longDescription,
          ...(item.tags || []),
          ...(item.concepts || [])
        ].join(' ').toLowerCase();
        return terms.some(t => text.includes(t));
      };

      // Filter corpus for items matching BOTH or EITHER
      const evidence = corpus.filter(item => {
        return matches(item, t1) || matches(item, t2);
      }).sort((a, b) => {
        // Boost items matching BOTH
        const m1a = matches(a, t1) && matches(a, t2);
        const m1b = matches(b, t1) && matches(b, t2);
        if (m1a && !m1b) return -1;
        if (!m1a && m1b) return 1;
        return 0;
      }).slice(0, 6);

      return el("div", { className: "tarot-tension" },
        el("header", { className: "tarot-tension-head" },
          el("h3", null, `${c1.title} ↔ ${c2.title}`),
          el("p", { className: "tarot-dialectic" }, 
            L(lang, "Análise da tensão dialética entre os arquétipos selecionados.", 
                    "Analysis of the dialectical tension between the selected archetypes.")
          )
        ),
        el("div", { className: "tarot-evidence-grid" },
          evidence.map(item => el("div", { key: item.id, className: "tarot-evidence-card" },
            el("div", { className: "tarot-evidence-img" }, 
              el("img", { src: siteAsset((item.files && item.files[0]) ? item.files[0].path : ''), alt: item.title })
            ),
            el("h4", null, item.title),
            el("p", null, (item.longDescription || item.shortDescription || '').substring(0, 100) + '...')
          ))
        ),
        el("footer", { className: "tarot-actions" },
          el("button", { 
            className: "tarot-btn",
            onClick: () => generateEssay(c1, c2, evidence, lang)
          }, L(lang, "Gerar Ensaio Dialético", "Generate Dialectical Essay"))
        )
      );
    };

    if (loading) return el("div", { className: "tarot-loading" }, "Loading...");

    return el("div", { className: "tarot-app" },
      el("div", { className: "tarot-deck" },
        deck.map((card, i) => el("div", {
          key: i,
          className: `tarot-card ${selected.includes(i) ? 'active' : ''}`,
          style: selected.includes(i) ? { '--card-hue': card.hue } : {},
          onClick: () => toggleCard(i)
        },
          el("div", { className: "tarot-card-inner" },
            el("div", { className: "tarot-card-front" },
              el("img", { src: siteAsset(card.image), alt: card.title }),
              el("div", { className: "tarot-card-label" },
                el("span", { className: "tarot-card-num" }, card.number),
                el("span", { className: "tarot-card-title" }, card.title)
              )
            ),
            el("div", { className: "tarot-card-back" },
              el("img", { src: "/assets/tarot/card_back.png", alt: "Back" })
            )
          )
        ))
      ),
      renderTension()
    );
  }

  function generateEssay(c1, c2, evidence, lang) {
    const title = `${c1.title} vs ${c2.title}: ${L(lang, "Um Ensaio Dialético", "A Dialectical Essay")}`;
    const content = `
# ${title}

## ${L(lang, "Introdução", "Introduction")}
${c1.description}
${c2.description}

## ${L(lang, "Tensão Acadêmica", "Academic Tension")}
- **${c1.title}**: ${c1.meaning}
- **${c2.title}**: ${c2.meaning}

## ${L(lang, "Evidência Iconográfica", "Iconographic Evidence")}
${evidence.map(e => `- **${e.title}**: ${e.longDescription || e.shortDescription} ([link](${e.files[0].path}))`).join('\n')}

## ${L(lang, "Síntese Dialética", "Dialectical Synthesis")}
${L(lang, "O conflito entre a imagem da", "The conflict between the image of")} ${c1.title} ${L(lang, "e a força da", "and the force of")} ${c2.title} ${L(lang, "revela uma zona de indeterminação jurídica...", "reveals a zone of legal indeterminacy...")}
    `.trim();

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ensaio-${c1.id}-${c2.id}.md`;
    a.click();
  }

  window.avapp = Object.assign(window.avapp || {}, {
    WTarot
  });
})();
