<template>
  <div
    class="bg-parchment text-ink font-sans min-h-screen selection:bg-terra selection:text-white flex flex-col relative overflow-x-hidden"
  >
    <AppNavbar />

    <div class="flex-grow relative w-full">
      <slot />
    </div>

    <AppFooter />

    <AiGuideWidget />
    <AppToast />
  </div>
</template>
