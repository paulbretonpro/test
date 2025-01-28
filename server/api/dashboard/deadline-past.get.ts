import { PrismaClient, TaskState } from "@prisma/client";
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // const user = await serverSupabaseUser(event);

  // if(!user) {
  //   createError({
  //     status: 401,
  //     message: "Unauthorized",
  //   })

  //   return
  // }
  const today = new Date()

  return await prisma.task.findMany({
    where: {
      deadline: {
        lt: today
      },
      state: {
        in: [
          TaskState.TODO,
          TaskState.PENDING
        ]
      },
      userId: '87e6fbfb-627f-4674-bd77-9b40cb39a9a1',
    }
  });
});
