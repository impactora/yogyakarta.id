<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const cursorDotRef = ref<HTMLElement | null>(null);
const cursorRingRef = ref<HTMLElement | null>(null);

let xToDot: ReturnType<typeof gsap.quickTo>;
let yToDot: ReturnType<typeof gsap.quickTo>;
let xToRing: ReturnType<typeof gsap.quickTo>;
let yToRing: ReturnType<typeof gsap.quickTo>;

const onMove = (e: MouseEvent) => {
  if (xToDot && yToDot && xToRing && yToRing) {
    xToDot(e.clientX);
    yToDot(e.clientY);
    xToRing(e.clientX);
    yToRing(e.clientY);
  }
};

onMounted(() => {
  if (window.matchMedia("(pointer: fine)").matches) {
    document.documentElement.style.cursor = "none";

    if (cursorDotRef.value && cursorRingRef.value) {
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
    }
  }
});

onUnmounted(() => {
  document.documentElement.style.cursor = "auto";
  window.removeEventListener("mousemove", onMove);
});
</script>

<template>
  <main
    class="min-h-screen bg-parchment relative w-full overflow-hidden flex flex-col lg:cursor-none"
  >
    <HomeHero />
    <HomeIntro />
    <HomePhilosophy />
    <HomeEditorial />

    <div
      ref="cursorRingRef"
      class="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[10000] mix-blend-difference hidden lg:block transform-gpu"
    ></div>
    <div
      ref="cursorDotRef"
      class="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference hidden lg:block transform-gpu"
    ></div>
  </main>
</template>
