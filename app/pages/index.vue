<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const cursorRef = ref<HTMLElement | null>(null);
let xTo: ReturnType<typeof gsap.quickTo>;
let yTo: ReturnType<typeof gsap.quickTo>;

const onMove = (e: MouseEvent | TouchEvent) => {
  let x, y;
  if ("touches" in e) {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }
  if (xTo && yTo) {
    xTo(x);
    yTo(y);
  }
};

onMounted(() => {
  if (cursorRef.value) {
    gsap.set(cursorRef.value, { xPercent: -50, yPercent: -50 });
    xTo = gsap.quickTo(cursorRef.value, "x", { duration: 0.3, ease: "power3" });
    yTo = gsap.quickTo(cursorRef.value, "y", { duration: 0.3, ease: "power3" });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
  }
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMove);
  window.removeEventListener("touchmove", onMove);
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
      ref="cursorRef"
      class="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-[#b8491f] rounded-full pointer-events-none z-[10000] flex items-center justify-center bg-[#b8491f]/10 backdrop-blur-[1px]"
    >
      <div class="w-1.5 h-1.5 bg-[#b8491f] rounded-full"></div>
    </div>
  </main>
</template>
