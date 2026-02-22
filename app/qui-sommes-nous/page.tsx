import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL, CONTACT_EMAIL, SITE_DOMAIN } from "@/lib/constants";

export const revalidate = 86400; // 24h

export const metadata = {
  title: "Qui sommes-nous ? | Voito",
  description: "Découvrez Voito, la plateforme tunisienne de petites annonces automobiles. Notre mission : faciliter la vente et l'achat de véhicules d'occasion entre particuliers en Tunisie.",
  alternates: { canonical: "/qui-sommes-nous" },
};

export default function QuiSommesNousPage() {
  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Qui sommes-nous ?", item: `${baseUrl}/qui-sommes-nous` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-primary transition-colors shrink-0">
            <Home className="h-4 w-4 mr-1" />
            Voito
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
          <span className="text-foreground font-medium">Qui sommes-nous ?</span>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          Qui sommes-<span className="text-primary">nous</span> ?
        </h1>
        <div className="card-metallic p-8 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Voito</strong> est une plateforme tunisienne
            de petites annonces automobiles fondée avec un objectif clair : simplifier
            l'achat et la vente de véhicules d'occasion entre particuliers et professionnels
            en Tunisie. Basée à Tunis, notre équipe développe et maintient une solution
            moderne, rapide et gratuite pour tous les Tunisiens souhaitant acheter ou vendre
            une voiture, une moto ou des pièces détachées.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Notre mission</h2>
          <p>
            Le marché automobile tunisien est vaste et dynamique. Chaque année, des dizaines
            de milliers de véhicules changent de propriétaire à travers les 24 gouvernorats
            du pays. Pourtant, trouver le bon véhicule au bon prix reste souvent un
            parcours difficile : annonces éparpillées, informations incomplètes, absence de
            photos de qualité et difficulté à comparer les offres.
          </p>
          <p>
            Voito répond à ce problème en centralisant les annonces automobiles sur une
            plateforme unique, organisée par catégorie (voitures, motos, pièces détachées),
            par marque, par modèle et par ville. Chaque annonce affiche le prix en dinars
            tunisiens (TND), l'année, le kilométrage, la puissance fiscale, le type de
            carburant et des photos détaillées — toutes les informations nécessaires pour
            prendre une décision éclairée.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Ce qui nous distingue</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong className="text-foreground">Publication gratuite</strong> — Déposez
              autant d'annonces que vous le souhaitez, sans frais cachés ni abonnement.
            </li>
            <li>
              <strong className="text-foreground">Couverture nationale</strong> — Des
              annonces dans toutes les villes de Tunisie : Tunis, Sfax, Sousse, Nabeul,
              Bizerte, Gabès, Kairouan, Monastir et au-delà.
            </li>
            <li>
              <strong className="text-foreground">Recherche avancée</strong> — Filtrez par
              marque, modèle, année, kilométrage, prix, ville et puissance fiscale pour
              trouver exactement ce que vous cherchez.
            </li>
            <li>
              <strong className="text-foreground">Contact direct</strong> — Messagerie
              intégrée et lien WhatsApp pour joindre les vendeurs sans intermédiaire.
            </li>
            <li>
              <strong className="text-foreground">Toutes les marques</strong> — Volkswagen,
              Peugeot, Renault, Toyota, Hyundai, Kia, BMW, Mercedes-Benz, Fiat, Citroën et
              des dizaines d'autres marques populaires en Tunisie.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4">Notre vision</h2>
          <p>
            Devenir la référence numéro 1 des petites annonces automobiles en Tunisie, en
            offrant une plateforme moderne, fiable et accessible à tous. Nous croyons que
            chaque Tunisien mérite un accès simple et transparent au marché de l'occasion,
            que ce soit pour acheter sa première voiture, vendre sa moto ou trouver une
            pièce détachée compatible.
          </p>
          <p>
            Notre équipe travaille chaque jour pour améliorer l'expérience utilisateur,
            ajouter de nouvelles fonctionnalités et élargir notre base d'annonces. Nous
            investissons dans la performance technique du site, la qualité des données et la
            sécurité des échanges entre utilisateurs.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Contactez-nous</h2>
          <p>
            Pour toute question, suggestion ou partenariat, notre équipe est à votre
            disposition. Nous répondons généralement sous 24 heures.
          </p>
          <ul className="list-none space-y-2">
            <li>
              Email :{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              Site web :{" "}
              <a href={SITE_URL} className="text-primary hover:underline">
                {SITE_DOMAIN}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
