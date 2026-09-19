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
