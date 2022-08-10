import type { NextApiRequest, NextApiResponse } from "next";

//import { PrismaClient, User } from "@prisma/client";
//const prisma = new PrismaClient();
import { User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    return handleDelete(req, res);
  }
}

const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
) => {
  const id = req.query.id as string;
  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
    /*
    include: {
      accounts: true,
      sessions: true,
      fromThanksCards: false,
      toThanksCards: false,
    },
    */
  });
  res.status(200).json(deletedUser);
};
