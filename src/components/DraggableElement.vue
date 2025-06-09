<template>
  <div
    :style="elementStyle"
    :class="elementClasses"
    @click="handleSelect"
    @mousedown="handleDragStart"
  >
    <component :is="elementComponent" />

    <!-- Delete button for selected elements -->
    <div v-if="isSelected" class="absolute -top-5 -right-5 z-50">
      <button
        class="bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg border border-white"
        @click="handleDelete"
        :aria-label="`Delete ${element.type} element`"
      >
        <!-- Simple Trash SVG Icon -->
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import type { PopupElement } from '@/types'
import { ELEMENT_TYPES, SVG_TYPES } from '@/types'
import { createElementStyle, mergeClasses } from '@/lib/utils'
import { SVGIcons } from '@/lib/constants'

interface Props {
  element: PopupElement
  isSelected: boolean
  scale?: number
  viewMode?: 'desktop' | 'mobile'
}

interface Emits {
  (e: 'select'): void
  (e: 'delete'): void
  (e: 'dragStart', event: MouseEvent, element: PopupElement): void
}

const props = withDefaults(defineProps<Props>(), {
  scale: 1,
  viewMode: 'desktop',
})

const emit = defineEmits<Emits>()

const elementStyle = computed(() => createElementStyle(props.element, props.scale))

const elementClasses = computed(() => {
  const baseClasses = 'group transition-all duration-200 hover:opacity-80'
  const selectedClasses = props.isSelected
    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent'
    : ''
  const cursorClasses = 'cursor-move'

  return mergeClasses(baseClasses, selectedClasses, cursorClasses)
})

const elementComponent = computed(() => {
  const { element, scale } = props

  switch (element.type) {
    case ELEMENT_TYPES.TEXT:
      return h(
        'div',
        {
          class: 'select-none leading-tight text-center',
          style: {
            pointerEvents: 'none', // Allow events to pass through to parent
          },
          'aria-label': `Text element: ${element.content}`,
        },
        element.content,
      )

    case ELEMENT_TYPES.BUTTON:
      return h(
        'div',
        {
          class: 'font-semibold rounded text-center flex items-center justify-center select-none',
          style: {
            padding: `${4 * scale}px ${16 * scale}px`,
            width: '100%',
            height: '100%',
            pointerEvents: 'none', // Allow events to pass through to parent
          },
          'aria-label': `Button: ${element.content}`,
          role: 'button',
        },
        element.content,
      )

    case ELEMENT_TYPES.INPUT:
      return h('input', {
        type: 'email',
        placeholder: element.content,
        class: 'border rounded w-full h-full text-center select-none',
        style: {
          padding: `${12 * scale}px`,
          pointerEvents: 'none', // Allow events to pass through to parent
        },
        readonly: true,
        'aria-label': `Email input: ${element.content}`,
      })

    case ELEMENT_TYPES.SVG:
      const svgType = element.svgType || SVG_TYPES.STAR
      return h(
        'div',
        {
          class: 'select-none flex items-center justify-center',
          style: {
            width: '100%',
            height: '100%',
            pointerEvents: 'none', // Allow events to pass through to parent
          },
          'aria-label': `${svgType} icon`,
        },
        [SVGIcons[svgType]],
      )

    default:
      return h('div', { class: 'cursor-pointer' }, 'Unknown element')
  }
})

const handleSelect = (e: MouseEvent) => {
  e.stopPropagation()
  emit('select')
}

const handleDelete = (e: MouseEvent) => {
  e.stopPropagation()
  emit('delete')
}

const handleDragStart = (e: MouseEvent) => {
  emit('dragStart', e, props.element)
}
</script>
