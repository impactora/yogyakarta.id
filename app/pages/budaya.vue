<script setup lang="ts">
const items = [
  {
    meta: "Kriya",
    title: "Mahakarya Batik",
    desc: "Filosofi kepemimpinan dalam motif Parang.",
  },
  {
    meta: "Pertunjukan",
    title: "Wayang Kulit",
    desc: "Refleksi spiritualitas dan moral masyarakat Jawa.",
  },
  {
    meta: "Pusaka",
    title: "Gamelan Jawa",
    desc: "Harmoni ansambel musik tradisional.",
  },
];
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      category="Budaya"
      title="Denyut Nadi Tradisi"
      description="Visualisasi mahakarya warisan budaya yang terus hidup dalam keseharian."
    />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <article
        v-for="(item, index) in items"
        :key="index"
        class="group flex flex-col"
      >
        <div
          class="h-[320px] bg-line mb-5 relative flex items-center justify-center"
        >
          <span
            class="font-josefin text-[9px] font-light tracking-[0.2em] text-muted uppercase"
            >Image</span
          >
        </div>
        <div
          class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-2"
        >
          {{ item.meta }}
        </div>
        <h2 class="font-libre text-[20px] font-bold text-ink mb-2">
          {{ item.title }}
        </h2>
        <p class="text-[14px] font-light text-brown leading-[1.7]">
          {{ item.desc }}
        </p>
      </article>
    </div>
  </main>
</template>
