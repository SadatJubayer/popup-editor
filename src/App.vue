<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-8">
    <!-- Circular Popup -->
    <div
      class="relative w-[500px] h-[500px] bg-[#E17A5F] rounded-full shadow-2xl flex flex-col items-center justify-center text-center p-8"
    >
      <div
        class="absolute inset-0 rounded-full pointer-events-none z-10 border-3 border-white m-2"
      ></div>

      <!-- Stars -->
      <div class="flex gap-2 mb-6">
        <div class="text-[#FBFF37] text-2xl">★</div>
        <div class="text-[#FBFF37] text-4xl -mt-4">★</div>
        <div class="text-[#FBFF37] text-2xl">★</div>
      </div>

      <!-- Main Text -->
      <h2 class="text-white text-[24px] font-bold mb-8 leading-tight px-2">
        All the text and elements<br />
        in this popup should be<br />
        editable and draggable
      </h2>

      <!-- Email Input -->
      <div class="w-full max-w-xs mb-4">
        <input
          type="email"
          placeholder="E-mail"
          class="w-full px-4 py-3 rounded bg-white/90 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>

      <!-- Signup Button -->
      <button
        class="w-full max-w-xs bg-[#3A3A3C] hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded transition-colors duration-200 mb-4"
      >
        SIGNUP NOW
      </button>

      <!-- Bottom Text -->
      <p class="text-white/90 text-sm">No credit card required. No Surprises</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
