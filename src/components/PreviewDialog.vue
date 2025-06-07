<template>
  <Teleport to="body">
    <!-- Backdrop with fade animation -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-40 bg-black/20" @click="$emit('close')"></div>
    </Transition>

    <!-- Dialog content with slide animation -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div v-if="isOpen" class="fixed top-16 left-1/2 transform -translate-x-1/2 z-50">
        <div class="relative">
          <div :class="containerClasses">
            <div :style="canvasStyle" class="relative rounded-full overflow-hidden">
              <!-- White border inside the circle -->
              <div
                class="absolute inset-0 rounded-full pointer-events-none z-10 border-4 border-white m-1"
              />

              <div
                v-for="(element, index) in design.elements"
                :key="element.id"
                :style="getElementStyle(element, index)"
                :class="getElementClasses(element)"
              >
                <component :is="getElementComponent(element)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Fixed close button at top right of page -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <button
        v-if="isOpen"
        @click="$emit('close')"
        class="fixed top-4 right-4 z-50 w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-2xl border-4 border-white"
        aria-label="Close preview"
      >
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import type { PopupElement } from '@/types'
import { ELEMENT_TYPES, SVG_TYPES } from '@/types'
import { createElementStyle } from '@/lib/utils'
import { SVGIcons } from '@/lib/constants'

interface Props {
  design: {
    elements: PopupElement[]
    backgroundColor: string
    width: number
    height: number
  }
  isOpen: boolean
  viewMode: 'desktop' | 'mobile'
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const scale = computed(() => (props.viewMode === 'mobile' ? 0.6 : 1))

const mobileSize = computed(() => Math.min(props.design.width, props.design.height) * scale.value)

const displayWidth = computed(() =>
  props.viewMode === 'mobile' ? mobileSize.value : props.design.width,
)

const displayHeight = computed(() =>
  props.viewMode === 'mobile' ? mobileSize.value : props.design.height,
)

const containerClasses = computed(() => {
  const baseClasses = 'relative transition-all duration-300 flex-shrink-0'

  const mobileClasses =
    props.viewMode === 'mobile'
      ? "border-[16px] border-gray-800 rounded-[3rem] bg-gray-800 shadow-2xl before:content-[''] before:absolute before:top-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-20 before:h-6 before:bg-gray-800 before:rounded-b-xl before:-mt-3 after:content-[''] after:absolute after:bottom-3 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gray-600 after:rounded-full py-32"
      : ''

  return [baseClasses, mobileClasses].filter(Boolean).join(' ')
})

const canvasStyle = computed(() => ({
  backgroundColor: props.design.backgroundColor,
  width: `${displayWidth.value}px`,
  height: `${displayHeight.value}px`,
}))

const getElementStyle = (element: PopupElement, index: number): Record<string, string | number> => {
  const baseStyle = createElementStyle(element, scale.value)

  return {
    ...baseStyle,
    animationDelay: `${index * 100}ms`,
  }
}

const getElementClasses = (element: PopupElement) => {
  const baseClasses = 'transition-all duration-700 opacity-100 absolute'
  const typeClasses = {
    [ELEMENT_TYPES.BUTTON]: 'font-semibold rounded cursor-pointer flex items-center justify-center',
    [ELEMENT_TYPES.INPUT]: 'border rounded',
    [ELEMENT_TYPES.TEXT]: 'leading-tight text-center flex items-center justify-center',
    [ELEMENT_TYPES.SVG]: 'flex items-center justify-center',
  }

  return [baseClasses, typeClasses[element.type]].filter(Boolean).join(' ')
}

const getElementComponent = (element: PopupElement) => {
  switch (element.type) {
    case ELEMENT_TYPES.TEXT:
      return h(
        'div',
        {
          class:
            'leading-tight text-center flex items-center justify-center w-full h-full select-none',
          'aria-label': `Text: ${element.content}`,
        },
        element.content,
      )

    case ELEMENT_TYPES.BUTTON:
      return h(
        'button',
        {
          class:
            'font-semibold rounded cursor-pointer flex items-center justify-center w-full h-full select-none',
          style: {
            padding: `${4 * scale.value}px ${16 * scale.value}px`,
          },
          type: 'button',
          'aria-label': `Button: ${element.content}`,
        },
        element.content,
      )

    case ELEMENT_TYPES.INPUT:
      return h('input', {
        type: 'email',
        placeholder: element.content,
        class: 'w-full h-full bg-transparent border-0 outline-0 text-center select-none',
        style: {
          fontSize: 'inherit',
          color: 'inherit',
          padding: `${12 * scale.value}px`,
        },
        'aria-label': `Email input: ${element.content}`,
        readonly: true, // Prevent interaction in preview
      })

    case ELEMENT_TYPES.SVG:
      const svgType = element.svgType || SVG_TYPES.STAR
      return h(
        'div',
        {
          class: 'select-none flex items-center justify-center',
          style: { width: '100%', height: '100%' },
          'aria-label': `${svgType} icon`,
        },
        [SVGIcons[svgType]],
      )

    default:
      return h('div', { class: 'flex items-center justify-center' }, 'Unknown element')
  }
}
</script>
