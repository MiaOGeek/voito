import type { Metadata } from "next";
import { cache } from "react";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { getFileUrl } from "@/lib/s3";
import { resolveImageUrl } from "@/lib/s3";
import ListingDetailClient from "./listing-detail-client";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 60;

const getListing = cache(async function getListing(id: string) {
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      brand: true,
      model: true,
      user: {
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          createdAt: true,
        },
      },
    },
  });

  return listing;
});

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const listing = await getListing(params.id);

  if (!listing) return {};

  const title = listing.metaTitle || `${listing.title} | Voito`;
  const description =
    listing.metaDesc ||
    listing.description.substring(0, 160);

  // Resolve first image for OG/Twitter
  let ogImages: { url: string; alt: string }[] = [];
  if (listing.images && (listing.images as string[]).length > 0) {
    try {
      const urls = await Promise.all(
        (listing.images as string[]).slice(0, 4).map((path) => getFileUrl(path, true))
      );
      ogImages = urls.map((url) => ({ url, alt: listing.title }));
    } catch {
      // fallback: no OG images
    }
  }

  return {
    title,
    description,
    alternates: { canonical: `/annonces/${params.id}` },
    openGraph: {
      title,
      description,
      type: "article",
      ...(ogImages.length > 0 && { images: ogImages }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImages.length > 0 && { images: [ogImages[0].url] }),
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = await getListing(params.id);

  if (!listing) notFound();

  const baseUrl = SITE_URL;
  const categoryPath = listing.category === "VOITURES" ? "voitures" : listing.category === "MOTOS" ? "motos" : "pieces";

  // Build image URLs for JSON-LD
  let imageUrls: string[] = [];
  if (listing.images && (listing.images as string[]).length > 0) {
    try {
      imageUrls = await Promise.all(
        (listing.images as string[]).map((path) => getFileUrl(path, true))
      );
    } catch {
      // fallback
    }
  }

  // JSON-LD structured data
  const isVehicle = listing.category === "VOITURES" || listing.category === "MOTOS";

  const jsonLd: Record<string, unknown> = isVehicle
    ? {
        "@context": "https://schema.org",
        "@type": "Vehicle",
        name: listing.title,
        description: listing.description.substring(0, 500),
        url: `${baseUrl}/annonces/${listing.id}`,
        image: imageUrls,
        brand: listing.brand ? { "@type": "Brand", name: listing.brand.name } : undefined,
        model: listing.model?.name,
        vehicleModelDate: listing.year ? String(listing.year) : undefined,
        mileageFromOdometer: listing.mileage
          ? { "@type": "QuantitativeValue", value: listing.mileage, unitCode: "KMT" }
          : undefined,
        fuelType: listing.fuelType || undefined,
        vehicleTransmission: listing.transmission || undefined,
        offers: {
          "@type": "Offer",
          price: listing.price,
          priceCurrency: "TND",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/UsedCondition",
          seller: listing.user?.name
            ? { "@type": "Person", name: listing.user.name }
            : undefined,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Product",
        name: listing.title,
        description: listing.description.substring(0, 500),
        url: `${baseUrl}/annonces/${listing.id}`,
        image: imageUrls,
        brand: listing.brand ? { "@type": "Brand", name: listing.brand.name } : undefined,
        offers: {
          "@type": "Offer",
          price: listing.price,
          priceCurrency: "TND",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/UsedCondition",
          seller: listing.user?.name
            ? { "@type": "Person", name: listing.user.name }
            : undefined,
        },
      };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: listing.category === "VOITURES" ? "Voitures" : listing.category === "MOTOS" ? "Motos" : "Pièces",
        item: `${baseUrl}/${categoryPath}`,
      },
      ...(listing.brand
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: listing.brand.name,
              item: `${baseUrl}/${categoryPath}/${listing.brand.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: listing.brand ? 4 : 3,
        name: listing.title,
        item: `${baseUrl}/annonces/${listing.id}`,
      },
    ],
  };

  // Fetch similar listings (same model, or same brand, or same city)
  const similarWhere: Prisma.ListingWhereInput[] = [];
  if (listing.modelId) {
    similarWhere.push({ modelId: listing.modelId });
  }
  if (listing.brandId && !listing.modelId) {
    similarWhere.push({ brandId: listing.brandId });
  }
  similarWhere.push({ city: listing.city, category: listing.category });

  const similarListings = await prisma.listing.findMany({
    where: {
      OR: similarWhere,
      id: { not: listing.id },
      status: "ACTIVE",
      category: listing.category,
    },
    include: { brand: true, model: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const processedSimilarListings = similarListings.map((listing) => ({
    ...listing,
    images: (listing.images ?? []) as string[],
    resolvedImageUrl: Array.isArray(listing.images) && listing.images[0] ? resolveImageUrl(listing.images[0] as string) : null,
  }));

  // Serialize dates for the client component
  const serializedListing = JSON.parse(JSON.stringify(listing));
  const serializedSimilar = JSON.parse(JSON.stringify(processedSimilarListings));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ListingDetailClient listing={serializedListing} similarListings={serializedSimilar} serverImageUrls={imageUrls} />
    </>
  );
}
