<script setup lang="ts">
defineProps<{
  activeDestination: string;
  activeMapUrl: string;
}>();
</script>

<template>
  <div v-observe class="relative reveal-up delay-200 print:hidden">
    <div
      class="lg:sticky lg:top-[120px] h-[400px] lg:h-[600px] w-full bg-ink border border-line shadow-2xl overflow-hidden p-2"
    >
      <div
        class="absolute inset-0 flex items-center justify-center font-josefin text-[10px] tracking-[0.2em] text-parchment/50 uppercase z-0"
      >
        {{ $t("wisata.loading_map") }}
      </div>
      <iframe
        :key="activeDestination"
        :src="activeMapUrl"
        class="relative z-10 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 bg-ink"
        allowfullscreen="false"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>
