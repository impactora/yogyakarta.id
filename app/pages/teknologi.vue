<script setup lang="ts">
const initiatives = [
  {
    id: "ugm-dteti",
    meta: "Pusat Riset & Talent",
    title: "Konsorsium Riset Pendidikan Tinggi",
    desc: "21 perguruan tinggi Yogyakarta berkolaborasi menghasilkan puluhan ribu lulusan per tahun. Penyuplai utama talenta engineer untuk industri teknologi nasional.",
  },
  {
    id: "silicon-wali",
    meta: "Klaster Industri Digital",
    title: "Silicon Wali — Koridor Ringroad Utara",
    desc: "Jalur ekosistem yang menampung ratusan startup aktif, membentang dari studio game indie kelas dunia hingga perusahaan SaaS B2B berskala enterprise.",
  },
  {
    id: "block71",
    meta: "Inkubator & Akselerator",
    title: "Block71 & Ekosistem Komunitas",
    desc: "Pusat inkubasi kolaborasi NUS Enterprise yang menghubungkan inovator lokal dengan pasar global. Didukung lebih dari 200 event tech komunitas per tahun.",
  },
  {
    id: "jogja-smart-province",
    meta: "Infrastruktur Kota",
    title: "Jogja Smart Province (JSP)",
    desc: "Cetak biru digitalisasi layanan publik, integrasi sensor IoT mitigasi bencana Merapi, dan manajemen data presisi untuk tata kelola wilayah.",
  },
  {
    id: "jogjamark",
    meta: "Ekosistem Kreatif",
    title: "Jogja Creative District",
    desc: "Transformasi spasial kawasan selatan menjadi distrik hybrid: butik desainer lokal, studio animasi internasional, dan co-working space 24 jam.",
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
      description="Infrastruktur pendidikan tinggi, ekosistem startup 'Silicon Wali', dan cetak biru tata kota cerdas masa depan."
    />

    <div
      v-observe
      class="w-full h-[30vh] lg:h-[40vh] mt-10 mb-16 relative overflow-hidden reveal-up delay-100 border border-line shadow-xl"
    >
      <img
        src="https://commons.wikimedia.org/wiki/Special:FilePath/Gedung_Pusat_(Rektorat)_UGM.jpg"
        alt="Pusat Pendidikan UGM"
        class="w-full h-full object-cover grayscale-[20%] opacity-90"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent"
      ></div>
      <div class="absolute bottom-6 left-6 z-20">
        <div
          class="font-josefin text-[9px] tracking-[0.2em] text-terra uppercase mb-2"
        >
          Simpul Ekosistem
        </div>
        <div class="font-libre text-[20px] text-parchment">
          Universitas Gadjah Mada
        </div>
      </div>
    </div>

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
            Lulusan STEM Berkualitas
          </div>
          <p
            class="text-[14px] text-parchment/50 font-light leading-[1.8] max-w-[450px] mb-4"
          >
            Kota Pelajar bukan sekadar julukan. Ini adalah mesin pencetak
            engineer dan inovator teknologi terbesar di Indonesia di luar
            ibukota.
          </p>
          <div
            class="font-josefin text-[9px] text-white/30 uppercase tracking-widest border-t border-white/10 pt-4 mt-4 inline-block"
          >
            *Estimasi kumulatif konsorsium PTN/PTS (BPS)
          </div>
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
          <div
            class="font-libre text-[18px] text-warm-white/90 leading-[1.4] mb-4"
          >
            Penetrasi Internet
          </div>
          <div
            class="font-josefin text-[9px] text-ink/60 uppercase tracking-widest border-t border-ink/20 pt-4 mt-4"
          >
            *Data Indeks Penetrasi APJII Wilayah DIY
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
          Infrastruktur Bisnis
        </div>
        <div>
          <div
            class="font-libre text-[40px] font-bold text-ink leading-none mb-4"
          >
            300+
          </div>
          <div class="font-libre text-[18px] text-ink/80 mb-3">
            Startup & Studio Aktif
          </div>
          <p class="text-[13px] text-brown font-light leading-[1.6] mb-4">
            Berkembang organik dengan efisiensi modal yang tinggi.
          </p>
          <div
            class="font-josefin text-[9px] text-ink/50 uppercase tracking-widest border-t border-ink/10 pt-4 mt-4"
          >
            *Data Kurasi Diskominfo DIY
          </div>
        </div>
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
