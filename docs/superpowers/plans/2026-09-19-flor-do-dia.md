# Flor do Dia + A Vigilante — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir `tarot/` pelo oráculo diário `sorte/` (baralho MUJO, 28 lâminas) e adicionar A Vigilante (criatura pixel silenciosa) ao desktop do site anavanzin.com.

**Architecture:** Site estático servido pelo Worker `anavvanzin` (assets-only, deploy via wrangler). A página `sorte/` é standalone (padrão `tarot/`): `deck.js` com 28 registros, `app.js` com seleção determinística por data (hash FNV-1a) e flip de carta. `companheira.js` é um módulo vanilla no desktop que lê `localStorage["florDoDia.vista"]` e acende a lanterna da Vigilante. Sem backend, sem build step.

**Tech Stack:** HTML/CSS/JS vanilla, Pillow (managed python) para otimização de imagens, Node para scripts de teste, wrangler para deploy.

## Global Constraints

- Repo: `/Users/ana/Research/site-anavvanzin/` — todos os caminhos são relativos a ele.
- Git: commit com `-c user.name=anavvanzin -c user.email=77904873+anavvanzin@users.noreply.github.com` e `GIT_EDITOR=true`. Branch `main`.
- Design system: Vanguard Protocol — `--paper: #EFE5CF`, `--ink: #1A1612`, `--rubric: #9B2C1C`; display Cormorant Garamond, corpo Crimson Pro, mono JetBrains Mono; animações SÓ `transform`/`opacity`, cubic-bezier `0.22, 1, 0.36, 1`; `prefers-reduced-motion` zera tudo. PROIBIDO: Inter/Roboto/Arial, Lucide/FontAwesome, bounce, `1px solid gray`, shadow-md.
- Bilingue PT/EN em todo texto visível (`window.AV.lang`, default `pt`).
- Qualidades das lâminas: usar EXATAMENTE os kanji 幸 (sorte), 厄 (azar), 転 (revés).
- Não usar Unity/UGS, não usar backend, não usar XP/balões/gamificação.

---

### Task 1: Otimizar as 28 lâminas MUJO para web

**Files:**
- Create: `sorte/assets/*.webp` (28 arquivos)
- Create: `scripts/otimizar-laminas.py`
- Test: `scripts/test-assets.sh`

**Interfaces:**
- Consome: `/Users/ana/Research/o-grande-jogo-das-alegorias/ALEGORIAS/MUJO_28_images/{1..28}_*.png`
- Produz: `sorte/assets/<slug>.webp` — os slugs exatos (usados pelo `deck.js` da Task 2):
  `mao-esqueletica, caveira-derretida, mariposa-da-alma, namakubi, aoandon, chochin, bakuto, jigoku, inoshikacho, torre-de-raijin, tsukimi, chomurasaki, sapo-do-tofu, caveira-e-crisantemo, katana-893, leque-de-chama, gashadokuro, yamabushi, centesima-chama, danca-de-ikkyu, kitsunebi, eremita, fudo-da-balanca, miko-vendada, julgamento-do-tengu, espelho-de-enma, chamas-iguais, testemunhas-de-pedra`

- [ ] **Step 1: Escrever o script de conversão**

`scripts/otimizar-laminas.py`:
```python
#!/usr/bin/env python3
"""Converte as 28 lâminas MUJO (PNG ~2-3 MB) para webp otimizado em sorte/assets/."""
from pathlib import Path
from PIL import Image

SRC = Path("/Users/ana/Research/o-grande-jogo-das-alegorias/ALEGORIAS/MUJO_28_images")
DST = Path(__file__).resolve().parent.parent / "sorte" / "assets"
DST.mkdir(parents=True, exist_ok=True)

# número do arquivo -> slug
SLUGS = {
    1: "mao-esqueletica", 2: "caveira-derretida", 3: "mariposa-da-alma",
    4: "namakubi", 5: "aoandon", 6: "chochin", 7: "bakuto", 8: "jigoku",
    9: "inoshikacho", 10: "torre-de-raijin", 11: "tsukimi", 12: "chomurasaki",
    13: "sapo-do-tofu", 14: "caveira-e-crisantemo", 15: "katana-893",
    16: "leque-de-chama", 17: "gashadokuro", 18: "yamabushi",
    19: "centesima-chama", 20: "danca-de-ikkyu", 21: "kitsunebi",
    22: "eremita", 23: "fudo-da-balanca", 24: "miko-vendada",
    25: "julgamento-do-tengu", 26: "espelho-de-enma", 27: "chamas-iguais",
    28: "testemunhas-de-pedra",
}

for n, slug in SLUGS.items():
    matches = list(SRC.glob(f"{n}_*.png"))
    assert len(matches) == 1, f"esperava 1 arquivo para {n}, achei {matches}"
    img = Image.open(matches[0]).convert("RGB")
    img.thumbnail((720, 1035), Image.LANCZOS)  # metade da origem: nitidez retina sem peso
    out = DST / f"{slug}.webp"
    img.save(out, "WEBP", quality=82, method=6)
    print(f"{out.name}: {out.stat().st_size // 1024} KB")
print("OK — 28 lâminas")
```

