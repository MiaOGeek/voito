import { BrandModelPage } from "@/components/brand-listing-page";
import type { Metadata } from "next";
import prisma from "@/lib/db";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { brand: string; model: string };
}): Promise<Metadata> {
  const brand = await prisma.brand.findUnique({
    where: { slug_category: { slug: params.brand, category: "PIECES" } },
    include: { models: true },
  });

  if (!brand) return {};

  const model = brand.models.find((m) => slugify(m.name) === params.model);
  if (!model) return {};

  const baseUrl = process.env.NEXTAUTH_URL || "";

  const title = model.metaTitle || `Pièces ${brand.name} ${model.name} en Tunisie | Voito`;
  const description = model.metaDesc || `Trouvez des pièces détachées ${brand.name} ${model.name} en Tunisie sur Voito.`;
  const ogImage = model.logo || brand.logo;

  return {
    title,
    description,
    robots: { index: model.indexable, follow: model.indexable },
    alternates: { canonical: `${baseUrl}/pieces/${params.brand}/${params.model}` },
    openGraph: {
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function PiecesBrandModelPage({
  params,
  searchParams,
}: {
  params: { brand: string; model: string };
  searchParams: any;
}) {
  return (
    <BrandModelPage
      category="PIECES"
      brandSlug={params.brand}
      modelSlug={params.model}
      searchParams={searchParams}
    />
  );
}
