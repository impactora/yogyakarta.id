<script setup lang="ts">
import { useNuxtApp } from "#imports";

const { $pwa } = useNuxtApp();
</script>

<template>
  <div
    v-if="$pwa?.offlineReady || $pwa?.needRefresh"
    class="fixed bottom-6 right-6 z-[200] bg-ink text-warm-white p-5 border border-line flex flex-col gap-4 shadow-2xl reveal-up in-view"
  >
    <span
      v-if="$pwa.offlineReady"
      class="font-josefin text-[11px] uppercase tracking-[0.15em]"
    >
      Aplikasi siap offline
    </span>
    <span v-else class="font-josefin text-[11px] uppercase tracking-[0.15em]">
      Pembaruan data tersedia
    </span>

    <div class="flex gap-3">
      <button
        v-if="$pwa.needRefresh"
        @click="$pwa.updateServiceWorker()"
        class="px-4 py-2 bg-terra text-warm-white font-josefin text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
      >
        Muat Ulang
      </button>
      <button
        @click="$pwa.cancelPrompt()"
        class="px-4 py-2 border border-warm-white/20 hover:bg-warm-white/10 transition-colors font-josefin text-[10px] uppercase tracking-widest"
      >
        Tutup
      </button>
    </div>
  </div>
</template>
