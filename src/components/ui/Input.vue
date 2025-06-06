<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :disabled="disabled"
    :class="inputClasses"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'BaseInput',
})

interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  min?: string | number
  max?: string | number
  disabled?: boolean
  class?: string
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const emit = defineEmits<Emits>()

const inputClasses = computed(() => {
  const baseClasses =
    'flex h-10 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  return [baseClasses, props.class].filter(Boolean).join(' ')
})

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}
</script>
