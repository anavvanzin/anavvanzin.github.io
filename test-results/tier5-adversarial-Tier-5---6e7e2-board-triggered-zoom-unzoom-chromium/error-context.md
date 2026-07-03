# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier5-adversarial.spec.js >> Tier 5 - Adversarial Coverage Hardening >> T5.5: Verify scroll position is preserved exactly during keyboard-triggered zoom/unzoom
- Location: tests/tier5-adversarial.spec.js:136:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 118
Received: 100
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - button "Workflow Operacional" [ref=e5] [cursor=pointer]
    - button "Metodologia" [ref=e6] [cursor=pointer]
    - button "Genealogia da Alegoria Feminina" [ref=e7] [cursor=pointer]
  - generic [ref=e10]:
    - heading "Workflow Operacional" [level=1] [ref=e11]
    - blockquote [ref=e12]:
      - generic [ref=e13]: W
      - strong [ref=e14]: orkflow curto
      - text: para tocar a tese sem perder tempo com
      - emphasis [ref=e15]: drift de estrutura
      - text: ", Git ou release."
    - heading "Regra-mestra" [level=2] [ref=e16]
    - list [ref=e17]:
      - listitem [ref=e18]: "Trabalhe no hub canônico: `/Users/ana/Research/hub/iconocracy-corpus`"
      - listitem [ref=e19]: "Use os paths em `/Users/ana/Research/...` como mapa do workspace"
      - listitem [ref=e20]: "Considere `records.jsonl` a fonte operacional, `corpus-data.json` o export público e `vault/` o espelho de trabalho"
      - listitem [ref=e21]: Não trate Hugging Face como working copy
      - listitem [ref=e22]: Não trate o vault como fonte primária de verdade
    - heading "Rotina diária" [level=2] [ref=e23]
    - list [ref=e24]:
      - listitem [ref=e25]: Entrar no ambiente e checar o estado do repo
    - code [ref=e28]: cd /Users/ana/Research/hub/iconocracy-corpus conda activate iconocracy git status --short
    - list [ref=e29]:
      - listitem [ref=e30]: Confirmar qual frente está ativa
    - list [ref=e31]:
      - listitem [ref=e32]: "`corpus/`: intake, reconciliação e descrição pública"
      - listitem [ref=e33]: "`data/processed/`: verdade operacional e codificação"
      - listitem [ref=e34]: "`vault/`: notas, sessões e manuscrito"
      - listitem [ref=e35]: "`docs/` e `tools/`: infraestrutura e método"
    - list [ref=e36]:
      - listitem [ref=e37]: Se mexer em notas do vault, checar primeiro o espelho
    - code [ref=e40]: python tools/scripts/vault_sync.py status
    - list [ref=e41]:
      - listitem [ref=e42]: Se entrar item novo no corpus, seguir esta ordem
    - list [ref=e43]:
      - listitem [ref=e44]: "registrar ou revisar em `data/processed/records.jsonl`"
      - listitem [ref=e45]: "verificar impacto em `corpus/corpus-data.json`"
      - listitem [ref=e46]: "complementar nota em `vault/candidatos/` se necessário"
      - listitem [ref=e47]: só depois pensar em publicação
    - list [ref=e48]:
      - listitem [ref=e49]: Encerrar o dia com uma checagem curta
    - code [ref=e52]: git status --short python tools/scripts/code_purification.py --status
    - heading "Rotina semanal" [level=2] [ref=e53]
    - list [ref=e54]:
      - listitem [ref=e55]: Reconciliação de estrutura
    - code [ref=e58]: find /Users/ana/Research/hub/iconocracy-corpus -mindepth 2 -maxdepth 2 -name .git
    - paragraph [ref=e59]:
      - generic [ref=e60]: O
      - text: "bjetivo: garantir que não reapareceu repo aninhado dentro do hub."
    - list [ref=e61]:
      - listitem [ref=e62]: Reconciliação de dados
    - code [ref=e65]: python tools/scripts/validate_schemas.py data/processed/records.jsonl --schema master-record --verbose python tools/scripts/records_to_corpus.py --diff python tools/scripts/code_purification.py --status python tools/scripts/vault_sync.py status
    - paragraph [ref=e66]:
      - generic [ref=e67]: O
      - text: "bjetivo: ver drift entre ledger, export público e vault antes de acumular dívida."
    - list [ref=e68]:
      - listitem [ref=e69]: Revisão de backlog real
    - list [ref=e70]:
      - listitem [ref=e71]: itens sem URL ou placeholder
      - listitem [ref=e72]: "itens ainda não codificados em `purification.jsonl`"
      - listitem [ref=e73]: notas de sessão que ainda não viraram decisão de corpus, escrita ou infra
    - heading "Antes de abrir PR" [level=2] [ref=e74]
    - list [ref=e75]:
      - listitem [ref=e76]: Isolar o tema do branch
    - list [ref=e77]:
      - listitem [ref=e78]: "`corpus/...` para expansão ou reconciliação do corpus"
      - listitem [ref=e79]: "`vault/...` para notas e tese"
      - listitem [ref=e80]: "`writing/...` para manuscrito"
      - listitem [ref=e81]: "`infra/...` para scripts, docs, CI e estrutura"
    - list [ref=e82]:
      - listitem [ref=e83]: Garantir que o diff está coerente com uma única frente
    - code [ref=e86]: git status --short git diff --stat
    - list [ref=e87]:
      - listitem [ref=e88]: Se o PR tocar dados, rodar no mínimo
    - code [ref=e91]: python tools/scripts/validate_schemas.py data/processed/records.jsonl --schema master-record --verbose python tools/scripts/records_to_corpus.py --diff python tools/scripts/code_purification.py --status
    - list [ref=e92]:
      - listitem [ref=e93]: Se o PR tocar vault ou notas de candidatos, rodar também
    - code [ref=e96]: python tools/scripts/vault_sync.py status
    - heading "Antes de release público" [level=2] [ref=e97]
    - paragraph [ref=e98]:
      - generic [ref=e99]: R
      - text: elease público aqui significa dataset Hugging Face ou qualquer superfície derivada do corpus.
    - list [ref=e100]:
      - listitem [ref=e101]: Rodar o gate completo
    - code [ref=e104]: python tools/scripts/validate_schemas.py data/processed/records.jsonl --schema master-record --verbose python tools/scripts/vault_sync.py status python tools/scripts/records_to_corpus.py --diff python tools/scripts/code_purification.py --status
    - list [ref=e105]:
      - listitem [ref=e106]: Se o gate estiver limpo, gerar snapshot
    - code [ref=e109]: python tools/scripts/build_hf_release.py --note "Describe the milestone here."
    - list [ref=e110]:
      - listitem [ref=e111]: Conferir se o release responde a estas perguntas
    - list [ref=e112]:
      - listitem [ref=e113]: a contagem local de itens bate com o snapshot?
      - listitem [ref=e114]: "a contagem de codificação bate com `purification.jsonl`?"
      - listitem [ref=e115]: o changelog do release explica o que entrou e o que ainda está pendente?
    - heading "Regras de bolso" [level=2] [ref=e116]
    - list [ref=e117]:
      - listitem [ref=e118]: Se algo é rastreado pela tese, prefira mantê-lo versionado no hub
      - listitem [ref=e119]: Se algo é superfície pública, trate como derivado
      - listitem [ref=e120]: "Se algo é experimento, não deixe contaminar `main`"
      - listitem [ref=e121]: "Se `git status` ficou ilegível, pare e separe as frentes antes de continuar"
      - listitem [ref=e122]: Se houver dúvida entre “documentar” e “automatizar”, documente primeiro e automatize na segunda passada
