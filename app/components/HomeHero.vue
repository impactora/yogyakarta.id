<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "#imports";

const { locale } = useI18n();

const rawFeatures = [
  {
    id: "01",
    title: { id: "Sejarah", en: "History" },
    sub: { id: "1.200 tahun perjalanan", en: "1,200 years of journey" },
    path: "/sejarah",
  },
  {
    id: "02",
    title: { id: "Budaya", en: "Culture" },
    sub: { id: "Wayang · Batik · Gamelan", en: "Puppetry · Batik · Gamelan" },
    path: "/budaya",
  },
  {
    id: "03",
    title: { id: "Kuliner", en: "Culinary" },
    sub: {
      id: "Gudeg · Bakpia · Kopi Joss",
      en: "Gudeg · Bakpia · Joss Coffee",
    },
    path: "/kuliner",
  },
  {
    id: "04",
    title: { id: "Wisata", en: "Tourism" },
    sub: {
      id: "Prambanan · Keraton · Merapi",
      en: "Prambanan · Palace · Merapi",
    },
    path: "/wisata",
  },
  {
    id: "05",
    title: { id: "Teknologi", en: "Technology" },
    sub: {
      id: "21 Universitas · 300+ Startup",
      en: "21 Universities · 300+ Startups",
    },
    path: "/teknologi",
  },
  {
    id: "06",
    title: { id: "Peta", en: "Map" },
    sub: { id: "Navigasi interaktif kota", en: "Interactive city navigation" },
    path: "/peta",
  },
];

const features = computed(() => {
  const l = locale.value as "id" | "en";
  return rawFeatures.map((feat) => ({
    ...feat,
    displayTitle: feat.title[l],
    displaySub: feat.sub[l],
  }));
});
</script>

<template>
  <section
    class="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-[60px] lg:pt-[72px] z-10"
  >
    <div
      class="bg-parchment px-5 py-[60px] pb-10 lg:p-[120px_60px] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-line relative before:content-['01'] before:absolute before:top-10 before:right-5 lg:before:top-20 lg:before:right-10 before:font-josefin before:text-[11px] before:font-light before:tracking-[0.15em] before:text-muted before:[writing-mode:vertical-rl] before:rotate-180"
    >
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-7 flex items-center gap-4 before:content-[''] before:block before:w-8 before:h-px before:bg-terra"
      >
        Nusantara Digital City 2026
      </div>

      <h1
        class="font-libre text-[clamp(40px,10vw,52px)] lg:text-[clamp(52px,6vw,80px)] font-bold leading-[1.08] text-ink mb-6 lg:mb-8"
      >
        {{ $t("hero.title_line1") }}<br />
        {{ $t("hero.title_line2") }}<br />
        <em class="italic text-terra block">{{ $t("hero.title_line3") }}</em>
      </h1>

      <p
        class="font-libre text-base italic text-muted leading-[1.7] border-l-[3px] border-terra pl-5 mb-12"
      >
        "{{ $t("hero.quote") }}"
      </p>

      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-muted flex items-center gap-5 before:content-[''] before:block before:w-5 before:h-px before:bg-current"
      >
        Yogyakarta · Java · Indonesia
      </div>
    </div>

    <div
      class="bg-[#1a1208] flex flex-col justify-center p-5 py-10 lg:p-[60px] relative overflow-hidden before:content-[''] before:absolute before:z-10 before:pointer-events-none before:top-10 before:right-10 before:w-[200px] before:h-[200px] before:border before:border-gold-warm/30 before:rotate-45 after:content-[''] after:absolute after:z-10 after:pointer-events-none after:top-[70px] after:right-[70px] after:w-[140px] after:h-[140px] after:border after:border-gold-warm/20 after:rotate-45"
    >
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-warm mb-6"
      >
        {{ $t("hero.dimensions") }}
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#faf7f2]/10 border border-[#faf7f2]/10"
      >
        <NuxtLink
          v-for="item in features"
          :key="item.id"
          :to="item.path"
          class="p-[28px_24px] bg-[#1a1208] cursor-pointer transition-all duration-300 relative hover:bg-[#faf7f2]/5 block group"
        >
          <div
            class="font-josefin text-[9px] font-light tracking-[0.15em] text-[#faf7f2]/40 mb-5 group-hover:text-terra transition-colors duration-200"
          >
            {{ item.id }}
          </div>
          <div
            class="font-libre text-base text-[#faf7f2]/90 leading-[1.3] mb-2 group-hover:text-[#faf7f2] transition-colors duration-200"
          >
            {{ item.displayTitle }}
          </div>
          <div class="text-xs font-light text-[#faf7f2]/40 leading-[1.6]">
            {{ item.displaySub }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
