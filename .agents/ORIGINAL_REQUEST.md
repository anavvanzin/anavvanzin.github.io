# Original User Request

## Initial Request — 2026-06-30T09:56:59Z

Build an Interactive Academic Poster Room ('poster.html') and integrated React component ('WPoster.js') for the doctoral research portal 'Iconocracia'. The room will display interactive, conference-style posters showcasing the thesis methodology, workflows (W1-W6), and the historical evolution of female legal allegories. The interface must use premium animations, spring physics transitions, and tactile micro-interactions.

Working directory: /Users/ana/.gemini/antigravity/worktrees/anavvanzin/create-new-feature-branch
Integrity mode: development

## Requirements

### R1. Renderização Dinâmica de Markdown
O aplicativo deve ler e analisar dinamicamente arquivos Markdown acadêmicos (`.md`) da pasta de documentos do repositório (`docs/` ou `hub/iconocracy-corpus/`), estruturando-os automaticamente em colunas e blocos legíveis de pôsteres (títulos, textos, listas, citações).

### R2. Estética Editorial & Vanguard Protocol
A interface deve seguir rigidamente o padrão visual *Vanguard Protocol* (tinta `#211B16`, papel `#F2EAD9`, rubrica `#9B2C1C` e ouro `#9C7C3D`). Os pôsteres e painéis devem usar a moldura nested *Double-Bezel* (Doppelrand), textura sutil de papel físico e capitulares (*Drop Caps*) nas seções de texto.

### R3. Coreografia de Movimento (Spring Physics)
A transição ao focar, aproximar (zoom) e expandir um pôster deve simular física de massa e inércia de molas, utilizando transições CSS baseadas em `cubic-bezier` de desaceleração pesada ou cálculos de física interpolada. Animações permitidas apenas via `transform` e `opacity` para aceleração por GPU.

### R4. Integração no Desktop e Página Principal
Integrar o aplicativo no desktop React (`desktop-app.js`, `window-contents.js` e `icons.js`) registrando a janela `poster` com tamanho adequado (ex: 800x600) e adicionando o ícone correspondente na home page (`index.html`).

## Acceptance Criteria

### Estrutura de Arquivos e Integração
- [ ] Criação de `poster.html` no diretório raiz do worktree.
- [ ] Integração do componente `WPoster` no arquivo `window-contents.js` e registro em `desktop-app.js`.
- [ ] O ícone do pôster é exibido corretamente na Área de Trabalho e abre a janela correspondente.

### Comportamento Visual e Interativo
- [ ] Os pôsteres mostram o conteúdo real lido a partir de arquivos `.md` locais do repositório.
- [ ] Ao interagir (hover/click), o pôster responde com efeitos de aproximação tátil suaves (sem transições lineares bruscas).
- [ ] A moldura segue a estrutura double-bezel (borda externa com padding e borda interna fina em ouro).

### Ausência de Erros e Performance
- [ ] O console do navegador não reporta erros de carregamento ou runtime ao abrir a Sala de Pôsteres.
- [ ] Responsividade: O layout se adapta elegantemente a visualizadores mobile sem quebrar os painéis de leitura.
