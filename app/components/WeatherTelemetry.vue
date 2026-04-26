<script setup lang="ts">
import { useFetch } from "#imports";

const { data: weather } = await useFetch("/api/weather", {
  server: false,
  lazy: true,
  default: () => ({ temp: "--", humidity: "--", desc: "SYNCING" }),
});
</script>

<template>
  <div
    class="font-josefin text-[10px] font-semibold tracking-[0.15em] uppercase text-ink border border-line bg-parchment/80 backdrop-blur-sm px-4 py-2 inline-flex items-center gap-3"
  >
    <span>YOGYAKARTA</span>
    <div class="w-px h-3 bg-line"></div>
    <span class="text-terra">{{ weather.temp }}°C</span>
    <div class="w-px h-3 bg-line"></div>
    <span>RH: {{ weather.humidity }}%</span>
    <div class="w-px h-3 bg-line"></div>
    <span class="text-muted">{{ weather.desc }}</span>
  </div>
</template>
