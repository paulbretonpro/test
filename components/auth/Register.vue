<template>
  <UCard>
    <UForm :state="userForm" class="space-y-4" @submit="onSubmitRegister">
      <UFormGroup name="name" label="Pseudo">
        <UInput
          v-model="userForm.name"
          placeholder="EDudu"
        />
      </UFormGroup>
      <UFormGroup name="email" label="Email">
        <UInput
          v-model="userForm.email"
          type="email"
          placeholder="eric.dupont@gmail.com"
        />
      </UFormGroup>
      <UFormGroup name="password" label="Mot de passe">
        <UInput
          v-model="userForm.password"
          type="password"
          placeholder="********"
        />
      </UFormGroup>

      <UButton type="submit" block>Inscription</UButton>
    </UForm>

    <div
      class="text-center underline text-sm font-normal mt-2 cursor-pointer"
      @click="handleChangeCard"
    >
      Déjà inscrit ?
    </div>
  </UCard>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  'update:stateCard': [void],
}>()

const client = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const userForm = ref({
  email: "",
  password: "",
  name: "",
});

const onSubmitRegister = async () => {
  try {
    const { data, error } = await client.auth.signUp({
      email: userForm.value.email,
      password: userForm.value.password,
    });

    if(error) {
      throw error
    }

    await $fetch("/api/user", {
      method: "POST",
      body: {
        id: data?.user?.id,
        email: userForm.value.email,
        name: userForm.value.name,
      },
    });

    toast.add({
      color: "green",
      title: "Inscription réussie",
      description: "Un email de confirmation vous a été envoyé.",
    });

    handleChangeCard()
  } catch (error) {

    toast.add({
      color: "red",
      title: "Erreur",
      description: "Erreur lors de l'inscription. Veuillez réessayer.",
    });
  }
};

const handleChangeCard = () => {
  emit('update:stateCard')
}

watchEffect(() => {
  if (user.value) {
    navigateTo("/");
  }
})
</script>
