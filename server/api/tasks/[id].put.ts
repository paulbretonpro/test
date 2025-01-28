import { Prisma, PrismaClient, TaskState } from "@prisma/client";

const prisma = new PrismaClient();

const updateTask = (
  title: string,
  content: string,
  categoryId: number,
  deadline: Date,
  state: TaskState,
  priority: number
) => {
  return Prisma.validator<Prisma.TaskUpdateInput>()({
    title,
    content,
    category: {
      connect: {
        id: categoryId,
      },
    },
    deadline,
    state,
    priority,
  });
};

export default defineEventHandler(async (event) => {
  const { title, content, categoryId, deadline, state, priority } =
    await readBody(event);

  const { id } = event.context.params;

  return await prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: updateTask(title, content, categoryId, deadline, state, priority),
  });
});
