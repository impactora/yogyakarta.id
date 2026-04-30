<script setup lang="ts">
import { ref, computed } from "vue";
import { useHead, useI18n } from "#imports";

const { t, locale } = useI18n();

const { data: budayaData } = await useAsyncData("budaya", () =>
  $fetch<any>("/api/data/budaya"),
);

const culturalHeritage = computed(() => {
  if (!budayaData.value?.heritage) return [];
  const l = locale.value as "id" | "en";
  return budayaData.value.heritage.map((item: any) => ({
    ...item,
    displayTitle: item.title[l],
    displaySubtitle: item.subtitle[l],
    displayDescription: item.description[l],
    displayHighlights: item.highlights[l],
  }));
});

const festivals = computed(() => {
  if (!budayaData.value?.festivals) return [];
  const l = locale.value as "id" | "en";
  return budayaData.value.festivals.map((fest: any) => ({
    ...fest,
    displayName: fest.name[l],
    displayMonth: fest.month[l],
    displayDesc: fest.desc[l],
  }));
});

const hanacaraka = computed(() => budayaData.value?.hanacaraka ?? []);

const sourceText = ref("");
const translatedText = ref("");
const isTranslating = ref(false);

const handleTranslate = async () => {
  if (!sourceText.value.trim() || isTranslating.value) return;
  isTranslating.value = true;
  try {
    const response = await $fetch<any>("/api/chat", {
      method: "POST",
      body: {
        message: `Bantu saya menerjemahkan atau menuliskan teks ini ke/dari Aksara Jawa: "${sourceText.value}"`,
        locale: locale.value,
      },
    });
    translatedText.value = response.reply;
  } catch {
    translatedText.value = t("budaya.translator_error");
  } finally {
    isTranslating.value = false;
  }
};

