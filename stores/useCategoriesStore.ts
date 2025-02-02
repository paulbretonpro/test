import { type Category } from "@prisma/client";

export const useCategoryStore = defineStore("categoires", () => {
  const toast = useToast();

  const loading = ref(false);
  const categories = ref<Category[]>([]);

  const fetch = async () => {
    loading.value = true;
    try {
      // categories.value = await $fetch<Category[]>("api/categories");
      categories.value = [];
    } catch {
      toast.add({
        title: "Erreur",
        description: "Impossible de charger les catégories",
        color: "red",
      });
    } finally {
      loading.value = false;
    }
  };
  return {
    categories,
    fetch,
    loading,
  };
});
