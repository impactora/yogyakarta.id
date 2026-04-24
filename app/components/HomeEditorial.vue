<script setup lang="ts">
const tourismStats = [
  {
    num: "5M",
    title: "Wisatawan Per Tahun",
    desc: "Yogyakarta adalah kota tujuan wisata kedua terbesar Indonesia, setelah Bali.",
  },
  {
    num: "4",
    title: "Situs Warisan UNESCO",
    desc: "Prambanan, Borobudur, Wayang Kulit, dan Batik — semua ada di Yogyakarta.",
  },
  {
    num: "21",
    title: "Perguruan Tinggi",
    desc: "Kota dengan rasio mahasiswa tertinggi di Indonesia — 1 dari 3 penduduk adalah pelajar.",
  },
];

const techStats = [
  {
    num: "732",
    title: "Tahun Pertama Dicatat",
    desc: "Prasasti Canggal adalah dokumen tertulis paling tua tentang peradaban di dataran ini.",
  },
  {
    num: "300+",
    title: "Startup Aktif",
    desc: "Ekosistem digital yang tumbuh pesat, didukung talent pool universitas terbesar Asia Tenggara.",
  },
  {
    num: "87%",
    title: "Penetrasi Internet",
    desc: "Kota istimewa yang juga menjadi kota paling terhubung secara digital di Jawa Tengah.",
  },
];
</script>

<template>
  <section
    class="relative z-10 px-5 py-10 pb-32 md:px-6 lg:px-[60px] lg:pt-[140px] lg:pb-[200px]"
  >
    <div class="mb-10 lg:mb-16">
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-4"
      >
        Laporan Utama
      </div>
      <h2
        class="font-libre text-[clamp(32px,3vw,44px)] font-bold leading-[1.2] text-ink max-w-[600px]"
      >
        Kota yang Menjaga Masa Lalu,
        <em class="italic text-terra">Membangun Masa Depan</em>
      </h2>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-[2fr_1px_1fr_1px_1fr] gap-10 lg:gap-x-12 lg:gap-y-0"
    >
      <div>
        <span
          class="inline-block font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-warm-white bg-terra py-[5px] px-3 mb-5"
          >Sejarah</span
        >
        <h3
          class="font-libre text-[24px] lg:text-[28px] font-bold leading-[1.25] text-ink mb-4"
        >
          1.200 Tahun Belum Cukup untuk
          <em class="italic text-terra">Mengenal Jogja</em>
        </h3>
        <p
          class="text-[14px] lg:text-[15px] font-light text-brown leading-[1.8] lg:leading-[1.9] mb-6"
        >
          Dari prasasti Canggal 732 Masehi hingga UU Keistimewaan 2012,
          Yogyakarta telah melewati lebih banyak babak sejarah daripada yang
          bisa dirangkum dalam satu perjalanan.
          <strong class="font-bold text-ink"
            >Prambanan berdiri sejak 856 Masehi</strong
          >, Keraton Yogyakarta dibangun 1755, dan kota ini sempat menjadi
          ibukota Republik Indonesia saat Jakarta jatuh ke tangan Belanda.
        </p>
        <p
          class="text-[14px] lg:text-[15px] font-light text-brown leading-[1.8] lg:leading-[1.9] mb-6"
        >
          Yang luar biasa bukan hanya sejarahnya — tapi bagaimana sejarah itu
          terus hadir dalam kehidupan sehari-hari warganya. Sultan masih
          bertakhta, upacara keraton masih dijalankan, dan poros kosmologis
          Merapi–Keraton–Pantai Selatan masih menjadi pegangan spiritual jutaan
          orang.
        </p>
        <NuxtLink
          to="#"
          class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra flex items-center gap-[10px] after:content-['→'] after:text-[14px]"
          >Baca Selengkapnya</NuxtLink
        >
      </div>

      <div class="hidden lg:block bg-line"></div>

      <div class="flex flex-col gap-6 lg:gap-9">
        <div
          v-for="stat in tourismStats"
          :key="stat.title"
          class="pb-6 lg:pb-9 border-b border-line last:border-b-0 last:pb-0"
        >
          <div
            class="font-josefin text-[32px] font-light text-terra/50 leading-none mb-2"
          >
            {{ stat.num }}
          </div>
          <div class="font-libre text-[15px] font-bold text-ink mb-[6px]">
            {{ stat.title }}
          </div>
          <div class="text-[12px] font-light text-muted leading-[1.7]">
            {{ stat.desc }}
          </div>
        </div>
      </div>

      <div class="hidden lg:block bg-line"></div>

      <div class="flex flex-col gap-6 lg:gap-9">
        <div
          v-for="stat in techStats"
          :key="stat.title"
          class="pb-6 lg:pb-9 border-b border-line last:border-b-0 last:pb-0"
        >
          <div
            class="font-josefin text-[32px] font-light text-terra/50 leading-none mb-2"
          >
            {{ stat.num }}
          </div>
          <div class="font-libre text-[15px] font-bold text-ink mb-[6px]">
            {{ stat.title }}
          </div>
          <div class="text-[12px] font-light text-muted leading-[1.7]">
            {{ stat.desc }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
