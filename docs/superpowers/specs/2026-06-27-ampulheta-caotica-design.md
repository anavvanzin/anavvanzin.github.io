# Spec de Design — Ampulheta Caótica (`ampulheta.app`)
**Data:** 2026-06-27  
**Status:** Aprovado para Implementação (Abordagem A)  
**Autor:** Antigravity (Vanguard UI Architect)  

Este documento detalha o redesenho estético premium e a expansão conceitual da **Ampulheta Caótica** no desktop acadêmico de Ana Vanzin. O objetivo é transformar a simulação em um argumento visual da tese *Iconocracia*, descentralizando a Justitia e abraçando o corpus completo de alegorias femininas do direito e do Estado.

---

## 1. Visão Geral do Sistema
O aplicativo `ampulheta.app` é uma janela interativa que contém uma simulação de física em Canvas 2D. Ele roda de forma independente em `ampulheta.html` e é exibido via `iframe` no desktop React (`/mesa/`) e no desktop Vanilla (`/index.html`).

O redesenho introduz o **Ciclo das Soberanias**: a cada giro da ampulheta, a simulação avança para uma nova alegoria do corpus, atualizando a imagem gravada no fundo, as barreiras físicas de colisão e o conjunto de citações históricas da tese correspondentes.

```
+--------------------------------------------------+
| ampulheta.app - Iustitia & Soberanias            |
+--------------------------------------------------+
| [ GIRAR AMPULHETA ]                [ REINICIAR ] |
|                                                  |
|  +============================================+  |
|  |                \          /                |  |
|  |                 \  Areia /                 |  |
|  |                  \      /                  |  |
|  |                 .-*====*-.  <- Pêndulo     |  |
|  |                /  |    |  \    Caótico     |  |
|  |               /   o    o   \               |  |
|  |              /  Areia  Areia\              |  |
|  |             /    Acumulada   \             |  |
|  |            /   MARIANNE/JUST. \            |  |
|  |            +==================+            |  |
|  +============================================+  |
|                                                  |
|  +--------------------------------------------+  |
|  |  [Drop Cap] Citação acadêmica específica   |  |
|  |  referente à alegoria ativa no momento...   |  |
|  |  ----------------------------------------  |  |
|  |  Autor/Fonte da Citação                    |  |
|  +--------------------------------------------+  |
+--------------------------------------------------+
```

---

## 2. Diretrizez Visuais (Vanguard Protocol & Editorial Luxury)

### A. Paleta de Cores e Textura
- **Fundo:** Velino suave (`--paper` / `#F2EAD9`) com textura de papel de prensa obtida por um filtro SVG microscópico (`film-grain` com turbulência em baixa opacidade) para sensação tátil analógica.
- **Linhas e Obras:** Preto nanquim (`--ink` / `#211B16`) com destaques em rubrica medieval (`--rubric` / `#9B2C1C`) e detalhes metálicos em dourado escovado (`--gold` / `#9C7C3D`).
- **Areia:** Mistura de grãos em rubrica, ouro e ametista (`#6E5A86`), representando as tintas e as cores do arquivamento legal.

### B. Moldura Double-Bezel (Doppelrand)
A moldura do Canvas e dos blocos seguirá a arquitetura nested:
- **Outer Shell:** Borda de `1.5px` em `--ink` com preenchimento em `#F9F6EE` e sombra tátil de `4px 4px 0 rgba(33,27,22,0.12)`.
- **Inner Core:** Filete de `1px` em `--gold` contornando a simulação de forma contida.

### C. Tipografia Editorial & Drop Caps
- As citações usarão *Cormorant Garamond* em estilo itálico fluído e justificado.
- A primeira letra da citação será extraída dinamicamente via JS e renderizada como uma capitular ornamental grande (*Drop Cap*) em `--rubric` no início do parágrafo.

---

## 3. O Ciclo das 5 Alegorias (O Corpus da Tese)

A cada rotação de 180° da ampulheta, a gravidade se inverte, e o sistema avança para a próxima figura na sequência. Cada figura possui uma silhueta de xilogravura (com hachuras finas desenhadas no Canvas) e segmentos específicos de colisão física onde a areia se acumula:

| Sequência | Alegoria | Elementos Visuais no Canvas | Atributos Físicos de Colisão | Citação/Foco Temático |
|---|---|---|---|---|
| **1** | **Iustitia** | Venda em rubrica vermelha, balança e espada. | Ombros, pratos da balança, cabo da espada. | A sátira de 1494 do *Narrenschiff* e a venda como tolice. |
| **2** | **Marianne** | Barrete frígio na cabeça, lança com bandeira. | Ombros, ponta do barrete, lança e mastro. | O corpo feminino representando a Liberdade revolucionária. |
| **3** | **Britannia** | Elmo grego/romano, tridente e escudo circular. | Topo do elmo, pontas do tridente, borda superior do escudo. | A fusão entre império, lei marítima e divindade feminina. |
| **4** | **Germania** | Coroa de folhas de carvalho, espada larga na mão. | Ombros, coroa de carvalho, lâmina e guarda da espada. | A representação romântica e marcial da nação territorializada. |
| **5** | **Helvetia** | Lança, escudo com a cruz suíça e cabelo preso. | Ombros, haste da lança, topo do escudo quadrado. | A paz armada e a neutralidade representadas pela guardiã alpina. |

---

## 4. Engenharia de Física e Colisão
A física continuará a rodar a 60fps utilizando um loop em Canvas 2D otimizado:
- **Partículas de Areia (180 grãos):** Física de colisão círculo-círculo com elasticidade reduzida (`RESTITUTION: 0.16`) e atrito alto para simular material arenoso.
- **Pêndulo Duplo Caótico:** Suspenso a partir do centro da divisória da ampulheta. 
  - Resolvido via Integração de Verlet para garantir estabilidade absoluta no arraste com o mouse.
  - A articulação tip (bob) é afetada por gravidade rotacional e varre a areia fisicamente com uma força de impulso proporcional à sua velocidade angular.
  - Rastro de fósforo ametista dissolve-se progressivamente.
- **Segmentação Dinâmica:** Um vetor `activeSegments` conterá a lista de linhas de colisão da figura ativa. O resolvedor de colisões varrerá apenas este vetor a cada frame, otimizando o processamento.

---

## 5. Animação 3D de Rotação
Ao clicar em "Girar Ampulheta":
- Adiciona-se uma classe de transição tridimensional ao contorno exterior: `scale(0.94) rotate(N deg)`.
- A curva de animação utiliza `cubic-bezier(0.22, 1, 0.36, 1)` (desaceleração pesada de peso físico).
- Internamente, o motor calcula a mudança contínua do vetor de gravidade local em relação às paredes da ampulheta durante o giro, criando um movimento realista da areia deslizando pelas laterais.

---

## 6. Plano de Verificação
- **Transição de Figuras:** Confirmar que ao girar, os grãos mudam de local físico, a silhueta da xilogravura se transforma de forma limpa e a nova citação herda o *Drop Cap* correto.
- **Física de Colisão:** Testar se a areia se deposita perfeitamente sobre os novos obstáculos (como o escudo da Britannia ou a lança da Marianne).
- **Responsividade:** Garantir que o canvas de proporção 3:4 mantenha-se centralizado e sem scrollbars nas janelas de desktop de 480px de largura.
