<script setup lang="ts">
import { useI18n } from "#imports";

const { locale } = useI18n();
</script>

<template>
  <div
    class="absolute bottom-6 left-6 z-20 pointer-events-none flex flex-col gap-4"
  >
    <div
      class="bg-warm-white/90 backdrop-blur-md p-5 rounded-xl border border-line shadow-xl max-w-[320px] pointer-events-auto"
    >
      <div
        class="font-josefin text-[10px] text-terra uppercase tracking-widest font-bold mb-2"
      >
        Daerah Istimewa Yogyakarta
      </div>
      <p class="font-lato text-[12px] text-ink/80 leading-relaxed">
        {{
          locale === "en"
            ? "Consists of 1 City and 4 Regencies:"
            : "Terdiri dari 1 Kota dan 4 Kabupaten:"
        }}
        <strong class="text-ink"
          >Kota Yogyakarta, Sleman, Bantul, Kulon Progo,
          {{ locale === "en" ? "and" : "dan" }} Gunungkidul.</strong
        >
      </p>
    </div>
  </div>
</template>
