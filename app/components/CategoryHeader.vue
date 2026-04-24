<script setup lang="ts">
defineProps<{
  category: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <header class="mb-16 lg:mb-24 pb-12 lg:pb-16 border-b border-line">
    <div
      class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-6"
    >
      Vol. I · {{ category }}
    </div>
    <h1
      class="font-libre text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] text-ink max-w-[800px] mb-8 capitalize"
    >
      {{ title }}
    </h1>
    <p
      class="font-libre text-[16px] lg:text-[18px] text-muted italic leading-[1.7] max-w-[600px] border-l-[3px] border-terra pl-5"
    >
      "{{ description }}"
    </p>
  </header>
</template>
