<template>
  <label :class="labelClasses">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'BaseLabel',
})

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})

const labelClasses = computed(() => {
  const baseClasses =
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'

  return [baseClasses, props.class].filter(Boolean).join(' ')
})
</script>
