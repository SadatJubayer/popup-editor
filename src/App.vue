<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Header Controls -->
    <div class="max-w-7xl mx-auto mb-6">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <ColorPicker v-model="design.backgroundColor" label="Popup Background Color" />
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <!-- Add Elements Panel -->
        <div>
          <AddElements @add-element="handleAddElement" />
        </div>

        <!-- Canvas Area -->
        <div class="lg:col-span-2">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-800">Editor</h2>
              <div class="flex bg-gray-200 rounded-md">
                <button
                  :class="[
                    'px-3 py-2 text-sm font-medium rounded-l-md transition-colors',
                    viewModeRef === 'desktop'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-300',
                  ]"
                  @click="viewModeRef = 'desktop'"
                  :aria-label="'Switch to desktop view'"
                >
                  <Monitor class="h-4 w-4 mr-1 inline" />
                  Desktop
                </button>
                <button
                  :class="[
                    'px-3 py-2 text-sm font-medium rounded-r-md transition-colors',
                    viewModeRef === 'mobile'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-300',
                  ]"
                  @click="viewModeRef = 'mobile'"
                  :aria-label="'Switch to mobile view'"
                >
                  <Smartphone class="h-4 w-4 mr-1 inline" />
                  Mobile
                </button>
              </div>
            </div>
            <div class="flex justify-center items-center min-h-[600px] overflow-x-auto">
              <div class="relative">
                <div
                  ref="dropZoneRef"
                  class="relative shadow-2xl rounded-full transition-transform duration-300"
                  :style="{
                    backgroundColor: design.backgroundColor,
                    width: `${design.width * currentScale}px`,
                    height: `${design.height * currentScale}px`,
                    transform: viewModeRef === 'mobile' ? 'scale(0.8)' : 'scale(1)',
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
                    :scale="currentScale"
                    :view-mode="viewModeRef"
                    @select="() => onElementSelect(element.id)"
                    @delete="() => onElementDelete(element.id)"
                    @drag-start="(e, element) => handleMouseDown(e, element.id, element)"
                  />
                </div>
              </div>
            </div>

            <!-- Mobile Mode Info -->
            <div
              v-if="viewModeRef === 'mobile'"
              class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div class="flex items-center text-blue-700">
                <Info class="h-4 w-4 mr-1 inline" />
                <span class="text-sm">Mobile preview mode - Dragging is disabled!.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Properties Panel -->
        <div class="lg:col-span-1">
          <ElementProperties
            :element="selectedElementData"
            :canvas-width="design.width"
            :canvas-height="design.height"
            @update="updateSelectedElement"
            @delete="deleteSelectedElement"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Monitor, Smartphone, Info } from 'lucide-vue-next'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import DraggableElement from '@/components/DraggableElement.vue'
import ElementProperties from '@/components/ElementProperties.vue'
import AddElements from '@/components/AddElements.vue'
import { defaultDesign } from '@/lib/defaultDesign'
import { useDragAndDrop, type ViewMode } from '@/composables/useDragAndDrop'
import { createElement } from '@/lib/elementFactory'
import type { PopupElement, ElementType } from '@/types'

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

// Scale computation based on view mode
const currentScale = computed(() => {
  return viewModeRef.value === 'mobile' ? 0.8 : 1
})

const scaleRef = computed(() => currentScale.value)

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

// Computed properties
const selectedElementData = computed(() => {
  if (!selectedElement.value) return null
  return design.value.elements.find((el) => el.id === selectedElement.value) || null
})

// Element update functions
const updateSelectedElement = (updates: Partial<PopupElement>) => {
  if (selectedElement.value) {
    onElementUpdate(selectedElement.value, updates)
  }
}

const deleteSelectedElement = () => {
  if (selectedElement.value) {
    onElementDelete(selectedElement.value)
  }
}

// Handle adding new elements
const handleAddElement = (type: ElementType) => {
  try {
    const newElement = createElement(type, design.value.width, design.value.height)
    design.value.elements.push(newElement)
    selectedElement.value = newElement.id // For instant customization
  } catch (err) {
    console.error('Failed to create new element:', err)
  }
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
