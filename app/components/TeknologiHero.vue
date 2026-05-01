<template>
  <div
    v-observe
    class="w-full h-[30vh] lg:h-[40vh] mt-10 mb-16 relative overflow-hidden reveal-up delay-100 border border-line shadow-xl bg-[#1a1208]"
  >
    <AppImage
      src="/images/teknologi/ugm.jpg"
      alt="Pusat Pendidikan UGM"
      class="w-full h-full object-cover grayscale-[20%] opacity-90 transition-none"
      loading="lazy"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-[#1a1208]/80 to-transparent transition-none z-10"
    ></div>
    <div class="absolute bottom-6 left-6 z-20 transition-none">
      <div
        class="font-josefin text-[9px] tracking-[0.2em] text-[#faf7f2] uppercase mb-2"
      >
        {{ $t("teknologi.ecosystem_node") }}
      </div>
      <div class="font-libre text-[20px] text-[#faf7f2]">
        Universitas Gadjah Mada
      </div>
    </div>
  </div>
</template>
