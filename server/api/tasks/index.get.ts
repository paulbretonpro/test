import { PrismaClient, TaskState } from "@prisma/client";
import { z } from "zod";
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient();

const productSchema = z.object({
  state: z.enum([TaskState.DONE, TaskState.PENDING, TaskState.TODO]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if(!user) {
    createError({
      status: 401,
      message: "Unauthorized",
    })

    return
  }

  const query = await getValidatedQuery(event, productSchema.parse);

  return await prisma.task.findMany({
    where: {
      state: query.state as TaskState,
      userId: user.id,
      deadline: {
        gte: query.startDate,
        lte: query.endDate
      }
    },
    orderBy: [
      {
        priority: "desc",
      },
      {
        createdAt: "asc",
      },
    ],
  });
});
