import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Migrating brand categories...');

  // Get all brands with their listings
  const brands = await prisma.brand.findMany({
    include: {
      listings: { select: { id: true, category: true } },
      models: true,
    },
  });

  for (const brand of brands) {
    // Find which categories this brand is used in
    const categories = [...new Set(brand.listings.map((l) => l.category))];

    if (categories.length === 0) {
      // No listings - keep as VOITURES (default)
      console.log(`  ⚪ ${brand.name} - no listings, keeping as VOITURES`);
      continue;
    }

    if (categories.length === 1) {
      // Only used in one category - just update it
      await prisma.brand.update({
        where: { id: brand.id },
        data: { category: categories[0] },
      });
      console.log(`  ✅ ${brand.name} → ${categories[0]}`);
      continue;
    }

    // Used in multiple categories - keep original for first, create duplicates for rest
    const [primary, ...others] = categories;

    // Update original brand to primary category
    await prisma.brand.update({
      where: { id: brand.id },
      data: { category: primary },
    });
    console.log(`  ✅ ${brand.name} → ${primary} (primary)`);

    for (const cat of others) {
      // Check if a brand with this slug+category already exists
      const existing = await prisma.brand.findUnique({
        where: { slug_category: { slug: brand.slug, category: cat } },
      });

      if (existing) {
        // Reassign listings to existing brand
        const listingIds = brand.listings
          .filter((l) => l.category === cat)
          .map((l) => l.id);

        await prisma.listing.updateMany({
          where: { id: { in: listingIds } },
          data: { brandId: existing.id },
        });
        console.log(`  ♻️  ${brand.name} → ${cat} (reused existing, ${listingIds.length} listings moved)`);
        continue;
      }

      // Create duplicate brand for this category
      const newBrand = await prisma.brand.create({
        data: {
          name: brand.name,
          slug: brand.slug,
          category: cat,
        },
      });

      // Duplicate models for the new brand
      for (const model of brand.models) {
        const newModel = await prisma.model.create({
          data: {
            name: model.name,
            brandId: newBrand.id,
          },
        });

        // Reassign listings with this model to the new model
        const listingIds = brand.listings
          .filter((l) => l.category === cat)
          .map((l) => l.id);

        await prisma.listing.updateMany({
          where: {
            id: { in: listingIds },
            modelId: model.id,
          },
          data: {
            brandId: newBrand.id,
            modelId: newModel.id,
          },
        });
      }

      // Reassign listings without a model
      const noModelListingIds = brand.listings
        .filter((l) => l.category === cat)
        .map((l) => l.id);

      await prisma.listing.updateMany({
        where: {
          id: { in: noModelListingIds },
          brandId: brand.id,
        },
        data: { brandId: newBrand.id },
      });

      console.log(`  ✨ ${brand.name} → ${cat} (new brand created, models duplicated)`);
    }
  }

  // Verify
  const finalBrands = await prisma.brand.findMany({
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { listings: true, models: true } } },
  });

  console.log('\n📊 Final brand list:');
  let currentCat = '';
  for (const b of finalBrands) {
    if (b.category !== currentCat) {
      currentCat = b.category;
      console.log(`\n  --- ${currentCat} ---`);
    }
    console.log(`  ${b.name} (${b._count.models} models, ${b._count.listings} listings)`);
  }

  console.log('\n✅ Migration complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
