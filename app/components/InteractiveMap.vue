<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useI18n } from "#imports";

const props = defineProps<{
  mode: "poi" | "internet";
  category: "all" | "wisata" | "kuliner" | "budaya" | "teknologi";
  highlightedTier: string | null;
}>();

const { locale } = useI18n();
const mapContainer = ref<HTMLElement | null>(null);

const locations = [
  {
    id: "keraton",
    name: { id: "Keraton Ngayogyakarta", en: "The Palace of Yogyakarta" },
    category: "budaya",
    regionId: "kota",
    coords: [-7.8052845, 110.3642031],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kraton_Yogyakarta.jpg/800px-Kraton_Yogyakarta.jpg",
  },
  {
    id: "tugu",
    name: { id: "Tugu Yogyakarta", en: "Tugu Monument" },
    category: "budaya",
    regionId: "kota",
    coords: [-7.782884, 110.36706],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Tugu_Yogyakarta.jpg/800px-Tugu_Yogyakarta.jpg",
  },
  {
    id: "prambanan",
    name: { id: "Candi Prambanan", en: "Prambanan Temple" },
    category: "wisata",
    regionId: "sleman",
    coords: [-7.75202, 110.491467],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Prambanan_Temple%2C_Yogyakarta.jpg/800px-Prambanan_Temple%2C_Yogyakarta.jpg",
  },
  {
    id: "malioboro",
    name: { id: "Jalan Malioboro", en: "Malioboro Street" },
    category: "wisata",
    regionId: "kota",
    coords: [-7.792651, 110.365844],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jalan_Malioboro_Yogyakarta.jpg/800px-Jalan_Malioboro_Yogyakarta.jpg",
  },
  {
    id: "wijilan",
    name: { id: "Gudeg Wijilan", en: "Wijilan Gudeg Center" },
    category: "kuliner",
    regionId: "kota",
    coords: [-7.804389, 110.366408],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Gudeg_Yogyakarta.jpg/800px-Gudeg_Yogyakarta.jpg",
  },
  {
    id: "tamansari",
    name: { id: "Taman Sari", en: "Taman Sari Water Castle" },
    category: "wisata",
    regionId: "kota",
    coords: [-7.81, 110.3585],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Taman_Sari_Yogyakarta.jpg/800px-Taman_Sari_Yogyakarta.jpg",
  },
  {
    id: "merapi",
    name: { id: "Gunung Merapi", en: "Mount Merapi" },
    category: "wisata",
    regionId: "sleman",
    coords: [-7.5407, 110.4457],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Mount_Merapi_from_Ketep_Pass.jpg/800px-Mount_Merapi_from_Ketep_Pass.jpg",
  },
  {
    id: "parangtritis",
    name: { id: "Pantai Parangtritis", en: "Parangtritis Beach" },
    category: "wisata",
    regionId: "bantul",
    coords: [-8.0244, 110.332],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Parangtritis_Beach.jpg/800px-Parangtritis_Beach.jpg",
  },
  {
    id: "kotagede",
    name: { id: "Kawasan Kotagede", en: "Kotagede Area" },
    category: "budaya",
    regionId: "kota",
    coords: [-7.8286, 110.3956],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kotagede_Mosque.jpg/800px-Kotagede_Mosque.jpg",
  },
  {
    id: "pakpong",
    name: { id: "Sate Klathak Pak Pong", en: "Sate Klathak Pak Pong" },
    category: "kuliner",
    regionId: "bantul",
    coords: [-7.8732, 110.3808],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Sate_Klatak_Pak_Pong.jpg/800px-Sate_Klatak_Pak_Pong.jpg",
  },
  {
    id: "smartprovince",
    name: { id: "Jogja Smart Province", en: "Jogja Smart Province" },
    category: "teknologi",
    regionId: "kota",
    coords: [-7.7981, 110.3888],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Balaikota_Yogyakarta.jpg/800px-Balaikota_Yogyakarta.jpg",
  },
];

