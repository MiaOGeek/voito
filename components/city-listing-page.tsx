import SearchFilters from "@/components/search-filters";
import ListingGrid from "@/components/listing-grid";
import SeoContent from "@/components/seo-content";
import Pagination, { ITEMS_PER_PAGE } from "@/components/pagination";
import { ListingStatus } from "@prisma/client";
import prisma from "@/lib/db";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { notFound } from "next/navigation";

type Category = "VOITURES" | "MOTOS" | "PIECES";

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
  searchParams: any;
}) {
  const page = Math.max(1, parseInt(searchParams?.page) || 1);

  const city = await prisma.city.findUnique({
    where: { slug: citySlug },
  });
  if (!city) notFound();

  const where: any = {
    category,
    city: city.name,
    status: ListingStatus.ACTIVE,
  };

  // Brand/model filtering from searchParams
  let activeBrandSlug = "";
  let activeModelSlug = "";
  if (searchParams?.brandSlug) {
    const brand = await prisma.brand.findUnique({
      where: { slug_category: { slug: searchParams.brandSlug, category } },
      include: { models: true },
    });
    if (brand) {
      where.brandId = brand.id;
      activeBrandSlug = brand.slug;
      if (searchParams?.modelSlug) {
        const model = brand.models.find((m) => slugify(m.name) === searchParams.modelSlug);
        if (model) {
          where.modelId = model.id;
          activeModelSlug = searchParams.modelSlug;
        }
      }
    }
  }

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

  if (searchParams?.fiscalPower) where.fiscalPower = parseInt(searchParams.fiscalPower);

  const [listings, totalItems] = await Promise.all([
    prisma.listing.findMany({
      where,
      include: { brand: true, model: true, user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.listing.count({ where }),
  ]);

  const path = categoryPaths[category];
  const label = categoryLabels[category];
  const baseUrl = process.env.NEXTAUTH_URL || "";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl || undefined },
      { "@type": "ListItem", position: 2, name: label, item: `${baseUrl}/${path}` },
      { "@type": "ListItem", position: 3, name: city.name },
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
          searchParams={searchParams}
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
