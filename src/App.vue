<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8 gap-5">
    <!-- Color Picker Controls -->
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <ColorPicker v-model="design.backgroundColor" label="Popup Background Color" />
    </div>

    <!-- Dynamic Popup Renderer -->
    <div class="flex justify-center items-start min-h-[600px] w-full">
      <div class="relative">
        <div
          class="relative shadow-2xl overflow-hidden rounded-full"
          :style="{
            backgroundColor: design.backgroundColor,
            width: `${design.width}px`,
            height: `${design.height}px`,
          }"
        >
          <!-- White border inside the circle -->
          <div
            class="absolute inset-0 rounded-full pointer-events-none z-10 border-4 border-white m-1"
          />

          <!-- Dynamic Elements -->
          <template v-for="element in design.elements" :key="element.id">
            <!-- SVG Elements (Stars) -->
            <div
              v-if="element.type === 'svg'"
              class="absolute flex items-center justify-center"
              :style="{
                left: `${element.x}px`,
                top: `${element.y}px`,
                color: element.color,
                fontSize: `${element.svgSize || 32}px`,
              }"
            >
              <span v-if="element.svgType === 'star'">★</span>
              <span v-else-if="element.svgType === 'heart'">♥</span>
            </div>

            <!-- Text Elements -->
            <div
              v-else-if="element.type === 'text'"
              class="absolute"
              :style="{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width || 200}px`,
                fontSize: `${element.fontSize || 16}px`,
                color: element.color || '#000000',
                lineHeight: '1.2',
              }"
            >
              {{ element.content }}
            </div>

            <!-- Input Elements -->
            <Input
              v-else-if="element.type === 'input'"
              :type="element.content === 'E-mail' ? 'email' : 'text'"
              :placeholder="element.content"
              class="absolute"
              :style="{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width || 200}px`,
                height: `${element.height || 40}px`,
                backgroundColor: element.backgroundColor || '#ffffff',
                fontSize: `${element.fontSize || 16}px`,
                color: element.color || '#000000',
              }"
            />

            <!-- Button Elements -->
            <Button
              v-else-if="element.type === 'button'"
              class="absolute font-semibold"
              :style="{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width || 200}px`,
                height: `${element.height || 40}px`,
                backgroundColor: element.backgroundColor || '#000000',
                color: element.color || '#ffffff',
                fontSize: `${element.fontSize || 16}px`,
                borderRadius: `${element.borderRadius || 6}px`,
              }"
            >
              {{ element.content }}
            </Button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import { defaultDesign } from '@/lib/defaultDesign'

// Reactive state for the design data
const design = ref({ ...defaultDesign })
</script>

<style scoped></style>
