<script setup lang="ts">
const pillars = [
  {
    id: "sejarah",
    title: "1.200 Tahun Narasi",
    desc: "Dari Prasasti Canggal hingga monarki modern, sejarah kota ini adalah fondasi peradaban Jawa yang terus hidup dan berdenyut.",
    link: "/sejarah",
    metric: "856 M",
    metricLabel: "Prambanan Berdiri",
    spanClass: "md:col-span-1 lg:col-span-2",
  },
  {
    id: "budaya",
    title: "Denyut Tradisi",
    desc: "Seni kriya, wayang, dan gamelan yang diakui UNESCO, hidup berdampingan dalam harmoni tanpa tergilas modernisasi.",
    link: "/budaya",
    metric: "3",
    metricLabel: "Warisan UNESCO",
    spanClass: "md:col-span-1 lg:col-span-2",
  },
  {
    id: "kuliner",
    title: "Simfoni Rasa",
    desc: "Gastronomi yang lahir dari kesabaran. Setiap hidangan, dari Gudeg hingga Kopi Joss, adalah identitas kultur Yogyakarta.",
    link: "/kuliner",
    metric: "12 Jam",
    metricLabel: "Karamelisasi Gudeg",
    spanClass: "md:col-span-1 lg:col-span-2",
  },
  {
    id: "wisata",
    title: "Sudut Keajaiban",
    desc: "Dari megahnya candi purba peninggalan wangsa Sanjaya hingga mistisnya garis pantai vulkanik di pesisir Samudra Hindia.",
    link: "/wisata",
    metric: "5M+",
    metricLabel: "Kunjungan Tahunan",
    spanClass: "md:col-span-1 lg:col-span-3",
  },
  {
    id: "teknologi",
    title: "Lompatan Digital",
    desc: "Mesin pencetak inovator. Ribuan lulusan STEM per tahun membangun ekosistem startup terbesar di luar ibu kota.",
    link: "/teknologi",
    metric: "300+",
    metricLabel: "Startup Aktif",
    spanClass: "md:col-span-2 lg:col-span-3",
  },
];
</script>

<template>
  <section
    class="relative z-10 px-5 py-20 lg:px-[60px] lg:py-[140px] bg-warm-white"
  >
    <div v-observe class="mb-16 lg:mb-24 reveal-up">
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-6"
      >
        Laporan Utama
      </div>
      <h2
        class="font-libre text-[clamp(36px,5vw,56px)] font-bold leading-[1.15] text-ink max-w-[800px]"
      >
        Menjaga Masa Lalu,<br />
        <em class="italic text-terra block mt-2">Membangun Masa Depan</em>
      </h2>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-16"
    >
      <article
        v-for="(item, index) in pillars"
        :key="item.id"
        v-observe
        class="flex flex-col border-t-2 border-line pt-8 reveal-up"
        :class="item.spanClass"
        :style="`transition-delay: ${(index % 3) * 150}ms`"
      >
        <div class="flex items-baseline gap-4 mb-8">
          <span
            class="font-libre text-[44px] font-bold text-ink leading-none"
            >{{ item.metric }}</span
          >
          <span
            class="font-josefin text-[10px] tracking-[0.2em] uppercase text-terra"
            >{{ item.metricLabel }}</span
          >
        </div>

        <h3 class="font-libre text-[24px] font-bold text-ink mb-4">
          {{ item.title }}
        </h3>
        <p
          class="text-[15px] font-light text-brown leading-[1.8] mb-10 flex-grow"
        >
          {{ item.desc }}
        </p>

        <NuxtLink
          :to="item.link"
          class="inline-flex items-center gap-3 font-josefin text-[11px] font-semibold tracking-[0.2em] uppercase text-ink transition-colors duration-300 hover:text-terra after:content-['→'] after:text-[14px]"
        >
          Eksplorasi
        </NuxtLink>
      </article>
    </div>
  </section>
</template>
