const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const brands = await prisma.brand.findMany({
    where: { indexable: true },
    select: { id: true, name: true, slug: true, category: true, h2Top: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  brands.forEach((b) => {
    const has = b.h2Top ? "Y" : "N";
    console.log(`${has} [${b.category}] ${b.name} (${b.slug})`);
  });
  console.log("\nTotal:", brands.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
