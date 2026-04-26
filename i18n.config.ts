export default defineI18nConfig(() => ({
  legacy: false,
  locale: "id",
  messages: {
    id: {
      nav: {
        sejarah: "Sejarah",
        budaya: "Budaya",
        kuliner: "Kuliner",
        wisata: "Wisata",
        teknologi: "Teknologi",
        peta: "Peta",
      },
    },
    en: {
      nav: {
        sejarah: "History",
        budaya: "Culture",
        kuliner: "Culinary",
        wisata: "Tourism",
        teknologi: "Technology",
        peta: "Map",
      },
    },
  },
}));
