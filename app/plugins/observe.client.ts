export default defineNuxtPlugin((nuxtApp) => {
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

  nuxtApp.vueApp.directive("observe", {
    mounted(el) {
      observer.observe(el);
    },
    updated(el) {
      if (!el.classList.contains("in-view")) {
        observer.unobserve(el);
        observer.observe(el);
      }
    },
    unmounted(el) {
      observer.unobserve(el);
    },
  });
});
