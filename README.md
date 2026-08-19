# ICONOCRACIA · *Iuris Memoria*

> **A alegoria feminina como tecnologia visual do Estado.**
> Uma cartografia comparada do corpo feminino alegórico na cultura jurídica de seis nações — França, Reino Unido, Alemanha, Estados Unidos, Bélgica e Brasil — entre 1789 e 2000. *Onde o Estado precisou ser visto, vestiu uma mulher.*

Tese de Doutorado · **Ana Vanzin** · Programa de Pós-Graduação em Direito (PPGD/UFSC) · Grupo Ius Gentium · Florianópolis · MMXXVI

🔗 **No ar:** https://anavanzin.com/atlas/

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

## Publicação

Domínio canônico: **anavanzin.com**.

### O que serve o domínio hoje

`anavanzin.com` aponta exclusivamente para **GitHub Pages** (atrás do proxy
Cloudflare). Um push em `main` dispara
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

### Cloudflare Workers (`anavvanzin`)

Há também um Worker técnico com a mesma árvore estática (`wrangler.jsonc`), usado
para validação e testes de assets; ele não é a origem pública de
`anavanzin.com`. Workers Builds estava quebrado porque o diretório temporário
`.worker-assets/` não existe em um checkout remoto limpo antes de `npx wrangler deploy`.

O Worker serve a raiz do checkout e [`.assetsignore`](.assetsignore) exclui `.git/`,
infraestrutura interna e mídia acima do limite de 25 MiB. Assim o comando padrão
do Workers Builds e o deploy manual usam exatamente o mesmo caminho.

- **Deploy manual:** `npm run deploy:worker`
- **Workers Builds:** comando padrão `npx wrangler deploy` (sem etapa prévia)
- **GitHub Pages:** ainda usa `npm run stage:assets` para gerar o artifact do workflow

### Vercel

Vercel está desativado para deploys automáticos de Git neste repo. O arquivo
[`vercel.json`](vercel.json) mantém `git.deploymentEnabled: false`; o domínio
canônico continua em GitHub Pages/Cloudflare.

Todos os caminhos são relativos — o site funciona em qualquer subdiretório, sem ajuste de caminho-base.

## Notas

- O corpus exibido é **demonstrativo e fiel ao schema** da pesquisa; a proveniência de cada peça acompanha sua legenda. Fontes: Gallica/BnF, Brasiliana, acervos institucionais (STF, Senado), numismática e filatelia de domínio público.
- As notas do modo Aprendizagem do Atlas Lab são salvas **localmente** no navegador (`localStorage`); a integração de IA é, por ora, um marcador reflexivo (*"em breve"*).

---

*© Ana Vanzin. Imagens reproduzidas para fins de pesquisa acadêmica; direitos dos respectivos acervos.*
