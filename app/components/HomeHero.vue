<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "#imports";
import gsap from "gsap";

const HOVER_MODE = 1;

const { t } = useI18n();
const phase = ref(0);
const titleRef = ref<HTMLElement | null>(null);
let timer1: ReturnType<typeof setTimeout>;
let timer2: ReturnType<typeof setTimeout>;
let ctx: gsap.Context | null = null;

const applyHoverInteraction = (
  wrapper: HTMLElement,
  chars: NodeListOf<Element>,
) => {
  if (HOVER_MODE === 1) {
    chars.forEach((char) => {
      char.addEventListener("mouseenter", () =>
        gsap.to(char, {
          y: -20,
          scale: 1.1,
          color: "#faf7f2",
          duration: 0.3,
          ease: "back.out(2)",
        }),
      );
      char.addEventListener("mouseleave", () =>
        gsap.to(char, {
          y: 0,
          scale: 1,
          color: "#b8491f",
          duration: 0.4,
          ease: "power2.out",
        }),
      );
    });
  } else if (HOVER_MODE === 2) {
    wrapper.addEventListener("mouseenter", () => {
      gsap.to(chars, {
        y: -15,
        duration: 0.2,
        stagger: 0.03,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
    });
  } else if (HOVER_MODE === 3) {
    wrapper.addEventListener("mouseenter", () => {
      gsap.to(chars, {
        rotateX: "+=360",
        duration: 0.8,
        stagger: 0.04,
        ease: "power2.inOut",
      });
    });
  } else if (HOVER_MODE === 4) {
    wrapper.addEventListener("mouseenter", () => {
      gsap.to(wrapper, {
        scale: 0.95,
        letterSpacing: "0.1em",
        filter: "blur(2px)",
        duration: 0.4,
        ease: "power2.out",
      });
    });
    wrapper.addEventListener("mouseleave", () => {
      gsap.to(wrapper, {
        scale: 1,
        letterSpacing: "normal",
        filter: "blur(0px)",
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    });
  } else if (HOVER_MODE === 5) {
    wrapper.addEventListener("mouseenter", () => {
      gsap.to(wrapper, {
        skewX: -10,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    wrapper.addEventListener("mouseleave", () => {
      gsap.to(wrapper, {
        skewX: 0,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    });
  }
};

onMounted(() => {
  timer1 = setTimeout(() => {
    phase.value = 1;
  }, 500);

  timer2 = setTimeout(() => {
    phase.value = 2;

    if (titleRef.value) {
      ctx = gsap.context(() => {
        const chars = titleRef.value!.querySelectorAll(".char");

        gsap.fromTo(
          chars,
          { opacity: 0, y: 100, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "back.out(1.7)",
            onComplete: () => {
              applyHoverInteraction(titleRef.value!, chars);
            },
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
          class="font-libre text-6xl md:text-8xl lg:text-[10rem] text-terra font-bold italic tracking-tighter flex justify-center perspective-[1000px] pointer-events-auto cursor-default"
        >
          <span
            v-for="(char, index) in String($t('home.hero.title'))"
            :key="index"
            class="char inline-block origin-bottom transition-colors"
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
