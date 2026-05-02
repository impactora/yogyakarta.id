<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "#imports";

const { t } = useI18n();
const isHovered = ref(false);

const handlePointerEnter = (e: PointerEvent) => {
  if (e.pointerType === "mouse") isHovered.value = true;
};

const handlePointerLeave = (e: PointerEvent) => {
  if (e.pointerType === "mouse") isHovered.value = false;
};

const handleClick = () => {
  if (window.matchMedia("(hover: none)").matches) {
    isHovered.value = !isHovered.value;
  }
};
</script>

<template>
  <section
    class="relative w-full h-[60vh] bg-parchment flex items-center justify-center overflow-hidden z-10 select-none border-b border-line cursor-pointer transition-colors duration-300"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
    @click="handleClick"
  >
    <div
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div
        class="w-[1px] bg-terra transition-all duration-[1000ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
        :class="isHovered ? 'h-full opacity-10' : 'h-24 opacity-100'"
      ></div>
    </div>
    <div
      class="relative z-10 w-full px-6 flex flex-col items-center text-center transition-all duration-[1000ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
      :class="
        isHovered
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95 pointer-events-none'
      "
    >
      <h2
        class="font-libre text-3xl md:text-5xl lg:text-6xl text-ink font-bold mb-4 tracking-tight transition-colors duration-300"
      >
        {{ t("home.philosophy.title") }}
      </h2>
      <div
        class="font-josefin text-[10px] tracking-[0.3em] text-terra uppercase mb-8"
      >
        {{ t("home.philosophy.subtitle") }}
      </div>
      <p
        class="font-lato text-base md:text-lg text-brown font-light max-w-xl mx-auto leading-relaxed transition-colors duration-300"
      >
        {{ t("home.philosophy.desc") }}
      </p>
    </div>
    <div
      class="absolute font-josefin text-[10px] tracking-[0.5em] text-muted uppercase transition-all duration-700 ease-out"
      :class="
        isHovered ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      "
    >
      {{ t("home.philosophy.cta") }}
    </div>
  </section>
</template>
