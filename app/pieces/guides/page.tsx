import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Wrench, Search, ShieldCheck, PackageCheck } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Guide pièces détachées automobiles en Tunisie | Voito",
  description:
    "Comment trouver et acheter des pièces détachées pour voiture et moto en Tunisie : pièces d'origine vs adaptables, où chercher, vérifications et conseils pour économiser.",
  keywords:
    "pièces détachées tunisie, pièces auto occasion tunisie, pièces origine vs adaptable, acheter pièces voiture tunisie",
};

export default function GuidesPiecesPage() {
  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Pièces", item: `${baseUrl}/pieces` },
      { "@type": "ListItem", position: 3, name: "Guide", item: `${baseUrl}/pieces/guides` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Guide des pièces détachées automobiles en Tunisie",
    description: "Conseils pour trouver et acheter des pièces détachées en Tunisie.",
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
            <Link href="/pieces" className="hover:text-primary transition-colors">
              Pièces
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Guide</span>
          </nav>

          <h1 className="text-4xl font-bold text-foreground mb-6">
            Guide des <span className="text-primary">pièces détachées</span> en Tunisie
          </h1>

          <p className="text-lg text-muted-foreground mb-10">
            Trouver la bonne pièce au bon prix pour sa voiture ou sa moto en Tunisie n'est pas
            toujours simple. Ce guide vous aide à vous y retrouver entre pièces d'origine,
            adaptables et occasion.
          </p>

          {/* Section 1 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <PackageCheck className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Pièces d'origine, adaptables ou occasion ?
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                <strong className="text-foreground">Pièces d'origine (OEM) :</strong> Fabriquées
                par le constructeur ou son sous-traitant. Qualité garantie, compatibilité
                parfaite, mais prix plus élevé. Disponibles chez les concessionnaires officiels
                en Tunisie.
              </p>
              <p>
                <strong className="text-foreground">Pièces adaptables (aftermarket) :</strong>{" "}
                Fabriquées par des équipementiers indépendants. Qualité variable selon la marque
                — certaines sont d'excellente qualité (Bosch, Valeo, TRW), d'autres moins
                fiables. Prix 30 à 50% inférieurs aux pièces d'origine.
              </p>
              <p>
                <strong className="text-foreground">Pièces d'occasion :</strong> Récupérées sur
                des véhicules en fin de vie ou accidentés. Le meilleur rapport qualité-prix pour
                les pièces peu sujettes à l'usure : carrosserie, optiques, rétroviseurs, garnitures
                intérieures, calculateurs. Trouvez-les sur{" "}
                <Link href="/pieces" className="text-primary hover:underline">Voito</Link>.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Comment trouver la bonne pièce
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                Pour identifier précisément la pièce dont vous avez besoin, munissez-vous de :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>La marque, le modèle et l'année de votre véhicule</li>
                <li>Le numéro de châssis (VIN) — 17 caractères, visible sur la carte grise</li>
                <li>La référence de la pièce (inscrite sur la pièce usagée elle-même)</li>
                <li>Des photos de la pièce à remplacer</li>
              </ul>
              <p>
                Sur Voito, utilisez la recherche par <Link href="/pieces/marques" className="text-primary hover:underline">marque</Link> pour
                trouver des pièces compatibles avec votre véhicule. Vous pouvez aussi filtrer
                par <Link href="/pieces/villes" className="text-primary hover:underline">ville</Link> pour
                trouver un vendeur près de chez vous.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Vérifier avant d'acheter
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                <strong className="text-foreground">Compatibilité :</strong> Vérifiez toujours
                la référence exacte de la pièce. Deux voitures du même modèle peuvent avoir des
                pièces différentes selon l'année de fabrication ou la motorisation.
              </p>
              <p>
                <strong className="text-foreground">État de la pièce d'occasion :</strong>{" "}
                Demandez des photos détaillées. Pour les pièces mécaniques, renseignez-vous sur
                le kilométrage du véhicule d'origine. Évitez les pièces de sécurité usagées
                (disques de frein, amortisseurs) sauf si l'usure est minimale.
              </p>
              <p>
                <strong className="text-foreground">Contrefaçons :</strong> Méfiez-vous des
                pièces neuves à prix anormalement bas. Les contrefaçons sont courantes,
                notamment pour les filtres, plaquettes de frein et ampoules. Privilégiez les
                vendeurs de confiance et les marques reconnues.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Les pièces les plus recherchées
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                En Tunisie, les pièces les plus demandées sont liées aux marques les plus
                répandues : Peugeot, Renault, Volkswagen, Toyota et Hyundai. Voici les
                catégories de pièces les plus recherchées :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">Freinage :</strong> plaquettes, disques, étriers</li>
                <li><strong className="text-foreground">Suspension :</strong> amortisseurs, rotules, bras de suspension</li>
                <li><strong className="text-foreground">Moteur :</strong> filtres, courroies, pompes à eau, joints</li>
                <li><strong className="text-foreground">Carrosserie :</strong> pare-chocs, ailes, capots, rétroviseurs</li>
                <li><strong className="text-foreground">Éclairage :</strong> phares, feux arrière, ampoules LED</li>
                <li><strong className="text-foreground">Climatisation :</strong> compresseurs, condenseurs, filtres d'habitacle</li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="card-metallic p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Trouvez votre pièce
            </h2>
            <p className="text-muted-foreground mb-6">
              Des milliers de pièces détachées neuves et d'occasion sur Voito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pieces"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Voir les pièces
              </Link>
              <Link
                href="/deposer"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-accent transition-colors"
              >
                Vendre des pièces
              </Link>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mt-12 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Liens utiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/pieces/marques" className="text-primary hover:underline text-sm">
                Pièces par marque
              </Link>
              <Link href="/pieces/villes" className="text-primary hover:underline text-sm">
                Pièces par ville
              </Link>
              <Link href="/voitures/guides-achat" className="text-primary hover:underline text-sm">
                Guide d'achat voiture
              </Link>
              <Link href="/motos/guides" className="text-primary hover:underline text-sm">
                Guide d'achat moto
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
