/* ICONOCRACY Cabinet — shared content schema
   Every public research object supports the same fields so the Atlas,
   Marginalia, Reading Room and future object pages can share data. */

const SCHEMA = {
  fields: [
    { key: 'id',            type: 'string',  required: true },
    { key: 'title',         type: 'string',  required: true },
    { key: 'date',          type: 'string',  required: false },
    { key: 'location',      type: 'string',  required: false },
    { key: 'creator',       type: 'string',  required: false },
    { key: 'source',        type: 'string',  required: false, note: 'institution / collection / journal' },
    { key: 'medium',        type: 'string',  required: false },
    { key: 'imageUrl',      type: 'string',  required: false },
    { key: 'imageRights',   type: 'string',  required: false },
    { key: 'themes',        type: 'array',   of: 'string', required: false },
    { key: 'visualAttributes', type: 'array', of: 'string', required: false },
    { key: 'legalFunction',type: 'string',  required: false },
    { key: 'interpretation',type: 'string',  required: false },
    { key: 'whatToNotice',  type: 'string',  required: false },
    { key: 'relatedObjects', type: 'array', of: 'string', required: false },
    { key: 'relatedEssays', type: 'array',  of: 'string', required: false },
    { key: 'relatedReadings', type: 'array', of: 'string', required: false },
    { key: 'status',        type: 'enum',    values: ['seed', 'draft', 'published'], default: 'seed' },
    { key: 'slug',          type: 'string',  required: false },
    { key: 'summary',       type: 'string',  required: false, note: 'short public card text' },
    { key: 'lang',          type: 'string',  default: 'pt' },
  ],

  // Minimal validator for development; returns [] when valid.
  validate(item) {
    const errors = [];
    if (!item || typeof item !== 'object') return ['item is not an object'];
    for (const f of this.fields) {
      if (f.required && (item[f.key] == null || item[f.key] === '')) {
        errors.push(`missing required field: ${f.key}`);
      }
      if (item[f.key] != null && f.type === 'array' && !Array.isArray(item[f.key])) {
        errors.push(`${f.key} must be an array`);
      }
      if (item[f.key] != null && f.type === 'enum' && !f.values.includes(item[f.key])) {
        errors.push(`${f.key} must be one of ${f.values.join(', ')}`);
      }
    }
    return errors;
  }
};

if (typeof window !== 'undefined') window.CabinetSchema = SCHEMA;
if (typeof module !== 'undefined' && module.exports) module.exports = SCHEMA;
