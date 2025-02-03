import { PrismaClient, TaskState } from "@prisma/client";
import { z } from "zod";
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient();

const productSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});


export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const query = await getValidatedQuery(event, productSchema.parse);

  if(!user) {
    createError({
      status: 401,
      message: "Unauthorized",
    })

    return
  }

  const todo = await prisma.task.count({
    where: {
      state: TaskState.TODO,
      userId: user.id,
      deadline: {
        gte: query.startDate,
        lte: query.endDate
      }
    },
  });

  const pending = await prisma.task.count({
    where: {
      state: TaskState.PENDING,
      userId: user.id,
      deadline: {
        gte: query.startDate,
        lte: query.endDate
      }
    },
  });

  return {
    todo,
    pending,
  };
});
