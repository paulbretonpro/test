import { Prisma, PrismaClient, TaskState } from "@prisma/client";
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient();

const createTask = (
  title: string,
  content: string,
  categoryId: number,
  deadline: Date,
  state: TaskState,
  priority: number,
  userId: string
) => {
  return Prisma.validator<Prisma.TaskCreateInput>()({
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
    user: {
      connect: {
        id: userId,
      },
    },
  });
};

export default defineEventHandler(async (event) => {
  const { title, content, categoryId, deadline, state, priority } =
    await readBody(event);

  const user = await serverSupabaseUser(event);

  if(!user) {
    createError({
      status: 401,
      message: "Unauthorized",
    })

    return
  }

  return await prisma.task.create({
    data: createTask(
      title,
      content,
      categoryId,
      deadline,
      state,
      priority,
      user.id
    ),
  });
});
