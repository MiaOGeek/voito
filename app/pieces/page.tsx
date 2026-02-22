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
  title: "Pièces détachées automobiles en Tunisie - Neuves & Occasion | Voito",
  description: "Achetez des pièces détachées pour voiture et moto en Tunisie. Moteur, freins, carrosserie, électricité — pièces neuves et d'occasion à petits prix. Annonces gratuites sur Voito.",
  keywords: "pièces détachées tunisie, pièces auto occasion, pièces voiture tunisie, accessoires moto tunisie, pièces détachées pas cher",
  alternates: { canonical: "/pieces" },
};

export default async function PiecesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const rawPage = searchParams?.page;
  const page = Math.max(1, parseInt(Array.isArray(rawPage) ? rawPage[0] : rawPage || "1", 10) || 1);

  const p = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";

  const where: Prisma.ListingWhereInput = {
    category: "PIECES",
    status: ListingStatus.ACTIVE,
  };

  if (searchParams?.city) where.city = { contains: p(searchParams.city) };

  if (searchParams?.minPrice || searchParams?.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) where.price.gte = parseFloat(p(searchParams.minPrice));
    if (searchParams.maxPrice) where.price.lte = parseFloat(p(searchParams.maxPrice));
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
      { "@type": "ListItem", position: 2, name: "Pièces détachées", item: `${baseUrl}/pieces` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pièces détachées automobiles en Tunisie",
    url: `${baseUrl}/pieces`,
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
            Pièces <span className="text-primary">détachées</span>
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/pieces/marques" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <Tag className="h-4 w-4" />
              Parcourir par marque
            </Link>
            <Link href="/pieces/villes" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <MapPin className="h-4 w-4" />
              Parcourir par ville
            </Link>
          </div>

        <div className="mb-8">
          <SearchFilters category="PIECES" showCategoryFilter={false} />
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
          basePath="/pieces"
          searchParams={searchParams as Record<string, string | undefined>}
        />

        {/* SEO Content */}
        <section className="mt-16 space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">
            Pièces détachées automobiles en Tunisie
          </h2>
          <p>
            Voito est votre destination pour trouver des pièces détachées neuves et
            d'occasion en Tunisie. Notre plateforme regroupe des milliers d'annonces de
            pièces compatibles avec toutes les marques populaires du marché tunisien.
            Que vous ayez besoin d'une pièce mécanique, de carrosserie ou d'un
            accessoire, vous trouverez ce qu'il vous faut au meilleur prix.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Toutes les catégories de pièces
          </h3>
          <p>
            Parcourez notre catalogue complet de pièces détachées : moteurs et composants
            moteur, boîtes de vitesses, embrayages, systèmes de freinage (plaquettes,
            disques, étriers), suspension et amortisseurs, pièces de carrosserie
            (pare-chocs, ailes, capots, rétroviseurs), éclairage (phares, feux arrière,
            clignotants), pièces électriques (alternateurs, démarreurs, batteries),
            filtres (huile, air, carburant), radiateurs, échappements et accessoires
            intérieurs. Les pièces sont disponibles neuves et d'occasion, à des prix
            compétitifs en dinars tunisiens (TND).
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Pièces pour toutes les marques
          </h3>
          <p>
            Les vendeurs sur Voito proposent des pièces compatibles avec les marques les
            plus répandues en Tunisie : Peugeot (206, 207, 208, 308, Partner), Renault
            (Clio, Symbol, Mégane, Kangoo), Volkswagen (Golf, Polo, Caddy), Toyota
            (Yaris, Corolla, Hilux), Hyundai (i10, i20, Tucson, Accent), Kia (Picanto,
            Rio, Sportage), Fiat (Punto, Tipo, Doblo), Citroën (C3, Berlingo), BMW,
            Mercedes-Benz et bien d'autres. Visitez nos{" "}
            <Link href="/pieces/marques" className="text-primary hover:underline">
              pages marques pièces
            </Link>{" "}
            pour cibler votre recherche.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Pièces par ville
          </h3>
          <p>
            Trouvez des pièces détachées près de chez vous en filtrant par ville. Les
            annonces couvrent l'ensemble de la Tunisie : Tunis, Sfax, Sousse, Nabeul,
            Bizerte, Gabès, Kairouan, Monastir et tous les autres gouvernorats.
            Consultez nos{" "}
            <Link href="/pieces/villes" className="text-primary hover:underline">
              annonces pièces par ville
            </Link>{" "}
            pour trouver un vendeur dans votre région.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Vendez vos pièces gratuitement
          </h3>
          <p>
            Vous avez des pièces détachées à vendre — neuves, d'occasion ou de
            récupération ? Déposez votre annonce gratuitement sur Voito. Créez votre
            compte, ajoutez des photos claires de la pièce, précisez la compatibilité
            (marque, modèle, année) et votre annonce sera visible immédiatement par des
            acheteurs dans tout le pays. Les contacts se font directement via notre
            messagerie ou par WhatsApp, sans intermédiaire.
          </p>

          <h3 className="text-xl font-bold text-foreground">
            Conseils pour acheter des pièces d'occasion
          </h3>
          <p>
            Avant d'acheter une pièce d'occasion, vérifiez sa compatibilité avec votre
            véhicule (référence constructeur, année de fabrication). Demandez au vendeur
            des photos détaillées et l'état d'usure de la pièce. Pour les pièces
            mécaniques importantes (moteur, boîte de vitesses, turbo), privilégiez les
            vendeurs qui offrent une garantie. Comparez les prix sur Voito et n'hésitez
            pas à contacter plusieurs vendeurs pour obtenir le meilleur tarif.
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
