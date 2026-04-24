<script setup lang="ts">
import { ref, computed } from "vue";

const categories = ["Semua", "Makanan Berat", "Cemilan", "Minuman"];
const activeCategory = ref("Semua");

const culinaryItems = [
  {
    title: "Gudeg Jogja",
    category: "Makanan Berat",
    story:
      "Lahir dari dapur prajurit Mataram abad ke-16, Gudeg adalah manifestasi kesabaran. Nangka muda dimasak perlahan dalam kuali tanah liat selama belasan jam hingga mencapai karamelisasi sempurna tanpa pemanis buatan berlebih.",
    meta: "Resep Warisan Sesuai Musim",
    featured: true,
  },
  {
    title: "Bakpia Pathok",
    category: "Cemilan",
    story:
      "Hasil akulturasi budaya Tionghoa dan lokal, Bakpia menjadi ikon yang berevolusi dari isi kacang hijau hingga varian modern.",
    meta: "Akulturasi Budaya",
    featured: false,
  },
  {
    title: "Kopi Joss",
    category: "Minuman",
    story:
      "Arang membara yang dicelupkan bukan sekadar atraksi, melainkan penetralisir kafein yang menciptakan aroma karamel unik.",
    meta: "Kultur Angkringan",
    featured: false,
  },
  {
    title: "Oseng Mercon",
    category: "Makanan Berat",
    story:
      "Antitesis dari citarasa manis Jogja, Oseng Mercon adalah ledakan pedas yang lahir di akhir era 90-an sebagai inovasi kuliner jalanan.",
    meta: "Kontemporer Pedas",
    featured: false,
  },
  {
    title: "Wedang Ronde",
    category: "Minuman",
    story:
      "Minuman penghangat malam yang memadukan jahe pedas dengan kenyalnya bola-bola ketan isi kacang.",
    meta: "Tradisi Penghangat",
    featured: false,
  },
];

// Computed property to handle reactive filtering logic
const filteredItems = computed(() => {
  if (activeCategory.value === "Semua")
    return culinaryItems.filter((i) => !i.featured);
  return culinaryItems.filter(
    (i) => i.category === activeCategory.value && !i.featured,
  );
});

const featuredItem = culinaryItems.find((i) => i.featured);
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10"
  >
    <CategoryHeader
      category="Kuliner"
      title="Simfoni Rasa Manis & Gurih"
      description="Eksplorasi gastronomi lokal. Cerita kesabaran di balik setiap hidangan yang menjadi identitas Yogyakarta."
    />

    <section
      v-if="featuredItem"
      class="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
    >
      <div class="aspect-video bg-ink relative overflow-hidden group">
        <div
          class="absolute inset-0 bg-parchment/5 group-hover:bg-transparent transition-colors duration-500"
        ></div>
        <div
          class="absolute inset-0 flex items-center justify-center font-libre italic text-white/20 text-4xl"
        >
          Featured
        </div>
      </div>
      <div>
        <div
          class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-4"
        >
          {{ featuredItem.meta }}
        </div>
        <h2
          class="font-libre text-[32px] lg:text-[44px] font-bold text-ink mb-6"
        >
          {{ featuredItem.title }}
        </h2>
        <p class="text-[16px] font-light text-brown leading-[1.9] mb-6 italic">
          "{{ featuredItem.story }}"
        </p>
        <div
          class="inline-block px-4 py-1 border border-terra text-terra font-josefin text-[9px] uppercase tracking-[0.2em]"
        >
          Cerita Utama
        </div>
      </div>
    </section>

    <div class="mb-12 flex flex-wrap gap-4 border-b border-line pb-8">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 px-4 py-2"
        :class="
          activeCategory === cat
            ? 'bg-terra text-warm-white'
            : 'text-muted hover:text-terra'
        "
      >
        {{ cat }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      <transition-group name="list">
        <article v-for="item in filteredItems" :key="item.title" class="group">
          <div
            class="h-[200px] bg-line mb-6 transition-colors group-hover:bg-line/50"
          ></div>
          <div
            class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-3"
          >
            {{ item.category }} · {{ item.meta }}
          </div>
          <h3 class="font-libre text-[20px] font-bold text-ink mb-3">
            {{ item.title }}
          </h3>
          <p class="text-[14px] font-light text-brown leading-[1.7]">
            {{ item.story }}
          </p>
        </article>
      </transition-group>
    </div>
  </main>
</template>

<style scoped>
/* Smooth transition for category switching */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
