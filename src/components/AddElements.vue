<template>
  <div class="bg-white p-6 rounded-lg shadow-lg w-full">
    <h3
      class="text-lg font-semibold mb-4 text-gray-800 flex items-center border-b border-gray-200 pb-2"
    >
      <Plus class="h-5 w-5 mr-2 text-blue-500" />
      Add Elements
    </h3>

    <div class="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        class="py-1 px-4 flex-row justify-start items-center bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-500 ease-in-out text-black hover:shadow-xl hover:scale-105 group"
        @click="addElement('text')"
      >
        <FileText
          class="h-5 w-5 mr-3 text-gray-600 group-hover:text-blue-600 transition-all duration-500 ease-in-out"
        />
        <span class="text-sm font-medium">Text</span>
      </Button>

      <Button
        variant="outline"
        class="py-1 px-4 flex-row justify-start items-center bg-white hover:bg-green-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-500 ease-in-out text-black hover:shadow-xl hover:scale-105 group"
        @click="addElement('button')"
      >
        <RectangleHorizontal
          class="h-5 w-5 mr-3 text-gray-600 group-hover:text-green-600 transition-all duration-500 ease-in-out"
        />
        <span class="text-sm font-medium">Button</span>
      </Button>

      <Button
        variant="outline"
        class="py-1 px-4 flex-row justify-start items-center bg-white hover:bg-purple-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-500 ease-in-out text-black hover:shadow-xl hover:scale-105 group"
        @click="addElement('input')"
      >
        <TextCursor
          class="h-5 w-5 mr-3 text-gray-600 group-hover:text-purple-600 transition-all duration-500 ease-in-out"
        />
        <span class="text-sm font-medium">Input</span>
      </Button>

      <Button
        variant="outline"
        class="py-1 px-4 flex-row justify-start items-center bg-white hover:bg-orange-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-500 ease-in-out text-black hover:shadow-xl hover:scale-105 group"
        @click="addElement('svg')"
      >
        <Shapes
          class="h-5 w-5 mr-3 text-gray-600 group-hover:text-orange-600 transition-all duration-500 ease-in-out"
        />
        <span class="text-sm font-medium">Icon</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, FileText, RectangleHorizontal, TextCursor, Shapes } from 'lucide-vue-next'
import type { ElementType } from '@/types'
import Button from '@/components/ui/Button.vue'

interface Emits {
  (e: 'addElement', type: ElementType): void
}

const emit = defineEmits<Emits>()

const addElement = (type: ElementType) => {
  emit('addElement', type)
}
</script>
