// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

//import { PrismaClient, Department } from "@prisma/client";
//const prisma = new PrismaClient();
import { Department } from "@prisma/client";
import { prisma } from "../prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Department[]>
) {
  const departments = await prisma.department.findMany();
  res.status(200).json(departments);
}
