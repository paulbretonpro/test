<template>
  <div class="flex flex-col gap-4">
    <TitlePage title="Tâches terminées" />
    <Tasks :tasks />
  </div>
</template>
<script setup lang="ts">
import { TaskState } from "@prisma/client";

definePageMeta({
  middleware: 'auth'
})

const { tasks } = useFetchTasks(TaskState.DONE);
</script>
