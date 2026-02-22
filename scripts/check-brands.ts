import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

async function main() {
  const brands = await p.brand.findMany({
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
    select: { name: true, slug: true, category: true, _count: { select: { listings: true } } },
  });
  console.log(JSON.stringify(brands, null, 2));
}

main().finally(() => p.$disconnect());
