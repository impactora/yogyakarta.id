<script setup lang="ts">
const navLinks = [
  { name: "Sejarah", path: "/sejarah" },
  { name: "Budaya", path: "/budaya" },
  { name: "Kuliner", path: "/kuliner" },
  { name: "Wisata", path: "/wisata" },
  { name: "Teknologi", path: "/teknologi" },
];
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] px-5 lg:px-[60px] h-[60px] lg:h-[72px] flex items-center justify-between bg-parchment/94 backdrop-blur-md border-b border-line"
  >
    <NuxtLink
      to="/"
      class="font-libre text-[18px] lg:text-[20px] font-normal text-ink tracking-[0.04em]"
      >Jiwa <em class="italic text-terra">Nusantara</em></NuxtLink
    >

    <ul class="hidden lg:flex gap-9">
      <li v-for="link in navLinks" :key="link.name">
        <NuxtLink
          :to="link.path"
          active-class="text-terra"
          class="font-josefin text-[11px] font-semibold tracking-[0.18em] uppercase text-muted transition-colors duration-200 hover:text-terra"
        >
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>

    <div class="flex items-center gap-3 lg:gap-6">
      <span
        class="font-josefin text-[9px] lg:text-[10px] font-light tracking-[0.15em] uppercase text-muted border-r border-line pr-3 lg:pr-6"
        >Vol. I · Yogyakarta</span
      >
      <a
        href="#"
        class="font-josefin text-[10px] font-semibold tracking-[0.1em] uppercase text-terra"
        >EN / ID</a
      >
    </div>
  </nav>
</template>
