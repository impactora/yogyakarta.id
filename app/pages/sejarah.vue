<script setup lang="ts">
const items = [
  {
    year: "1755 M",
    title: "Perjanjian Giyanti",
    desc: "Lahirnya Kasultanan Ngayogyakarta Hadiningrat.",
  },
  {
    year: "1946 M",
    title: "Ibukota Republik",
    desc: "Pusat pemerintahan darurat Republik Indonesia.",
  },
  {
    year: "2012 M",
    title: "UU Keistimewaan",
    desc: "Pengakuan resmi atas status istimewa tata pemerintahan.",
  },
];
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      category="Sejarah"
      title="Merekam Jejak Waktu"
      description="Menelusuri linimasa sejarah, dari pendirian Kraton Yogyakarta hingga masa revolusi."
    />

    <div class="relative border-l border-line ml-3 pl-8 flex flex-col gap-10">
      <article v-for="(item, index) in items" :key="index" class="relative">
        <div
          class="absolute -left-[37px] top-1 w-[11px] h-[11px] bg-terra rounded-full border-2 border-warm-white"
        ></div>
        <div class="font-josefin text-[14px] font-light text-terra mb-2">
          {{ item.year }}
        </div>
        <h2 class="font-libre text-[22px] font-bold text-ink mb-2">
          {{ item.title }}
        </h2>
        <p
          class="text-[15px] font-light text-brown leading-[1.8] max-w-[600px]"
        >
          {{ item.desc }}
        </p>
      </article>
    </div>
  </main>
</template>
