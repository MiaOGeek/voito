import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { getFileUrl } from "@/lib/s3";
import ListingDetailClient from "./listing-detail-client";

export const dynamic = "force-dynamic";

async function getListing(id: string) {
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      brand: true,
      model: true,
      user: {
        select: {
          name: true,
          phone: true,
          email: true,
          createdAt: true,
        },
      },
    },
  });

  return listing;
}

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

  // Try to get OG image from the first listing image
  let ogImage = "/og-image.png";
  if (listing.images && (listing.images as string[]).length > 0) {
    try {
      ogImage = await getFileUrl((listing.images as string[])[0], true);
    } catch {
      // fallback to default
    }
  }

  const baseUrl = process.env.NEXTAUTH_URL || "";

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/annonces/${params.id}` },
    openGraph: {
      title,
      description,
      images: [ogImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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

  const baseUrl = process.env.NEXTAUTH_URL || "";
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

  const jsonLd: Record<string, any> = isVehicle
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
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl || undefined },
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
      },
    ],
  };

  // Fetch similar listings (same model, or same brand, or same city)
  const similarWhere: any[] = [];
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

  // Serialize dates for the client component
  const serializedListing = JSON.parse(JSON.stringify(listing));
  const serializedSimilar = JSON.parse(JSON.stringify(similarListings));

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
      <ListingDetailClient listing={serializedListing} similarListings={serializedSimilar} />
    </>
  );
}
