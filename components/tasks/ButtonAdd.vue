<template>
  <div class="absolute bottom-28 right-6">
    <UButton
      size="xl"
      icon="i-heroicons-plus"
      :ui="{ rounded: 'rounded-full' }"
      @click="showModal = true"
    ></UButton>
  </div>

  <LazyTasksModalForm
    v-if="showModal"
    v-model="showModal"
    @refresh="handleRefreshList"
  />
</template>
<script setup lang="ts">
const emit = defineEmits(["refresh"]);
const showModal = ref(false);

const handleRefreshList = () => {
  emit("refresh");
  showModal.value = false;
};
</script>