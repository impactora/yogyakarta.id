<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useColorMode } from "#imports";

const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <button
    @click="toggleTheme"
    class="flex items-center justify-center p-2 hover:bg-ink/5 rounded-full transition-colors"
    aria-label="Toggle Theme"
  >
    <ClientOnly>
      <Sun
        v-if="colorMode.value === 'dark'"
        class="w-4 h-4 text-gold-warm hover:text-terra transition-colors"
      />
      <Moon
        v-else
        class="w-4 h-4 text-ink hover:text-terra transition-colors"
      />
      <template #fallback>
        <div class="w-4 h-4" />
      </template>
    </ClientOnly>
  </button>
</template>
