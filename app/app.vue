<template>
  <VitePwaManifest />
  <Html class="overscroll-none">
    <Body
      class="overscroll-none bg-warm-white text-ink font-lato antialiased overflow-x-hidden transition-colors duration-300"
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
