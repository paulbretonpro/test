import { PrismaClient, TaskState } from "@prisma/client";
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if(!user) {
    createError({
      status: 401,
      message: "Unauthorized",
    })

    return
  }

  return await prisma.task.findMany({
    where: {
      state: TaskState.TO_SCHEDULE,
      userId: user.id,
    }
  });
});
