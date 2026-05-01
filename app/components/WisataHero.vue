<script setup lang="ts">
defineProps<{
  activeDestination: string;
  activeImage: string;
}>();
</script>

<template>
  <div
    v-observe
    class="w-full h-[30vh] lg:h-[40vh] mb-16 relative overflow-hidden reveal-up delay-100 border border-line shadow-xl bg-[#1a1208] print:hidden"
  >
    <AppImage
      :key="activeDestination"
      :src="activeImage"
      alt="Visual Destinasi"
      class="w-full h-full object-cover opacity-90 transition-opacity duration-500"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-[#1a1208]/10 transition-none"></div>
    <div
      class="absolute bottom-4 right-4 z-20 font-josefin text-[8px] tracking-[0.2em] text-[#faf7f2]/80 uppercase bg-[#1a1208]/80 backdrop-blur-sm px-3 py-1 border border-[#faf7f2]/10 transition-none"
    >
      {{ $t("wisata.location_preview") }}
    </div>
  </div>
</template>
