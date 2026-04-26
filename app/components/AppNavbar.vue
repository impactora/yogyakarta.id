<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Search, Globe } from "lucide-vue-next";
import { useI18n } from "#imports";

const { locale, setLocale } = useI18n();

const routes = ["sejarah", "budaya", "kuliner", "wisata", "teknologi", "peta"];

const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const route = useRoute();

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  },
);

const toggleLanguage = () => {
  setLocale(locale.value === "id" ? "en" : "id");
};
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] bg-parchment/94 backdrop-blur-md border-b border-line transition-all duration-300"
  >
    <div
      class="px-5 lg:px-[60px] h-[60px] lg:h-[72px] flex items-center justify-between relative z-[102] bg-transparent"
    >
      <NuxtLink
        to="/"
        class="font-libre text-[18px] lg:text-[20px] font-normal text-ink tracking-[0.04em]"
        @click="isMenuOpen = false"
      >
        Jiwa <em class="italic text-terra">Nusantara</em>
      </NuxtLink>

      <ul class="hidden lg:flex gap-9">
        <li v-for="item in routes" :key="item">
          <NuxtLink
            :to="`/${item}`"
            active-class="text-terra"
            class="font-josefin text-[11px] font-semibold tracking-[0.18em] uppercase text-muted transition-colors duration-200 hover:text-terra"
          >
            {{ $t(`nav.${item}`) }}
          </NuxtLink>
        </li>
      </ul>

      <div class="hidden lg:flex items-center gap-6">
        <button
          @click="isSearchOpen = true"
          class="flex items-center justify-center p-2 hover:bg-ink/5 rounded-full transition-colors"
          aria-label="Buka Pencarian Global"
        >
          <Search class="w-4 h-4 text-ink hover:text-terra transition-colors" />
        </button>

        <span
          class="font-josefin text-[10px] font-light tracking-[0.15em] uppercase text-muted border-l border-r border-line px-6"
        >
          Vol. I · Yogyakarta
        </span>

        <button
          @click="toggleLanguage"
          class="flex items-center gap-1.5 font-josefin text-[10px] font-semibold tracking-[0.1em] uppercase text-terra hover:opacity-60 transition-opacity"
        >
          <Globe class="w-3.5 h-3.5" /> {{ locale === "id" ? "ID" : "EN" }}
        </button>
      </div>

      <div class="flex lg:hidden items-center gap-4">
        <button
          @click="isSearchOpen = true"
          class="flex items-center justify-center p-2"
          aria-label="Buka Pencarian Global"
        >
          <Search class="w-5 h-5 text-ink" />
        </button>

        <button
          @click="toggleLanguage"
          class="font-josefin text-[10px] font-semibold tracking-[0.1em] uppercase text-terra hover:opacity-60 transition-opacity"
        >
          {{ locale === "id" ? "ID" : "EN" }}
        </button>

        <button
          class="flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Toggle Menu"
        >
          <span
            class="block w-6 h-[1px] bg-ink transition-transform duration-300 origin-center"
            :class="{ 'rotate-45 translate-y-[6px]': isMenuOpen }"
          ></span>
          <span
            class="block w-6 h-[1px] bg-ink transition-opacity duration-300"
            :class="{ 'opacity-0': isMenuOpen }"
          ></span>
          <span
            class="block w-6 h-[1px] bg-ink transition-transform duration-300 origin-center"
            :class="{ '-rotate-45 -translate-y-[6px]': isMenuOpen }"
          ></span>
        </button>
      </div>
    </div>

    <div
      class="lg:hidden absolute top-[60px] left-0 right-0 bg-parchment overflow-hidden transition-all duration-300 ease-in-out border-b border-line"
      :class="
        isMenuOpen
          ? 'max-h-[400px] opacity-100'
          : 'max-h-0 opacity-0 border-transparent'
      "
    >
      <div class="px-5 py-8 flex flex-col gap-6">
        <ul class="flex flex-col gap-6">
          <li v-for="item in routes" :key="item">
            <NuxtLink
              :to="`/${item}`"
              active-class="text-terra"
              class="font-josefin text-[14px] font-semibold tracking-[0.2em] uppercase text-muted transition-colors duration-200 hover:text-terra block"
              @click="isMenuOpen = false"
            >
              {{ $t(`nav.${item}`) }}
            </NuxtLink>
          </li>
        </ul>
        <div
          class="pt-6 border-t border-line flex justify-between items-center"
        >
          <span
            class="font-josefin text-[10px] font-light tracking-[0.15em] uppercase text-muted"
            >Vol. I · Yogyakarta</span
          >
        </div>
      </div>
    </div>

    <GlobalSearch :isOpen="isSearchOpen" @close="isSearchOpen = false" />
  </nav>
</template>
