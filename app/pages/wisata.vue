<script setup lang="ts">
import { ref, computed } from "vue";
import { useHead, useI18n } from "#imports";
import {
  Clock,
  Ticket,
  Bus,
  MapPin,
  Share2,
  Printer,
  Globe,
} from "lucide-vue-next";

const toast = useToast();

const { locale, setLocale } = useI18n();
const toggleLocale = () => {
  setLocale(locale.value === "id" ? "en" : "id");
};

const rawDestinations = [
  {
    id: "prambanan",
    area: "Sleman",
    title: "Candi Prambanan",
    desc: {
      id: "Trilogi candi Trimurti setinggi 47 meter. Dibangun 856 Masehi oleh wangsa Sanjaya.",
      en: "A 47-meter tall Trimurti temple trilogy. Built in 856 AD by the Sanjaya dynasty.",
    },
    hours: "06.00 - 17.00 WIB",
    price: "Rp 75.000",
    transport: "Trans Jogja Jalur 1A",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.489,-7.753,110.493,-7.749&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Candi_Prambanan,_Candi_Hindu_Terbesar_Warisan_Budaya_Indonesia.jpg",
  },
  {
    id: "keraton",
    area: "Kota Yogyakarta",
    title: "Keraton Ngayogyakarta",
    desc: {
      id: "Istana yang masih berdenyut sebagai pusat pemerintahan monarki aktif. Dibangun 1755 oleh HB I.",
      en: "A beating palace serving as the center of an active monarchical government. Built in 1755 by HB I.",
    },
    hours: "08.30 - 14.30 WIB",
    price: "Rp 15.000",
    transport: "Berjalan kaki dari Malioboro",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.361,-7.807,110.365,-7.804&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kraton_Yogyakarta_Pagelaran.jpg",
  },
  {
    id: "malioboro",
    area: "Kota Yogyakarta",
    title: "Jalan Malioboro",
    desc: {
      id: "Koridor 2 kilometer dari Tugu ke Keraton yang merupakan sumbu filosofis kota.",
      en: "A 2-kilometer corridor from the Monument to the Palace, forming the city's philosophical axis.",
    },
    hours: "24 Jam",
    price: "Gratis",
    transport: "Stasiun Tugu / Trans Jogja 1A, 2A, 3A",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.364,-7.794,110.367,-7.791&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Malioboro_Street,_Yogyakarta.JPG",
  },
  {
    id: "tamansari",
    area: "Kota Yogyakarta",
    title: "Taman Sari",
    desc: {
      id: "Istana air dan kompleks pemandian keraton peninggalan abad ke-18. Area pertahanan dan rekreasi Sultan.",
      en: "An 18th-century water palace and royal bathing complex. The Sultan's defense and recreation area.",
    },
    hours: "09.00 - 15.00 WIB",
    price: "Rp 15.000",
    transport: "Becak dari Alun-Alun Selatan",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.357,-7.811,110.361,-7.808&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tamansari_Water_Castle.jpg",
  },
  {
    id: "kaliurang",
    area: "Sleman",
    title: "Kawasan Kaliurang",
    desc: {
      id: "Resor pegunungan bersejarah di lereng selatan Merapi. Tempat perundingan KTN masa revolusi.",
      en: "A historic mountain resort on the southern slopes of Merapi. Site of KTN negotiations during the revolution.",
    },
    hours: "24 Jam",
    price: "Rp 5.000 (Retribusi)",
    transport: "Bus DAMRI / Jeep Wisata",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.42,-7.6,110.43,-7.59&layer=mapnik",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kaliurang.jpg",
  },
  {
    id: "sambisari",
    area: "Sleman",
    title: "Candi Sambisari",
    desc: {
      id: "Candi Hindu abad ke-9 yang terkubur lahar dingin Merapi setinggi 6,5 meter selama berabad-abad.",
      en: "A 9th-century Hindu temple buried under 6.5 meters of cold Merapi lahar for centuries.",
    },
    hours: "07.00 - 17.00 WIB",
    price: "Rp 10.000",
    transport: "10 menit dari Bandara Adisutjipto",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.445,-7.763,110.448,-7.761&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Candi_Sambisari_Kalasan_Sleman_Yogyakarta.jpg",
  },
  {
    id: "merapi",
    area: "Sleman",
    title: "Gunung Merapi",
    desc: {
      id: "Stratovolcano paling aktif di Indonesia. Bagi warga Yogyakarta, Merapi adalah leluhur.",
      en: "The most active stratovolcano in Indonesia. For the people of Yogyakarta, Merapi is an ancestor.",
    },
    hours: "06.00 - 16.00 WIB",
    price: "Mulai Rp 350.000",
    transport: "Jeep dari Basecamp Kaliurang",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.44,-7.545,110.45,-7.535&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/TN_Gunung_Merapi.jpg",
  },
  {
    id: "parangtritis",
    area: "Bantul",
    title: "Pantai Parangtritis",
    desc: {
      id: "Garis pantai pasir hitam vulkanik yang menjadi kutub selatan sumbu kosmologis.",
      en: "A black volcanic sand coastline serving as the southern pole of the cosmological axis.",
    },
    hours: "24 Jam",
    price: "Rp 10.000",
    transport: "Bus DAMRI dari Terminal Giwangan",
    mapUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.31,-8.03,110.33,-8.01&layer=mapnik",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Parangtritis_Beach,_Bantul,_Yogyakarta_01.JPG",
  },
];

