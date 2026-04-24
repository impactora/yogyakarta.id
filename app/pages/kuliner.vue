<script setup lang="ts">
import { ref, computed } from "vue";

const categories = ["Semua", "Makanan Berat", "Cemilan", "Minuman"];
const activeCategory = ref("Semua");

const culinaryItems = [
  {
    title: "Gudeg Kraton",
    category: "Makanan Berat",
    story:
      "Nangka muda direbus 12 jam dengan santan, gula aren, dan daun jati hingga menghasilkan karamelisasi alami berwarna cokelat tua. Resep dapur abdi dalem yang tak berubah sejak abad ke-18.",
    meta: "Warisan Dapur Kerajaan",
    featured: true,
  },
  {
    title: "Oseng Mercon Bu Narti",
    category: "Makanan Berat",
    story:
      "Lahir di Jalan Kranggan pada 1998 — kikil dan kulit sapi ditumis dengan cabai rawit dalam jumlah industrial. Bukan hidangan musiman; ini provokasi terhadap manis-gurih dominan Yogyakarta.",
    meta: "Perlawanan Pedas",
    featured: false,
  },
  {
    title: "Sate Klathak",
    category: "Makanan Berat",
    story:
      "Dua tusuk jeruji sepeda bukan estetika — konduktivitas besi memastikan daging kambing matang dari dalam ke luar secara merata. Hanya garam kasar. Teknik memasak yang menolak kompromi rasa.",
    meta: "Minimalis Ekstrem",
    featured: false,
  },
  {
    title: "Bakpia Pathok 75",
    category: "Cemilan",
    story:
      "Akulturasi kuliner Tionghoa-Jawa yang lahir di Kampung Pathok abad ke-20. Kulit tipis berlapis isi pasta kacang hijau kukus — evolusi dari moon cake yang beradaptasi dengan lidah lokal selama tiga generasi.",
    meta: "Akulturasi Lintas Budaya",
    featured: false,
  },
  {
    title: "Kopi Joss Lek Man",
    category: "Minuman",
    story:
      "Arang membara yang diceburkan bukan gimmick; karbon aktif menetralkan asam lambung dan menciptakan aroma karamel yang tak bisa direplikasi oleh mesin espresso manapun. Angkringan depan Stasiun Tugu sejak 1960-an.",
    meta: "Kimia Warung Angkringan",
    featured: false,
  },
  {
    title: "Wedang Uwuh",
    category: "Minuman",
    story:
      "Literalmente berarti 'minuman sampah' — campuran jahe bakar, kayu secang, cengkeh, kayu manis, dan pala yang tampak seperti reruntuhan rempah di dalam gelas. Minuman anti-inflamasi yang mendahului tren wellness global.",
    meta: "Jamu dalam Cangkir",
    featured: false,
  },
  {
    title: "Mangut Lele Mbah Marto",
    category: "Makanan Berat",
    story:
      "Lele asap dimasak dalam santan pedas dengan serai dan daun salam di tungku kayu — metode yang menciptakan lapisan rasa smoky yang tidak bisa ditiru kompor gas. Warung di Imogiri yang antreannya dimulai pukul 10 pagi.",
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
      class="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center reveal-up delay-100"
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

    <div
      v-observe
      class="mb-12 flex flex-wrap gap-4 border-b border-line pb-8 reveal-up delay-200"
    >
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
        <article
          v-for="(item, index) in filteredItems"
          :key="item.title"
          v-observe
          class="group reveal-up"
          :style="`transition-delay: ${(index % 3) * 100}ms`"
        >
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
