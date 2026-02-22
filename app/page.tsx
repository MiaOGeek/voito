import SearchFilters from "@/components/search-filters";
import ListingGrid from "@/components/listing-grid";
import { Car, Bike, Wrench } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
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
          <SearchFilters showCategoryFilter={true} />
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

      {/* Recent Listings */}
      <section className="py-16 metallic-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Annonces <span className="text-primary">récentes</span>
          </h2>
          <ListingGrid listings={recentListings} />
        </div>
      </section>
    </div>
  );
}
