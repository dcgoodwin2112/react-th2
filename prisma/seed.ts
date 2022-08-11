import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const Category1 = await prisma.category.upsert({
    where: { term: "category1" },
    update: {},
    create: { term: "category1" },
  });

  const Category2 = await prisma.category.upsert({
    where: { term: "category2" },
    update: {},
    create: { term: "category2" },
  });

  const Category3 = await prisma.category.upsert({
    where: { term: "category3" },
    update: {},
    create: { term: "category3" },
  });

  const Product1 = await prisma.product.upsert({
    where: { sku: "12345678" },
    update: {},
    create: {
      sku: "12345678",
      name: "Product 1",
      description: "Some generic product",
      stock: 10,
      cost: 101.25,
      categories: {
        connect: { id: Category1.id },
      },
    },
  });

  const Product2 = await prisma.product.upsert({
    where: { sku: "B2345678" },
    update: {},
    create: {
      sku: "B2345678",
      name: "Product 2",
      description: "Some other generic product",
      stock: 15,
      cost: 201.55,
      categories: {
        connect: [{ id: Category2.id }, { id: Category3.id }],
      },
    },
  });

  const User1 = await prisma.user.upsert({
    where: { email: "user1@test.com" },
    update: {},
    create: {
      username: "testUser1",
      email: "user1@test.com",
      favoriteProducts: {
        connect: { id: Product1.id },
      },
    },
  });

  const User2 = await prisma.user.upsert({
    where: { email: "user2@test.com" },
    update: {},
    create: {
      username: "testUser2",
      email: "user2@test.com",
      favoriteProducts: {
        connect: [{ id: Product1.id }, { id: Product2.id }],
      },
    },
  });
}

main()
  .then(async () => {
    console.log("Seeding DB for Users and Products")
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
