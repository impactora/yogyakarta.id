<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import {
  Search,
  X,
  MapPin,
  Utensils,
  Landmark,
  ArrowRight,
  MonitorSmartphone,
} from "lucide-vue-next";
import Fuse from "fuse.js";
import { useI18n } from "#imports";

const { locale } = useI18n();

const props = defineProps({
  isOpen: { type: Boolean, required: true },
});

const emit = defineEmits(["close"]);
const router = useRouter();

const searchQuery = ref("");
const searchInput = ref<HTMLInputElement | null>(null);

const rawSearchIndex = [
  {
    id: "s1",
    url: "/sejarah",
    icon: Landmark,
    category: { id: "Sejarah", en: "History" },
    title: { id: "Prasasti Canggal", en: "Canggal Inscription" },
    desc: {
      id: "Dokumen tertua keberadaan peradaban Hindu di dataran Kedu (732 M).",
      en: "The oldest document of Hindu civilization in the Kedu plain (732 AD).",
    },
  },
  {
    id: "s2",
    url: "/sejarah",
    icon: Landmark,
    category: { id: "Sejarah", en: "History" },
    title: { id: "Perang Diponegoro", en: "Java War" },
    desc: {
      id: "Perlawanan terpanjang dan termahal yang pernah dihadapi VOC di Jawa.",
      en: "The longest and most expensive resistance the VOC ever faced in Java.",
    },
  },
  {
    id: "s3",
    url: "/sejarah",
    icon: Landmark,
    category: { id: "Sejarah", en: "History" },
    title: { id: "Serangan Umum 1 Maret", en: "March 1st General Attack" },
    desc: {
      id: "Pembuktian eksistensi militer Republik Indonesia kepada dunia.",
      en: "Proof of the military existence of the Republic of Indonesia to the world.",
    },
  },
  {
    id: "b1",
    url: "/budaya",
    icon: Landmark,
    category: { id: "Budaya", en: "Culture" },
    title: { id: "Wayang Kulit Purwa", en: "Purwa Shadow Puppets" },
    desc: {
      id: "Seni pertunjukan bayangan semalam suntuk dengan 200 karakter.",
      en: "All-night shadow performance art with 200 characters.",
    },
  },
  {
    id: "b2",
    url: "/budaya",
    icon: Landmark,
    category: { id: "Budaya", en: "Culture" },
    title: { id: "Batik Kraton", en: "Kraton Batik" },
    desc: {
      id: "Filosofi motif larangan seperti Parang Rusak dan pewarna soga alami.",
      en: "Philosophy of forbidden motifs like Parang Rusak and natural soga dye.",
    },
  },
  {
    id: "b3",
    url: "/budaya",
    icon: Landmark,
    category: { id: "Budaya", en: "Culture" },
    title: { id: "Gamelan Kraton", en: "Kraton Gamelan" },
    desc: {
      id: "Demokrasi suara berusia sepuluh abad tanpa instrumen prima donna.",
      en: "Ten-century-old democracy of sound with no prima donna instrument.",
    },
  },
  {
    id: "k1",
    url: "/kuliner",
    icon: Utensils,
    category: { id: "Kuliner", en: "Culinary" },
    title: { id: "Gudeg Kraton", en: "Royal Gudeg" },
    desc: {
      id: "Nangka muda direbus 12 jam dengan santan dan gula aren.",
      en: "Young jackfruit boiled for 12 hours with coconut milk and palm sugar.",
    },
  },
  {
    id: "k2",
    url: "/kuliner",
    icon: Utensils,
    category: { id: "Kuliner", en: "Culinary" },
    title: { id: "Oseng Mercon", en: "Firecracker Stir-fry" },
    desc: {
      id: "Kikil sapi ditumis dengan cabai rawit industrial. Perlawanan pedas.",
      en: "Beef tendon stir-fried with industrial bird's eye chili. Spicy resistance.",
    },
  },
  {
    id: "k3",
    url: "/kuliner",
    icon: Utensils,
    category: { id: "Kuliner", en: "Culinary" },
    title: { id: "Sate Klathak", en: "Klathak Satay" },
    desc: {
      id: "Daging kambing matang merata di atas jeruji besi sepeda.",
      en: "Mutton cooked evenly on bicycle iron spokes.",
    },
  },
  {
    id: "w1",
    url: "/wisata",
    icon: MapPin,
    category: { id: "Wisata", en: "Tourism" },
    title: { id: "Candi Prambanan", en: "Prambanan Temple" },
    desc: {
      id: "Trilogi candi Trimurti setinggi 47 meter dari wangsa Sanjaya.",
      en: "47-meter high Trimurti temple trilogy from the Sanjaya dynasty.",
    },
  },
  {
    id: "w2",
    url: "/wisata",
    icon: MapPin,
    category: { id: "Wisata", en: "Tourism" },
    title: { id: "Jalan Malioboro", en: "Malioboro Street" },
    desc: {
      id: "Koridor 2 kilometer yang merupakan sumbu filosofis kota.",
      en: "2-kilometer corridor that is the city's philosophical axis.",
    },
  },
  {
    id: "w3",
    url: "/wisata",
    icon: MapPin,
    category: { id: "Wisata", en: "Tourism" },
    title: { id: "Gunung Merapi", en: "Mount Merapi" },
    desc: {
      id: "Stratovolcano paling aktif di Indonesia.",
      en: "The most active stratovolcano in Indonesia.",
    },
  },
  {
    id: "w4",
    url: "/wisata",
    icon: MapPin,
    category: { id: "Wisata", en: "Tourism" },
    title: { id: "Kawasan Kaliurang", en: "Kaliurang Area" },
    desc: {
      id: "Resor pegunungan bersejarah di lereng selatan Merapi.",
      en: "Historic mountain resort on the southern slopes of Merapi.",
    },
  },
  {
    id: "t1",
    url: "/teknologi",
    icon: MonitorSmartphone,
    category: { id: "Teknologi", en: "Technology" },
    title: { id: "Silicon Wali", en: "Silicon Wali" },
    desc: {
      id: "Koridor ekosistem startup di Ringroad Utara.",
      en: "Startup ecosystem corridor in North Ringroad.",
    },
  },
  {
    id: "t2",
    url: "/teknologi",
    icon: MonitorSmartphone,
    category: { id: "Teknologi", en: "Technology" },
    title: { id: "Jogja Smart Province", en: "Jogja Smart Province" },
    desc: {
      id: "Cetak biru digitalisasi layanan publik dan sensor IoT mitigasi bencana.",
      en: "Blueprint for public service digitalization and disaster mitigation IoT sensors.",
    },
  },
];

