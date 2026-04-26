<script setup lang="ts">
import { ref, computed } from "vue";
import { useHead, useI18n } from "#imports";

const { t, locale } = useI18n();

const rawTimeline = [
  {
    year: "732",
    title: { id: "Prasasti Canggal", en: "Canggal Inscription" },
    desc: {
      id: "Raja Sanjaya mendirikan lingga di Bukit Stirangga, Gunung Wukir. Dokumen tertua keberadaan peradaban Hindu di dataran Kedu — titik nol sejarah tertulis Yogyakarta.",
      en: "King Sanjaya erected a lingam on Stirangga Hill, Mount Wukir. The oldest document of Hindu civilization in the Kedu plain — the zero point of Yogyakarta's written history.",
    },
    meta: { id: "Awal Peradaban", en: "Dawn of Civilization" },
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Canggal_inscription.jpg",
  },
  {
    year: "856",
    title: { id: "Rampungnya Prambanan", en: "Completion of Prambanan" },
    desc: {
      id: "Wangsa Sanjaya merampungkan kompleks candi Hindu terbesar Asia Tenggara. 240 struktur batu andesit dibangun tanpa semen — hanya gravitasi, presisi, dan keyakinan.",
      en: "The Sanjaya dynasty completed Southeast Asia's largest Hindu temple complex. 240 andesite stone structures built without cement — only gravity, precision, and faith.",
    },
    meta: { id: "Puncak Wangsa Sanjaya", en: "Peak of Sanjaya Dynasty" },
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Prambanan.jpg",
  },
  {
    year: "1755",
    title: { id: "Perjanjian Giyanti", en: "Treaty of Giyanti" },
    desc: {
      id: "VOC membelah Mataram Islam. Pangeran Mangkubumi menjadi Sultan Hamengku Buwono I dan langsung merancang tata kota berbasis poros kosmologis.",
      en: "The VOC divided the Islamic Mataram. Prince Mangkubumi became Sultan Hamengku Buwono I and immediately designed a city layout based on a cosmological axis.",
    },
    meta: { id: "Kelahiran Kesultanan", en: "Birth of the Sultanate" },
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Keraton_Ngayogyakarta.jpg",
  },
  {
    year: "1825",
    title: { id: "Perang Diponegoro", en: "Java War" },
    desc: {
      id: "Lima tahun gerilya dari Goa Selarong menguras kas Hindia Belanda hingga Fl 20 juta. Perlawanan terpanjang dan termahal yang pernah dihadapi VOC di Jawa.",
      en: "Five years of guerrilla warfare from Selarong Cave drained the Dutch East Indies treasury by 20 million guilders. The longest and most expensive resistance the VOC ever faced in Java.",
    },
    meta: { id: "Perlawanan Kolonial", en: "Colonial Resistance" },
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Raden_Saleh_-_Diponegoro_arrest.jpg",
  },
  {
    year: "1946",
    title: {
      id: "Yogyakarta: Ibukota Republik",
      en: "Yogyakarta: Capital of the Republic",
    },
    desc: {
      id: "Sultan HB IX menyerahkan kedaulatan wilayahnya kepada NKRI. Ketika Jakarta jatuh ke NICA, Yogyakarta menjelma menjadi jantung revolusi kemerdekaan.",
      en: "Sultan HB IX surrendered his territory's sovereignty to the Republic of Indonesia. When Jakarta fell to NICA, Yogyakarta became the heart of the independence revolution.",
    },
    meta: { id: "Revolusi", en: "Revolution" },
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gedung_Agung.jpg",
  },
  {
    year: "1949",
    title: { id: "Serangan Umum 1 Maret", en: "March 1st General Attack" },
    desc: {
      id: "TNI menduduki Yogyakarta selama 6 jam di bawah komando Letkol Soeharto. Serangan simbolis yang membuktikan kepada PBB bahwa RI belum mati.",
      en: "The Indonesian National Armed Forces occupied Yogyakarta for 6 hours under the command of Lt. Col. Soeharto. A symbolic attack proving to the UN that Indonesia was not dead.",
    },
    meta: { id: "Eksistensi Militer", en: "Military Existence" },
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Monumen_Serangan_Umum_1_Maret_(1_March_General_Attack_Monument).JPG",
  },
  {
    year: "2012",
    title: { id: "UU Keistimewaan DIY", en: "Special Region Law" },
    desc: {
      id: "UU No. 13 Tahun 2012 mengukuhkan Sultan dan Paku Alam sebagai Gubernur dan Wakil Gubernur seumur hidup — satu-satunya monarki konstitusional diakui negara.",
      en: "Law No. 13 of 2012 confirmed the Sultan and Paku Alam as Governor and Vice Governor for life — the only state-recognized constitutional monarchy.",
    },
    meta: { id: "Era Istimewa", en: "Special Era" },
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tugu_Jogja.jpg",
  },
];

