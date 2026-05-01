<script setup lang="ts">
import {
  ref,
  shallowRef,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
import { useHead, useI18n, useAsyncData } from "#imports";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "maplibre-gl/dist/maplibre-gl.css";

const { locale } = useI18n();

const { data: rawStops } = await useAsyncData("sumbu", () =>
  $fetch<any[]>("/api/data/sumbu"),
);

const stops = computed(() => {
  if (!rawStops.value) return [];
  const l = locale.value as "id" | "en";
  return rawStops.value.map((s: any) => ({
    ...s,
    displayName: s.name[l],
    displaySubtitle: s.subtitle[l],
    displayNarrative: s.narrative[l],
    displayPhilosophy: s.philosophy[l],
    displaySecret: s.secret[l],
  }));
});

const coordinates: [number, number][] = [
  [110.4457, -7.5407],
  [110.36706, -7.782884],
  [110.3642031, -7.8052845],
  [110.3633, -7.8252],
  [110.332, -8.0244],
];

const activeIndex = ref(-1);
const isCardVisible = ref(true);
const activeStop = computed(() =>
  activeIndex.value >= 0 ? stops.value[activeIndex.value] : null,
);
const expandedSection = ref<"philosophy" | "secret" | null>(null);

const mapContainer = ref<HTMLElement | null>(null);
const heroRef = ref<HTMLElement | null>(null);
const textRefs = ref<HTMLElement[]>([]);

const map = shallowRef<any>(null);
let ctx: gsap.Context | null = null;

const setRef = (el: any, index: number) => {
  if (el) textRefs.value[index] = el as HTMLElement;
};

const toggleSection = (section: "philosophy" | "secret") => {
  expandedSection.value = expandedSection.value === section ? null : section;
};

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

const activate = (index: number) => {
  if (activeIndex.value === index) return;
  activeIndex.value = index;
  expandedSection.value = null;
  flyToLocation(index);
};

const navigateTo = (index: number) => {
  if (index === -1 && heroRef.value) {
    heroRef.value.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (textRefs.value[index]) {
    textRefs.value[index].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

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

    const extrusions = {
      type: "FeatureCollection",
      features: coordinates.map((coord, i) => {
        const isKeraton = i === 2;
        const size = isKeraton ? 0.0015 : 0.0004;
        const heights = [800, 120, 40, 100, 20];

        return {
          type: "Feature",
          properties: {
            height: heights[i],
            base: 0,
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [coord[0] - size, coord[1] - size],
                [coord[0] + size, coord[1] - size],
                [coord[0] + size, coord[1] + size],
                [coord[0] - size, coord[1] + size],
                [coord[0] - size, coord[1] - size],
              ],
            ],
          },
        };
      }),
    };

    map.value.addSource("3d-buildings", {
      type: "geojson",
      data: extrusions,
    });

    map.value.addLayer({
      id: "3d-buildings-extrusion",
      type: "fill-extrusion",
      source: "3d-buildings",
      paint: {
        "fill-extrusion-color": "#b8491f",
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": ["get", "base"],
        "fill-extrusion-opacity": 0.85,
      },
    });

    coordinates.forEach((coord) => {
      const el = document.createElement("div");
      el.className =
        "w-3 h-3 bg-[#1a1208] rounded-full border-2 border-[#b8491f] shadow-[0_0_10px_rgba(184,73,31,0.5)]";
      new maplibregl.Marker({ element: el }).setLngLat(coord).addTo(map.value);
    });

    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      if (heroRef.value) {
        ScrollTrigger.create({
          trigger: heroRef.value,
          start: "top bottom",
          end: "bottom 50%",
          onEnter: () => activate(-1),
          onEnterBack: () => activate(-1),
        });
      }

      textRefs.value.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => activate(i),
          onEnterBack: () => activate(i),
        });
      });
    });
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
  if (map.value) map.value.remove();
});

useHead({
  title: computed(() => `Sumbu Filosofis - Jiwa Nusantara`),
  style: [
    {
      innerHTML: "footer { display: none !important; }",
    },
  ],
});
</script>

