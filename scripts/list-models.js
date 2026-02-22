const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const models = await prisma.model.findMany({
    where: { indexable: true },
    select: { id: true, name: true, slug: true, h2Top: true, brand: { select: { name: true, slug: true, category: true } } },
    orderBy: [{ brand: { category: "asc" } }, { brand: { name: "asc" } }, { name: "asc" }],
  });

  models.forEach((m) => {
    const has = m.h2Top ? "Y" : "N";
    console.log(`${has} [${m.brand.category}] ${m.brand.name} > ${m.name} (${m.brand.slug}/${m.slug})`);
  });
  console.log("\nTotal:", models.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