- [ ] **Step 2: Rodar e verificar falha/sucesso**

Run: `python scripts/otimizar-laminas.py`
Expected: 28 linhas `*.webp: NN KB` e `OK — 28 lâminas`. Cada arquivo ≤ 200 KB.

- [ ] **Step 3: Teste de sanidade dos assets**

`scripts/test-assets.sh`:
```bash
#!/bin/bash
set -e
cd "$(dirname "$0")/.."
count=$(ls sorte/assets/*.webp | wc -l | tr -d ' ')
[ "$count" = "28" ] || { echo "FAIL: $count webp, esperava 28"; exit 1; }
big=$(find sorte/assets -name "*.webp" -size +200k | wc -l | tr -d ' ')
[ "$big" = "0" ] || { echo "FAIL: $big arquivos > 200KB"; find sorte/assets -name "*.webp" -size +200k; exit 1; }
echo "PASS: 28 webp, todos <= 200KB"
```

Run: `bash scripts/test-assets.sh` → Expected: `PASS: 28 webp, todos <= 200KB`

- [ ] **Step 4: Commit**

```bash
git add scripts/otimizar-laminas.py scripts/test-assets.sh sorte/assets/
GIT_EDITOR=true git -c user.name=anavvanzin -c user.email=77904873+anavvanzin@users.noreply.github.com commit -m "feat(sorte): otimiza as 28 lâminas MUJO para webp"
```

---

### Task 2: O baralho — `sorte/deck.js` com os 28 registros

**Files:**
- Create: `sorte/deck.js`
- Test: `scripts/test-deck.js`

**Interfaces:**
- Produz: `window.AVDeck` — array de 28 objetos `{ slug, img, jp, qualidade, nome: {pt, en}, leitura: {pt, en} }`, onde `qualidade ∈ {'sorte','azar','reves'}` e `img = "assets/<slug>.webp"`.
- Consome (Task 3): `window.AVDeck[i].nome[lang]`, `.leitura[lang]`, `.qualidade`, `.jp`, `.img`.

- [ ] **Step 1: Escrever o teste que falha**

`scripts/test-deck.js`:
```js
// Valida a integridade do baralho: 28 lâminas, campos, slugs únicos, contagens sorte/azar/revés.
global.window = {};
require("../sorte/deck.js");
const d = global.window.AVDeck;
const assert = require("assert");
assert.strictEqual(d.length, 28, "deck deve ter 28 lâminas");
const slugs = new Set();
const q = { sorte: 0, azar: 0, reves: 0 };
for (const c of d) {
  assert.ok(c.slug && !slugs.has(c.slug), `slug ausente/duplicado: ${c.slug}`);
  slugs.add(c.slug);
  assert.strictEqual(c.img, `assets/${c.slug}.webp`, `img errada em ${c.slug}`);
  assert.ok(["sorte", "azar", "reves"].includes(c.qualidade), `qualidade inválida em ${c.slug}`);
  q[c.qualidade]++;
  assert.ok(c.jp && c.jp.length > 0, `jp ausente em ${c.slug}`);
  for (const k of ["nome", "leitura"]) {
    assert.ok(c[k].pt && c[k].en, `${k} incompleto em ${c.slug}`);
  }
}
assert.deepStrictEqual(q, { sorte: 10, azar: 10, reves: 8 }, "contagem sorte/azar/revés errada");
console.log("PASS: deck íntegro", q);
```

Run: `node scripts/test-deck.js`
Expected: FAIL — `Cannot find module '../sorte/deck.js'`

- [ ] **Step 2: Escrever `sorte/deck.js` completo**

