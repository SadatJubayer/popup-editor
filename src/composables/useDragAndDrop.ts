import { ref, type Ref } from 'vue'
import type { PopupElement } from '@/types'
import { roundToDecimalPlaces } from '@/lib/utils'

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
  let dragElementRef: HTMLElement | null = null
  let originalStyles: {
    left: string
    top: string
    transform: string
    zIndex: string
    transition: string
  } = {
    left: '',
    top: '',
    transform: '',
    zIndex: '',
    transition: '',
  }
  let dragStarted = false
  let initialMousePos = { x: 0, y: 0 }
  let animationFrameId: number | null = null
  let lastMouseEvent: MouseEvent | null = null

  const handleMouseDown = (e: MouseEvent, elementId: string, element: PopupElement) => {
    // Remove mobile view restriction - allow dragging on both desktop and mobile
    e.preventDefault()
    e.stopPropagation()

    const elementEl = e.currentTarget as HTMLElement
    const rect = elementEl.closest('[data-canvas]')?.getBoundingClientRect()
    if (!rect) return

    // First, ensure the element is selected
    onElementSelect(elementId)

    // Store initial state but don't start dragging yet
    dragElement.value = elementId
    dragStartElement.value = element
    dragElementRef = elementEl
    dragStarted = false

    initialMousePos = { x: e.clientX, y: e.clientY }

    // Store original styles
    originalStyles = {
      left: dragElementRef.style.left,
      top: dragElementRef.style.top,
      transform: dragElementRef.style.transform,
      zIndex: dragElementRef.style.zIndex,
      transition: dragElementRef.style.transition,
    }

    // Calculate offset from mouse to element origin
    const elementRect = elementEl.getBoundingClientRect()
    dragOffset.value = {
      x: e.clientX - elementRect.left,
      y: e.clientY - elementRect.top,
    }

    // Add global mouse event listeners for potential drag
    document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false })
    document.addEventListener('mouseup', handleGlobalMouseUp)
  }

  // Optimized function to update element position using requestAnimationFrame
  const updateElementPosition = () => {
    if (!lastMouseEvent || !dragElementRef || !dragStartElement.value) return

    const rect = dragElementRef.closest('[data-canvas]')?.getBoundingClientRect()
    if (!rect) return

    // Calculate the new position based on mouse position
    const newLeft = lastMouseEvent.clientX - rect.left - dragOffset.value.x
    const newTop = lastMouseEvent.clientY - rect.top - dragOffset.value.y

    // Convert to logical coordinates
    const logicalX = newLeft / scale.value
    const logicalY = newTop / scale.value

    // Apply boundaries
    const elementWidth = dragStartElement.value.width || 100
    const elementHeight = dragStartElement.value.height || 40
    const boundedX = Math.max(0, Math.min(design.value.width - elementWidth, logicalX))
    const boundedY = Math.max(0, Math.min(design.value.height - elementHeight, logicalY))

    // Apply the bounded position directly to the element
    const finalLeft = boundedX * scale.value
    const finalTop = boundedY * scale.value

    dragElementRef.style.left = `${finalLeft}px`
    dragElementRef.style.top = `${finalTop}px`
    dragElementRef.style.transform = 'none' // Clear any existing transform

    // Reset animation frame ID
    animationFrameId = null
  }

  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (!dragElement.value || !dragElementRef || !dragStartElement.value) return

    // Check if we've moved enough to start dragging (prevents accidental drags)
    const deltaX = Math.abs(e.clientX - initialMousePos.x)
    const deltaY = Math.abs(e.clientY - initialMousePos.y)
    const threshold = 3 // pixels

    if (!dragStarted && (deltaX > threshold || deltaY > threshold)) {
      // Start actual dragging
      isDragging.value = true
      dragStarted = true

      // Prepare element for dragging
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'

      if (dragElementRef) {
        dragElementRef.style.transition = 'none'
        dragElementRef.style.zIndex = '1000'
      }
    }

    if (!dragStarted) return

    e.preventDefault()

    // Store the latest mouse event
    lastMouseEvent = e

    // Use requestAnimationFrame to throttle updates for smooth performance
    if (animationFrameId === null) {
      animationFrameId = requestAnimationFrame(updateElementPosition)
    }
  }

  const handleGlobalMouseUp = () => {
    // Clean up global listeners
    document.removeEventListener('mousemove', handleGlobalMouseMove)
    document.removeEventListener('mouseup', handleGlobalMouseUp)

    // Cancel any pending animation frame
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }

    const currentDragElement = dragElement.value
    const wasDragging = dragStarted

    if (!currentDragElement || !dragStartElement.value) {
      resetDragState()
      return
    }

    // Reset visual styles
    document.body.style.cursor = ''
    document.body.style.userSelect = ''

    if (dragElementRef && wasDragging) {
      // Get the final position from the element's style
      const left = parseFloat(dragElementRef.style.left) || 0
      const top = parseFloat(dragElementRef.style.top) || 0

      // Convert back to logical coordinates and round to 2 decimal places
      const finalX = roundToDecimalPlaces(left / scale.value, 2)
      const finalY = roundToDecimalPlaces(top / scale.value, 2)

      // Restore original styles first
      dragElementRef.style.left = originalStyles.left
      dragElementRef.style.top = originalStyles.top
      dragElementRef.style.transform = originalStyles.transform
      dragElementRef.style.zIndex = originalStyles.zIndex
      dragElementRef.style.transition = originalStyles.transition

      // Update the element position and ensure selection is maintained
      onElementUpdate(currentDragElement, { x: finalX, y: finalY })

      // Use a small delay to ensure the update has been processed
      setTimeout(() => {
        onElementSelect(currentDragElement)
      }, 10)
    }

    // Reset drag state
    resetDragState()
  }

  const resetDragState = () => {
    isDragging.value = false
    dragElement.value = null
    dragOffset.value = { x: 0, y: 0 }
    dragStartElement.value = null
    dragElementRef = null
    dragStarted = false
    lastMouseEvent = null

    // Cancel any pending animation frame
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  const handleMouseUp = () => {
    // This is now handled by global listeners
    handleGlobalMouseUp()
  }

  return {
    isDragging,
    dragElement,
    dragOffset,
    handleMouseDown,
    handleMouseUp,
  }
}
