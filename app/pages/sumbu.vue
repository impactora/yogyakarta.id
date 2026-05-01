<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useHead, useI18n } from "#imports";

const { t, locale } = useI18n();

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
    displayDistance:
      l === "id" ? s.distanceFromKeraton : s.distanceFromKeratonEn,
  }));
});

const activeIndex = ref(0);
const expandedSection = ref<"philosophy" | "secret" | null>(null);
const progressPercent = ref(0);
const journeyStarted = ref(false);
const sectionRefs = ref<HTMLElement[]>([]);
const containerRef = ref<HTMLElement | null>(null);

const activeStop = computed(() => stops.value[activeIndex.value] ?? null);

const totalDistance = 55;
const distanceMarkers = computed(() => {
  if (!stops.value.length) return [];
  return [0, 14, 27.5, 29.5, 55];
});

const setSection = (el: HTMLElement | null, index: number) => {
  if (el) sectionRefs.value[index] = el;
};

const handleScroll = () => {
  if (!containerRef.value) return;
  const container = containerRef.value;
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight - container.clientHeight;
  if (scrollHeight <= 0) return;

  progressPercent.value = Math.min(100, (scrollTop / scrollHeight) * 100);

  const stopCount = stops.value.length;
  const segmentSize = scrollHeight / stopCount;
  const newIndex = Math.min(stopCount - 1, Math.floor(scrollTop / segmentSize));

  if (newIndex !== activeIndex.value) {
    activeIndex.value = newIndex;
    expandedSection.value = null;
  }
};

const navigateTo = (index: number) => {
  if (!containerRef.value || !sectionRefs.value[index]) return;
  sectionRefs.value[index].scrollIntoView({ behavior: "smooth" });
};

const toggleSection = (section: "philosophy" | "secret") => {
  expandedSection.value = expandedSection.value === section ? null : section;
};

const startJourney = () => {
  journeyStarted.value = true;
};

watch(journeyStarted, (val) => {
  if (val && containerRef.value) {
    containerRef.value.addEventListener("scroll", handleScroll, {
      passive: true,
    });
  }
});

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener("scroll", handleScroll);
  }
});

useHead({ title: computed(() => `Sumbu Filosofis — Jiwa Nusantara`) });
</script>