`sorte/deck.js`:
```js
/* O baralho MUJO (無常) — 28 lâminas. qualidade: sorte 幸 | azar 厄 | reves 転 */
(function () {
  function L(slug, jp, qualidade, nomePt, nomeEn, pt, en) {
    return {
      slug: slug, img: "assets/" + slug + ".webp", jp: jp, qualidade: qualidade,
      nome: { pt: nomePt, en: nomeEn }, leitura: { pt: pt, en: en }
    };
  }
  window.AVDeck = [
    L("mao-esqueletica", "骨の手", "azar", "A Mão Esquelética", "The Skeletal Hand",
      "O que a morte segura não se desapega: toda posse é, no fim, uma questão de tempo.",
      "What death holds, it does not release: all possession is, in the end, a matter of time."),
    L("caveira-derretida", "溶ける髑髏", "azar", "A Caveira Derretida", "The Melting Skull",
      "Até o osso, que jurávamos definitivo, escorre. Nada testemunha para sempre.",
      "Even bone, which we swore was final, runs. Nothing bears witness forever."),
    L("mariposa-da-alma", "魂の蛾", "reves", "A Mariposa da Alma", "The Soul Moth",
      "A alma em trânsito não teme a chama; ela a confunde com a porta.",
      "The soul in transit does not fear the flame; it mistakes it for the door."),
    L("namakubi", "生首", "azar", "Namakubi", "Namakubi",
      "A cabeça cortada dos romances de guerreiros: a justiça que se faz à espada não recorre.",
      "The severed head of warrior tales: justice done by the sword admits no appeal."),
    L("aoandon", "青行燈", "azar", "Aoandon, a Lanterna Azul", "Aoandon, the Blue Lantern",
      "Quando se apaga a centésima vela, ela chega. O fim de toda boa narração é um encontro.",
      "When the hundredth candle goes out, she arrives. The end of every good telling is an encounter."),
    L("chochin", "提灯", "sorte", "O Chochin", "The Paper Lantern",
      "A luz de papel não expulsa a noite; ensina a andar com ela.",
      "Paper light does not banish the night; it teaches you to walk with it."),
    L("bakuto", "博徒", "reves", "O Bakuto", "The Gambler",
      "O jogador profissional sabe o que o jurista esquece: a regra é sempre de quem banca a mesa.",
      "The professional gambler knows what the jurist forgets: the house always writes the rules."),
    L("jigoku", "地獄", "azar", "Jigoku", "Jigoku",
      "O inferno japonês tem burocracia: cada falta registrada, cada pena com artigo.",
      "The Japanese hell has a bureaucracy: every fault on record, every sentence with its article."),
    L("inoshikacho", "猪鹿蝶", "sorte", "Inoshikachō", "Inoshikachō",
      "Javali, veado e borboleta: a trinca que vira o jogo. Até o acaso, às vezes, faz justiça.",
      "Boar, deer and butterfly: the hand that turns the game. Even chance, sometimes, does justice."),
    L("torre-de-raijin", "雷電の塔", "azar", "A Torre de Raijin", "The Tower of Raijin",
      "O trovão não pede licença. Há decisões que caem como o raio: súbitas e sem recurso.",
      "Thunder asks no leave. Some rulings fall like lightning: sudden and without appeal."),
    L("tsukimi", "月見", "sorte", "Tsukimi, a Vigília da Lua", "Tsukimi, the Moon Viewing",
      "Sentar-se para ver a lua é o contrário do processo: um rito que não pede resultado.",
      "Sitting to watch the moon is the opposite of litigation: a rite that asks for no outcome."),
    L("chomurasaki", "紫蝶", "sorte", "Chōmurasaki, a Borboleta Roxa", "Chōmurasaki, the Purple Butterfly",
      "A borboleta que volta é saudade que aceitou a forma de bicho. Sorte é saber recebê-la.",
      "The butterfly that returns is longing in animal form. Luck is knowing how to receive it."),
    L("sapo-do-tofu", "豆腐蛙", "reves", "O Sapo do Tofu", "The Tofu Frog",
      "Carrega tofu numa folha e finge seriedade. Todo tribunal tem o seu dia de farsa.",
      "It carries tofu on a leaf and feigns solemnity. Every court has its day of farce."),
    L("caveira-e-crisantemo", "髑髏と菊", "reves", "A Caveira e o Crisântemo", "The Skull and the Chrysanthemum",
      "A morte e a longevidade no mesmo vaso. Depende do ângulo: epitáfio ou buquê.",
      "Death and longevity in the same vase. It depends on the angle: epitaph or bouquet."),
    L("katana-893", "八九三の刀", "azar", "A Katana 893", "The 893 Katana",
      "O número que não se diz em voz alta. Há códigos mais antigos que a lei, e menos escritos.",
      "The number not said aloud. There are codes older than law, and far less written."),
    L("leque-de-chama", "炎の団扇", "reves", "O Leque de Chama", "The Flame Fan",
      "O leque que atiça o fogo não escolhe o que queima. Instrumento é inocente até a direção.",
      "The fan that feeds the fire does not choose what burns. An instrument is innocent until aimed."),
    L("gashadokuro", "がしゃどくろ", "azar", "Gashadokuro", "Gashadokuro",
      "O esqueleto gigante dos que morreram sem enterro: a injustiça acumulada também se levanta.",
      "The giant skeleton of the unburied dead: accumulated injustice also rises."),
    L("yamabushi", "山伏", "reves", "O Yamabushi", "The Yamabushi Fool",
      "O louco das montanhas desce sem mapa. Todo começo é uma forma educada de vertigem.",
      "The mountain fool descends without a map. Every beginning is a polite form of vertigo."),
    L("centesima-chama", "百目の炎", "azar", "A Centésima Chama", "The Hundredth Flame",
      "Apagar cem velas é convidar o escuro a falar. Há rituais que não deviam terminar.",
      "Snuffing a hundred flames invites the dark to speak. Some rituals should never end."),
    L("danca-de-ikkyu", "一休の踊り", "sorte", "A Dança de Ikkyū", "The Dance of Ikkyū",
      "O monge que dança no velório entendeu antes de todos: a impermanência é também alívio.",
      "The monk who dances at the wake understood first: impermanence is also relief."),
    L("kitsunebi", "狐火", "reves", "Kitsunebi, o Fogo da Raposa", "Kitsunebi, the Fox Fire",
      "A luz que guia para fora da trilha. Nem toda prova ilumina; algumas seduzem.",
      "The light that leads you off the trail. Not all evidence illuminates; some of it seduces."),
    L("eremita", "隠者", "sorte", "O Eremita", "The Hermit",
      "Recolher-se não é fugir: é audicionar a própria consciência em sessão fechada.",
      "Withdrawing is not fleeing: it is hearing one's own conscience in closed session."),
    L("fudo-da-balanca", "不動の天秤", "sorte", "Fudō da Balança", "Fudō of the Scales",
      "O Imóvel segura o fogo numa mão e a medida na outra. A justiça não treme.",
      "The Immovable One holds fire in one hand and measure in the other. Justice does not tremble."),
    L("miko-vendada", "目隠し巫女", "sorte", "A Miko Vendada", "The Blindfolded Miko",
      "Vendada como a Justiça, mas o que ela pesa não é a culpa: é a vela contra o crisântemo, o tempo contra a promessa.",
      "Blindfolded like Justice, but what she weighs is not guilt: candle against chrysanthemum, time against promise."),
    L("julgamento-do-tengu", "天狗の裁き", "reves", "O Julgamento do Tengu", "The Tengu's Judgment",
      "O tengu pune a vaidade, não o crime. Há tribunais que julgam quem você pensa que é.",
      "The tengu punishes vanity, not crime. Some courts judge who you think you are."),
    L("espelho-de-enma", "閻魔の鏡", "azar", "O Espelho de Enma", "Enma's Mirror",
      "No espelho do rei dos mortos, sua vida inteira, sem edição. A pior prova é a íntegra.",
      "In the dead king's mirror, your whole life, unedited. The worst evidence is the full record."),
    L("chamas-iguais", "等しき炎", "sorte", "As Chamas Iguais", "The Equal Flames",
      "Duas velas, uma altura. A igualdade não é ausência de fogo: é fogo na mesma medida.",
      "Two candles, one height. Equality is not the absence of fire: it is fire in equal measure."),
    L("testemunhas-de-pedra", "石の証人", "sorte", "As Testemunhas de Pedra", "The Stone Witnesses",
      "Os jizō à beira do caminho não esquecem nada. A memória é a única testemunha que não se intimida.",
      "The roadside jizō forget nothing. Memory is the only witness that cannot be intimidated."),
  ];
})();
```

