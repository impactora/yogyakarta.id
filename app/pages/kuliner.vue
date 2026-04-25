<script setup lang="ts">
import { ref, computed } from "vue";
import { MapPin, Banknote } from "lucide-vue-next";

const categories = ["Semua", "Makanan Berat", "Cemilan", "Minuman"];
const activeCategory = ref("Semua");

const culinaryItems = [
  {
    title: "Gudeg Kraton",
    category: "Makanan Berat",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gudeg_Jogja.jpg",
    story:
      "Nangka muda direbus 12 jam dengan santan dan gula aren. Resep dapur abdi dalem yang tak berubah sejak abad ke-18.",
    meta: "Warisan Dapur Kerajaan",
    address: "Jl. Wijilan, Panembahan",
    price: "Rp 25.000 - 50.000",
    featured: true,
  },
  {
    title: "Oseng Mercon Bu Narti",
    category: "Makanan Berat",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Oseng_mercon.jpg",
    story:
      "Kikil dan kulit sapi ditumis dengan cabai rawit dalam jumlah industrial. Provokasi terhadap rasa manis-gurih.",
    meta: "Perlawanan Pedas",
    address: "Jl. KH. Ahmad Dahlan",
    price: "Rp 30.000 / Porsi",
    featured: false,
  },
  {
    title: "Sate Klathak",
    category: "Makanan Berat",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sate_Klathak.jpg",
    story:
      "Dua tusuk jeruji sepeda memastikan daging kambing matang merata. Hanya dibumbui garam kasar.",
    meta: "Minimalis Ekstrem",
    address: "Jl. Imogiri Timur, Bantul",
    price: "Rp 35.000 - 50.000",
    featured: false,
  },
  {
    title: "Sego Kucing Angkringan",
    category: "Makanan Berat",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Makanan_angkringan.jpg",
    story:
      "Nasi sekepal dengan sekuku bandeng. Bukan soal porsi, tapi kultur diskusi egaliter di bawah temaram lampu gerobak.",
    meta: "Kultur Egaliter",
    address: "Tersebar di seluruh sudut kota",
    price: "Rp 3.000 / Bungkus",
    featured: false,
  },
  {
    title: "Tiwul Gunungkidul",
    category: "Makanan Berat",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tiwul.JPG",
    story:
      "Substitusi beras dari singkong kering peninggalan masa paceklik, kini diangkat menjadi warisan kuliner otentik.",
    meta: "Penyintas Zaman",
    address: "Kabupaten Gunungkidul",
    price: "Rp 10.000 / Porsi",
    featured: false,
  },
  {
    title: "Bakpia Pathok 75",
    category: "Cemilan",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bakpia_Pathok.jpg",
    story:
      "Akulturasi kuliner Tionghoa-Jawa abad 20. Kulit tipis berlapis isi pasta kacang hijau kukus tradisional.",
    meta: "Akulturasi Budaya",
    address: "Kawasan Pathuk",
    price: "Rp 45.000 / Kotak",
    featured: false,
  },
  {
    title: "Jadah Tempe Mbah Carik",
    category: "Cemilan",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Jadah_tempe.jpg",
    story:
      "Kombinasi tak lazim ketan putih tumbuk bersanding tempe bacem. Camilan favorit Sultan HB IX saat menyepi ke lereng Merapi.",
    meta: "Camilan Monarki",
    address: "Kaliurang, Sleman",
    price: "Rp 15.000 / Paket",
    featured: false,
  },
  {
    title: "Kopi Joss Lek Man",
    category: "Minuman",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kopi_Joss.jpg",
    story:
      "Arang membara yang diceburkan memunculkan karbon aktif yang menetralkan asam lambung dan menciptakan aroma karamel.",
    meta: "Kimia Warung Angkringan",
    address: "Utara Stasiun Tugu",
    price: "Rp 8.000 / Gelas",
    featured: false,
  },
  {
    title: "Wedang Uwuh",
    category: "Minuman",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Wedang_Uwuh.jpg",
    story:
      "Campuran jahe bakar, kayu secang, cengkeh, dan pala yang tampak seperti reruntuhan dedaunan di dalam gelas.",
    meta: "Jamu dalam Cangkir",
    address: "Makam Raja Imogiri",
    price: "Rp 10.000 / Gelas",
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
          class="flex flex-col gap-3 pt-6 border-t border-line font-josefin text-[10px] tracking-[0.15em] text-muted"
        >
          <div class="flex items-center gap-3">
            <MapPin class="w-3 h-3 text-terra" /> {{ featuredItem.address }}
          </div>
          <div class="flex items-center gap-3">
            <Banknote class="w-3 h-3 text-terra" /> {{ featuredItem.price }}
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
        :aria-label="`Saring kategori kuliner ${cat}`"
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
          <p
            class="text-[14px] font-light text-brown leading-[1.8] flex-grow mb-6"
          >
            {{ item.story }}
          </p>

          <div
            class="pt-4 border-t border-line flex flex-col gap-3 font-josefin text-[9px] tracking-[0.15em] text-muted transition-colors duration-300"
          >
            <div class="flex items-center gap-3">
              <MapPin class="w-3 h-3 text-terra" /> {{ item.address }}
            </div>
            <div class="flex items-center gap-3">
              <Banknote class="w-3 h-3 text-terra" /> {{ item.price }}
            </div>
          </div>
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