const destinations = computed(() => {
  return rawDestinations.map((d) => ({
    ...d,
    displayDesc: d.desc[locale.value],
  }));
});

const activeDestination = ref(destinations.value[0].id);

const activeMapUrl = computed(() => {
  const target = destinations.value.find(
    (d) => d.id === activeDestination.value,
  );
  return target ? target.mapUrl : destinations.value[0].mapUrl;
});

const activeImage = computed(() => {
  const target = destinations.value.find(
    (d) => d.id === activeDestination.value,
  );
  return target ? target.image : destinations.value[0].image;
});

const shareDestination = async (item: any) => {
  const shareData = {
    title: `${item.title} - Jiwa Nusantara`,
    text: item.displayDesc,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Share dibatalkan pengguna atau error internal:", err);
    }
  } else {
    try {
      const clipboardText = `${shareData.title}\n${shareData.text}\n\nPelajari lebih lanjut: ${shareData.url}`;
      await navigator.clipboard.writeText(clipboardText);
      toast.show(
        locale.value === "id"
          ? "Tautan berhasil disalin ke papan klip!"
          : "Link copied to clipboard!",
        "success",
      );
    } catch (err) {
      console.error("Clipboard API gagal:", err);
      toast.show(
        locale.value === "id"
          ? "Gagal menyalin tautan. Izin peramban ditolak."
          : "Failed to copy. Browser permission denied.",
        "error",
      );
    }
  }
};

const triggerPrint = () => {
  window.print();
};