- [ ] **Step 3: Rodar o teste**

Run: `node scripts/test-deck.js`
Expected: `PASS: deck íntegro { sorte: 10, azar: 10, reves: 8 }`

- [ ] **Step 4: Commit**

```bash
git add sorte/deck.js scripts/test-deck.js
GIT_EDITOR=true git -c user.name=anavvanzin -c user.email=77904873+anavvanzin@users.noreply.github.com commit -m "feat(sorte): baralho MUJO com 28 lâminas e leituras bilingues"
```

---

### Task 3: A página `sorte/` — index.html, style.css, app.js

**Files:**
- Create: `sorte/index.html`, `sorte/style.css`, `sorte/app.js`
- Test: `scripts/test-sorte.js`

**Interfaces:**
- Consome: `window.AVDeck` (Task 2), `assets/<slug>.webp` (Task 1).
- Produz: `window.AVSorte = { indiceHoje(date) → int }` (usado no teste); grava `localStorage["florDoDia.vista"] = "YYYY-MM-DD"` quando o visitante vira a lâmina (lido por `companheira.js`, Task 5).

- [ ] **Step 1: Teste da lógica de data que falha**

`scripts/test-sorte.js`:
```js
// Determinismo: mesma data → mesma lâmina; distribuição cobre o baralho.
global.window = { AVDeck: new Array(28).fill(null) };
const fs = require("fs");
const src = fs.readFileSync(__dirname + "/../sorte/app.js", "utf8");
// extrai só a função pura, sem DOM
const fn = src.match(/function indiceHoje[\s\S]*?\n  \}/)[0];
eval(fn);
const assert = require("assert");
assert.strictEqual(indiceHoje(new Date(2026, 8, 19)), indiceHoje(new Date(2026, 8, 19)), "mesma data, índices diferentes");
const vistos = new Set();
for (let dia = 1; dia <= 31; dia++) vistos.add(indiceHoje(new Date(2026, 8, dia)));
assert.ok(vistos.size >= 8, `pouca variedade: ${vistos.size}`);
for (const i of vistos) assert.ok(i >= 0 && i < 28, `índice fora do baralho: ${i}`);
console.log("PASS: determinístico e bem distribuído", vistos.size, "lâminas distintas em 31 dias");
```

Run: `node scripts/test-sorte.js`
Expected: FAIL — `Cannot find module` / arquivo inexistente

- [ ] **Step 2: `sorte/app.js`**

