<script setup lang="ts">
import type { NuxtError } from "#app";
import { computed } from "vue";
import { useI18n } from "#imports";

const { t } = useI18n();

const props = defineProps({
  error: Object as () => NuxtError,
});

const displayMessage = computed(() => {
  if (props.error?.statusCode === 404) return t("error.not_found");
  return t("error.internal_error");
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <main
    class="min-h-screen bg-[#1a1208] flex flex-col items-center justify-center px-5 py-20 relative z-10 antialiased overflow-hidden transition-none"
  >
    <div
      class="absolute top-0 right-0 w-[500px] h-[500px] border border-[#cda434]/10 rotate-45 translate-x-1/3 -translate-y-1/3 pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[300px] h-[300px] border border-[#b8491f]/10 -rotate-12 -translate-x-1/4 translate-y-1/4 pointer-events-none"
    ></div>

    <div
      class="relative z-20 text-center flex flex-col items-center max-w-[600px]"
    >
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.3em] uppercase text-[#cda434]/80 mb-10 flex items-center gap-4 before:content-[''] before:block before:w-6 before:h-px before:bg-[#cda434]/30 after:content-[''] after:block after:w-6 after:h-px after:bg-[#cda434]/30"
      >
        {{ $t("error.critical_status") }} · {{ error?.statusCode || "404" }}
      </div>

      <h1
        class="font-libre text-[40px] lg:text-[64px] font-bold text-[#faf7f2] leading-[1.1] mb-8"
      >
        {{ displayMessage }}
      </h1>

      <p
        class="text-[15px] lg:text-[17px] font-light text-[#faf7f2]/50 mb-16 leading-[1.8] max-w-[480px]"
      >
        {{ $t("error.description") }}
      </p>

      <button
        @click="handleError"
        class="group flex items-center gap-6 px-10 py-5 bg-transparent border border-[#faf7f2]/10 transition-all duration-300 hover:bg-[#faf7f2]/5 hover:border-[#faf7f2]/20 cursor-pointer"
      >
        <span
          class="font-josefin text-[11px] font-semibold tracking-[0.25em] uppercase text-[#cda434]/80 group-hover:text-[#b8491f] transition-colors duration-200 px-4"
        >
          {{ $t("error.back_to_home") }}
        </span>
        <span
          class="text-[#b8491f] opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 font-josefin text-[20px] px-4"
        >
          →
        </span>
      </button>
    </div>

    <div
      class="absolute bottom-12 left-1/2 -translate-x-1/2 font-josefin text-[9px] tracking-[0.5em] text-[#faf7f2]/20 uppercase whitespace-nowrap select-none"
    >
      {{ $t("error.footer_stamp") }}
    </div>
  </main>
</template>
