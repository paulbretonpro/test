<template>
  <UContainer>
    <UButton color="red" icon="i-heroicons-arrow-left-start-on-rectangle" @click="handleLogout">Se déconnecter</UButton>
  </UContainer>
</template>
<script setup lang="ts">
// definePageMeta({
//   middleware: 'auth'
// })

// const client = useSupabaseClient()
// 
// const user = useSupabaseUser()

const handleLogout = async () => {
  // await client.auth.signOut()
  
  navigateTo("/login")
}
</script>