import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { email, name, id } = await readBody(event)
  
  return await prisma.user.create({
    data: {
      id,
      email,
      name,
    },
  });
}); 