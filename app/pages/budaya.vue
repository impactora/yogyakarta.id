<script setup lang="ts">
import { computed } from "vue";
import { useHead, useI18n } from "#imports";

const { t, locale } = useI18n();

const rawCulturalHeritage = [
  {
    id: "batik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Batik_Tulis.jpg",
    category: "Seni Kriya · UNESCO 2009",
    title: { id: "Filosofi Batik Kraton", en: "Kraton Batik Philosophy" },
    subtitle: {
      id: "Doa yang Digoreskan di Atas Lembaran Kain",
      en: "Prayers Etched on Fabric",
    },
    description: {
      id: "Bukan sekadar motif — setiap goresan canting membawa muatan kosmologi Jawa. Motif Parang Rusak dilarang dikenakan rakyat biasa di era Mataram.",
      en: "Not just a motif — every stroke of the canting carries Javanese cosmology. The Parang Rusak motif was forbidden for commoners in the Mataram era.",
    },
    highlights: {
      id: [
        "Motif Larangan Keraton",
        "Teknik Tulis vs Cap",
        "Pewarna Soga Alami",
      ],
      en: [
        "Royal Forbidden Motifs",
        "Hand-Drawn vs Stamped",
        "Natural Soga Dye",
      ],
    },
    reverse: false,
  },
  {
    id: "wayang-kulit",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Wayang_kulit.jpg",
    category: "Seni Pertunjukan · UNESCO 2003",
    title: { id: "Wayang Kulit Purwa", en: "Purwa Shadow Puppets" },
    subtitle: {
      id: "Bayangan yang Lebih Nyata dari Realita",
      en: "Shadows More Real Than Reality",
    },
    description: {
      id: "Lakon berlangsung 8 jam tanpa jeda, dari senja hingga fajar. Dalang adalah satu-satunya seniman dunia yang sekaligus menjadi sutradara, aktor 200 karakter, komposer, dan filsuf.",
      en: "The play lasts 8 hours without a break, from dusk till dawn. The Dalang is the only artist in the world who simultaneously acts as director, actor of 200 characters, composer, and philosopher.",
    },
    highlights: {
      id: [
        "Pakeliran Semalam Suntuk",
        "Gunungan sebagai Aksis Kosmis",
        "Sulukan & Antawecana",
      ],
      en: [
        "All-Night Performance",
        "Gunungan as Cosmic Axis",
        "Vocal Chants & Dialogues",
      ],
    },
    reverse: true,
  },
  {
    id: "gamelan",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gamelan_Jawa.jpg",
    category: "Pusaka Bunyi · UNESCO 2021",
    title: { id: "Gamelan Kraton Yogyakarta", en: "Yogyakarta Kraton Gamelan" },
    subtitle: {
      id: "Demokrasi Suara yang Berusia Sepuluh Abad",
      en: "A Ten-Century-Old Democracy of Sound",
    },
    description: {
      id: "Tidak ada instrumen prima donna dalam gamelan. Dua perangkat gamelan pusaka Kraton, Kyai Gunturmadu dan Kyai Nagawilaga, hanya dimainkan pada upacara Sekaten setiap Maulid Nabi.",
      en: "There is no prima donna instrument in gamelan. The Kraton's two heirloom gamelan sets, Kyai Gunturmadu and Kyai Nagawilaga, are only played during the Sekaten ceremony every Mawlid.",
    },
    highlights: {
      id: [
        "Laras Pélog & Sléndro",
        "Kyai Gunturmadu (Pusaka)",
        "Irama Lancaran hingga Ketawang",
      ],
      en: [
        "Pélog & Sléndro Scales",
        "Kyai Gunturmadu (Heirloom)",
        "Rhythms from Lancaran to Ketawang",
      ],
    },
    reverse: false,
  },
  {
    id: "arsitektur-keraton",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kraton_Yogyakarta.jpg",
    category: "Arsitektur Tradisional",
    title: {
      id: "Tata Ruang Keraton Ngayogyakarta",
      en: "Ngayogyakarta Palace Spatial Layout",
    },
    subtitle: {
      id: "Kota di Dalam Kota yang Dirancang Bersama Semesta",
      en: "A City Within a City Designed with the Universe",
    },
    description: {
      id: "Sumbu filosofi Yogyakarta — Gunung Merapi, Tugu, Keraton, Panggung Krapyak, Pantai Parangtritis — bukan kebetulan geografis. Ini adalah mandala kosmologis yang direncanakan Sultan HB I.",
      en: "Yogyakarta's philosophical axis — Mount Merapi, Tugu, Kraton, Panggung Krapyak, Parangtritis Beach — is no geographical accident. It is a cosmological mandala planned by Sultan HB I.",
    },
    highlights: {
      id: [
        "Sumbu Filosofis 33 km",
        "Bangsal Kencana & Siti Hinggil",
        "Konsep Hamemayu Hayuning Bawana",
      ],
      en: [
        "33 km Philosophical Axis",
        "Golden Pavilion & Siti Hinggil",
        "Hamemayu Hayuning Bawana Concept",
      ],
    },
    reverse: true,
  },
];

