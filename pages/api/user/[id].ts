import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "PUT") {
    return handlePut(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const id = req.query.id as string;
  const targetUser = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  if (targetUser) {
    res.status(200).json(targetUser);
  } else {
    res.status(404);
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const id = req.query.id as string;
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      ...req.body,
    },
  });
  res.status(200).json(updatedUser);
};

const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
) => {
  const id = req.query.id as string;
  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(deletedUser);
};
