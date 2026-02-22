import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export const metadata = {
  title: "Conditions d'utilisation | Voito",
};

export default function ConditionsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-primary transition-colors shrink-0">
            <Home className="h-4 w-4 mr-1" />
            Voito
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
          <span className="text-foreground font-medium">Conditions d'utilisation</span>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          Conditions <span className="text-primary">d'utilisation</span>
        </h1>
        <div className="card-metallic p-8 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            En utilisant le site <strong className="text-foreground">voito.tn</strong>, vous acceptez les presentes conditions d'utilisation.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Inscription</h2>
          <p>
            L'inscription est gratuite et ouverte a toute personne physique majeure. Vous vous engagez a fournir des informations exactes lors de votre inscription et a maintenir la confidentialite de vos identifiants de connexion.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Publication d'annonces</h2>
          <p>En publiant une annonce sur Voito, vous vous engagez a :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Fournir des informations exactes et completes sur le vehicule ou la piece</li>
            <li>Ne pas publier de contenu illegal, trompeur ou offensant</li>
            <li>Etre le proprietaire ou avoir l'autorisation de vendre le bien propose</li>
            <li>Utiliser des photos reelles du produit</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4">Responsabilite</h2>
          <p>
            Voito n'est pas responsable des transactions entre utilisateurs. Nous recommandons de toujours verifier le vehicule ou la piece avant tout achat et de se rencontrer dans un lieu public.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Moderation</h2>
          <p>
            Voito se reserve le droit de supprimer toute annonce ne respectant pas les presentes conditions, sans preavis ni indemnite.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Modification</h2>
          <p>
            Voito peut modifier ces conditions a tout moment. Les utilisateurs seront informes de toute modification importante.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Contact</h2>
          <p>
            Pour toute question :{" "}
            <a href="mailto:contact@voito.tn" className="text-primary hover:underline">contact@voito.tn</a>
          </p>
        </div>
      </div>
    </div>
  );
}
