// src/hooks/useFilters.js — React hook for faceted filters with URL sync.
// Dimensions: regime, country, support, yearMin, yearMax.
(function () {
  const { useState, useEffect, useMemo, useCallback } = React;
  const {
    FILTER_KEYS,
    readFilterValuesFromStats,
    parseQueryParams,
    encodeQueryParams,
    filterCorpus,
    areFiltersEmpty,
  } = window.FilterLib;

  const emptyFilters = () => ({ regime: [], country: [], support: [], yearMin: "", yearMax: "" });

  function normalizeArrayInput(v) {
    if (!v) return [];
    if (Array.isArray(v)) return v.slice();
    if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean);
    return [];
  }

  function useFilters({ corpus = [], stats = null } = {}) {
    const domain = useMemo(() => readFilterValuesFromStats(stats), [stats]);

    const [filters, setFilters] = useState(() => {
      const fromUrl = parseQueryParams();
      return {
        regime: normalizeArrayInput(fromUrl.regime),
        country: normalizeArrayInput(fromUrl.country),
        support: normalizeArrayInput(fromUrl.support),
        yearMin: fromUrl.yearMin || "",
        yearMax: fromUrl.yearMax || "",
      };
    });

    // Sync filters → URL query params (replaceState, no extra history entry).
    useEffect(() => {
      const query = encodeQueryParams(filters);
      const url = window.location.pathname + query;
      if (typeof window.history !== "undefined" && window.location.search !== query) {
        window.history.replaceState(null, "", url);
      }
    }, [filters]);

    // Sync URL popstate (browser back/forward) → filters.
    useEffect(() => {
      const onPop = () => {
        const fromUrl = parseQueryParams();
        setFilters({
          regime: normalizeArrayInput(fromUrl.regime),
          country: normalizeArrayInput(fromUrl.country),
          support: normalizeArrayInput(fromUrl.support),
          yearMin: fromUrl.yearMin || "",
          yearMax: fromUrl.yearMax || "",
        });
      };
      window.addEventListener("popstate", onPop);
      return () => window.removeEventListener("popstate", onPop);
    }, []);

    const filtered = useMemo(() => filterCorpus(corpus, filters), [corpus, filters]);

    const toggle = useCallback((key, value) => {
      setFilters((prev) => {
        const arr = normalizeArrayInput(prev[key]);
        const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
        return { ...prev, [key]: next };
      });
    }, []);

    const setYear = useCallback((key, value) => {
      setFilters((prev) => ({ ...prev, [key]: value === "" ? "" : String(value) }));
    }, []);

    const clear = useCallback(() => {
      setFilters(emptyFilters());
    }, []);

    const isEmpty = useMemo(() => areFiltersEmpty(filters), [filters]);

    const resultCount = filtered.length;

    return {
      filters,
      domain,
      filtered,
      resultCount,
      toggle,
      setYear,
      clear,
      isEmpty,
    };
  }

  window.useFilters = useFilters;
})();
