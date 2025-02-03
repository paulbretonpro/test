import { TaskState, type Task } from "@prisma/client";

export const useTasksStore = defineStore("tasks", () => {
  const toast = useToast();
  const dayjs = useDayjs();

  const tasksTodo = ref<Task[]>([]);
  const tasksDone = ref<Task[]>([]);
  const tasksPending = ref<Task[]>([]);

  const countTasks = ref({
    todo: 0,
    pending: 0,
  });

  const addNewTask = async (task: Partial<Task>) => {
    try {
      return await $fetch("/api/tasks", {
        method: "POST",
        body: {
          title: task.title,
          content: task.content,
          categoryId: task.categoryId,
          deadline: task.deadline,
          state: task.state,
          priority: task.priority,
        },
      });
    } catch (error) {
      toast.add({
        title: "Erreur",
        description: "Impossible de créer la tâche",
        color: "red",
      });

      throw error;
    }
  };

  const fetchTasksCount = async () => {
    try {
      countTasks.value = await $fetch<{ todo: number; pending: number }>(
        "/api/tasks/counts",
        {
          query: {
            startDate: dayjs().set("hour", 0).set("minute", 0).toISOString(),
            endDate: dayjs().set("hour", 23).set("minute", 59).toISOString(),
          },
        }
      );
    } catch (error) {
      toast.add({
        title: "Erreur",
        description: "Impossible de récupérer les tâches",
        color: "red",
      });
    }
  };

  const fetchTaskByState = async (state: TaskState) => {
    try {
      const data = await $fetch<Task[]>("/api/tasks", { query: { state } });
      setTasksListByState(state, data);
    } catch (error) {
      toast.add({
        title: "Erreur",
        description: "Impossible de récupérer les tâches",
        color: "red",
      });
    }
  };

  const setTasksListByState = (state: TaskState, tasks: Task[]) => {
    switch (state) {
      case TaskState.TODO:
        tasksTodo.value = tasks;
        break;
      case TaskState.DONE:
        tasksDone.value = tasks;
        break;
      case TaskState.PENDING:
        tasksPending.value = tasks;
        break;
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await $fetch<Task>(`/api/tasks/${task.id}`, {
        method: "PUT",
        body: task,
      });
    } catch (error) {
      toast.add({
        title: "Erreur",
        description: "Impossible de mettre à jour la tâche",
        color: "red",
      });

      throw error;
    }
  };

  const removeTask = (task: Task) => {
    switch (task.state) {
      case TaskState.TODO:
        const indexTodo = tasksTodo.value.findIndex((t) => t.id === task.id);
        tasksTodo.value.splice(indexTodo, 1);
        break;
      case TaskState.DONE:
        const indexDone = tasksDone.value.findIndex((t) => t.id === task.id);
        tasksDone.value.splice(indexDone, 1);
        break;
      case TaskState.PENDING:
        const indexPending = tasksPending.value.findIndex((t) => t.id === task.id);
        tasksPending.value.splice(indexPending, 1);
        break;
    }
  }

  watch([tasksTodo, tasksDone, tasksPending], async (newValues, oldValues) => {
    if (newValues[0].length === 0 && oldValues[0].length > 0) {
      toast.add({
        color: "green",
        title: "Bravo",
        description: "Vous avez terminé toutes vos tâches",
      });
    }

    await fetchTasksCount();
  }, { deep: true });

  return {
    addNewTask,
    countTasks,
    fetchTaskByState,
    setTasksListByState,
    tasksDone,
    tasksTodo,
    tasksPending,
    updateTask,
    removeTask
  };
});
