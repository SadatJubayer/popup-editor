import { ref, computed } from 'vue'
import { useToast } from 'vue-toast-notification'
import { defaultDesign } from '@/lib/defaultDesign'
import { StorageService } from '@/lib/storage'
import type { PopupElement, PopupDesign } from '@/types'

export function useDesignState() {
  const toast = useToast()

  const design = ref<PopupDesign>(StorageService.loadCurrentDesign())
  const selectedElementId = ref<string | null>(null)

  const selectedElement = computed(() => {
    if (!selectedElementId.value) return null
    return design.value.elements.find((el) => el.id === selectedElementId.value) || null
  })

  const updateBackgroundColor = (color: string) => {
    design.value.backgroundColor = color
  }

  const updateCanvasWidth = (width: number) => {
    design.value.width = width
  }

  const updateCanvasHeight = (height: number) => {
    design.value.height = height
  }

  const selectElement = (id: string | null) => {
    selectedElementId.value = id
  }

  const updateElement = (id: string, updates: Partial<PopupElement>) => {
    const elementIndex = design.value.elements.findIndex((el) => el.id === id)
    if (elementIndex !== -1) {
      design.value.elements[elementIndex] = {
        ...design.value.elements[elementIndex],
        ...updates,
      }
    }
  }

  const deleteElement = (id: string) => {
    design.value.elements = design.value.elements.filter((el) => el.id !== id)
    if (selectedElementId.value === id) {
      selectedElementId.value = null
    }
  }

  const addElement = (element: PopupElement) => {
    design.value.elements.push(element)
    selectedElementId.value = element.id // Auto-select for instant customization
  }

  const saveDesign = () => {
    const success = StorageService.saveCurrentDesign(design.value)
    if (success) {
      toast.success('Design saved successfully!')
    } else {
      toast.error('Failed to save design')
    }
  }

  const resetDesign = () => {
    if (
      confirm(
        'Are you sure you want to reset to default design? This will remove all elements and settings.',
      )
    ) {
      design.value = { ...defaultDesign }
      selectedElementId.value = null

      const success = StorageService.clearCurrentDesign()
      if (success) {
        toast.success('Design reset to default!')
      } else {
        toast.error('Design reset but failed to clear saved state')
      }
    }
  }

  return {
    design,
    selectedElement,
    selectedElementId,
    updateBackgroundColor,
    updateCanvasWidth,
    updateCanvasHeight,
    selectElement,
    updateElement,
    deleteElement,
    addElement,
    saveDesign,
    resetDesign,
  }
}
