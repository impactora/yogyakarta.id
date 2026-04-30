<script setup lang="ts">
import { ref, computed } from "vue";
import { useHead, useI18n } from "#imports";
import { MapPin, Banknote } from "lucide-vue-next";

const { t, locale } = useI18n();

const { data: rawCulinary } = await useAsyncData("kuliner", () =>
  $fetch<any[]>("/api/data/kuliner"),
);

const categories = computed(() => [
  { key: "all", label: t("kuliner.filters.all") },
  { key: "main_course", label: t("kuliner.filters.main_course") },
  { key: "snacks", label: t("kuliner.filters.snacks") },
  { key: "drinks", label: t("kuliner.filters.drinks") },
]);

const activeCategory = ref("all");

const culinaryItems = computed(() => {
  if (!rawCulinary.value) return [];
  const l = locale.value as "id" | "en";
  return rawCulinary.value.map((item: any) => ({
    ...item,
    displayTitle: item.title[l],
    displayStory: item.story[l],
    displayMeta: item.meta[l],
    displayAddress: item.address[l],
    displayPrice: item.price[l],
    displayCategory: t(`kuliner.filters.${item.categoryId}`),
  }));
});

const featuredItem = computed(() =>
  culinaryItems.value.find((i) => i.featured),
);

const filteredItems = computed(() => {
  if (activeCategory.value === "all")
    return culinaryItems.value.filter((i) => !i.featured);
  return culinaryItems.value.filter(
    (i) => i.categoryId === activeCategory.value,
  );
});

useHead({ title: computed(() => t("kuliner.page_title")) });
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      :category="$t('kuliner.category')"
      :title="$t('kuliner.header_title')"
      :description="$t('kuliner.header_desc')"
    />

    <section
      v-if="featuredItem"
      v-observe
      class="mt-10 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center reveal-up delay-100"
    >
      <div
        class="aspect-[4/3] lg:aspect-video bg-[#1a1208] relative overflow-hidden group shadow-xl border border-line"
      >
        <AppImage
          :src="featuredItem.image"
          :alt="featuredItem.displayTitle"
          class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-[#1a1208]/60 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 z-10"
        ></div>
        <div
          class="absolute top-4 left-4 z-20 font-josefin text-[9px] uppercase tracking-widest text-[#faf7f2]/90 bg-[#1a1208]/80 backdrop-blur-sm px-3 py-1 border border-[#faf7f2]/10 transition-none"
        >
          {{ $t("kuliner.traditional_mataram") }}
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div
          class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-4"
        >
          {{ featuredItem.displayMeta }}
        </div>
        <h2
          class="font-libre text-[32px] lg:text-[44px] font-bold text-ink mb-6 leading-[1.15]"
        >
          {{ featuredItem.displayTitle }}
        </h2>
        <p
          class="text-[16px] font-light text-brown leading-[1.9] mb-8 italic border-l-2 border-terra pl-5"
        >
          "{{ featuredItem.displayStory }}"
        </p>

        <div
          class="flex flex-col gap-3 pt-6 border-t border-line font-josefin text-[10px] tracking-[0.15em] text-muted"
        >
          <div class="flex items-center gap-3">
            <MapPin class="w-3 h-3 text-terra" />
            {{ featuredItem.displayAddress }}
          </div>
          <div class="flex items-center gap-3">
            <Banknote class="w-3 h-3 text-terra" />
            {{ featuredItem.displayPrice }}
          </div>
        </div>
      </div>
    </section>

    <div
      v-observe
      class="mb-12 flex flex-wrap gap-4 border-b border-line pb-8 reveal-up delay-200 print:hidden"
    >
      <button
        v-for="cat in categories"
        :key="cat.key"
        @click="activeCategory = cat.key"
        class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 px-5 py-3 border border-transparent cursor-pointer"
        :class="
          activeCategory === cat.key
            ? 'bg-terra text-warm-white shadow-md'
            : 'text-muted hover:border-line hover:text-ink'
        "
      >
        {{ cat.label }}
      </button>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
    >
      <transition-group name="list">
        <article
          v-for="item in filteredItems"
          :key="item.id"
          class="group flex flex-col h-full"
        >
          <div
            class="h-[240px] bg-[#1a1208] mb-6 overflow-hidden relative border border-line shadow-sm"
          >
            <AppImage
              :src="item.image"
              :alt="item.displayTitle"
              class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-[#1a1208]/10 group-hover:bg-transparent transition-colors duration-500"
            ></div>
          </div>
          <div
            class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-3 flex items-center gap-2"
          >
            {{ item.displayCategory }} <span class="text-line">|</span>
            {{ item.displayMeta }}
          </div>
          <h3
            class="font-libre text-[22px] font-bold text-ink mb-3 group-hover:text-terra transition-colors duration-300"
          >
            {{ item.displayTitle }}
          </h3>
          <p
            class="text-[14px] font-light text-brown leading-[1.8] flex-grow mb-6"
          >
            {{ item.displayStory }}
          </p>

          <div
            class="pt-4 border-t border-line flex flex-col gap-3 font-josefin text-[9px] tracking-[0.15em] text-muted transition-colors duration-300"
          >
            <div class="flex items-center gap-3">
              <MapPin class="w-3 h-3 text-terra" /> {{ item.displayAddress }}
            </div>
            <div class="flex items-center gap-3">
              <Banknote class="w-3 h-3 text-terra" /> {{ item.displayPrice }}
            </div>
          </div>
        </article>
      </transition-group>
    </div>
  </main>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
</style>
