<script setup lang="ts">
const initiatives = [
  {
    id: "ugm-dteti",
    meta: "Pusat Riset & Talent",
    title: "Ekosistem Riset UGM–ITY",
    desc: "Konsorsium 21 perguruan tinggi Yogyakarta menghasilkan estimasi 110.000 lulusan per tahun per 2025. Departemen Teknik UGM dan IST Akprind menjadi penyuplai utama engineer AI dan embedded systems.",
  },
  {
    id: "silicon-wali",
    meta: "Klaster Industri Digital",
    title: "Silicon Wali — Koridor Startup",
    desc: "Koridor Ringroad Utara menampung lebih dari 340 startup aktif per 2025, dari studio game indie hingga perusahaan SaaS B2B yang menembus pasar ASEAN. Biaya operasional 60% di bawah Jakarta.",
  },
  {
    id: "gdp-labs",
    meta: "Inkubator & Akselerator",
    title: "GDP Labs & StartupLokal Jogja",
    desc: "GDP Labs Yogyakarta beroperasi sebagai lab R&D produk yang men-spin-off beberapa produk SaaS berskala nasional. Komunitas StartupLokal mengadakan lebih dari 200 event per tahun.",
  },
  {
    id: "ndc-2026",
    meta: "Infrastruktur Kota",
    title: "Nusantara Digital City 2026",
    desc: "Cetak biru integrasi 1.200 sensor IoT untuk manajemen lalu lintas adaptif dan sistem peringatan dini erupsi Merapi berbasis machine learning — didesain tanpa menyentuh satu pun fasad cagar budaya.",
  },
  {
    id: "jogjamark",
    meta: "Ekosistem Kreatif",
    title: "Jogja Creative District",
    desc: "Kawasan Prawirotaman bertransformasi menjadi distrik hybrid: butik desainer lokal, studio animasi, co-working space, dan galeri NFT beroperasi dalam satu blok.",
  },
];
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      category="Teknologi"
      title="Lompatan Digital"
      description="Infrastruktur pendidikan tinggi, ekosistem startup 'Silicon Wali', dan cetak biru smart city masa depan."
    />

    <section
      class="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 lg:gap-6"
    >
      <div
        v-observe
        class="lg:col-span-2 bg-ink p-10 lg:p-14 flex flex-col justify-between group transition-colors duration-500 hover:bg-ink/90 reveal-up"
      >
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-terra mb-12"
        >
          Talent Pool
        </div>
        <div>
          <div
            class="font-libre text-[64px] lg:text-[96px] font-bold text-parchment leading-none mb-4 group-hover:text-terra transition-colors duration-500"
          >
            100K+
          </div>
          <div
            class="font-libre text-[20px] lg:text-[24px] text-parchment/80 mb-4"
          >
            Lulusan STEM per Tahun
          </div>
          <p
            class="text-[14px] text-parchment/50 font-light leading-[1.8] max-w-[450px]"
          >
            Kota Pelajar bukan sekadar julukan sejarah. Ini adalah mesin
            pencetak engineer dan inovator teknologi terbesar di Asia Tenggara
            di luar Jakarta.
          </p>
        </div>
      </div>

      <div
        v-observe
        class="bg-terra p-10 lg:p-14 flex flex-col justify-between group reveal-up delay-100"
      >
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-ink mb-12"
        >
          Konektivitas
        </div>
        <div>
          <div
            class="font-libre text-[64px] lg:text-[80px] font-bold text-warm-white leading-none mb-4 group-hover:text-ink transition-colors duration-500"
          >
            87%
          </div>
          <div class="font-libre text-[18px] text-warm-white/90 leading-[1.4]">
            Penetrasi Internet<br /><span
              class="text-[13px] font-lato font-light text-warm-white/70"
              >Tertinggi di Jawa Tengah</span
            >
          </div>
        </div>
      </div>

      <div
        v-observe
        class="bg-line p-10 lg:p-12 flex flex-col justify-between reveal-up delay-200"
      >
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-muted mb-12"
        >
          Infrastruktur
        </div>
        <div>
          <div
            class="font-libre text-[40px] font-bold text-ink leading-none mb-4"
          >
            300+
          </div>
          <div class="font-libre text-[18px] text-ink/80 mb-3">
            Startup Aktif
          </div>
          <p class="text-[13px] text-brown font-light leading-[1.6]">
            Berkembang organik dari studio game indie hingga perusahaan
            multinasional.
          </p>
        </div>
      </div>

      <div
        v-observe
        class="lg:col-span-2 border border-line p-10 lg:p-12 flex flex-col justify-center reveal-up delay-300"
      >
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-terra mb-6"
        >
          Paradigma Baru
        </div>
        <h3
          class="font-libre text-[24px] lg:text-[32px] font-bold text-ink leading-[1.3] max-w-[600px]"
        >
          "Membangun ekosistem teknologi bukan berarti menghapus budaya. Di
          Jogja, *coding* dan gamelan berbagi ruang frekuensi yang sama."
        </h3>
      </div>
    </section>

    <section
      class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-10 border-t border-line"
    >
      <article
        v-for="(item, index) in initiatives"
        :key="item.id"
        v-observe
        class="flex flex-col reveal-up"
        :style="`transition-delay: ${(index % 3) * 100}ms`"
      >
        <div class="h-[2px] w-8 bg-terra mb-6"></div>
        <div
          class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-3"
        >
          {{ item.meta }}
        </div>
        <h3 class="font-libre text-[22px] font-bold text-ink mb-4">
          {{ item.title }}
        </h3>
        <p class="text-[15px] font-light text-brown leading-[1.8]">
          {{ item.desc }}
        </p>
      </article>
    </section>
  </main>
</template>
