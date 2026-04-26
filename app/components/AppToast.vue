<script setup lang="ts">
import { CheckCircle, AlertTriangle, Info, X } from "lucide-vue-next";

const { isVisible, message, type, hide } = useToast();
</script>

<template>
  <transition name="toast-slide">
    <div
      v-if="isVisible"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border no-print"
      :class="{
        'bg-white border-terra text-ink': type === 'success',
        'bg-ink border-red-500 text-red-400': type === 'error',
        'bg-ink border-line text-white': type === 'info',
      }"
    >
      <CheckCircle
        v-if="type === 'success'"
        class="w-5 h-5 text-terra flex-shrink-0"
      />
      <AlertTriangle
        v-if="type === 'error'"
        class="w-5 h-5 text-red-500 flex-shrink-0"
      />
      <Info
        v-if="type === 'info'"
        class="w-5 h-5 text-parchment flex-shrink-0"
      />

      <span
        class="font-josefin text-[12px] font-semibold tracking-wide whitespace-nowrap"
        >{{ message }}</span
      >

      <button
        @click="hide"
        class="ml-2 p-1 hover:opacity-60 transition-opacity"
        aria-label="Tutup notifikasi"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </transition>
</template>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px) scale(0.95);
}
</style>
