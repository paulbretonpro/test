<template>
  <UCard :ui="{ body: { padding: 'px-0 py-0 sm:px-0 sm:py-0' } }">
    <template #header>
      <div class="flex justify-between items-center">
        <div class="font-medium">Deadline passées</div>
        <div class="font-extrabold text-3xl">{{ data?.length }}</div>
      </div>
    </template>

    <LazyLoader v-if="status === 'pending'" />

    <template v-else>
      <div v-if="data?.length" class="flex flex-col divide-y-2 pb-2">
        <LazyDashboardTask v-for="task in data" :key="task.id" :task />
      </div>

      <EmptyTasksList v-else />
    </template>
  </UCard>
</template>
<script setup lang="ts">
import type { Task } from '@prisma/client';

const { data, status } = useLazyFetch<Task[]>('/api/dashboard/deadline-past', {
  headers: useRequestHeaders(['cookie'])
})
</script>