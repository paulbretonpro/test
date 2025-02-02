<template>
  <div class="flex flex-col gap-4" v-auto-animate v-if="tasks.length">
    <TasksTask v-for="task in tasks" :key="task.id" :task />
  </div>

  <EmptyTasksList v-else />
</template>
<script setup lang="ts">
import type { Task } from "@prisma/client";

defineProps<{
  tasks: Task[];
}>();
</script>
