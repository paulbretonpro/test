<template>
  <div
    class="text-gray-800 border rounded-md flex flex-justify-between items-center overflow-hidden bg-white"
  >
    <div class="bg-darkPrimary-500 h-14 w-2 min-w-2"></div>
    <div class="px-4 py-2 grow flex flex-col">
      <div class="text-sm font-medium">
        {{ task.title }}
      </div>
      <div class="text-sm font-normal text-gray-600">
        {{ dayjs(task.deadline).format("DD/MM/YYYY") }}
      </div>
    </div>

    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton icon="i-heroicons-ellipsis-vertical" variant="ghost" />
    </UDropdown>

    <div class="px-4 py-2">
      <UCheckbox
        :ui="{ base: 'w-6 h-6' }"
        :model-value="isDone"
        @update:model-value="handleUpdateState"
      />
    </div>
  </div>

  <LazyTasksModalForm v-if="showDialog" v-model="showDialog" :task="task" />
</template>
<script setup lang="ts">
import { TaskState, type Task } from "@prisma/client";

const props = defineProps<{
  task: Task;
}>();

const dayjs = useDayjs();

const { updateState, deleteTask } = useUpdateTask()

const items = [
  [
    {
      label: "Ajouter des commentaires",
      icon: "i-heroicons-chat-bubble-oval-left-ellipsis",
      click: () => {
        console.log("Commentaires");
      },
    },
    {
      label: "Modifier",
      icon: "i-heroicons-pencil",
      click: () => (showDialog.value = true),
    },
  ],
  [
    {
      label: "Supprimer",
      icon: "i-heroicons-trash",
      class: "text-red-500",
      click: () => deleteTask(props.task),
    },
  ],
];

const showDialog = ref(false);

const isDone = computed(() => props.task.state === TaskState.DONE);

const handleUpdateState = async (state: boolean | undefined) => {
  await updateState(props.task, state)
}
</script>
