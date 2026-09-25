import {
  layoutNextLineRange,
  materializeLineRange,
  prepareWithSegments,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from '@chenglou/pretext'
import contoursJson from './plate-contours.json'

export interface ContourData {
  w: number
  h: number
  rows: [number, number][][]
  n: number
}

export interface Obstacle {
  id: string
  x: number
  y: number
  w: number
  h: number
}

export interface LaidLine {
  text: string
  x: number
  y: number
  heading: boolean
}

export const CONTOURS = contoursJson as unknown as Record<string, ContourData>
const GUTTER = 18

export function widestGap(width: number, spans: [number, number][]): { left: number; right: number } {
  if (spans.length === 0) return { left: 0, right: width }

  const sorted = spans
    .map(([left, right]) => [Math.max(0, left), Math.min(width, right)] as [number, number])
    .filter(([left, right]) => right > left)
    .sort((a, b) => a[0] - b[0])

  if (sorted.length === 0) return { left: 0, right: width }

  const blocked: [number, number][] = []
  for (const span of sorted) {
    const previous = blocked.at(-1)
    if (previous && span[0] <= previous[1]) previous[1] = Math.max(previous[1], span[1])
    else blocked.push([...span])
  }

  let best = { left: 0, right: 0 }
  let bestWidth = -1
  let cursor = 0
  for (const [left, right] of blocked) {
    if (left - cursor > bestWidth) {
      best = { left: cursor, right: left }
      bestWidth = left - cursor
    }
    cursor = Math.max(cursor, right)
  }
  if (width - cursor > bestWidth) best = { left: cursor, right: width }
  return best
}

function obstacleSpansAtRow(obstacle: Obstacle, rowY: number): [number, number][] {
  const contour = CONTOURS[obstacle.id]
  if (!contour || rowY < obstacle.y || rowY > obstacle.y + obstacle.h) return []

  const relativeY = rowY - obstacle.y
  const rowIndex = Math.min(
    contour.rows.length - 1,
    Math.max(0, Math.floor((relativeY / obstacle.h) * contour.rows.length)),
  )
  const scale = obstacle.w / contour.w
  return contour.rows[rowIndex]
    .map(([left, right]) => [
      obstacle.x + left * scale - GUTTER,
      obstacle.x + right * scale + GUTTER,
    ] as [number, number])
    .filter(([left, right]) => right - left > 4)
}

export function freeIntervalAt(width: number, y: number, obstacles: Obstacle[]): { left: number; right: number } {
  return widestGap(width, obstacles.flatMap((obstacle) => obstacleSpansAtRow(obstacle, y)))
}

export class ParagraphCache {
  private cache = new Map<string, PreparedTextWithSegments>()

  get(text: string, font: string): PreparedTextWithSegments {
    const key = `${font}\u241f${text}`
    let prepared = this.cache.get(key)
    if (!prepared) {
      prepared = prepareWithSegments(text, font)
      this.cache.set(key, prepared)
    }
    return prepared
  }
}

interface FlowBlock {
  text: string
  font: string
  lineHeight: number
  heading?: boolean
  gapAfter: number
}

export function flowText(
  width: number,
  blocks: FlowBlock[],
  obstacle: Obstacle,
  cache: ParagraphCache,
): { lines: LaidLine[]; height: number } {
  const lines: LaidLine[] = []
  let y = 0

  for (const block of blocks) {
    const prepared = cache.get(block.text, block.font)
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
    let guard = 0
    while (guard < 500) {
      guard += 1
      const interval = freeIntervalAt(width, y + block.lineHeight / 2, [obstacle])
      const available = interval.right - interval.left
      if (available < 48) {
        y += block.lineHeight
        continue
      }
      const range = layoutNextLineRange(prepared, cursor, available)
      if (range === null) break
      lines.push({
        text: materializeLineRange(prepared, range).text,
        x: interval.left,
        y,
        heading: Boolean(block.heading),
      })
      cursor = range.end
      y += block.lineHeight
    }
    y += block.gapAfter
  }

  return { lines, height: y }
}
