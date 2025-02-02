<template>
  <div 
    class="flex gap-2 items-center justify-between border p-2 rounded-md"
    :class="{ 'bg-gray-50 italic': task.state === TaskState.DONE }"
    >
    <div class="text-sm text-gray-800 font-normal">{{ task.state }}</div>
    <UButton variant="ghost" icon="i-heroicons-ellipsis-vertical" />
  </div>
</template>
<script setup lang="ts">
import { TaskState, type Task } from '@prisma/client';

defineProps<{
  task: Task
}>()
</script>