<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useHead, useI18n } from "#imports";

const { t } = useI18n();

const currentMode = ref<"poi" | "internet">("poi");
const selectedCategory = ref<
  "all" | "wisata" | "kuliner" | "budaya" | "teknologi"
>("all");
const highlightedTier = ref<string | null>(null);
const isFullscreen = ref(false);
const isLegendVisible = ref(true);

const fullContainer = ref<HTMLElement | null>(null);

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    fullContainer.value?.requestFullscreen();
    isFullscreen.value = true;
  } else {
    document.exitFullscreen();
    isFullscreen.value = false;
  }
};

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

onMounted(() => {
  document.addEventListener("fullscreenchange", handleFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
});

useHead({ title: computed(() => t("peta.page_title")) });
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 flex flex-col relative z-10"
  >
    <div
      class="flex flex-col xl:flex-row xl:items-end justify-between mb-8 gap-6 reveal-up"
      v-observe
    >
      <CategoryHeader
        :category="$t('peta.category')"
        :title="$t('peta.header_title')"
        :description="$t('peta.header_desc')"
        class="mb-0"
      />
      <MapControls
        v-model:mode="currentMode"
        v-model:category="selectedCategory"
      />
    </div>

    <div
      ref="fullContainer"
      class="w-full h-[70vh] lg:h-[85vh] relative rounded-2xl overflow-hidden border border-line shadow-2xl bg-parchment transition-all duration-500 map-wrapper"
    >
      <ClientOnly>
        <InteractiveMap
          :mode="currentMode"
          :category="selectedCategory"
          :highlighted-tier="highlightedTier"
        />
      </ClientOnly>

      <div class="absolute top-6 right-6 z-20 flex flex-col gap-3">
        <div class="flex gap-2 self-end">
          <button
            @click="isLegendVisible = !isLegendVisible"
            class="bg-warm-white/90 backdrop-blur-md border border-line p-3 rounded-xl shadow-xl hover:bg-terra hover:text-warm-white transition-all"
          >
            <svg
              v-if="isLegendVisible"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
          </button>
          <button
            @click="toggleFullscreen"
            class="bg-warm-white/90 backdrop-blur-md border border-line p-3 rounded-xl shadow-xl hover:bg-terra hover:text-warm-white transition-all"
          >
            <svg
              v-if="!isFullscreen"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M8 3v3a2 2 0 0 1-2 2H3" />
              <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
              <path d="M3 16h3a2 2 0 0 1 2 2v3" />
              <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
          </button>
        </div>

        <transition name="legend-fade">
          <MapLegend
            v-show="isLegendVisible"
            :mode="currentMode"
            @update:tier="highlightedTier = $event"
          />
        </transition>
      </div>

      <MapInfoPanel />
    </div>
  </main>
</template>

<style>
.map-wrapper:fullscreen {
  border-radius: 0 !important;
  height: 100vh !important;
  width: 100vw !important;
  padding: 0 !important;
  margin: 0 !important;
}

.legend-fade-enter-active,
.legend-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.legend-fade-enter-from,
.legend-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
