export const ELEMENT_TYPES = {
  TEXT: 'text',
  BUTTON: 'button',
  INPUT: 'input',
  SVG: 'svg',
} as const

export const SVG_TYPES = {
  STAR: 'star',
  HEART: 'heart',
} as const

export const VIEW_MODES = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
} as const

// Type aliases for better maintainability
export type ElementType = (typeof ELEMENT_TYPES)[keyof typeof ELEMENT_TYPES]
export type SvgType = (typeof SVG_TYPES)[keyof typeof SVG_TYPES]
export type ViewMode = (typeof VIEW_MODES)[keyof typeof VIEW_MODES]

// Base element interface
export interface BasePopupElement {
  id: string
  type: ElementType
  content: string
  x: number
  y: number
  width?: number
  height?: number
}

// Type-specific element interfaces for better type safety
export interface TextElement extends BasePopupElement {
  type: typeof ELEMENT_TYPES.TEXT
  fontSize?: number
  color?: string
}

export interface ButtonElement extends BasePopupElement {
  type: typeof ELEMENT_TYPES.BUTTON
  fontSize?: number
  color?: string
  backgroundColor?: string
  borderRadius?: number
}

export interface InputElement extends BasePopupElement {
  type: typeof ELEMENT_TYPES.INPUT
  fontSize?: number
  color?: string
  backgroundColor?: string
  borderRadius?: number
}

export interface SvgElement extends BasePopupElement {
  type: typeof ELEMENT_TYPES.SVG
  color?: string
  svgType?: SvgType
  svgSize?: number
}

// Union type for all popup elements
export type PopupElement = TextElement | ButtonElement | InputElement | SvgElement

export interface PopupDesign {
  id: string
  name: string
  backgroundColor: string
  elements: PopupElement[]
  width: number
  height: number
  createdAt?: string
  updatedAt?: string
}

export interface ElementStyle {
  position: 'absolute' | 'relative' | 'fixed' | 'static' | 'sticky'
  left: string
  top: string
  width: string
  height: string
  zIndex: number
  fontSize: string
  color: string
  backgroundColor: string
  borderRadius: string
  [key: string]: string | number
}
