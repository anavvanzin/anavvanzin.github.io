// src/lib/corpus.js — runtime corpus loading + normalization for Atlas / Atlas Lab.
// Mirrors the build-time data contract described in project-docs/iuris-memoria-architecture.md.
(function () {
  const CORPUS_PATH = "../src/data/corpus.json";
  const STATS_PATH = "../src/data/stats.json";
  const SEED_PATH = "../src/data/seed-corpus.json";

  async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.json();
  }

  function normalizeImagePath(p) {
    if (!p) return p;
    const s = String(p).trim();
    if (/^https?:\/\//.test(s) || s.startsWith("/") || s.startsWith("../")) return s;
    return "../" + s;
  }

  function normalizeRegime(r) {
    if (!r) return "NÃO CLASSIFICADO";
    // Keep the underscore form already used by atlas/parts.jsx.
    const map = {
      "CONTRA-ALEGORIA": "CONTRA_ALEGORIA",
      "NÃO ALEGÓRICO": "NÃO_ALEGÓRICO",
    };
    return map[r] || r;
  }

  function normalizeItem(it) {
    return { ...it, img: normalizeImagePath(it.img), regime: normalizeRegime(it.regime) };
  }

  async function loadCorpus() {
    let data;
    try {
      data = await fetchJSON(CORPUS_PATH);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[corpus] Generated corpus unavailable; falling back to seed.", err.message);
      data = await fetchJSON(SEED_PATH);
    }
    return Array.isArray(data) ? data.map(normalizeItem) : [];
  }

  function computeStats(corpus) {
    const byRegime = {};
    const byCountry = {};
    const bySupport = {};
    let yearMin = null;
    let yearMax = null;
    const decadeCounts = {};

    for (const item of corpus) {
      byRegime[item.regime] = (byRegime[item.regime] || 0) + 1;
      byCountry[item.country] = (byCountry[item.country] || 0) + 1;
      bySupport[item.support] = (bySupport[item.support] || 0) + 1;

      if (typeof item.year === "number") {
        if (yearMin === null || item.year < yearMin) yearMin = item.year;
        if (yearMax === null || item.year > yearMax) yearMax = item.year;
        const decade = Math.floor(item.year / 10) * 10;
        decadeCounts[decade] = (decadeCounts[decade] || 0) + 1;
      }
    }

    const histogram = Object.entries(decadeCounts)
      .map(([decade, count]) => ({ decade: Number(decade), count }))
      .sort((a, b) => a.decade - b.decade);

    return {
      total: corpus.length,
      byRegime,
      byCountry,
      bySupport,
      byYear: { min: yearMin, max: yearMax, histogram },
    };
  }

  async function loadStats(corpus) {
    try {
      return await fetchJSON(STATS_PATH);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[corpus] Generated stats unavailable; computing from corpus.", err.message);
      return computeStats(corpus);
    }
  }

  function buildSummary(stats, corpus) {
    const coded = corpus.filter(
      (it) => it.panofsky && (it.panofsky.iconology || it.panofsky.icono)
    ).length;
    const pct = corpus.length ? Math.round((coded / corpus.length) * 100) : 0;
    const nations = Object.keys(stats.byCountry || {}).length;
    const minYear = stats.byYear?.min ?? "—";
    const maxYear = stats.byYear?.max ?? "—";

    return [
      { v: String(stats.total), l: "placas no corpus", s: `${nations} nações · ${minYear}–${maxYear}` },
      { v: "8", l: "painéis do atlas", s: "disposição warburguiana" },
      { v: "10", l: "indicadores", s: "iconometria do endurecimento" },
      { v: `${pct}%`, l: "codificado", s: "Panofsky · três níveis" },
    ];
  }

  window.CorpusLoader = { loadCorpus, loadStats, buildSummary, computeStats };
})();
