// src/hooks/useCompare.js — multi-item comparison selection state.
// Persists up to 4 selected item ids to localStorage and resolves them
// against the current corpus map.
(function () {
  const STORAGE_KEY = "atlaslab.compare";
  const MAX_ITEMS = 4;

  function loadIds() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : [];
    } catch (e) {
      return [];
    }
  }

  function saveIds(ids) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_ITEMS)));
    } catch (e) {
      // storage may be disabled; in-memory state still works
    }
  }

  function useCompare(itemsById) {
    const [ids, setIds] = React.useState(loadIds);

    React.useEffect(() => {
      saveIds(ids);
    }, [ids]);

    const selected = React.useMemo(() => {
      return ids.map((id) => itemsById[id]).filter(Boolean);
    }, [ids, itemsById]);

    const has = React.useCallback((id) => ids.includes(id), [ids]);
    const canAdd = ids.length < MAX_ITEMS;

    const toggle = React.useCallback((id) => {
      setIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= MAX_ITEMS) return prev;
        return [...prev, id];
      });
    }, []);

    const add = React.useCallback((id) => {
      setIds((prev) => {
        if (prev.includes(id) || prev.length >= MAX_ITEMS) return prev;
        return [...prev, id];
      });
    }, []);

    const remove = React.useCallback((id) => {
      setIds((prev) => prev.filter((x) => x !== id));
    }, []);

    const clear = React.useCallback(() => setIds([]), []);

    return {
      ids,
      selected,
      count: ids.length,
      max: MAX_ITEMS,
      has,
      canAdd,
      toggle,
      add,
      remove,
      clear,
    };
  }

  window.useCompare = useCompare;
})();
