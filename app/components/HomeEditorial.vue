<script setup lang="ts">
const pillars = [
  {
    id: "sejarah",
    title: "1.200 Tahun Narasi",
    desc: "Dari Prasasti Canggal hingga monarki modern, sejarah kota ini adalah fondasi peradaban.",
    link: "/sejarah",
    metric: "856 M",
    metricLabel: "Prambanan",
  },
  {
    id: "budaya",
    title: "Denyut Tradisi",
    desc: "Seni kriya, wayang, dan gamelan yang diakui UNESCO, hidup berdampingan tanpa tergilas zaman.",
    link: "/budaya",
    metric: "3",
    metricLabel: "Warisan UNESCO",
  },
  {
    id: "teknologi",
    title: "Lompatan Digital",
    desc: "Mesin pencetak inovator. Ribuan lulusan STEM per tahun membangun ekosistem startup.",
    link: "/teknologi",
    metric: "300+",
    metricLabel: "Startup Aktif",
  },
];
</script>

<template>
  <section
    class="relative z-10 px-5 pt-[140px] pb-20 lg:pt-[200px] lg:px-[60px] lg:pb-[140px] bg-warm-white"
  >
    <div v-observe class="mb-16 lg:mb-20 reveal-up">
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-6"
      >
        Laporan Utama
      </div>
      <h2
        class="font-libre text-[clamp(32px,5vw,52px)] font-bold leading-[1.15] text-ink max-w-[700px]"
      >
        Menjaga Masa Lalu,<br />
        <em class="italic text-terra block mt-2">Membangun Masa Depan</em>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
      <article
        v-for="(item, index) in pillars"
        :key="item.id"
        v-observe
        class="flex flex-col border-t-2 border-line pt-8 reveal-up"
        :style="`transition-delay: ${index * 150}ms`"
      >
        <div class="flex items-baseline gap-4 mb-6">
          <span
            class="font-libre text-[36px] font-bold text-ink leading-none"
            >{{ item.metric }}</span
          >
          <span
            class="font-josefin text-[9px] tracking-[0.2em] uppercase text-terra"
            >{{ item.metricLabel }}</span
          >
        </div>
        <h3 class="font-libre text-[22px] font-bold text-ink mb-3">
          {{ item.title }}
        </h3>
        <p
          class="text-[14px] font-light text-brown leading-[1.8] mb-8 flex-grow"
        >
          {{ item.desc }}
        </p>
        <NuxtLink
          :to="item.link"
          class="inline-flex items-center gap-3 font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-ink transition-colors duration-300 hover:text-terra after:content-['→'] after:text-[14px]"
        >
          Eksplorasi
        </NuxtLink>
      </article>
    </div>
  </section>
</template>
