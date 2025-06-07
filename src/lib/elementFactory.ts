import type { PopupElement, ElementType } from '@/types'
import { ELEMENT_TYPES, SVG_TYPES } from '@/types'
import { DEFAULT_VALUES } from '@/lib/constants'

interface ElementDimensions {
  width: number
  height: number
}

function getElementDimensions(type: ElementType): ElementDimensions {
  switch (type) {
    case ELEMENT_TYPES.TEXT:
      return { width: DEFAULT_VALUES.TEXT_WIDTH, height: 20 }
    case ELEMENT_TYPES.BUTTON:
      return { width: DEFAULT_VALUES.ELEMENT_WIDTH, height: DEFAULT_VALUES.ELEMENT_HEIGHT }
    case ELEMENT_TYPES.INPUT:
      return { width: DEFAULT_VALUES.TEXT_WIDTH, height: DEFAULT_VALUES.ELEMENT_HEIGHT }
    case ELEMENT_TYPES.SVG:
      return { width: DEFAULT_VALUES.SVG_SIZE, height: DEFAULT_VALUES.SVG_SIZE }
    default:
      return { width: DEFAULT_VALUES.ELEMENT_WIDTH, height: 30 }
  }
}

function getDefaultContent(type: ElementType): string {
  switch (type) {
    case ELEMENT_TYPES.TEXT:
      return 'New Text'
    case ELEMENT_TYPES.BUTTON:
      return 'New Button'
    case ELEMENT_TYPES.INPUT:
      return 'Email'
    case ELEMENT_TYPES.SVG:
      return SVG_TYPES.STAR
    default:
      return 'New Element'
  }
}

export function createElement(
  type: ElementType,
  canvasWidth: number,
  canvasHeight: number,
): PopupElement {
  const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  const dimensions = getElementDimensions(type)
  const position = {
    x: Math.max(
      DEFAULT_VALUES.MIN_ELEMENT_SIZE,
      Math.min(
        canvasWidth - dimensions.width - DEFAULT_VALUES.MIN_ELEMENT_SIZE,
        centerX - dimensions.width / 2,
      ),
    ),
    y: Math.max(
      DEFAULT_VALUES.MIN_ELEMENT_SIZE,
      Math.min(
        canvasHeight - dimensions.height - DEFAULT_VALUES.MIN_ELEMENT_SIZE,
        centerY - dimensions.height / 2,
      ),
    ),
  }

  const baseElement = {
    id,
    type,
    content: getDefaultContent(type),
    ...position,
  }

  switch (type) {
    case ELEMENT_TYPES.TEXT:
      return {
        ...baseElement,
        type: ELEMENT_TYPES.TEXT,
        fontSize: DEFAULT_VALUES.FONT_SIZE,
        color: '#000000',
        width: DEFAULT_VALUES.TEXT_WIDTH,
      } as PopupElement

    case ELEMENT_TYPES.BUTTON:
      return {
        ...baseElement,
        type: ELEMENT_TYPES.BUTTON,
        fontSize: DEFAULT_VALUES.FONT_SIZE,
        color: '#FFFFFF',
        backgroundColor: '#2D3748',
        height: DEFAULT_VALUES.ELEMENT_HEIGHT,
      } as PopupElement

    case ELEMENT_TYPES.INPUT:
      return {
        ...baseElement,
        type: ELEMENT_TYPES.INPUT,
        fontSize: 14,
        color: '#000000',
        backgroundColor: '#FFFFFF',
        width: DEFAULT_VALUES.TEXT_WIDTH,
        height: DEFAULT_VALUES.ELEMENT_HEIGHT,
      } as PopupElement

    case ELEMENT_TYPES.SVG:
      return {
        ...baseElement,
        type: ELEMENT_TYPES.SVG,
        color: '#FFD700',
        svgType: SVG_TYPES.STAR,
        svgSize: DEFAULT_VALUES.SVG_SIZE,
      } as PopupElement

    default:
      throw new Error(`Unknown element type: ${type}`)
  }
}
