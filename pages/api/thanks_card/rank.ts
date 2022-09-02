import type { NextApiRequest, NextApiResponse } from "next";

//import { PrismaClient, ThanksCard } from "@prisma/client";
//const prisma = new PrismaClient();
import { Prisma, ThanksCard } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 部署に紐づくユーザの toThanksCards を count して返す
  /*
  const users = await prisma.department.findMany({
    include: {
      users: {
        select: {
          _count: {
            select: {
              toThanksCards: true,
            },
          },
        },
      },
    },
  });
  */

  // ユーザ別 ThanksCard 受け取り件数ランキング
  const receiveRanking = await prisma.user.findMany({
    // include and count
    include: {
      _count: {
        select: {
          toThanksCards: true,
        },
      },
    },
    // select and count
    /*
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          toThanksCards: true,
        },
      },
    },
    */
    orderBy: {
      toThanksCards: {
        _count: "desc",
      },
    },
  });
  res.status(200).json(receiveRanking);
}
