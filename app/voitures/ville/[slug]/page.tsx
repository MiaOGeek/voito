import { CityPage } from "@/components/city-listing-page";
import type { Metadata } from "next";
import prisma from "@/lib/db";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const city = await prisma.city.findUnique({ where: { slug: params.slug } });
  if (!city) return {};

  const title = city.metaTitle || `Voitures d'occasion à ${city.name} | Voito`;
  const description = city.metaDesc || `Achetez et vendez des voitures d'occasion à ${city.name} en Tunisie sur Voito.`;

  return {
    title,
    description,
    robots: { index: city.indexable, follow: city.indexable },
    alternates: { canonical: `/voitures/ville/${city.slug}` },
    openGraph: { title, description },
  };
}

export default async function VoituresCityPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <CityPage category="VOITURES" citySlug={params.slug} searchParams={searchParams} />;
}
