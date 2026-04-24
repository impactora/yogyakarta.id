<script setup lang="ts">
const items = [
  {
    meta: "Ikon",
    title: "Gudeg Jogja",
    desc: "Nangka muda dengan karamelisasi lambat.",
  },
  {
    meta: "Oleh-oleh",
    title: "Bakpia Pathok",
    desc: "Akulturasi Tionghoa dan Jawa dalam kudapan manis.",
  },
  {
    meta: "Malam",
    title: "Oseng Mercon",
    desc: "Ledakan rasa pedas antitesis citarasa manis Jogja.",
  },
];
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      category="Kuliner"
      title="Simfoni Rasa"
      description="Eksplorasi gastronomi lokal. Cerita kesabaran di balik setiap hidangan legendaris."
    />

    <div class="mb-10 pb-6 border-b border-line flex gap-4">
      <span
        class="font-josefin text-[10px] text-muted uppercase tracking-[0.1em]"
        >Filter Component Area</span
      >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <article
        v-for="(item, index) in items"
        :key="index"
        class="p-6 border border-line hover:bg-white/50 transition-colors"
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
