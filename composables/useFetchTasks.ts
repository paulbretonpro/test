import { TaskState, type Task } from "@prisma/client";
import { storeToRefs } from "pinia";

export default function (state: TaskState) {
  const toast = useToast();
  const dayjs = useDayjs();

  const { setTasksListByState } = useTasksStore();
  const { tasksDone, tasksTodo, tasksPending } = storeToRefs(useTasksStore());

  const tasks = computed(() => {
    switch (state) {
      case TaskState.TODO:
        return tasksTodo.value;
      case TaskState.DONE:
        return tasksDone.value;
      case TaskState.PENDING:
        return tasksPending.value;
    }
  });

  // const { refresh } = useFetch<Task[]>("api/tasks", {
    // query: { 
      // state,
      // startDate: dayjs().set("hour", 0).set("minute", 0).toISOString(),
      // endDate: dayjs().set("hour", 23).set("minute", 59).toISOString(),
    // },
    // key: `tasks-${state}`,
    // default: () => [],
    // onResponse: (response) => {
      // setTasksListByState(state, response.response._data);
    // },
    // onRequestError: (error) => {
      // toast.add({
        // title: "Erreur",
        // description: "Impossible de récupérer les tâches",
        // color: "red",
      // });
    // },
  // });

  return {
    tasks,
    refresh: () => { console.log('refresh');
    },
  };
}
