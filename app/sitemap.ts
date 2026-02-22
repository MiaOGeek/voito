import { MetadataRoute } from "next";
import prisma from "@/lib/db";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXTAUTH_URL || "https://voito.tn";

const categoryPaths = {
  VOITURES: "voitures",
  MOTOS: "motos",
  PIECES: "pieces",
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/voitures`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/motos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/pieces`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/conditions`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/qui-sommes-nous`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/voitures/marques`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/motos/marques`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pieces/marques`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/voitures/villes`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/motos/villes`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pieces/villes`, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Brands (indexable only)
  const brands = await prisma.brand.findMany({
    where: { indexable: true },
    select: { slug: true, category: true, createdAt: true },
  });

  const brandPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${BASE_URL}/${categoryPaths[brand.category]}/${brand.slug}`,
    lastModified: brand.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Models (indexable only, with their brand)
  const models = await prisma.model.findMany({
    where: { indexable: true, brand: { indexable: true } },
    select: { name: true, slug: true, createdAt: true, brand: { select: { slug: true, category: true } } },
  });

  const modelPages: MetadataRoute.Sitemap = models.map((model) => ({
    url: `${BASE_URL}/${categoryPaths[model.brand.category]}/${model.brand.slug}/${model.slug || slugify(model.name)}`,
    lastModified: model.createdAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Cities (indexable only) — generate for each category
  const cities = await prisma.city.findMany({
    where: { indexable: true },
    select: { slug: true, createdAt: true },
  });

  const cityPages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    Object.values(categoryPaths).map((path) => ({
      url: `${BASE_URL}/${path}/ville/${city.slug}`,
      lastModified: city.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  // Active listings
  const listings = await prisma.listing.findMany({
    where: { status: "ACTIVE" },
    select: { id: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${BASE_URL}/annonces/${listing.id}`,
    lastModified: listing.updatedAt,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...brandPages,
    ...modelPages,
    ...cityPages,
    ...listingPages,
  ];
}
