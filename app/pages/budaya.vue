<script setup lang="ts">
const culturalHeritage = [
  {
    id: "batik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Batik_Tulis.jpg",
    category: "Seni Kriya · UNESCO 2009",
    title: "Filosofi Batik Kraton",
    subtitle: "Doa yang Digoreskan di Atas Lembaran Kain",
    description:
      "Bukan sekadar motif — setiap goresan canting membawa muatan kosmologi Jawa. Motif Parang Rusak dilarang dikenakan rakyat biasa di era Mataram; Kawung menyimbolkan empat arah mata angin dan sumber kehidupan semesta.",
    highlights: [
      "Motif Larangan Keraton",
      "Teknik Tulis vs Cap",
      "Pewarna Soga Alami",
    ],
    reverse: false,
  },
  {
    id: "wayang-kulit",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Wayang_kulit.jpg",
    category: "Seni Pertunjukan · UNESCO 2003",
    title: "Wayang Kulit Purwa",
    subtitle: "Bayangan yang Lebih Nyata dari Realita",
    description:
      "Lakon berlangsung 8 jam tanpa jeda, dari senja hingga fajar. Dalang adalah satu-satunya seniman dunia yang sekaligus menjadi sutradara, aktor 200 karakter, komposer, dan filsuf — sendirian, dalam satu malam.",
    highlights: [
      "Pakeliran Semalam Suntuk",
      "Gunungan sebagai Aksis Kosmis",
      "Sulukan & Antawecana",
    ],
    reverse: true,
  },
  {
    id: "gamelan",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gamelan_Jawa.jpg",
    category: "Pusaka Bunyi · UNESCO 2021",
    title: "Gamelan Kraton Yogyakarta",
    subtitle: "Demokrasi Suara yang Berusia Sepuluh Abad",
    description:
      "Tidak ada instrumen prima donna dalam gamelan — sebuah antitesis dari orkestra Barat. Dua perangkat gamelan pusaka Kraton, Kyai Gunturmadu dan Kyai Nagawilaga, hanya dimainkan pada upacara Sekaten setiap Maulid Nabi.",
    highlights: [
      "Laras Pélog & Sléndro",
      "Kyai Gunturmadu (Pusaka)",
      "Irama Lancaran hingga Ketawang",
    ],
    reverse: false,
  },
  {
    id: "arsitektur-keraton",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kraton_Yogyakarta.jpg",
    category: "Arsitektur Tradisional",
    title: "Tata Ruang Keraton Ngayogyakarta",
    subtitle: "Kota di Dalam Kota yang Dirancang Bersama Semesta",
    description:
      "Sumbu filosofi Yogyakarta — Gunung Merapi, Tugu, Keraton, Panggung Krapyak, Pantai Parangtritis — bukan kebetulan geografis. Ini adalah mandala kosmologis yang direncanakan Sultan HB I sebagai satu sistem tata makna.",
    highlights: [
      "Sumbu Filosofis 33 km",
      "Bangsal Kencana & Siti Hinggil",
      "Konsep Hamemayu Hayuning Bawana",
    ],
    reverse: true,
  },
];
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      category="Budaya"
      title="Denyut Nadi Tradisi"
      description="Visualisasi mahakarya warisan budaya yang terus hidup dalam keseharian warganya."
    />

    <div class="flex flex-col gap-20 lg:gap-32 mt-10">
      <article
        v-for="(item, index) in culturalHeritage"
        :key="item.id"
        v-observe
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center reveal-up"
        :style="`transition-delay: ${index * 100}ms`"
      >
        <div
          class="relative aspect-[4/5] md:aspect-video lg:aspect-[4/5] bg-ink group overflow-hidden border border-line"
          :class="item.reverse ? 'lg:order-2' : 'lg:order-1'"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-parchment/5 transition-colors duration-700 group-hover:bg-transparent z-10"
          ></div>
          <div
            class="absolute bottom-4 left-4 z-20 font-josefin text-[8px] tracking-[0.2em] text-white/70 uppercase bg-ink/80 backdrop-blur-sm px-3 py-1 border border-white/10"
          >
            Arsip Kebudayaan · 2026
          </div>
        </div>

        <div
          class="flex flex-col justify-center"
          :class="item.reverse ? 'lg:order-1' : 'lg:order-2'"
        >
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-5"
          >
            {{ item.category }}
          </div>
          <h2
            class="font-libre text-[32px] lg:text-[44px] font-bold text-ink leading-[1.1] mb-4"
          >
            {{ item.title }}
          </h2>
          <h3 class="font-libre text-[16px] italic text-muted mb-8">
            {{ item.subtitle }}
          </h3>
          <p
            class="text-[15px] font-light text-brown leading-[1.9] mb-10 max-w-[500px]"
          >
            {{ item.description }}
          </p>
          <ul class="flex flex-col gap-4 border-l border-line pl-6">
            <li
              v-for="highlight in item.highlights"
              :key="highlight"
              class="font-josefin text-[11px] font-semibold tracking-[0.15em] uppercase text-ink flex items-center gap-4 before:content-[''] before:block before:w-3 before:h-[1px] before:bg-terra"
            >
              {{ highlight }}
            </li>
          </ul>
        </div>
      </article>
    </div>
  </main>
</template>
