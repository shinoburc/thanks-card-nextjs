// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ThanksCard } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";
import { isValidToken } from "@/utils/isValidToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidToken(req)) res.status(401).end();

  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "POST") {
    return handlePost(req, res);
  }
}

const handleGet = async (
  req: NextApiRequest,
  res: NextApiResponse<ThanksCard[]>
) => {
  const toId = req.query.toId as string;
  const thanks_cards = await prisma.thanksCard.findMany({
    include: {
      from: true,
      to: true,
    },
    where: {
      toId: toId,
    },
  });
  res.status(200).json(thanks_cards);
};

const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<ThanksCard>
) => {
  try {
    const createdThanksCard = await prisma.thanksCard.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json(createdThanksCard);
  } catch (e) {
    console.dir(e);
    res.status(500).end();
  }
};
