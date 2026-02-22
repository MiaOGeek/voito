import { MetadataRoute } from "next";
import prisma from "@/lib/db";
import { slugify } from "@/lib/utils";
import { allArticles } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 3600; // Revalidate sitemap every hour

const BASE_URL = SITE_URL;

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
    { url: `${BASE_URL}/voitures/guides-achat`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/voitures/financement`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/motos/guides`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/pieces/guides`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Dynamic pages — each query is wrapped in try-catch for resilience
  let brandPages: MetadataRoute.Sitemap = [];
  try {
    const brands = await prisma.brand.findMany({
      where: { indexable: true },
      select: { slug: true, category: true, createdAt: true },
    });
    brandPages = brands.map((brand) => ({
      url: `${BASE_URL}/${categoryPaths[brand.category]}/${brand.slug}`,
      lastModified: brand.createdAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch brands", error);
  }

  let modelPages: MetadataRoute.Sitemap = [];
  try {
    const models = await prisma.model.findMany({
      where: { indexable: true, brand: { indexable: true } },
      select: { name: true, slug: true, createdAt: true, brand: { select: { slug: true, category: true } } },
    });
    modelPages = models.map((model) => ({
      url: `${BASE_URL}/${categoryPaths[model.brand.category]}/${model.brand.slug}/${model.slug || slugify(model.name)}`,
      lastModified: model.createdAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch models", error);
  }

  let cityHubPages: MetadataRoute.Sitemap = [];
  let cityPages: MetadataRoute.Sitemap = [];
  try {
    const cities = await prisma.city.findMany({
      where: { indexable: true },
      select: { slug: true, createdAt: true },
    });
    cityHubPages = cities.map((city) => ({
      url: `${BASE_URL}/annonces-${city.slug}`,
      lastModified: city.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    cityPages = cities.flatMap((city) =>
      Object.values(categoryPaths).map((path) => ({
        url: `${BASE_URL}/${path}/ville/${city.slug}`,
        lastModified: city.createdAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
    );
  } catch (error) {
    console.error("Sitemap: failed to fetch cities", error);
  }

  let sellerPages: MetadataRoute.Sitemap = [];
  try {
    const sellers = await prisma.user.findMany({
      where: { listings: { some: { status: "ACTIVE" } } },
      select: { id: true, updatedAt: true },
    });
    sellerPages = sellers.map((seller) => ({
      url: `${BASE_URL}/vendeurs/${seller.id}`,
      lastModified: seller.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch sellers", error);
  }

  // Blog articles (static data, no DB query)
  const blogPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
    ...allArticles.map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  let listingPages: MetadataRoute.Sitemap = [];
  try {
    const listings = await prisma.listing.findMany({
      where: { status: "ACTIVE" },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    listingPages = listings.map((listing) => ({
      url: `${BASE_URL}/annonces/${listing.id}`,
      lastModified: listing.updatedAt,
      changeFrequency: "daily",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch listings", error);
  }

  return [
    ...staticPages,
    ...brandPages,
    ...modelPages,
    ...cityHubPages,
    ...cityPages,
    ...sellerPages,
    ...blogPages,
    ...listingPages,
  ];
}
