import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Bike, Shield, Wrench, Eye } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Guide d'achat moto d'occasion en Tunisie | Voito",
  description:
    "Conseils pour acheter une moto d'occasion en Tunisie : choix du type de moto, vérifications avant achat, équipement obligatoire, permis et assurance. Guide complet par Voito.",
  keywords:
    "guide achat moto occasion tunisie, conseils achat moto, vérification moto occasion, permis moto tunisie, assurance moto tunisie",
};

export default function GuidesMotosPage() {
  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Motos", item: `${baseUrl}/motos` },
      { "@type": "ListItem", position: 3, name: "Guide d'achat", item: `${baseUrl}/motos/guides` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Guide d'achat moto d'occasion en Tunisie",
    description: "Conseils pour bien acheter une moto d'occasion en Tunisie.",
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
            <Link href="/motos" className="hover:text-primary transition-colors">
              Motos
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Guide d'achat</span>
          </nav>

          <h1 className="text-4xl font-bold text-foreground mb-6">
            Guide d'achat <span className="text-primary">moto d'occasion</span> en Tunisie
          </h1>

          <p className="text-lg text-muted-foreground mb-10">
            Que vous soyez débutant ou motard expérimenté, acheter une moto d'occasion en
            Tunisie demande quelques précautions. Ce guide vous aide à choisir le bon deux-roues
            et à éviter les mauvaises surprises.
          </p>

          {/* Section 1 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Bike className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Choisir le bon type de moto
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                Le marché tunisien offre une grande variété de deux-roues. Votre choix dépendra
                de votre usage principal :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Scooter :</strong> Idéal pour les
                  déplacements urbains quotidiens. Pratique, économique et facile à garer dans
                  les villes tunisiennes comme Tunis, Sousse ou Sfax.
                </li>
                <li>
                  <strong className="text-foreground">Moto routière / roadster :</strong> Pour
                  les trajets plus longs et le plaisir de conduite. Bonne polyvalence
                  ville-route.
                </li>
                <li>
                  <strong className="text-foreground">Trail :</strong> Parfait pour les routes
                  tunisiennes variées, notamment les pistes du sud. Bonne garde au sol et
                  suspension confortable.
                </li>
                <li>
                  <strong className="text-foreground">Sportive :</strong> Pour les passionnés de
                  vitesse et de sensations. Vérifiez bien l'historique d'entretien et
                  d'éventuelles chutes.
                </li>
              </ul>
              <p>
                Parcourez les <Link href="/motos" className="text-primary hover:underline">annonces motos sur Voito</Link> pour
                comparer les offres dans toute la Tunisie.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Vérifications avant achat
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                <strong className="text-foreground">Cadre et fourche :</strong> Vérifiez
                l'alignement du cadre. Une moto qui a chuté peut avoir un cadre tordu. Regardez
                les embouts de guidon, les leviers et les repose-pieds pour détecter des traces
                de chute.
              </p>
              <p>
                <strong className="text-foreground">Chaîne et pignons :</strong> Une chaîne
                détendue ou des pignons usés indiquent un entretien négligé. Le remplacement
                du kit chaîne coûte entre 150 et 400 TND selon le modèle.
              </p>
              <p>
                <strong className="text-foreground">Pneus :</strong> Vérifiez l'usure et l'âge
                des pneus (date de fabrication gravée sur le flanc). Des pneus de plus de 5 ans
                doivent être remplacés même s'ils semblent en bon état.
              </p>
              <p>
                <strong className="text-foreground">Freins :</strong> Testez le freinage avant
                et arrière. Vérifiez l'épaisseur des plaquettes et l'état des disques.
              </p>
              <p>
                <strong className="text-foreground">Électricité :</strong> Testez tous les
                feux (phare, clignotants, feu stop), le klaxon et le démarreur électrique.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Permis, assurance et équipement
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                En Tunisie, le permis de catégorie A est requis pour les motos de plus de 50cc.
                Les scooters de 50cc et moins sont accessibles avec le permis B (voiture).
              </p>
              <p>
                L'assurance responsabilité civile est obligatoire. Pour une moto d'occasion,
                une assurance tous risques est recommandée, surtout la première année.
              </p>
              <p>
                <strong className="text-foreground">Équipement obligatoire :</strong> Le casque
                homologué est obligatoire en Tunisie. Investissez également dans des gants, un
                blouson renforcé et des chaussures montantes pour votre sécurité.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="h-6 w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">
                Entretien et coûts à prévoir
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground pl-9">
              <p>
                Prévoyez un budget d'entretien régulier : vidange tous les 3 000 à 6 000 km,
                remplacement des filtres, réglage de la chaîne. Les pièces détachées pour motos
                sont disponibles sur <Link href="/pieces" className="text-primary hover:underline">Voito</Link> à
                des prix compétitifs.
              </p>
              <p>
                Les marques japonaises (Honda, Yamaha, Suzuki, Kawasaki) sont les plus répandues
                en Tunisie et offrent la meilleure disponibilité de pièces et de mécaniciens
                spécialisés.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="card-metallic p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Trouvez votre moto idéale
            </h2>
            <p className="text-muted-foreground mb-6">
              Des centaines d'annonces de motos d'occasion dans toute la Tunisie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/motos"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Voir les annonces motos
              </Link>
              <Link
                href="/motos/marques"
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
              <Link href="/motos/marques" className="text-primary hover:underline text-sm">
                Toutes les marques de motos
              </Link>
              <Link href="/motos/villes" className="text-primary hover:underline text-sm">
                Motos par ville
              </Link>
              <Link href="/pieces" className="text-primary hover:underline text-sm">
                Pièces détachées moto
              </Link>
              <Link href="/voitures/guides-achat" className="text-primary hover:underline text-sm">
                Guide d'achat voiture
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
