<template>
  <div
    class="bg-parchment text-ink font-sans min-h-screen selection:bg-terra selection:text-white flex flex-col relative overflow-x-hidden"
  >
    <AppNavbar class="print:hidden" />

    <div class="flex-grow relative w-full">
      <slot />
    </div>

    <AppFooter class="print:hidden" />

    <AiGuideWidget class="print:hidden" />
    <AppToast class="print:hidden" />
  </div>
</template>
