<script setup lang="ts">
import { ref, computed } from "vue";
import { useHead, useI18n } from "#imports";
import { Clock, Ticket, Bus, MapPin, Share2, Printer } from "lucide-vue-next";

const { t, locale } = useI18n();
const toast = useToast();

const { data: rawDestinations } = await useAsyncData("wisata", () =>
  $fetch<any[]>("/api/data/wisata"),
);

const destinations = computed(() => {
  if (!rawDestinations.value) return [];
  return rawDestinations.value.map((d: any) => ({
    ...d,
    displayDesc: d.desc[locale.value as "id" | "en"],
  }));
});

const activeDestination = ref("");

const activeMapUrl = computed(() => {
  const target = destinations.value.find(
    (d) => d.id === activeDestination.value,
  );
  return target?.mapUrl ?? destinations.value[0]?.mapUrl ?? "";
});

const activeImage = computed(() => {
  const target = destinations.value.find(
    (d) => d.id === activeDestination.value,
  );
  return target?.image ?? destinations.value[0]?.image ?? "";
});

watch(
  () => destinations.value,
  (val) => {
    if (val.length && !activeDestination.value) {
      activeDestination.value = val[0].id;
    }
  },
  { immediate: true },
);

const shareDestination = async (item: any) => {
  const shareData = {
    title: `${item.title} - Jiwa Nusantara`,
    text: item.displayDesc,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {}
  } else {
    try {
      await navigator.clipboard.writeText(
        `${shareData.title}\n${shareData.text}\n\n${shareData.url}`,
      );
      toast.show(t("wisata.share_success"), "success");
    } catch {
      toast.show(t("wisata.share_failed"), "error");
    }
  }
};

const triggerPrint = () => {
  window.print();
};

useHead({ title: computed(() => t("wisata.page_title")) });
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10 print:pt-0 print:px-0"
  >
    <div class="flex justify-between items-start mb-8 print:hidden">
      <CategoryHeader
        v-observe
        class="reveal-up"
        :category="$t('wisata.category')"
        :title="$t('wisata.header_title')"
        :description="$t('wisata.header_desc')"
      />

      <div class="flex gap-2 reveal-up delay-100 mt-2 lg:mt-0">
        <button
          @click="triggerPrint"
          class="hidden md:flex items-center gap-2 px-3 py-2 bg-ink text-warm-white hover:bg-terra transition-colors font-josefin text-[10px] tracking-widest uppercase cursor-pointer"
        >
          <Printer class="w-4 h-4" />
          {{ $t("wisata.print_pdf") }}
        </button>
      </div>
    </div>

    <div
      v-observe
      class="w-full h-[30vh] lg:h-[40vh] mb-16 relative overflow-hidden reveal-up delay-100 border border-line shadow-xl bg-[#1a1208] print:hidden"
    >
      <AppImage
        :key="activeDestination"
        :src="activeImage"
        alt="Visual Destinasi"
        class="w-full h-full object-cover opacity-90 transition-opacity duration-500"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-[#1a1208]/10 transition-none"></div>
      <div
        class="absolute bottom-4 right-4 z-20 font-josefin text-[8px] tracking-[0.2em] text-[#faf7f2]/80 uppercase bg-[#1a1208]/80 backdrop-blur-sm px-3 py-1 border border-[#faf7f2]/10 transition-none"
      >
        {{ $t("wisata.location_preview") }}
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
          :aria-label="`Tampilkan info destinasi ${item.title}`"
          class="text-left p-6 lg:p-8 border-b border-line last:border-b-0 transition-all duration-300 group relative overflow-hidden flex flex-col print:border-b-2 print:border-ink print:mb-8 print:p-0 print:break-inside-avoid"
          :class="activeDestination === item.id ? 'bg-ink' : 'hover:bg-ink/5'"
        >
          <div
            class="absolute left-0 top-0 bottom-0 w-1 bg-terra transition-transform duration-300 origin-top print:hidden"
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

            <div class="print:hidden">
              <div
                @click.stop="shareDestination(item)"
                class="p-2 border rounded-full hover:bg-terra hover:text-warm-white hover:border-terra transition-all cursor-pointer"
                :class="
                  activeDestination === item.id
                    ? 'border-parchment text-parchment'
                    : 'border-line text-muted'
                "
                :title="$t('wisata.share_title')"
              >
                <Share2 class="w-4 h-4" />
              </div>
            </div>
          </div>

          <p
            class="text-[14px] font-light leading-[1.8] transition-colors duration-300 mb-5 max-w-[800px] print:text-black"
            :class="
              activeDestination === item.id ? 'text-parchment/80' : 'text-brown'
            "
          >
            {{ item.displayDesc }}
          </p>

          <div
            class="flex flex-col gap-3 pt-4 border-t font-josefin text-[9px] tracking-[0.15em] transition-colors duration-300 w-full print:text-black print:border-black"
            :class="
              activeDestination === item.id
                ? 'text-parchment/80 border-parchment/20'
                : 'text-muted border-line/30'
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

      <div v-observe class="relative reveal-up delay-200 print:hidden">
        <div
          class="lg:sticky lg:top-[120px] h-[400px] lg:h-[600px] w-full bg-ink border border-line shadow-2xl overflow-hidden p-2"
        >
          <div
            class="absolute inset-0 flex items-center justify-center font-josefin text-[10px] tracking-[0.2em] text-parchment/50 uppercase z-0"
          >
            {{ $t("wisata.loading_map") }}
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
