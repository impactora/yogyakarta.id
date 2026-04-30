<script setup lang="ts">
import { computed } from "vue";
import { useHead, useI18n } from "#imports";

const { t, locale } = useI18n();

const { data: rawInitiatives } = await useAsyncData("teknologi", () =>
  $fetch<any[]>("/api/data/teknologi"),
);

const initiatives = computed(() => {
  if (!rawInitiatives.value) return [];
  const l = locale.value as "id" | "en";
  return rawInitiatives.value.map((item: any) => ({
    ...item,
    displayMeta: item.meta[l],
    displayTitle: item.title[l],
    displayDesc: item.desc[l],
  }));
});

useHead({ title: computed(() => t("teknologi.page_title")) });
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10 transition-colors duration-300"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      :category="$t('teknologi.category')"
      :title="$t('teknologi.header_title')"
      :description="$t('teknologi.header_desc')"
    />

    <div
      v-observe
      class="w-full h-[30vh] lg:h-[40vh] mt-10 mb-16 relative overflow-hidden reveal-up delay-100 border border-line shadow-xl bg-[#1a1208]"
    >
      <AppImage
        src="/images/teknologi/ugm.jpg"
        alt="Pusat Pendidikan UGM"
        class="w-full h-full object-cover grayscale-[20%] opacity-90 transition-none"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#1a1208]/80 to-transparent transition-none z-10"
      ></div>
      <div class="absolute bottom-6 left-6 z-20 transition-none">
        <div
          class="font-josefin text-[9px] tracking-[0.2em] text-[#faf7f2] uppercase mb-2"
        >
          {{ $t("teknologi.ecosystem_node") }}
        </div>
        <div class="font-libre text-[20px] text-[#faf7f2]">
          Universitas Gadjah Mada
        </div>
      </div>
    </div>

    <section
      class="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 lg:gap-6"
    >
      <div
        v-observe
        class="lg:col-span-2 bg-ink p-10 lg:p-14 flex flex-col justify-between group reveal-up transition-colors duration-300"
      >
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-terra mb-12"
        >
          {{ $t("teknologi.talent_pool") }}
        </div>
        <div>
          <div
            class="font-libre text-[64px] lg:text-[96px] font-bold text-parchment leading-none mb-4 group-hover:text-terra transition-colors duration-500"
          >
            100K+
          </div>
          <div
            class="font-libre text-[20px] lg:text-[24px] text-parchment/80 mb-4 transition-colors duration-300"
          >
            {{ $t("teknologi.graduates_title") }}
          </div>
          <p
            class="text-[14px] text-parchment/50 font-light leading-[1.8] max-w-[450px] mb-4 transition-colors duration-300"
          >
            {{ $t("teknologi.graduates_desc") }}
          </p>
          <div
            class="block w-full font-josefin text-[9px] text-parchment/40 dark:text-parchment/60 uppercase tracking-widest border-t border-parchment/10 pt-4 mt-4 transition-colors duration-300"
          >
            *{{ $t("teknologi.graduates_source") }}
          </div>
        </div>
      </div>

      <div
        v-observe
        class="bg-terra p-10 lg:p-14 flex flex-col justify-between group reveal-up delay-100 transition-colors duration-300"
      >
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-ink mb-12 transition-colors duration-300"
        >
          {{ $t("teknologi.connectivity") }}
        </div>
        <div>
          <div
            class="font-libre text-[64px] lg:text-[80px] font-bold text-warm-white leading-none mb-4 group-hover:text-ink transition-colors duration-500"
          >
            91%
          </div>
          <div
            class="font-libre text-[18px] text-warm-white/90 leading-[1.4] mb-4 transition-colors duration-300"
          >
            {{ $t("teknologi.internet_penetration") }}
          </div>
          <div
            class="font-josefin text-[9px] text-ink/60 uppercase tracking-widest border-t border-ink/20 pt-4 mt-4 transition-colors duration-300"
          >
            *{{ $t("teknologi.internet_source") }}
          </div>
        </div>
      </div>

      <div
        v-observe
        class="bg-line p-10 lg:p-12 flex flex-col justify-between reveal-up delay-200 lg:col-span-3 transition-colors duration-300 shadow-sm"
      >
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-muted mb-12 transition-colors duration-300"
        >
          {{ $t("teknologi.business_infrastructure") }}
        </div>
        <div>
          <div
            class="font-libre text-[40px] font-bold text-ink leading-none mb-4 transition-colors duration-300"
          >
            300+
          </div>
          <div
            class="font-libre text-[18px] text-ink/80 mb-3 transition-colors duration-300"
          >
            {{ $t("teknologi.active_startups") }}
          </div>
          <p
            class="text-[13px] text-brown font-light leading-[1.6] mb-4 transition-colors duration-300"
          >
            {{ $t("teknologi.business_desc") }}
          </p>
          <div
            class="font-josefin text-[9px] text-ink/50 uppercase tracking-widest border-t border-ink/10 pt-4 mt-4 transition-colors duration-300"
          >
            *{{ $t("teknologi.business_source") }}
          </div>
        </div>
      </div>
    </section>

    <section
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pt-10 border-t border-line"
    >
      <article
        v-for="(item, index) in initiatives"
        :key="item.id"
        v-observe
        class="flex flex-col reveal-up"
        :style="`transition-delay: ${(index % 3) * 100}ms`"
      >
        <div class="h-[2px] w-8 bg-terra mb-6"></div>
        <div
          class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-3 transition-colors duration-300"
        >
          {{ item.displayMeta }}
        </div>
        <h3
          class="font-libre text-[22px] font-bold text-ink mb-4 transition-colors duration-300"
        >
          {{ item.displayTitle }}
        </h3>
        <p
          class="text-[15px] font-light text-brown leading-[1.8] transition-colors duration-300"
        >
          {{ item.displayDesc }}
        </p>
      </article>
    </section>
  </main>
</template>

<style scoped></style>