```

# Test source

```ts
  59  |     // Non-Latin characters (Д, ع) and emojis (📌) should NOT be drop capped
  60  |     expect(dropCapTexts).not.toContain('Д');
  61  |     expect(dropCapTexts).not.toContain('ع');
  62  |     expect(dropCapTexts).not.toContain('📌');
  63  |   });
  64  | 
  65  |   // Gap 3: Graceful error UI for invalid or incomplete JSON configuration
  66  |   test('T5.3: Verify poster room handles invalid and incomplete JSON content gracefully', async ({ page }) => {
  67  |     // 1. Syntactically invalid JSON
  68  |     await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({
  69  |       status: 200,
  70  |       contentType: 'text/markdown',
  71  |       body: '{ invalid: json }'
  72  |     }));
  73  | 
  74  |     await page.goto('/poster.html');
  75  |     const tabs = page.locator('.poster-tab');
  76  |     await tabs.nth(2).click(); // Switch to the Genealogy poster (which loads JSON)
  77  | 
  78  |     // Verify error UI is displayed (using auto-retry assertion)
  79  |     await expect(page.locator('.poster')).toContainText('Error parsing JSON');
  80  | 
  81  |     // 2. Syntactically valid but incomplete JSON (missing required nested properties like theses, concepts_network)
  82  |     await page.route('**/docs/genealogia-alegoria-feminina.md', route => route.fulfill({
  83  |       status: 200,
  84  |       contentType: 'application/json',
  85  |       body: JSON.stringify({
  86  |         _meta: {
  87  |           titulo_principal: "Test Title",
  88  |           titulo_alternativo: "Alt Title",
  89  |           autora: "Test Author",
  90  |           afiliacao: "Test Affiliation",
  91  |           palavras_chave: ["test"]
  92  |         }
  93  |         // missing theses, concepts_network, genealogy_timeline, regimes_iconocraticos, iconographic_mapping, political_paradox, references_abnt
  94  |       })
  95  |     }));
  96  | 
  97  |     await page.goto('/poster.html');
  98  |     await tabs.nth(2).click();
  99  | 
  100 |     // Verify it still fails gracefully via the catch block rather than crashing the page (using auto-retry assertion)
  101 |     await expect(page.locator('.poster')).toContainText('Error parsing JSON');
  102 |   });
  103 | 
  104 |   // Gap 4: Keyboard Event Bubbling and PreventDefault Interception
  105 |   test('T5.4: Verify keydown Enter intercepts and prevents default actions on interactive elements inside poster', async ({ page }) => {
  106 |     // Create markdown containing a checkbox list item and a markdown link
  107 |     const interactiveMd = '- [ ] Checkbox Item\n- Check out **[link](http://example.com)** here.';
  108 |     
  109 |     await page.route('**/docs/WORKFLOW.md', route => route.fulfill({
  110 |       status: 200,
  111 |       contentType: 'text/markdown',
  112 |       body: interactiveMd
  113 |     }));
  114 | 
  115 |     await page.goto('/poster.html');
  116 |     const poster = page.locator('.poster, .poster-bezel-outer').first();
  117 | 
  118 |     // Focus the poster and press Enter to zoom in
  119 |     await poster.focus();
  120 |     await page.keyboard.press('Enter');
  121 |     await expect(poster).toHaveClass(/zoomed|zoom-active/i);
  122 | 
  123 |     // Verify that clicking or focusing and pressing Enter on a checkbox inside the zoomed poster
  124 |     // bubbles keydown and calls preventDefault, blocking standard browser behavior.
  125 |     const checkbox = page.locator('input[type="checkbox"]').first();
  126 |     await checkbox.focus();
  127 |     
  128 |     // Pressing Enter when checkbox is focused
  129 |     await page.keyboard.press('Enter');
  130 |     
  131 |     // The poster should stay zoomed (the event bubbles and is caught as poster-level Enter)
  132 |     await expect(poster).toHaveClass(/zoomed|zoom-active/i);
  133 |   });
  134 | 
  135 |   // Gap 5: Keyboard Zoom Scroll Preservation
  136 |   test('T5.5: Verify scroll position is preserved exactly during keyboard-triggered zoom/unzoom', async ({ page }) => {
  137 |     await page.goto('/poster.html');
  138 |     const poster = page.locator('.poster, .poster-bezel-outer').first();
  139 | 
  140 |     // Scroll to a known position manually
  141 |     await page.evaluate(() => window.scrollTo(0, 100));
  142 | 
  143 |     // Focus via keyboard, which may trigger browser-level auto-scroll into view
  144 |     await poster.focus();
  145 |     
  146 |     // Capture the baseline scroll position AFTER focus-induced auto-scroll, but BEFORE zoom
  147 |     const scrollTopBefore = await page.evaluate(() => window.scrollY);
  148 | 
  149 |     // Zoom via keyboard Enter
  150 |     await page.keyboard.press('Enter');
  151 |     await expect(poster).toHaveClass(/zoomed|zoom-active/i);
  152 | 
  153 |     // Unzoom via Escape
  154 |     await page.keyboard.press('Escape');
  155 |     await expect(poster).not.toHaveClass(/zoomed|zoom-active/i);
  156 | 
  157 |     // Verify scroll position is restored to the post-focus baseline exactly
  158 |     const scrollTopAfter = await page.evaluate(() => window.scrollY);
> 159 |     expect(scrollTopAfter).toBe(scrollTopBefore);
      |                            ^ Error: expect(received).toBe(expected) // Object.is equality
  160 |   });
  161 | 
  162 |   // Gap 6: Stale Fetch Race Conditions (Fast Tab Switching)
  163 |   test('T5.6: Verify race conditions in tab switching are prevented and active content is correctly preserved', async ({ page }) => {
  164 |     // Intercept calls to return slow content for Workflow and fast content for Methodology
  165 |     let slowFetchStarted = false;
  166 |     await page.route('**/docs/WORKFLOW.md', async (route) => {
  167 |       slowFetchStarted = true;
  168 |       // Introduce a 800ms delay to simulate network latency
  169 |       await new Promise(resolve => setTimeout(resolve, 800));
  170 |       await route.fulfill({
  171 |         status: 200,
  172 |         contentType: 'text/markdown',
  173 |         body: '# Slow Workflow Content'
  174 |       });
  175 |     });
  176 | 
  177 |     await page.route('**/docs/methodology.md', async (route) => {
  178 |       await route.fulfill({
  179 |         status: 200,
  180 |         contentType: 'text/markdown',
  181 |         body: '# Fast Methodology Content'
  182 |       });
  183 |     });
  184 | 
  185 |     await page.goto('/poster.html');
  186 |     const tabs = page.locator('.poster-tab');
  187 | 
  188 |     // Click tab 0 (starts slow fetch)
  189 |     await tabs.nth(0).click();
  190 |     
  191 |     // Immediately click tab 1 (starts fast fetch)
  192 |     await tabs.nth(1).click();
  193 | 
  194 |     // Wait for everything to resolve (1200ms)
  195 |     await page.waitForTimeout(1200);
  196 | 
  197 |     // If there is a race condition, the slow workflow content resolving late might overwrite
  198 |     // the methodology content even though methodology is the currently active tab.
  199 |     const activeTab = tabs.nth(1);
  200 |     await expect(activeTab).toHaveClass(/active/);
  201 | 
  202 |     const bodyText = await page.locator('.poster').innerText();
  203 |     
  204 |     // If it is broken, it will display the slow content instead of the fast content.
  205 |     expect(bodyText).toContain('Fast Methodology Content');
  206 |     expect(bodyText).not.toContain('Slow Workflow Content');
  207 |   });
  208 | 
  209 | });
  210 | 
```