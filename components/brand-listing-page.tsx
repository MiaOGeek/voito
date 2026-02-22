import SearchFilters from "@/components/search-filters";
import ListingGrid from "@/components/listing-grid";
import SeoContent from "@/components/seo-content";
import Pagination, { ITEMS_PER_PAGE } from "@/components/pagination";
import { ListingStatus, Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { resolveImageUrl } from "@/lib/s3";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";
import { notFound } from "next/navigation";
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

function buildWhere(searchParams: SearchParams, category: Category, brandId: string, modelId?: string) {
  const where: Prisma.ListingWhereInput = {
    category,
    status: ListingStatus.ACTIVE,
    brandId,
  };

  if (modelId) where.modelId = modelId;
  if (searchParams?.city) where.city = { contains: p(searchParams.city) };
  if (searchParams?.fiscalPower) where.fiscalPower = parseInt(p(searchParams.fiscalPower), 10);

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

  return where;
}

export async function BrandPage({
  category,
  brandSlug,
  searchParams,
}: {
  category: Category;
  brandSlug: string;
  searchParams: SearchParams;
}) {
  const page = Math.max(1, parseInt(p(searchParams?.page), 10) || 1);

  const brand = await prisma.brand.findUnique({
    where: { slug_category: { slug: brandSlug, category } },
    include: { models: { orderBy: { name: "asc" } } },
  });
  if (!brand) notFound();

  const where = buildWhere(searchParams, category, brand.id);

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
      { "@type": "ListItem", position: 3, name: brand.name, item: `${baseUrl}/${path}/${brandSlug}` },
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
            <span className="text-foreground font-medium">{brand.name}</span>
          </nav>

          <div className="flex items-center gap-4 mb-8">
            {brand.logo && (
              <Image
                src={brand.logo}
                alt={brand.name}
                width={64}
                height={64}
                className="object-contain"
              />
            )}
            <h1 className="text-4xl font-bold text-foreground">
              {brand.name} <span className="text-primary">{label.toLowerCase()}</span>
            </h1>
          </div>

          <SeoContent
            h2={brand.h2Top}
            description={brand.descriptionTop}
            className="mb-8"
          />

          {brand.models.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Modèles {brand.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {brand.models.map((model) => (
                  <Link
                    key={model.id}
                    href={`/${path}/${brandSlug}/${model.slug || slugify(model.name)}`}
                    className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    {model.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <SearchFilters category={category} showCategoryFilter={false} brandSlug={brandSlug} />
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
            basePath={`/${path}/${brandSlug}`}
            searchParams={searchParams as Record<string, string | undefined>}
          />

          <SeoContent
            h2={brand.h2Bottom}
            description={brand.descriptionBottom}
            className="mt-12"
          />
        </div>
      </div>
    </>
  );
}

export async function BrandModelPage({
  category,
  brandSlug,
  modelSlug,
  searchParams,
}: {
  category: Category;
  brandSlug: string;
  modelSlug: string;
  searchParams: SearchParams;
}) {
  const page = Math.max(1, parseInt(p(searchParams?.page), 10) || 1);

  const brand = await prisma.brand.findUnique({
    where: { slug_category: { slug: brandSlug, category } },
    include: { models: true },
  });
  if (!brand) notFound();

  const model = brand.models.find((m) => slugify(m.name) === modelSlug);
  if (!model) notFound();

  const where = buildWhere(searchParams, category, brand.id, model.id);

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
      { "@type": "ListItem", position: 3, name: brand.name, item: `${baseUrl}/${path}/${brandSlug}` },
      { "@type": "ListItem", position: 4, name: model.name, item: `${baseUrl}/${path}/${brandSlug}/${modelSlug}` },
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
            <Link href={`/${path}/${brandSlug}`} className="hover:text-primary transition-colors">
              {brand.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
            <span className="text-foreground font-medium">{model.name}</span>
          </nav>

          <div className="flex items-center gap-4 mb-8">
            {model.logo && (
              <Image
                src={model.logo}
                alt={`${brand.name} ${model.name}`}
                width={64}
                height={64}
                className="object-contain"
              />
            )}
            <h1 className="text-4xl font-bold text-foreground">
              {brand.name} {model.name} <span className="text-primary">{label.toLowerCase()}</span>
            </h1>
          </div>

          <SeoContent
            h2={model.h2Top}
            description={model.descriptionTop}
            className="mb-8"
          />

          <div className="mb-8">
            <SearchFilters category={category} showCategoryFilter={false} brandSlug={brandSlug} modelSlug={modelSlug} />
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
            basePath={`/${path}/${brandSlug}/${modelSlug}`}
            searchParams={searchParams as Record<string, string | undefined>}
          />

          <SeoContent
            h2={model.h2Bottom}
            description={model.descriptionBottom}
            className="mt-12"
          />
        </div>
      </div>
    </>
  );
}
