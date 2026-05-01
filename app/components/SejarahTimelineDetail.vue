<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import { useI18n } from "#imports";

const props = defineProps<{
  item: any;
}>();

const { locale } = useI18n();
const isPlaying = ref(false);
let audioElement: HTMLAudioElement | null = null;

const stopAudio = () => {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
    isPlaying.value = false;
  }
};

const toggleAudio = () => {
  if (isPlaying.value) {
    stopAudio();
    return;
  }
  if (!props.item) return;
  stopAudio();

  const audioPath = `/audio/sejarah/${props.item.year}-${locale.value}.mp3`;
  audioElement = new Audio(audioPath);

  audioElement.onended = () => {
    isPlaying.value = false;
  };
  audioElement.onerror = () => {
    isPlaying.value = false;
  };

  audioElement
    .play()
    .then(() => {
      isPlaying.value = true;
    })
    .catch(() => {
      isPlaying.value = false;
    });
};

watch(
  () => props.item,
  () => {
    stopAudio();
  },
);

onUnmounted(() => {
  stopAudio();
});
</script>

<template>
  <div class="relative w-full flex flex-col pt-4 pb-20">
    <div :key="item.id" class="animate-fade-in">
      <div
        class="h-[240px] md:h-[320px] lg:h-[400px] bg-[#1a1208] relative overflow-hidden mb-8 border border-line shadow-xl"
      >
        <AppImage
          :src="item.image"
          :alt="item.displayTitle"
          class="w-full h-full object-cover opacity-90"
        />
        <div
          class="absolute bottom-3 right-3 bg-[#1a1208]/80 backdrop-blur-sm px-3 py-1 font-lato text-[9px] text-[#faf7f2]/80 border border-[#faf7f2]/10 uppercase tracking-widest transition-none"
        >
          {{ $t("sejarah.visual_archive") }}
        </div>
      </div>
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-4"
      >
        {{ $t("sejarah.act") }}: {{ item.displayMeta }}
      </div>
      <h2
        class="font-libre text-[28px] lg:text-[36px] font-bold text-ink leading-[1.2] mb-6"
      >
        {{ item.displayTitle }}
      </h2>
      <p class="text-[15px] font-light text-brown leading-[1.9] max-w-[500px]">
        {{ item.displayDesc }}
      </p>
      <button
        @click="toggleAudio"
        class="mt-8 flex items-center justify-center gap-3 px-5 py-2.5 border border-line rounded-none bg-transparent hover:border-terra hover:text-terra transition-colors w-fit cursor-pointer"
        :class="isPlaying ? 'text-terra border-terra' : 'text-ink'"
      >
        <svg
          v-if="!isPlaying"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
        <span
          class="font-josefin text-[10px] tracking-[0.2em] uppercase font-bold"
        >
          {{
            isPlaying
              ? locale === "id"
                ? "Hentikan Narasi"
                : "Stop Narration"
              : locale === "id"
                ? "Dengarkan Narasi"
                : "Listen to Narration"
          }}
        </span>
        <div v-if="isPlaying" class="flex items-center gap-[3px] ml-1 h-[14px]">
          <div class="visualizer-bar"></div>
          <div class="visualizer-bar"></div>
          <div class="visualizer-bar"></div>
          <div class="visualizer-bar"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
.visualizer-bar {
  width: 2px;
  height: 4px;
  background-color: currentColor;
  animation: soundWave 1.2s ease-in-out infinite;
  border-radius: 1px;
}
.visualizer-bar:nth-child(1) {
  animation-delay: 0s;
}
.visualizer-bar:nth-child(2) {
  animation-delay: -0.2s;
}
.visualizer-bar:nth-child(3) {
  animation-delay: -0.4s;
}
.visualizer-bar:nth-child(4) {
  animation-delay: -0.6s;
}
@keyframes soundWave {
  0%,
  100% {
    height: 4px;
  }
  50% {
    height: 14px;
  }
}
</style>
