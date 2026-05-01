<script setup lang="ts">
import { useI18n } from "#imports";

const { t } = useI18n();

defineProps<{
  mode: "poi" | "internet";
}>();

const emit = defineEmits(["update:tier"]);

const setHighlight = (tier: string | null) => {
  emit("update:tier", tier);
};
</script>

<template>
  <div
    class="bg-warm-white/90 backdrop-blur-md border border-line p-5 rounded-xl shadow-xl min-w-[200px]"
  >
    <div
      class="font-josefin text-[10px] font-bold uppercase tracking-widest text-ink flex items-center gap-2 mb-4"
    >
      <span
        class="w-2 h-2 rounded-full animate-pulse"
        :class="mode === 'poi' ? 'bg-terra' : 'bg-ink'"
      ></span>
      {{ t("peta.legend_title") }}
    </div>

    <div v-if="mode === 'poi'" class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <div class="w-3 h-[1px] bg-terra border-dashed border-t"></div>
        <span
          class="text-[10px] text-brown font-light uppercase tracking-tighter"
          >{{ t("peta.legend_axis") }}</span
        >
      </div>
      <div class="flex items-center gap-3">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="#c84b31"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            stroke="#faf7f2"
            stroke-width="1"
          />
        </svg>
        <span
          class="text-[10px] text-brown font-light uppercase tracking-tighter"
          >{{ t("peta.legend_poi") }}</span
        >
      </div>
    </div>

    <div v-else class="flex flex-col gap-3">
      <div
        @mouseenter="setHighlight('high')"
        @mouseleave="setHighlight(null)"
        class="flex items-center gap-3 cursor-pointer group transition-all"
      >
        <div
          class="w-3 h-3 bg-ink rounded-full opacity-60 group-hover:scale-125 transition-transform"
        ></div>
        <span
          class="text-[10px] text-brown font-light uppercase tracking-tighter transition-colors group-hover:text-ink group-hover:font-bold"
          >> 90% Penetrasi</span
        >
      </div>
      <div
        @mouseenter="setHighlight('mid')"
        @mouseleave="setHighlight(null)"
        class="flex items-center gap-3 cursor-pointer group transition-all"
      >
        <div
          class="w-3 h-3 bg-terra rounded-full opacity-60 group-hover:scale-125 transition-transform"
        ></div>
        <span
          class="text-[10px] text-brown font-light uppercase tracking-tighter transition-colors group-hover:text-terra group-hover:font-bold"
          >80% - 89% Penetrasi</span
        >
      </div>
      <div
        @mouseenter="setHighlight('low')"
        @mouseleave="setHighlight(null)"
        class="flex items-center gap-3 cursor-pointer group transition-all"
      >
        <div
          class="w-3 h-3 bg-[#a38b72] rounded-full opacity-60 group-hover:scale-125 transition-transform"
        ></div>
        <span
          class="text-[10px] text-brown font-light uppercase tracking-tighter transition-colors group-hover:text-muted group-hover:font-bold"
          >< 80% Penetrasi</span
        >
      </div>
    </div>
  </div>
</template>
