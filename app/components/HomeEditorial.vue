<script setup lang="ts">
const pillars = [
  { id: "sejarah", link: "/sejarah", metric: "856 M" },
  { id: "budaya", link: "/budaya", metric: "3" },
  { id: "kuliner", link: "/kuliner", metric: "12+" },
  { id: "wisata", link: "/wisata", metric: "33 KM" },
  { id: "teknologi", link: "/teknologi", metric: "300+" },
  { id: "peta", link: "/peta", metric: "1" },
];
</script>

<template>
  <section
    id="editorial-section"
    class="relative z-10 px-5 pt-[160px] pb-24 lg:pt-[240px] lg:px-[60px] lg:pb-[180px] bg-warm-white border-t border-line"
  >
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="
        background-image: radial-gradient(var(--color-ink) 1px, transparent 0);
        background-size: 40px 40px;
      "
    ></div>

    <div class="relative max-w-[1440px] mx-auto">
      <div
        v-observe
        class="mb-20 lg:mb-32 reveal-up grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-end"
      >
        <div>
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.3em] uppercase text-terra mb-8 flex items-center gap-4"
          >
            <span class="w-12 h-[1px] bg-terra"></span>
            {{ $t("editorial.label") }}
          </div>
          <h2
            class="font-libre text-[clamp(36px,6vw,64px)] font-bold leading-[1.05] text-ink italic"
          >
            {{ $t("editorial.title_line1") }}<br />
            <span class="not-italic text-terra">{{
              $t("editorial.title_line2")
            }}</span>
          </h2>
        </div>
        <div
          class="font-josefin text-[13px] text-brown leading-relaxed border-l border-line pl-8 mb-4"
        >
          {{ $t("editorial.description") }}
        </div>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-line"
      >
        <article
          v-for="(item, index) in pillars"
          :key="item.id"
          v-observe
          class="group flex flex-col border-r border-b border-line p-10 lg:p-14 reveal-up transition-colors duration-500 hover:bg-ink/[0.02]"
          :style="`transition-delay: ${index * 100}ms`"
        >
          <div
            class="font-libre text-[12px] text-muted mb-12 flex items-center gap-2"
          >
            <span class="text-terra">/</span> 0{{ index + 1 }}
          </div>

          <div class="flex items-baseline gap-4 mb-8">
            <span
              class="font-libre text-[42px] font-bold text-ink leading-none"
              >{{ item.metric }}</span
            >
            <span
              class="font-josefin text-[9px] tracking-[0.2em] uppercase text-terra font-semibold"
            >
              {{ $t(`editorial.pillars.${item.id}.metric_label`) }}
            </span>
          </div>

          <h3
            class="font-libre text-[26px] font-bold text-ink mb-4 group-hover:text-terra transition-colors duration-300"
          >
            {{ $t(`editorial.pillars.${item.id}.title`) }}
          </h3>

          <p
            class="text-[15px] font-light text-brown leading-[1.9] mb-12 flex-grow"
          >
            {{ $t(`editorial.pillars.${item.id}.desc`) }}
          </p>

          <NuxtLink
            :to="item.link"
            class="inline-flex items-center gap-4 font-josefin text-[11px] font-bold tracking-[0.2em] uppercase text-ink group-hover:gap-6 transition-all duration-300"
            :aria-label="`${$t('editorial.read_more')} ${$t(`editorial.pillars.${item.id}.title`)}`"
          >
            {{ $t("editorial.read_more") }}
            <span class="text-terra text-[16px] leading-none">→</span>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
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
#editorial-section {
  scroll-margin-top: 100px;
}
</style>
