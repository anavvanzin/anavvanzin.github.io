/*IIFE*/
(function(){
  // Helper to translate/choose lang
  const L = (lang, pt, en) => lang === 'en' ? en : pt;

  // Render text with drop-cap and inline markdown helper
  function renderTextWithDropCap(text) {
    if (!text) return null;
    let cleaned = text.trim();
    if (cleaned.length === 0) return null;
    
    const match = cleaned.match(/^([*_"]*)([A-Za-zÀ-ÖØ-öø-ÿ])([*_"]*)/);
    if (!match) {
      return parseInlineMarkdown(cleaned);
    }
    
    const letter = match[2];
    let after = cleaned.substring(match[0].length);
    
    if (match[1] && match[1] !== match[3]) {
      after = match[1] + after;
    }
    
    return React.createElement(React.Fragment, null,
      React.createElement("span", { className: "poster-drop-cap" }, letter),
      parseInlineMarkdown(after)
    );
  }

  function adjustParts(parts, delimiter) {
    if (parts.length % 2 === 0) {
      const last = parts.pop();
      const secondToLast = parts.pop();
      parts.push(secondToLast + delimiter + last);
    }
    return parts;
  }

  // Parse inline markdown (bold/italics)
  function parseInlineMarkdown(text) {
    if (!text) return '';
    
    let boldParts = text.split('**');
    boldParts = adjustParts(boldParts, '**');
    
    const elements = boldParts.map((part, idx) => {
      const isBold = idx % 2 !== 0;
      
      let italicParts = part.split('*');
      italicParts = adjustParts(italicParts, '*');
      
      const subElements = italicParts.map((subPart, subIdx) => {
        const isItalic = subIdx % 2 !== 0;
        
        let underscoreParts = subPart.split('_');
        underscoreParts = adjustParts(underscoreParts, '_');
        
        const finalParts = underscoreParts.map((uPart, uIdx) => {
          const isItalicUnderscore = uIdx % 2 !== 0;
          if (isItalicUnderscore) {
            return React.createElement("em", { key: uIdx }, uPart);
          }
          return uPart;
        });
        
        if (isItalic) {
          return React.createElement("em", { key: subIdx }, finalParts);
        }
        return finalParts;
      });
      
      if (isBold) {
        return React.createElement("strong", { key: idx }, subElements);
      }
      return subElements;
    });
    
    return elements;
  }

  // Parse markdown content blocks
  function parseMarkdown(rawText, lang) {
    const blocks = rawText.split(/\r?\n\r?\n/).map(b => b.trim()).filter(b => b.length > 0);
    
    return blocks.map((block, blockIdx) => {
      // 1. Headers
      if (block.startsWith('#')) {
        const match = block.match(/^(#+)\s+(.*)$/);
        if (match) {
          const level = match[1].length;
          const text = match[2];
          return React.createElement("h" + Math.min(level, 4), { key: blockIdx, className: "poster-h" + level }, parseInlineMarkdown(text));
        }
      }
      
      // 2. Monospace code block
      if (block.startsWith('```') && block.endsWith('```')) {
        let inner = block.slice(3, -3);
        const lines = block.split('\n');
        let codeLines = '';
        if (lines.length > 2) {
          codeLines = lines.slice(1, lines.length - 1).join('\n');
        } else {
          inner = inner.replace(/^[a-zA-Z0-9_-]+\s+/, '');
          codeLines = inner.trim();
        }
        return React.createElement("div", { key: blockIdx, className: "terminal-box" },
          React.createElement("pre", null, React.createElement("code", null, codeLines))
        );
      }
      
      // 3. Blockquote
      if (block.startsWith('>')) {
        const lines = block.split('\n').map(l => l.replace(/^>\s?/, '').trim()).join('\n');
        return React.createElement("blockquote", { key: blockIdx }, renderTextWithDropCap(lines));
      }
      
      // 4. List blocks (Unordered, Ordered, Checkbox)
      const lines = block.split('\n');
      if (lines.length > 0 && (lines[0].trim().startsWith('- ') || lines[0].trim().startsWith('* ') || /^\d+\.\s/.test(lines[0].trim()))) {
        const isOrdered = /^\d+\.\s/.test(lines[0].trim());
        const listItems = lines.map((line, lineIdx) => {
          let cleaned = line.trim();
          let isCheckbox = false;
          let checked = false;
          
          if (cleaned.startsWith('- ') || cleaned.startsWith('* ')) {
            cleaned = cleaned.substring(2);
          } else {
            cleaned = cleaned.replace(/^\d+\.\s+/, '');
          }
          
          if (cleaned.startsWith('[ ] ')) {
            isCheckbox = true;
            checked = false;
            cleaned = cleaned.substring(4);
          } else if (cleaned.startsWith('[x] ') || cleaned.startsWith('[X] ')) {
            isCheckbox = true;
            checked = true;
            cleaned = cleaned.substring(4);
          }
          
          if (isCheckbox) {
            return React.createElement("li", { key: lineIdx, style: { listStyleType: 'none', display: 'flex', alignItems: 'center', gap: '8px' } },
              React.createElement("input", { type: "checkbox", checked: checked, readOnly: true }),
              React.createElement("span", null, parseInlineMarkdown(cleaned))
            );
          } else {
            return React.createElement("li", { key: lineIdx }, parseInlineMarkdown(cleaned));
          }
        });
        
        return React.createElement(isOrdered ? "ol" : "ul", { key: blockIdx, className: isOrdered ? "poster-ol" : "poster-ul" }, listItems);
      }
      
      // 5. Table
      if (lines.length > 0 && lines[0].includes('|')) {
        const rows = lines.map(line => {
          return line.split('|').map(cell => cell.trim()).filter((cell, idx, arr) => {
            if (idx === 0 && cell === '') return false;
            if (idx === arr.length - 1 && cell === '') return false;
            return true;
          });
        }).filter(r => r.length > 0);
        
        if (rows.length > 0) {
          let headerRow = rows[0];
          let bodyRows = rows.slice(1);
          if (bodyRows.length > 0 && bodyRows[0].every(cell => cell.startsWith('-') || cell === '')) {
            bodyRows = bodyRows.slice(1);
          }
          
          return React.createElement("div", { key: blockIdx, className: "poster-table-container" },
            React.createElement("table", { className: "poster-table" },
              React.createElement("thead", null,
                React.createElement("tr", null,
                  headerRow.map((cell, idx) => React.createElement("th", { key: idx }, parseInlineMarkdown(cell)))
                )
              ),
              React.createElement("tbody", null,
                bodyRows.map((row, rowIdx) => React.createElement("tr", { key: rowIdx },
                  row.map((cell, cellIdx) => React.createElement("td", { key: cellIdx }, parseInlineMarkdown(cell)))
                ))
              )
            )
          );
        }
      }
      
      // Default: Paragraph with drop cap
      return React.createElement("p", { key: blockIdx, className: "poster-p" }, renderTextWithDropCap(block));
    });
  }

  // WPoster Component
  function WPoster({ lang, standalone }) {
    const [selectedPoster, setSelectedPoster] = React.useState('methodology');
    const [content, setContent] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [zoomed, setZoomed] = React.useState(false);

    const scrollPos = React.useRef(0);
    const lastScrollY = React.useRef(0);
    const rootRef = React.useRef(null);
    const isZooming = React.useRef(false);

    // Map selected poster to file path
    const getPath = (id) => {
      if (id === 'methodology') return '/docs/methodology.md';
      if (id === 'genealogia') return '/docs/genealogia-alegoria-feminina.md';
      return '';
    };

    React.useEffect(() => {
      let active = true;
      setLoading(true);
      setError(null);
      const path = getPath(selectedPoster);
      fetch(path)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch poster content');
          return res.text();
        })
        .then(text => {
          if (active) {
            setContent(text);
            setLoading(false);
          }
        })
        .catch(err => {
          if (active) {
            console.error(err);
            setError(err.message);
            setLoading(false);
          }
        });
      return () => {
        active = false;
      };
    }, [selectedPoster]);

    React.useEffect(() => {
      const handleDocKeyDown = (e) => {
        if (e.key === 'Escape') {
          isZooming.current = false;
          setZoomed(false);
        }
      };
      window.addEventListener('keydown', handleDocKeyDown);
      return () => window.removeEventListener('keydown', handleDocKeyDown);
    }, []);

    // Listen to non-zero scroll events to capture target position before browser auto-focus scrolls to 0
    React.useEffect(() => {
      const target = (rootRef.current && !standalone) ? rootRef.current : window;
      const handleScroll = () => {
        if (!zoomed && !isZooming.current) {
          const val = target === window ? window.scrollY : target.scrollTop;
          if (val !== 0) {
            lastScrollY.current = val;
          }
        }
      };
      target.addEventListener('scroll', handleScroll);
      return () => target.removeEventListener('scroll', handleScroll);
    }, [zoomed, standalone]);

    // Scroll preservation effect to prevent layout shrinkage from resetting scrollY
    React.useEffect(() => {
      const target = (rootRef.current && !standalone) ? rootRef.current : window;
      if (zoomed) {
        if (!scrollPos.current) {
          scrollPos.current = lastScrollY.current || (target === window ? window.scrollY : target.scrollTop);
        }
      } else {
        const saved = scrollPos.current;
        if (saved !== undefined && saved !== null && saved !== 0) {
          if (target === window) {
            window.scrollTo(0, saved);
          } else {
            target.scrollTop = saved;
          }
          scrollPos.current = 0;
        }
      }
    }, [zoomed, standalone]);

    // Render visual gauge for score
    function renderGauge(scoreText) {
      let percent = 50;
      let label = scoreText;
      if (/extremo/i.test(scoreText)) percent = 100;
      else if (/alto/i.test(scoreText)) percent = 75;
      else if (/médio/i.test(scoreText)) percent = 50;
      else if (/baixo/i.test(scoreText)) percent = 25;
      else if (/0\.8--1\.2/.test(scoreText)) percent = 25;
      else if (/2\.0--2\.5/.test(scoreText)) percent = 55;
      else if (/3\.0--3\.5/.test(scoreText)) percent = 80;
      
      return React.createElement("div", { style: { marginTop: '6px' } },
        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' } },
          React.createElement("span", null, L(lang, 'Nível de endurecimento', 'endurecimento level')),
          React.createElement("span", { style: { fontWeight: '600' } }, label)
        ),
        React.createElement("div", { style: { height: '8px', background: 'var(--ink-15)', border: '1px solid var(--ink-30)', marginTop: '4px', position: 'relative' } },
          React.createElement("div", { style: { height: '100%', width: percent + '%', background: 'var(--rubric)', transition: 'width 0.3s ease' } })
        )
      );
    }

    // Render parsed JSON content
    function renderJsonContent(rawText) {
      try {
        const cleanJson = rawText.replace(/\\_/g, '_').replace(/\\\[/g, '[').replace(/\\\]/g, ']');
        const data = JSON.parse(cleanJson);

        return React.createElement("div", { className: "poster-layout-json" },
          React.createElement("header", { className: "poster-banner" },
            React.createElement("h1", null, lang === 'en' ? "The Visual Contract: female allegory and sexual contract in the history of legal culture" : data._meta.titulo_principal),
            React.createElement("h2", null, data._meta.titulo_alternativo),
            React.createElement("div", { className: "poster-meta" },
              React.createElement("span", null, React.createElement("strong", null, L(lang, "Autora: ", "Author: ")), data._meta.autora),
              React.createElement("span", null, React.createElement("strong", null, L(lang, "Afiliação: ", "Affiliation: ")), data._meta.afiliacao)
            )
          ),
          React.createElement("div", { className: "poster-columns-three" },
            // Column 1
            React.createElement("div", { className: "poster-column" },
              React.createElement("h3", { className: "column-header" }, L(lang, "Teses Principais", "Main Theses")),
              data.theses.map((thesis, idx) => React.createElement("div", { key: thesis.id, className: "poster-block card-style" },
                React.createElement("h4", null, thesis.id + ": " + thesis.titulo),
                React.createElement("h5", null, thesis.subtitulo),
                React.createElement("p", null, thesis.resumo),
                React.createElement("p", { style: { marginTop: '8px', fontSize: '13px', lineHeight: '1.4' } },
                  React.createElement("strong", null, L(lang, "Argumento Central: ", "Central Argument: ")),
                  thesis.argumento_central
                )
              )),
              React.createElement("h3", { className: "column-header" }, L(lang, "Rede de Conceitos", "Concepts Network")),
              React.createElement("div", { className: "poster-block card-style" },
                React.createElement("p", { style: { fontStyle: 'italic', marginBottom: '8px', fontSize: '13px' } }, data.concepts_network.descricao),
                data.concepts_network.nos.map(node => React.createElement("div", { key: node.id, style: { marginBottom: '12px', borderBottom: '1px solid var(--rule-hairline)', paddingBottom: '8px' } },
                  React.createElement("strong", { style: { color: 'var(--rubric)' } }, node.conceito),
                  React.createElement("span", { style: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', marginLeft: '8px', color: 'var(--text-faint)' } }, node.tipo),
                  React.createElement("p", { style: { fontSize: '13px', marginTop: '4px', lineHeight: '1.4' } }, node.definicao)
                ))
              )
            ),
            // Column 2
            React.createElement("div", { className: "poster-column" },
              React.createElement("h3", { className: "column-header" }, L(lang, "Linha do Tempo Genealógica", "Genealogical Timeline")),
              data.genealogy_timeline.fases.map(fase => React.createElement("div", { key: fase.id, className: "poster-block card-style" },
                React.createElement("h4", { style: { color: 'var(--rubric)' } }, fase.nome),
                React.createElement("span", { className: "period" }, fase.periodo),
                React.createElement("p", { style: { fontWeight: '600', marginTop: '4px', fontSize: '13.5px' } }, fase.subtitulo),
                React.createElement("p", { style: { fontSize: '13px', lineHeight: '1.4' } }, fase.descricao_geral),
                React.createElement("div", { style: { marginTop: '8px' } },
                  (fase.figuras || []).map(fig => React.createElement("div", { key: fig.nome, style: { marginTop: '8px', paddingLeft: '8px', borderLeft: '2px solid var(--gold)' } },
                    React.createElement("strong", null, fig.nome),
                    React.createElement("span", { style: { fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' } }, fig.origem_geografica + " (" + fig.periodo + ")"),
                    React.createElement("p", { style: { fontSize: '13px', marginTop: '2px', lineHeight: '1.4' } }, fig.funcao_juridico_politica)
                  )),
                  (fase.subfases || []).map(sub => React.createElement("div", { key: sub.id || sub.nome, style: { marginTop: '8px', paddingLeft: '8px', borderLeft: '2px solid var(--rubric)' } },
                    React.createElement("strong", null, sub.nome),
                    React.createElement("span", { style: { fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' } }, sub.periodo),
                    React.createElement("p", { style: { fontSize: '13px', marginTop: '2px', lineHeight: '1.4' } }, sub.descricao)
                  ))
                )
              )),
              React.createElement("h3", { className: "column-header" }, L(lang, "Regimes de Iconocracia", "Regimes of Iconocracy")),
              data.regimes_iconocraticos.regimes.map(regime => React.createElement("div", { key: regime.id, className: "poster-block card-style" },
                React.createElement("h4", null, regime.nome),
                React.createElement("span", { style: { fontStyle: 'italic', fontSize: '13px', color: 'var(--text-muted)' } }, regime.subtitulo),
                React.createElement("p", { style: { fontSize: '13px', marginTop: '4px', lineHeight: '1.4' } }, regime.descricao),
                React.createElement("div", { style: { marginTop: '6px', fontSize: '12px' } },
                  React.createElement("strong", null, L(lang, "Marcadores Visuais: ", "Visual Markers: ")),
                  regime.marcadores_visuais.join(", ")
                ),
                React.createElement("div", { style: { marginTop: '4px', fontSize: '12px' } },
                  React.createElement("strong", null, L(lang, "Score endurecimento típico: ", "Typical endurecimento score: ")),
                  regime.endurecimento_score_tipico
                )
              ))
            ),
            // Column 3
            React.createElement("div", { className: "poster-column" },
              React.createElement("h3", { className: "column-header" }, L(lang, "Mapeamento Iconográfico", "Iconographic Mapping")),
              data.iconographic_mapping.map(mapping => React.createElement("div", { key: mapping.id, className: "poster-block card-style" },
                React.createElement("h4", null, mapping.figura),
                React.createElement("span", { style: { fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-faint)' } }, mapping.tipo),
                React.createElement("p", { style: { fontSize: '13px', marginTop: '4px', lineHeight: '1.4' } }, mapping.significado_politico),
                renderGauge(mapping.endurecimento_contribuicao || mapping.trajetoria_de_endurecimento?.[2]?.score_endurecimento_estimado || "Médio")
              )),
              React.createElement("h3", { className: "column-header" }, L(lang, "Análise do Paradoxo Político", "Political Paradox Analysis")),
              React.createElement("div", { className: "poster-block card-style", style: { borderLeft: '3px solid var(--rubric)' } },
                React.createElement("h4", null, data.political_paradox.nome),
                React.createElement("h5", null, data.political_paradox.subtitulo),
                React.createElement("p", { style: { fontWeight: '600', fontSize: '13.5px' } }, data.political_paradox.enunciado),
                React.createElement("blockquote", { style: { margin: '8px 0', paddingLeft: '8px', borderLeft: '2px solid var(--ink-30)', fontStyle: 'italic', fontSize: '13px' } }, data.political_paradox.formulacao_warner),
                React.createElement("div", { style: { marginTop: '8px' } },
                  React.createElement("strong", { style: { fontSize: '13px' } }, data.political_paradox.estrutura_do_paradoxo.polo_a.nome),
                  React.createElement("p", { style: { fontSize: '13px', marginTop: '2px', lineHeight: '1.4' } }, data.political_paradox.estrutura_do_paradoxo.polo_a.descricao)
                ),
                React.createElement("div", { style: { marginTop: '8px' } },
                  React.createElement("strong", { style: { fontSize: '13px' } }, data.political_paradox.estrutura_do_paradoxo.polo_b.nome),
                  React.createElement("p", { style: { fontSize: '13px', marginTop: '2px', lineHeight: '1.4' } }, data.political_paradox.estrutura_do_paradoxo.polo_b.descricao)
                )
              )
            )
          ),
          React.createElement("footer", { className: "poster-footer" },
            React.createElement("div", { className: "poster-keywords" },
              React.createElement("strong", null, L(lang, "Palavras-chave: ", "Keywords: ")),
              data._meta.palavras_chave.join(", ")
            ),
            React.createElement("div", { className: "poster-references" },
              React.createElement("strong", null, L(lang, "Referências: ", "References: ")),
              React.createElement("ul", null,
                data.references_abnt.references.map(ref => React.createElement("li", { key: ref.id }, ref.citacao))
              )
            )
          )
        );
      } catch (err) {
        return React.createElement("div", { style: { color: 'var(--rubric)', padding: '16px' } },
          "Error parsing JSON: " + err.message
        );
      }
    }

    const isJson = selectedPoster === 'genealogia';

    const handlePosterClick = (e) => {
      if (e.target.closest('.poster-tab') || e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) {
        return;
      }
      const target = (rootRef.current && !standalone) ? rootRef.current : window;
      scrollPos.current = lastScrollY.current || (target === window ? window.scrollY : target.scrollTop);
      isZooming.current = true;
      setZoomed(true);
    };

    const handleKeyDown = (e) => {
      if (e.target.closest('.poster-tab') || e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) {
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const target = (rootRef.current && !standalone) ? rootRef.current : window;
        scrollPos.current = lastScrollY.current || (target === window ? window.scrollY : target.scrollTop);
        isZooming.current = true;
        setZoomed(true);
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        isZooming.current = false;
        setZoomed(false);
      }
    };

    return React.createElement("div", {
      ref: rootRef,
      className: "poster-root-container" + (standalone ? " standalone" : ""),
      style: {
        padding: standalone ? '40px 24px' : '0',
        maxWidth: standalone ? '1200px' : '100%',
        margin: '0 auto',
        height: standalone ? 'auto' : '100%',
        overflow: standalone ? 'visible' : 'auto'
      }
    },
      React.createElement("nav", { className: "poster-nav" },
        React.createElement("button", {
          className: "poster-tab " + (selectedPoster === 'methodology' ? 'active' : ''),
          onClick: () => setSelectedPoster('methodology')
        }, L(lang, "Metodologia", "Methodology")),
        React.createElement("button", {
          className: "poster-tab " + (selectedPoster === 'genealogia' ? 'active' : ''),
          onClick: () => setSelectedPoster('genealogia')
        }, L(lang, "Genealogia da Alegoria Feminina", "Genealogy of Female Allegory"))
      ),
      zoomed && React.createElement("div", {
        className: "zoom-backdrop poster-backdrop",
        onClick: (e) => {
          e.stopPropagation();
          setZoomed(false);
        }
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
          loading ? React.createElement("div", { className: "poster-loading" }, L(lang, "Carregando pôster...", "Loading poster...")) :
          error ? React.createElement("div", { style: { color: 'var(--rubric)', padding: '24px', textAlign: 'center' } }, error) :
          isJson ? renderJsonContent(content) :
          React.createElement("div", { className: "poster-columns" }, parseMarkdown(content, lang))
        )
      )
    );
  }

  // Register WPoster component
  window.avapp = window.avapp || {};
  window.avapp.WPoster = WPoster;
})();
