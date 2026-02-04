import { PrismaClient, UserRole } from '@prisma/client';
import { sampleProducts, sampleCategories } from '../src/shared/sample-data';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'hello@accessmedhomehealth.com' },
    update: {},
    create: {
      email: 'hello@accessmedhomehealth.com',
      passwordHash: 'demo-hash',
      role: UserRole.ADMIN,
      customer: {
        create: {
          firstName: 'Access',
          lastName: 'Home Health',
        },
      },
    },
  });

  await prisma.productCategory.createMany({ data: sampleCategories });

  for (const product of sampleProducts) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        priceCents: product.priceCents,
        currency: product.currency,
        categoryId: product.categoryId,
      },
    });
  }

  console.log('Seed complete for user', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
