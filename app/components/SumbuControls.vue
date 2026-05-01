<script setup lang="ts">
defineProps<{
  isCardVisible: boolean;
}>();

const emit = defineEmits(["toggleCard"]);
</script>

<template>
  <div class="fixed top-[90px] lg:top-24 right-6 z-[60] pointer-events-auto">
    <button
      @click="$emit('toggleCard')"
      class="bg-[#1a1208]/80 backdrop-blur-md border border-[#faf7f2]/10 p-3 rounded-xl shadow-2xl text-[#b8491f] hover:bg-[#b8491f] hover:text-[#faf7f2] transition-all cursor-pointer"
      :aria-label="isCardVisible ? 'Sembunyikan Panel' : 'Tampilkan Panel'"
    >
      <svg
        v-if="isCardVisible"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path
          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
        />
        <path
          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
        />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
  </div>
</template>