const internetData = [
  {
    name: "Kota Yogyakarta",
    coords: [-7.8014, 110.3646],
    penetration: 92,
    tier: "high",
  },
  {
    name: "Kabupaten Sleman",
    coords: [-7.6833, 110.3333],
    penetration: 89,
    tier: "mid",
  },
  {
    name: "Kabupaten Bantul",
    coords: [-7.8833, 110.3333],
    penetration: 85,
    tier: "mid",
  },
  {
    name: "Kabupaten Kulon Progo",
    coords: [-7.8282, 110.1585],
    penetration: 78,
    tier: "low",
  },
  {
    name: "Kabupaten Gunungkidul",
    coords: [-7.9945, 110.6054],
    penetration: 74,
    tier: "low",
  },
];

const diyBoundary = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [110.01, -7.67],
        [110.25, -7.6],
        [110.45, -7.54],
        [110.84, -7.65],
        [110.84, -8.21],
        [110.51, -8.26],
        [110.25, -8.05],
        [110.01, -7.99],
        [110.01, -7.67],
      ],
    ],
  },
};

const diyRegionsGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { id: "kota", name: "Kota Yogyakarta" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [110.35, -7.78],
            [110.4, -7.78],
            [110.4, -7.83],
            [110.35, -7.83],
            [110.35, -7.78],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: "sleman", name: "Kabupaten Sleman" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [110.25, -7.6],
            [110.45, -7.54],
            [110.5, -7.83],
            [110.4, -7.83],
            [110.4, -7.78],
            [110.35, -7.78],
            [110.35, -7.83],
            [110.25, -7.83],
            [110.25, -7.6],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: "bantul", name: "Kabupaten Bantul" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [110.25, -7.83],
            [110.35, -7.83],
            [110.4, -7.83],
            [110.5, -7.83],
            [110.51, -8.26],
            [110.25, -8.05],
            [110.25, -7.83],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: "kulonprogo", name: "Kabupaten Kulon Progo" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [110.01, -7.67],
            [110.25, -7.6],
            [110.25, -7.83],
            [110.25, -8.05],
            [110.01, -7.99],
            [110.01, -7.67],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: "gunungkidul", name: "Kabupaten Gunungkidul" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [110.5, -7.83],
            [110.45, -7.54],
            [110.84, -7.65],
            [110.84, -8.21],
            [110.51, -8.26],
            [110.5, -7.83],
          ],
        ],
      },
    },
  ],
};

const philosophicalAxis: [number, number][] = [
  [-7.5407, 110.4457],
  [-7.782884, 110.36706],
  [-7.8052845, 110.3642031],
  [-7.8252, 110.3633],
  [-8.0244, 110.332],
];

let mapInstance: any = null;
let markersGroup: any = null;
let axisLayer: any = null;
let diyBoundaryLayer: any = null;
let regionsLayer: any = null;
let internetCircles: any[] = [];
let L: any = null;
let debounceTimer: any = null;

const activeRegion = ref<string | null>(null);
const hoveredRegion = ref<string | null>(null);

const updateRegionStyles = () => {
  if (!regionsLayer) return;
  regionsLayer.eachLayer((layer: any) => {
    const id = layer.feature.properties.id;
    const isActive = activeRegion.value === id;
    const isHovered = hoveredRegion.value === id;

    layer.setStyle({
      color: "#c84b31",
      weight: isActive ? 2 : isHovered ? 1 : 0,
      opacity: isActive ? 0.8 : isHovered ? 0.5 : 0,
      fillColor: "#c84b31",
      fillOpacity: isActive ? 0.25 : isHovered ? 0.1 : 0.0,
      className: "region-polygon",
    });

    const tooltip = layer.getTooltip();
    if (tooltip && tooltip._container) {
      if (isActive || isHovered) {
        tooltip._container.classList.add("active");
        tooltip._container.classList.remove("inactive");
      } else {
        tooltip._container.classList.add("inactive");
        tooltip._container.classList.remove("active");
      }
    }
  });
  renderMarkers();
};

