import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Landmark, Calculator, FileText, AlertCircle } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Crédit auto en Tunisie - Financer sa voiture d'occasion | Voito",
  description:
    "Comment financer l'achat d'une voiture d'occasion en Tunisie : crédit auto bancaire, leasing, conditions, taux d'intérêt et conseils pour obtenir le meilleur financement.",
  keywords:
    "crédit auto tunisie, financement voiture occasion, leasing auto tunisie, prêt voiture tunisie, taux crédit auto",
};

export default function FinancementPage() {
  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Voitures", item: `${baseUrl}/voitures` },
      { "@type": "ListItem", position: 3, name: "Financement", item: `${baseUrl}/voitures/financement` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Crédit auto en Tunisie : financer sa voiture d'occasion",
    description: "Guide complet sur le financement automobile en Tunisie.",
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
            <span className="text-foreground font-medium">Financement</span>
          </nav>

          <h1 className="text-4xl font-bold text-foreground mb-6">
            <span className="text-primary">Crédit auto</span> en Tunisie
          </h1>

          <p className="text-lg text-muted-foreground mb-10">
            Financer l'achat d'une voiture d'occasion en Tunisie est accessible grâce aux
            différentes solutions proposées par les banques et établissements financiers.
            Voici tout ce que vous devez savoir pour obtenir le meilleur financement.
          </p>

          {/* Section 1 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Landmark className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Les types de financement auto
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                <strong className="text-foreground">Crédit auto classique :</strong> Le prêt
                bancaire est la solution la plus courante. La banque finance une partie du prix
                du véhicule (généralement 60 à 80%) et vous remboursez en mensualités sur une
                durée de 2 à 7 ans.
              </p>
              <p>
                <strong className="text-foreground">Leasing (Ijara) :</strong> L'établissement
                financier achète le véhicule et vous le loue avec option d'achat en fin de
                contrat. Solution populaire en Tunisie car elle peut offrir des avantages
                fiscaux pour les professionnels.
              </p>
              <p>
                <strong className="text-foreground">Crédit personnel :</strong> Un prêt non
                affecté que vous pouvez utiliser pour acheter un véhicule. Les taux sont
                généralement plus élevés mais la procédure est plus simple.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Conditions et taux d'intérêt
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                Les taux d'intérêt pour un crédit auto en Tunisie varient selon la banque, la
                durée du prêt et votre profil emprunteur. En général, comptez un taux compris
                entre le TMM (Taux du Marché Monétaire) + 3% et TMM + 5%.
              </p>
              <p>
                <strong className="text-foreground">Conditions habituelles :</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Être résident tunisien avec un revenu régulier</li>
                <li>Apport personnel de 20 à 40% du prix du véhicule</li>
                <li>Âge du véhicule : généralement moins de 5-7 ans pour l'occasion</li>
                <li>Durée de remboursement : 24 à 84 mois</li>
                <li>Assurance tous risques obligatoire pendant la durée du crédit</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Dossier à préparer
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>Pour constituer votre dossier de crédit auto, préparez :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Copie de la CIN (Carte d'Identité Nationale)</li>
                <li>3 dernières fiches de paie ou attestation de revenu</li>
                <li>3 derniers relevés bancaires</li>
                <li>Facture proforma ou devis du véhicule</li>
                <li>Carte grise du véhicule (pour l'occasion)</li>
                <li>Certificat de visite technique récent</li>
              </ul>
              <p>
                Comparez les offres de plusieurs banques avant de vous engager. Les conditions
                peuvent varier significativement d'un établissement à l'autre.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Conseils pour un bon financement
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                <strong className="text-foreground">Maximisez votre apport :</strong> Plus
                votre apport est élevé, plus votre taux sera avantageux et vos mensualités
                légères.
              </p>
              <p>
                <strong className="text-foreground">Choisissez la bonne durée :</strong> Une
                durée courte réduit le coût total du crédit, mais augmente les mensualités.
                Trouvez le bon équilibre selon votre capacité de remboursement.
              </p>
              <p>
                <strong className="text-foreground">Négociez l'assurance :</strong> L'assurance
                crédit est souvent négociable. Demandez des devis à plusieurs assureurs avant
                d'accepter celle proposée par la banque.
              </p>
              <p>
                <strong className="text-foreground">Vérifiez les frais cachés :</strong> Frais
                de dossier, frais de garantie, pénalités de remboursement anticipé — lisez
                attentivement toutes les conditions avant de signer.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="card-metallic p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Trouvez votre future voiture
            </h2>
            <p className="text-muted-foreground mb-6">
              Parcourez les annonces sur Voito et trouvez le véhicule qui correspond à votre budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/voitures"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Voir les annonces
              </Link>
              <Link
                href="/voitures/guides-achat"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-accent transition-colors"
              >
                Guide d'achat
              </Link>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mt-12 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Liens utiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/voitures/guides-achat" className="text-primary hover:underline text-sm">
                Guide d'achat voiture
              </Link>
              <Link href="/voitures/marques" className="text-primary hover:underline text-sm">
                Toutes les marques
              </Link>
              <Link href="/voitures/villes" className="text-primary hover:underline text-sm">
                Voitures par ville
              </Link>
              <Link href="/deposer" className="text-primary hover:underline text-sm">
                Déposer une annonce
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
