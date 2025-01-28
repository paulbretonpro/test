<template>
  <div class="flex justify-between gap-6 px-6 py-4">
    <div class="grow text-sm">{{ task.title }}</div>
    <UBadge>{{ getDealineFromNow }}</UBadge>
    <UCheckbox
      :ui="{ base: 'w-6 h-6' }"
      :model-value="false"
      @update:model-value="handleUpdateStateTask"
    />
  </div>
</template>
<script setup lang="ts">
import type { Task } from '@prisma/client';

const props = defineProps<{
  task: Task;
}>();

const dayjs = useDayjs()
const { updateState } = useUpdateTask();

const getDealineFromNow = computed(() => {
  return dayjs(props.task.deadline).fromNow();
})

const handleUpdateStateTask = async () => {
  await updateState(props.task, true);
}
</script>