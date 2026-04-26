<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef, watch, computed } from "vue";
import { useHead, useI18n } from "#imports";
import { MapPin, Utensils, Landmark } from "lucide-vue-next";

const { locale } = useI18n();

useHead({
  title: computed(() =>
    locale.value === "id"
      ? "Peta Mataram - Jiwa Nusantara"
      : "Mataram Map - Jiwa Nusantara",
  ),
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

const filters = ref({ wisata: true, kuliner: true, budaya: true });
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
    return "#8a735a";
  };

  const l = locale.value as "id" | "en";

  rawPoints.forEach((p) => {
    if (
      (p.category === "wisata" && filters.value.wisata) ||
      (p.category === "kuliner" && filters.value.kuliner) ||
      (p.category === "budaya" && filters.value.budaya)
    ) {
      const svgPin = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${getMarkerColor(p.category)}" stroke="#f6f0e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; drop-shadow(0px 4px 6px rgba(0,0,0,0.3)); transform: translate(-50%, -100%);">
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
          <circle cx="12" cy="10" r="3" fill="#f6f0e5"></circle>
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
        `<div style="font-family: 'Libre Baskerville', serif; font-weight: bold; font-size: 14px; margin-bottom: 4px;">${p.title[l]}</div><div style="font-family: 'Josefin Sans', sans-serif; font-size: 11px; line-height: 1.4;">${p.desc[l]}</div>`,
      );
    }
  });
};

watch(locale, () => renderMap());

const toggleFilter = (cat: "wisata" | "kuliner" | "budaya") => {
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
      :category="locale === 'id' ? 'Peta Kosmologis' : 'Cosmological Map'"
      :title="locale === 'id' ? 'Satu Mataram' : 'One Mataram'"
      :description="
        locale === 'id'
          ? 'Eksplorasi spasial seluruh entitas wisata, kuliner, dan budaya dalam satu kanvas digital interaktif.'
          : 'Spatial exploration of all tourism, culinary, and cultural entities in one interactive digital canvas.'
      "
    />

    <div v-observe class="mb-6 flex flex-wrap gap-4 reveal-up delay-100">
      <button
        @click="toggleFilter('wisata')"
        class="flex items-center gap-2 px-4 py-2 border font-josefin text-[10px] uppercase tracking-widest transition-all"
        :class="
          filters.wisata
            ? 'bg-terra text-white border-terra'
            : 'bg-transparent text-muted border-line hover:border-ink'
        "
      >
        <MapPin class="w-3 h-3" /> {{ locale === "id" ? "Wisata" : "Tourism" }}
      </button>
      <button
        @click="toggleFilter('kuliner')"
        class="flex items-center gap-2 px-4 py-2 border font-josefin text-[10px] uppercase tracking-widest transition-all"
        :class="
          filters.kuliner
            ? 'bg-ink text-white border-ink'
            : 'bg-transparent text-muted border-line hover:border-ink'
        "
      >
        <Utensils class="w-3 h-3" />
        {{ locale === "id" ? "Kuliner" : "Culinary" }}
      </button>
      <button
        @click="toggleFilter('budaya')"
        class="flex items-center gap-2 px-4 py-2 border font-josefin text-[10px] uppercase tracking-widest transition-all"
        :class="
          filters.budaya
            ? 'bg-brown text-white border-brown'
            : 'bg-transparent text-muted border-line hover:border-ink'
        "
      >
        <Landmark class="w-3 h-3" />
        {{ locale === "id" ? "Budaya" : "Culture" }}
      </button>
    </div>

    <div
      v-observe
      class="w-full flex-grow min-h-[60vh] bg-ink border border-line shadow-2xl relative reveal-up delay-200 z-0"
    >
      <div id="unified-map" class="absolute inset-0 z-10"></div>
    </div>
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
  background: #f6f0e5;
  border: 1px solid #1a1208;
}
.leaflet-popup-tip {
  background: #f6f0e5;
  border: 1px solid #1a1208;
}
.custom-map-pin {
  background: transparent !important;
  border: none !important;
}
</style>
