// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Jiwa Nusantara — Yogyakarta",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&family=Josefin+Sans:wght@300;400;600&display=swap",
        },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
