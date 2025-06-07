import { SVG_TYPES } from '@/types'
import { h } from 'vue'

export const DEFAULT_VALUES = {
  ELEMENT_WIDTH: 120,
  ELEMENT_HEIGHT: 40,
  TEXT_WIDTH: 200,
  FONT_SIZE: 16,
  SVG_SIZE: 32,
  CANVAS_WIDTH: 500,
  CANVAS_HEIGHT: 500,
  MIN_ELEMENT_SIZE: 10,
  MAX_ELEMENT_SIZE: 800,
} as const

export const SVGIcons = {
  [SVG_TYPES.STAR]: h(
    'svg',
    {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-label': 'Star icon',
    },
    [
      h('path', {
        d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      }),
    ],
  ),
  [SVG_TYPES.HEART]: h(
    'svg',
    {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-label': 'Heart icon',
    },
    [
      h('path', {
        d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
      }),
    ],
  ),
}
