import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@ts.occ.co.jp" },
    update: {},
    create: {
      name: "admin",
      email: "admin@ts.occ.co.jp",
      password: "admin",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@ts.occ.co.jp" },
    update: {},
    create: {
      name: "user",
      email: "user@ts.occ.co.jp",
      password: "user",
    },
  });
  console.log({ admin, user });

  const tc1 = await prisma.thanksCard.upsert({
    where: { id: "thanks_card_test1" },
    update: {},
    create: {
      title: "thankscard1 title",
      body: "thankscard1 body",
      fromId: admin.id,
      toId: user.id,
    },
  });
  const tc2 = await prisma.thanksCard.upsert({
    where: { id: "thanks_card_test2" },
    update: {},
    create: {
      title: "thankscard2 title",
      body: "thankscard2 body",
      fromId: user.id,
      toId: admin.id,
    },
  });
  console.log({ tc1, tc2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
