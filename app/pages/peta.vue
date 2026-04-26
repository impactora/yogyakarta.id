<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from "vue";
import { useHead } from "#imports";
import { Map, MapPin, Utensils, Landmark } from "lucide-vue-next";

useHead({
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

const points = [
  {
    id: "w1",
    category: "wisata",
    title: "Candi Prambanan",
    lat: -7.752,
    lng: 110.4914,
    desc: "Trilogi Candi Hindu abad ke-9.",
  },
  {
    id: "w2",
    category: "wisata",
    title: "Keraton Yogyakarta",
    lat: -7.8052,
    lng: 110.3642,
    desc: "Pusat monarki Mataram Islam.",
  },
  {
    id: "w3",
    category: "wisata",
    title: "Gunung Merapi",
    lat: -7.5407,
    lng: 110.4457,
    desc: "Stratovolcano paling aktif.",
  },
  {
    id: "k1",
    category: "kuliner",
    title: "Gudeg Wijilan",
    lat: -7.8058,
    lng: 110.3664,
    desc: "Sentra legendaris masakan nangka manis.",
  },
  {
    id: "k2",
    category: "kuliner",
    title: "Sate Klathak Pak Pong",
    lat: -7.8732,
    lng: 110.3846,
    desc: "Sate kambing jeruji sepeda di Bantul.",
  },
  {
    id: "b1",
    category: "budaya",
    title: "Kotagede",
    lat: -7.8286,
    lng: 110.3954,
    desc: "Bekas ibukota dan pusat pengrajin perak.",
  },
];

const renderMap = () => {
  if (typeof window === "undefined" || !window.L) return;

  if (!mapInstance.value) {
    mapInstance.value = window.L.map("unified-map", {
      zoomControl: false,
    }).setView([-7.7829, 110.367], 11);

    window.L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      },
    ).addTo(mapInstance.value);

    window.L.control.zoom({ position: "bottomright" }).addTo(mapInstance.value);
    markersGroup.value = window.L.layerGroup().addTo(mapInstance.value);
  }

  markersGroup.value.clearLayers();

  const getMarkerColor = (cat: string) => {
    if (cat === "wisata") return "#c84b31";
    if (cat === "kuliner") return "#1a1208";
    return "#8a735a";
  };

  points.forEach((p) => {
    if (
      (p.category === "wisata" && filters.value.wisata) ||
      (p.category === "kuliner" && filters.value.kuliner) ||
      (p.category === "budaya" && filters.value.budaya)
    ) {
      const customIcon = window.L.divIcon({
        className: "custom-map-pin",
        html: `<div style="background-color: ${getMarkerColor(p.category)}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = window.L.marker([p.lat, p.lng], {
        icon: customIcon,
      }).addTo(markersGroup.value);
      marker.bindPopup(
        `<div style="font-family: 'Libre Baskerville', serif; font-weight: bold;">${p.title}</div><div style="font-family: 'Josefin Sans', sans-serif; font-size: 11px; margin-top: 4px;">${p.desc}</div>`,
      );
    }
  });
};

const toggleFilter = (cat: "wisata" | "kuliner" | "budaya") => {
  filters.value[cat] = !filters.value[cat];
  renderMap();
};

onMounted(() => {
  const checkLeaflet = setInterval(() => {
    if (window.L) {
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
      category="Peta Kosmologis"
      title="Satu Mataram"
      description="Eksplorasi spasial seluruh entitas wisata, kuliner, dan budaya dalam satu kanvas digital interaktif."
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
        <MapPin class="w-3 h-3" /> Wisata
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
        <Utensils class="w-3 h-3" /> Kuliner
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
        <Landmark class="w-3 h-3" /> Budaya
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
</style>
