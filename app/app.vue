<template>
  <VitePwaManifest />
  <Html class="overscroll-none">
    <Body
      class="overscroll-none bg-warm-white text-ink font-lato antialiased transition-colors duration-300"
    >
      <NuxtLayout>
        <ScrollProgress />
        <NuxtRouteAnnouncer />
        <NuxtPage />
        <ClientOnly>
          <PwaPrompt />
        </ClientOnly>
      </NuxtLayout>
    </Body>
  </Html>
</template>
