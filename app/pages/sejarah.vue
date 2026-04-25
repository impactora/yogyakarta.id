<script setup lang="ts">
import { ref } from "vue";

const timeline = [
  {
    year: "732",
    title: "Prasasti Canggal",
    desc: "Raja Sanjaya mendirikan lingga di Bukit Stirangga, Gunung Wukir. Dokumen tertua keberadaan peradaban Hindu di dataran Kedu — titik nol sejarah tertulis Yogyakarta.",
    meta: "Awal Peradaban",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Canggal_inscription.jpg",
  },
  {
    year: "856",
    title: "Rampungnya Prambanan",
    desc: "Wangsa Sanjaya merampungkan kompleks candi Hindu terbesar Asia Tenggara. 240 struktur batu andesit dibangun tanpa semen — hanya gravitasi, presisi, dan keyakinan.",
    meta: "Puncak Wangsa Sanjaya",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Prambanan.jpg",
  },
  {
    year: "1755",
    title: "Perjanjian Giyanti",
    desc: "VOC membelah Mataram Islam. Pangeran Mangkubumi menjadi Sultan Hamengku Buwono I dan langsung merancang tata kota berbasis poros kosmologis.",
    meta: "Kelahiran Kesultanan",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Keraton_Ngayogyakarta.jpg",
  },
  {
    year: "1825",
    title: "Perang Diponegoro",
    desc: "Lima tahun gerilya dari Goa Selarong menguras kas Hindia Belanda hingga Fl 20 juta. Perlawanan terpanjang dan termahal yang pernah dihadapi VOC di Jawa.",
    meta: "Perlawanan Kolonial",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Raden_Saleh_-_Diponegoro_arrest.jpg",
  },
  {
    year: "1946",
    title: "Yogyakarta: Ibukota Republik",
    desc: "Sultan HB IX menyerahkan kedaulatan wilayahnya kepada NKRI. Ketika Jakarta jatuh ke NICA, Yogyakarta menjelma menjadi jantung revolusi kemerdekaan.",
    meta: "Revolusi",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gedung_Agung.jpg",
  },
  {
    year: "1949",
    title: "Serangan Umum 1 Maret",
    desc: "TNI menduduki Yogyakarta selama 6 jam di bawah komando Letkol Soeharto. Serangan simbolis yang membuktikan kepada PBB bahwa RI belum mati.",
    meta: "Eksistensi Militer",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Monumen_Serangan_Umum_1_Maret_(1_March_General_Attack_Monument).JPG",
  },
  {
    year: "2012",
    title: "UU Keistimewaan DIY",
    desc: "UU No. 13 Tahun 2012 mengukuhkan Sultan dan Paku Alam sebagai Gubernur dan Wakil Gubernur seumur hidup — satu-satunya monarki konstitusional diakui negara.",
    meta: "Era Istimewa",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tugu_Jogja.jpg",
  },
];

const activeIndex = ref(0);
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      category="Sejarah"
      title="Merekam Jejak Waktu"
      description="Menelusuri linimasa sejarah, dari pendirian Kraton Yogyakarta hingga masa revolusi kemerdekaan."
    />

    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 mt-10 lg:mt-20 items-start"
    >
      <div
        class="relative border-l border-line ml-3 pl-8 flex flex-col gap-12 lg:gap-16"
      >
        <button
          v-for="(item, index) in timeline"
          :key="index"
          @click="activeIndex = index"
          :aria-label="`Lihat detail peristiwa ${item.title} tahun ${item.year}`"
          v-observe
          class="relative text-left group cursor-pointer reveal-up"
          :style="`transition-delay: ${(index % 5) * 100}ms`"
        >
          <div
            class="absolute -left-[37px] top-2 w-[11px] h-[11px] rounded-full border-2 transition-all duration-300"
            :class="
              activeIndex === index
                ? 'bg-terra border-terra scale-125'
                : 'bg-warm-white border-line group-hover:border-terra'
            "
          ></div>
          <div
            class="font-josefin text-[16px] lg:text-[20px] font-light transition-colors duration-300 mb-1"
            :class="
              activeIndex === index
                ? 'text-terra'
                : 'text-muted group-hover:text-terra/70'
            "
          >
            {{ item.year }}
          </div>
          <h3
            class="font-libre text-[18px] lg:text-[22px] font-bold transition-colors duration-300"
            :class="
              activeIndex === index
                ? 'text-ink'
                : 'text-ink/40 group-hover:text-ink/70'
            "
          >
            {{ item.title }}
          </h3>
        </button>
      </div>

      <div
        v-observe
        class="lg:sticky lg:top-[120px] flex flex-col reveal-up delay-300"
      >
        <div :key="activeIndex" class="animate-fade-in">
          <div
            class="h-[240px] md:h-[320px] lg:h-[400px] bg-ink relative overflow-hidden mb-8 border border-line shadow-xl"
          >
            <img
              :src="timeline[activeIndex].image"
              :alt="timeline[activeIndex].title"
              class="w-full h-full object-cover opacity-90"
            />
            <div
              class="absolute bottom-3 right-3 bg-ink/80 backdrop-blur-sm px-3 py-1 font-lato text-[9px] text-white/50 border border-white/10 uppercase tracking-widest"
            >
              Arsip Visual · 2026
            </div>
          </div>
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-4"
          >
            Babak: {{ timeline[activeIndex].meta }}
          </div>
          <h2
            class="font-libre text-[28px] lg:text-[36px] font-bold text-ink leading-[1.2] mb-6"
          >
            {{ timeline[activeIndex].title }}
          </h2>
          <p
            class="text-[15px] font-light text-brown leading-[1.9] max-w-[500px]"
          >
            {{ timeline[activeIndex].desc }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
