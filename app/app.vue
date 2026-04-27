<template>
  <VitePwaManifest />
  <Html class="overscroll-none">
    <Body
      class="overscroll-none bg-warm-white text-ink font-lato antialiased transition-colors duration-300"
    >
      <NuxtLayout>
        <ScrollProgress class="print:hidden" />
        <NuxtRouteAnnouncer />
        <NuxtPage />
        <ClientOnly>
          <PwaPrompt class="print:hidden" />
        </ClientOnly>
      </NuxtLayout>
    </Body>
  </Html>
</template>
