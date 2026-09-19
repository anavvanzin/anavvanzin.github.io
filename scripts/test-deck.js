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
