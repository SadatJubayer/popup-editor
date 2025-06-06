<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8 gap-5">
    <!-- Color Picker Controls -->
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <ColorPicker v-model="design.backgroundColor" label="Popup Background Color" />
    </div>

    <!-- Dynamic Popup Renderer with Drag & Drop -->
    <div class="flex justify-center items-start min-h-[600px] w-full">
      <div class="relative">
        <div
          ref="dropZoneRef"
          class="relative shadow-2xl overflow-hidden rounded-full"
          :style="{
            backgroundColor: design.backgroundColor,
            width: `${design.width}px`,
            height: `${design.height}px`,
          }"
          data-canvas
          @click="handleCanvasClick"
          @mousemove="handleMouseMove"
        >
          <!-- White border inside the circle -->
          <div
            class="absolute inset-0 rounded-full pointer-events-none z-10 border-4 border-white m-1"
          />

          <!-- Draggable Elements -->
          <DraggableElement
            v-for="element in design.elements"
            :key="element.id"
            :element="element"
            :is-selected="selectedElement === element.id"
            :scale="1"
            view-mode="desktop"
            @select="() => onElementSelect(element.id)"
            @delete="() => onElementDelete(element.id)"
            @drag-start="(e, element) => handleMouseDown(e, element.id, element)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import DraggableElement from '@/components/DraggableElement.vue'
import { defaultDesign } from '@/lib/defaultDesign'
import { useDragAndDrop, type ViewMode } from '@/composables/useDragAndDrop'
import type { PopupElement } from '@/types'

// Reactive state for the design data
const design = ref({ ...defaultDesign })
const selectedElement = ref<string | null>(null)
const dropZoneRef = ref<HTMLElement | null>(null)

// Element management functions
const onElementSelect = (id: string | null) => {
  selectedElement.value = id
}

const onElementUpdate = (id: string, updates: Partial<PopupElement>) => {
  const elementIndex = design.value.elements.findIndex((el) => el.id === id)
  if (elementIndex !== -1) {
    design.value.elements[elementIndex] = { ...design.value.elements[elementIndex], ...updates }
  }
}

const onElementDelete = (id: string) => {
  design.value.elements = design.value.elements.filter((el) => el.id !== id)
  if (selectedElement.value === id) {
    selectedElement.value = null
  }
}

// Drag and drop setup
const designRef = computed(() => ({ width: design.value.width, height: design.value.height }))
const viewModeRef = ref<ViewMode>('desktop')
const scaleRef = ref(1)

const {
  handleMouseDown,
  handleMouseMove: dragMouseMove,
  handleMouseUp,
} = useDragAndDrop(designRef, onElementUpdate, onElementSelect, viewModeRef, scaleRef)

// Canvas interaction handlers
const handleCanvasClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    onElementSelect(null)
  }
}

const handleMouseMove = (e: MouseEvent) => {
  dragMouseMove(e, dropZoneRef)
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<style scoped></style>
