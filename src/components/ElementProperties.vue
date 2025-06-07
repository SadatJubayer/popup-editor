<template>
  <div class="bg-white p-6 rounded-lg shadow-lg h-fit">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">
      {{ element ? `${elementTypeLabel} Properties` : 'No Element Selected' }}
    </h3>

    <div v-if="!element" class="text-gray-500 text-center py-8">
      <div class="mb-2">
        <svg
          class="w-12 h-12 mx-auto text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v1m0 0h6m0 0v1a2 2 0 012 2v10a4 4 0 01-4 4H7z"
          />
        </svg>
      </div>
      <p>Select an element to edit its properties</p>
    </div>

    <div v-else class="space-y-4">
      <!-- Common Properties -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <Label class="text-sm font-medium text-gray-700">X Position</Label>
          <Input
            :model-value="element.x"
            type="number"
            :min="0"
            :max="maxX"
            class="mt-1"
            @update:model-value="updateProperty('x', Number($event))"
          />
        </div>
        <div>
          <Label class="text-sm font-medium text-gray-700">Y Position</Label>
          <Input
            :model-value="element.y"
            type="number"
            :min="0"
            :max="maxY"
            class="mt-1"
            @update:model-value="updateProperty('y', Number($event))"
          />
        </div>
      </div>

      <!-- Width and Height (for non-text elements or text with width) -->
      <div v-if="element.type !== 'text' || element.width" class="grid grid-cols-2 gap-3">
        <div>
          <Label class="text-sm font-medium text-gray-700">Width</Label>
          <Input
            :model-value="element.width || 100"
            type="number"
            :min="50"
            :max="500"
            class="mt-1"
            @update:model-value="updateProperty('width', Number($event))"
          />
        </div>
        <div v-if="element.type !== 'text'">
          <Label class="text-sm font-medium text-gray-700">Height</Label>
          <Input
            :model-value="element.height || 40"
            type="number"
            :min="20"
            :max="200"
            class="mt-1"
            @update:model-value="updateProperty('height', Number($event))"
          />
        </div>
      </div>

      <!-- Content -->
      <div v-if="element.type !== 'svg'">
        <Label class="text-sm font-medium text-gray-700">Content</Label>
        <Input
          :model-value="element.content"
          type="text"
          class="mt-1"
          @update:model-value="updateProperty('content', $event)"
        />
      </div>

      <!-- Font Size (for text, button, input) -->
      <div v-if="'fontSize' in element">
        <Label class="text-sm font-medium text-gray-700">Font Size</Label>
        <Input
          :model-value="element.fontSize || 16"
          type="number"
          :min="8"
          :max="72"
          class="mt-1"
          @update:model-value="updateProperty('fontSize', Number($event))"
        />
      </div>

      <!-- Color -->
      <div v-if="'color' in element">
        <ColorPicker
          :model-value="element.color || '#FBFF37'"
          :label="element.type === 'svg' ? 'Color' : 'Text Color'"
          @update:model-value="updateProperty('color', $event)"
        />
      </div>

      <!-- Background Color (for button, input) -->
      <div v-if="'backgroundColor' in element">
        <ColorPicker
          :model-value="element.backgroundColor || '#ffffff'"
          label="Background Color"
          @update:model-value="updateProperty('backgroundColor', $event)"
        />
      </div>

      <!-- Border Radius (for button, input) -->
      <div v-if="'borderRadius' in element">
        <Label class="text-sm font-medium text-gray-700">Border Radius</Label>
        <Input
          :model-value="element.borderRadius || 0"
          type="number"
          :min="0"
          :max="50"
          class="mt-1"
          @update:model-value="updateProperty('borderRadius', Number($event))"
        />
      </div>

      <!-- SVG Specific Properties -->
      <div v-if="element.type === 'svg'">
        <Label class="text-sm font-medium text-gray-700">SVG Type</Label>
        <select
          :value="element.svgType || 'star'"
          class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          @change="updateProperty('svgType', ($event.target as HTMLSelectElement).value)"
        >
          <option value="star">Star</option>
          <option value="heart">Heart</option>
          <!-- Add more SVG types here -->
        </select>
      </div>

      <div v-if="element.type === 'svg'">
        <Label class="text-sm font-medium text-gray-700">SVG Size</Label>
        <Input
          :model-value="element.svgSize || 32"
          type="number"
          :min="16"
          :max="100"
          class="mt-1"
          @update:model-value="updateProperty('svgSize', Number($event))"
        />
      </div>

      <!-- Delete Button -->
      <div class="pt-4 border-t border-gray-200">
        <Button
          @click="deleteElement"
          variant="outline"
          class="w-full border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete Element
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PopupElement } from '@/types'
import { ELEMENT_TYPES } from '@/types'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'

interface Props {
  element: PopupElement | null
  canvasWidth?: number
  canvasHeight?: number
}

interface Emits {
  (e: 'update', updates: Partial<PopupElement>): void
  (e: 'delete'): void
}

const props = withDefaults(defineProps<Props>(), {
  canvasWidth: 500,
  canvasHeight: 500,
})

const emit = defineEmits<Emits>()

const elementTypeLabel = computed(() => {
  if (!props.element) return ''

  switch (props.element.type) {
    case ELEMENT_TYPES.TEXT:
      return 'Text'
    case ELEMENT_TYPES.BUTTON:
      return 'Button'
    case ELEMENT_TYPES.INPUT:
      return 'Input'
    case ELEMENT_TYPES.SVG:
      return 'SVG Icon'
    default:
      return 'Element'
  }
})

const maxX = computed(() => {
  if (!props.element) return props.canvasWidth
  const elementWidth = props.element.width || 100
  return Math.max(0, props.canvasWidth - elementWidth)
})

const maxY = computed(() => {
  if (!props.element) return props.canvasHeight
  const elementHeight = props.element.height || 40
  return Math.max(0, props.canvasHeight - elementHeight)
})

const updateProperty = (key: string, value: string | number) => {
  emit('update', { [key]: value })
}

const deleteElement = () => {
  if (confirm('Are you sure you want to delete this element?')) {
    emit('delete')
  }
}
</script>
