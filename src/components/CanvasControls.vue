<template>
  <div class="p-6 w-full">
    <h3
      class="text-lg font-semibold mb-4 text-gray-800 flex items-center border-b border-gray-200 pb-2"
    >
      <Settings class="h-5 w-5 mr-2 text-purple-500" />
      Canvas Settings
    </h3>

    <div class="space-y-4">
      <!-- Background Color -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700 flex items-center">
          <Palette class="h-4 w-4 mr-1 text-purple-500" />
          Background Color
        </label>
        <ColorPicker v-model="backgroundColor" />
      </div>

      <!-- Width & Height -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 flex items-center">
            <ArrowLeftRight class="h-4 w-4 mr-1 text-blue-500" />
            Width
          </label>
          <input
            v-model.number="width"
            type="number"
            min="300"
            max="800"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            @input="updateDimensions"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 flex items-center">
            <ArrowUpDown class="h-4 w-4 mr-1 text-blue-500" />
            Height
          </label>
          <input
            v-model.number="height"
            type="number"
            min="300"
            max="800"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            @input="updateDimensions"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3 pt-2">
        <Button
          variant="outline"
          class="w-full h-10 flex items-center justify-center bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-400 transition-all duration-300 ease-in-out text-green-700 hover:text-green-800 hover:shadow-lg hover:scale-[1.02] group"
          @click="handlePreview"
        >
          <Eye class="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
          <span class="font-medium">Preview</span>
        </Button>

        <Button
          variant="outline"
          class="w-full h-10 flex items-center justify-center bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 ease-in-out text-blue-700 hover:text-blue-800 hover:shadow-lg hover:scale-[1.02] group"
          @click="handleSave"
        >
          <Save class="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
          <span class="font-medium">Save Design</span>
        </Button>

        <Button
          variant="outline"
          class="w-full h-10 flex items-center justify-center bg-white hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 ease-in-out text-orange-700 hover:text-orange-800 hover:shadow-lg hover:scale-[1.02] group"
          @click="handleReset"
        >
          <RotateCcw
            class="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500"
          />
          <span class="font-medium">Reset to Default</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Settings,
  Palette,
  ArrowLeftRight,
  ArrowUpDown,
  Eye,
  Save,
  RotateCcw,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'

interface Props {
  backgroundColor: string
  canvasWidth: number
  canvasHeight: number
}

interface Emits {
  (e: 'update:backgroundColor', value: string): void
  (e: 'update:canvasWidth', value: number): void
  (e: 'update:canvasHeight', value: number): void
  (e: 'preview'): void
  (e: 'save'): void
  (e: 'reset'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Local reactive values
const backgroundColor = ref(props.backgroundColor)
const width = ref(props.canvasWidth)
const height = ref(props.canvasHeight)

// Watch for prop changes
watch(
  () => props.backgroundColor,
  (newVal) => {
    backgroundColor.value = newVal
  },
)

watch(
  () => props.canvasWidth,
  (newVal) => {
    width.value = newVal
  },
)

watch(
  () => props.canvasHeight,
  (newVal) => {
    height.value = newVal
  },
)

// Watch for local changes and emit
watch(backgroundColor, (newVal) => {
  emit('update:backgroundColor', newVal)
})

const updateDimensions = () => {
  emit('update:canvasWidth', width.value)
  emit('update:canvasHeight', height.value)
}

const handlePreview = () => {
  emit('preview')
}

const handleSave = () => {
  emit('save')
}

const handleReset = () => {
  emit('reset')
}
</script>