const rawFestivals = [
  {
    id: "sekaten",
    name: { id: "Sekaten & Pasar Malam", en: "Sekaten & Night Market" },
    month: { id: "Maulud (Rabiul Awal)", en: "Mawlid (Rabi' al-Awwal)" },
    desc: {
      id: "Perayaan kelahiran Nabi Muhammad SAW yang ditandai dengan dibunyikannya gamelan pusaka selama 7 hari penuh di halaman Masjid Gedhe Kauman, diiringi pasar raya rakyat.",
      en: "A celebration of the Prophet Muhammad's birth marked by the playing of heirloom gamelan for 7 full days in the courtyard of the Great Kauman Mosque, accompanied by a folk market.",
    },
  },
  {
    id: "grebeg",
    name: { id: "Grebeg Syawal & Besar", en: "Grebeg Syawal & Besar" },
    month: { id: "Syawal & Dzulhijjah", en: "Shawwal & Dhu al-Hijjah" },
    desc: {
      id: "Sultan membagikan sedekah bumi berupa 'Gunungan' hasil panen yang diarak oleh prajurit keraton untuk diperebutkan rakyat sebagai wujud berkah (ngalap berkah).",
      en: "The Sultan distributes earth's alms in the form of a 'Gunungan' of harvest yields, paraded by palace guards for the people to fight over as a manifestation of blessing (ngalap berkah).",
    },
  },
  {
    id: "labuhan",
    name: { id: "Labuhan Alit & Ageng", en: "Labuhan Alit & Ageng" },
    month: { id: "Rajab", en: "Rajab" },
    desc: {
      id: "Upacara persembahan Kraton di Pantai Parangtritis, Gunung Merapi, dan Gunung Lawu untuk menjaga keseimbangan spiritual antara manusia, alam, dan Tuhan.",
      en: "A Kraton offering ceremony at Parangtritis Beach, Mount Merapi, and Mount Lawu to maintain spiritual balance between humans, nature, and God.",
    },
  },
];

const culturalHeritage = computed(() => {
  const l = locale.value as "id" | "en";
  return rawCulturalHeritage.map((item) => ({
    ...item,
    displayTitle: item.title[l],
    displaySubtitle: item.subtitle[l],
    displayDescription: item.description[l],
    displayHighlights: item.highlights[l],
  }));
});

const festivals = computed(() => {
  const l = locale.value as "id" | "en";
  return rawFestivals.map((fest) => ({
    ...fest,
    displayName: fest.name[l],
    displayMonth: fest.month[l],
    displayDesc: fest.desc[l],
  }));
});

