<template>
  <div class="flex flex-col gap-4 overflow-hidden">
    <div class="text-center text-sm font-medium text-gray-900">{{ nameDay }}</div>
    <div v-if="tasks.length" class="flex flex-col gap-2 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-md"
    >
      <DashboardWeekTaskLight v-for="task in tasks" :key="task.id" :task />
    </div>

    <LazyEmptyTasksList v-else />
  </div>
</template>
<script setup lang="ts">
import type { Task } from '@prisma/client';

defineProps<{
  nameDay: string,
  tasks: Task[]
}>()
</script>