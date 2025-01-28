<template>
  <UCard>
    <UForm :state="userForm" class="space-y-4" @submit="onSubmit">
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
          placeholder="**********"
        />
      </UFormGroup>

      <UButton type="submit" block>Connexion</UButton>
    </UForm>

    <div
      class="text-center underline text-sm font-normal mt-2 cursor-pointer"
      @click="handleChangeCard"
    >
      Pas encore inscrit ?
    </div>
  </UCard>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  'update:stateCard': [void],
}>()

const client = useSupabaseClient()
const toast = useToast()

const userForm = ref({
  email: "",
  password: "",
});

const onSubmit = async () => {
  try {
    await client.auth.signInWithPassword({
      email: userForm.value.email,
      password: userForm.value.password,
    });
  } catch (error) {
    toast.add({
      color: "red",
      title: "Erreur",
      description: "Email ou mot de passe incorrect",
    });
  }
}

const handleChangeCard = () => {
  emit('update:stateCard')
}
</script>
