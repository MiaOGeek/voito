import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";

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

export async function AllBrandsPage({ category }: { category: Category }) {
  const brands = await prisma.brand.findMany({
    where: { category },
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          listings: {
            where: { status: "ACTIVE" },
          },
        },
      },
    },
  });

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
          <span className="text-foreground font-medium">Toutes les marques</span>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          Toutes les marques <span className="text-primary">{label.toLowerCase()}</span>
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/${path}/${brand.slug}`}
              className="card-metallic p-4 flex flex-col items-center text-center hover:border-primary/50 transition-colors group"
            >
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={64}
                  height={64}
                  className="object-contain mb-3"
                />
              ) : (
                <div className="w-16 h-16 mb-3 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {brand.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {brand.name}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {brand._count.listings} {brand._count.listings === 1 ? "annonce" : "annonces"}
              </span>
            </Link>
          ))}
        </div>

        {brands.length === 0 && (
          <div className="card-metallic p-12 text-center">
            <p className="text-muted-foreground">Aucune marque disponible pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
