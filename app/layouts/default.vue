<template>
  <div>
    <AppNavbar />
    <slot />
    <AppFooter />
    <ClientOnly>
      <AiGuideWidget />
    </ClientOnly>
  </div>
</template>
