<template>
  <div class="h-screen bg-white flex flex-col">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content Area -->
    <div class="flex-1 p-4 lg:p-8 lg:px-4 lg:pt-2">
      <div class="max-w-7xl mx-auto h-full">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
          <!-- Left Sidebar: Add Elements & Canvas Controls -->
          <div class="space-y-0 lg:space-y-4">
            <slot name="sidebar" />
          </div>

          <!-- Center: Canvas Area -->
          <div class="lg:col-span-2 border-l border-r border-gray-200 px-4">
            <slot name="canvas" />
          </div>

          <!-- Right Sidebar: Properties Panel -->
          <div class="lg:col-span-1">
            <slot name="properties" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modals/Dialogs -->
    <slot name="dialogs" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>
