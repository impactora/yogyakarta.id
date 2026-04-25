<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useHead } from "#imports";

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
      crossorigin: "",
    },
  ],
  script: [
    { src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", crossorigin: "" },
  ],
});

const mapContainer = ref(null);

onMounted(() => {
  const checkLeaflet = setInterval(() => {
    if ((window as any).L && mapContainer.value) {
      clearInterval(checkLeaflet);
      const L = (window as any).L;

      const map = L.map(mapContainer.value).setView([-7.7956, 110.3695], 11);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
          subdomains: "abcd",
          maxZoom: 20,
        },
      ).addTo(map);

      const locations = [
        { name: "Candi Prambanan", lat: -7.752, lng: 110.4915 },
        { name: "Keraton Yogyakarta", lat: -7.8053, lng: 110.3642 },
        { name: "Jalan Malioboro", lat: -7.7926, lng: 110.3658 },
        { name: "Pantai Parangtritis", lat: -8.025, lng: 110.334 },
        { name: "Gunung Merapi", lat: -7.5407, lng: 110.4461 },
        { name: "Kotagede", lat: -7.8284, lng: 110.3951 },
      ];

      locations.forEach((loc) => {
        L.marker([loc.lat, loc.lng])
          .addTo(map)
          .bindPopup(
            `<b class="font-libre text-ink text-[14px]">${loc.name}</b>`,
          );
      });
    }
  }, 100);
});
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10 flex flex-col"
  >
    <CategoryHeader
      v-observe
      class="reveal-up mb-10"
      category="Peta"
      title="Navigasi Kosmologis"
      description="Peta interaktif Yogyakarta. Menyelaraskan seluruh titik koordinat destinasi wisata dalam satu kanvas navigasi."
    />

    <div
      v-observe
      class="flex-grow w-full bg-ink border border-line shadow-2xl relative reveal-up delay-200 h-[60vh] lg:h-[75vh]"
    >
      <div
        class="absolute inset-0 flex items-center justify-center font-josefin text-[10px] tracking-[0.2em] text-muted uppercase z-0"
      >
        Menghubungkan Jaringan Spasial...
      </div>
      <div ref="mapContainer" class="w-full h-full z-10 relative"></div>
    </div>
  </main>
</template>
