import { describe, expect, it } from 'vitest'
import { CONTOURS, freeIntervalAt, widestGap } from './engine'

describe('widestGap', () => {
  it('returns the full width when nothing is blocked', () => {
    expect(widestGap(800, [])).toEqual({ left: 0, right: 800 })
  })

  it('selects the widest side of a central blockage', () => {
    expect(widestGap(800, [[180, 500]])).toEqual({ left: 500, right: 800 })
  })

  it('merges overlapping spans before comparing gaps', () => {
    expect(widestGap(900, [[100, 300], [250, 620], [760, 880]])).toEqual({ left: 620, right: 760 })
  })

  it('clips spans to the available width', () => {
    expect(widestGap(500, [[-40, 80], [440, 700]])).toEqual({ left: 80, right: 440 })
  })
})

describe('freeIntervalAt', () => {
  it('uses the figure contour instead of returning the full width', () => {
    const contour = CONTOURS['BR-005-republica']
    const obstacle = { id: 'BR-005-republica', x: 300, y: 0, w: 240, h: contour.h * (240 / contour.w) }
    const interval = freeIntervalAt(900, obstacle.h / 2, [obstacle])
    expect(interval).not.toEqual({ left: 0, right: 900 })
    expect(interval.right - interval.left).toBeLessThan(900)
  })
})