const localizedSearchIndex = computed(() => {
  const l = locale.value as "id" | "en";
  return rawSearchIndex.map((item) => ({
    id: item.id,
    url: item.url,
    icon: item.icon,
    category: item.category[l],
    title: item.title[l],
    desc: item.desc[l],
  }));
});

const fuse = computed(
  () =>
    new Fuse(localizedSearchIndex.value, {
      keys: ["title", "desc", "category"],
      threshold: 0.3,
      includeScore: true,
    }),
);

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return [];
  const results = fuse.value.search(searchQuery.value);
  return results.slice(0, 5).map((r) => r.item);
});

const handleNavigate = (url: string) => {
  emit("close");
  searchQuery.value = "";
  router.push(url);
};

watch(
  () => props.isOpen,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      searchInput.value?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
);
</script>

<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-5 sm:px-10"
    >
      <div
        class="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        @click="emit('close')"
      ></div>

      <div
        class="relative w-full max-w-[700px] bg-warm-white shadow-2xl rounded-xl overflow-hidden border border-line"
      >
        <div
          class="flex items-center px-6 py-5 border-b border-line bg-parchment transition-colors duration-300"
        >
          <Search class="w-6 h-6 text-muted flex-shrink-0" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            :placeholder="$t('search.placeholder')"
            class="flex-grow bg-transparent border-none outline-none px-4 text-[18px] font-libre text-ink placeholder:text-muted/50"
            @keydown.esc="emit('close')"
          />
          <button
            @click="emit('close')"
            class="p-2 hover:bg-ink/5 rounded-lg transition-colors"
            aria-label="Tutup pencarian"
          >
            <X class="w-5 h-5 text-ink" />
          </button>
        </div>

        <div
          class="max-h-[50vh] overflow-y-auto bg-warm-white transition-colors duration-300"
        >
          <div
            v-if="searchQuery && searchResults.length === 0"
            class="p-10 text-center text-brown font-light"
          >
            {{ $t("search.no_results") }}
            <span class="font-bold text-ink">"{{ searchQuery }}"</span>.
          </div>

          <div
            v-else-if="!searchQuery"
            class="p-8 text-center flex flex-col items-center justify-center opacity-50"
          >
            <Search class="w-10 h-10 mb-4 text-muted" />
            <div
              class="font-josefin text-[12px] uppercase tracking-widest text-muted"
            >
              {{ $t("search.start_typing") }}
            </div>
          </div>

          <ul v-else class="flex flex-col">
            <li v-for="item in searchResults" :key="item.id">
              <button
                @click="handleNavigate(item.url)"
                class="w-full text-left px-6 py-4 hover:bg-parchment flex items-start gap-4 transition-colors border-b border-line last:border-b-0 group cursor-pointer"
              >
                <div
                  class="mt-1 bg-ink/5 p-2 rounded-lg text-ink group-hover:bg-terra/10 group-hover:text-terra transition-colors flex-shrink-0"
                >
                  <component :is="item.icon" class="w-5 h-5" />
                </div>
                <div class="flex-grow">
                  <div class="flex items-center gap-3 mb-1">
                    <span class="font-libre text-[18px] font-bold text-ink">{{
                      item.title
                    }}</span>
                    <span
                      class="font-josefin text-[9px] uppercase tracking-widest text-terra px-2 py-0.5 border border-terra/20 rounded bg-terra/5"
                    >
                      {{ item.category }}
                    </span>
                  </div>
                  <p
                    class="text-[13px] text-brown font-light leading-relaxed line-clamp-1"
                  >
                    {{ item.desc }}
                  </p>
                </div>
                <ArrowRight
                  class="w-5 h-5 text-muted opacity-0 group-hover:opacity-100 group-hover:text-terra transition-all transform group-hover:translate-x-1 mt-3"
                />
              </button>
            </li>
          </ul>
        </div>

        <div
          class="px-6 py-3 bg-parchment border-t border-line font-josefin text-[10px] text-muted flex justify-between items-center uppercase tracking-widest transition-colors duration-300"
        >
          <span>{{ $t("search.internal_engine") }}</span>
          <span class="flex items-center gap-2">
            {{ $t("search.use") }}
            <kbd
              class="px-1.5 py-0.5 border border-line rounded bg-warm-white font-sans text-[9px] text-ink"
              >ESC</kbd
            >
            {{ $t("search.to_close") }}
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active .relative,
.fade-leave-active .relative {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from .relative,
.fade-leave-to .relative {
  transform: translateY(-20px) scale(0.98);
}
</style>
