<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "#imports";
import gsap from "gsap";

const { t } = useI18n();
const phase = ref(0);
const titleRef = ref<HTMLElement | null>(null);
let timer1: ReturnType<typeof setTimeout>;
let timer2: ReturnType<typeof setTimeout>;
let ctx: gsap.Context | null = null;

onMounted(() => {
  timer1 = setTimeout(() => {
    phase.value = 1;
  }, 500);

  timer2 = setTimeout(() => {
    phase.value = 2;

    if (titleRef.value) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.value!.children,
          { opacity: 0, y: 100, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
        );
      });
    }
  }, 2000);
});

onUnmounted(() => {
  clearTimeout(timer1);
  clearTimeout(timer2);
  if (ctx) ctx.revert();
});
</script>

<template>
  <section
    class="relative h-screen w-full bg-parchment overflow-hidden flex items-center justify-center select-none"
  >
    <div
      class="absolute inset-0 w-full h-full bg-[url('/images/home/Tugu_Jogja.jpg')] bg-cover bg-center transition-all duration-[3000ms] ease-out grayscale scale-110 opacity-0"
      :class="{ '!opacity-30 !scale-100': phase === 2 }"
    ></div>

    <div class="relative z-10 flex flex-col items-center w-full">
      <div
        class="text-[15vw] md:text-[12vw] text-ink/30 leading-none transition-all duration-[1500ms] ease-[cubic-bezier(0.8,0,0.2,1)] scale-150 opacity-0 blur-xl whitespace-nowrap"
        :class="{
          '!scale-100 !opacity-100 !blur-0': phase >= 1,
          '-translate-y-16 lg:-translate-y-20': phase === 2,
        }"
        style="font-family: &quot;Noto Sans Javanese&quot;, sans-serif"
      >
        {{ $t("home.hero.javanese_script") }}
      </div>

      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none"
      >
        <h1
          ref="titleRef"
          class="font-libre text-6xl md:text-8xl lg:text-[10rem] text-terra font-bold italic tracking-tighter flex justify-center perspective-[1000px]"
        >
          <span
            v-for="(char, index) in String($t('home.hero.title'))"
            :key="index"
            class="inline-block opacity-0 origin-bottom"
          >
            {{ char === " " ? "\u00A0" : char }}
          </span>
        </h1>
        <div
          class="font-josefin text-[10px] md:text-xs uppercase tracking-[0.6em] text-ink mt-12 lg:mt-16 opacity-0 transition-all duration-1000 delay-700"
          :class="{ '!opacity-100': phase === 2 }"
        >
          {{ $t("home.hero.subtitle") }}
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 transition-opacity duration-1000 delay-1000"
      :class="{ '!opacity-100': phase === 2 }"
    >
      <span
        class="font-josefin text-[9px] uppercase tracking-[0.4em] text-ink/60"
      >
        {{ $t("home.hero.cta") }}
      </span>
      <div class="w-[1px] h-12 bg-ink/20 relative overflow-hidden">
        <div
          class="absolute top-0 left-0 w-full h-full bg-terra animate-[scroll_2s_ease-in-out_infinite]"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
