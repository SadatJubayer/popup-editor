import { ref, type Ref } from 'vue'
import { VIEW_MODES, type PopupElement } from '@/types'

export type ViewMode = 'desktop' | 'mobile'

export function useDragAndDrop(
  design: Ref<{ width: number; height: number }>,
  onElementUpdate: (id: string, updates: Partial<PopupElement>) => void,
  onElementSelect: (id: string | null) => void,
  viewMode: Ref<ViewMode>,
  scale: Ref<number>,
) {
  const isDragging = ref(false)
  const dragElement = ref<string | null>(null)
  const dragOffset = ref({ x: 0, y: 0 })
  const dragStartElement = ref<PopupElement | null>(null)

  const handleMouseDown = (e: MouseEvent, elementId: string, element: PopupElement) => {
    if (viewMode.value === VIEW_MODES.MOBILE) return

    e.preventDefault()
    e.stopPropagation()

    const rect = (e.currentTarget as HTMLElement)?.closest('[data-canvas]')?.getBoundingClientRect()
    if (!rect) return

    isDragging.value = true
    dragElement.value = elementId
    dragStartElement.value = element

    const elementX = (element.x || 0) * scale.value
    const elementY = (element.y || 0) * scale.value

    dragOffset.value = {
      x: e.clientX - rect.left - elementX,
      y: e.clientY - rect.top - elementY,
    }

    onElementSelect(elementId)
  }

  const handleMouseMove = (e: MouseEvent, dropZoneRef: Ref<HTMLElement | null>) => {
    if (
      !isDragging.value ||
      !dragElement.value ||
      viewMode.value === VIEW_MODES.MOBILE ||
      !dragStartElement.value
    )
      return

    const rect = dropZoneRef.value?.getBoundingClientRect()
    if (!rect) return

    const scaledX = (e.clientX - rect.left - dragOffset.value.x) / scale.value
    const scaledY = (e.clientY - rect.top - dragOffset.value.y) / scale.value

    const elementWidth = dragStartElement.value.width || 100
    const elementHeight = dragStartElement.value.height || 40

    const newX = Math.max(0, Math.min(design.value.width - elementWidth, scaledX))
    const newY = Math.max(0, Math.min(design.value.height - elementHeight, scaledY))

    onElementUpdate(dragElement.value, { x: newX, y: newY })
  }

  const handleMouseUp = () => {
    isDragging.value = false
    dragElement.value = null
    dragOffset.value = { x: 0, y: 0 }
    dragStartElement.value = null
  }

  return {
    isDragging,
    dragElement,
    dragOffset,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}
