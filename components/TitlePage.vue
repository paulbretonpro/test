<template>
  <div class="text-gray-900 text-xl font-semibold">{{ title }}</div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>