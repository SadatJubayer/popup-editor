import { type Ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { createElement } from '@/lib/elementFactory'
import type { ElementType, PopupElement } from '@/types'

interface ElementOperationsCallbacks {
  onElementAdd: (element: PopupElement) => void
  onElementUpdate: (id: string, updates: Partial<PopupElement>) => void
  onElementDelete: (id: string) => void
  onElementSelect: (id: string | null) => void
}

interface CanvasDimensions {
  width: number
  height: number
}

export function useElementOperations(
  canvasDimensions: Ref<CanvasDimensions>,
  callbacks: ElementOperationsCallbacks,
) {
  const toast = useToast()

  const handleAddElement = (type: ElementType) => {
    try {
      const newElement = createElement(
        type,
        canvasDimensions.value.width,
        canvasDimensions.value.height,
      )
      callbacks.onElementAdd(newElement)
    } catch (error) {
      console.error('Failed to create new element:', error)
      toast.error('Failed to create new element')
    }
  }

  const handleUpdateSelectedElement = (
    selectedElementId: string | null | Ref<string | null>,
    updates: Partial<PopupElement>,
  ) => {
    const id =
      typeof selectedElementId === 'object' && selectedElementId !== null
        ? selectedElementId.value
        : selectedElementId
    if (id) {
      callbacks.onElementUpdate(id, updates)
    }
  }

  const handleDeleteSelectedElement = (selectedElementId: string | null | Ref<string | null>) => {
    const id =
      typeof selectedElementId === 'object' && selectedElementId !== null
        ? selectedElementId.value
        : selectedElementId
    if (id) {
      callbacks.onElementDelete(id)
    }
  }

  const handleElementSelect = (id: string | null) => {
    callbacks.onElementSelect(id)
  }

  const handleElementDelete = (id: string) => {
    callbacks.onElementDelete(id)
  }

  return {
    handleAddElement,
    handleUpdateSelectedElement,
    handleDeleteSelectedElement,
    handleElementSelect,
    handleElementDelete,
  }
}
