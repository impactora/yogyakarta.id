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
    id: "kuliner",
    title: "Simfoni Rasa",
    desc: "Gastronomi lokal yang merekam jejak kesabaran. Dari manisnya Gudeg hingga ekstremnya Sate Klathak.",
    link: "/kuliner",
    metric: "12+",
    metricLabel: "Jam Dimasak",
  },
  {
    id: "wisata",
    title: "Navigasi Destinasi",
    desc: "Menjelajahi ruang spasial dari puncak Merapi di utara hingga pesisir Parangtritis di selatan.",
    link: "/wisata",
    metric: "33 KM",
    metricLabel: "Sumbu Kosmologis",
  },
  {
    id: "teknologi",
    title: "Lompatan Digital",
    desc: "Mesin pencetak inovator. Ribuan lulusan STEM per tahun membangun ekosistem startup.",
    link: "/teknologi",
    metric: "300+",
    metricLabel: "Startup Aktif",
  },
  {
    id: "peta",
    title: "Peta Interaktif",
    desc: "Navigasi spasial interaktif untuk memetakan seluruh dimensi kota dalam satu layar.",
    link: "/peta",
    metric: "1",
    metricLabel: "Kanvas Digital",
  },
];
</script>

<template>
  <section
    id="editorial-section"
    class="relative z-10 px-5 pt-[160px] pb-24 lg:pt-[240px] lg:px-[60px] lg:pb-[180px] bg-warm-white border-t border-line"
  >
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="
        background-image: radial-gradient(var(--color-ink) 1px, transparent 0);
        background-size: 40px 40px;
      "
    ></div>

    <div class="relative max-w-[1440px] mx-auto">
      <div
        v-observe
        class="mb-20 lg:mb-32 reveal-up grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-end"
      >
        <div>
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.3em] uppercase text-terra mb-8 flex items-center gap-4"
          >
            <span class="w-12 h-[1px] bg-terra"></span>
            Laporan Utama
          </div>
          <h2
            class="font-libre text-[clamp(36px,6vw,64px)] font-bold leading-[1.05] text-ink italic"
          >
            Menjaga Masa Lalu,<br />
            <span class="not-italic text-terra">Membangun Masa Depan</span>
          </h2>
        </div>
        <div
          class="font-josefin text-[13px] text-brown leading-relaxed border-l border-line pl-8 mb-4"
        >
          Sebuah eksplorasi multidimensi Yogyakarta. Dari sumbu filosofis hingga
          klaster teknologi, setiap sudut kota adalah naskah yang menunggu untuk
          dibaca.
        </div>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-line"
      >
        <article
          v-for="(item, index) in pillars"
          :key="item.id"
          v-observe
          class="group flex flex-col border-r border-b border-line p-10 lg:p-14 reveal-up transition-colors duration-500 hover:bg-ink/[0.02]"
          :style="`transition-delay: ${index * 100}ms`"
        >
          <div
            class="font-libre text-[12px] text-muted mb-12 flex items-center gap-2"
          >
            <span class="text-terra">/</span> 0{{ index + 1 }}
          </div>

          <div class="flex items-baseline gap-4 mb-8">
            <span
              class="font-libre text-[42px] font-bold text-ink leading-none"
              >{{ item.metric }}</span
            >
            <span
              class="font-josefin text-[9px] tracking-[0.2em] uppercase text-terra font-semibold"
              >{{ item.metricLabel }}</span
            >
          </div>

          <h3
            class="font-libre text-[26px] font-bold text-ink mb-4 group-hover:text-terra transition-colors duration-300"
          >
            {{ item.title }}
          </h3>

          <p
            class="text-[15px] font-light text-brown leading-[1.9] mb-12 flex-grow"
          >
            {{ item.desc }}
          </p>

          <NuxtLink
            :to="item.link"
            class="inline-flex items-center gap-4 font-josefin text-[11px] font-bold tracking-[0.2em] uppercase text-ink group-hover:gap-6 transition-all duration-300"
            :aria-label="`Eksplorasi ${item.title}`"
          >
            Pelajari Selengkapnya
            <span class="text-terra text-[16px] leading-none">→</span>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-up.in-view {
  opacity: 1;
  transform: translateY(0);
}

#editorial-section {
  scroll-margin-top: 100px;
}
</style>
