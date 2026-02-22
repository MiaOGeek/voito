import { Suspense } from "react";
import SearchFilters from "@/components/search-filters";
import ListingGrid from "@/components/listing-grid";
import { Car, Bike, Wrench, MapPin, Search, FileText, MessageCircle } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";
import { resolveImageUrl } from "@/lib/s3";
import { SITE_URL, CONTACT_EMAIL, SITE_DOMAIN } from "@/lib/constants";

export const revalidate = 60; // ISR: revalidate homepage every 60 seconds

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const recentListings = await prisma.listing.findMany({
    where: { status: "ACTIVE" },
    include: {
      brand: true,
      model: true,
      user: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const listingsWithImages = recentListings.map((listing) => ({
    ...listing,
    images: (listing.images ?? []) as string[],
    resolvedImageUrl: Array.isArray(listing.images) && listing.images[0] ? resolveImageUrl(listing.images[0] as string) : null,
  }));

  const topCities = await prisma.city.findMany({
    where: { indexable: true },
    orderBy: { name: "asc" },
    take: 8,
  });

  const siteUrl = SITE_URL;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Voito",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/og-image.png`,
    },
    description:
      "Plateforme de petites annonces automobiles en Tunisie. Voitures, motos et pièces détachées d'occasion.",
    areaServed: {
      "@type": "Country",
      name: "Tunisie",
    },
    knowsLanguage: "fr",
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "customer service",
      availableLanguage: ["fr", "ar"],
    },
    sameAs: [
      `https://www.facebook.com/${SITE_DOMAIN}`,
    ],
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tunis",
      addressCountry: "TN",
    },
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Voito",
    url: siteUrl,
    description: "Petites annonces automobiles en Tunisie",
    inLanguage: "fr",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/voitures?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      {/* Hero Section */}
      <section className="metallic-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-industrial text-foreground mb-4 tracking-tighter">
              Trouvez le <span className="text-primary">véhicule</span> de vos rêves
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des milliers d'annonces de voitures, motos et pièces détachées d'occasion en Tunisie
            </p>
          </div>

          {/* Main Search */}
          <Suspense fallback={<div className="card-metallic p-6 animate-pulse h-48" />}>
            <SearchFilters showCategoryFilter={true} />
          </Suspense>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Explorer par <span className="text-primary">catégorie</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/voitures" className="card-metallic p-8 text-center group border-t-2 border-t-transparent hover:border-t-primary">
              <Car className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Voitures</h3>
              <p className="text-muted-foreground">Découvrez nos voitures d'occasion</p>
            </Link>

            <Link href="/motos" className="card-metallic p-8 text-center group border-t-2 border-t-transparent hover:border-t-primary">
              <Bike className="h-16 w-16 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Motos</h3>
              <p className="text-muted-foreground">Trouvez votre moto idéale</p>
            </Link>

            <Link href="/pieces" className="card-metallic p-8 text-center group border-t-2 border-t-transparent hover:border-t-primary">
              <Wrench className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Pièces</h3>
              <p className="text-muted-foreground">Pièces détachées à petits prix</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Villes populaires */}
      {topCities.length > 0 && (
        <section className="py-16 metallic-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Annonces par <span className="text-primary">ville</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {topCities.map((city) => (
                <Link
                  key={city.id}
                  href={`/annonces-${city.slug}`}
                  className="card-metallic p-4 flex items-center gap-3 hover:border-primary/50 transition-colors group"
                >
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {city.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Listings */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Annonces <span className="text-primary">récentes</span>
          </h2>
          <ListingGrid listings={listingsWithImages} />
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 metallic-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">
            Comment ça <span className="text-primary">marche</span> ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">1. Recherchez</h3>
              <p className="text-muted-foreground text-sm">
                Parcourez les annonces par catégorie, marque, ville ou budget. Utilisez les
                filtres avancés pour affiner vos résultats.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">2. Contactez</h3>
              <p className="text-muted-foreground text-sm">
                Envoyez un message au vendeur directement via la plateforme ou par WhatsApp.
                Posez vos questions et négociez le prix.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">3. Concluez</h3>
              <p className="text-muted-foreground text-sm">
                Rencontrez le vendeur, vérifiez le véhicule ou la pièce en personne et
                finalisez la transaction en toute confiance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">
            Voito — Petites annonces automobiles en Tunisie
          </h2>
          <p>
            Voito est la plateforme de référence pour l'achat et la vente de véhicules
            d'occasion en Tunisie. Que vous soyez à la recherche d'une voiture familiale,
            d'un scooter pour vos trajets quotidiens ou d'une pièce détachée pour réparer
            votre véhicule, notre site regroupe des milliers d'annonces vérifiées couvrant
            les 24 gouvernorats du pays.
          </p>
          <p>
            Toutes les grandes marques du marché tunisien sont représentées : Volkswagen,
            Peugeot, Renault, Toyota, Hyundai, Kia, BMW, Mercedes-Benz, Fiat, Citroën,
            Dacia, Seat, Audi et bien d'autres. Chaque annonce inclut des informations
            détaillées — prix en dinars tunisiens (TND), année de mise en circulation,
            kilométrage, puissance fiscale, type de carburant et de transmission — ainsi
            que des photos de qualité pour vous aider à comparer les offres.
          </p>
          <p>
            Nos trois catégories principales couvrent l'ensemble du marché automobile
            tunisien : les{" "}
            <Link href="/voitures" className="text-primary hover:underline">
              voitures d'occasion
            </Link>
            , les{" "}
            <Link href="/motos" className="text-primary hover:underline">
              motos et scooters
            </Link>{" "}
            et les{" "}
            <Link href="/pieces" className="text-primary hover:underline">
              pièces détachées
            </Link>{" "}
            neuves et d'occasion. Vous pouvez explorer les annonces par ville — Tunis,
            Sfax, Sousse, Nabeul, Bizerte, Gabès, Kairouan, Monastir — ou par marque
            depuis nos pages dédiées.
          </p>
          <p>
            La publication d'annonces est entièrement gratuite. Créez votre compte en
            quelques secondes, ajoutez vos photos et votre annonce sera visible
            immédiatement par des milliers d'acheteurs potentiels à travers toute la
            Tunisie. Les vendeurs sont joignables directement via notre messagerie intégrée
            ou par WhatsApp, sans intermédiaire.
          </p>
        </div>
      </section>
    </div>
  );
}
