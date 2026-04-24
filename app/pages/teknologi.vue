<script setup lang="ts">
const items = [
  {
    meta: "Pendidikan",
    title: "Universitas Gadjah Mada",
    desc: "Pusat riset dan pencetak talenta teknologi.",
  },
  {
    meta: "Ekosistem",
    title: "Silicon Wali",
    desc: "Hub inkubator startup digital di Jogja.",
  },
  {
    meta: "Visi",
    title: "Nusantara Digital City",
    desc: "Integrasi smart city dengan cagar budaya.",
  },
];
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      category="Teknologi"
      title="Lompatan Digital"
      description="Infrastruktur pendidikan tinggi, ekosistem startup, dan potensi masa depan."
    />

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12"
    >
      <article
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-col"
      >
        <div
          class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-3"
        >
          {{ item.meta }}
        </div>
        <h2 class="font-libre text-[20px] font-bold text-ink mb-3">
          {{ item.title }}
        </h2>
        <p class="text-[14px] font-light text-brown leading-[1.7]">
          {{ item.desc }}
        </p>
      </article>
    </div>
  </main>
</template>
