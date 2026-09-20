/* A Vigilante — criatura pixel silenciosa do desktop. Sem balão, sem XP.
   O chochin acende quando a flor do dia já foi vista. Nada explica isso. */
(function () {
  var PERSONAGENS = ["justitia"];

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
