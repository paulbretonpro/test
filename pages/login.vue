<template>
  <div class="h-full flex flex-col items-center justify-center">
    <UContainer>
      <AuthLogin v-if="stateCard === 'login'" @update:state-card="handleUpdateStateCard('register')" />

      <AuthRegister v-else @update:state-card="handleUpdateStateCard('login')" />
    </UContainer>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout'
})

const user = useSupabaseUser()
const { fetch } = useUserStore()

const stateCard = ref<"login" | "register">("login");

const handleUpdateStateCard = (state: "login" | "register") => {
  stateCard.value = state;
}

watchEffect(async () => {
  if (user.value) {
    navigateTo("/");
  }
})
</script>
