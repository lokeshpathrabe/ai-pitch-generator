const PrismaClient = require("@prisma/client").PrismaClient;
const Account = require("@prisma/client").Account;

const prisma = new PrismaClient();

const seed = async () => {
  // Delete previous data
  await prisma.$transaction([
    prisma.account.deleteMany(),
    prisma.resume.deleteMany(),
  ]);

  //create account
  const account = await prisma.account.create({
    data: {
      userId: "user_2ZvowofwnLcUtAE9TZdWI5OjVqP",
      email: "lokesh.18690@gmail.com",
      username: "lokeshpathrabe",
    },
  });

  await prisma.resume.create({
    data: {
      accountId: account.id,
      name: "default resume",
      description: "this is dummy resume",
      slug: "defaultResume",
    },
  });
};

// Run the seedDatabase function
seed()
  .then(() => {
    console.log("Seeding completed successfully");
  })
  .catch((error) => {
    console.error("Error seeding the database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
