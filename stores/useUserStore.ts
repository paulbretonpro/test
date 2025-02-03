import { type User } from "@prisma/client";

export const useUserStore = defineStore("users", () => {
  const userSupabase = useSupabaseUser()

  const user = ref<User>()

  const fetch = async () => {
    const profil = await $fetch<User>(`/api/user/${userSupabase.value?.id}`)

    if (profil) { user.value = profil }
  }

  return {
    fetch,
    user
  };
});
