<template>
  <div class="space-y-2">
    <label class="text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="flex items-center gap-3">
      <div
        class="w-12 min-w-10 h-10 rounded-lg border-2 border-gray-300 shadow-lg cursor-pointer transition-transform hover:scale-105"
        :style="{ backgroundColor: modelValue }"
        @click="() => colorInputRef?.click()"
      />
      <input
        ref="colorInputRef"
        type="color"
        :value="modelValue"
        @input="handleColorChange"
        class="sr-only"
      />
      <input
        type="text"
        :value="modelValue"
        @input="handleTextChange"
        class="flex-1 font-mono text-sm pl-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black w-auto"
        placeholder="#000000"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue: string
  label: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const colorInputRef = ref<HTMLInputElement | null>(null)

const handleColorChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleTextChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
