<script setup lang="ts">
import { useScrollProgress } from "~/composables/useScrollProgress";

const { progress } = useScrollProgress();
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-[2px] z-[105] pointer-events-none bg-transparent"
  >
    <div
      class="h-full bg-terra origin-left will-change-transform transition-none"
      :style="{ transform: `scaleX(${progress / 100})` }"
    ></div>
  </div>
</template>
