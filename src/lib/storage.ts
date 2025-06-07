import type { PopupDesign } from '@/types'
import { defaultDesign } from './defaultDesign'

const STORAGE_KEY = 'popup-design'

export const StorageService = {
  // Load design from localStorage
  loadCurrentDesign(): PopupDesign {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsedDesign = JSON.parse(saved) as PopupDesign
        return parsedDesign
      }
    } catch (error) {
      console.error('Failed to load design from localStorage:', error)
    }
    // Return default design if nothing saved or error occurred
    return { ...defaultDesign }
  },

  // Save design to localStorage
  saveCurrentDesign(design: PopupDesign): boolean {
    try {
      const designToSave = {
        ...design,
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(designToSave))
      return true
    } catch (error) {
      console.error('Failed to save design to localStorage:', error)
      return false
    }
  },

  // Clear saved design from localStorage
  clearCurrentDesign(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Failed to clear design from localStorage:', error)
      return false
    }
  },
}
