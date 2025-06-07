<template>
  <MainLayout>
    <template #sidebar>
      <AddElements @add-element="elementOps.handleAddElement" />
      <CanvasControls
        :background-color="designState.design.value.backgroundColor"
        :canvas-width="designState.design.value.width"
        :canvas-height="designState.design.value.height"
        @update:background-color="designState.updateBackgroundColor"
        @update:canvas-width="designState.updateCanvasWidth"
        @update:canvas-height="designState.updateCanvasHeight"
        @preview="handlePreview"
        @save="designState.saveDesign"
        @reset="designState.resetDesign"
      />
    </template>

    <template #canvas>
      <DesignCanvas
        ref="canvasRef"
        :design="designState.design.value"
        :selected-element-id="designState.selectedElementId.value"
        :view-mode="viewMode"
        @update:view-mode="updateViewMode"
        @canvas:click="handleCanvasClick"
        @canvas:mouse-move="handleCanvasMouseMove"
        @element:select="designState.selectElement"
        @element:delete="designState.deleteElement"
        @element:drag-start="handleElementDragStart"
      />
    </template>

    <template #properties>
      <ElementProperties
        :element="designState.selectedElement.value"
        :canvas-width="designState.design.value.width"
        :canvas-height="designState.design.value.height"
        @update="
          elementOps.handleUpdateSelectedElement(designState.selectedElementId.value, $event)
        "
        @delete="elementOps.handleDeleteSelectedElement(designState.selectedElementId.value)"
      />
    </template>

    <template #dialogs>
      <PreviewDialog
        :design="designState.design.value"
        :is-open="isPreviewOpen"
        :view-mode="viewMode"
        @close="isPreviewOpen = false"
      />
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import 'vue-toast-notification/dist/theme-sugar.css'

import { ref, computed, onMounted, onUnmounted } from 'vue'
import MainLayout from '@/components/MainLayout.vue'
import DesignCanvas from '@/components/DesignCanvas.vue'
import ElementProperties from '@/components/ElementProperties.vue'
import AddElements from '@/components/AddElements.vue'
import CanvasControls from '@/components/CanvasControls.vue'
import PreviewDialog from '@/components/PreviewDialog.vue'
import { useDesignState } from '@/composables/useDesignState'
import { useElementOperations } from '@/composables/useElementOperations'
import { useDragAndDrop, type ViewMode } from '@/composables/useDragAndDrop'
import type { PopupElement } from '@/types'

const designState = useDesignState()
const viewMode = ref<ViewMode>('desktop')
const isPreviewOpen = ref(false)
const canvasRef = ref<InstanceType<typeof DesignCanvas> | null>(null)

const designDimensions = computed(() => ({
  width: designState.design.value.width,
  height: designState.design.value.height,
}))

const elementOps = useElementOperations(designDimensions, {
  onElementAdd: designState.addElement,
  onElementUpdate: designState.updateElement,
  onElementDelete: designState.deleteElement,
  onElementSelect: designState.selectElement,
})

const currentScale = computed(() => (viewMode.value === 'mobile' ? 0.8 : 1))

const {
  handleMouseDown: dragHandleMouseDown,
  handleMouseMove: dragHandleMouseMove,
  handleMouseUp: dragHandleMouseUp,
} = useDragAndDrop(
  designDimensions,
  designState.updateElement,
  designState.selectElement,
  viewMode,
  currentScale,
)

const updateViewMode = (mode: ViewMode) => {
  viewMode.value = mode
}

const handleCanvasClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    designState.selectElement(null)
  }
}

const handleCanvasMouseMove = (e: MouseEvent, canvasElement: HTMLElement | null) => {
  if (canvasElement) {
    const canvasElementRef = ref(canvasElement)
    dragHandleMouseMove(e, canvasElementRef)
  }
}

const handleElementDragStart = (e: MouseEvent, id: string, element: PopupElement) => {
  dragHandleMouseDown(e, id, element)
}

const handlePreview = () => {
  isPreviewOpen.value = true
}

onMounted(() => {
  document.addEventListener('mouseup', dragHandleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mouseup', dragHandleMouseUp)
})
</script>

<style scoped></style>
