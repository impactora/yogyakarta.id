<script setup lang="ts">
import { computed } from "vue";
import { useHead, useI18n } from "#imports";

const { locale } = useI18n();

const rawInitiatives = [
  {
    id: "ugm-dteti",
    meta: { id: "Pusat Riset & Talent", en: "Research & Talent Hub" },
    title: {
      id: "Konsorsium Riset Pendidikan Tinggi",
      en: "Higher Education Research Consortium",
    },
    desc: {
      id: "21 perguruan tinggi Yogyakarta berkolaborasi menghasilkan puluhan ribu lulusan per tahun. Penyuplai utama talenta engineer untuk industri teknologi nasional.",
      en: "21 Yogyakarta universities collaborate to produce tens of thousands of graduates annually. The main supplier of engineering talent for the national tech industry.",
    },
  },
  {
    id: "silicon-wali",
    meta: { id: "Klaster Industri Digital", en: "Digital Industry Cluster" },
    title: {
      id: "Silicon Wali — Koridor Ringroad Utara",
      en: "Silicon Wali — North Ringroad Corridor",
    },
    desc: {
      id: "Jalur ekosistem yang menampung ratusan startup aktif, membentang dari studio game indie kelas dunia hingga perusahaan SaaS B2B berskala enterprise.",
      en: "An ecosystem corridor hosting hundreds of active startups, ranging from world-class indie game studios to enterprise-scale B2B SaaS companies.",
    },
  },
  {
    id: "block71",
    meta: { id: "Inkubator & Akselerator", en: "Incubator & Accelerator" },
    title: {
      id: "Block71 & Ekosistem Komunitas",
      en: "Block71 & Community Ecosystem",
    },
    desc: {
      id: "Pusat inkubasi kolaborasi NUS Enterprise yang menghubungkan inovator lokal dengan pasar global. Didukung lebih dari 200 event tech komunitas per tahun.",
      en: "An incubation hub collaborating with NUS Enterprise, connecting local innovators with global markets. Supported by over 200 tech community events per year.",
    },
  },
  {
    id: "jogja-smart-province",
    meta: { id: "Infrastruktur Kota", en: "City Infrastructure" },
    title: {
      id: "Jogja Smart Province (JSP)",
      en: "Jogja Smart Province (JSP)",
    },
    desc: {
      id: "Cetak biru digitalisasi layanan publik, integrasi sensor IoT mitigasi bencana Merapi, dan manajemen data presisi untuk tata kelola wilayah.",
      en: "A blueprint for public service digitalization, integration of Merapi disaster mitigation IoT sensors, and precision data management for regional governance.",
    },
  },
  {
    id: "jogjamark",
    meta: { id: "Ekosistem Kreatif", en: "Creative Ecosystem" },
    title: { id: "Jogja Creative District", en: "Jogja Creative District" },
    desc: {
      id: "Transformasi spasial kawasan selatan menjadi distrik hybrid: butik desainer lokal, studio animasi internasional, dan co-working space 24 jam.",
      en: "Spatial transformation of the southern area into a hybrid district: local designer boutiques, international animation studios, and 24-hour co-working spaces.",
    },
  },
];

const initiatives = computed(() => {
  const l = locale.value as "id" | "en";
  return rawInitiatives.map((item) => ({
    ...item,
    displayMeta: item.meta[l],
    displayTitle: item.title[l],
    displayDesc: item.desc[l],
  }));
});

useHead({
  title: computed(() =>
    locale.value === "id"
      ? "Teknologi - Jiwa Nusantara"
      : "Technology - Jiwa Nusantara",
  ),
});
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      :category="locale === 'id' ? 'Teknologi' : 'Technology'"
      :title="locale === 'id' ? 'Lompatan Digital' : 'Digital Leap'"
      :description="
        locale === 'id'
          ? 'Infrastruktur pendidikan tinggi, ekosistem startup Silicon Wali, dan cetak biru tata kota cerdas masa depan.'
          : 'Higher education infrastructure, the Silicon Wali startup ecosystem, and the blueprint for future smart city governance.'
      "
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
          {{ locale === "id" ? "Simpul Ekosistem" : "Ecosystem Node" }}
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
            {{
              locale === "id"
                ? "Lulusan STEM Berkualitas"
                : "Quality STEM Graduates"
            }}
          </div>
          <p
            class="text-[14px] text-parchment/50 font-light leading-[1.8] max-w-[450px] mb-4"
          >
            {{
              locale === "id"
                ? "Kota Pelajar bukan sekadar julukan. Ini adalah mesin pencetak engineer dan inovator teknologi terbesar di Indonesia di luar ibukota."
                : "The City of Students is not just a nickname. It is the largest printing machine for engineers and tech innovators in Indonesia outside the capital."
            }}
          </p>
          <div
            class="font-josefin text-[9px] text-white/30 uppercase tracking-widest border-t border-white/10 pt-4 mt-4 inline-block"
          >
            *{{
              locale === "id"
                ? "Estimasi kumulatif konsorsium PTN/PTS (BPS)"
                : "Cumulative estimate of PTN/PTS consortium (BPS)"
            }}
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
          {{ locale === "id" ? "Konektivitas" : "Connectivity" }}
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
            {{
              locale === "id" ? "Penetrasi Internet" : "Internet Penetration"
            }}
          </div>
          <div
            class="font-josefin text-[9px] text-ink/60 uppercase tracking-widest border-t border-ink/20 pt-4 mt-4"
          >
            *{{
              locale === "id"
                ? "Data Indeks Penetrasi APJII Wilayah DIY"
                : "APJII Penetration Index Data for DIY Region"
            }}
          </div>
        </div>
      </div>

      <div
        v-observe
        class="bg-line p-10 lg:p-12 flex flex-col justify-between reveal-up delay-200 lg:col-span-3"
      >
        <div
          class="font-josefin text-[10px] tracking-[0.25em] uppercase text-muted mb-12"
        >
          {{
            locale === "id" ? "Infrastruktur Bisnis" : "Business Infrastructure"
          }}
        </div>
        <div>
          <div
            class="font-libre text-[40px] font-bold text-ink leading-none mb-4"
          >
            300+
          </div>
          <div class="font-libre text-[18px] text-ink/80 mb-3">
            {{
              locale === "id"
                ? "Startup & Studio Aktif"
                : "Active Startups & Studios"
            }}
          </div>
          <p class="text-[13px] text-brown font-light leading-[1.6] mb-4">
            {{
              locale === "id"
                ? "Berkembang organik dengan efisiensi modal yang tinggi."
                : "Growing organically with high capital efficiency."
            }}
          </p>
          <div
            class="font-josefin text-[9px] text-ink/50 uppercase tracking-widest border-t border-ink/10 pt-4 mt-4"
          >
            *{{
              locale === "id"
                ? "Data Kurasi Diskominfo DIY"
                : "Diskominfo DIY Curation Data"
            }}
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
          {{ item.displayMeta }}
        </div>
        <h3 class="font-libre text-[22px] font-bold text-ink mb-4">
          {{ item.displayTitle }}
        </h3>
        <p class="text-[15px] font-light text-brown leading-[1.8]">
          {{ item.displayDesc }}
        </p>
      </article>
    </section>
  </main>
</template>
