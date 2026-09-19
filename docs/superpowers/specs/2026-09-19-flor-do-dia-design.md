# Flor do Dia + A Vigilante — Design

> **Data:** 2026-09-19 · **Status:** aprovado (seções 1–3) · **Origem:** sessão brainstorming
> **Escopo:** substituir `tarot/` por um oráculo diário hanafuda ("Sorte ou Azar") com o baralho MUJO, e adicionar A Vigilante, criatura pixel silenciosa no desktop.

## Contexto

O site anavanzin.com (Worker `anavvanzin`, assets estáticos, deploy via wrangler) tinha um `tarot/` ("Tarô da Iconocracia", 5 cartas). Ana julgou a mecânica de mascote/XP "besta" e pediu algo etimologicamente interessante com as ilustrações existentes.

O achado conceitual: **azar ← ár. az-zahr (اَلزَّهْر)** — a mesma palavra árabe para *o dado* e *a flor* (a flor marcava a face vencedora do dado). Hanafuda é literalmente "cartas de flores". O jogo é sobre o acaso como instituição, não misticismo.

O material visual já existe: baralho **MUJO (無常, impermanência)** — 28 lâminas em formato de fechamento de braço de irezumi (`/Users/ana/Research/o-grande-jogo-das-alegorias/ALEGORIAS/MUJO_28_images/`), misturando hanafuda, yokai, arcanos re-encarnados e alegorias jurídicas (a Miko Vendada = Justitia com balança de vela/crisântemo e katana).

## Seção 1 — Conceito

**A peça:** `sorte/` substitui `tarot/` no desktop e nas rotas. Título da página: **"Sorte ou Azar — a flor do dia"**.

**Experiência:** página escura, silenciosa. Uma lâmina virada para baixo ao centro. Ao tocar, ela vira e revela:

- nome PT da lâmina (ex.: *A Miko Vendada*) + nome JP (kanji/rōmaji)
- qualidade: **幸 sorte** · **厄 azar** · **転 revés** (rara; depende de contexto)
- uma linha de leitura bilingue PT/EN, registro de dicionário iconográfico (não horóscopo)
- rodapé etimológico fixo: *azar ← ár. az-zahr, "o dado" e "a flor" — a mesma palavra para o instrumento do acaso e o seu símbolo vencedor.*

A lâmina é **determinística por data** (hash da data → índice no deck; fuso do visitante). Todos veem a mesma flor no mesmo dia. Sem "tirar outra" — a impermanência não negocia. Nota discreta: *"volte amanhã."*

**A Vigilante:** criatura pixel silenciosa no desktop — sem balão, sem XP, sem convite. Segura um pequeno chochin; a lanterna fica **acesa** quando o visitante já viu a flor do dia. Nada explica isso. Clicar nela abre `sorte/`.

## Seção 2 — O oráculo: classificação das 28 lâminas

**幸 sorte (10):** chochin · inoshikachō (a maior sorte do baralho) · tsukimi · chōmurasaki · dança de Ikkyū · Fudō da balança · **A Miko Vendada** · chamas iguais · testemunhas de pedra · eremita

**厄 azar (10):** mão esquelética · caveira derretida · namakubi · aoandon · jigoku · torre de Raijin · katana 893 · gashadokuro · centésima chama · espelho de Enma

**転 revés (8):** mariposa da alma · bakuto (o jogador) · sapo do tofu · caveira e crisântemo · leque de chama · yamabushi (o Louco) · kitsunebi · julgamento do tengu

Cada lâmina: `{ slug, nome: {pt, en}, jp, qualidade, leitura: {pt, en}, img }`.

Exemplo do tom da leitura:

> **A Miko Vendada** — 幸 sorte. *Vendada como a Justiça, mas o que ela pesa não é a culpa: é a vela contra o crisântemo, o tempo contra a promessa.*

**Elenco da Vigilante (3 sprites pixel):** a Miko Vendada, o Bakuto, a Mariposa — justiça, acaso, alma. Pixel art nova derivada das lâminas MUJO.

## Seção 3 — Arquitetura técnica

Repo: `/Users/ana/Research/site-anavvanzin/` (deploy = Worker `anavvanzin`).

```
sorte/
  index.html     — página do oráculo (standalone, padrão tarot/)
  style.css      — tokens Vanguard; sala escura, lâmina central
  app.js         — hash da data → lâmina; flip; i18n PT/EN
  deck.js        — os 28 registros
  assets/        — 28 lâminas otimizadas (webp, alvo ~120 KB; originais 2–3 MB)
companheira.js   — A Vigilante no desktop (widget fora das janelas)
assets/vigilante/— 3 sprites × estados (sentada / chochin aceso)
```

**Decisões:**

1. **Seleção determinística:** `seed = YYYYMMDD` local → hash FNV-1a → índice 0–27. Função pura da data; sem servidor, sem estado.
2. **Saída do tarot:** `tarot/` removido do desktop (ícone/rota em `desktop-app.js` e links). `tarot/index.html` vira página-redirect estática (meta refresh + link) para `sorte/`, para links antigos não quebrarem. PNGs do tarô permanecem no repo fora do bundle de deploy, ou removidos dos assets — decidir na implementação (recomendado: manter no repo).
3. **Vigilante:** módulo vanilla JS carregado por `desktop-app.js`; posição fixa acima do dock; `image-rendering: pixelated`; piscar = 2 frames via CSS; lanterna = overlay. Lê `localStorage["florDoDia.vista"]` (data ISO) para acender o chochin — único fio entre as peças. Clique → `sorte/`.
4. **Peso:** a página carrega apenas a lâmina do dia; as outras 27 pré-carregam em idle após o primeiro flip. Modo discreto "ver o baralho inteiro" no rodapé.
5. **Acessibilidade:** `prefers-reduced-motion` zera animações (flip vira corte); mobile empilha; `alt` descritivo bilingue por lâmina.
6. **Design system:** estritamente Vanguard Protocol — paleta vellum/ink/rubric, três vozes tipográficas (Cormorant/Crimson Pro/JetBrains Mono), motion só `transform`/`opacity`, sem bounce, sem anti-padrões listados no handoff.
7. **Testes:** abrir `sorte/` local (desktop + viewport mobile); conferir determinismo da data; flip; lanterna da Vigilante acendendo após visita a `sorte/`; redirect de `tarot/`; deploy via wrangler no Worker `anavvanzin`.

## Fora de escopo (YAGNI)

- Koi-koi / hanafuda jogável, push-your-luck, multiplayer, backend, analytics
- Jogo da memória do corpus (arquivado da sessão; pode voltar depois)
- Áudio, backend Unity/UGS (skills carregadas por engano na sessão)
- XP, acessórios, balões de fala (rejeitados pela Ana como "besta")
