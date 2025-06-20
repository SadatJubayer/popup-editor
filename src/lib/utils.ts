import type { PopupElement } from '@/types'
import { DEFAULT_VALUES } from './constants'

export function mergeClasses(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function createElementStyle(
  element: PopupElement,
  scale: number = 1,
): Record<string, string | number> {
  const baseStyle = {
    position: 'absolute' as const,
    left: `${(element.x || 0) * scale}px`,
    top: `${(element.y || 0) * scale}px`,
    zIndex: 1,
  }

  switch (element.type) {
    case 'svg':
      return {
        ...baseStyle,
        width: `${(element.svgSize || DEFAULT_VALUES.SVG_SIZE) * scale}px`,
        height: `${(element.svgSize || DEFAULT_VALUES.SVG_SIZE) * scale}px`,
        color: element.color || '#FBFF37',
      }

    case 'text':
      return {
        ...baseStyle,
        width: element.width ? `${element.width * scale}px` : 'auto',
        fontSize: `${(element.fontSize || DEFAULT_VALUES.FONT_SIZE) * scale}px`,
        color: element.color || '#000000',
      }

    case 'button':
    case 'input':
      return {
        ...baseStyle,
        width: element.width ? `${element.width * scale}px` : 'auto',
        height: element.height ? `${element.height * scale}px` : 'auto',
        fontSize: `${(element.fontSize || DEFAULT_VALUES.FONT_SIZE) * scale}px`,
        color: element.color || '#000000',
        backgroundColor: element.backgroundColor || 'transparent',
        borderRadius: `${(element.borderRadius || 0) * scale}px`,
      }

    default:
      return baseStyle
  }
}

/**
 * Debounce function to limit the rate at which a function can fire.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Round number to specified decimal places
 */
export function roundToDecimalPlaces(value: number, decimals: number = 2): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}
