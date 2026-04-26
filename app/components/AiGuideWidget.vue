<script setup lang="ts">
import { ref, nextTick } from "vue";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  User,
  ArrowLeft,
  Calendar,
  Compass,
  Map,
  Bot,
  AlertTriangle,
} from "lucide-vue-next";

const isOpen = ref(false);
const activeView = ref<"menu" | "chat" | "planner">("menu");

// AI CHAT (GEMINI API)
const inputMessage = ref("");
const isLoadingChat = ref(false);
const chatContainer = ref<HTMLElement | null>(null);

const chatHistory = ref([
  {
    role: "ai",
    text: "Sugeng rawuh. Saya asisten Jiwa Nusantara. Ingin bertanya tentang Jogja atau merancang itinerary?",
  },
]);

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoadingChat.value) return;

  const userText = inputMessage.value;
  chatHistory.value.push({ role: "user", text: userText });
  inputMessage.value = "";
  isLoadingChat.value = true;
  await scrollToBottom();

  try {
    const response = await $fetch("/api/chat", {
      method: "POST",
      body: { message: userText },
    });

    if (response && response.reply) {
      chatHistory.value.push({ role: "ai", text: response.reply });
    } else {
      throw new Error("Respons API tidak valid");
    }
  } catch (error: any) {
    console.error("Chat API Error:", error);
    chatHistory.value.push({
      role: "ai",
      text: "Maaf, Pemandu AI sedang mengalami gangguan koneksi ke server pusat. Silakan coba beberapa saat lagi.",
    });
  } finally {
    isLoadingChat.value = false;
    await scrollToBottom();
  }
};

// TRIP PLANNER (GROQ/GEMINI API)
const plannerForm = ref({
  days: 2,
  interest: "Campuran (Budaya, Alam, Kuliner)",
});
const isGeneratingPlanner = ref(false);
const itinerary = ref<any[] | null>(null);
const plannerError = ref<string | null>(null);

const interests = [
  "Sejarah & Kraton",
  "Alam & Pantai",
  "Kuliner",
  "Campuran (Budaya, Alam, Kuliner)",
];

