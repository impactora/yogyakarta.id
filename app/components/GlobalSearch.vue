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

const props = defineProps({
  isOpen: { type: Boolean, required: true },
});

const emit = defineEmits(["close"]);
const router = useRouter();

const searchQuery = ref("");
const searchInput = ref<HTMLInputElement | null>(null);

const searchIndex = [
  {
    id: "s1",
    title: "Prasasti Canggal",
    category: "Sejarah",
    desc: "Dokumen tertua keberadaan peradaban Hindu di dataran Kedu (732 M).",
    url: "/sejarah",
    icon: Landmark,
  },
  {
    id: "s2",
    title: "Perang Diponegoro",
    category: "Sejarah",
    desc: "Perlawanan terpanjang dan termahal yang pernah dihadapi VOC di Jawa.",
    url: "/sejarah",
    icon: Landmark,
  },
  {
    id: "s3",
    title: "Serangan Umum 1 Maret",
    category: "Sejarah",
    desc: "Pembuktian eksistensi militer Republik Indonesia kepada dunia.",
    url: "/sejarah",
    icon: Landmark,
  },

  {
    id: "b1",
    title: "Wayang Kulit Purwa",
    category: "Budaya",
    desc: "Seni pertunjukan bayangan semalam suntuk dengan 200 karakter.",
    url: "/budaya",
    icon: Landmark,
  },
  {
    id: "b2",
    title: "Batik Kraton",
    category: "Budaya",
    desc: "Filosofi motif larangan seperti Parang Rusak dan pewarna soga alami.",
    url: "/budaya",
    icon: Landmark,
  },
  {
    id: "b3",
    title: "Gamelan Kraton",
    category: "Budaya",
    desc: "Demokrasi suara berusia sepuluh abad tanpa instrumen prima donna.",
    url: "/budaya",
    icon: Landmark,
  },

  {
    id: "k1",
    title: "Gudeg Kraton",
    category: "Kuliner",
    desc: "Nangka muda direbus 12 jam dengan santan dan gula aren.",
    url: "/kuliner",
    icon: Utensils,
  },
  {
    id: "k2",
    title: "Oseng Mercon",
    category: "Kuliner",
    desc: "Kikil sapi ditumis dengan cabai rawit industrial. Perlawanan pedas.",
    url: "/kuliner",
    icon: Utensils,
  },
  {
    id: "k3",
    title: "Sate Klathak",
    category: "Kuliner",
    desc: "Daging kambing matang merata di atas jeruji besi sepeda.",
    url: "/kuliner",
    icon: Utensils,
  },

  {
    id: "w1",
    title: "Candi Prambanan",
    category: "Wisata",
    desc: "Trilogi candi Trimurti setinggi 47 meter dari wangsa Sanjaya.",
    url: "/wisata",
    icon: MapPin,
  },
  {
    id: "w2",
    title: "Jalan Malioboro",
    category: "Wisata",
    desc: "Koridor 2 kilometer yang merupakan sumbu filosofis kota.",
    url: "/wisata",
    icon: MapPin,
  },
  {
    id: "w3",
    title: "Gunung Merapi",
    category: "Wisata",
    desc: "Stratovolcano paling aktif di Indonesia.",
    url: "/wisata",
    icon: MapPin,
  },
  {
    id: "w4",
    title: "Kawasan Kaliurang",
    category: "Wisata",
    desc: "Resor pegunungan bersejarah di lereng selatan Merapi.",
    url: "/wisata",
    icon: MapPin,
  },

  {
    id: "t1",
    title: "Silicon Wali",
    category: "Teknologi",
    desc: "Koridor ekosistem startup di Ringroad Utara.",
    url: "/teknologi",
    icon: MonitorSmartphone,
  },
  {
    id: "t2",
    title: "Jogja Smart Province",
    category: "Teknologi",
    desc: "Cetak biru digitalisasi layanan publik dan sensor IoT mitigasi bencana.",
    url: "/teknologi",
    icon: MonitorSmartphone,
  },
];

const fuse = new Fuse(searchIndex, {
  keys: ["title", "desc", "category"],
  threshold: 0.3,
  includeScore: true,
});

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return [];
  const results = fuse.search(searchQuery.value);
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
      // Kunci scroll halaman belakang
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
        <div class="flex items-center px-6 py-5 border-b border-line bg-white">
          <Search class="w-6 h-6 text-muted flex-shrink-0" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Cari destinasi, kuliner, atau sejarah..."
            class="flex-grow bg-transparent border-none outline-none px-4 text-[18px] font-libre text-ink placeholder:text-muted/50"
            @keydown.esc="emit('close')"
          />
          <button
            @click="emit('close')"
            class="p-2 hover:bg-line/50 rounded-lg transition-colors"
            aria-label="Tutup pencarian"
          >
            <X class="w-5 h-5 text-ink" />
          </button>
        </div>

        <div class="max-h-[50vh] overflow-y-auto bg-warm-white">
          <div
            v-if="searchQuery && searchResults.length === 0"
            class="p-10 text-center text-brown font-light"
          >
            Tidak ada dokumen yang cocok dengan
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
              Mulai Mengetik
            </div>
          </div>

          <ul v-else class="flex flex-col">
            <li v-for="item in searchResults" :key="item.id">
              <button
                @click="handleNavigate(item.url)"
                class="w-full text-left px-6 py-4 hover:bg-white flex items-start gap-4 transition-colors border-b border-line last:border-b-0 group cursor-pointer"
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
                      >{{ item.category }}</span
                    >
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
          class="px-6 py-3 bg-white border-t border-line font-josefin text-[10px] text-muted flex justify-between items-center uppercase tracking-widest"
        >
          <span>Mesin Pencari Internal</span>
          <span class="flex items-center gap-2"
            >Gunakan
            <kbd
              class="px-1.5 py-0.5 border border-line rounded bg-warm-white font-sans text-[9px]"
              >ESC</kbd
            >
            untuk menutup</span
          >
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
