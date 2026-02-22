import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Car, CheckCircle, AlertTriangle, DollarSign } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Guide d'achat voiture d'occasion en Tunisie | Voito",
  description:
    "Conseils pratiques pour acheter une voiture d'occasion en Tunisie : vérifications techniques, négociation du prix, documents administratifs, pièges à éviter. Guide complet par Voito.",
  keywords:
    "guide achat voiture occasion tunisie, conseils achat auto tunisie, vérification voiture occasion, documents vente voiture tunisie",
};

export default function GuidesAchatPage() {
  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Voitures", item: `${baseUrl}/voitures` },
      { "@type": "ListItem", position: 3, name: "Guide d'achat", item: `${baseUrl}/voitures/guides-achat` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Guide d'achat voiture d'occasion en Tunisie",
    description: "Conseils pratiques pour acheter une voiture d'occasion en Tunisie.",
    author: { "@type": "Organization", name: "Voito" },
    publisher: { "@type": "Organization", name: "Voito", url: baseUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link href="/" className="flex items-center hover:text-primary transition-colors">
              <Home className="h-4 w-4 mr-1" />
              Voito
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
            <Link href="/voitures" className="hover:text-primary transition-colors">
              Voitures
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Guide d'achat</span>
          </nav>

          <h1 className="text-4xl font-bold text-foreground mb-6">
            Guide d'achat <span className="text-primary">voiture d'occasion</span> en Tunisie
          </h1>

          <p className="text-lg text-muted-foreground mb-10">
            Acheter une voiture d'occasion en Tunisie peut être une excellente affaire — à condition
            de bien se préparer. Ce guide vous accompagne étape par étape pour trouver le bon
            véhicule, éviter les arnaques et finaliser votre achat en toute sérénité.
          </p>

          {/* Section 1 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                1. Définir son budget et ses besoins
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                Avant de commencer vos recherches, déterminez un budget réaliste en dinars tunisiens
                (TND). N'oubliez pas d'inclure les frais annexes : mutation au registre des
                automobiles, assurance, visite technique et éventuelles réparations.
              </p>
              <p>
                Posez-vous les bonnes questions : usage quotidien ou occasionnel ? Ville ou
                longue route ? Combien de passagers ? Essence ou diesel ? Ces critères orienteront
                votre choix vers le bon type de véhicule.
              </p>
              <p>
                Sur Voito, utilisez les <Link href="/voitures" className="text-primary hover:underline">filtres de recherche</Link> pour
                affiner par prix, kilométrage, année, puissance fiscale et ville.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                2. Les vérifications indispensables
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                <strong className="text-foreground">Extérieur :</strong> Inspectez la carrosserie
                sous un bon éclairage. Recherchez les traces de rouille, les différences de teinte
                (signe de repeinture après accident) et l'alignement des panneaux.
              </p>
              <p>
                <strong className="text-foreground">Moteur :</strong> Vérifiez le niveau et la
                couleur de l'huile, l'état de la courroie, les fuites éventuelles. Démarrez le
                moteur à froid pour détecter des bruits anormaux.
              </p>
              <p>
                <strong className="text-foreground">Intérieur :</strong> Testez tous les
                équipements : climatisation, vitres électriques, tableau de bord, autoradio.
                Vérifiez l'état des sièges et l'odeur de l'habitacle (humidité = problème).
              </p>
              <p>
                <strong className="text-foreground">Essai routier :</strong> Roulez au moins 15-20
                minutes. Testez les freinages, les accélérations, la direction et le passage des
                vitesses. Écoutez les bruits de suspension.
              </p>
              <p>
                <strong className="text-foreground">Kilométrage :</strong> Comparez le kilométrage
                affiché avec l'usure générale du véhicule (pédales, volant, levier de vitesses).
                Méfiez-vous des compteurs trafiqués.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                3. Négocier le prix
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                Comparez les prix de véhicules similaires sur <Link href="/voitures" className="text-primary hover:underline">Voito</Link> pour
                avoir une idée du marché. Regardez les annonces de même marque, modèle, année et
                kilométrage dans votre région.
              </p>
              <p>
                Utilisez les défauts constatés lors de votre inspection comme leviers de
                négociation. Un véhicule qui nécessite un changement de pneus ou une révision
                peut justifier une réduction de 500 à 1 500 TND.
              </p>
              <p>
                N'hésitez pas à faire plusieurs visites et à comparer. Le marché de l'occasion en
                Tunisie offre beaucoup de choix, surtout dans les grandes villes comme{" "}
                <Link href="/voitures/villes" className="text-primary hover:underline">Tunis, Sousse et Sfax</Link>.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Car className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                4. Les documents administratifs
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                Pour finaliser l'achat d'une voiture d'occasion en Tunisie, vous aurez besoin de :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>La carte grise originale au nom du vendeur</li>
                <li>Le certificat de visite technique en cours de validité</li>
                <li>L'attestation d'assurance</li>
                <li>La vignette automobile à jour</li>
                <li>Le contrat de vente (à faire légaliser)</li>
              </ul>
              <p>
                Effectuez la mutation de la carte grise dans les plus brefs délais auprès de
                l'agence de la SNDP (Société Nationale de Distribution du Pétrole) ou du bureau
                régional compétent.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="card-metallic p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Prêt à trouver votre voiture ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Parcourez des milliers d'annonces de voitures d'occasion en Tunisie sur Voito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/voitures"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Voir les annonces
              </Link>
              <Link
                href="/voitures/marques"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-accent transition-colors"
              >
                Explorer par marque
              </Link>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mt-12 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Liens utiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/voitures/marques" className="text-primary hover:underline text-sm">
                Toutes les marques de voitures
              </Link>
              <Link href="/voitures/villes" className="text-primary hover:underline text-sm">
                Voitures par ville
              </Link>
              <Link href="/voitures/financement" className="text-primary hover:underline text-sm">
                Financer son achat auto
              </Link>
              <Link href="/pieces" className="text-primary hover:underline text-sm">
                Pièces détachées
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
