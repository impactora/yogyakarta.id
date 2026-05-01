<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "#imports";

const props = defineProps<{
  activeIndex: number;
  stops: any[];
  isCardVisible: boolean;
}>();

const emit = defineEmits(["navigate"]);

const { locale } = useI18n();

const activeStop = computed(() =>
  props.activeIndex >= 0 ? props.stops[props.activeIndex] : null,
);

const expandedSection = ref<"philosophy" | "secret" | null>(null);

const toggleSection = (section: "philosophy" | "secret") => {
  expandedSection.value = expandedSection.value === section ? null : section;
};

const navigateTo = (index: number) => {
  emit("navigate", index);
};
</script>

<template>
  <div
    class="fixed inset-y-0 left-0 z-50 w-full lg:w-5/12 lg:ml-[5%] flex flex-col justify-end lg:justify-center px-4 sm:px-6 lg:px-12 pb-24 lg:pb-0 pointer-events-none"
  >
    <transition name="fade-slide" mode="out-in">
      <div
        v-if="activeIndex === -1 && isCardVisible"
        key="hero"
        class="pointer-events-auto bg-[#1a1208]/90 backdrop-blur-md border border-[#faf7f2]/10 p-6 lg:p-12 shadow-2xl flex flex-col items-start gap-5 lg:gap-8 max-h-[75vh] lg:max-h-none overflow-y-auto card-scrollbar rounded-t-2xl lg:rounded-2xl"
      >
        <div class="flex items-center gap-4 w-full">
          <div class="w-8 lg:w-12 h-[1px] bg-[#b8491f]"></div>
          <span
            class="font-josefin text-[9px] lg:text-[10px] tracking-[0.4em] uppercase text-[#b8491f]"
          >
            {{
              locale === "id" ? "Perjalanan Interaktif" : "Interactive Journey"
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
        class="pointer-events-auto bg-[#1a1208]/90 backdrop-blur-md border border-[#faf7f2]/10 p-6 lg:p-12 shadow-2xl max-h-[75vh] lg:max-h-none overflow-y-auto card-scrollbar rounded-t-2xl lg:rounded-2xl"
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
              {{ locale === "id" ? "Perjalanan Selesai" : "Journey Complete" }}
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
</template>

<style scoped>
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
.card-scrollbar::-webkit-scrollbar {
  display: none;
}
.card-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