<template>
  <main class="relative w-full overflow-x-hidden bg-[#1a1208] text-[#faf7f2]">
    <div class="fixed inset-0 w-full h-full z-0 bg-[#1a1208]">
      <ClientOnly>
        <div
          ref="mapContainer"
          class="absolute inset-0 w-full h-full map-filter"
        ></div>
      </ClientOnly>
    </div>

    <div
      class="fixed inset-0 z-10 bg-gradient-to-r from-[#1a1208] via-[#1a1208]/80 to-transparent pointer-events-none"
    ></div>

    <div class="fixed top-[90px] lg:top-24 right-6 z-[60] pointer-events-auto">
      <button
        @click="isCardVisible = !isCardVisible"
        class="bg-[#1a1208]/80 backdrop-blur-md border border-[#faf7f2]/10 p-3 rounded-xl shadow-2xl text-[#b8491f] hover:bg-[#b8491f] hover:text-[#faf7f2] transition-all cursor-pointer"
        :aria-label="isCardVisible ? 'Sembunyikan Panel' : 'Tampilkan Panel'"
      >
        <svg
          v-if="isCardVisible"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path
            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
          />
          <path
            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
          />
          <line x1="2" y1="2" x2="22" y2="22" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </div>

    <div class="relative z-20 w-full pointer-events-none">
      <div ref="heroRef" class="h-[120vh] w-full"></div>
      <div
        v-for="(stop, index) in stops"
        :key="'trigger-' + stop.id"
        :ref="(el) => setRef(el, index)"
        class="h-[150vh] w-full"
      ></div>
      <div class="h-[50vh] w-full"></div>
    </div>

    <div
      class="fixed inset-y-0 left-0 z-50 w-full lg:w-5/12 lg:ml-[5%] flex flex-col justify-end lg:justify-center px-4 sm:px-6 lg:px-12 pb-24 lg:pb-0 pointer-events-none"
    >
      <transition name="fade-slide" mode="out-in">
        <div
          v-if="activeIndex === -1 && isCardVisible"
          key="hero"
          class="pointer-events-auto bg-[#1a1208]/90 backdrop-blur-md border border-[#faf7f2]/10 p-6 lg:p-12 shadow-2xl flex flex-col items-start gap-5 lg:gap-8 max-h-[75vh] lg:max-h-none overflow-y-auto card-scrollbar"
        >
          <div class="flex items-center gap-4 w-full">
            <div class="w-8 lg:w-12 h-[1px] bg-[#b8491f]"></div>
            <span
              class="font-josefin text-[9px] lg:text-[10px] tracking-[0.4em] uppercase text-[#b8491f]"
            >
              {{
                locale === "id"
                  ? "Perjalanan Interaktif"
                  : "Interactive Journey"
              }}
            </span>
          </div>
          <h1
            class="font-libre text-[clamp(28px,4vw,56px)] font-bold leading-[1.05] text-[#faf7f2]"
          >
            {{ locale === "id" ? "Sumbu Filosofis" : "The Philosophical Axis" }}
            <em class="text-[#b8491f] italic block mt-2">Yogyakarta</em>
          </h1>
          <p
            class="font-lato text-[14px] lg:text-[16px] text-[#faf7f2]/70 font-light leading-[1.8]"
          >
            {{
              locale === "id"
                ? "Sebuah garis 33 kilometer yang bukan sekadar jalan. Ia adalah pernyataan kosmologis yang merentang dari api gunung berapi di utara hingga keabadian samudra di selatan."
                : "A 33-kilometer line that is not merely a road. It is a cosmological declaration stretching from volcanic fire in the north to oceanic eternity in the south."
            }}
          </p>
          <div
            class="flex items-center gap-3 lg:gap-4 text-[#faf7f2]/40 font-josefin text-[8px] lg:text-[9px] uppercase tracking-widest flex-wrap"
          >
            <span
              >5 {{ locale === "id" ? "Titik Sakral" : "Sacred Points" }}</span
            >
            <span class="w-1 h-1 rounded-full bg-[#b8491f]"></span>
            <span>33 km</span>
            <span class="w-1 h-1 rounded-full bg-[#b8491f]"></span>
            <span>{{ locale === "id" ? "Sejak 1755" : "Since 1755" }}</span>
          </div>
          <div class="flex items-center gap-3 mt-2 lg:mt-4 text-[#faf7f2]/40">
            <div
              class="w-[1px] h-6 lg:h-8 bg-[#faf7f2]/20 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-full bg-[#b8491f] animate-[scroll_2s_ease-in-out_infinite]"
              ></div>
            </div>
            <span
              class="font-josefin text-[8px] lg:text-[9px] tracking-widest uppercase"
            >
              {{ locale === "id" ? "Scroll ke bawah" : "Scroll down" }}
            </span>
          </div>
        </div>

        <div
          v-else-if="activeStop && isCardVisible"
          :key="activeStop.id"
          class="pointer-events-auto bg-[#1a1208]/90 backdrop-blur-md border border-[#faf7f2]/10 p-6 lg:p-12 shadow-2xl max-h-[75vh] lg:max-h-none overflow-y-auto card-scrollbar"
        >
          <div class="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
            <span
              class="font-josefin text-[9px] lg:text-[10px] tracking-[0.3em] uppercase text-[#b8491f]"
            >
              {{ String(activeIndex + 1).padStart(2, "0") }} /
              {{ String(stops.length).padStart(2, "0") }}
            </span>
            <div class="w-6 lg:w-8 h-[1px] bg-[#b8491f]"></div>
            <span
              class="font-josefin text-[8px] lg:text-[9px] tracking-[0.2em] uppercase text-[#faf7f2]/40"
            >
              {{ activeStop.coordsDisplay }}
            </span>
          </div>

          <div
            class="font-josefin text-[9px] lg:text-[10px] tracking-[0.3em] uppercase text-[#b8491f] mb-3 lg:mb-4"
          >
            {{ activeStop.displaySubtitle }}
          </div>
          <h2
            class="font-libre text-[clamp(24px,3.5vw,48px)] font-bold text-[#faf7f2] leading-[1.1] mb-4 lg:mb-6"
          >
            {{ activeStop.displayName }}
          </h2>
          <div class="flex items-center gap-3 mb-6 lg:mb-8">
            <span
              class="font-josefin text-[8px] lg:text-[9px] tracking-widest uppercase text-[#faf7f2]/40"
            >
              {{ activeStop.elevation }}
            </span>
          </div>
          <p
            class="font-lato text-[14px] lg:text-[16px] text-[#faf7f2]/80 font-light leading-[1.8] lg:leading-[1.9] mb-6 lg:mb-10"
          >
            {{ activeStop.displayNarrative }}
          </p>
          <div class="flex flex-col gap-2 lg:gap-3">
            <button
              @click="toggleSection('philosophy')"
              class="group flex items-center justify-between px-4 lg:px-5 py-3 lg:py-4 border transition-all duration-300 cursor-pointer"
              :class="
                expandedSection === 'philosophy'
                  ? 'border-[#b8491f] bg-[#b8491f]/10 text-[#faf7f2]'
                  : 'border-[#faf7f2]/10 hover:border-[#b8491f]/40 text-[#faf7f2]/60'
              "
            >
              <span
                class="font-josefin text-[9px] lg:text-[10px] tracking-[0.2em] uppercase"
              >
                {{
                  locale === "id" ? "Filosofi & Makna" : "Philosophy & Meaning"
                }}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="transition-transform duration-300 w-3 h-3 lg:w-3.5 lg:h-3.5"
                :class="expandedSection === 'philosophy' ? 'rotate-45' : ''"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <div
              class="overflow-hidden transition-all duration-500"
              :class="
                expandedSection === 'philosophy'
                  ? 'max-h-[600px] opacity-100'
                  : 'max-h-0 opacity-0'
              "
            >
              <div
                class="px-4 lg:px-5 py-4 lg:py-5 border border-t-0 border-[#b8491f]/30 bg-[#b8491f]/5"
              >
                <p
                  class="font-lato text-[13px] lg:text-[14px] text-[#faf7f2]/75 font-light leading-[1.8] lg:leading-[1.9]"
                >
                  {{ activeStop.displayPhilosophy }}
                </p>
              </div>
            </div>
            <button
              @click="toggleSection('secret')"
              class="group flex items-center justify-between px-4 lg:px-5 py-3 lg:py-4 border transition-all duration-300 cursor-pointer"
              :class="
                expandedSection === 'secret'
                  ? 'border-[#c4840a] bg-[#c4840a]/10 text-[#faf7f2]'
                  : 'border-[#faf7f2]/10 hover:border-[#c4840a]/40 text-[#faf7f2]/60'
              "
            >
              <span
                class="font-josefin text-[9px] lg:text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 lg:gap-3"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-[#c4840a] animate-pulse"
                ></span>
                {{ locale === "id" ? "Rahasia Tersembunyi" : "Hidden Secret" }}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="transition-transform duration-300 w-3 h-3 lg:w-3.5 lg:h-3.5"
                :class="expandedSection === 'secret' ? 'rotate-45' : ''"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <div
              class="overflow-hidden transition-all duration-500"
              :class="
                expandedSection === 'secret'
                  ? 'max-h-[600px] opacity-100'
                  : 'max-h-0 opacity-0'
              "
            >
              <div
                class="px-4 lg:px-5 py-4 lg:py-5 border border-t-0 border-[#c4840a]/30 bg-[#c4840a]/5"
              >
                <p
                  class="font-lato text-[13px] lg:text-[14px] text-[#faf7f2]/75 font-light leading-[1.8] lg:leading-[1.9]"
                >
                  {{ activeStop.displaySecret }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-between w-full mt-6 lg:mt-10 pt-4 lg:pt-6 border-t border-[#faf7f2]/10"
          >
            <button
              v-if="activeIndex > 0"
              @click="navigateTo(activeIndex - 1)"
              class="flex items-center gap-2 lg:gap-3 font-josefin text-[9px] lg:text-[10px] tracking-widest uppercase text-[#faf7f2]/40 hover:text-terra transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              {{ locale === "id" ? "Sebelumnya" : "Previous" }}
            </button>
            <button
              v-else-if="activeIndex === 0"
              @click="navigateTo(-1)"
              class="flex items-center gap-2 lg:gap-3 font-josefin text-[9px] lg:text-[10px] tracking-widest uppercase text-[#faf7f2]/40 hover:text-terra transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              {{ locale === "id" ? "Beranda" : "Home" }}
            </button>
            <div v-else></div>

            <button
              v-if="activeIndex < stops.length - 1"
              @click="navigateTo(activeIndex + 1)"
              class="flex items-center gap-2 lg:gap-3 font-josefin text-[9px] lg:text-[10px] tracking-widest uppercase text-[#faf7f2]/60 hover:text-terra transition-colors cursor-pointer"
            >
              {{ locale === "id" ? "Selanjutnya" : "Next" }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
            <div v-else class="flex flex-col items-end gap-2">
              <span
                class="font-josefin text-[9px] lg:text-[10px] tracking-widest uppercase text-[#b8491f]"
              >
                {{
                  locale === "id" ? "Perjalanan Selesai" : "Journey Complete"
                }}
              </span>
              <NuxtLink
                to="/peta"
                class="font-josefin text-[8px] lg:text-[9px] tracking-widest uppercase text-[#faf7f2]/40 hover:text-[#faf7f2] transition-colors underline"
              >
                {{
                  locale === "id"
                    ? "Lihat di Peta Interaktif"
                    : "View on Interactive Map"
                }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 lg:hidden pointer-events-auto"
    >
      <button
        @click="navigateTo(-1)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="
          activeIndex === -1 ? 'bg-[#b8491f] scale-125' : 'bg-[#faf7f2]/20'
        "
      ></button>
      <button
        v-for="(stop, i) in stops"
        :key="stop.id"
        @click="navigateTo(i)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="
          activeIndex === i ? 'bg-[#b8491f] scale-125' : 'bg-[#faf7f2]/20'
        "
      ></button>
    </div>
  </main>
</template>

<style scoped>
@import "maplibre-gl/dist/maplibre-gl.css";

.map-filter {
  filter: sepia(0.5) contrast(1.1) brightness(0.7);
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
@keyframes scroll {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
.card-scrollbar::-webkit-scrollbar {
  display: none;
}
.card-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
