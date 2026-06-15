# anavanzin.com — pacote completo (com a página Trabalhos & Seminários)

Novidades: página **trabalhos.html** + ícone **trabalhos** na mesa (abre /trabalhos.html),
que lista o Seminário 8, o grupo Ius Gentium (site) e a Biblioteca digital.

## Subir tudo (sincronização completa) no repo anavvanzin.github.io
1. Add file → Upload files → arraste TODO o conteúdo desta pasta
   (index.html, conceitos.html, trabalhos.html, styles.css, _ds_bundle.js,
    icons.js, desktop-app.js, window-contents.js, assets/, .nojekyll, CNAME).
   Sobrescreve o que já existe.
2. **Se ainda existirem no repo, APAGUE** os arquivos antigos:
   **Desktop.js** e **WindowContents.js** (foram renomeados para desktop-app.js /
   window-contents.js). O index.html já aponta para os novos nomes.
3. NÃO apague a pasta **quotes/** nem os outros sub-sites (seminario8-dever-poder/,
   grupoiusgentium.com.br/) — a mesa e a página de trabalhos linkam para eles.
4. Commit. Em ~1 min, anavanzin.com atualiza.

A página /trabalhos/ linka para:
- /seminario8-dever-poder/  e  /seminario8-dever-poder/colegas.html
- /grupoiusgentium.com.br/  e  /grupoiusgentium.com.br/biblioteca.html

.nojekyll é essencial (sem ele o GitHub ignora _ds_bundle.js). Fontes via Google Fonts.
