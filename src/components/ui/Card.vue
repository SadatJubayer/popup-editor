<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" :class="headerClasses">
      <slot name="header" />
    </div>

    <h3 v-if="$slots.title" :class="titleClasses">
      <slot name="title" />
    </h3>

    <div v-if="$slots.content" :class="contentClasses">
      <slot name="content" />
    </div>

    <!-- Default slot  -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'BaseCard',
})

interface Props {
  class?: string
  headerClass?: string
  titleClass?: string
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  headerClass: '',
  titleClass: '',
  contentClass: '',
})

const cardClasses = computed(() => {
  const baseClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm'
  return [baseClasses, props.class].filter(Boolean).join(' ')
})

const headerClasses = computed(() => {
  const baseClasses = 'flex flex-col space-y-1.5 p-6'
  return [baseClasses, props.headerClass].filter(Boolean).join(' ')
})

const titleClasses = computed(() => {
  const baseClasses = 'text-2xl font-semibold leading-none tracking-tight'
  return [baseClasses, props.titleClass].filter(Boolean).join(' ')
})

const contentClasses = computed(() => {
  const baseClasses = 'p-6 pt-0'
  return [baseClasses, props.contentClass].filter(Boolean).join(' ')
})
</script>
