import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: {
        lang: "id",
      },
      title: "Jiwa Nusantara — Yogyakarta",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Portal panduan wisata, sejarah, budaya, kuliner, dan teknologi Kota Yogyakarta.",
        },
        {
          property: "og:title",
          content: "Jiwa Nusantara - Nusantara Digital City",
        },
        {
          property: "og:description",
          content:
            "Eksplorasi dimensi kota Yogyakarta melalui portal digital interaktif 2026.",
        },
        { property: "og:image", content: "/og-image.jpg" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://yogyakarta.id" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Jiwa Nusantara - Yogyakarta" },
        {
          name: "twitter:description",
          content: "Portal digital kebudayaan dan teknologi Kota Yogyakarta.",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&family=Josefin+Sans:wght@300;400;600&display=swap",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
