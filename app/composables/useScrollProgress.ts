import { ref, onMounted, onUnmounted } from "vue";

export function useScrollProgress() {
  const progress = ref(0);
  let ticking = false;

  const updateProgress = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const windowHeight = scrollHeight - clientHeight;
    progress.value = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });

  return { progress };
}