const resetDebounce = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    activeRegion.value = null;
    updateRegionStyles();
  }, 60000);
};

const renderMarkers = () => {
  if (!markersGroup || !L) return;
  markersGroup.clearLayers();

  const filteredLocations = locations.filter((loc) => {
    const catMatch =
      props.category === "all" || loc.category === props.category;
    const regMatch = !activeRegion.value || loc.regionId === activeRegion.value;
    return catMatch && regMatch;
  });

  filteredLocations.forEach((loc) => {
    const customIcon = L.divIcon({
      className: "custom-div-icon",
      html: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#c84b31" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.3)); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="#faf7f2" stroke-width="1"/></svg>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const popupContent = `<div class="w-64 rounded-xl bg-warm-white overflow-hidden shadow-2xl border border-line"><img src="${loc.image}" class="h-32 w-full object-cover grayscale" /><div class="p-4"><div class="text-[9px] uppercase tracking-widest text-terra font-bold mb-1">${loc.category}</div><h4 class="text-ink font-libre font-bold text-[16px] mb-2">${locale.value === "en" ? loc.name.en : loc.name.id}</h4><a href="/${loc.category}" class="block w-full bg-ink text-warm-white py-2 font-josefin text-[10px] text-center uppercase tracking-widest hover:bg-terra transition-colors decoration-none">${locale.value === "en" ? "Explore Details" : "Lihat Detail"}</a></div></div>`;
    markersGroup.addLayer(
      L.marker(loc.coords, { icon: customIcon }).bindPopup(popupContent, {
        closeButton: false,
        className: "immersive-popup",
        offset: [0, -30],
      }),
    );
  });
};

onMounted(async () => {
  if (process.client) {
    const leafletModule = await import("leaflet");
    L = leafletModule.default || leafletModule;
    await import("leaflet.markercluster");
    await import("leaflet/dist/leaflet.css");
    await import("leaflet.markercluster/dist/MarkerCluster.css");
    await import("leaflet.markercluster/dist/MarkerCluster.Default.css");

    mapInstance = L.map(mapContainer.value!).setView([-7.7956, 110.3695], 10);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      { attribution: "&copy; CARTO" },
    ).addTo(mapInstance);

    diyBoundaryLayer = L.geoJSON(diyBoundary, {
      style: {
        color: "#c84b31",
        weight: 2,
        opacity: 0.3,
        fillColor: "#c84b31",
        fillOpacity: 0.05,
      },
      interactive: false,
    }).addTo(mapInstance);

    regionsLayer = L.geoJSON(diyRegionsGeoJSON as any, {
      onEachFeature: (feature: any, layer: any) => {
        const name = feature.properties.name
          .replace("Kabupaten ", "")
          .replace("Kota ", "");
        layer.bindTooltip(name, {
          permanent: true,
          direction: "center",
          className: "region-polygon-label inactive",
        });

        layer.on({
          mouseover: () => {
            hoveredRegion.value = feature.properties.id;
            updateRegionStyles();
          },
          mouseout: () => {
            hoveredRegion.value = null;
            updateRegionStyles();
          },
          click: () => {
            if (activeRegion.value === feature.properties.id) {
              activeRegion.value = null;
              if (debounceTimer) clearTimeout(debounceTimer);
            } else {
              activeRegion.value = feature.properties.id;
              resetDebounce();
            }
            updateRegionStyles();
          },
        });
      },
    });

    updateRegionStyles();

    axisLayer = L.polyline(philosophicalAxis, {
      color: "#c84b31",
      weight: 2,
      opacity: 0.5,
      dashArray: "10, 10",
      interactive: false,
    });

    markersGroup = (L as any).markerClusterGroup({
      showCoverageOnHover: false,
      iconCreateFunction: (cluster: any) =>
        L.divIcon({
          html: `<div class="bg-ink text-warm-white w-10 h-10 rounded-full flex items-center justify-center font-josefin text-[12px] border-2 border-terra shadow-xl">${cluster.getChildCount()}</div>`,
          className: "custom-cluster-icon",
          iconSize: [40, 40],
        }),
    });

    if (props.mode === "poi") {
      regionsLayer.addTo(mapInstance);
      axisLayer.addTo(mapInstance);
      mapInstance.addLayer(markersGroup);
      renderMarkers();
    }

    internetData.forEach((data) => {
      const color =
        data.tier === "high"
          ? "#1a1208"
          : data.tier === "mid"
            ? "#c84b31"
            : "#a38b72";
      const circle = L.circle(data.coords as [number, number], {
        color,
        fillColor: color,
        fillOpacity: 0.6,
        radius: data.penetration * 130,
        weight: 1,
        className: `internet-circle tier-${data.tier}`,
      });
      circle.bindTooltip(
        `<div class="font-lato bg-ink text-warm-white p-3 rounded-lg shadow-xl"><div class="text-[10px] uppercase text-terra mb-1">${data.name}</div><div class="text-[20px] font-bold">${data.penetration}%</div></div>`,
        { direction: "top", className: "internet-tooltip", opacity: 1 },
      );
      circle.tier = data.tier;
      internetCircles.push(circle);
    });

    if (props.mode === "internet") {
      internetCircles.forEach((c) => c.addTo(mapInstance));
    }
  }
});

watch(
  () => props.mode,
  (mode) => {
    if (!mapInstance) return;
    if (mode === "poi") {
      internetCircles.forEach((c) => mapInstance.removeLayer(c));
      mapInstance.addLayer(regionsLayer);
      mapInstance.addLayer(axisLayer);
      mapInstance.addLayer(markersGroup);
      renderMarkers();
    } else {
      mapInstance.removeLayer(markersGroup);
      mapInstance.removeLayer(axisLayer);
      mapInstance.removeLayer(regionsLayer);
      internetCircles.forEach((c) => c.addTo(mapInstance));
    }
  },
);

watch(
  () => props.category,
  () => {
    if (props.mode === "poi") renderMarkers();
  },
);

watch(
  () => props.highlightedTier,
  (tier) => {
    if (props.mode !== "internet") return;
    internetCircles.forEach((circle) => {
      const el = circle.getElement();
      if (!el) return;
      if (!tier || circle.tier === tier) {
        el.style.opacity = "1";
        el.style.filter = tier ? "drop-shadow(0 0 10px currentColor)" : "none";
      } else {
        el.style.opacity = "0.15";
        el.style.filter = "none";
      }
    });
  },
);

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});
</script>

