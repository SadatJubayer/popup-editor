<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Editor</h2>
      <ViewModeToggle :view-mode="viewMode" @update:view-mode="$emit('update:viewMode', $event)" />
    </div>

    <div class="flex justify-center items-center min-h-[600px] overflow-x-auto">
      <div class="relative">
        <div
          ref="canvasRef"
          class="relative shadow-2xl rounded-full transition-transform duration-300"
          :style="{
            backgroundColor: design.backgroundColor,
            width: `${design.width * currentScale}px`,
            height: `${design.height * currentScale}px`,
            transform: viewMode === 'mobile' ? 'scale(0.8)' : 'scale(1)',
          }"
          data-canvas
          @click="handleCanvasClick"
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
            :is-selected="selectedElementId === element.id"
            :scale="currentScale"
            :view-mode="viewMode"
            @select="() => $emit('element:select', element.id)"
            @delete="() => $emit('element:delete', element.id)"
            @drag-start="(e, element) => $emit('element:dragStart', e, element.id, element)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DraggableElement from '@/components/DraggableElement.vue'
import ViewModeToggle from '@/components/ViewModeToggle.vue'
import type { PopupDesign, PopupElement } from '@/types'
import type { ViewMode } from '@/composables/useDragAndDrop'

interface Props {
  design: PopupDesign
  selectedElementId: string | null
  viewMode: ViewMode
}

interface Emits {
  (e: 'update:viewMode', value: ViewMode): void
  (e: 'canvas:click', event: MouseEvent): void
  (e: 'element:select', id: string): void
  (e: 'element:delete', id: string): void
  (e: 'element:dragStart', event: MouseEvent, id: string, element: PopupElement): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const canvasRef = ref<HTMLElement | null>(null)

const currentScale = computed(() => {
  return props.viewMode === 'mobile' ? 0.8 : 1
})

const handleCanvasClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('canvas:click', e)
  }
}

defineExpose({
  canvasRef,
})
</script>
