import { TaskState, type Task } from "@prisma/client";

export default function () {
const { updateTask, removeTask } = useTasksStore();
  
  
  const updateState = async (task: Task, value: boolean | undefined) => {
    if (value === undefined) return;
  
    await updateTask({
      ...task,
      state: value ? TaskState.DONE : TaskState.TODO,
    });

    removeTask(task)
  
    //await fetchTaskByState(task.state);
  };

  const deleteTask = async (task: Task) => {
    //await $fetch(`api/tasks/${task.id}`, { method: "DELETE" });
    //await fetchTaskByState(task.state);
  }

  return {
    deleteTask,
    updateState
  }
}