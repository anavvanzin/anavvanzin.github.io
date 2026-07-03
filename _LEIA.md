# anavanzin.com — pacote COMPLETO (subir tudo de uma vez)

Como você ainda não aplicou as mudanças do dia, **ignore os cartões soltos
anteriores** e use só este pacote: ele tem o site inteiro e atual.

## Como publicar (repo anavvanzin.github.io)
1. Abra o repositório no GitHub → **Add file → Upload files**.
2. Arraste **todo o conteúdo desta pasta** (incl. as subpastas `assets/` e
   `slides/`, e os arquivos ocultos `.nojekyll` e `CNAME`), substituindo o que
   existir.
3. **Commit changes**. Em ~1 min, `anavanzin.com` mostra a versão nova.

> NÃO apague as pastas que já estão no repo e não vêm aqui: `quotes/`,
> `seminario8-dever-poder/`, `grupoiusgentium.com.br/`. O upload só adiciona/
> substitui — elas permanecem.
> Se aparecerem `Desktop.js` ou `WindowContents.js` antigos no repo, **apague-os**
> (foram renomeados para `desktop-app.js` / `window-contents.js`).

## O que tem no pacote
Páginas: index · conceitos · trabalhos · perfil · readme · 404
Scripts da mesa (pré-compilados, sem Babel): icons.js · desktop-app.js · window-contents.js
Estilo + componentes: styles.css · _ds_bundle.js
assets/ : pixel-justitia, sun-seal, **banner.png** (tese), **mae.jpg** (foto da mãe), **og-image.png** (preview social)
slides/ : os 5 .pptx/.pdf das apresentações
.nojekyll (essencial — sem ele o GitHub ignora _ds_bundle.js) · CNAME (anavanzin.com)

## Resumo do que mudou hoje
- Mesa **mobile** própria; **sem Babel** em produção (mais rápido).
- **Open Graph** + favicon + página **404**.
- **Menu** consistente (conceitos · trabalhos · perfil · contato).
- **Perfil** com CV real do Lattes; **banner** do doutorado na janela “tese”;
  **mãe.jpg** (foto da mãe) na mesa.
- **Conceitos** repensada (índice + leitura, sem arrasto).
- **Comunicações** unificadas na página Trabalhos.

## Editar a mesa depois
A fonte editável fica em `ui_kits/desktop/` (JSX). Se mexer no JSX, é preciso
**recompilar** para gerar os .js — me peça que eu regenero o pacote.

As fontes (Cormorant Garamond + Hanken Grotesk) vêm do Google Fonts — o site
precisa de internet para a tipografia exata.
