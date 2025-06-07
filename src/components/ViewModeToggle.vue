<template>
  <div class="flex bg-gray-200 rounded-md">
    <button
      :class="[
        'px-3 py-2 text-sm font-medium rounded-l-md transition-colors',
        viewMode === 'desktop' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-300',
      ]"
      @click="$emit('update:viewMode', 'desktop')"
      :aria-label="'Switch to desktop view'"
    >
      <Monitor class="h-4 w-4 mr-1 inline" />
      Desktop
    </button>
    <button
      :class="[
        'px-3 py-2 text-sm font-medium rounded-r-md transition-colors',
        viewMode === 'mobile' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-300',
      ]"
      @click="$emit('update:viewMode', 'mobile')"
      :aria-label="'Switch to mobile view'"
    >
      <Smartphone class="h-4 w-4 mr-1 inline" />
      Mobile
    </button>
  </div>
</template>

<script setup lang="ts">
import { Monitor, Smartphone } from 'lucide-vue-next'
import type { ViewMode } from '@/composables/useDragAndDrop'

interface Props {
  viewMode: ViewMode
}

interface Emits {
  (e: 'update:viewMode', value: ViewMode): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
