<script setup lang="ts">
const mapUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=110.33,-7.85,110.42,-7.75&layer=mapnik";
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10 flex flex-col"
  >
    <CategoryHeader
      v-observe
      class="reveal-up mb-10"
      category="Peta"
      title="Navigasi Spasial"
      description="Peta interaktif pusat kota Yogyakarta untuk memandu eksplorasi turis domestik dan mancanegara."
    />

    <div
      v-observe
      class="flex-grow w-full bg-ink border border-line shadow-2xl relative reveal-up delay-200 min-h-[500px] lg:min-h-[700px]"
    >
      <div
        class="absolute inset-0 flex items-center justify-center font-josefin text-[10px] tracking-[0.2em] text-muted uppercase z-0"
      >
        Menginisialisasi Sistem Peta...
      </div>
      <iframe
        :src="mapUrl"
        class="relative z-10 w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 bg-ink"
        allowfullscreen="false"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </main>
</template>