useHead({
  title: computed(() =>
    locale.value === "id"
      ? "Wisata - Jiwa Nusantara"
      : "Tourism - Jiwa Nusantara",
  ),
  script: [
    {
      type: "application/ld+json",
      innerHTML: computed(() =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: destinations.value.map((dest, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "TouristAttraction",
              name: dest.title,
              description: dest.displayDesc,
              publicAccess: true,
            },
          })),
        }),
      ),
    },
  ],
});
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10 print:pt-0 print:px-0"
  >
    <div class="flex justify-between items-start mb-8 no-print">
      <CategoryHeader
        v-observe
        class="reveal-up"
        :category="locale === 'id' ? 'Wisata' : 'Tourism'"
        :title="
          locale === 'id'
            ? 'Sudut Keajaiban Mataram'
            : 'Mataram Corners of Wonder'
        "
        :description="
          locale === 'id'
            ? 'Navigasi destinasi ikonik Yogyakarta. Klik lokasi di bawah untuk menjelajahi peta.'
            : 'Navigate iconic destinations. Click locations below to explore the map.'
        "
      />

      <div class="flex gap-2 reveal-up delay-100 mt-2 lg:mt-0">
        <button
          @click="toggleLocale"
          class="flex items-center gap-2 px-3 py-2 border border-line bg-white hover:border-terra transition-colors font-josefin text-[10px] font-bold tracking-widest uppercase cursor-pointer"
        >
          <Globe class="w-4 h-4 text-terra" />
          {{ locale === "id" ? "ID -> EN" : "EN -> ID" }}
        </button>
        <button
          @click="triggerPrint"
          class="hidden md:flex items-center gap-2 px-3 py-2 bg-ink text-white hover:bg-terra transition-colors font-josefin text-[10px] tracking-widest uppercase cursor-pointer"
        >
          <Printer class="w-4 h-4" />
          {{ locale === "id" ? "Cetak PDF" : "Print PDF" }}
        </button>
      </div>
    </div>

    <div
      v-observe
      class="w-full h-[30vh] lg:h-[40vh] mb-16 relative overflow-hidden reveal-up delay-100 border border-line shadow-xl no-print"
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
        {{ locale === "id" ? "Pratinjau Lokasi" : "Location Preview" }}
      </div>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-10 lg:gap-16 print:block"
    >
      <div v-observe class="flex flex-col reveal-up print:w-full">
        <h1
          class="hidden print:block font-libre text-[32px] font-bold text-ink mb-10 border-b-2 border-ink pb-4"
        >
          Yogyakarta Tourist Guide
        </h1>

        <button
          v-for="item in destinations"
          :key="item.id"
          @click="activeDestination = item.id"
          :aria-label="`Tampilkan info destinasi wisata ${item.title}`"
          class="text-left p-6 lg:p-8 border-b border-line last:border-b-0 transition-all duration-300 group relative overflow-hidden flex flex-col print:border-b-2 print:border-ink print:mb-8 print:p-0 print:break-inside-avoid"
          :class="
            activeDestination === item.id
              ? 'bg-ink no-print-bg'
              : 'hover:bg-white/40'
          "
        >
          <div
            class="absolute left-0 top-0 bottom-0 w-1 bg-terra transition-transform duration-300 origin-top no-print"
            :class="
              activeDestination === item.id
                ? 'scale-y-100'
                : 'scale-y-0 group-hover:scale-y-100'
            "
          ></div>

          <div class="flex justify-between items-start w-full">
            <div>
              <div
                class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase mb-3 transition-colors duration-300 flex items-center gap-2 print:text-black"
                :class="
                  activeDestination === item.id ? 'text-terra' : 'text-terra/70'
                "
              >
                <MapPin class="w-3 h-3" /> {{ item.area }}
              </div>
              <h2
                class="font-libre text-[24px] lg:text-[28px] font-bold mb-4 transition-colors duration-300 print:text-black"
                :class="
                  activeDestination === item.id
                    ? 'text-parchment'
                    : 'text-ink group-hover:text-ink/80'
                "
              >
                {{ item.title }}
              </h2>
            </div>

            <div class="no-print">
              <div
                @click.stop="shareDestination(item)"
                class="p-2 border border-line rounded-full hover:bg-terra hover:text-white hover:border-terra transition-all cursor-pointer text-muted"
                :class="
                  activeDestination === item.id
                    ? 'border-white/20 text-white/70 hover:border-terra'
                    : ''
                "
                :title="
                  locale === 'id'
                    ? 'Bagikan destinasi ini'
                    : 'Share this destination'
                "
              >
                <Share2 class="w-4 h-4" />
              </div>
            </div>
          </div>

          <p
            class="text-[14px] font-light leading-[1.8] transition-colors duration-300 mb-5 max-w-[800px] print:text-black"
            :class="
              activeDestination === item.id ? 'text-parchment/70' : 'text-brown'
            "
          >
            {{ item.displayDesc }}
          </p>

          <div
            class="flex flex-col gap-3 pt-4 border-t border-line/30 font-josefin text-[9px] tracking-[0.15em] transition-colors duration-300 w-full print:text-black print:border-black"
            :class="
              activeDestination === item.id
                ? 'text-parchment/60 border-white/10'
                : 'text-muted border-line'
            "
          >
            <div class="flex items-center gap-3">
              <Clock class="w-3 h-3 text-terra print:text-black" />
              {{ item.hours }}
            </div>
            <div class="flex items-center gap-3">
              <Ticket class="w-3 h-3 text-terra print:text-black" />
              {{ item.price }}
            </div>
            <div class="flex items-center gap-3">
              <Bus class="w-3 h-3 text-terra print:text-black" />
              {{ item.transport }}
            </div>
          </div>
        </button>
      </div>

      <div v-observe class="relative reveal-up delay-200 no-print">
        <div
          class="lg:sticky lg:top-[120px] h-[400px] lg:h-[600px] w-full bg-ink border border-line shadow-2xl overflow-hidden p-2"
        >
          <div
            class="absolute inset-0 flex items-center justify-center font-josefin text-[10px] tracking-[0.2em] text-muted uppercase z-0"
          >
            {{
              locale === "id"
                ? "Memuat Data Spasial..."
                : "Loading Spatial Data..."
            }}
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

<style>
@media print {
  body {
    background-color: white !important;
  }
  .no-print,
  nav,
  footer,
  .floating-ai-widget {
    display: none !important;
  }
  .reveal-up {
    opacity: 1 !important;
    transform: none !important;
  }
  .no-print-bg {
    background-color: transparent !important;
  }
}
</style>
