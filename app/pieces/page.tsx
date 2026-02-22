import SearchFilters from "@/components/search-filters";
import ListingGrid from "@/components/listing-grid";
import Pagination, { ITEMS_PER_PAGE } from "@/components/pagination";
import { ListingStatus } from "@prisma/client";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pièces détachées automobiles | Voito",
  description: "Trouvez des pièces détachées pour votre voiture ou moto en Tunisie. Pièces neuves et d'occasion.",
};

export default async function PiecesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const page = Math.max(1, parseInt(searchParams?.page) || 1);

  const where: any = {
    category: "PIECES",
    status: ListingStatus.ACTIVE,
  };

  if (searchParams?.city) where.city = { contains: searchParams.city };

  if (searchParams?.minPrice || searchParams?.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) where.price.gte = parseFloat(searchParams.minPrice);
    if (searchParams.maxPrice) where.price.lte = parseFloat(searchParams.maxPrice);
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
    name: "Pièces détachées automobiles en Tunisie",
    url: `${baseUrl}/pieces`,
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
            Pièces <span className="text-primary">détachées</span>
          </h1>

        <div className="mb-8">
          <SearchFilters category="PIECES" showCategoryFilter={false} />
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
          basePath="/pieces"
          searchParams={searchParams}
        />
      </div>
    </div>
    </>
  );
}
