<script setup lang="ts">
import { ref, computed } from "vue";

const destinations = [
  {
    id: "prambanan",
    area: "Sleman",
    title: "Candi Prambanan",
    desc: "Gugusan candi Hindu terbesar di Indonesia yang menjulang setinggi 47 meter. Dibangun pada abad ke-9, arsitekturnya adalah mahakarya dedikasi spiritual wangsa Sanjaya.",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.30310860822!2d110.48891547594954!3d-7.75202059226685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5ae3bbd3155f%3A0x1d3615f79590748b!2sPrambanan%20Temple!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
  },
  {
    id: "malioboro",
    area: "Pusat Kota",
    title: "Jalan Malioboro",
    desc: "Poros pejalan kaki dan urat nadi ekonomi kultural Jogja. Membentang dari Tugu hingga Keraton, tempat ini adalah rumah bagi musisi jalanan, seniman, dan angkringan yang tak pernah tidur.",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.9351052676837!2d110.36342837595!3d-7.79664539222452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57404499e71b%3A0xeab4e1d15db5b534!2sJalan%20Malioboro%2C%20Yogyakarta!5e0!3m2!1sen!2sid!4v1700000000001!5m2!1sen!2sid",
  },
  {
    id: "parangtritis",
    area: "Bantul",
    title: "Pantai Parangtritis",
    desc: "Hamparan pasir hitam vulkanik yang berbatasan langsung dengan ombak ganas Samudra Hindia. Secara kosmologis, ini adalah gerbang magis menuju dimensi Ratu Pantai Selatan.",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.4184699507817!2d110.32049187595353!3d-8.01630169201083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7ba0e5272a8187%3A0x6a0c0a3e8e19c0b!2sParangtritis%20Beach!5e0!3m2!1sen!2sid!4v1700000000002!5m2!1sen!2sid",
  },
  {
    id: "keraton",
    area: "Pusat Kota",
    title: "Keraton Yogyakarta",
    desc: "Istana resmi Kesultanan Ngayogyakarta Hadiningrat yang masih berfungsi sebagai pusat pemerintahan monarki sekaligus benteng terakhir penjaga kebudayaan Jawa murni.",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.883713437194!2d110.36098047595007!3d-7.805284392215359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5796db06c7ef%3A0x395271d6f61b817!2sThe%20Palace%20of%20Yogyakarta!5e0!3m2!1sen!2sid!4v1700000000003!5m2!1sen!2sid",
  },
];

// Reactive state to control the currently focused destination
const activeDestination = ref(destinations[0].id);

// Dynamically compute the iframe URL based on selection to prevent mutating the DOM manually
const activeMapUrl = computed(() => {
  const target = destinations.find((d) => d.id === activeDestination.value);
  return target ? target.mapUrl : destinations[0].mapUrl;
});
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-32 relative z-10"
  >
    <CategoryHeader
      category="Wisata"
      title="Sudut Keajaiban Mataram"
      description="Navigasi destinasi ikonik Yogyakarta. Klik lokasi di bawah untuk menjelajahi peta secara interaktif."
    />

    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-10 lg:gap-16 mt-10"
    >
      <div class="flex flex-col">
        <button
          v-for="item in destinations"
          :key="item.id"
          @click="activeDestination = item.id"
          class="text-left p-6 lg:p-8 border-b border-line last:border-b-0 transition-all duration-300 group relative overflow-hidden"
          :class="
            activeDestination === item.id ? 'bg-ink' : 'hover:bg-white/40'
          "
        >
          <div
            class="absolute left-0 top-0 bottom-0 w-1 bg-terra transition-transform duration-300 origin-top"
            :class="
              activeDestination === item.id
                ? 'scale-y-100'
                : 'scale-y-0 group-hover:scale-y-100'
            "
          ></div>

          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase mb-3 transition-colors duration-300"
            :class="
              activeDestination === item.id ? 'text-terra' : 'text-terra/70'
            "
          >
            {{ item.area }}
          </div>

          <h2
            class="font-libre text-[24px] lg:text-[28px] font-bold mb-4 transition-colors duration-300"
            :class="
              activeDestination === item.id
                ? 'text-parchment'
                : 'text-ink group-hover:text-ink/80'
            "
          >
            {{ item.title }}
          </h2>

          <p
            class="text-[14px] font-light leading-[1.8] transition-colors duration-300"
            :class="
              activeDestination === item.id ? 'text-parchment/70' : 'text-brown'
            "
          >
            {{ item.desc }}
          </p>
        </button>
      </div>

      <div class="relative">
        <div
          class="lg:sticky lg:top-[120px] h-[400px] lg:h-[600px] w-full bg-ink border border-line shadow-2xl overflow-hidden p-2"
        >
          <div
            class="absolute inset-0 flex items-center justify-center font-josefin text-[10px] tracking-[0.2em] text-muted uppercase z-0"
          >
            Memuat Data Spasial...
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
