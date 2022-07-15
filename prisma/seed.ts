import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      password: "admin",
      isAdmin: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { name: "user" },
    update: {},
    create: {
      name: "user",
      password: "user",
      isAdmin: false,
    },
  });
  console.log({ admin, user });

  const tc1 = await prisma.thanksCard.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "thankscard1 title",
      body: "thankscard1 body",
      fromId: admin.id,
      toId: user.id,
    },
  });
  const tc2 = await prisma.thanksCard.upsert({
    where: { id: 2 },
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
