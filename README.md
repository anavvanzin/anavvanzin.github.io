# ICONOCRACIA · *Iuris Memoria*

> **A alegoria feminina como tecnologia visual do Estado.**
> Uma cartografia comparada do corpo feminino alegórico na cultura jurídica de seis nações — França, Reino Unido, Alemanha, Estados Unidos, Bélgica e Brasil — entre 1789 e 2000. *Onde o Estado precisou ser visto, vestiu uma mulher.*

Tese de Doutorado · **Ana Vanzin** · Programa de Pós-Graduação em Direito (PPGD/UFSC) · Grupo Ius Gentium · Florianópolis · MMXXVI

🔗 **No ar:** https://anavvanzin.github.io/iconocracia/

---

## O que há aqui

Site estático (HTML + React via CDN), sem build. Abra `index.html` — é a capa que liga as duas superfícies:

| | Superfície | Descrição |
|---|---|---|
| **I** | [`atlas/`](./atlas/) — **Atlas da Pesquisa** | A tese em página única: argumento, *anatomia da alegoria*, a parede de 27 espécimes, os oito painéis warburguianos, a *radiografia do endurecimento* e o léxico iconocrático. Tom claro/cabinet e mais ajustes via painel de *Tweaks*. |
| **II** | [`atlas-lab/`](./atlas-lab/) — **Atlas Lab** | Laboratório de inquérito visual: modos **Aprendizagem** e **Pesquisa**, painéis do módulo ICONOCRACY, radar dos dez indicadores iconométricos e comparação de espécimes lado a lado. |

## Estrutura

```
index.html        capa (Iuris Memoria)
styles.css        entrada do design system (importa fontes + tokens)
tokens/           cores, tipografia, espaçamento, base
fonts/            Instrument Serif · Crimson Pro · JetBrains Mono
assets/corpus/    espécimes do corpus (proveniência real)
atlas/            Atlas da pesquisa (index.html · data.js · parts.jsx · tweaks-panel.jsx)
atlas-lab/        Atlas Lab (index.html · data.js · app.jsx)
.nojekyll         desativa o Jekyll no GitHub Pages
```

## Publicação (Cloudflare Workers)

O site é servido como **Cloudflare Worker** (`anavvanzin`) com a raiz do repositório
publicada como *static assets* — ver `wrangler.jsonc`. Domínio: **anavanzin.com** (`CNAME`).

- **Deploy automático:** um push para `main` é publicado em ~1 min, via Cloudflare
  **Workers Builds** (integração Git no painel do Cloudflare).
- **Deploy manual:** `npx wrangler deploy` a partir da raiz do repositório.
- Roteamento de assets (404 customizado, trailing-slash) é explícito em `wrangler.jsonc`
  — não é GitHub Pages. O `.nojekyll` é legado e inofensivo.

Todos os caminhos são relativos — o site funciona em qualquer subdiretório, sem ajuste de caminho-base.

## Notas

- O corpus exibido é **demonstrativo e fiel ao schema** da pesquisa; a proveniência de cada peça acompanha sua legenda. Fontes: Gallica/BnF, Brasiliana, acervos institucionais (STF, Senado), numismática e filatelia de domínio público.
- As notas do modo Aprendizagem do Atlas Lab são salvas **localmente** no navegador (`localStorage`); a integração de IA é, por ora, um marcador reflexivo (*"em breve"*).

---

*© Ana Vanzin. Imagens reproduzidas para fins de pesquisa acadêmica; direitos dos respectivos acervos.*
