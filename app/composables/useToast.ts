import { ref } from "vue";

const isVisible = ref(false);
const message = ref("");
const type = ref<"success" | "error" | "info">("info");
let timeoutId: ReturnType<typeof setTimeout>;

export const useToast = () => {
  const show = (
    msg: string,
    toastType: "success" | "error" | "info" = "info",
    duration = 3000,
  ) => {
    message.value = msg;
    type.value = toastType;
    isVisible.value = true;

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      isVisible.value = false;
    }, duration);
  };

  const hide = () => {
    isVisible.value = false;
  };

  return { isVisible, message, type, show, hide };
};
