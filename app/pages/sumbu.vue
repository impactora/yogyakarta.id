<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useHead, useI18n, useAsyncData } from "#imports";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const heroRef = ref<HTMLElement | null>(null);
const textRefs = ref<HTMLElement[]>([]);
let ctx: gsap.Context | null = null;

const setRef = (el: any, index: number) => {
  if (el) textRefs.value[index] = el as HTMLElement;
};

const activate = (index: number) => {
  if (activeIndex.value === index) return;
  activeIndex.value = index;
};

const navigateTo = (index: number) => {
  if (index === -1 && heroRef.value) {
    heroRef.value.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (textRefs.value[index]) {
    textRefs.value[index].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

onMounted(async () => {
  await nextTick();
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    if (heroRef.value) {
      ScrollTrigger.create({
        trigger: heroRef.value,
        start: "top center",
        end: "bottom center",
        onEnter: () => activate(-1),
        onEnterBack: () => activate(-1),
      });
    }

    textRefs.value.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => activate(i),
        onEnterBack: () => activate(i),
      });
    });
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

useHead({
  title: computed(() => `Sumbu Filosofis - Jiwa Nusantara`),
  style: [
    {
      innerHTML: "footer { display: none !important; }",
    },
  ],
});
</script>

<template>
  <main class="relative w-full overflow-x-hidden bg-[#1a1208] text-[#faf7f2]">
    <SumbuMap :activeIndex="activeIndex" />

    <div
      class="fixed inset-0 z-10 bg-gradient-to-r from-[#1a1208] via-[#1a1208]/80 to-transparent pointer-events-none"
    ></div>

    <SumbuControls
      :isCardVisible="isCardVisible"
      @toggleCard="isCardVisible = !isCardVisible"
    />

    <SumbuScrollIndicator
      :activeIndex="activeIndex"
      :stopsCount="stops.length"
    />

    <div class="relative z-20 w-full pointer-events-none">
      <div ref="heroRef" class="h-[100vh] w-full"></div>
      <div
        v-for="(stop, index) in stops"
        :key="'trigger-' + stop.id"
        :ref="(el) => setRef(el, index)"
        class="h-[120vh] w-full"
      ></div>
      <div class="h-[30vh] w-full"></div>
    </div>

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