```js
/* Flor do Dia — seleção determinística por data + flip da lâmina. Sem backend. */
(function () {
  var DECK = window.AVDeck;
  var lang = (window.AV && window.AV.lang) || "pt";

  // ATENÇÃO: a regex do teste extrai esta função; manter assinatura e corpo auto-contidos.
  function indiceHoje(date) {
    var s = "" + date.getFullYear()
      + (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
      + (date.getDate() < 10 ? "0" : "") + date.getDate();
    var h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h % 28;
  }

  window.AVSorte = { indiceHoje: indiceHoje };

  var KANJI = { sorte: "幸", azar: "厄", reves: "転" };
  var ROTULO = {
    sorte: { pt: "sorte", en: "luck" },
    azar: { pt: "azar", en: "misfortune" },
    reves: { pt: "revés", en: "reversal" }
  };

  function hojeISO() {
    var d = new Date();
    return d.getFullYear() + "-"
      + (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1) + "-"
      + (d.getDate() < 10 ? "0" : "") + d.getDate();
  }

  var carta = DECK[indiceHoje(new Date())];
  var virada = false;

  function montar() {
    document.getElementById("lamina-frente-img").src = carta.img;
    document.getElementById("lamina-frente-img").alt =
      (lang === "en" ? carta.nome.en : carta.nome.pt) + " — " + carta.jp;
    document.getElementById("lamina-nome").textContent = lang === "en" ? carta.nome.en : carta.nome.pt;
    document.getElementById("lamina-jp").textContent = carta.jp;
    document.getElementById("lamina-kanji").textContent = KANJI[carta.qualidade];
    document.getElementById("lamina-qualidade").textContent = ROTULO[carta.qualidade][lang];
    document.getElementById("lamina-leitura").textContent = lang === "en" ? carta.leitura.en : carta.leitura.pt;
    var grid = document.getElementById("baralho-grid");
    DECK.forEach(function (c) {
      var img = document.createElement("img");
      img.src = c.img;
      img.loading = "lazy";
      img.alt = (lang === "en" ? c.nome.en : c.nome.pt);
      grid.appendChild(img);
    });
  }

  function virar() {
    if (virada) return;
    virada = true;
    document.getElementById("lamina").classList.add("virada");
    try { localStorage.setItem("florDoDia.vista", hojeISO()); } catch (e) {}
    // pré-carrega o resto do baralho em idle
    var preload = function () {
      DECK.forEach(function (c) { if (c !== carta) { var i = new Image(); i.src = c.img; } });
    };
    if ("requestIdleCallback" in window) requestIdleCallback(preload); else setTimeout(preload, 2000);
  }

  document.getElementById("lamina").addEventListener("click", virar);
  document.getElementById("lamina").addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); virar(); }
  });
  document.getElementById("ver-baralho").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("baralho").hidden = !document.getElementById("baralho").hidden;
  });

  montar();
})();
```

- [ ] **Step 3: `sorte/index.html`**

```html
<!doctype html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sorte ou Azar — a flor do dia · Ana Vanzin</title>
  <meta name="description" content="Uma lâmina por dia do baralho MUJO: hanafuda, yokai e alegorias da justiça. azar ← ár. az-zahr, o dado e a flor." />
  <link rel="stylesheet" href="../fonts/fonts.css" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main class="sala">
    <p class="sobrescrito">無常 · mujō</p>
    <h1>Sorte ou Azar</h1>
    <p class="subtitulo">a flor do dia · the flower of the day</p>

    <div id="lamina" class="lamina" tabindex="0" role="button" aria-label="virar a lâmina do dia">
      <div class="face verso">
        <img src="assets/verso.webp" alt="Verso da lâmina MUJO" />
      </div>
      <div class="face frente">
        <img id="lamina-frente-img" src="" alt="" />
        <div class="legenda">
          <h2 id="lamina-nome"></h2>
          <p class="jp" id="lamina-jp"></p>
          <p class="qualidade"><span id="lamina-kanji"></span> <span id="lamina-qualidade"></span></p>
          <p class="leitura" id="lamina-leitura"></p>
        </div>
      </div>
    </div>

    <p class="volte">volte amanhã · come back tomorrow</p>

    <footer class="selo">
      <p><em>azar</em> ← ár. <span lang="ar">اَلزَّهْر</span> <em>az-zahr</em>, “o dado” e “a flor” —
      a mesma palavra para o instrumento do acaso e o seu símbolo vencedor.</p>
      <p><a href="#" id="ver-baralho">ver o baralho inteiro · see the whole deck</a></p>
      <p><a href="../">← desktop</a></p>
    </footer>

    <section id="baralho" hidden>
      <div id="baralho-grid" class="grid"></div>
    </section>
  </main>
  <script src="deck.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 4: `sorte/style.css`**

```css
:root {
  --paper: #EFE5CF; --ink: #1A1612; --rubric: #9B2C1C;
  --eased: cubic-bezier(0.22, 1, 0.36, 1);
}
* { margin: 0; box-sizing: border-box; }
body {
  background: var(--ink); color: var(--paper);
  font-family: "Crimson Pro", serif; min-height: 100vh;
  display: flex; justify-content: center;
}
.sala { max-width: 560px; padding: 48px 20px 80px; text-align: center; }
.sobrescrito { font-family: "JetBrains Mono", monospace; font-size: 12px; letter-spacing: 0.3em; opacity: 0.6; }
h1 { font-family: "Cormorant Garamond", serif; font-weight: 500; font-size: clamp(32px, 6vw, 44px); margin-top: 8px; }
.subtitulo { opacity: 0.6; font-size: 15px; margin-top: 4px; }

