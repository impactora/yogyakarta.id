<script setup lang="ts">
const features = [
  {
    id: "01",
    title: "Sejarah",
    sub: "1.200 tahun perjalanan",
    path: "/sejarah",
  },
  {
    id: "02",
    title: "Budaya",
    sub: "Wayang · Batik · Gamelan",
    path: "/budaya",
  },
  {
    id: "03",
    title: "Kuliner",
    sub: "Gudeg · Bakpia · Kopi Joss",
    path: "/kuliner",
  },
  {
    id: "04",
    title: "Wisata",
    sub: "Prambanan · Keraton · Merapi",
    path: "/wisata",
  },
  {
    id: "05",
    title: "Teknologi",
    sub: "21 Universitas · 300+ Startup",
    path: "/teknologi",
  },
  { id: "06", title: "Peta", sub: "Navigasi interaktif kota", path: "/peta" },
];
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
        Kota yang<br />Tak Pernah<br /><em class="italic text-terra block"
          >Berhenti</em
        >
      </h1>
      <p
        class="font-libre text-base italic text-muted leading-[1.7] border-l-[3px] border-terra pl-5 mb-12"
      >
        "Yogyakarta bukan tempat yang kamu kunjungi — ini tempat yang kamu
        pulang kepadanya, sekalipun baru pertama kali datang."
      </p>
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-muted flex items-center gap-5 before:content-[''] before:block before:w-5 before:h-px before:bg-current"
      >
        Yogyakarta · Java · Indonesia
      </div>
    </div>

    <div
      class="bg-ink flex flex-col justify-center p-5 py-10 lg:p-[60px] relative overflow-hidden before:content-[''] before:absolute before:top-10 before:right-10 before:w-[200px] before:h-[200px] before:border before:border-gold-warm/15 before:rotate-45 after:content-[''] after:absolute after:top-[70px] after:right-[70px] after:w-[140px] after:h-[140px] after:border after:border-gold-warm/10 after:rotate-45"
    >
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-warm/80 mb-6"
      >
        Enam Dimensi Kota
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5"
      >
        <NuxtLink
          v-for="item in features"
          :key="item.id"
          :to="item.path"
          class="p-[28px_24px] bg-ink cursor-pointer transition-colors duration-200 relative hover:bg-white/5 block group"
        >
          <div
            class="font-josefin text-[9px] font-light tracking-[0.15em] text-white/30 mb-5 group-hover:text-terra transition-colors duration-200"
          >
            {{ item.id }}
          </div>
          <div
            class="font-libre text-base text-parchment/90 leading-[1.3] mb-2 group-hover:text-white transition-colors duration-200"
          >
            {{ item.title }}
          </div>
          <div class="text-xs font-light text-white/35 leading-[1.6]">
            {{ item.sub }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
