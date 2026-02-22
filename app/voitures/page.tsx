import SearchFilters from "@/components/search-filters";
import ListingGrid from "@/components/listing-grid";
import Pagination, { ITEMS_PER_PAGE } from "@/components/pagination";
import { ListingStatus } from "@prisma/client";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Voitures d'occasion en Tunisie | Voito",
  description: "Achetez et vendez des voitures d'occasion en Tunisie. Des milliers d'annonces de voitures neuves et d'occasion.",
};

export default async function VoituresPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const page = Math.max(1, parseInt(searchParams?.page) || 1);

  const where: any = {
    category: "VOITURES",
    status: ListingStatus.ACTIVE,
  };

  if (searchParams?.city) where.city = { contains: searchParams.city };
  if (searchParams?.fiscalPower) where.fiscalPower = parseInt(searchParams.fiscalPower);

  if (searchParams?.minPrice || searchParams?.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) where.price.gte = parseFloat(searchParams.minPrice);
    if (searchParams.maxPrice) where.price.lte = parseFloat(searchParams.maxPrice);
  }

  if (searchParams?.minYear || searchParams?.maxYear) {
    where.year = {};
    if (searchParams.minYear) where.year.gte = parseInt(searchParams.minYear);
    if (searchParams.maxYear) where.year.lte = parseInt(searchParams.maxYear);
  }

  if (searchParams?.minMileage || searchParams?.maxMileage) {
    where.mileage = {};
    if (searchParams.minMileage) where.mileage.gte = parseInt(searchParams.minMileage);
    if (searchParams.maxMileage) where.mileage.lte = parseInt(searchParams.maxMileage);
  }

  const [listings, totalItems] = await Promise.all([
    prisma.listing.findMany({
      where,
      include: {
        brand: true,
        model: true,
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.listing.count({ where }),
  ]);

  const baseUrl = process.env.NEXTAUTH_URL || "";

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Voitures d'occasion en Tunisie",
    url: `${baseUrl}/voitures`,
    numberOfItems: totalItems,
    itemListElement: listings.map((listing: any, index: number) => ({
      "@type": "ListItem",
      position: (page - 1) * ITEMS_PER_PAGE + index + 1,
      url: `${baseUrl}/annonces/${listing.id}`,
      name: listing.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Voitures <span className="text-primary">d'occasion</span>
          </h1>

        <div className="mb-8">
          <SearchFilters category="VOITURES" showCategoryFilter={false} />
        </div>

        <div className="mb-4">
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? "annonce trouvée" : "annonces trouvées"}
          </p>
        </div>

        <ListingGrid listings={listings} />

        <Pagination
          currentPage={page}
          totalItems={totalItems}
          basePath="/voitures"
          searchParams={searchParams}
        />
      </div>
    </div>
    </>
  );
}
