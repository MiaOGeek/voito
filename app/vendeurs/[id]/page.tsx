import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home, Calendar } from "lucide-react";
import prisma from "@/lib/db";
import { resolveImageUrl } from "@/lib/s3";
import ListingGrid from "@/components/listing-grid";
import Pagination, { ITEMS_PER_PAGE } from "@/components/pagination";
import { ListingStatus } from "@prisma/client";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 60;

const getSeller = cache(async function getSeller(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      createdAt: true,
      _count: { select: { listings: { where: { status: ListingStatus.ACTIVE } } } },
    },
  });
});

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const seller = await getSeller(params.id);
  if (!seller || !seller.name) return {};

  const baseUrl = SITE_URL;
  const title = `${seller.name} - Annonces du vendeur | Voito`;
  const description = `Consultez les annonces de ${seller.name} sur Voito. ${seller._count.listings} annonce(s) active(s).`;

  return {
    title,
    description,
    alternates: { canonical: `/vendeurs/${params.id}` },
    openGraph: { title, description },
    robots: { index: true, follow: true },
  };
}

export default async function SellerProfilePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const seller = await getSeller(params.id);
  if (!seller) notFound();

  const rawPage = searchParams?.page;
  const page = Math.max(1, parseInt(Array.isArray(rawPage) ? rawPage[0] : rawPage || "1", 10) || 1);
  const baseUrl = SITE_URL;

  const where = { userId: params.id, status: ListingStatus.ACTIVE };

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
    resolvedImageUrl:
      Array.isArray(listing.images) && listing.images[0]
        ? resolveImageUrl(listing.images[0] as string)
        : null,
  }));

  const memberSince = seller.createdAt.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: seller.name || "Vendeur", item: `${baseUrl}/vendeurs/${params.id}` },
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
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link
              href="/"
              className="flex items-center hover:text-primary transition-colors shrink-0"
            >
              <Home className="h-4 w-4 mr-1" />
              Voito
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
            <span className="text-foreground font-medium">
              {seller.name || "Vendeur"}
            </span>
          </nav>

          {/* Seller card */}
          <div className="card-metallic p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl shrink-0">
                {(seller.name ?? "A").charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {seller.name || "Vendeur"}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-1 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Membre depuis {memberSince}
                  </span>
                  <span>
                    {totalItems} {totalItems === 1 ? "annonce active" : "annonces actives"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Listings */}
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Annonces de{" "}
            <span className="text-primary">{seller.name || "ce vendeur"}</span>
          </h2>

          <div className="mb-4">
            <p className="text-muted-foreground">
              {totalItems}{" "}
              {totalItems === 1 ? "annonce trouvée" : "annonces trouvées"}
            </p>
          </div>

          <ListingGrid listings={listings} />

          <Pagination
            currentPage={page}
            totalItems={totalItems}
            basePath={`/vendeurs/${params.id}`}
            searchParams={searchParams as Record<string, string | undefined>}
          />

          {/* SEO Content */}
          <section className="mt-16 space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-bold text-foreground">
              {seller.name} - Vendeur de confiance sur Voito
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Découvrez le profil de {seller.name}, un vendeur actif sur Voito depuis {memberSince}. Avec {totalItems} annonce{totalItems > 1 ? 's' : ''} active{totalItems > 1 ? 's' : ''}, {seller.name} fait partie de notre communauté de vendeurs vérifiés qui contribuent à rendre le marché automobile tunisien plus transparent et accessible. Que vous cherchiez une voiture d'occasion, une moto ou des pièces détachées, les annonces de {seller.name} offrent un choix varié de véhicules et équipements répondant aux besoins des automobilistes tunisiens.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Membre depuis {memberSince}, {seller.name} publie régulièrement des annonces de qualité sur notre plateforme. Chaque annonce inclut des photos détaillées, les caractéristiques techniques complètes et des informations de contact directes, facilitant ainsi les échanges entre acheteurs et vendeurs en Tunisie. La transparence et la fiabilité sont au cœur de notre approche, et {seller.name} incarne ces valeurs en fournissant des descriptions précises et des prix en dinars tunisiens (TND).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Parcourez les {totalItems} annonce{totalItems > 1 ? 's' : ''} active{totalItems > 1 ? 's' : ''} de {seller.name} et trouvez le véhicule ou l'équipement qui correspond à vos critères. Notre plateforme facilite la mise en relation directe, permettant aux acheteurs de contacter immédiatement le vendeur pour obtenir plus d'informations ou organiser une visite. Avec Voito, l'achat et la vente de véhicules d'occasion en Tunisie deviennent plus simples et plus sécurisants.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Avantages de contacter {seller.name} sur Voito
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Vendeur vérifié avec {totalItems} annonce{totalItems > 1 ? 's' : ''} active{totalItems > 1 ? 's' : ''} sur notre plateforme</li>
              <li>Contact direct et transparent pour faciliter les négociations</li>
              <li>Annonces détaillées avec photos et caractéristiques complètes</li>
              <li>Prix affichés en dinars tunisiens pour une transparence totale</li>
              <li>Possibilité de visite et d'inspection des véhicules</li>
              <li>Membre actif depuis {memberSince}, gage de sérieux et de fiabilité</li>
              <li>Service client Voito disponible pour accompagner votre achat</li>
              <li>Plateforme sécurisée pour des transactions en toute confiance</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-6">
              N'hésitez pas à contacter {seller.name} directement depuis ses annonces pour obtenir plus de détails sur les véhicules disponibles. Voito vous accompagne dans toutes vos démarches d'achat ou de vente automobile en Tunisie, en mettant l'accent sur la qualité du service et la satisfaction de nos utilisateurs. Découvrez dès maintenant les annonces de {seller.name} et trouvez le véhicule de vos rêves !
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
