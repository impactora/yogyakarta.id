<script setup lang="ts">
import { MapPin, Banknote } from "lucide-vue-next";

defineProps<{
  item: any;
}>();
</script>

<template>
  <section
    v-observe
    class="mt-10 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center reveal-up delay-100"
  >
    <div
      class="aspect-[4/3] lg:aspect-video bg-[#1a1208] relative overflow-hidden group shadow-xl border border-line"
    >
      <AppImage
        :src="item.image"
        :alt="item.displayTitle"
        class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#1a1208]/60 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 z-10"
      ></div>
      <div
        class="absolute top-4 left-4 z-20 font-josefin text-[9px] uppercase tracking-widest text-[#faf7f2]/90 bg-[#1a1208]/80 backdrop-blur-sm px-3 py-1 border border-[#faf7f2]/10 transition-none"
      >
        {{ $t("kuliner.traditional_mataram") }}
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-4"
      >
        {{ item.displayMeta }}
      </div>
      <h2
        class="font-libre text-[32px] lg:text-[44px] font-bold text-ink mb-6 leading-[1.15]"
      >
        {{ item.displayTitle }}
      </h2>
      <p
        class="text-[16px] font-light text-brown leading-[1.9] mb-8 italic border-l-2 border-terra pl-5"
      >
        "{{ item.displayStory }}"
      </p>
      <div
        class="flex flex-col gap-3 pt-6 border-t border-line font-josefin text-[10px] tracking-[0.15em] text-muted"
      >
        <div class="flex items-center gap-3">
          <MapPin class="w-3 h-3 text-terra" />
          {{ item.displayAddress }}
        </div>
        <div class="flex items-center gap-3">
          <Banknote class="w-3 h-3 text-terra" />
          {{ item.displayPrice }}
        </div>
      </div>
    </div>
  </section>
</template>
