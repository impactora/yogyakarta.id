export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("observe", {
    mounted(el) {
      if (import.meta.client) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
              }
            });
          },
          { threshold: 0.1 },
        );
        el._observer = observer;
        observer.observe(el);
      }
    },
    updated(el) {
      if (import.meta.client && el._observer) {
        if (!el.classList.contains("in-view")) {
          el._observer.unobserve(el);
          el._observer.observe(el);
        }
      }
    },
    unmounted(el) {
      if (import.meta.client && el._observer) {
        el._observer.unobserve(el);
      }
    },
  });
});
