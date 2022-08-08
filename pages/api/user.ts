import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "POST") {
    return handlePost(req, res);
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  const users = await prisma.user.findMany({
    include: {
      role: true,
      department: true,
    },
  });
  res.status(200).json(users);
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  //const user: User = req.body;
  //const createdUser = await prisma.user.create({ data: user });
  const { name, email, password, roleId, departmentId } = req.body;
  const createdUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
      roleId: roleId,
      departmentId: departmentId,
    },
  });
  res.status(200).json(createdUser);
};