.lamina {
  position: relative; width: min(340px, 80vw); margin: 40px auto 24px;
  aspect-ratio: 720 / 1035; cursor: pointer;
  transform-style: preserve-3d; transition: transform 0.9s var(--eased);
}
.lamina.virada { transform: rotateY(180deg); }
.face { position: absolute; inset: 0; backface-visibility: hidden; }
.face img { width: 100%; height: 100%; object-fit: contain; display: block; }
.frente { transform: rotateY(180deg); }
.legenda { margin-top: 12px; background: var(--ink); padding: 8px 4px; }
.legenda h2 { font-family: "Cormorant Garamond", serif; font-weight: 500; font-size: 24px; }
.jp { font-size: 13px; opacity: 0.7; margin-top: 2px; }
.qualidade { font-family: "JetBrains Mono", monospace; font-size: 13px; color: var(--rubric); margin-top: 8px; letter-spacing: 0.15em; }
.leitura { font-size: 16px; line-height: 1.55; margin-top: 10px; opacity: 0.92; }

.volte { font-size: 13px; opacity: 0.5; }
.selo { margin-top: 48px; border-top: 1px solid rgba(239, 229, 207, 0.2); padding-top: 20px; font-size: 14px; line-height: 1.6; opacity: 0.85; }
.selo a { color: var(--paper); }
.selo p + p { margin-top: 10px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 10px; margin-top: 32px; }
.grid img { width: 100%; display: block; opacity: 0.9; }

@media (prefers-reduced-motion: reduce) {
  .lamina { transition: none; }
  .lamina.virada { transform: none; }
  .lamina.virada .verso { display: none; }
}
```

- [ ] **Step 5: Criar o verso da lâmina**

Copiar o verso existente do baralho para `sorte/assets/verso.webp`:
Run: `python -c "from PIL import Image; img=Image.open('/Users/ana/Research/o-grande-jogo-das-alegorias/ALEGORIAS/carta-verso.png').convert('RGB'); img.thumbnail((720,1035), Image.LANCZOS); img.save('/Users/ana/Research/site-anavvanzin/sorte/assets/verso.webp','WEBP',quality=82,method=6)"`
Verificar: `ls -la sorte/assets/verso.webp` existe e ≤ 200 KB. (Se `carta-verso.png` não servir esteticamente — é tarô, não MUJO — gerar um verso neutro: papel vellum escurecido com o kanji 無常 central, via Pillow.)

- [ ] **Step 6: Rodar o teste de data**

Run: `node scripts/test-sorte.js`
Expected: `PASS: determinístico e bem distribuído ...`

- [ ] **Step 7: Verificação manual local**

Run: `python -m http.server 8137` na raiz do repo, abrir `http://localhost:8137/sorte/` — verificar: verso aparece; clique vira a lâmina com nome/kanji/leitura; rodapé etimológico presente; "ver o baralho inteiro" abre o grid; viewport 375px não quebra; `localStorage["florDoDia.vista"]` gravado. Parar o servidor depois.

- [ ] **Step 8: Commit**

```bash
git add sorte/index.html sorte/style.css sorte/app.js sorte/assets/verso.webp scripts/test-sorte.js
GIT_EDITOR=true git -c user.name=anavvanzin -c user.email=77904873+anavvanzin@users.noreply.github.com commit -m "feat(sorte): página flor do dia — flip determinístico, selo etimológico, grid do baralho"
```

---

### Task 4: Sprites pixel da Vigilante (3 personagens)

**Files:**
- Create: `assets/vigilante/miko.png`, `assets/vigilante/bakuto.png`, `assets/vigilante/mariposa.png`
- Create: `assets/vigilante/miko-lanterna.png`, `assets/vigilante/bakuto-lanterna.png`, `assets/vigilante/mariposa-lanterna.png`
- Test: `scripts/test-vigilante.sh`

**Interfaces:**
- Produz: 6 PNGs, fundo transparente, ~64×96 px cada, estilo pixel art coeso entre si e derivado das lâminas MUJO. Convenção de nome consumida por `companheira.js` (Task 5): `assets/vigilante/<personagem>.png` e `assets/vigilante/<personagem>-lanterna.png`, personagem ∈ `miko, bakuto, mariposa`.

- [ ] **Step 1: Gerar os sprites**

Via plugin `openart-agent` / `image_generation`, um personagem por vez, prompt-base: *"pixel art sprite, full body, transparent background, 64x96, limited palette of warm black #1A1612, vellum #EFE5CF, iron-gall red #9B2C1C, gold; Japanese irezumi-tattoo style character"*, variações: miko vendada segurando chochin apagado (base: `24_blindfold_miko.png`); jogador bakuto com chochin apagado (base: `7_bakuto.png`); mariposa humanoide com chochin apagado (base: `3_soul_moth.png`). Depois, as variantes `-lanterna` com o chochin aceso (brilho âmbar). Fallback se a geração não atingir qualidade: pixelar as 3 lâminas via Pillow (resize para 48px com `Image.NEAREST` após posterizar para 12 cores) e recortar.
Critério de aceite: os 6 arquivos existem, têm canal alfa, e visualmente se leem como pixel art coesa.

