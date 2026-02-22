import { cache } from "react";
import type { Metadata } from "next";
import prisma from "@/lib/db";
import { ListingStatus, Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home, Car, Bike, Wrench } from "lucide-react";
import SeoContent from "@/components/seo-content";
import ListingGrid from "@/components/listing-grid";
import Pagination, { ITEMS_PER_PAGE } from "@/components/pagination";
import { resolveImageUrl } from "@/lib/s3";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 60;

const getCity = cache((slug: string) =>
  prisma.city.findUnique({ where: { slug } })
);

const categoryLinks = [
  { key: "VOITURES", label: "Voitures", icon: Car, path: "voitures" },
  { key: "MOTOS", label: "Motos", icon: Bike, path: "motos" },
  { key: "PIECES", label: "Pièces détachées", icon: Wrench, path: "pieces" },
];

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const city = await getCity(params.slug);
  if (!city) return {};

  const title =
    city.metaTitle || `Annonces véhicules d'occasion à ${city.name} | Voito`;
  const description =
    city.metaDesc ||
    `Toutes les annonces de voitures, motos et pièces détachées d'occasion à ${city.name}. Vente entre particuliers sur Voito.`;

  return {
    title,
    description,
    robots: { index: city.indexable, follow: city.indexable },
    alternates: { canonical: `/annonces-${city.slug}` },
    openGraph: { title, description },
  };
}

export default async function VillePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const city = await getCity(params.slug);
  if (!city) notFound();

  const rawPage = searchParams?.page;
  const page = Math.max(1, parseInt(Array.isArray(rawPage) ? rawPage[0] : rawPage || "1", 10) || 1);

  const where: Prisma.ListingWhereInput = {
    city: city.name,
    status: ListingStatus.ACTIVE,
  };

  const [listings, totalItems, countByCat] = await Promise.all([
    prisma.listing.findMany({
      where,
      include: { brand: true, model: true, user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.listing.count({ where }),
    prisma.listing.groupBy({
      by: ["category"],
      where: { city: city.name, status: ListingStatus.ACTIVE },
      _count: true,
    }),
  ]);

  const listingsWithImages = listings.map((listing) => ({
    ...listing,
    images: (listing.images ?? []) as string[],
    resolvedImageUrl: Array.isArray(listing.images) && listing.images[0] ? resolveImageUrl(listing.images[0] as string) : null,
  }));

  const catCounts: Record<string, number> = {};
  countByCat.forEach((c) => {
    catCounts[c.category] = c._count;
  });

  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Voito",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `Annonces à ${city.name}`,
        item: `${baseUrl}/annonces-${city.slug}`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Annonces automobiles à ${city.name}`,
    url: `${baseUrl}/annonces-${city.slug}`,
    numberOfItems: totalItems,
    itemListElement: listingsWithImages.map((listing, index) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link
              href="/"
              className="flex items-center hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              Voito
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
            <span className="text-foreground font-medium">{city.name}</span>
          </nav>

          {/* H1 */}
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Annonces à <span className="text-primary">{city.name}</span>
          </h1>

          {/* SEO Top */}
          <SeoContent
            h2={city.h2Top}
            description={city.descriptionTop}
            className="mb-8"
          />

          {/* Category links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {categoryLinks.map((cat) => {
              const count = catCounts[cat.key] || 0;
              return (
                <Link
                  key={cat.key}
                  href={`/${cat.path}/ville/${city.slug}`}
                  className="card-metallic p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform"
                >
                  <cat.icon className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">
                      {cat.label}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {count} {count === 1 ? "annonce" : "annonces"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Count */}
          <div className="mb-4">
            <p className="text-muted-foreground">
              {totalItems}{" "}
              {totalItems === 1 ? "annonce trouvée" : "annonces trouvées"} à{" "}
              {city.name}
            </p>
          </div>

          {/* Listings */}
          <ListingGrid listings={listingsWithImages} />

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalItems={totalItems}
            basePath={`/annonces-${city.slug}`}
            searchParams={searchParams as Record<string, string | undefined>}
          />

          {/* SEO Bottom */}
          <SeoContent
            h2={city.h2Bottom}
            description={city.descriptionBottom}
            className="mt-12"
          />
        </div>
      </div>
    </>
  );
}
