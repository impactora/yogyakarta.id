export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("observe", {
    mounted(el) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add("in-view");
              el.dataset.inView = "true";
              observerInstance.unobserve(el);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        },
      );

      observer.observe(el);
    },
    updated(el) {
      if (el.dataset.inView === "true") {
        el.classList.add("in-view");
      }
    },
  });
});
