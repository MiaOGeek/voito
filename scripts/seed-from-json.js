/**
 * Injecte une marque + ses modèles depuis un fichier JSON.
 * Usage : node scripts/seed-from-json.js data/peugeot-voitures.json
 */
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node scripts/seed-from-json.js <fichier.json>");
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
  const { brand: brandData, models } = data;

  // Upsert brand
  const brand = await prisma.brand.upsert({
    where: {
      slug_category: { slug: brandData.slug, category: brandData.category },
    },
    update: {
      metaTitle: brandData.metaTitle,
      metaDesc: brandData.metaDesc,
      h2Top: brandData.h2Top,
      descriptionTop: brandData.descriptionTop,
      h2Bottom: brandData.h2Bottom,
      descriptionBottom: brandData.descriptionBottom,
      indexable: brandData.indexable,
    },
    create: {
      name: brandData.name,
      slug: brandData.slug,
      category: brandData.category,
      indexable: brandData.indexable,
      metaTitle: brandData.metaTitle,
      metaDesc: brandData.metaDesc,
      h2Top: brandData.h2Top,
      descriptionTop: brandData.descriptionTop,
      h2Bottom: brandData.h2Bottom,
      descriptionBottom: brandData.descriptionBottom,
    },
  });
  console.log(`✓ Brand: ${brand.name} [${brand.category}] (${brand.id})`);

  // Upsert models
  let ok = 0, errors = 0;
  for (const m of models) {
    try {
      await prisma.model.upsert({
        where: {
          brandId_name: { brandId: brand.id, name: m.name },
        },
        update: {
          metaTitle: m.metaTitle,
          metaDesc: m.metaDesc,
          h2Top: m.h2Top,
          descriptionTop: m.descriptionTop,
          h2Bottom: m.h2Bottom,
          descriptionBottom: m.descriptionBottom,
          indexable: m.indexable,
        },
        create: {
          name: m.name,
          brandId: brand.id,
          indexable: m.indexable,
          metaTitle: m.metaTitle,
          metaDesc: m.metaDesc,
          h2Top: m.h2Top,
          descriptionTop: m.descriptionTop,
          h2Bottom: m.h2Bottom,
          descriptionBottom: m.descriptionBottom,
        },
      });
      console.log(`  ✓ ${m.name}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${m.name}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\nDone: ${ok} models OK, ${errors} errors`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
