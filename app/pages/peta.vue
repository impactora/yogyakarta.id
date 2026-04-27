<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef, watch, computed } from "vue";
import { useHead, useI18n } from "#imports";
import { MapPin, Utensils, Landmark, BookOpen, Cpu } from "lucide-vue-next";

const { t, locale } = useI18n();

useHead({
  title: computed(() => t("peta.page_title")),
  link: [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css",
      crossorigin: "",
      referrerpolicy: "no-referrer",
    },
  ],
  script: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js",
      crossorigin: "",
      referrerpolicy: "no-referrer",
    },
  ],
});

const filters = ref({
  wisata: true,
  kuliner: true,
  budaya: true,
  sejarah: true,
  teknologi: true,
});

const mapInstance = shallowRef<any>(null);
const markersGroup = shallowRef<any>(null);

const rawPoints = [
  {
    id: "w1",
    category: "wisata",
    lat: -7.752,
    lng: 110.4914,
    title: { id: "Candi Prambanan", en: "Prambanan Temple" },
    desc: {
      id: "Trilogi Candi Hindu abad ke-9.",
      en: "9th-century Hindu temple trilogy.",
    },
  },
  {
    id: "w2",
    category: "wisata",
    lat: -7.8052,
    lng: 110.3642,
    title: { id: "Keraton Yogyakarta", en: "Yogyakarta Palace" },
    desc: {
      id: "Pusat monarki Mataram Islam.",
      en: "Center of the Islamic Mataram monarchy.",
    },
  },
  {
    id: "w3",
    category: "wisata",
    lat: -7.5407,
    lng: 110.4457,
    title: { id: "Gunung Merapi", en: "Mount Merapi" },
    desc: {
      id: "Stratovolcano paling aktif.",
      en: "The most active stratovolcano.",
    },
  },
  {
    id: "w4",
    category: "wisata",
    lat: -7.8099,
    lng: 110.359,
    title: { id: "Taman Sari", en: "Taman Sari" },
    desc: {
      id: "Istana air peninggalan abad ke-18.",
      en: "18th-century water palace ruins.",
    },
  },
  {
    id: "w5",
    category: "wisata",
    lat: -7.595,
    lng: 110.4225,
    title: { id: "Kawasan Kaliurang", en: "Kaliurang Area" },
    desc: {
      id: "Resor pegunungan di lereng Merapi.",
      en: "Mountain resort on Merapi's slopes.",
    },
  },
  {
    id: "w6",
    category: "wisata",
    lat: -7.7621,
    lng: 110.447,
    title: { id: "Candi Sambisari", en: "Sambisari Temple" },
    desc: {
      id: "Candi Hindu di bawah permukaan tanah.",
      en: "Subterranean Hindu temple.",
    },
  },
  {
    id: "w7",
    category: "wisata",
    lat: -8.0205,
    lng: 110.315,
    title: { id: "Pantai Parangtritis", en: "Parangtritis Beach" },
    desc: {
      id: "Kutub selatan sumbu kosmologis.",
      en: "Southern pole of the cosmological axis.",
    },
  },
  {
    id: "w8",
    category: "wisata",
    lat: -7.7926,
    lng: 110.3658,
    title: { id: "Jalan Malioboro", en: "Malioboro Street" },
    desc: {
      id: "Koridor utama jantung kota.",
      en: "The main corridor of the city's heart.",
    },
  },
  {
    id: "k1",
    category: "kuliner",
    lat: -7.8058,
    lng: 110.3664,
    title: { id: "Gudeg Wijilan", en: "Wijilan Gudeg" },
    desc: {
      id: "Sentra legendaris masakan nangka manis.",
      en: "Legendary center for sweet jackfruit dish.",
    },
  },
  {
    id: "k2",
    category: "kuliner",
    lat: -7.8732,
    lng: 110.3846,
    title: { id: "Sate Klathak Pak Pong", en: "Pak Pong Klathak Satay" },
    desc: {
      id: "Sate kambing jeruji sepeda di Bantul.",
      en: "Bicycle-spoke mutton satay in Bantul.",
    },
  },
  {
    id: "k3",
    category: "kuliner",
    lat: -7.8005,
    lng: 110.361,
    title: { id: "Oseng Mercon Bu Narti", en: "Bu Narti's Oseng Mercon" },
    desc: {
      id: "Tumis kikil sapi pedas ekstrem.",
      en: "Extremely spicy beef tendon stir-fry.",
    },
  },
  {
    id: "k4",
    category: "kuliner",
    lat: -7.7981,
    lng: 110.3582,
    title: { id: "Bakpia Pathok 75", en: "Bakpia Pathok 75" },
    desc: {
      id: "Kue kacang hijau akulturasi Tionghoa-Jawa.",
      en: "Chinese-Javanese mung bean pastry.",
    },
  },
  {
    id: "k5",
    category: "kuliner",
    lat: -7.7885,
    lng: 110.366,
    title: { id: "Kopi Joss Lek Man", en: "Lek Man's Joss Coffee" },
    desc: {
      id: "Kopi arang panas khas angkringan.",
      en: "Hot charcoal coffee typical of angkringan.",
    },
  },
  {
    id: "k6",
    category: "kuliner",
    lat: -7.925,
    lng: 110.3888,
    title: { id: "Wedang Uwuh Imogiri", en: "Imogiri Wedang Uwuh" },
    desc: {
      id: "Minuman rempah daun palawija hangat.",
      en: "Warm spice drink with palawija leaves.",
    },
  },
  {
    id: "b1",
    category: "budaya",
    lat: -7.8286,
    lng: 110.3954,
    title: { id: "Kotagede", en: "Kotagede" },
    desc: {
      id: "Bekas ibukota dan pusat pengrajin perak.",
      en: "Former capital and silversmith center.",
    },
  },
  {
    id: "s1",
    category: "sejarah",
    lat: -7.7829,
    lng: 110.367,
    title: { id: "Tugu Yogyakarta", en: "Yogyakarta Monument" },
    desc: {
      id: "Simbol Manunggaling Kawula Gusti.",
      en: "Symbol of Manunggaling Kawula Gusti.",
    },
  },
  {
    id: "s2",
    category: "sejarah",
    lat: -7.868,
    lng: 110.319,
    title: { id: "Goa Selarong", en: "Selarong Cave" },
    desc: {
      id: "Markas gerilya Pangeran Diponegoro.",
      en: "Prince Diponegoro's guerrilla base.",
    },
  },
  {
    id: "s3",
    category: "sejarah",
    lat: -7.8003,
    lng: 110.365,
    title: { id: "Gedung Agung", en: "Gedung Agung" },
    desc: {
      id: "Bekas Istana Kepresidenan RI era revolusi.",
      en: "Former RI Presidential Palace during revolution.",
    },
  },
  {
    id: "s4",
    category: "sejarah",
    lat: -7.8016,
    lng: 110.3648,
    title: { id: "Monumen Serangan Umum", en: "General Attack Monument" },
    desc: {
      id: "Saksi pendudukan 6 jam TNI 1949.",
      en: "Witness of the 6-hour TNI occupation in 1949.",
    },
  },
  {
    id: "t1",
    category: "teknologi",
    lat: -7.767,
    lng: 110.3786,
    title: { id: "Universitas Gadjah Mada", en: "Gadjah Mada University" },
    desc: {
      id: "Pencetak talenta engineer utama nasional.",
      en: "The main national engineering talent creator.",
    },
  },
  {
    id: "t2",
    category: "teknologi",
    lat: -7.7595,
    lng: 110.409,
    title: { id: "Silicon Wali / Block71", en: "Silicon Wali / Block71" },
    desc: {
      id: "Koridor ekosistem inkubator startup digital.",
      en: "Digital startup incubator ecosystem corridor.",
    },
  },
];

