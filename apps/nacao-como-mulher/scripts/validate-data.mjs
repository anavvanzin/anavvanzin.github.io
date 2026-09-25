import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const data = JSON.parse(fs.readFileSync(path.join(root, 'src/exhibition.json'), 'utf8'))
const errors = []
const ids = new Set()
const localizedPaths = ['title', 'subtitle', 'territory', 'medium', 'observed', 'context', 'interpretation']

if (data.items.length !== 9) errors.push(`expected 9 items, found ${data.items.length}`)
if (data.metadata.comparativeSurvey.total !== 79 || data.metadata.comparativeSurvey.female !== 51) errors.push('comparative survey snapshot does not match 79/51')
if (data.metadata.canonicalCorpus.count < 1) errors.push('canonical corpus count is missing')

for (const item of data.items) {
  if (ids.has(item.id)) errors.push(`duplicate id: ${item.id}`)
  ids.add(item.id)
  if (!['canonical', 'comparative-antecedent'].includes(item.scope)) errors.push(`${item.id}: invalid scope`)
  for (const field of localizedPaths) {
    if (!item[field]?.pt?.trim() || !item[field]?.en?.trim()) errors.push(`${item.id}: incomplete ${field}`)
  }
  for (const field of ['rights', 'citation']) {
    if (!item.source?.[field]?.pt?.trim() || !item.source?.[field]?.en?.trim()) errors.push(`${item.id}: incomplete source.${field}`)
  }
  try { new URL(item.source.url) } catch { errors.push(`${item.id}: invalid source URL`) }
  if (item.review.status !== 'verified' || !/^\d{4}-\d{2}-\d{2}$/.test(item.review.reviewedAt)) errors.push(`${item.id}: review gate incomplete`)
  for (const image of [item.images.figure, item.images.plate]) {
    if (!fs.existsSync(path.join(root, 'public', image))) errors.push(`${item.id}: missing image ${image}`)
  }
  if (!item.images.alt?.pt?.trim() || !item.images.alt?.en?.trim()) errors.push(`${item.id}: missing bilingual alt text`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Validated ${data.items.length} exhibition records and both documentary snapshots.`)
