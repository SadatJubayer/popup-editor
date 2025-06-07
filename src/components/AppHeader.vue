<template>
  <div class="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30 shadow-sm">
    <div class="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 max-w-7xl mx-auto">
      <div class="flex items-center gap-3 md:gap-4">
        <div
          class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
        >
          <Zap class="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 class="text-lg md:text-xl font-bold">PopUp Editor</h1>
          <p class="text-xs text-gray-500 hidden md:block">
            Create beautiful popups for your website
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Zap } from 'lucide-vue-next'
</script>