<template>
  <main class="min-h-screen bg-[#1a1208] text-[#faf7f2] overflow-hidden">
    <div
      v-if="!journeyStarted"
      class="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[url('/images/wisata/merapi.jpg')] bg-cover bg-center opacity-20 grayscale"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#1a1208]/60 via-[#1a1208]/40 to-[#1a1208]"
      ></div>

      <div
        class="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-10"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-[1px] bg-terra"></div>
          <span
            class="font-josefin text-[10px] tracking-[0.4em] uppercase text-terra"
          >
            {{
              locale === "id" ? "Perjalanan Interaktif" : "Interactive Journey"
            }}
          </span>
          <div class="w-12 h-[1px] bg-terra"></div>
        </div>

        <h1
          class="font-libre text-[clamp(40px,6vw,80px)] font-bold leading-[1.05] text-[#faf7f2]"
        >
          {{ locale === "id" ? "Sumbu Filosofis" : "The Philosophical Axis" }}
          <em class="text-terra italic block">Yogyakarta</em>
        </h1>

        <p
          class="font-lato text-[16px] lg:text-[18px] text-[#faf7f2]/70 font-light leading-[1.8] max-w-xl"
        >
          {{
            locale === "id"
              ? "Sebuah garis 33 kilometer yang bukan sekadar jalan. Ia adalah pernyataan kosmologis yang merentang dari api gunung berapi di utara hingga keabadian samudra di selatan."
              : "A 33-kilometer line that is not merely a road. It is a cosmological declaration stretching from volcanic fire in the north to oceanic eternity in the south."
          }}
        </p>

        <div
          class="flex items-center gap-6 text-[#faf7f2]/40 font-josefin text-[10px] uppercase tracking-widest"
        >
          <span
            >5 {{ locale === "id" ? "Titik Sakral" : "Sacred Points" }}</span
          >
          <span class="w-1 h-1 rounded-full bg-terra"></span>
          <span>33 km</span>
          <span class="w-1 h-1 rounded-full bg-terra"></span>
          <span>{{ locale === "id" ? "Sejak 1755" : "Since 1755" }}</span>
        </div>

        <button
          @click="startJourney"
          class="group mt-4 relative overflow-hidden border border-terra px-12 py-5 font-josefin text-[11px] font-bold tracking-[0.3em] uppercase text-terra hover:text-[#1a1208] transition-colors duration-500"
        >
          <span
            class="absolute inset-0 bg-terra translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          ></span>
          <span class="relative">
            {{ locale === "id" ? "Mulai Perjalanan" : "Begin the Journey" }}
          </span>
        </button>

        <div class="flex flex-col items-center gap-3 mt-8 text-[#faf7f2]/30">
          <span class="font-josefin text-[9px] tracking-widest uppercase">
            {{
              locale === "id" ? "Scroll untuk menjelajah" : "Scroll to explore"
            }}
          </span>
          <div class="w-[1px] h-10 bg-[#faf7f2]/20 relative overflow-hidden">
            <div
              class="absolute top-0 left-0 w-full h-full bg-terra animate-[scroll_2s_ease-in-out_infinite]"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="h-screen flex overflow-hidden">
      <div
        class="hidden lg:flex flex-col items-center w-[80px] flex-shrink-0 py-12 px-0 relative border-r border-[#faf7f2]/10"
      >
        <div
          class="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[1px] bg-[#faf7f2]/10"
        ></div>
        <div
          class="absolute top-12 left-1/2 -translate-x-1/2 w-[1px] bg-terra transition-all duration-700 origin-top"
          :style="{ height: `calc((100% - 96px) * ${progressPercent / 100})` }"
        ></div>

        <button
          v-for="(stop, i) in stops"
          :key="stop.id"
          @click="navigateTo(i)"
          class="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
          :style="{
            marginTop: i === 0 ? '0' : 'auto',
            marginBottom: i === stops.length - 1 ? '0' : 'auto',
          }"
        >
          <div
            class="w-3 h-3 rounded-full border-2 transition-all duration-300"
            :class="
              activeIndex === i
                ? 'border-terra bg-terra scale-125'
                : activeIndex > i
                  ? 'border-terra bg-terra/40'
                  : 'border-[#faf7f2]/20 bg-transparent group-hover:border-terra/60'
            "
          ></div>
        </button>
      </div>

      <div
        ref="containerRef"
        class="flex-1 overflow-y-scroll scroll-smooth"
        style="scroll-snap-type: y mandatory"
      >
        <div
          v-for="(stop, index) in stops"
          :key="stop.id"
          :ref="(el) => setSection(el as HTMLElement, index)"
          class="relative min-h-screen flex flex-col lg:flex-row"
          style="scroll-snap-align: start"
        >
          <div
            class="lg:w-1/2 relative overflow-hidden"
            style="min-height: 40vh"
          >
            <div
              class="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms]"
              :class="activeIndex === index ? 'scale-100' : 'scale-110'"
              :style="{ backgroundImage: `url(${stop.image})` }"
            ></div>
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#1a1208]/60 via-transparent to-[#1a1208] lg:via-transparent lg:to-[#1a1208]"
            ></div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#1a1208]/80 via-[#1a1208]/20 to-transparent lg:hidden"
            ></div>

            <div class="absolute top-6 left-6 flex flex-col gap-1">
              <span
                class="font-josefin text-[9px] tracking-[0.3em] uppercase text-terra/80"
              >
                {{ String(index + 1).padStart(2, "0") }} /
                {{ String(stops.length).padStart(2, "0") }}
              </span>
              <span
                class="font-josefin text-[9px] tracking-[0.2em] uppercase text-[#faf7f2]/40"
              >
                {{ stop.coordsDisplay }}
              </span>
            </div>

            <div class="absolute bottom-6 left-6 right-6 hidden lg:block">
              <div
                class="font-josefin text-[9px] tracking-widest uppercase text-[#faf7f2]/40 mb-2"
              >
                {{
                  locale === "id"
                    ? "Jarak dari Keraton"
                    : "Distance from Keraton"
                }}
              </div>
              <div class="font-libre text-[16px] text-[#faf7f2]/70 italic">
                {{ stop.displayDistance }}
              </div>
            </div>
          </div>

          <div
            class="lg:w-1/2 flex flex-col justify-center px-8 lg:px-12 py-12 lg:py-16 relative"
          >
            <div
              class="transition-all duration-700"
              :class="
                activeIndex === index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              "
            >
              <div
                class="font-josefin text-[10px] tracking-[0.3em] uppercase text-terra mb-4"
              >
                {{ stop.displaySubtitle }}
              </div>

              <h2
                class="font-libre text-[clamp(28px,3.5vw,48px)] font-bold text-[#faf7f2] leading-[1.1] mb-6"
              >
                {{ stop.displayName }}
              </h2>

              <div class="flex items-center gap-3 mb-8">
                <div class="w-8 h-[1px] bg-terra"></div>
                <span
                  class="font-josefin text-[9px] tracking-widest uppercase text-[#faf7f2]/40"
                >
                  {{ stop.elevation }}
                </span>
              </div>

              <p
                class="font-lato text-[15px] lg:text-[16px] text-[#faf7f2]/80 font-light leading-[1.9] mb-10 max-w-lg"
              >
                {{ stop.displayNarrative }}
              </p>

              <div class="flex flex-col gap-3">
                <button
                  @click="toggleSection('philosophy')"
                  class="group flex items-center justify-between px-5 py-4 border transition-all duration-300"
                  :class="
                    expandedSection === 'philosophy'
                      ? 'border-terra bg-terra/10 text-[#faf7f2]'
                      : 'border-[#faf7f2]/10 hover:border-terra/40 text-[#faf7f2]/60'
                  "
                >
                  <span
                    class="font-josefin text-[10px] tracking-[0.2em] uppercase"
                  >
                    {{
                      locale === "id"
                        ? "Filosofi & Makna"
                        : "Philosophy & Meaning"
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
                    class="transition-transform duration-300"
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
                      ? 'max-h-[400px] opacity-100'
                      : 'max-h-0 opacity-0'
                  "
                >
                  <div
                    class="px-5 py-5 border border-t-0 border-terra/30 bg-terra/5"
                  >
                    <p
                      class="font-lato text-[14px] text-[#faf7f2]/75 font-light leading-[1.9]"
                    >
                      {{ stop.displayPhilosophy }}
                    </p>
                  </div>
                </div>

                <button
                  @click="toggleSection('secret')"
                  class="group flex items-center justify-between px-5 py-4 border transition-all duration-300"
                  :class="
                    expandedSection === 'secret'
                      ? 'border-[#c4840a] bg-[#c4840a]/10 text-[#faf7f2]'
                      : 'border-[#faf7f2]/10 hover:border-[#c4840a]/40 text-[#faf7f2]/60'
                  "
                >
                  <span
                    class="font-josefin text-[10px] tracking-[0.2em] uppercase flex items-center gap-3"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-[#c4840a] animate-pulse"
                    ></span>
                    {{
                      locale === "id" ? "Rahasia Tersembunyi" : "Hidden Secret"
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
                    class="transition-transform duration-300"
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
                      ? 'max-h-[400px] opacity-100'
                      : 'max-h-0 opacity-0'
                  "
                >
                  <div
                    class="px-5 py-5 border border-t-0 border-[#c4840a]/30 bg-[#c4840a]/5"
                  >
                    <p
                      class="font-lato text-[14px] text-[#faf7f2]/75 font-light leading-[1.9]"
                    >
                      {{ stop.displaySecret }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="flex items-center justify-between mt-10 pt-6 border-t border-[#faf7f2]/10"
              >
                <button
                  v-if="index > 0"
                  @click="navigateTo(index - 1)"
                  class="flex items-center gap-3 font-josefin text-[10px] tracking-widest uppercase text-[#faf7f2]/40 hover:text-terra transition-colors"
                >
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
                  >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                  {{ locale === "id" ? "Sebelumnya" : "Previous" }}
                </button>
                <div v-else></div>

                <button
                  v-if="index < stops.length - 1"
                  @click="navigateTo(index + 1)"
                  class="flex items-center gap-3 font-josefin text-[10px] tracking-widest uppercase text-[#faf7f2]/60 hover:text-terra transition-colors"
                >
                  {{ locale === "id" ? "Selanjutnya" : "Next" }}
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
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>

                <div v-else class="flex flex-col items-end gap-2">
                  <span
                    class="font-josefin text-[10px] tracking-widest uppercase text-terra"
                  >
                    {{
                      locale === "id"
                        ? "Perjalanan Selesai"
                        : "Journey Complete"
                    }}
                  </span>
                  <NuxtLink
                    to="/peta"
                    class="font-josefin text-[9px] tracking-widest uppercase text-[#faf7f2]/40 hover:text-[#faf7f2] transition-colors underline"
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
          </div>
        </div>
      </div>

      <div class="fixed top-0 left-0 right-0 h-[2px] z-50 bg-[#faf7f2]/5">
        <div
          class="h-full bg-terra transition-all duration-300 origin-left"
          :style="{ width: `${progressPercent}%` }"
        ></div>
      </div>

      <div
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 lg:hidden"
      >
        <button
          v-for="(stop, i) in stops"
          :key="stop.id"
          @click="navigateTo(i)"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="activeIndex === i ? 'bg-terra scale-125' : 'bg-[#faf7f2]/20'"
        ></button>
      </div>

      <div
        class="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#1a1208]/80 backdrop-blur-md border border-[#faf7f2]/10 px-4 py-2 rounded-full"
      >
        <div
          v-for="(stop, i) in stops"
          :key="stop.id"
          class="flex items-center gap-0"
        >
          <div
            class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
            :class="
              activeIndex === i
                ? 'bg-terra scale-125'
                : activeIndex > i
                  ? 'bg-terra/40'
                  : 'bg-[#faf7f2]/20'
            "
            @click="navigateTo(i)"
          ></div>
          <div
            v-if="i < stops.length - 1"
            class="h-[1px] w-6 transition-all duration-700"
            :class="activeIndex > i ? 'bg-terra' : 'bg-[#faf7f2]/15'"
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
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

::-webkit-scrollbar {
  display: none;
}
</style>
