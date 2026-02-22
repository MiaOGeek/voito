import SearchFilters from "@/components/search-filters";
import ListingGrid from "@/components/listing-grid";
import SeoContent from "@/components/seo-content";
import Pagination, { ITEMS_PER_PAGE } from "@/components/pagination";
import { ListingStatus, Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, Home, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { resolveImageUrl } from "@/lib/s3";
import { SITE_URL } from "@/lib/constants";

type Category = "VOITURES" | "MOTOS" | "PIECES";
type SearchParams = Record<string, string | string[] | undefined>;
const p = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";

const categoryLabels: Record<Category, string> = {
  VOITURES: "Voitures",
  MOTOS: "Motos",
  PIECES: "Pièces",
};

const categoryPaths: Record<Category, string> = {
  VOITURES: "voitures",
  MOTOS: "motos",
  PIECES: "pieces",
};

export async function CityPage({
  category,
  citySlug,
  searchParams,
}: {
  category: Category;
  citySlug: string;
  searchParams: SearchParams;
}) {
  const page = Math.max(1, parseInt(p(searchParams?.page), 10) || 1);

  const city = await prisma.city.findUnique({
    where: { slug: citySlug },
  });
  if (!city) notFound();

  const where: Prisma.ListingWhereInput = {
    category,
    city: city.name,
    status: ListingStatus.ACTIVE,
  };

  // Brand/model filtering from searchParams
  let activeBrandSlug = "";
  let activeModelSlug = "";
  if (searchParams?.brandSlug) {
    const brand = await prisma.brand.findUnique({
      where: { slug_category: { slug: p(searchParams.brandSlug), category } },
      include: { models: true },
    });
    if (brand) {
      where.brandId = brand.id;
      activeBrandSlug = brand.slug;
      if (searchParams?.modelSlug) {
        const ms = p(searchParams.modelSlug);
        const model = brand.models.find((m) => slugify(m.name) === ms);
        if (model) {
          where.modelId = model.id;
          activeModelSlug = ms;
        }
      }
    }
  }

  if (searchParams?.minPrice || searchParams?.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) where.price.gte = parseFloat(p(searchParams.minPrice));
    if (searchParams.maxPrice) where.price.lte = parseFloat(p(searchParams.maxPrice));
  }

  if (searchParams?.minYear || searchParams?.maxYear) {
    where.year = {};
    if (searchParams.minYear) where.year.gte = parseInt(p(searchParams.minYear), 10);
    if (searchParams.maxYear) where.year.lte = parseInt(p(searchParams.maxYear), 10);
  }

  if (searchParams?.minMileage || searchParams?.maxMileage) {
    where.mileage = {};
    if (searchParams.minMileage) where.mileage.gte = parseInt(p(searchParams.minMileage), 10);
    if (searchParams.maxMileage) where.mileage.lte = parseInt(p(searchParams.maxMileage), 10);
  }

  if (searchParams?.fiscalPower) where.fiscalPower = parseInt(p(searchParams.fiscalPower), 10);

  const [rawListings, totalItems] = await Promise.all([
    prisma.listing.findMany({
      where,
      include: { brand: true, model: true, user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.listing.count({ where }),
  ]);

  const listings = rawListings.map((listing) => ({
    ...listing,
    images: (listing.images ?? []) as string[],
    resolvedImageUrl: Array.isArray(listing.images) && listing.images[0] ? resolveImageUrl(listing.images[0] as string) : null,
  }));

  const path = categoryPaths[category];
  const label = categoryLabels[category];
  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: label, item: `${baseUrl}/${path}` },
      { "@type": "ListItem", position: 3, name: city.name, item: `${baseUrl}/${path}/ville/${citySlug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-primary transition-colors">
            <Home className="h-4 w-4 mr-1" />
            Voito
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
          <Link href={`/${path}`} className="hover:text-primary transition-colors">
            {label}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
          <span className="text-foreground font-medium">{city.name}</span>
        </nav>

        <div className="mb-4">
          <Link
            href={`/annonces-${citySlug}`}
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <MapPin className="h-4 w-4 mr-1" />
            Toutes les annonces à {city.name}
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          {label} à <span className="text-primary">{city.name}</span>
        </h1>

        <SeoContent
          h2={city.h2Top}
          description={city.descriptionTop}
          className="mb-8"
        />

        <div className="mb-8">
          <SearchFilters
            category={category}
            showCategoryFilter={false}
            cityName={city.name}
            citySlug={citySlug}
            brandSlug={activeBrandSlug}
            modelSlug={activeModelSlug}
          />
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
          basePath={`/${path}/ville/${citySlug}`}
          searchParams={searchParams as Record<string, string | undefined>}
        />

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
