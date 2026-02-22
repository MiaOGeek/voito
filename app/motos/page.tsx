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
  title: "Motos d'occasion en Tunisie - Achat & Vente | Voito",
  description: "Achetez ou vendez votre moto d'occasion en Tunisie. Scooters, sportives, trails, customs — toutes marques et tous budgets. Annonces gratuites avec prix en TND sur Voito.",
  keywords: "moto occasion tunisie, scooter occasion tunisie, achat moto tunisie, vente moto occasion, annonce moto tunisie",
  alternates: { canonical: "/motos" },
};

export default async function MotosPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const rawPage = searchParams?.page;
  const page = Math.max(1, parseInt(Array.isArray(rawPage) ? rawPage[0] : rawPage || "1", 10) || 1);

  const p = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";

  const where: Prisma.ListingWhereInput = {
    category: "MOTOS",
    status: ListingStatus.ACTIVE,
  };

  if (searchParams?.city) where.city = { contains: p(searchParams.city) };

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
      { "@type": "ListItem", position: 2, name: "Motos d'occasion", item: `${baseUrl}/motos` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Motos d'occasion en Tunisie",
    url: `${baseUrl}/motos`,
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
            Motos <span className="text-primary">d'occasion</span>
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/motos/marques" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <Tag className="h-4 w-4" />
              Parcourir par marque
            </Link>
            <Link href="/motos/villes" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <MapPin className="h-4 w-4" />
              Parcourir par ville
            </Link>
          </div>

        <div className="mb-8">
          <SearchFilters category="MOTOS" showCategoryFilter={false} />
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
          basePath="/motos"
          searchParams={searchParams as Record<string, string | undefined>}
        />

        {/* SEO Content */}
        <section className="mt-16 space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">
            Trouver une moto d'occasion en Tunisie
          </h2>
          <p>
            Voito est la plateforme de choix pour l'achat et la vente de motos d'occasion
            en Tunisie. Notre catalogue couvre tous les types de deux-roues : scooters
            urbains, motos sportives, trails, roadsters, customs et motos utilitaires.
            Quel que soit votre budget ou votre style de conduite, vous trouverez la moto
            qui vous correspond parmi nos annonces vérifiées.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Toutes les marques de motos
          </h3>
          <p>
            Parcourez les annonces des marques les plus populaires en Tunisie : Yamaha
            (YBR, MT, TMAX), Honda (CB, PCX, Forza), Suzuki (GSX, V-Strom, Address),
            Kawasaki (Ninja, Z, Versys), BMW Motorrad (GS, F Series), KTM (Duke, Adventure),
            Piaggio (Liberty, Medley), Vespa, SYM, Kymco et bien d'autres. Consultez nos{" "}
            <Link href="/motos/marques" className="text-primary hover:underline">
              pages marques motos
            </Link>{" "}
            pour explorer les modèles disponibles.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Annonces détaillées avec photos
          </h3>
          <p>
            Chaque annonce de moto sur Voito contient les informations essentielles pour
            comparer : le prix en dinars tunisiens (TND), l'année de première mise en
            circulation, le kilométrage, la cylindrée et des photos prises par le vendeur.
            Ces détails vous permettent d'évaluer chaque moto sans vous déplacer et de
            contacter directement les vendeurs qui vous intéressent.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Motos par ville
          </h3>
          <p>
            Trouvez une moto proche de chez vous en filtrant par ville. Les annonces sont
            disponibles dans toute la Tunisie : Tunis, Sousse, Sfax, Nabeul, Bizerte,
            Gabès, Kairouan, Monastir et tous les autres gouvernorats. Parcourez nos{" "}
            <Link href="/motos/villes" className="text-primary hover:underline">
              annonces motos par ville
            </Link>{" "}
            pour découvrir les offres dans votre région.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Vendez votre moto gratuitement
          </h3>
          <p>
            Vous souhaitez vendre votre moto ou votre scooter ? La publication est
            entièrement gratuite sur Voito. Créez votre compte, ajoutez des photos
            de qualité, indiquez le prix et votre annonce sera visible immédiatement
            par des milliers d'acheteurs dans tout le pays. Les acheteurs vous
            contactent directement via notre messagerie ou par WhatsApp, sans frais
            ni commission.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Conseils pour acheter une moto d'occasion
          </h3>
          <p>
            Avant d'acheter une moto d'occasion, vérifiez l'état général du véhicule
            en personne : pneus, freins, chaîne, fourche et état du moteur. Demandez
            les documents (carte grise, certificat de visite technique) et l'historique
            d'entretien. Effectuez un essai routier et comparez les prix sur Voito pour
            vous assurer d'obtenir la meilleure offre. N'hésitez pas à négocier
            directement avec le vendeur.
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
