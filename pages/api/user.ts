import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  });
  res.status(200).json(users);
}
