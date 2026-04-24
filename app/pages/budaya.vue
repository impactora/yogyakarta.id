<script setup lang="ts">
// Data structure accommodates an alternating zigzag editorial layout
const culturalHeritage = [
  {
    id: "batik",
    category: "Seni Kriya",
    title: "Mahakarya Batik",
    subtitle: "Lukisan Malam di Atas Lembaran Waktu",
    description:
      "Batik bukan sekadar corak pakaian, melainkan doa dan filosofi yang digoreskan menggunakan malam (lilin). Motif Parang melambangkan ketangguhan ombak laut selatan, sementara Kawung mengingatkan manusia akan asal-usulnya.",
    highlights: ["Filosofi Parang", "Teknik Canting", "Pewarna Alami"],
    reverse: false,
  },
  {
    id: "wayang",
    category: "Seni Pertunjukan",
    title: "Bayang Wayang Kulit",
    subtitle: "Refleksi Moral dan Spiritualitas",
    description:
      "Melalui lakon epik Mahabharata dan Ramayana, sang Dalang menghidupkan lembaran kulit kerbau. Ini adalah medium penyebaran nilai moral, diiringi magisnya tembang dan pendaran lampu blencong di layar kelir.",
    highlights: ["Peran Dalang", "Epik Ramayana", "Layar Kelir"],
    reverse: true,
  },
  {
    id: "gamelan",
    category: "Pusaka Bunyi",
    title: "Harmoni Gamelan",
    subtitle: "Keselarasan dalam Keberagaman Nada",
    description:
      "Ansambel musik tradisional ini tidak menonjolkan instrumen tunggal secara egois, melainkan harmoni komunal. Ketukan Bonang, irama Saron, dan dengung Gong berpadu menciptakan gelombang spiritual yang mendalam.",
    highlights: ["Laras Slendro", "Laras Pelog", "Gong Ageng"],
    reverse: false,
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
      description="Visualisasi mahakarya warisan budaya yang terus hidup dalam keseharian warganya."
    />

    <div class="flex flex-col gap-20 lg:gap-32 mt-10">
      <article
        v-for="(item, index) in culturalHeritage"
        :key="item.id"
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
      >
        <div
          class="relative aspect-[4/5] md:aspect-video lg:aspect-[4/5] bg-ink group overflow-hidden"
          :class="item.reverse ? 'lg:order-2' : 'lg:order-1'"
        >
          <div
            class="absolute inset-0 bg-parchment/5 transition-colors duration-700 group-hover:bg-transparent"
          ></div>

          <div
            class="absolute inset-x-10 inset-y-12 border border-white/10 flex items-center justify-center"
          >
            <div class="text-center">
              <div
                class="font-josefin text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2"
              >
                Visual Asset
              </div>
              <div class="font-libre text-[24px] italic text-white/50">
                {{ item.title }}
              </div>
            </div>
          </div>

          <div
            class="absolute bottom-6 right-6 font-josefin text-[8px] tracking-[0.2em] text-white/30 uppercase"
          >
            Fig. {{ String(index + 1).padStart(2, "0") }}
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
