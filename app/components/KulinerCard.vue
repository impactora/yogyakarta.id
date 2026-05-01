<script setup lang="ts">
import { MapPin, Banknote } from "lucide-vue-next";

defineProps<{
  item: any;
}>();
</script>

<template>
  <article class="group flex flex-col h-full">
    <div
      class="h-[240px] bg-[#1a1208] mb-6 overflow-hidden relative border border-line shadow-sm"
    >
      <AppImage
        :src="item.image"
        :alt="item.displayTitle"
        class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-[#1a1208]/10 group-hover:bg-transparent transition-colors duration-500"
      ></div>
    </div>
    <div
      class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-3 flex items-center gap-2"
    >
      {{ item.displayCategory }} <span class="text-line">|</span>
      {{ item.displayMeta }}
    </div>
    <h3
      class="font-libre text-[22px] font-bold text-ink mb-3 group-hover:text-terra transition-colors duration-300"
    >
      {{ item.displayTitle }}
    </h3>
    <p class="text-[14px] font-light text-brown leading-[1.8] flex-grow mb-6">
      {{ item.displayStory }}
    </p>
    <div
      class="pt-4 border-t border-line flex flex-col gap-3 font-josefin text-[9px] tracking-[0.15em] text-muted transition-colors duration-300"
    >
      <div class="flex items-center gap-3">
        <MapPin class="w-3 h-3 text-terra" /> {{ item.displayAddress }}
      </div>
      <div class="flex items-center gap-3">
        <Banknote class="w-3 h-3 text-terra" /> {{ item.displayPrice }}
      </div>
    </div>
  </article>
</template>
