<script setup lang="ts">
import { useI18n } from "#imports";

const { locale } = useI18n();

defineProps<{
  mode: "poi" | "internet";
  category: "all" | "wisata" | "kuliner" | "budaya" | "teknologi";
}>();

const emit = defineEmits(["update:mode", "update:category"]);

const filterOptions = [
  { id: "all", label: { id: "Semua", en: "All" } },
  { id: "wisata", label: { id: "Wisata", en: "Tourism" } },
  { id: "budaya", label: { id: "Budaya", en: "Culture" } },
  { id: "kuliner", label: { id: "Kuliner", en: "Culinary" } },
  { id: "teknologi", label: { id: "Teknologi", en: "Technology" } },
];
</script>

<template>
  <div class="flex flex-col items-start xl:items-end gap-4">
    <div
      class="flex bg-warm-white/50 p-1 border border-line rounded-lg w-fit backdrop-blur-md"
    >
      <button
        @click="emit('update:mode', 'poi')"
        class="px-4 py-2 font-josefin text-[10px] uppercase tracking-widest rounded-md transition-all"
        :class="
          mode === 'poi'
            ? 'bg-ink text-warm-white shadow-md'
            : 'text-ink/60 hover:text-ink'
        "
      >
        {{ locale === "en" ? "Destinations" : "Destinasi" }}
      </button>
      <button
        @click="emit('update:mode', 'internet')"
        class="px-4 py-2 font-josefin text-[10px] uppercase tracking-widest rounded-md transition-all"
        :class="
          mode === 'internet'
            ? 'bg-terra text-warm-white shadow-md'
            : 'text-ink/60 hover:text-ink'
        "
      >
        {{ locale === "en" ? "Connectivity" : "Konektivitas" }}
      </button>
    </div>

    <div
      v-if="mode === 'poi'"
      class="flex flex-wrap bg-warm-white/50 p-1 border border-line rounded-lg w-fit backdrop-blur-md animate-fade-in"
    >
      <button
        v-for="filter in filterOptions"
        :key="filter.id"
        @click="emit('update:category', filter.id)"
        class="px-4 py-2 font-josefin text-[9px] uppercase tracking-widest rounded-md transition-all"
        :class="
          category === filter.id
            ? 'bg-parchment text-ink border border-line shadow-sm'
            : 'text-ink/50 hover:text-ink'
        "
      >
        {{ locale === "en" ? filter.label.en : filter.label.id }}
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
