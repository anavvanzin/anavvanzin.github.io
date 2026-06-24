// src/lib/abnt.js — ABNT NBR 6023:2025 citation helpers.
// Pure, framework-agnostic utilities used by CitationButton.jsx.
(function () {
  function abntForItem(it) {
    // Prefer the pre-computed ABNT field from the data contract.
    if (it && it.abnt && String(it.abnt).trim()) return String(it.abnt).trim();
    return synthesizeABNT(it);
  }

  function synthesizeABNT(it) {
    if (!it) return "";
    const parts = [];
    const author = guessAuthor(it);
    const title = String(it.title || "").trim();
    const year = it.year || "[s.d.]";
    const support = String(it.support || "").trim();
    const archive = String(it.archive || "").trim();
    const country = String(it.country || "").trim();

    if (author) parts.push(author);
    if (title) parts.push(title + (parts.length ? "." : ""));
    if (year) parts.push(year + ".");
    if (support) {
      const supCap = support.charAt(0).toUpperCase() + support.slice(1).toLowerCase();
      parts.push(supCap + ".");
    }
    const locArchive = [country, archive].filter(Boolean).join(": ");
    if (locArchive) parts.push(locArchive + ".");
    return parts.join(" ");
  }

  function guessAuthor(it) {
    if (!it) return "";
    const p = String(it.provenance || "").trim();
    // "Gravura de propaganda revolucionária francesa, 1792." -> no author
    // "Décio Villares, óleo sobre tela, 1896." -> "VILLARES, Décio."
    const match = p.match(/^([A-Z][a-zçáéíóúãõêôü]+(?:\s+[A-Z][a-zçáéíóúãõêôü]+)?),\s/);
    if (match) {
      const full = match[1];
      const bits = full.split(/\s+/);
      const last = bits.pop();
      return `${last.toUpperCase()}, ${bits.join(" ")}.`;
    }
    return "";
  }

  function escapeBib(str) {
    return String(str || "")
      .replace(/\\/g, "\\\\")
      .replace(/"/g, "\\{\"}")
      .replace(/\{/g, "\\{")
      .replace(/\}/g, "\\}");
  }

  function bibTeXForItem(it) {
    const key = String(it.id || "").replace(/[^a-zA-Z0-9_-]/g, "-");
    const author = guessAuthor(it) || (it.country ? it.country : "Anônimo");
    const title = String(it.title || "Sem título");
    const year = it.year || "[s.d.]";
    const howpublished = [it.support, it.archive].filter(Boolean).join("; ");
    const note = String(it.provenance || "").trim();
    let out = "@misc{atlas-" + key + ",\n";
    out += `  author = {${escapeBib(author)}},\n`;
    out += `  title = {${escapeBib(title)}},\n`;
    out += `  year = {${escapeBib(year)}},\n`;
    if (howpublished) out += `  howpublished = {${escapeBib(howpublished)}},\n`;
    if (it.country) out += `  country = {${escapeBib(it.country)}},\n`;
    if (note) out += `  note = {${escapeBib(note)}},\n`;
    out += "}\n";
    return out;
  }

  function formatPlainText(items) {
    const arr = Array.isArray(items) ? items : [items];
    if (!arr.length) return "";
    const lines = arr.map((it, i) => `${i + 1}. ${abntForItem(it)}`);
    return lines.join("\n\n") + "\n";
  }

  function formatBibTeX(items) {
    const arr = Array.isArray(items) ? items : [items];
    if (!arr.length) return "";
    return arr.map(bibTeXForItem).join("\n");
  }

  function downloadBlob(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("[abnt] copy failed", e);
      return false;
    }
  }

  window.AbntLib = {
    abntForItem,
    synthesizeABNT,
    formatPlainText,
    formatBibTeX,
    bibTeXForItem,
    copyText,
    downloadBlob,
  };
})();
