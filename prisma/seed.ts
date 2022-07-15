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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