const generatePlan = async () => {
  isGeneratingPlanner.value = true;
  itinerary.value = null;
  plannerError.value = null;

  try {
    const response = await $fetch("/api/planner", {
      method: "POST",
      body: plannerForm.value,
    });

    if (response && response.plan && Array.isArray(response.plan)) {
      itinerary.value = response.plan;
    } else {
      throw new Error(
        "Struktur JSON dari AI tidak sesuai format (bukan Array)",
      );
    }
  } catch (error: any) {
    console.error("Planner API Error:", error);
    plannerError.value =
      "Nexus AI gagal merakit jadwal. Pastikan kunci API telah dikonfigurasi dengan benar di server.";
  } finally {
    isGeneratingPlanner.value = false;
  }
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    <transition name="slide-up">
      <div
        v-if="isOpen"
        class="mb-4 w-[340px] sm:w-[380px] h-[550px] bg-warm-white rounded-2xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right border border-line/30"
      >
        <div
          class="bg-ink p-4 flex items-center justify-between text-warm-white"
        >
          <div class="flex items-center gap-3">
            <button
              v-if="activeView !== 'menu'"
              @click="activeView = 'menu'"
              class="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              aria-label="Kembali ke Menu"
            >
              <ArrowLeft class="w-4 h-4" />
            </button>
            <Sparkles v-else class="w-5 h-5 text-terra" />

            <div>
              <div
                class="font-josefin text-[12px] tracking-[0.1em] text-terra uppercase font-semibold"
              >
                {{
                  activeView === "menu"
                    ? "Nexus AI"
                    : activeView === "chat"
                      ? "Pemandu Digital"
                      : "Arsitek Perjalanan"
                }}
              </div>
              <div class="font-lato text-[10px] text-white/50">
                Jiwa Nusantara (Beta)
              </div>
            </div>
          </div>
          <button
            @click="isOpen = false"
            class="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
            aria-label="Tutup Panel"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <div
          v-if="activeView === 'menu'"
          class="flex-grow p-5 flex flex-col justify-center gap-4 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"
        >
          <div class="text-center mb-6">
            <h3 class="font-libre text-[22px] font-bold text-ink mb-2">
              Halo, Penjelajah.
            </h3>
            <p class="text-[14px] text-brown font-light">
              Bagaimana saya bisa membantumu menemukan jiwa Yogyakarta hari ini?
            </p>
          </div>

          <button
            @click="activeView = 'chat'"
            class="group bg-white border border-line p-5 rounded-xl hover:border-terra hover:shadow-md transition-all text-left flex items-start gap-4"
          >
            <div
              class="bg-ink/5 p-3 rounded-lg group-hover:bg-terra/10 transition-colors"
            >
              <Bot
                class="w-6 h-6 text-ink group-hover:text-terra transition-colors"
              />
            </div>
            <div>
              <div class="font-libre text-[16px] font-bold text-ink mb-1">
                Tanya Pemandu
              </div>
              <div class="text-[12px] text-brown font-light leading-relaxed">
                Tanya rute, harga tiket, atau sejarah destinasi secara
                real-time.
              </div>
            </div>
          </button>

          <button
            @click="activeView = 'planner'"
            class="group bg-white border border-line p-5 rounded-xl hover:border-terra hover:shadow-md transition-all text-left flex items-start gap-4"
          >
            <div
              class="bg-ink/5 p-3 rounded-lg group-hover:bg-terra/10 transition-colors"
            >
              <Map
                class="w-6 h-6 text-ink group-hover:text-terra transition-colors"
              />
            </div>
            <div>
              <div class="font-libre text-[16px] font-bold text-ink mb-1">
                Rancang Itinerary
              </div>
              <div class="text-[12px] text-brown font-light leading-relaxed">
                AI akan merakit jadwal perjalanan otomatis berdasarkan minatmu.
              </div>
            </div>
          </button>
        </div>

        <div
          v-if="activeView === 'chat'"
          class="flex-grow flex flex-col h-full bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"
        >
          <div
            ref="chatContainer"
            class="flex-grow overflow-y-auto p-5 flex flex-col gap-4"
          >
            <div
              v-for="(msg, index) in chatHistory"
              :key="index"
              class="max-w-[85%] p-3 rounded-2xl text-[14px] font-light leading-relaxed shadow-sm"
              :class="
                msg.role === 'ai'
                  ? 'bg-white border border-line text-ink self-start rounded-tl-sm'
                  : 'bg-terra text-white self-end rounded-tr-sm'
              "
            >
              <div class="flex gap-2 items-start">
                <Sparkles
                  v-if="msg.role === 'ai'"
                  class="w-3 h-3 mt-1 flex-shrink-0 text-terra"
                />
                <User v-else class="w-3 h-3 mt-1 flex-shrink-0 text-white/70" />
                <span
                  class="whitespace-pre-wrap"
                  v-html="
                    msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  "
                ></span>
              </div>
            </div>

            <div
              v-if="isLoadingChat"
              class="bg-white border border-line text-ink self-start p-3 rounded-2xl rounded-tl-sm max-w-[85%] flex items-center gap-2 text-[14px]"
            >
              <Sparkles class="w-3 h-3 animate-spin text-terra" />
              <span class="text-muted italic">Menyusun jawaban...</span>
            </div>
          </div>

          <form
            @submit.prevent="sendMessage"
            class="p-4 bg-white border-t border-line flex gap-2"
          >
            <input
              v-model="inputMessage"
              type="text"
              placeholder="Ketik pertanyaanmu..."
              class="flex-grow bg-warm-white border border-line rounded-xl px-4 py-2.5 text-[14px] font-light focus:outline-none focus:border-terra transition-colors"
              :disabled="isLoadingChat"
            />
            <button
              type="submit"
              class="bg-ink hover:bg-terra text-white w-11 h-11 rounded-xl transition-colors flex items-center justify-center disabled:opacity-50"
              :disabled="isLoadingChat || !inputMessage.trim()"
            >
              <Send class="w-4 h-4" />
            </button>
          </form>
        </div>

        <div
          v-if="activeView === 'planner'"
          class="flex-grow overflow-y-auto p-5 flex flex-col bg-warm-white relative"
        >
          <div
            v-if="plannerError"
            class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertTriangle class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div class="text-[13px] text-red-700 leading-relaxed">
              {{ plannerError }}
            </div>
          </div>

          <div
            v-if="!itinerary && !isGeneratingPlanner"
            class="flex flex-col gap-6 animate-fade-in"
          >
            <div class="font-libre text-[18px] font-bold text-ink">
              Berapa lama di Jogja?
            </div>
            <div class="flex gap-2">
              <button
                v-for="d in [1, 2, 3, 4]"
                :key="d"
                @click="plannerForm.days = d"
                class="flex-1 py-3 rounded-xl border font-josefin text-[14px] transition-all"
                :class="
                  plannerForm.days === d
                    ? 'border-terra bg-terra text-white shadow-md'
                    : 'border-line text-muted bg-white hover:border-ink'
                "
              >
                {{ d }} Hr
              </button>
            </div>

            <div class="font-libre text-[18px] font-bold text-ink mt-2">
              Apa fokus minatmu?
            </div>
            <div class="flex flex-col gap-2">
              <button
                v-for="int in interests"
                :key="int"
                @click="plannerForm.interest = int"
                class="text-left px-4 py-3 rounded-xl border font-josefin text-[12px] tracking-[0.05em] uppercase transition-all"
                :class="
                  plannerForm.interest === int
                    ? 'border-terra bg-ink text-terra shadow-md'
                    : 'border-line text-muted bg-white hover:border-ink'
                "
              >
                {{ int }}
              </button>
            </div>

            <button
              @click="generatePlan"
              class="w-full bg-terra hover:bg-ink text-white rounded-xl py-4 mt-4 font-josefin text-[12px] font-bold tracking-[0.2em] uppercase transition-all shadow-lg flex justify-center gap-2"
            >
              <Sparkles class="w-4 h-4" /> Rancang Itinerary
            </button>
          </div>

          <div
            v-if="isGeneratingPlanner"
            class="flex-grow flex flex-col items-center justify-center text-center py-10"
          >
            <div
              class="w-12 h-12 border-4 border-terra border-t-transparent rounded-full animate-spin mb-4"
            ></div>
            <div
              class="font-josefin text-[12px] uppercase tracking-[0.2em] text-ink animate-pulse"
            >
              Menghubungi Nexus AI...
            </div>
            <div class="text-[12px] text-muted mt-2 px-6">
              Memproses data spasial dan waktu untuk
              {{ plannerForm.days }} hari...
            </div>
          </div>

          <div
            v-if="itinerary"
            class="animate-fade-in flex flex-col gap-6 pb-6"
          >
            <div class="flex justify-between items-center mb-2">
              <div class="font-libre text-[20px] font-bold text-ink">
                Jadwal {{ plannerForm.days }} Hari
              </div>
              <button
                @click="
                  itinerary = null;
                  plannerError = null;
                "
                class="font-josefin text-[10px] text-terra uppercase underline tracking-widest"
              >
                Ubah Rencana
              </button>
            </div>

            <div
              v-for="day in itinerary"
              :key="day.day"
              class="bg-white rounded-xl border border-line p-4 shadow-sm"
            >
              <div
                class="font-josefin text-[12px] font-bold text-terra uppercase tracking-widest mb-3 border-b border-line pb-2"
              >
                Hari {{ day.hari || day.day }}
              </div>
              <div class="flex flex-col gap-4">
                <template v-if="typeof day.kegiatan[0] === 'string'">
                  <div
                    v-for="(act, idx) in day.kegiatan"
                    :key="'str-' + idx"
                    class="flex gap-3"
                  >
                    <div
                      class="font-libre text-[14px] font-bold text-ink leading-tight"
                    >
                      {{ act }}
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div
                    v-for="(act, idx) in day.kegiatan"
                    :key="'obj-' + idx"
                    class="flex gap-3"
                  >
                    <div
                      class="font-josefin text-[10px] font-bold text-ink/40 w-[35px] pt-1 flex-shrink-0"
                    >
                      {{ act.waktu || act.time || "-" }}
                    </div>
                    <div>
                      <div
                        class="font-libre text-[14px] font-bold text-ink leading-tight mb-1"
                      >
                        {{ act.kegiatan || act.title }}
                      </div>
                      <div
                        v-if="act.deskripsi || act.desc"
                        class="text-[12px] font-light text-brown leading-relaxed"
                      >
                        {{ act.deskripsi || act.desc }}
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <button
      @click="isOpen = !isOpen"
      class="w-14 h-14 bg-terra text-white rounded-full shadow-[0_10px_25px_-5px_rgba(200,75,49,0.5)] hover:bg-ink hover:shadow-[0_10px_25px_-5px_rgba(26,18,8,0.5)] transition-all duration-300 flex items-center justify-center group z-50"
      :class="
        isOpen
          ? 'scale-90 opacity-0 pointer-events-none absolute'
          : 'scale-100 opacity-100 relative'
      "
      aria-label="Buka Nexus AI"
    >
      <Sparkles class="w-6 h-6 group-hover:scale-110 transition-transform" />
    </button>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
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
