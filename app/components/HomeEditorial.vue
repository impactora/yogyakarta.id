<script setup lang="ts">
const { locale } = useI18n();

const rawPillars = [
  {
    id: "sejarah",
    link: "/sejarah",
    metric: "856 M",
    metricLabel: { id: "Prambanan", en: "Prambanan" },
    title: { id: "1.200 Tahun Narasi", en: "1,200 Years of Narrative" },
    desc: {
      id: "Dari Prasasti Canggal hingga monarki modern, sejarah kota ini adalah fondasi peradaban.",
      en: "From the Canggal Inscription to the modern monarchy, this city's history is the foundation of civilization.",
    },
  },
  {
    id: "budaya",
    link: "/budaya",
    metric: "3",
    metricLabel: { id: "Warisan UNESCO", en: "UNESCO Heritage" },
    title: { id: "Denyut Tradisi", en: "Pulse of Tradition" },
    desc: {
      id: "Seni kriya, wayang, dan gamelan yang diakui UNESCO, hidup berdampingan tanpa tergilas zaman.",
      en: "UNESCO-recognized crafts, puppetry, and gamelan, coexisting without being crushed by time.",
    },
  },
  {
    id: "kuliner",
    link: "/kuliner",
    metric: "12+",
    metricLabel: { id: "Jam Dimasak", en: "Hours Cooked" },
    title: { id: "Simfoni Rasa", en: "Symphony of Flavors" },
    desc: {
      id: "Gastronomi lokal yang merekam jejak kesabaran. Dari manisnya Gudeg hingga ekstremnya Sate Klathak.",
      en: "Local gastronomy recording the traces of patience. From the sweet Gudeg to the extreme Klathak Satay.",
    },
  },
  {
    id: "wisata",
    link: "/wisata",
    metric: "33 KM",
    metricLabel: { id: "Sumbu Kosmologis", en: "Cosmological Axis" },
    title: { id: "Navigasi Destinasi", en: "Destination Navigation" },
    desc: {
      id: "Menjelajahi ruang spasial dari puncak Merapi di utara hingga pesisir Parangtritis di selatan.",
      en: "Exploring the spatial space from the peak of Merapi in the north to the Parangtritis coast in the south.",
    },
  },
  {
    id: "teknologi",
    link: "/teknologi",
    metric: "300+",
    metricLabel: { id: "Startup Aktif", en: "Active Startups" },
    title: { id: "Lompatan Digital", en: "Digital Leap" },
    desc: {
      id: "Mesin pencetak inovator. Ribuan lulusan STEM per tahun membangun ekosistem startup.",
      en: "Innovator printing machine. Thousands of STEM graduates per year building the startup ecosystem.",
    },
  },
  {
    id: "peta",
    link: "/peta",
    metric: "1",
    metricLabel: { id: "Kanvas Digital", en: "Digital Canvas" },
    title: { id: "Peta Interaktif", en: "Interactive Map" },
    desc: {
      id: "Navigasi spasial interaktif untuk memetakan seluruh dimensi kota dalam satu layar.",
      en: "Interactive spatial navigation to map all dimensions of the city in one screen.",
    },
  },
];

const pillars = computed(() => {
  const l = locale.value as "id" | "en";
  return rawPillars.map((p) => ({
    ...p,
    displayTitle: p.title[l],
    displayDesc: p.desc[l],
    displayMetricLabel: p.metricLabel[l],
  }));
});
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
            {{ locale === "id" ? "Laporan Utama" : "Main Report" }}
          </div>
          <h2
            class="font-libre text-[clamp(36px,6vw,64px)] font-bold leading-[1.05] text-ink italic"
          >
            <template v-if="locale === 'id'">
              Menjaga Masa Lalu,<br />
              <span class="not-italic text-terra">Membangun Masa Depan</span>
            </template>
            <template v-else>
              Preserving the Past,<br />
              <span class="not-italic text-terra">Building the Future</span>
            </template>
          </h2>
        </div>
        <div
          class="font-josefin text-[13px] text-brown leading-relaxed border-l border-line pl-8 mb-4"
        >
          {{
            locale === "id"
              ? "Sebuah eksplorasi multidimensi Yogyakarta. Dari sumbu filosofis hingga klaster teknologi, setiap sudut kota adalah naskah yang menunggu untuk dibaca."
              : "A multidimensional exploration of Yogyakarta. From the philosophical axis to the technology cluster, every corner of the city is a manuscript waiting to be read."
          }}
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
              >{{ item.displayMetricLabel }}</span
            >
          </div>

          <h3
            class="font-libre text-[26px] font-bold text-ink mb-4 group-hover:text-terra transition-colors duration-300"
          >
            {{ item.displayTitle }}
          </h3>

          <p
            class="text-[15px] font-light text-brown leading-[1.9] mb-12 flex-grow"
          >
            {{ item.displayDesc }}
          </p>

          <NuxtLink
            :to="item.link"
            class="inline-flex items-center gap-4 font-josefin text-[11px] font-bold tracking-[0.2em] uppercase text-ink group-hover:gap-6 transition-all duration-300"
            :aria-label="`Eksplorasi ${item.displayTitle}`"
          >
            {{ locale === "id" ? "Pelajari Selengkapnya" : "Learn More" }}
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
