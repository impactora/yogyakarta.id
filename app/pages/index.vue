<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useSeoMeta, useI18n } from "#imports";

const { t } = useI18n();

useSeoMeta({
  description: computed(() => t("footer.description")),
});

const cursorRef = ref<HTMLElement | null>(null);
const isMounted = ref(false);
const hasFinePointer = ref(false);
const isDarkBg = ref(false);

let xToDot: ((v: number) => void) | undefined;
let yToDot: ((v: number) => void) | undefined;
let xToRing: ((v: number) => void) | undefined;
let yToRing: ((v: number) => void) | undefined;

const onMove = (e: MouseEvent) => {
  if (xTo && yTo) {
    xTo(e.clientX);
    yTo(e.clientY);

    const target = document.elementFromPoint(
      e.clientX,
      e.clientY,
    ) as HTMLElement | null;
    if (target) {
      isDarkBg.value = !!target.closest(
        ".bg-\\[\\#1a1208\\], .bg-ink, .bg-terra",
      );
    }
  }
};

onMounted(async () => {
  isMounted.value = true;
  hasFinePointer.value = window.matchMedia("(pointer: fine)").matches;

  nextTick(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    void (async () => {
      const { default: gsap } = await import("gsap");
      document.documentElement.style.cursor = "none";

      if (!cursorDotRef.value || !cursorRingRef.value) return;

      gsap.set(cursorDotRef.value, { xPercent: -50, yPercent: -50 });
      gsap.set(cursorRingRef.value, { xPercent: -50, yPercent: -50 });

      xToDot = gsap.quickTo(cursorDotRef.value, "x", {
        duration: 0,
        ease: "none",
      });
      yToDot = gsap.quickTo(cursorDotRef.value, "y", {
        duration: 0,
        ease: "none",
      });

      xToRing = gsap.quickTo(cursorRingRef.value, "x", {
        duration: 0.6,
        ease: "power3.out",
      });
      yToRing = gsap.quickTo(cursorRingRef.value, "y", {
        duration: 0.6,
        ease: "power3.out",
      });

      window.addEventListener("mousemove", onMove);
    })();
  });
});

onUnmounted(() => {
  document.body.classList.remove("hide-default-cursor");
  window.removeEventListener("mousemove", onMove);
});
</script>

<template>
  <main
    class="min-h-screen bg-parchment relative w-full overflow-hidden flex flex-col"
  >
    <HomeHero />
    <HomeIntro />
    <HomePhilosophy />
    <HomeEditorial />

    <Teleport to="body" v-if="isMounted && hasFinePointer">
      <div
        ref="cursorRef"
        class="fixed top-0 left-0 w-10 h-10 flex items-center justify-center rounded-full pointer-events-none z-[10000] transform-gpu font-josefin text-[18px] font-bold italic uppercase transition-colors duration-300 shadow-xl"
        :class="isDarkBg ? 'bg-parchment text-ink' : 'bg-ink text-parchment'"
      >
        <span class="mt-[2px]">J</span>
      </div>
    </Teleport>
  </main>
</template>

<style>
.hide-default-cursor,
.hide-default-cursor * {
  cursor: none !important;
}
</style>
