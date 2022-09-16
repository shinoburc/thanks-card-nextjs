import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Department, User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else {
    // Method not allowed
    res.status(405).end();
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  const id = req.query.id as string;
  const targetDepartment = await prisma.department.findUnique({
    where: {
      id: id,
    },
    include: {
      users: true,
    },
  });
  if (targetDepartment) {
    res.status(200).json(targetDepartment.users);
  } else {
    res.status(404).end();
  }
};
