<script setup lang="ts">
import { useI18n } from "#imports";

const { t } = useI18n();

const editorials = [
  {
    id: "sejarah",
    titleKey: "home.editorial.sejarah.title",
    descKey: "home.editorial.sejarah.desc",
    script: "ꦱꦼꦗꦫꦃ",
    image: "/images/home/Tugu_Jogja.jpg",
    link: "/sejarah",
  },
  {
    id: "budaya",
    titleKey: "home.editorial.budaya.title",
    descKey: "home.editorial.budaya.desc",
    script: "ꦧꦸꦢꦪ",
    image: "/images/home/Kraton_Yogyakarta.jpg",
    link: "/budaya",
  },
  {
    id: "wisata",
    titleKey: "home.editorial.wisata.title",
    descKey: "home.editorial.wisata.desc",
    script: "ꦮꦶꦱꦠ",
    image: "/images/home/Prambanan_Temple_Yogyakarta_Indonesia.jpg",
    link: "/wisata",
  },
  {
    id: "kuliner",
    titleKey: "home.editorial.kuliner.title",
    descKey: "home.editorial.kuliner.desc",
    script: "ꦏꦸꦭꦶꦤꦺꦂ",
    image: "/images/home/Nasi_Gudeg.jpg",
    link: "/kuliner",
  },
  {
    id: "teknologi",
    titleKey: "home.editorial.teknologi.title",
    descKey: "home.editorial.teknologi.desc",
    script: "ꦠꦺꦏ꧀ꦤꦺꦴꦭꦺꦴꦒꦶ",
    image: "/images/home/Stasiun_Tugu_Yogyakarta.jpg",
    link: "/teknologi",
  },
  {
    id: "peta",
    titleKey: "home.editorial.peta.title",
    descKey: "home.editorial.peta.desc",
    script: "ꦥꦺꦠ",
    image: "/images/home/Malioboro_Street_Yogyakarta.jpg",
    link: "/peta",
  },
];
</script>

<template>
  <section
    class="w-full h-screen flex flex-col lg:flex-row bg-[#1a1208] overflow-hidden"
  >
    <NuxtLink
      v-for="(item, index) in editorials"
      :key="item.id"
      :to="item.link"
      class="group relative flex-1 flex items-end overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.7,0,0.3,1)] hover:flex-[3] lg:hover:flex-[4] border-b lg:border-b-0 lg:border-r border-white/10"
    >
      <div class="absolute inset-0 w-full h-full bg-[#1a1208]">
        <img
          :src="item.image"
          :alt="t(item.titleKey)"
          @error="
            (e) =>
              ((e.target as HTMLImageElement).src = '/images/placeholder.jpg')
          "
          class="absolute inset-0 w-full h-full object-cover opacity-40 grayscale transition-all duration-[1000ms] group-hover:opacity-80 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-[#1a1208] via-[#1a1208]/60 to-transparent transition-opacity duration-700 group-hover:opacity-80"
        ></div>
      </div>

      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-1000 delay-300 pointer-events-none"
      >
        <div
          class="text-[15vh] text-white whitespace-nowrap"
          style="font-family: &quot;Noto Sans Javanese&quot;, sans-serif"
        >
          {{ item.script }}
        </div>
      </div>

      <div
        class="relative z-10 w-full p-6 md:p-10 transition-transform duration-700 lg:translate-y-8 group-hover:translate-y-0"
      >
        <div class="flex items-center justify-between w-full">
          <div>
            <div
              class="font-josefin text-[10px] tracking-[0.3em] text-terra uppercase mb-2 opacity-0 lg:opacity-100 transition-opacity duration-500 lg:group-hover:opacity-100"
            >
              0{{ index + 1 }}
            </div>
            <h2
              class="font-libre text-3xl md:text-5xl text-white font-bold tracking-tight whitespace-nowrap"
            >
              {{ t(item.titleKey) }}
            </h2>
          </div>
          <div
            class="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:bg-terra group-hover:border-terra group-hover:-rotate-45"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>

        <div
          class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-[800ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
        >
          <div class="overflow-hidden">
            <p
              class="font-lato text-sm md:text-base text-white/70 mt-6 max-w-sm leading-relaxed"
            >
              {{ t(item.descKey) }}
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </section>
</template>

<style scoped></style>