- [ ] **Step 2: Teste**

`scripts/test-vigilante.sh`:
```bash
#!/bin/bash
set -e
cd "$(dirname "$0")/.."
for p in miko bakuto mariposa; do
  for v in "" "-lanterna"; do
    f="assets/vigilante/$p$v.png"
    [ -f "$f" ] || { echo "FAIL: $f ausente"; exit 1; }
  done
done
python - <<'EOF'
from PIL import Image
for p in ["miko","bakuto","mariposa"]:
    for v in ["","-lanterna"]:
        img = Image.open(f"assets/vigilante/{p}{v}.png")
        assert img.mode == "RGBA", f"{p}{v}: sem canal alfa"
        assert img.width <= 128 and img.height <= 192, f"{p}{v}: grande demais {img.size}"
print("PASS: 6 sprites RGBA")
EOF
```

Run: `bash scripts/test-vigilante.sh` → Expected: `PASS: 6 sprites RGBA`

- [ ] **Step 3: Commit**

```bash
git add assets/vigilante/ scripts/test-vigilante.sh
GIT_EDITOR=true git -c user.name=anavvanzin -c user.email=77904873+anavvanzin@users.noreply.github.com commit -m "feat(vigilante): sprites pixel da miko, do bakuto e da mariposa"
```

---

### Task 5: `companheira.js` — A Vigilante no desktop + saída do tarot

**Files:**
- Create: `companheira.js`
- Modify: `index.html` (tag script; localizar a linha com `grep -n "desktop-app.js" index.html`)
- Modify: `desktop-app.js` (ícone/link do tarot; localizar com `grep -n -i "tarot" desktop-app.js`)
- Modify: `tarot/index.html` (vira redirect)
- Test: `scripts/test-companheira.js`

**Interfaces:**
- Consome: sprites da Task 4; `localStorage["florDoDia.vista"]` gravado pela Task 3.
- Produz: `window.AVVigilante = { personagemDoDia(date) → 'miko'|'bakuto'|'mariposa', lanternaAcesa() → bool }`.

- [ ] **Step 1: Teste que falha**

`scripts/test-companheira.js`:
```js
// Vigilante: personagem determinístico por data; lanterna acesa só se florDoDia.vista === hoje.
global.window = {};
global.localStorage = { _s: {}, getItem(k){ return this._s[k] ?? null; }, setItem(k,v){ this._s[k]=v; } };
global.document = { createElement: () => ({ style: {}, classList: { add(){} } }), body: { appendChild(){} } };
global.location = {};
const src = require("fs").readFileSync(__dirname + "/../companheira.js", "utf8");
const fn = src.match(/var PERSONAGENS[^\n]*/)[0] + "\n"
  + src.match(/function personagemDoDia[\s\S]*?\n  \}/)[0] + "\n"
  + src.match(/function hojeISO[\s\S]*?\n  \}/)[0] + "\n"
  + src.match(/function lanternaAcesa[\s\S]*?\n  \}/)[0];
eval(fn);
const assert = require("assert");
assert.ok(["miko","bakuto","mariposa"].includes(personagemDoDia(new Date())));
assert.notStrictEqual(
  [1,2,3].map(d => personagemDoDia(new Date(2026, 8, d))).join(","),
  "miko,miko,miko", "personagem não varia");
const d = new Date();
const iso = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
assert.strictEqual(lanternaAcesa(), false, "acesa sem visita");
localStorage.setItem("florDoDia.vista", iso);
assert.strictEqual(lanternaAcesa(), true, "apagada após visita de hoje");
localStorage.setItem("florDoDia.vista", "2020-01-01");
assert.strictEqual(lanternaAcesa(), false, "acesa com visita antiga");
console.log("PASS: vigilante determinística, lanterna correta");
```

Run: `node scripts/test-companheira.js`
Expected: FAIL — arquivo inexistente

- [ ] **Step 2: `companheira.js`**

```js
/* A Vigilante — criatura pixel silenciosa do desktop. Sem balão, sem XP.
   O chochin acende quando a flor do dia já foi vista. Nada explica isso. */
(function () {
  var PERSONAGENS = ["miko", "bakuto", "mariposa"];

  function personagemDoDia(date) {
    var dia = Math.floor(date.getTime() / 86400000);
    return PERSONAGENS[dia % PERSONAGENS.length];
  }

  function hojeISO() {
    var d = new Date();
    return d.getFullYear() + "-"
      + (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1) + "-"
      + (d.getDate() < 10 ? "0" : "") + d.getDate();
  }

  function lanternaAcesa() {
    try { return localStorage.getItem("florDoDia.vista") === hojeISO(); }
    catch (e) { return false; }
  }

  window.AVVigilante = { personagemDoDia: personagemDoDia, lanternaAcesa: lanternaAcesa };

  if (typeof document === "undefined" || !document.body) return;

  var p = personagemDoDia(new Date());
  var v = lanternaAcesa() ? "-lanterna" : "";

  var el = document.createElement("img");
  el.src = "assets/vigilante/" + p + v + ".png";
  el.alt = "A Vigilante";
  el.className = "vigilante";
  el.setAttribute("role", "link");
  el.setAttribute("tabindex", "0");
  el.title = "";
  el.addEventListener("click", function () { window.location.href = "sorte/"; });
  el.addEventListener("keydown", function (e) {
    if (e.key === "Enter") window.location.href = "sorte/";
  });

  var st = document.createElement("style");
  st.textContent =
    ".vigilante{position:fixed;right:24px;bottom:72px;height:96px;image-rendering:pixelated;" +
    "cursor:pointer;z-index:40;opacity:0.92;transition:opacity .3s cubic-bezier(0.22,1,0.36,1)}" +
    ".vigilante:hover{opacity:1}" +
    "@media(max-width:760px){.vigilante{right:12px;bottom:96px;height:72px}}" +
    "@media(prefers-reduced-motion:reduce){.vigilante{transition:none}}";
  document.head.appendChild(st);
  document.body.appendChild(el);
})();
```

