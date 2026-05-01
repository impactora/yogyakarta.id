<script setup lang="ts">
import { useI18n } from "#imports";

defineProps<{
  items: any[];
}>();

const { t } = useI18n();
</script>

<template>
  <section class="mt-32 pt-24 border-t border-line">
    <div v-observe class="reveal-up text-center mb-16">
      <div
        class="font-josefin text-[10px] tracking-[0.25em] uppercase text-terra mb-6"
      >
        {{ t("budaya.ritual_calendar") }}
      </div>
      <h2 class="font-libre text-[36px] lg:text-[48px] font-bold text-ink mb-6">
        {{ t("budaya.time_cycle") }}
      </h2>
      <p class="text-[15px] font-light text-brown max-w-[600px] mx-auto">
        {{ t("budaya.time_cycle_desc") }}
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
      <article
        v-for="(fest, index) in items"
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
          {{ t("budaya.month_of") }} {{ fest.displayMonth }}
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
