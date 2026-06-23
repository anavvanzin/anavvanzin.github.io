# Auditoria — anavanzin.com / iconocracia

> Data: 2026-06-15 · Escopo: repositório `anavvanzin.github.io` (site público) e a
> cadeia de dados do corpus que o alimenta. Branch de trabalho:
> `claude/keen-wozniak-bvjv86`.

Este relatório registra achados para **decisão futura**. Nesta rodada foram aplicados
apenas os ajustes de **números do site** (ver §4); a **estrutura `/iconocracia/`** (§2)
ficou pendente de decisão da pesquisadora.

---

## 1. Resumo executivo

| Achado | Severidade | Ação nesta rodada |
|---|---|---|
| Links para `/iconocracia/` quebrados (pasta não existe) | Alta (404 público) | Só registrado — decisão pendente |
| Números do site desatualizados (247/62%) | Média | **Corrigido** → 314/71% |
| `iconocracy-corpus/CLAUDE.md` com contagens stale (264/265) | Baixa | Registrado (fora de escopo) |
| `companion-data.json` stale (165) | Baixa | Registrado (fora de escopo) |
| Drift 314 (corpus-data.json) × 308 (records.jsonl) | Média | Registrado (fora de escopo) |

---

## 2. Estrutura `/iconocracia/` — DECISÃO PENDENTE

O site referencia o caminho `/iconocracia/` em vários pontos, **mas a pasta
`iconocracia/` não existe** no repositório — `atlas/` e `atlas-lab/` estão na **raiz**.
Hoje, o ícone "iconocracia" do desktop e a URL canônica do atlas-lab apontam para
endereços que retornam **404**.

### Pontos que apontam para `/iconocracia/`

| Arquivo:linha | Referência |
|---|---|
| `desktop-app.js:20` | registro do ícone `iconocracia` no desktop |
| `desktop-app.js:152` | `window.location.href = 'iconocracia/'` (clique no ícone → 404) |
| `atlas-lab/index.html:11` | `<link rel="canonical" href="https://anavanzin.com/iconocracia/atlas-lab/">` |
| `atlas-lab/index.html:18-27` | `og:url`, `og:image`, `twitter:image` sob `/iconocracia/` |
| `atlas-lab/app.jsx:159` | footer de export: `anavanzin.com/iconocracia` |
| `atlas/parts.jsx:333` | label `anavvanzin / iconocracy-corpus` |
| `README.md:8` | "No ar: https://anavvanzin.github.io/iconocracia/" (hoje 404) |
| `readme.html:93` | `<a href="iconocracia/">` na navegação |

### Duas saídas possíveis (a decidir)

- **Opção A — criar `iconocracia/`:** mover `atlas/` → `iconocracia/atlas/` e
  `atlas-lab/` → `iconocracia/atlas-lab/`, criar `iconocracia/index.html` (landing).
  Faz os links e canonical URLs existentes passarem a funcionar sem reescrita.
- **Opção B — manter na raiz:** reescrever todos os links/canonical/README/og acima
  para apontar para a raiz (sem `/iconocracia/`). Menos arquivos movidos.

> Recomendação: **Opção A** alinha com o intent já declarado (canonical, README, ícone),
> mas a decisão é da pesquisadora.

---

## 3. Drift de dados na cadeia corpus → site (REGISTRO)

Contagens verificadas em 2026-06-15:

| Fonte | Documentado (CLAUDE.md) | Real (2026-06-15) |
|---|---|---|
| `iconocracy-corpus/corpus/corpus-data.json` | 264 | **314 itens** |
| `iconocracy-corpus/data/processed/records.jsonl` | 265 | **308 registros** |
| itens codificados (com `regime`) em corpus-data.json | — | **223** (≈71%) |
| itens com `coded_by` | — | 230 |
| `companion-data.json` (`corpus_total`) | 165 | stale |
| site `atlas/data.js` (antes desta rodada) | — | "247 placas", "62% codificado" |

### Itens para uma rodada futura no repo `iconocracy-corpus` (fora de escopo agora)
1. Atualizar a seção "Known Data Issues" do `iconocracy-corpus/CLAUDE.md` (264/265 → 314/308).
2. Reconciliar o drift de 6 itens entre `corpus-data.json` (314) e `records.jsonl` (308)
   via `python tools/scripts/records_to_corpus.py --diff` / release gate.
3. Rebuild de `companion-data.json` via `python tools/scripts/sync_companion.py` e push
   ao companion (`--push https://iconocracia-companion.warholana.workers.dev`).

> Nota: o número **223 codificados** coincide com a opção "N≈223 (todos codificados)" da
> decisão metodológica em aberto (`docs/decisions/DIALETICA-N165-vs-265.md`). O N analítico
> da tese segue em decisão; o stat público "placas no corpus" mede *coleta*, não N analítico.

---

## 4. Números do site — ATUALIZADO nesta rodada

Bloco `stats` em `atlas/data.js` (linhas 14–19), único ponto de exibição de contagens
(o `atlas-lab/data.js` usa `entryCount` derivado de exemplos demonstrativos — `status:
'demonstrative-ui-seed'` — e não foi tocado).

| Métrica | Antes | Depois | Origem |
|---|---|---|---|
| placas no corpus | 247 | **314** | contagem de `corpus-data.json` (export público) |
| painéis do atlas | 8 | 8 | mantido |
| indicadores | 10 | 10 | mantido |
| codificado | 62% | **71%** | 223 com `regime` ÷ 314 |

---

## 5. Outros achados menores

- `atlas-lab/data.js` declara `canonicalDataSources: ['data/processed/records.jsonl',
  'corpus/corpus-data.json']`, arquivos que **não estão neste repositório** (vivem em
  `iconocracy-corpus`). É seed de UI demonstrativa, não dado canônico — documentado aqui
  para evitar confusão futura.
- `README.md:8` ("No ar") aponta para `https://anavvanzin.github.io/iconocracia/`, que
  hoje dá 404 — corrigir junto com a decisão da §2.
