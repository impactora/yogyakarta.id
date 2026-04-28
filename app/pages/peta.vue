<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useHead, useI18n } from "#imports";

const { t, locale } = useI18n();

interface MapLocation {
  id: string;
  name: { id: string; en: string };
  category: "wisata" | "kuliner" | "budaya" | "teknologi";
  coords: [number, number];
  image: string;
}

const locations: MapLocation[] = [
  {
    id: "keraton",
    name: { id: "Keraton Ngayogyakarta", en: "The Palace of Yogyakarta" },
    category: "budaya",
    coords: [-7.8052845, 110.3642031],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kraton_Yogyakarta.jpg/800px-Kraton_Yogyakarta.jpg",
  },
  {
    id: "tugu",
    name: { id: "Tugu Yogyakarta", en: "Tugu Monument" },
    category: "budaya",
    coords: [-7.782884, 110.36706],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Tugu_Yogyakarta.jpg/800px-Tugu_Yogyakarta.jpg",
  },
  {
    id: "prambanan",
    name: { id: "Candi Prambanan", en: "Prambanan Temple" },
    category: "wisata",
    coords: [-7.75202, 110.491467],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Prambanan_Temple%2C_Yogyakarta.jpg/800px-Prambanan_Temple%2C_Yogyakarta.jpg",
  },
  {
    id: "malioboro",
    name: { id: "Jalan Malioboro", en: "Malioboro Street" },
    category: "wisata",
    coords: [-7.792651, 110.365844],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jalan_Malioboro_Yogyakarta.jpg/800px-Jalan_Malioboro_Yogyakarta.jpg",
  },
  {
    id: "wijilan",
    name: { id: "Gudeg Wijilan", en: "Wijilan Gudeg Center" },
    category: "kuliner",
    coords: [-7.804389, 110.366408],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Gudeg_Yogyakarta.jpg/800px-Gudeg_Yogyakarta.jpg",
  },
  {
    id: "tamansari",
    name: { id: "Taman Sari", en: "Taman Sari Water Castle" },
    category: "wisata",
    coords: [-7.81, 110.3585],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Taman_Sari_Yogyakarta.jpg/800px-Taman_Sari_Yogyakarta.jpg",
  },
  {
    id: "merapi",
    name: { id: "Gunung Merapi", en: "Mount Merapi" },
    category: "wisata",
    coords: [-7.5407, 110.4457],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Mount_Merapi_from_Ketep_Pass.jpg/800px-Mount_Merapi_from_Ketep_Pass.jpg",
  },
  {
    id: "parangtritis",
    name: { id: "Pantai Parangtritis", en: "Parangtritis Beach" },
    category: "wisata",
    coords: [-8.0244, 110.332],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Parangtritis_Beach.jpg/800px-Parangtritis_Beach.jpg",
  },
  {
    id: "kotagede",
    name: { id: "Kawasan Kotagede", en: "Kotagede Area" },
    category: "budaya",
    coords: [-7.8286, 110.3956],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kotagede_Mosque.jpg/800px-Kotagede_Mosque.jpg",
  },
  {
    id: "pakpong",
    name: { id: "Sate Klathak Pak Pong", en: "Sate Klathak Pak Pong" },
    category: "kuliner",
    coords: [-7.8732, 110.3808],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Sate_Klatak_Pak_Pong.jpg/800px-Sate_Klatak_Pak_Pong.jpg",
  },
  {
    id: "smartprovince",
    name: { id: "Jogja Smart Province", en: "Jogja Smart Province" },
    category: "teknologi",
    coords: [-7.7981, 110.3888],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Balaikota_Yogyakarta.jpg/800px-Balaikota_Yogyakarta.jpg",
  },
];

const diyBoundary: any = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [110.01, -7.67],
        [110.45, -7.54],
        [110.84, -7.65],
        [110.84, -8.21],
        [110.51, -8.26],
        [110.01, -7.99],
        [110.01, -7.67],
      ],
    ],
  },
};

const philosophicalAxis: [number, number][] = [
  [-7.5407, 110.4457],
  [-7.782884, 110.36706],
  [-7.8052845, 110.3642031],
  [-7.8252, 110.3633],
  [-8.0244, 110.332],
];

