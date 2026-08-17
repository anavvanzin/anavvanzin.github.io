# Desktop-arquivo — sistema de janelas

Data: 2026-08-17

## Finalidade

A página inicial de `anavanzin.com` combina o sistema editorial Mnemosyne Viva
com uma camada de interação própria: o desktop-arquivo. Essa camada organiza
os materiais da pesquisa como janelas móveis, arquivos, ícones e um dock. Ela
não substitui as páginas editoriais nem cria um tema escuro.

## Tokens do desktop

| Grupo | Tokens | Uso |
| --- | --- | --- |
| Estrutura | `--desktop-titlebar-height`, `--desktop-dock-height`, `--desktop-dock-height-mobile` | Barra da janela, dock e layout compacto. |
| Interação | `--desktop-hit-target`, `--desktop-control-glyph`, `--desktop-ui-text`, `--desktop-window-title-text`, `--desktop-meta-text` | Alvos de toque, chrome e tipografia de interface. |
| Forma | `--desktop-icon-radius` | Bloco de ícone do arquivo. |
| Elevação | `--desktop-elevation-idle`, `--desktop-elevation-active`, `--desktop-elevation-icon`, `--desktop-elevation-icon-active`, `--desktop-elevation-sheet` | Sombras duras do sistema desktop; não usar em páginas editoriais. |
| Cor | `--desktop-dock-rule`, `--desktop-hover-surface` | Separadores e feedback discreto. |

Os tokens usam a paleta Mnemosyne Viva. Os aliases legados (`--rubric`,
`--gold`) podem permanecer em superfícies já existentes, mas novos componentes
devem preferir os nomes canônicos da paleta quando não precisarem de
compatibilidade.

## Componente: Janela de Arquivo

### Quando usar

Usar para conteúdos breves, navegáveis e exploratórios da mesa de trabalho.
Páginas longas, lineares ou que exigem leitura contínua continuam como rotas
editoriais.

### Estados

| Estado | Visual | Comportamento |
| --- | --- | --- |
| Ativa | Sombra `--desktop-elevation-active`; titlebar listrada | Recebe foco e fica no topo. |
| Inativa | Sombra `--desktop-elevation-idle`; título atenuado | Continua visível e pode voltar ao topo. |
| Minimizada | Título no dock | Reabre pelo botão correspondente no dock. |
| Compacta | Uma janela fixa tipo sheet | É modal, prende Tab internamente e pode fechar pelo backdrop. |

### Interações e teclado

- A barra de título arrasta somente no desktop; o cursor é `grab`.
- O botão de fechar remove a janela e devolve o foco ao acionador.
- O botão de minimizar envia a janela ao dock.
- `Escape` fecha a janela ativa, exceto quando Tabula está em zoom.
- No modo compacto, Tab circula dentro da janela ativa.
- Controles, seletor de idioma e ações mobile têm alvo mínimo de 44 × 44 px.

### Acessibilidade

- A moldura usa `role="dialog"` e referencia o título visível com
  `aria-labelledby`.
- Ícones e controles usam elementos `button` com rótulos acessíveis.
- Hover nunca é a única indicação de estado: foco, seleção e título ativo
  continuam visíveis por teclado e toque.
- O sistema respeita `prefers-reduced-motion` pelo token global de movimento.

## Padrões de feedback

- Menus revelam um filete interno no hover.
- Ícones de desktop avançam 1 px por transformação visual, sem alterar layout.
- Controles de janela escurecem a superfície interna no hover e pressionam 1 px
  no estado ativo.
- Itens do dock recebem contorno interno dourado no hover.

Esses feedbacks devem usar `--duration-ui` e não reposicionar conteúdo, para
não conflitar com arraste ou produzir saltos de layout.

## Responsividade

Acima de 1024 px, a mesa pode ter janelas sobrepostas e arrastáveis. Em até
1024 px, o sistema passa para uma janela fixa por vez, com navegação e ícones
roláveis, sem overflow horizontal e sem simular sobreposição.
