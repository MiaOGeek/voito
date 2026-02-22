import prisma from "@/lib/db";
import Link from "next/link";
import { ChevronRight, Home, MapPin } from "lucide-react";

type Category = "VOITURES" | "MOTOS" | "PIECES";

const categoryLabels: Record<Category, string> = {
  VOITURES: "Voitures",
  MOTOS: "Motos",
  PIECES: "Pièces",
};

const categoryPaths: Record<Category, string> = {
  VOITURES: "voitures",
  MOTOS: "motos",
  PIECES: "pieces",
};

export async function AllCitiesPage({ category }: { category: Category }) {
  const cities = await prisma.city.findMany({
    orderBy: { name: "asc" },
  });

  // Count active listings per city for this category
  const cityCounts = await prisma.listing.groupBy({
    by: ["city"],
    where: { category, status: "ACTIVE" },
    _count: { id: true },
  });

  const countMap = new Map(cityCounts.map((c) => [c.city, c._count.id]));

  const path = categoryPaths[category];
  const label = categoryLabels[category];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-primary transition-colors">
            <Home className="h-4 w-4 mr-1" />
            Voito
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
          <Link href={`/${path}`} className="hover:text-primary transition-colors">
            {label}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
          <span className="text-foreground font-medium">Toutes les villes</span>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          {label} par <span className="text-primary">ville</span>
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {cities.map((city) => {
            const count = countMap.get(city.name) || 0;
            return (
              <Link
                key={city.id}
                href={`/${path}/ville/${city.slug}`}
                className="card-metallic p-4 flex flex-col items-center text-center hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 mb-3 rounded-full bg-muted flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {city.name}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {count} {count === 1 ? "annonce" : "annonces"}
                </span>
              </Link>
            );
          })}
        </div>

        {cities.length === 0 && (
          <div className="card-metallic p-12 text-center">
            <p className="text-muted-foreground">Aucune ville disponible pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