<template>
  <div ref="mapContainer" class="absolute inset-0 z-0 map-sepia"></div>
</template>

<style>
.map-sepia .leaflet-tile-pane {
  filter: sepia(0.3) contrast(0.95) brightness(1.02);
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
.internet-circle {
  transition:
    opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.5s ease;
  pointer-events: auto;
}
.internet-tooltip {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
.internet-tooltip::before {
  display: none !important;
}
.leaflet-container {
  background: #faf7f2 !important;
}

.region-polygon {
  transition:
    fill-opacity 0.3s ease,
    opacity 0.3s ease,
    stroke-width 0.3s ease;
  outline: none;
}

.region-polygon-label {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: #1a1208;
  font-family: "Josefin Sans", sans-serif;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  text-shadow:
    2px 2px 0px #faf7f2,
    -2px -2px 0px #faf7f2,
    2px -2px 0px #faf7f2,
    -2px 2px 0px #faf7f2;
  transition:
    opacity 0.3s ease,
    font-size 0.3s ease;
  pointer-events: none;
}
.region-polygon-label::before {
  display: none !important;
}
.region-polygon-label.inactive {
  opacity: 0.3;
}
.region-polygon-label.active {
  opacity: 1;
  font-size: 14px;
  z-index: 1000 !important;
}
</style>
