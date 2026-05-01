<script setup lang="ts">
defineProps<{
  categories: { key: string; label: string }[];
  modelValue: string;
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <div
    v-observe
    class="mb-12 flex flex-wrap gap-4 border-b border-line pb-8 reveal-up delay-200 print:hidden"
  >
    <button
      v-for="cat in categories"
      :key="cat.key"
      @click="$emit('update:modelValue', cat.key)"
      class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 px-5 py-3 border border-transparent cursor-pointer"
      :class="
        modelValue === cat.key
          ? 'bg-terra text-warm-white shadow-md'
          : 'text-muted hover:border-line hover:text-ink'
      "
    >
      {{ cat.label }}
    </button>
  </div>
</template>