useHead({ title: computed(() => t("budaya.page_title")) });
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      :category="$t('budaya.category')"
      :title="$t('budaya.header_title')"
      :description="$t('budaya.header_desc')"
    />

    <div class="flex flex-col gap-20 lg:gap-32 mt-10">
      <article
        v-for="(item, index) in culturalHeritage"
        :key="item.id"
        v-observe
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center reveal-up"
        :style="`transition-delay: ${index * 100}ms`"
      >
        <div
          class="relative aspect-[4/5] md:aspect-video lg:aspect-[4/5] bg-ink group overflow-hidden border border-line"
          :class="item.reverse ? 'lg:order-2' : 'lg:order-1'"
        >
          <AppImage
            :src="item.image"
            :alt="item.displayTitle"
            class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
          />
        </div>
        <div
          class="flex flex-col justify-center"
          :class="item.reverse ? 'lg:order-1' : 'lg:order-2'"
        >
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-5"
          >
            {{ item.category }}
          </div>
          <h2
            class="font-libre text-[32px] lg:text-[44px] font-bold text-ink leading-[1.1] mb-4"
          >
            {{ item.displayTitle }}
          </h2>
          <h3 class="font-libre text-[16px] italic text-muted mb-8">
            {{ item.displaySubtitle }}
          </h3>
          <p
            class="text-[15px] font-light text-brown leading-[1.9] mb-10 max-w-[500px]"
          >
            {{ item.displayDescription }}
          </p>
          <ul class="flex flex-col gap-4 border-l border-line pl-6">
            <li
              v-for="highlight in item.displayHighlights"
              :key="highlight"
              class="font-josefin text-[11px] font-semibold tracking-[0.15em] uppercase text-ink flex items-center gap-4 before:w-3 before:h-[1px] before:bg-terra"
            >
              {{ highlight }}
            </li>
          </ul>
        </div>
      </article>
    </div>

    <section class="mt-32 pt-24 border-t border-line">
      <div v-observe class="reveal-up text-center mb-16">
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-terra mb-6"
        >
          {{ $t("budaya.ritual_calendar") }}
        </div>
        <h2
          class="font-libre text-[36px] lg:text-[48px] font-bold text-ink mb-6"
        >
          {{ $t("budaya.time_cycle") }}
        </h2>
        <p class="text-[15px] font-light text-brown max-w-[600px] mx-auto">
          {{ $t("budaya.time_cycle") }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
        <article
          v-for="(fest, index) in festivals"
          :key="fest.id"
          v-observe
          class="bg-warm-white border border-line p-8 lg:p-10 reveal-up group hover:border-terra transition-colors duration-300 relative overflow-hidden"
          :style="`transition-delay: ${(index % 3) * 100}ms`"
        >
          <div
            class="absolute top-0 right-0 p-4 font-josefin text-[40px] font-light text-ink/5 group-hover:text-terra/10 transition-colors duration-300"
          >
            0{{ index + 1 }}
          </div>
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-4 flex items-center gap-3"
          >
            <span class="w-2 h-2 rounded-full bg-terra"></span>
            {{ $t("budaya.month_of") }} {{ fest.displayMonth }}
          </div>
          <h3
            class="font-libre text-[22px] lg:text-[26px] font-bold text-ink mb-4"
          >
            {{ fest.displayName }}
          </h3>
          <p class="text-[14px] font-light text-brown leading-[1.8]">
            {{ fest.displayDesc }}
          </p>
        </article>
      </div>
    </section>

    <section class="mt-32 pt-24 border-t border-line">
      <div v-observe class="reveal-up mb-16 text-center">
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-terra mb-6"
        >
          {{ $t("budaya.aksara_category") }}
        </div>
        <h2
          class="font-libre text-[36px] lg:text-[48px] font-bold text-ink mb-6"
        >
          Hanacaraka
        </h2>
        <p
          class="text-[14px] font-light text-brown max-w-[600px] mx-auto italic leading-relaxed"
        >
          {{ $t("budaya.aksara_desc") }}
        </p>
      </div>

      <div
        class="grid grid-cols-5 gap-2 lg:gap-3 max-w-4xl mx-auto reveal-up"
        v-observe
      >
        <div
          v-for="char in hanacaraka"
          :key="char.latin"
          class="group relative aspect-[1/1.1] bg-warm-white border border-line flex flex-col items-center justify-center transition-all duration-300 hover:border-terra overflow-hidden shadow-sm"
        >
          <div
            class="text-[32px] lg:text-[42px] text-ink transition-all duration-500 group-hover:-translate-y-3"
            style="font-family: &quot;Noto Sans Javanese&quot;, sans-serif"
          >
            {{ char.script }}
          </div>
          <div
            class="font-josefin text-[10px] uppercase tracking-widest text-muted transition-opacity duration-300 group-hover:opacity-0"
          >
            {{ char.latin }}
          </div>
          <div
            class="absolute inset-0 p-3 flex flex-col items-center justify-end pb-4 text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
          >
            <div
              class="font-josefin text-[9px] text-terra uppercase tracking-[0.2em] mb-1"
            >
              {{ char.latin }}
            </div>
            <p
              class="text-[10px] text-ink font-semibold leading-tight bg-warm-white/90 px-2 py-1 rounded"
            >
              {{ char.philosophy[locale as "id" | "en"] }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-16 max-w-4xl mx-auto reveal-up" v-observe>
        <div
          class="bg-parchment border border-line p-8 lg:p-10 relative overflow-hidden"
        >
          <div class="relative z-10">
            <h3
              class="font-libre text-[20px] font-bold text-ink mb-6 flex items-center gap-4"
            >
              <span class="w-8 h-[1px] bg-terra"></span>
              {{ $t("budaya.translator_title") }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-3">
                <label
                  class="font-josefin text-[9px] uppercase tracking-[0.2em] text-muted"
                  >Input</label
                >
                <textarea
                  v-model="sourceText"
                  class="w-full h-28 bg-warm-white border border-line p-4 text-[13px] font-light focus:outline-none focus:border-terra transition-colors resize-none"
                  :placeholder="$t('budaya.translator_placeholder')"
                ></textarea>
                <button
                  @click="handleTranslate"
                  :disabled="isTranslating || !sourceText.trim()"
                  class="bg-ink text-warm-white py-3 font-josefin text-[10px] uppercase tracking-[0.2em] hover:bg-terra transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span
                    v-if="isTranslating"
                    class="w-3 h-3 border-2 border-warm-white border-t-transparent animate-spin rounded-full"
                  ></span>
                  {{ $t("budaya.translate_btn") }}
                </button>
              </div>
              <div class="flex flex-col gap-3">
                <label
                  class="font-josefin text-[9px] uppercase tracking-[0.2em] text-muted"
                  >Nexus AI Output</label
                >
                <div
                  class="w-full h-28 bg-warm-white/50 border border-line p-4 text-[13px] font-light italic text-brown overflow-y-auto"
                  style="
                    font-family: &quot;Noto Sans Javanese&quot;, sans-serif;
                  "
                >
                  {{ translatedText || $t("budaya.translator_waiting") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-up.in-view {
  opacity: 1;
  transform: translateY(0);
}
</style>
