<script setup lang="ts">
import { ref, computed } from "vue";

const destinations = [
  {
    id: "prambanan",
    area: "Sleman",
    title: "Candi Prambanan",
    desc: "Trilogi candi Trimurti setinggi 47 meter. Dibangun 856 Masehi oleh wangsa Sanjaya.",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.489,-7.753,110.493,-7.749&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Candi_Prambanan,_Candi_Hindu_Terbesar_Warisan_Budaya_Indonesia.jpg",
  },
  {
    id: "keraton",
    area: "Kota Yogyakarta",
    title: "Keraton Ngayogyakarta",
    desc: "Istana yang masih berdenyut sebagai pusat pemerintahan monarki aktif. Dibangun 1755 oleh HB I.",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.361,-7.807,110.365,-7.804&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kraton_Yogyakarta_Pagelaran.jpg",
  },
  {
    id: "malioboro",
    area: "Kota Yogyakarta",
    title: "Jalan Malioboro",
    desc: "Koridor 2 kilometer dari Tugu ke Keraton yang merupakan sumbu filosofis kota.",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.364,-7.794,110.367,-7.791&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Malioboro_Street,_Yogyakarta.JPG",
  },
  {
    id: "merapi",
    area: "Sleman",
    title: "Gunung Merapi",
    desc: "Stratovolcano paling aktif di Indonesia. Bagi warga Yogyakarta, Merapi adalah leluhur.",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.44,-7.545,110.45,-7.535&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/TN_Gunung_Merapi.jpg",
  },
  {
    id: "parangtritis",
    area: "Bantul",
    title: "Pantai Parangtritis",
    desc: "Garis pantai pasir hitam vulkanik yang menjadi kutub selatan sumbu kosmologis.",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.31,-8.03,110.33,-8.01&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Parangtritis_Beach,_Bantul,_Yogyakarta_01.JPG",
  },
  {
    id: "kotagede",
    area: "Kota Yogyakarta",
    title: "Kotagede",
    desc: "Bekas ibukota Mataram Islam abad ke-16 yang kini menjadi distrik perak dengan lebih dari 200 bengkel pengrajin aktif.",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.395,-7.83,110.405,-7.82&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kota_Gede_Jogjakarta.jpg",
  },
];

const activeDestination = ref(destinations[0].id);

const activeMapUrl = computed(() => {
  const target = destinations.find((d) => d.id === activeDestination.value);
  return target ? target.mapUrl : destinations[0].mapUrl;
});

const activeImage = computed(() => {
  const target = destinations.find((d) => d.id === activeDestination.value);
  return target ? target.image : destinations[0].image;
});
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      category="Wisata"
      title="Sudut Keajaiban Mataram"
      description="Navigasi destinasi ikonik Yogyakarta. Klik lokasi di bawah untuk menjelajahi peta secara interaktif."
    />

    <div
      v-observe
      class="w-full h-[30vh] lg:h-[40vh] mt-10 mb-16 relative overflow-hidden reveal-up delay-100 border border-line shadow-xl"
    >
      <img
        :key="activeDestination"
        :src="activeImage"
        alt="Visual Destinasi"
        class="w-full h-full object-cover opacity-90 transition-opacity duration-500"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-ink/10"></div>
      <div
        class="absolute bottom-4 right-4 z-20 font-josefin text-[8px] tracking-[0.2em] text-white/70 uppercase bg-ink/80 backdrop-blur-sm px-3 py-1 border border-white/10"
      >
        Pratinjau Lokasi
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-10 lg:gap-16">
      <div v-observe class="flex flex-col reveal-up">
        <button
          v-for="item in destinations"
          :key="item.id"
          @click="activeDestination = item.id"
          class="text-left p-6 lg:p-8 border-b border-line last:border-b-0 transition-all duration-300 group relative overflow-hidden cursor-pointer"
          :class="
            activeDestination === item.id ? 'bg-ink' : 'hover:bg-white/40'
          "
        >
          <div
            class="absolute left-0 top-0 bottom-0 w-1 bg-terra transition-transform duration-300 origin-top"
            :class="
              activeDestination === item.id
                ? 'scale-y-100'
                : 'scale-y-0 group-hover:scale-y-100'
            "
          ></div>
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase mb-3 transition-colors duration-300"
            :class="
              activeDestination === item.id ? 'text-terra' : 'text-terra/70'
            "
          >
            {{ item.area }}
          </div>
          <h2
            class="font-libre text-[24px] lg:text-[28px] font-bold mb-4 transition-colors duration-300"
            :class="
              activeDestination === item.id
                ? 'text-parchment'
                : 'text-ink group-hover:text-ink/80'
            "
          >
            {{ item.title }}
          </h2>
          <p
            class="text-[14px] font-light leading-[1.8] transition-colors duration-300"
            :class="
              activeDestination === item.id ? 'text-parchment/70' : 'text-brown'
            "
          >
            {{ item.desc }}
          </p>
        </button>
      </div>

      <div v-observe class="relative reveal-up delay-200">
        <div
          class="lg:sticky lg:top-[120px] h-[400px] lg:h-[600px] w-full bg-ink border border-line shadow-2xl overflow-hidden p-2"
        >
          <div
            class="absolute inset-0 flex items-center justify-center font-josefin text-[10px] tracking-[0.2em] text-muted uppercase z-0"
          >
            Memuat Data Spasial...
          </div>
          <iframe
            :key="activeDestination"
            :src="activeMapUrl"
            class="relative z-10 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 bg-ink"
            allowfullscreen="false"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </main>
</template>
