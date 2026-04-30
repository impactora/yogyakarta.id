<script setup lang="ts">
import { ref, computed, watch, nextTick, type Component } from "vue";
import { useRouter } from "vue-router";
import {
  Search,
  X,
  MapPin,
  Utensils,
  Landmark,
  ArrowRight,
  MonitorSmartphone,
} from "lucide-vue-next";
import Fuse from "fuse.js";
import { useI18n } from "#imports";

const { locale } = useI18n();

const props = defineProps({ isOpen: { type: Boolean, required: true } });
const emit = defineEmits(["close"]);
const router = useRouter();

const searchQuery = ref("");
const searchInput = ref<HTMLInputElement | null>(null);

const iconMap: Record<string, Component> = {
  landmark: Landmark,
  utensils: Utensils,
  mappin: MapPin,
  monitor: MonitorSmartphone,
};

const { data: rawSearchData } = useFetch<any[]>("/api/data/search");

const localizedSearchIndex = computed(() => {
  if (!rawSearchData.value) return [];
  const l = locale.value as "id" | "en";
  return rawSearchData.value.map((item: any) => ({
    id: item.id,
    url: item.url,
    icon: iconMap[item.iconType] ?? Landmark,
    category: item.category[l],
    title: item.title[l],
    desc: item.desc[l],
  }));
});

const fuse = computed(
  () =>
    new Fuse(localizedSearchIndex.value, {
      keys: ["title", "desc", "category"],
      threshold: 0.3,
      includeScore: true,
    }),
);

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return [];
  return fuse.value
    .search(searchQuery.value)
    .slice(0, 5)
    .map((r) => r.item);
});

const handleNavigate = (url: string) => {
  emit("close");
  searchQuery.value = "";
  router.push(url);
};

watch(
  () => props.isOpen,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      searchInput.value?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
);
</script>

<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-5 sm:px-10"
    >
      <div
        class="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        @click="emit('close')"
      ></div>

      <div
        class="relative w-full max-w-[700px] bg-warm-white shadow-2xl rounded-xl overflow-hidden border border-line"
      >
        <div
          class="flex items-center px-6 py-5 border-b border-line bg-parchment transition-colors duration-300"
        >
          <Search class="w-6 h-6 text-muted flex-shrink-0" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            :placeholder="$t('search.placeholder')"
            class="flex-grow bg-transparent border-none outline-none px-4 text-[18px] font-libre text-ink placeholder:text-muted/50"
            @keydown.esc="emit('close')"
          />
          <button
            @click="emit('close')"
            class="p-2 hover:bg-ink/5 rounded-lg transition-colors"
            aria-label="Tutup pencarian"
          >
            <X class="w-5 h-5 text-ink" />
          </button>
        </div>

        <div
          class="max-h-[50vh] overflow-y-auto bg-warm-white transition-colors duration-300"
        >
          <div
            v-if="searchQuery && searchResults.length === 0"
            class="p-10 text-center text-brown font-light"
          >
            {{ $t("search.no_results") }}
            <span class="font-bold text-ink">"{{ searchQuery }}"</span>.
          </div>

          <div
            v-else-if="!searchQuery"
            class="p-8 text-center flex flex-col items-center justify-center opacity-50"
          >
            <Search class="w-10 h-10 mb-4 text-muted" />
            <div
              class="font-josefin text-[12px] uppercase tracking-widest text-muted"
            >
              {{ $t("search.start_typing") }}
            </div>
          </div>

          <ul v-else class="flex flex-col">
            <li v-for="item in searchResults" :key="item.id">
              <button
                @click="handleNavigate(item.url)"
                class="w-full text-left px-6 py-4 hover:bg-parchment flex items-start gap-4 transition-colors border-b border-line last:border-b-0 group cursor-pointer"
              >
                <div
                  class="mt-1 bg-ink/5 p-2 rounded-lg text-ink group-hover:bg-terra/10 group-hover:text-terra transition-colors flex-shrink-0"
                >
                  <component :is="item.icon" class="w-5 h-5" />
                </div>
                <div class="flex-grow">
                  <div class="flex items-center gap-3 mb-1">
                    <span class="font-libre text-[18px] font-bold text-ink">{{
                      item.title
                    }}</span>
                    <span
                      class="font-josefin text-[9px] uppercase tracking-widest text-terra px-2 py-0.5 border border-terra/20 rounded bg-terra/5"
                    >
                      {{ item.category }}
                    </span>
                  </div>
                  <p
                    class="text-[13px] text-brown font-light leading-relaxed line-clamp-1"
                  >
                    {{ item.desc }}
                  </p>
                </div>
                <ArrowRight
                  class="w-5 h-5 text-muted opacity-0 group-hover:opacity-100 group-hover:text-terra transition-all transform group-hover:translate-x-1 mt-3"
                />
              </button>
            </li>
          </ul>
        </div>

        <div
          class="px-6 py-3 bg-parchment border-t border-line font-josefin text-[10px] text-muted flex justify-between items-center uppercase tracking-widest transition-colors duration-300"
        >
          <span>{{ $t("search.internal_engine") }}</span>
          <span class="flex items-center gap-2">
            {{ $t("search.use") }}
            <kbd
              class="px-1.5 py-0.5 border border-line rounded bg-warm-white font-sans text-[9px] text-ink"
              >ESC</kbd
            >
            {{ $t("search.to_close") }}
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active .relative,
.fade-leave-active .relative {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from .relative,
.fade-leave-to .relative {
  transform: translateY(-20px) scale(0.98);
}
</style>
