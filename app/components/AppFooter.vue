<script setup lang="ts">
const { locale } = useI18n();
</script>

<template>
  <footer
    class="bg-ink text-parchment/70 p-[32px_20px] md:p-[32px_24px] lg:p-[40px_60px] flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-0 relative z-10 text-center lg:text-left"
  >
    <span class="font-libre text-[16px] lg:text-[18px] text-parchment">
      Jiwa <em class="italic text-terra">Nusantara</em> —
      {{
        locale === "id"
          ? "Portal Digital Yogyakarta"
          : "Yogyakarta Digital Portal"
      }}
    </span>
    <span
      class="font-josefin text-[10px] font-light tracking-[0.15em] uppercase text-parchment/35"
    >
      impactora
    </span>
  </footer>
</template>
