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
