<script setup lang="ts">
import { shallowRef, watch, onMounted, onUnmounted, nextTick } from "vue";
import "maplibre-gl/dist/maplibre-gl.css";

const props = defineProps<{
  activeIndex: number;
}>();

const coordinates: [number, number][] = [
  [110.4457, -7.5407],
  [110.36706, -7.782884],
  [110.3642031, -7.8052845],
  [110.3633, -7.8252],
  [110.332, -8.0244],
];

const pinImages = [
  "/images/wisata/merapi.jpg",
  "/images/sejarah/tugu.jpg",
  "/images/sejarah/keraton.jpg",
  "krapyak.jpg",
  "/images/home/parangtritis.jpg",
];

const mapContainer = ref<HTMLElement | null>(null);
const map = shallowRef<any>(null);

const flyToLocation = (index: number) => {
  if (!map.value) return;
  if (index === -1) {
    map.value.flyTo({
      center: [110.38, -7.78],
      zoom: 10,
      pitch: 45,
      bearing: 0,
      duration: 2500,
      essential: true,
    });
    return;
  }
  map.value.flyTo({
    center: coordinates[index],
    zoom: index === 4 ? 11.5 : 14.5,
    pitch: 65,
    bearing: index * 10 - 15,
    duration: 2500,
    essential: true,
  });
};

watch(
  () => props.activeIndex,
  (newIndex) => {
    flyToLocation(newIndex);
  },
);

onMounted(async () => {
  await nextTick();
  if (!mapContainer.value) return;

  const maplibreModule = await import("maplibre-gl");
  const maplibregl = maplibreModule.default || maplibreModule;

  map.value = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        "raster-tiles": {
          type: "raster",
          tiles: [
            "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: "simple-tiles",
          type: "raster",
          source: "raster-tiles",
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    },
    center: [110.38, -7.78],
    zoom: 10,
    pitch: 45,
    bearing: 0,
    interactive: false,
    dragPan: false,
    scrollZoom: false,
    boxZoom: false,
    dragRotate: false,
    keyboard: false,
    doubleClickZoom: false,
    touchZoomRotate: false,
    maxBounds: [
      [109.5, -8.5],
      [111.5, -7.0],
    ],
  });

  map.value.once("load", () => {
    if (!map.value) return;

    map.value.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      },
    });

    map.value.addLayer({
      id: "route-line",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#b8491f",
        "line-width": 4,
        "line-dasharray": [2, 2],
      },
    });

    coordinates.forEach((coord, i) => {
      const el = document.createElement("div");
      el.className =
        "w-12 h-12 bg-[#faf7f2] rounded-full border-[3px] border-[#b8491f] shadow-xl flex items-center justify-center overflow-hidden";
      el.innerHTML = `<img src="${pinImages[i]}" alt="pin" class="w-full h-full object-cover" onerror="this.src='/images/placeholder.jpg'" />`;
      new maplibregl.Marker({ element: el }).setLngLat(coord).addTo(map.value);
    });
  });
});

onUnmounted(() => {
  if (map.value) map.value.remove();
});
</script>

<template>
  <div class="fixed inset-0 w-full h-full z-0 bg-[#1a1208]">
    <ClientOnly>
      <div
        ref="mapContainer"
        class="absolute inset-0 w-full h-full map-filter"
      ></div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.map-filter {
  filter: sepia(0.5) contrast(1.1) brightness(0.7);
}
</style>
