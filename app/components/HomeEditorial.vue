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
  <section class="editorial">
    <div class="editorial-header">
      <div class="editorial-label">Laporan Utama</div>
      <h2 class="editorial-title">
        Kota yang Menjaga Masa Lalu, <em>Membangun Masa Depan</em>
      </h2>
    </div>

    <div class="mag-grid">
      <div class="mag-lead">
        <span class="mag-lead-tag">Sejarah</span>
        <h3 class="mag-lead-title">
          1.200 Tahun Belum Cukup untuk <em>Mengenal Jogja</em>
        </h3>
        <p class="mag-lead-body">
          Dari prasasti Canggal 732 Masehi hingga UU Keistimewaan 2012,
          Yogyakarta telah melewati lebih banyak babak sejarah daripada yang
          bisa dirangkum dalam satu perjalanan.
          <strong>Prambanan berdiri sejak 856 Masehi</strong>, Keraton
          Yogyakarta dibangun 1755, dan kota ini sempat menjadi ibukota Republik
          Indonesia saat Jakarta jatuh ke tangan Belanda.
        </p>
        <p class="mag-lead-body">
          Yang luar biasa bukan hanya sejarahnya — tapi bagaimana sejarah itu
          terus hadir dalam kehidupan sehari-hari warganya. Sultan masih
          bertakhta, upacara keraton masih dijalankan, dan poros kosmologis
          Merapi–Keraton–Pantai Selatan masih menjadi pegangan spiritual jutaan
          orang.
        </p>
        <NuxtLink to="#" class="mag-read-more">Baca Selengkapnya</NuxtLink>
      </div>

      <div class="mag-divider"></div>

      <div class="mag-side">
        <div
          v-for="stat in tourismStats"
          :key="stat.title"
          class="mag-side-item"
        >
          <div class="mag-side-num">{{ stat.num }}</div>
          <div class="mag-side-title">{{ stat.title }}</div>
          <div class="mag-side-desc">{{ stat.desc }}</div>
        </div>
      </div>

      <div class="mag-divider"></div>

      <div class="mag-side">
        <div v-for="stat in techStats" :key="stat.title" class="mag-side-item">
          <div class="mag-side-num">{{ stat.num }}</div>
          <div class="mag-side-title">{{ stat.title }}</div>
          <div class="mag-side-desc">{{ stat.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.editorial {
  padding: 80px 60px 120px;
  position: relative;
  z-index: 1;
}
.editorial-header {
  margin-bottom: 64px;
}
.editorial-label {
  font-family: "Josefin Sans", sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--terra);
  margin-bottom: 16px;
}
.editorial-title {
  font-family: "Libre Baskerville", serif;
  font-size: clamp(32px, 3vw, 44px);
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink);
  max-width: 600px;
}
.editorial-title em {
  font-style: italic;
  color: var(--terra);
}
.mag-grid {
  display: grid;
  grid-template-columns: 2fr 1px 1fr 1px 1fr;
  gap: 0 48px;
}
.mag-divider {
  background: var(--line);
}
.mag-lead {
  padding-right: 0;
}
.mag-lead-tag {
  display: inline-block;
  font-family: "Josefin Sans", sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--warm-white);
  background: var(--terra);
  padding: 5px 12px;
  margin-bottom: 20px;
}
.mag-lead-title {
  font-family: "Libre Baskerville", serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--ink);
  margin-bottom: 16px;
}
.mag-lead-title em {
  font-style: italic;
  color: var(--terra);
}
.mag-lead-body {
  font-size: 15px;
  font-weight: 300;
  color: var(--brown);
  line-height: 1.9;
  margin-bottom: 24px;
}
.mag-lead-body strong {
  font-weight: 700;
  color: var(--ink);
}
.mag-read-more {
  font-family: "Josefin Sans", sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--terra);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}
.mag-read-more::after {
  content: "→";
  font-size: 14px;
}
.mag-side {
  display: flex;
  flex-direction: column;
  gap: 36px;
}
.mag-side-item {
  padding-bottom: 36px;
  border-bottom: 1px solid var(--line);
}
.mag-side-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.mag-side-num {
  font-family: "Josefin Sans", sans-serif;
  font-size: 32px;
  font-weight: 300;
  color: var(--terra);
  opacity: 0.5;
  line-height: 1;
  margin-bottom: 8px;
}
.mag-side-title {
  font-family: "Libre Baskerville", serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 6px;
}
.mag-side-desc {
  font-size: 12px;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.7;
}
@media (max-width: 900px) {
  .editorial {
    padding-left: 24px;
    padding-right: 24px;
  }
  .mag-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .mag-divider {
    display: none;
  }
}

@media (max-width: 768px) {
  .editorial {
    padding: 40px 20px 80px;
  }
  .editorial-header {
    margin-bottom: 40px;
  }
  .mag-lead-title {
    font-size: 24px;
  }
  .mag-lead-body {
    font-size: 14px;
    line-height: 1.8;
  }
  .mag-side {
    gap: 24px;
  }
  .mag-side-item {
    padding-bottom: 24px;
  }
}
</style>
