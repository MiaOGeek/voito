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

  const title = city.metaTitle || `Pièces détachées à ${city.name} | Voito`;
  const description = city.metaDesc || `Trouvez des pièces détachées à ${city.name} en Tunisie sur Voito.`;

  return {
    title,
    description,
    robots: { index: city.indexable, follow: city.indexable },
    alternates: { canonical: `/pieces/ville/${city.slug}` },
    openGraph: { title, description },
  };
}

export default async function PiecesCityPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <CityPage category="PIECES" citySlug={params.slug} searchParams={searchParams} />;
}