- [ ] **Step 3: Rodar o teste**

Run: `node scripts/test-companheira.js`
Expected: `PASS: vigilante determinística, lanterna correta`

- [ ] **Step 4: Integrar ao desktop**

Run: `grep -n "desktop-app.js" index.html` — adicionar logo após a tag do desktop-app.js:
```html
<script src="companheira.js" defer></script>
```

- [ ] **Step 5: Trocar o ícone do tarot pelo da flor**

Run: `grep -n -i "tarot" desktop-app.js index.html` — na rota/atalho que hoje aponta para `tarot/`, trocar `window.location.href = 'tarot/'` por `window.location.href = 'sorte/'` e o rótulo visível de `tarot` para `sorte` (PT) / `luck` (EN), mantendo o mesmo ícone se não houver arte nova. Não remover `TarotIcon` do destructure se outros usos dependerem dele; ajustar só o ponto de entrada.

- [ ] **Step 6: `tarot/index.html` vira redirect**

Substituir o conteúdo inteiro de `tarot/index.html` por:
```html
<!doctype html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0; url=../sorte/" />
  <link rel="canonical" href="../sorte/" />
  <title>sorte ou azar → a flor do dia</title>
</head>
<body>
  <p>O tarô virou flor: <a href="../sorte/">sorte ou azar — a flor do dia</a>.</p>
</body>
</html>
```
(Os demais arquivos de `tarot/` — app.js, style.css, assets/ — permanecem no repo nesta task; removê-los do deploy é decisão separada da Ana, registrada como fora de escopo imediato.)

- [ ] **Step 7: Verificação manual**

Servir local (`python -m http.server 8137`): desktop mostra a Vigilante acima do dock (lanterna apagada); visitar `sorte/`, virar a lâmina, voltar ao desktop → lanterna acesa; clicar nela abre `sorte/`; `http://localhost:8137/tarot/` redireciona; mobile 375px ok.

- [ ] **Step 8: Commit**

```bash
git add companheira.js index.html desktop-app.js tarot/index.html scripts/test-companheira.js
GIT_EDITOR=true git -c user.name=anavvanzin -c user.email=77904873+anavvanzin@users.noreply.github.com commit -m "feat: a vigilante no desktop; sorte/ substitui tarot/ com redirect"
```

---

### Task 6: QA final + deploy no Worker `anavvanzin`

**Files:**
- Modify: `wrangler.jsonc` (confirmar `name` e `assets.directory` corretos para o worker `anavvanzin` — o valor atual `"anavanzinparte242--neutered-do-not-deploy"` precisa ser corrigido para `"anavvanzin"` ANTES de qualquer deploy)

**Interfaces:**
- Consome: tudo das tasks 1–5.

- [ ] **Step 1: Bateria de testes**

Run: `node scripts/test-deck.js && node scripts/test-sorte.js && node scripts/test-companheira.js && bash scripts/test-assets.sh && bash scripts/test-vigilante.sh`
Expected: 5 × PASS

- [ ] **Step 2: QA manual completo**

Servir local e checar em desktop + mobile (375px): (a) flip da lâmina; (b) determinismo — recarregar mantém a mesma flor; (c) grid do baralho; (d) Vigilante acesa/apagada; (e) redirect tarot→sorte; (f) `prefers-reduced-motion` (DevTools > Rendering) sem animações.

- [ ] **Step 3: Deploy**

Confirmar com a Ana antes de publicar. Corrigir `wrangler.jsonc`:
```json
{ "name": "anavvanzin", "compatibility_date": "2026-06-23",
  "observability": { "enabled": true },
  "assets": { "directory": "." }, "compatibility_flags": ["nodejs_compat"] }
```
Run: `npx wrangler deploy`
Expected: deploy ok; `https://anavanzin.com/sorte/` responde 200; `https://anavanzin.com/tarot/` redireciona.

- [ ] **Step 4: Commit + push**

```bash
git add -A
GIT_EDITOR=true git -c user.name=anavvanzin -c user.email=77904873+anavvanzin@users.noreply.github.com commit -m "chore: configura wrangler para deploy no worker anavvanzin"
git push origin main
```
