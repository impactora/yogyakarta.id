<script setup lang="ts">
import { ref, computed } from "vue";

const categories = ["Semua", "Makanan Berat", "Cemilan", "Minuman"];
const activeCategory = ref("Semua");

const culinaryItems = [
  {
    title: "Gudeg Kraton",
    category: "Makanan Berat",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gudeg_Jogja.jpg",
    story:
      "Nangka muda direbus 12 jam dengan santan dan gula aren hingga menghasilkan karamelisasi alami berwarna cokelat tua. Resep dapur abdi dalem yang tak berubah sejak abad ke-18.",
    meta: "Warisan Dapur Kerajaan",
    featured: true,
  },
  {
    title: "Oseng Mercon Bu Narti",
    category: "Makanan Berat",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Oseng_mercon.jpg",
    story:
      "Lahir di Jalan Kranggan pada 1998 — kikil dan kulit sapi ditumis dengan cabai rawit dalam jumlah industrial. Ini provokasi terhadap manis-gurih dominan Yogyakarta.",
    meta: "Perlawanan Pedas",
    featured: false,
  },
  {
    title: "Sate Klathak",
    category: "Makanan Berat",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sate_Klathak.jpg",
    story:
      "Dua tusuk jeruji sepeda memastikan daging kambing matang dari dalam ke luar secara merata. Hanya garam kasar. Teknik memasak yang menolak kompromi rasa.",
    meta: "Minimalis Ekstrem",
    featured: false,
  },
  {
    title: "Bakpia Pathok 75",
    category: "Cemilan",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bakpia_Pathok.jpg",
    story:
      "Akulturasi kuliner Tionghoa-Jawa yang lahir di Kampung Pathok. Kulit tipis berlapis isi pasta kacang hijau kukus yang beradaptasi dengan lidah lokal selama tiga generasi.",
    meta: "Akulturasi Budaya",
    featured: false,
  },
  {
    title: "Kopi Joss Lek Man",
    category: "Minuman",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kopi_Joss.jpg",
    story:
      "Arang membara yang diceburkan bukan gimmick; karbon aktif menetralkan asam lambung dan menciptakan aroma karamel yang tak bisa direplikasi oleh mesin espresso manapun.",
    meta: "Kimia Warung Angkringan",
    featured: false,
  },
  {
    title: "Wedang Uwuh",
    category: "Minuman",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Wedang_Uwuh.jpg",
    story:
      "Literalmente berarti 'minuman sampah' — campuran jahe bakar, kayu secang, cengkeh, kayu manis, dan pala yang tampak seperti reruntuhan rempah di dalam gelas.",
    meta: "Jamu dalam Cangkir",
    featured: false,
  },
  {
    title: "Mangut Lele Mbah Marto",
    category: "Makanan Berat",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mangut_lele.jpg",
    story:
      "Lele asap dimasak dalam santan pedas dengan serai dan daun salam di tungku kayu — metode yang menciptakan lapisan rasa smoky yang tidak bisa ditiru kompor gas.",
    meta: "Slow Food Selatan Jogja",
    featured: false,
  },
];

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
      v-observe
      class="reveal-up"
      category="Kuliner"
      title="Simfoni Rasa Manis & Gurih"
      description="Eksplorasi gastronomi lokal. Cerita kesabaran di balik setiap hidangan yang menjadi identitas Yogyakarta."
    />

    <section
      v-if="featuredItem"
      v-observe
      class="mt-10 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center reveal-up delay-100"
    >
      <div
        class="aspect-[4/3] lg:aspect-video bg-ink relative overflow-hidden group shadow-xl border border-line"
      >
        <img
          :src="featuredItem.image"
          :alt="featuredItem.title"
          class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 z-10"
        ></div>
        <div
          class="absolute top-4 left-4 z-20 font-josefin text-[9px] uppercase tracking-widest text-white/90 bg-ink/80 backdrop-blur-sm px-3 py-1 border border-white/10"
        >
          Khas Mataram
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div
          class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-4"
        >
          {{ featuredItem.meta }}
        </div>
        <h2
          class="font-libre text-[32px] lg:text-[44px] font-bold text-ink mb-6 leading-[1.15]"
        >
          {{ featuredItem.title }}
        </h2>
        <p
          class="text-[16px] font-light text-brown leading-[1.9] mb-8 italic border-l-2 border-terra pl-5"
        >
          "{{ featuredItem.story }}"
        </p>

        <div
          class="flex flex-col gap-2 pt-6 border-t border-line font-josefin text-[11px] tracking-[0.1em] text-muted"
        >
          <div class="flex items-center gap-3">
            <span class="text-terra">📍</span> Wijilan, Kota Yogyakarta
          </div>
          <div class="flex items-center gap-3">
            <span class="text-terra">⏰</span> 06.00 - 21.00 WIB
          </div>
        </div>
      </div>
    </section>

    <div
      v-observe
      class="mb-12 flex flex-wrap gap-4 border-b border-line pb-8 reveal-up delay-200"
    >
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 px-5 py-3 border border-transparent cursor-pointer"
        :class="
          activeCategory === cat
            ? 'bg-terra text-warm-white shadow-md'
            : 'text-muted hover:border-line hover:text-ink'
        "
      >
        {{ cat }}
      </button>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
    >
      <transition-group name="list">
        <article
          v-for="item in filteredItems"
          :key="item.title"
          class="group flex flex-col h-full"
        >
          <div
            class="h-[240px] bg-ink mb-6 overflow-hidden relative border border-line shadow-sm"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-500"
            ></div>
          </div>

          <div
            class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-3 flex items-center gap-2"
          >
            {{ item.category }} <span class="text-line">|</span> {{ item.meta }}
          </div>

          <h3
            class="font-libre text-[22px] font-bold text-ink mb-3 group-hover:text-terra transition-colors duration-300"
          >
            {{ item.title }}
          </h3>

          <p class="text-[14px] font-light text-brown leading-[1.8] flex-grow">
            {{ item.story }}
          </p>
        </article>
      </transition-group>
    </div>
  </main>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
</style>
