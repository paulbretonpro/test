<template>
  <UModal v-model="show" overlay>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div>Tâche</div>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Titre" name="title">
          <UInput v-model="state.title" />
        </UFormGroup>

        <UFormGroup label="Descritpion" name="content">
          <UInput v-model="state.content" />
        </UFormGroup>

        <UFormGroup label="Échéance" name="deadline">
          <!--<DatePicker v-model="state.deadline" />-->
          <UBadge>{{ dayjs().format('DD/MM/YYYY') }}</UBadge>
        </UFormGroup>

        <UFormGroup label="Priorité" name="priority">
          <USelectMenu
            v-model="state.priority"
            :options="priorityOptions"
            value-attribute="value"
            option-attribute="label"
          />
        </UFormGroup>

        <UFormGroup label="Statut" name="state">
          <USelectMenu
            v-model="state.state"
            :options="stateOptions"
            value-attribute="value"
            option-attribute="label"
          />
        </UFormGroup>

        <UFormGroup label="Catégorie" name="categoryId">
          <USelectMenu
            v-model="state.categoryId"
            :options="categories"
            :leading="loadingCategories"
            value-attribute="id"
            option-attribute="name"
            disabled
          />
        </UFormGroup>

        <div class="flex gap-4 justify-end">
          <UButton variant="outline" @click="show = false">Annuler</UButton>
          <UButton type="submit" :loading="loadingAddTask">Valider</UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { TaskState, type Task } from "@prisma/client";
import { Dayjs } from "dayjs";

interface ITaskForm {
  title: string | undefined;
  content: string | undefined;
  deadline: Dayjs;
  categoryId: number | undefined;
  priority: number;
  state: TaskState;
}

const show = defineModel<boolean>({ required: true });

const props = defineProps<{
  task?: Task;
}>();

const emit = defineEmits<{
  refresh: [void];
}>();

const dayjs = useDayjs();

const loadingAddTask = ref(false);

const { fetch } = useCategoryStore();
const { categories, loading: loadingCategories } = storeToRefs(
  useCategoryStore()
);

const { addNewTask } = useTasksStore();

const schema = z.object({
  title: z.string({ message: "Requis" }).max(255, "Maximun 255 characters"),
  content: z.string().max(255, "Maximun 255 characters").optional(),
  deadline: z.instanceof(dayjs as unknown as typeof Dayjs),
  categoryId: z.number(),
  priority: z.number(),
  state: z.nativeEnum(TaskState),
});

type Schema = z.output<typeof schema>;

const state = ref<ITaskForm>({
  title: props.task?.title,
  content: props.task?.content ?? undefined,
  deadline: props.task ? dayjs(props.task.deadline) : dayjs(),
  categoryId: categories.value.length === 1 ? categories.value[0].id : props.task?.categoryId,
  priority: props.task?.priority ?? TaskPriority.MEDIUM,
  state: props.task?.state ?? TaskState.TODO,
});

const priorityOptions = ref([
  {
    value: TaskPriority.LOW,
    label: "Basse",
  },
  {
    value: TaskPriority.MEDIUM,
    label: "Moyenne",
  },
  {
    value: TaskPriority.HIGH,
    label: "Haute",
  },
]);

const stateOptions = ref([
  {
    value: TaskState.TO_SCHEDULE,
    label: "À prioriser",
  },
  {
    value: TaskState.TODO,
    label: "À faire",
  },
  {
    value: TaskState.PENDING,
    label: "En Attente",
  },
  {
    value: TaskState.DONE,
    label: "Terminée",
  },
]);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  loadingAddTask.value = true;
  try {
    const task = await addNewTask({
      ...event.data,
      deadline: event.data.deadline.toDate(),
    });

    emit("refresh");
  } finally {
    loadingAddTask.value = false;
  }
};

onMounted(async () => {
  // Fetch categories options
  await fetch();
});
</script>
