import Link from "next/link";
import { Home, Search, Car, Bike, Wrench } from "lucide-react";

export const metadata = {
  title: "Page introuvable | Voito",
  description: "La page que vous recherchez n'existe pas ou a été déplacée. Retrouvez des milliers d'annonces de voitures, motos et pièces d'occasion sur Voito.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-lg mx-auto px-4 text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Page introuvable
        </h2>
        <p className="text-muted-foreground mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            href="/voitures"
            className="card-metallic p-4 flex items-center gap-3 hover:border-primary/50 transition-colors"
          >
            <Car className="h-6 w-6 text-primary shrink-0" />
            <div className="text-left">
              <span className="font-medium text-foreground block">Voitures</span>
              <span className="text-xs text-muted-foreground">Occasion en Tunisie</span>
            </div>
          </Link>
          <Link
            href="/motos"
            className="card-metallic p-4 flex items-center gap-3 hover:border-primary/50 transition-colors"
          >
            <Bike className="h-6 w-6 text-primary shrink-0" />
            <div className="text-left">
              <span className="font-medium text-foreground block">Motos</span>
              <span className="text-xs text-muted-foreground">Occasion en Tunisie</span>
            </div>
          </Link>
          <Link
            href="/pieces"
            className="card-metallic p-4 flex items-center gap-3 hover:border-primary/50 transition-colors"
          >
            <Wrench className="h-6 w-6 text-primary shrink-0" />
            <div className="text-left">
              <span className="font-medium text-foreground block">Pièces</span>
              <span className="text-xs text-muted-foreground">Pièces détachées</span>
            </div>
          </Link>
          <Link
            href="/"
            className="card-metallic p-4 flex items-center gap-3 hover:border-primary/50 transition-colors"
          >
            <Home className="h-6 w-6 text-primary shrink-0" />
            <div className="text-left">
              <span className="font-medium text-foreground block">Accueil</span>
              <span className="text-xs text-muted-foreground">Retour à Voito</span>
            </div>
          </Link>
        </div>

        <Link
          href="/"
          className="btn-primary inline-flex items-center"
        >
          <Search className="h-4 w-4 mr-2" />
          Rechercher une annonce
        </Link>
      </div>
    </div>
  );
}
