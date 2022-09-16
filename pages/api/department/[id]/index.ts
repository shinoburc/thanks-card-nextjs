import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Department } from "@prisma/client";
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

const handleGet = async (
  req: NextApiRequest,
  res: NextApiResponse<Department>
) => {
  const id = req.query.id as string;
  const targetDepartment = await prisma.department.findUnique({
    where: {
      id: id,
    },
  });
  if (targetDepartment) {
    res.status(200).json(targetDepartment);
  } else {
    res.status(404).end();
  }
};

const handlePut = async (
  req: NextApiRequest,
  res: NextApiResponse<Department>
) => {
  const id = req.query.id as string;

  try {
    const updatedDepartment = await prisma.department.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(updatedDepartment);
  } catch (e) {
    res.status(500).end();
  }
};

const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<Department>
) => {
  const id = req.query.id as string;
  const deletedDepartment = await prisma.department.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(deletedDepartment);
};
