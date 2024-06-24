const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  for(let i=0; i<30; i++){
  await prisma.user.create({
    data: {
      name: `${faker.internet.userName()}`,
      email: `${faker.internet.email()}`,
    },
  });
}
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
