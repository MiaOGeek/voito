import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export const metadata = {
  title: "Mentions Legales | Voito",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-primary transition-colors shrink-0">
            <Home className="h-4 w-4 mr-1" />
            Voito
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
          <span className="text-foreground font-medium">Mentions Legales</span>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          Mentions <span className="text-primary">Legales</span>
        </h1>
        <div className="card-metallic p-8 space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground">Editeur du site</h2>
          <p>
            Le site <strong className="text-foreground">voito.tn</strong> est edite par Voito, plateforme de petites annonces automobiles en Tunisie.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Hebergement</h2>
          <p>
            Le site est heberge par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, Etats-Unis.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Propriete intellectuelle</h2>
          <p>
            L'ensemble des contenus (textes, images, logos, elements graphiques) presents sur le site voito.tn sont proteges par le droit d'auteur. Toute reproduction, meme partielle, est interdite sans autorisation prealable.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Responsabilite</h2>
          <p>
            Voito agit en tant qu'intermediaire entre les vendeurs et les acheteurs. Nous ne sommes pas partie prenante dans les transactions entre utilisateurs. Chaque utilisateur est responsable du contenu de ses annonces.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Contact</h2>
          <p>
            Pour toute question relative aux mentions legales :{" "}
            <a href="mailto:contact@voito.tn" className="text-primary hover:underline">contact@voito.tn</a>
          </p>
        </div>
      </div>
    </div>
  );
}
