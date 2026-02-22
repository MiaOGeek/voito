import { BrandPage } from "@/components/brand-listing-page";
import type { Metadata } from "next";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { brand: string };
}): Promise<Metadata> {
  const brand = await prisma.brand.findUnique({
    where: { slug_category: { slug: params.brand, category: "MOTOS" } },
  });

  if (!brand) return {};

  const baseUrl = process.env.NEXTAUTH_URL || "";

  const title = brand.metaTitle || `Motos ${brand.name} d'occasion en Tunisie | Voito`;
  const description = brand.metaDesc || `Achetez et vendez des motos ${brand.name} d'occasion en Tunisie sur Voito.`;

  return {
    title,
    description,
    robots: { index: brand.indexable, follow: brand.indexable },
    alternates: { canonical: `${baseUrl}/motos/${params.brand}` },
    openGraph: {
      title,
      description,
      ...(brand.logo ? { images: [brand.logo] } : {}),
    },
  };
}

export default async function MotosBrandPage({
  params,
  searchParams,
}: {
  params: { brand: string };
  searchParams: any;
}) {
  return <BrandPage category="MOTOS" brandSlug={params.brand} searchParams={searchParams} />;
}
