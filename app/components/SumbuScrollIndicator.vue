<script setup lang="ts">
import { useI18n } from "#imports";

defineProps<{
  activeIndex: number;
  stopsCount: number;
}>();

const { locale } = useI18n();
</script>

<template>
  <div
    class="fixed right-6 top-1/2 -translate-y-1/2 z-[50] hidden lg:flex flex-col items-center gap-8 pointer-events-none transition-opacity duration-500"
    :class="activeIndex >= stopsCount - 1 ? 'opacity-0' : 'opacity-100'"
  >
    <span
      class="font-josefin text-[9px] tracking-[0.3em] uppercase text-[#faf7f2]/40"
      style="writing-mode: vertical-rl"
    >
      {{ locale === "id" ? "Scroll" : "Scroll" }}
    </span>
    <div class="w-[1px] h-16 bg-[#faf7f2]/20 relative overflow-hidden">
      <div
        class="absolute top-0 left-0 w-full h-full bg-[#b8491f] animate-scroll-vertical"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.animate-scroll-vertical {
  animation: scrollVertical 2s ease-in-out infinite;
}
@keyframes scrollVertical {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