const mapContainer = ref<HTMLElement | null>(null);
const INITIAL_VIEW: [number, number] = [-7.7956, 110.3695];
const INITIAL_ZOOM = 10;
const IDLE_TIME = 8000;
let idleTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(async () => {
  if (process.client) {
    const leafletModule = await import("leaflet");
    const L = leafletModule.default || leafletModule;

    await import("leaflet.markercluster");
    await import("leaflet/dist/leaflet.css");
    await import("leaflet.markercluster/dist/MarkerCluster.css");
    await import("leaflet.markercluster/dist/MarkerCluster.Default.css");

    const map = L.map(mapContainer.value!).setView(INITIAL_VIEW, INITIAL_ZOOM);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    ).addTo(map);

    L.geoJSON(diyBoundary, {
      style: {
        color: "#c84b31",
        weight: 3,
        opacity: 0.8,
        fillColor: "#c84b31",
        fillOpacity: 0.1,
      },
    }).addTo(map);

    L.polyline(philosophicalAxis, {
      color: "#c84b31",
      weight: 2,
      opacity: 0.5,
      dashArray: "10, 10",
      lineJoin: "round",
    }).addTo(map);

    const markers = (L as any).markerClusterGroup({
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: (cluster: any) => {
        return L.divIcon({
          html: `<div class="bg-ink text-warm-white w-10 h-10 rounded-full flex items-center justify-center font-josefin text-[12px] border-2 border-terra shadow-xl">${cluster.getChildCount()}</div>`,
          className: "custom-cluster-icon",
          iconSize: L.point(40, 40),
        });
      },
    });

    locations.forEach((loc) => {
      const customIcon = L.divIcon({
        className: "custom-div-icon",
        html: `
          <div class="relative group">
            <div class="w-8 h-8 bg-warm-white border-2 border-ink rounded-lg rotate-45 flex items-center justify-center transition-all duration-300 group-hover:bg-terra group-hover:border-terra group-hover:-translate-y-1 shadow-lg">
              <div class="-rotate-45">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-ink group-hover:text-warm-white transition-colors"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      const popupContent = `
        <div class="w-64 overflow-hidden rounded-xl bg-warm-white font-lato shadow-2xl border border-line">
          <img src="${loc.image}" onerror="this.onerror=null;this.src='/images/placeholder.jpg';" class="h-32 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="${loc.name.id}" />
          <div class="p-4">
            <div class="text-[9px] uppercase tracking-[0.2em] text-terra font-josefin font-bold mb-1">${loc.category}</div>
            <h4 class="text-ink font-libre font-bold text-[16px] mb-2">${locale.value === "en" ? loc.name.en : loc.name.id}</h4>
            <div class="h-[1px] w-8 bg-line mb-3"></div>
            <a href="/${loc.category}" class="block w-full bg-ink text-warm-white py-2 font-josefin text-[10px] text-center uppercase tracking-widest hover:bg-terra transition-colors decoration-none">
              ${locale.value === "en" ? "Explore Details" : "Lihat Detail"}
            </a>
          </div>
        </div>
      `;

      const marker = L.marker(loc.coords, { icon: customIcon }).bindPopup(
        popupContent,
        {
          closeButton: false,
          className: "immersive-popup",
          offset: [0, -20],
        },
      );

      markers.addLayer(marker);
    });

    map.addLayer(markers);

    const startIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        map.flyTo(INITIAL_VIEW, INITIAL_ZOOM, {
          duration: 2,
          easeLinearity: 0.25,
        });
      }, IDLE_TIME);
    };

    map.on("movestart", () => {
      if (idleTimer) clearTimeout(idleTimer);
    });

    map.on("moveend", startIdleTimer);

    startIdleTimer();
  }
});

onUnmounted(() => {
  if (idleTimer) clearTimeout(idleTimer);
});

useHead({
  title: computed(() => t("peta.page_title")),
});
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[160px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10 flex flex-col h-screen"
  >
    <CategoryHeader
      v-observe
      class="reveal-up mb-10"
      :category="$t('peta.category')"
      :title="$t('peta.header_title')"
      :description="$t('peta.header_desc')"
    />

    <div
      class="flex-grow relative rounded-2xl overflow-hidden border border-line shadow-2xl bg-parchment group"
    >
      <div ref="mapContainer" class="absolute inset-0 z-0 map-sepia"></div>

      <div class="absolute top-6 right-6 z-20 flex flex-col gap-3">
        <div
          class="bg-warm-white/90 backdrop-blur-md border border-line p-4 rounded-xl shadow-xl flex flex-col gap-3 max-w-[200px]"
        >
          <div
            class="font-josefin text-[10px] font-bold uppercase tracking-widest text-ink flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-terra animate-pulse"></span>
            {{ $t("peta.legend_title") }}
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <div class="w-3 h-[1px] bg-terra border-dashed border-t"></div>
              <span
                class="text-[10px] text-brown font-light uppercase tracking-tighter"
                >{{ $t("peta.legend_axis") }}</span
              >
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-3 h-3 bg-warm-white border border-ink rotate-45"
              ></div>
              <span
                class="text-[10px] text-brown font-light uppercase tracking-tighter"
                >{{ $t("peta.legend_poi") }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-6 left-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      >
        <div
          class="font-libre text-[48px] text-ink/5 font-bold uppercase select-none tracking-tighter"
        >
          Ngarso Dalem
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.map-sepia .leaflet-tile-pane {
  filter: sepia(0.4) contrast(0.9) brightness(1.05);
}

.immersive-popup .leaflet-popup-content-wrapper {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
}

.immersive-popup .leaflet-popup-tip-container {
  display: none;
}

.immersive-popup .leaflet-popup-content {
  margin: 0 !important;
  width: auto !important;
}

.custom-div-icon {
  background: transparent !important;
  border: none !important;
}

.leaflet-container {
  background: #faf7f2 !important;
}

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