const renderMap = () => {
  if (typeof window === "undefined" || !(window as any).L) return;

  if (!mapInstance.value) {
    mapInstance.value = (window as any).L.map("unified-map", {
      zoomControl: false,
    }).setView([-7.7829, 110.367], 11);

    (window as any).L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      },
    ).addTo(mapInstance.value);

    (window as any).L.control
      .zoom({ position: "bottomright" })
      .addTo(mapInstance.value);
    markersGroup.value = (window as any).L.layerGroup().addTo(
      mapInstance.value,
    );
  }

  markersGroup.value.clearLayers();

  const getMarkerColor = (cat: string) => {
    if (cat === "wisata") return "#c84b31";
    if (cat === "kuliner") return "#1a1208";
    if (cat === "budaya") return "#8a7560";
    if (cat === "sejarah") return "#4a3f35";
    if (cat === "teknologi") return "#3b4252";
    return "#8a735a";
  };

  const l = locale.value as "id" | "en";

  rawPoints.forEach((p) => {
    if (filters.value[p.category as keyof typeof filters.value]) {
      const svgPin = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${getMarkerColor(p.category)}" stroke="#faf7f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; drop-shadow(0px 4px 6px rgba(0,0,0,0.3)); transform: translate(-50%, -100%);">
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
          <circle cx="12" cy="10" r="3" fill="#faf7f2"></circle>
        </svg>
      `;

      const customIcon = (window as any).L.divIcon({
        className: "custom-map-pin bg-transparent border-none",
        html: svgPin,
        iconSize: [32, 32],
        iconAnchor: [0, 0],
      });

      const marker = (window as any).L.marker([p.lat, p.lng], {
        icon: customIcon,
      }).addTo(markersGroup.value);

      marker.bindPopup(
        `<div style="font-family: 'Libre Baskerville', serif; font-weight: bold; font-size: 14px; margin-bottom: 4px; color: #1a1208;">${p.title[l]}</div><div style="font-family: 'Josefin Sans', sans-serif; font-size: 11px; line-height: 1.4; color: #4a3f35;">${p.desc[l]}</div>`,
      );
    }
  });
};

watch(locale, () => renderMap());

const toggleFilter = (cat: keyof typeof filters.value) => {
  filters.value[cat] = !filters.value[cat];
  renderMap();
};

onMounted(() => {
  const checkLeaflet = setInterval(() => {
    if ((window as any).L) {
      clearInterval(checkLeaflet);
      renderMap();
    }
  }, 100);
});

onUnmounted(() => {
  if (mapInstance.value) {
    mapInstance.value.remove();
  }
});
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10 flex flex-col"
  >
    <CategoryHeader
      v-observe
      class="reveal-up mb-10"
      :category="$t('peta.category')"
      :title="$t('peta.header_title')"
      :description="$t('peta.header_desc')"
    />

    <div
      v-observe
      class="mb-6 flex flex-wrap gap-4 reveal-up delay-100 print:hidden"
    >
      <button
        @click="toggleFilter('wisata')"
        class="flex items-center gap-2 px-4 py-2 border font-josefin text-[10px] uppercase tracking-widest transition-all"
        :style="
          filters.wisata
            ? 'background-color: #c84b31; color: #faf7f2; border-color: #c84b31;'
            : ''
        "
        :class="
          !filters.wisata
            ? 'bg-transparent text-muted border-line hover:border-ink'
            : ''
        "
      >
        <MapPin class="w-3 h-3" /> {{ $t("peta.filters.wisata") }}
      </button>
      <button
        @click="toggleFilter('kuliner')"
        class="flex items-center gap-2 px-4 py-2 border font-josefin text-[10px] uppercase tracking-widest transition-all"
        :style="
          filters.kuliner
            ? 'background-color: #1a1208; color: #faf7f2; border-color: #1a1208;'
            : ''
        "
        :class="
          !filters.kuliner
            ? 'bg-transparent text-muted border-line hover:border-ink'
            : ''
        "
      >
        <Utensils class="w-3 h-3" /> {{ $t("peta.filters.kuliner") }}
      </button>
      <button
        @click="toggleFilter('budaya')"
        class="flex items-center gap-2 px-4 py-2 border font-josefin text-[10px] uppercase tracking-widest transition-all"
        :style="
          filters.budaya
            ? 'background-color: #8a7560; color: #faf7f2; border-color: #8a7560;'
            : ''
        "
        :class="
          !filters.budaya
            ? 'bg-transparent text-muted border-line hover:border-ink'
            : ''
        "
      >
        <Landmark class="w-3 h-3" /> {{ $t("peta.filters.budaya") }}
      </button>
      <button
        @click="toggleFilter('sejarah')"
        class="flex items-center gap-2 px-4 py-2 border font-josefin text-[10px] uppercase tracking-widest transition-all"
        :style="
          filters.sejarah
            ? 'background-color: #4a3f35; color: #faf7f2; border-color: #4a3f35;'
            : ''
        "
        :class="
          !filters.sejarah
            ? 'bg-transparent text-muted border-line hover:border-ink'
            : ''
        "
      >
        <BookOpen class="w-3 h-3" /> {{ $t("peta.filters.sejarah") }}
      </button>
      <button
        @click="toggleFilter('teknologi')"
        class="flex items-center gap-2 px-4 py-2 border font-josefin text-[10px] uppercase tracking-widest transition-all"
        :style="
          filters.teknologi
            ? 'background-color: #3b4252; color: #faf7f2; border-color: #3b4252;'
            : ''
        "
        :class="
          !filters.teknologi
            ? 'bg-transparent text-muted border-line hover:border-ink'
            : ''
        "
      >
        <Cpu class="w-3 h-3" /> {{ $t("peta.filters.teknologi") }}
      </button>
    </div>

    <div
      v-observe
      class="w-full flex-grow min-h-[60vh] bg-[#1a1208] border border-line shadow-2xl relative reveal-up delay-200 z-0"
    >
      <div id="unified-map" class="absolute inset-0 z-10"></div>
    </div>
    <WeatherTelemetry class="print:hidden" />
  </main>
</template>

<style>
.leaflet-pane {
  z-index: 10 !important;
}
.leaflet-top,
.leaflet-bottom {
  z-index: 10 !important;
}
.leaflet-popup-content-wrapper {
  border-radius: 0;
  background: #faf7f2;
  border: 1px solid #1a1208;
}
.leaflet-popup-tip {
  background: #faf7f2;
  border: 1px solid #1a1208;
}
.custom-map-pin {
  background: transparent !important;
  border: none !important;
}
</style>
