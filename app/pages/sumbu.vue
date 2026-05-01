<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useHead, useI18n, useAsyncData } from "#imports";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

const { locale } = useI18n();

const { data: rawStops } = await useAsyncData("sumbu", () =>
  $fetch<any[]>("/api/data/sumbu"),
);

const stops = computed(() => {
  if (!rawStops.value) return [];
  const l = locale.value as "id" | "en";
  return rawStops.value.map((s: any) => ({
    ...s,
    displayName: s.name[l],
    displaySubtitle: s.subtitle[l],
    displayNarrative: s.narrative[l],
    displayPhilosophy: s.philosophy[l],
    displaySecret: s.secret[l],
  }));
});

const activeIndex = ref(-1);
const isCardVisible = ref(true);
let isAnimating = false;
let ctx: gsap.Context | null = null;

const navigateTo = (index: number) => {
  if (index < -1 || index >= stops.value.length) return;

  isAnimating = true;
  activeIndex.value = index;

  setTimeout(() => {
    isAnimating = false;
  }, 1800);
};

const handleScrollStep = (direction: 1 | -1) => {
  if (isAnimating) return;
  navigateTo(activeIndex.value + direction);
};

onMounted(async () => {
  await nextTick();
  gsap.registerPlugin(Observer);

  ctx = gsap.context(() => {
    Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      tolerance: 40,
      preventDefault: false,
      ignore: ".card-scrollbar, .card-scrollbar *",
      onUp: () => handleScrollStep(1),
      onDown: () => handleScrollStep(-1),
    });
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

useHead({
  title: computed(() => `Sumbu Filosofis - Jiwa Nusantara`),
  bodyAttrs: {
    class: "overflow-hidden",
  },
  style: [
    {
      innerHTML: "footer { display: none !important; }",
    },
  ],
});
</script>

<template>
  <main
    class="relative w-full h-screen overflow-hidden bg-[#1a1208] text-[#faf7f2]"
  >
    <SumbuMap :activeIndex="activeIndex" />

    <div
      class="fixed inset-0 z-10 bg-gradient-to-t lg:bg-gradient-to-r from-[#1a1208]/90 to-transparent to-[70%] pointer-events-none"
    ></div>

    <SumbuControls
      :isCardVisible="isCardVisible"
      :activeIndex="activeIndex"
      :stopsCount="stops.length"
      @toggleCard="isCardVisible = !isCardVisible"
      @navigate="navigateTo"
    />

    <SumbuScrollIndicator
      :activeIndex="activeIndex"
      :stopsCount="stops.length"
    />

    <SumbuInfoCard
      :activeIndex="activeIndex"
      :stops="stops"
      :isCardVisible="isCardVisible"
      @navigate="navigateTo"
    />

    <SumbuMobileNav
      :activeIndex="activeIndex"
      :stopsCount="stops.length"
      @navigate="navigateTo"
    />
  </main>
</template>
