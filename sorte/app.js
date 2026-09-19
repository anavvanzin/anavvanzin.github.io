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
