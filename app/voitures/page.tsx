import { Suspense } from "react";
import SearchFilters from "@/components/search-filters";
import ListingGrid from "@/components/listing-grid";
import Pagination, { ITEMS_PER_PAGE } from "@/components/pagination";
import { ListingStatus, Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { resolveImageUrl } from "@/lib/s3";
import Link from "next/link";
import { Tag, MapPin } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 60;

export const metadata = {
  title: "Voitures d'occasion en Tunisie - Achat & Vente | Voito",
  description: "Trouvez votre voiture d'occasion en Tunisie parmi des milliers d'annonces. Toutes marques : Volkswagen, Peugeot, Renault, Toyota, BMW. Prix en TND, vendeurs vérifiés. Publiez votre annonce gratuitement sur Voito.",
  keywords: "voiture occasion tunisie, achat voiture tunisie, vente voiture occasion, voiture pas cher tunisie, annonce auto tunisie",
  alternates: { canonical: "/voitures" },
};

export default async function VoituresPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const rawPage = searchParams?.page;
  const page = Math.max(1, parseInt(Array.isArray(rawPage) ? rawPage[0] : rawPage || "1", 10) || 1);

  const p = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";

  const where: Prisma.ListingWhereInput = {
    category: "VOITURES",
    status: ListingStatus.ACTIVE,
  };

  if (searchParams?.city) where.city = { contains: p(searchParams.city) };
  if (searchParams?.fiscalPower) where.fiscalPower = parseInt(p(searchParams.fiscalPower), 10);

  if (searchParams?.minPrice || searchParams?.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) where.price.gte = parseFloat(p(searchParams.minPrice));
    if (searchParams.maxPrice) where.price.lte = parseFloat(p(searchParams.maxPrice));
  }

  if (searchParams?.minYear || searchParams?.maxYear) {
    where.year = {};
    if (searchParams.minYear) where.year.gte = parseInt(p(searchParams.minYear), 10);
    if (searchParams.maxYear) where.year.lte = parseInt(p(searchParams.maxYear), 10);
  }

  if (searchParams?.minMileage || searchParams?.maxMileage) {
    where.mileage = {};
    if (searchParams.minMileage) where.mileage.gte = parseInt(p(searchParams.minMileage), 10);
    if (searchParams.maxMileage) where.mileage.lte = parseInt(p(searchParams.maxMileage), 10);
  }

  const [rawListings, totalItems] = await Promise.all([
    prisma.listing.findMany({
      where,
      include: {
        brand: true,
        model: true,
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.listing.count({ where }),
  ]);

  const listings = rawListings.map((listing) => ({
    ...listing,
    images: (listing.images ?? []) as string[],
    resolvedImageUrl: Array.isArray(listing.images) && listing.images[0] ? resolveImageUrl(listing.images[0] as string) : null,
  }));

  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Voitures d'occasion", item: `${baseUrl}/voitures` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Voitures d'occasion en Tunisie",
    url: `${baseUrl}/voitures`,
    numberOfItems: totalItems,
    itemListElement: listings.map((listing, index) => ({
      "@type": "ListItem",
      position: (page - 1) * ITEMS_PER_PAGE + index + 1,
      url: `${baseUrl}/annonces/${listing.id}`,
      name: listing.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Voitures <span className="text-primary">d'occasion</span>
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/voitures/marques" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <Tag className="h-4 w-4" />
              Parcourir par marque
            </Link>
            <Link href="/voitures/villes" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <MapPin className="h-4 w-4" />
              Parcourir par ville
            </Link>
            <Link href="/voitures/ville/tunis" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <MapPin className="h-4 w-4" />
              Voitures à Tunis
            </Link>
          </div>

        <div className="mb-8">
          <Suspense fallback={<div className="card-metallic p-6 animate-pulse h-48" />}>
            <SearchFilters category="VOITURES" showCategoryFilter={false} />
          </Suspense>
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
          basePath="/voitures"
          searchParams={searchParams as Record<string, string | undefined>}
        />

        {/* SEO Content */}
        <section className="mt-16 space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">
            Acheter une voiture d'occasion en Tunisie
          </h2>
          <p>
            Voito est la plateforme de référence pour l'achat et la vente de voitures
            d'occasion en Tunisie. Notre catalogue regroupe des milliers d'annonces
            couvrant les 24 gouvernorats du pays : Tunis, Ariana, Ben Arous, Manouba,
            Sousse, Sfax, Nabeul, Bizerte, Gabès, Kairouan, Monastir, Médenine et
            au-delà. Que vous recherchiez une citadine économique pour la ville, une
            berline familiale spacieuse, un SUV tout-terrain ou un utilitaire, vous
            trouverez le véhicule adapté à votre budget et à vos besoins.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Toutes les marques populaires en Tunisie
          </h3>
          <p>
            Les marques les plus demandées sur le marché tunisien sont toutes représentées
            sur Voito : Volkswagen (Golf, Polo, Caddy), Peugeot (208, 308, Partner),
            Renault (Clio, Symbol, Mégane), Toyota (Yaris, Corolla, Hilux), Hyundai
            (i10, i20, Tucson), Kia (Picanto, Sportage, Cerato), BMW (Série 3, Série 5),
            Mercedes-Benz (Classe C, Classe E), Fiat (Punto, Tipo, Doblo), Citroën
            (C3, C4, Berlingo), Dacia (Logan, Sandero, Duster), Seat (Ibiza, Leon) et
            Audi (A3, A4, Q5). Parcourez nos{" "}
            <Link href="/voitures/marques" className="text-primary hover:underline">
              pages marques
            </Link>{" "}
            pour trouver les modèles qui vous intéressent.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Des annonces détaillées pour un achat éclairé
          </h3>
          <p>
            Chaque annonce de voiture sur Voito affiche les informations essentielles
            pour comparer les offres : le prix en dinars tunisiens (TND), l'année de
            mise en circulation, le kilométrage, la puissance fiscale (CV), le type de
            carburant (essence, diesel, GPL), le type de transmission (manuelle,
            automatique), ainsi que des photos de qualité prises par le vendeur. Ces
            détails vous permettent d'évaluer rapidement chaque véhicule sans vous
            déplacer.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Recherche par ville
          </h3>
          <p>
            Trouvez une voiture proche de chez vous en filtrant par ville. Les annonces
            sont disponibles dans toutes les grandes villes de Tunisie. Consultez nos{" "}
            <Link href="/voitures/villes" className="text-primary hover:underline">
              annonces par ville
            </Link>{" "}
            pour découvrir les offres dans votre région : voitures d'occasion à Tunis,
            Sousse, Sfax, Nabeul, Bizerte et dans tous les autres gouvernorats.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Vendez votre voiture gratuitement
          </h3>
          <p>
            Vous souhaitez vendre votre véhicule ? La publication d'annonces est
            entièrement gratuite sur Voito. Créez votre compte, ajoutez des photos de
            qualité, décrivez votre véhicule et votre annonce sera visible immédiatement
            par des milliers d'acheteurs potentiels. Vendeurs particuliers et
            professionnels sont les bienvenus. Les acheteurs peuvent vous contacter
            directement via notre messagerie intégrée ou par WhatsApp, sans
            intermédiaire ni commission.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Conseils pour acheter une voiture d'occasion
          </h3>
          <p>
            Avant d'acheter, vérifiez toujours le véhicule en personne. Contrôlez les
            documents (carte grise, certificat de visite technique), inspectez la
            carrosserie et le moteur, et effectuez un essai routier. Comparez les prix
            sur Voito pour vous assurer d'obtenir le meilleur rapport qualité-prix.
            N'hésitez pas à négocier directement avec le vendeur et à demander
            l'historique d'entretien du véhicule.
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
