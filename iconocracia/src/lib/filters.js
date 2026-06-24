// src/lib/filters.js — pure filter helpers and URL query serialization.
// Framework-agnostic utilities used by src/hooks/useFilters.js.
(function () {
  const FILTER_KEYS = ["regime", "country", "support", "yearMin", "yearMax"];

  function readFilterValuesFromStats(stats) {
    const byRegime = stats && stats.byRegime ? Object.keys(stats.byRegime) : [];
    const byCountry = stats && stats.byCountry ? Object.keys(stats.byCountry) : [];
    const bySupport = stats && stats.bySupport ? Object.keys(stats.bySupport) : [];
    const yearMin = stats && stats.byYear && typeof stats.byYear.min === "number" ? stats.byYear.min : null;
    const yearMax = stats && stats.byYear && typeof stats.byYear.max === "number" ? stats.byYear.max : null;
    return { regimes: byRegime, countries: byCountry, supports: bySupport, yearMin, yearMax };
  }

  function parseQueryParams(search) {
    const params = new URLSearchParams(search || window.location.search || "");
    const out = { regime: [], country: [], support: [], yearMin: "", yearMax: "" };
    for (const key of FILTER_KEYS) {
      if (key === "yearMin" || key === "yearMax") {
        const raw = params.get(key);
        out[key] = raw || "";
      } else {
        const raw = params.getAll(key);
        out[key] = raw.length ? raw : (params.get(key) || "").split(",").filter(Boolean);
      }
    }
    return out;
  }

  function encodeQueryParams(filters) {
    const params = new URLSearchParams();
    for (const key of FILTER_KEYS) {
      const val = filters[key];
      if (Array.isArray(val)) {
        if (val.length) params.set(key, val.join(","));
      } else if (val !== "" && val !== null && val !== undefined) {
        params.set(key, String(val));
      }
    }
    const s = params.toString();
    return s ? "?" + s : "";
  }

  function matchesFilters(item, filters) {
    if (!item) return false;
    if (filters.regime.length && !filters.regime.includes(item.regime)) return false;
    if (filters.country.length && !filters.country.includes(item.country)) return false;
    if (filters.support.length && !filters.support.includes(item.support)) return false;
    const y = Number(filters.yearMin);
    if (filters.yearMin !== "" && !Number.isNaN(y) && (typeof item.year !== "number" || item.year < y)) return false;
    const z = Number(filters.yearMax);
    if (filters.yearMax !== "" && !Number.isNaN(z) && (typeof item.year !== "number" || item.year > z)) return false;
    return true;
  }

  function filterCorpus(corpus, filters) {
    return corpus.filter((it) => matchesFilters(it, filters));
  }

  function areFiltersEmpty(filters, defaults) {
    return FILTER_KEYS.every((key) => {
      const a = filters[key];
      const b = defaults ? defaults[key] : undefined;
      if (Array.isArray(a)) return a.length === 0;
      return a === "" || a === b;
    });
  }

  window.FilterLib = {
    FILTER_KEYS,
    readFilterValuesFromStats,
    parseQueryParams,
    encodeQueryParams,
    matchesFilters,
    filterCorpus,
    areFiltersEmpty,
  };
})();
