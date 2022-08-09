// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

//import { PrismaClient, ThanksCard } from "@prisma/client";
//const prisma = new PrismaClient();
import { ThanksCard } from "@prisma/client";
import { prisma } from "../prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ThanksCard[]>
) {
  const thanks_cards = await prisma.thanksCard.findMany({
    include: {
      from: true,
      to: true,
    },
  });
  res.status(200).json(thanks_cards);
}
