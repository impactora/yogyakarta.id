<script setup lang="ts">
const items = [
  {
    area: "Sleman",
    title: "Candi Prambanan",
    desc: "Gugusan candi Hindu abad ke-9.",
  },
  {
    area: "Kota",
    title: "Jalan Malioboro",
    desc: "Poros pejalan kaki yang tak pernah tidur.",
  },
  {
    area: "Bantul",
    title: "Parangtritis",
    desc: "Hamparan pasir hitam dan tebing selatan.",
  },
];
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      category="Wisata"
      title="Sudut Keajaiban Mataram"
      description="Navigasi destinasi ikonik Yogyakarta. Dari candi purba hingga garis pantai."
    />

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
      <div class="flex flex-col gap-8">
        <article
          v-for="(item, index) in items"
          :key="index"
          class="pb-8 border-b border-line last:border-0"
        >
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-2"
          >
            {{ item.area }}
          </div>
          <h2 class="font-libre text-[22px] font-bold text-ink mb-2">
            {{ item.title }}
          </h2>
          <p class="text-[15px] font-light text-brown leading-[1.8]">
            {{ item.desc }}
          </p>
        </article>
      </div>

      <div
        class="h-[400px] lg:h-[600px] bg-line relative flex items-center justify-center sticky top-[100px]"
      >
        <span
          class="font-josefin text-[10px] tracking-[0.2em] text-muted uppercase"
          >Map Container</span
        >
      </div>
    </div>
  </main>
</template>
