<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8 gap-5">
    <!-- Color Picker Controls -->
    <div class="top-8 left-8 bg-white p-6 rounded-lg shadow-lg">
      <ColorPicker v-model="circularBgColor" label="Popup Background Color" />
    </div>

    <!-- Circular Popup -->
    <div
      class="relative w-[500px] h-[500px] rounded-full shadow-2xl flex flex-col gap-6 items-center justify-center text-center p-8"
      :style="{ backgroundColor: circularBgColor }"
    >
      <div
        class="absolute inset-0 rounded-full pointer-events-none z-10 border-3 border-white m-2"
      ></div>

      <!-- Stars -->
      <div class="flex gap-2">
        <div class="text-[#FBFF37] text-2xl">★</div>
        <div class="text-[#FBFF37] text-4xl -mt-4">★</div>
        <div class="text-[#FBFF37] text-2xl">★</div>
      </div>

      <!-- Main Text -->
      <h2 class="text-white text-[24px] font-bold leading-tight px-2">
        All the text and elements<br />
        in this popup should be<br />
        editable and draggable
      </h2>

      <!-- Email Input -->
      <Input
        type="email"
        placeholder="E-mail"
        class="px-4 py-3 rounded bg-white/90 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 w-72"
      />

      <!-- Signup Button -->
      <Button variant="default" class="bg-[#3A3A3C] text-white px-12 py-4 w-72">SIGNUP NOW</Button>

      <!-- Bottom Text -->
      <p class="text-white/90 text-sm">No credit card required. No Surprises</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'

// Reactive state for background color with default value
const circularBgColor = ref('#E17A5F')
</script>

<style scoped></style>
