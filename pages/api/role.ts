// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

//import { PrismaClient, Role } from "@prisma/client";
//const prisma = new PrismaClient();
import { Role } from "@prisma/client";
import { prisma } from "../prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Role[]>
) {
  const roles = await prisma.role.findMany();
  res.status(200).json(roles);
}
