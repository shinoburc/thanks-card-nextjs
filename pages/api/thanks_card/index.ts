// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

//import { PrismaClient, ThanksCard } from "@prisma/client";
//const prisma = new PrismaClient();
import { ThanksCard } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ThanksCard[]>
) {

  // reference: https://next-auth.js.org/tutorials/securing-pages-and-api-routes
  const token = await getToken({ req });
  console.log("token:", token);
  // Unauthorized
  if (!token) {
    res.status(401).end();
  }

  const thanks_cards = await prisma.thanksCard.findMany({
    include: {
      from: true,
      to: true,
    },
  });
  res.status(200).json(thanks_cards);
}