const timeline = computed(() => {
  const l = locale.value as "id" | "en";
  return rawTimeline.map((item) => ({
    ...item,
    displayTitle: item.title[l],
    displayDesc: item.desc[l],
    displayMeta: item.meta[l],
  }));
});

const activeIndex = ref(0);

useHead({
  title: computed(() => t("sejarah.page_title")),
});
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      :category="$t('sejarah.category')"
      :title="$t('sejarah.header_title')"
      :description="$t('sejarah.header_desc')"
    />

    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 mt-10 lg:mt-20"
    >
      <div
        class="relative border-l border-line ml-3 pl-8 flex flex-col gap-12 lg:gap-16"
      >
        <button
          v-for="(item, index) in timeline"
          :key="index"
          @click="activeIndex = index"
          :aria-label="`Lihat detail peristiwa ${item.displayTitle} tahun ${item.year}`"
          v-observe
          class="relative text-left group cursor-pointer reveal-up"
          :style="`transition-delay: ${(index % 5) * 100}ms`"
        >
          <div
            class="absolute -left-[37px] top-2 w-[11px] h-[11px] rounded-full border-2 transition-all duration-300"
            :class="
              activeIndex === index
                ? 'bg-terra border-terra scale-125'
                : 'bg-warm-white border-line group-hover:border-terra'
            "
          ></div>
          <div
            class="font-josefin text-[16px] lg:text-[20px] font-light transition-colors duration-300 mb-1"
            :class="
              activeIndex === index
                ? 'text-terra'
                : 'text-muted group-hover:text-terra/70'
            "
          >
            {{ item.year }}
          </div>
          <h3
            class="font-libre text-[18px] lg:text-[22px] font-bold transition-colors duration-300"
            :class="
              activeIndex === index
                ? 'text-ink'
                : 'text-ink/40 group-hover:text-ink/70'
            "
          >
            {{ item.displayTitle }}
          </h3>
        </button>
      </div>

      <div class="relative h-full w-full">
        <div class="lg:sticky lg:top-[120px] flex flex-col pt-4 pb-20">
          <div :key="activeIndex" class="animate-fade-in">
            <div
              class="h-[240px] md:h-[320px] lg:h-[400px] bg-[#1a1208] relative overflow-hidden mb-8 border border-line shadow-xl"
            >
              <img
                :src="timeline[activeIndex].image"
                :alt="timeline[activeIndex].displayTitle"
                class="w-full h-full object-cover opacity-90"
              />
              <div
                class="absolute bottom-3 right-3 bg-[#1a1208]/80 backdrop-blur-sm px-3 py-1 font-lato text-[9px] text-[#faf7f2]/80 border border-[#faf7f2]/10 uppercase tracking-widest transition-none"
              >
                {{ $t("sejarah.visual_archive") }}
              </div>
            </div>
            <div
              class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-4"
            >
              {{ $t("sejarah.act") }}:
              {{ timeline[activeIndex].displayMeta }}
            </div>
            <h2
              class="font-libre text-[28px] lg:text-[36px] font-bold text-ink leading-[1.2] mb-6"
            >
              {{ timeline[activeIndex].displayTitle }}
            </h2>
            <p
              class="text-[15px] font-light text-brown leading-[1.9] max-w-[500px]"
            >
              {{ timeline[activeIndex].displayDesc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
