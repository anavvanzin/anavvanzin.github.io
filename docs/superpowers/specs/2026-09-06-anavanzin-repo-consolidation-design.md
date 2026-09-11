# Design — Consolidação do site anavanzin.com (repos duplicados + deploy seguro)

Data: 2026-09-06
Status: Rascunho para revisão da Ana (brainstorming — sem execução destrutiva ainda)

## Contexto (verificado em 2026-09-06)

O site é o repositório `anavvanzin/anavvanzin.github.io` (site acadêmico
pessoal — ICONOCRACIA / *Iuris Memoria*; anavanzin.com).

- **Fonte de verdade / deploy real:** `origin/main` → GitHub Pages (anavanzin.com),
  acionado por `.github/workflows/deploy-pages.yml`. Worker Cloudflare `anavvanzin`
  é **espelho técnico manual** (iconocracia.com), deploy via `wrangler deploy`,
  sem CI. Vercel desabilitado.
- Cópias locais do mesmo repo (duplicadas):
  - `~/Research/20262/1github/anavvanzin` (1,3 GB) — branch `feat/quotes-folio-concordancia`, **sem upstream**, carrega o painel Quotes.
  - `~/Research/20262/1github/anavvanzin.github.io` (1,5 GB) — branch `feat/tarot-da-iconocracia`, detém o Tarot.
  - `~/Documents/GitHub/anavvanzin.github.io` — 4ª cópia, branch `main`.
  - `~/Research/anavanzinparte242` — repo GitHub próprio divergente, mesmo wrangler `name: anavvanzin` (hazard de deploy). Já neutralizado em 2026-09-06.
- `anavanzin-main` (em `1github/`): worktree órfão, ~439 MB, acesso instável
  (provável estado cloud/FileProvider). NÃO é clonável/commitável. Não deve ser
  tocado por script; tratar via Finder.
- Trabalho vivo NÃO mergeado em `origin/main`: **Tarot** e **Quotes**.

## Objetivo

Uma única raiz de trabalho e deploy; impossível deploy acidental de cópia errada;
trabalho vivo (Tarot, Quotes) preservado e reconciliado via remoto (nunca merge
de árvores locais divergentes).

## Clone canônico eleito (a confirmar)

`~/Research/20262/1github/anavvanzin.github.io/` — mais recente, em dia com
origin, detém o Tarot.

## Fases

### Fase 0 — Guarda-rail imediato (parcialmente feito)
Todo `wrangler.jsonc` de raiz NÃO-canônica recebe nome de worker neutro
(`<nome>--neutered-do-not-deploy`).
- Feito: `anavanzinparte242`.
- Pendente: `1github/anavvanzin/`, `Documents/GitHub/anavvanzin.github.io`.

### Fase 1 — Reconciliação do trabalho vivo
- Commitar dirty real do clone canônico na branch Tarot.
- Publicar Quotes (originado em `1github/anavvanzin/`) como branch própria no remoto.
- Merge em main: SOMENTE com OK explícito da Ana + push.

### Fase 2 — Neutralizar/arquivar duplicatas
- Tornar raízes não-canônicas em não-clones (remover `.git` ou arquivar),
  começando pelas sem trabalho único.
- `anavanzin-main`: tratar via Finder (nunca script) por instabilidade cloud.

### Fase 3 — deploy.sh de guarda (no canônico)
Script que: (a) verifica que está no clone canônico; (b) roda `stage:assets`;
(c) `wrangler deploy`. CI no GitHub: opcional/adiado.

### Fase 4 — Documentação
- Atualizar skill `anavanzin-website` com mapa canônico + comando seguro.
- Atualizar CLAUDE.md do canônico.

## Regras duras
- Só o clone canônico deploya. Nomes de worker de não-canônicos sempre neutros.
- Push/merge em main: exigem OK explícito.
- `anavanzin-main`: nunca tocar por script.

## Decisões em aberto para a Ana
1. Confirmar clone canônico = `1github/anavvanzin.github.io`.
2. Merge de Tarot + Quotes em main agora, ou manter em branch.
3. Nível do guarda-rail: só script (deploy.sh) ou também CI (GH Actions).