useHead({
  title: computed(() => t("budaya.page_title")),
});
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      :category="$t('budaya.category')"
      :title="$t('budaya.header_title')"
      :description="$t('budaya.header_desc')"
    />

    <div class="flex flex-col gap-20 lg:gap-32 mt-10">
      <article
        v-for="(item, index) in culturalHeritage"
        :key="item.id"
        v-observe
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center reveal-up"
        :style="`transition-delay: ${index * 100}ms`"
      >
        <div
          class="relative aspect-[4/5] md:aspect-video lg:aspect-[4/5] bg-[#1a1208] group overflow-hidden border border-line"
          :class="item.reverse ? 'lg:order-2' : 'lg:order-1'"
        >
          <img
            :src="item.image"
            :alt="item.displayTitle"
            class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-parchment/5 transition-colors duration-700 group-hover:bg-transparent z-10"
          ></div>
          <div
            class="absolute bottom-4 left-4 z-20 font-josefin text-[8px] tracking-[0.2em] text-[#faf7f2]/80 uppercase bg-[#1a1208]/80 backdrop-blur-sm px-3 py-1 border border-[#faf7f2]/10 transition-none"
          >
            {{ $t("budaya.cultural_archive") }}
          </div>
        </div>
        <div
          class="flex flex-col justify-center"
          :class="item.reverse ? 'lg:order-1' : 'lg:order-2'"
        >
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-5"
          >
            {{ item.category }}
          </div>
          <h2
            class="font-libre text-[32px] lg:text-[44px] font-bold text-ink leading-[1.1] mb-4"
          >
            {{ item.displayTitle }}
          </h2>
          <h3 class="font-libre text-[16px] italic text-muted mb-8">
            {{ item.displaySubtitle }}
          </h3>
          <p
            class="text-[15px] font-light text-brown leading-[1.9] mb-10 max-w-[500px]"
          >
            {{ item.displayDescription }}
          </p>
          <ul class="flex flex-col gap-4 border-l border-line pl-6">
            <li
              v-for="highlight in item.displayHighlights"
              :key="highlight"
              class="font-josefin text-[11px] font-semibold tracking-[0.15em] uppercase text-ink flex items-center gap-4 before:content-[''] before:block before:w-3 before:h-[1px] before:bg-terra"
            >
              {{ highlight }}
            </li>
          </ul>
        </div>
      </article>
    </div>

    <section class="mt-32 pt-24 border-t border-line">
      <div v-observe class="reveal-up text-center mb-16">
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-terra mb-6"
        >
          {{ $t("budaya.ritual_calendar") }}
        </div>
        <h2
          class="font-libre text-[36px] lg:text-[48px] font-bold text-ink mb-6"
        >
          {{ $t("budaya.time_cycle") }}
        </h2>
        <p class="text-[15px] font-light text-brown max-w-[600px] mx-auto">
          {{ $t("budaya.time_cycle_desc") }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
        <article
          v-for="(fest, index) in festivals"
          :key="fest.id"
          v-observe
          class="bg-warm-white border border-line p-8 lg:p-10 reveal-up group hover:border-terra transition-colors duration-300 relative overflow-hidden"
          :style="`transition-delay: ${(index % 3) * 100}ms`"
        >
          <div
            class="absolute top-0 right-0 p-4 font-josefin text-[40px] font-light text-ink/5 group-hover:text-terra/10 transition-colors duration-300"
          >
            0{{ index + 1 }}
          </div>
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-4 flex items-center gap-3"
          >
            <span class="w-2 h-2 rounded-full bg-terra"></span>
            {{ $t("budaya.month_of") }} {{ fest.displayMonth }}
          </div>
          <h3
            class="font-libre text-[22px] lg:text-[26px] font-bold text-ink mb-4"
          >
            {{ fest.displayName }}
          </h3>
          <p class="text-[14px] font-light text-brown leading-[1.8]">
            {{ fest.displayDesc }}
          </p>
        </article>
      </div>
    </section>
  </main>
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
</style>
