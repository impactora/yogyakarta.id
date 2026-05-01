<script setup lang="ts">
defineProps<{
  items: any[];
  activeIndex: number;
}>();

defineEmits(["update:activeIndex"]);
</script>

<template>
  <div
    class="relative border-l border-line ml-3 pl-8 flex flex-col gap-12 lg:gap-16"
  >
    <button
      v-for="(item, index) in items"
      :key="index"
      @click="$emit('update:activeIndex', index)"
      :aria-label="`Lihat detail peristiwa ${item.displayTitle} tahun ${item.year}`"
      v-observe
      class="relative text-left group cursor-pointer reveal-up"
      :style="`transition-delay: ${(index % 5) * 100}ms`"
    >
      <div
        class="absolute -left-[37px] top-2 w-[11px] h-[11px] rounded-full border-2 transition-all duration-300"
        :class="
          activeIndex === index
            ? 'bg-terra border-terra scale-125'
            : 'bg-warm-white border-line group-hover:border-terra'
        "
      ></div>
      <div
        class="font-josefin text-[16px] lg:text-[20px] font-light transition-colors duration-300 mb-1"
        :class="
          activeIndex === index
            ? 'text-terra'
            : 'text-muted group-hover:text-terra/70'
        "
      >
        {{ item.year }}
      </div>
      <h3
        class="font-libre text-[18px] lg:text-[22px] font-bold transition-colors duration-300"
        :class="
          activeIndex === index
            ? 'text-ink'
            : 'text-ink/40 group-hover:text-ink/70'
        "
      >
        {{ item.displayTitle }}
      </h3>
    </button>
  </div>
</template>
