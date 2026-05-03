<script setup lang="ts">
import { useState } from "#imports";

const isTranslating = useState("isTranslating", () => false);
</script>

<template>
  <VitePwaManifest />
  <Html class="overscroll-none">
    <Body
      class="overscroll-none bg-warm-white text-ink font-lato antialiased transition-colors duration-300"
    >
      <NuxtLayout>
        <div
          class="transition-all duration-[400ms] ease-in-out w-full min-h-screen flex flex-col"
          :class="
            isTranslating
              ? 'opacity-0 blur-sm scale-[0.99] pointer-events-none'
              : 'opacity-100 blur-0 scale-100'
          "
        >
          <ScrollProgress class="print:hidden" />
          <NuxtRouteAnnouncer />
          <NuxtPage />
          <ClientOnly>
            <PwaPrompt class="print:hidden" />
          </ClientOnly>
        </div>
      </NuxtLayout>
    </Body>
  </Html>
</template>
