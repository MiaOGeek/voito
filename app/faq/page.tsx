import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 86400; // 24h

export const metadata = {
  title: "Questions fréquentes (FAQ) | Voito",
  description:
    "Retrouvez les réponses aux questions les plus fréquentes sur Voito : achat et vente de voitures, motos et pièces détachées d'occasion en Tunisie.",
  alternates: { canonical: "/faq" },
};

const faqSections = [
  {
    title: "Achat",
    questions: [
      {
        q: "Comment rechercher une annonce sur Voito ?",
        a: "Utilisez la barre de recherche ou les filtres disponibles sur chaque page : catégorie, marque, modèle, ville, prix, année et kilométrage. Vous pouvez aussi parcourir les annonces par ville ou par marque depuis les pages dédiées.",
      },
      {
        q: "Comment contacter un vendeur ?",
        a: "Sur chaque annonce, vous pouvez contacter le vendeur via notre formulaire de message sécurisé ou directement par WhatsApp si son numéro est disponible.",
      },
      {
        q: "Les annonces sont-elles vérifiées ?",
        a: "Nous faisons de notre mieux pour maintenir la qualité des annonces. Cependant, nous recommandons toujours de rencontrer le vendeur en personne, de vérifier le véhicule ou la pièce et de ne jamais payer avant d'avoir vu le produit.",
      },
      {
        q: "Puis-je négocier le prix affiché ?",
        a: "Le prix affiché est fixé par le vendeur. Vous pouvez contacter le vendeur directement pour discuter du prix et convenir d'un accord.",
      },
    ],
  },
  {
    title: "Vente",
    questions: [
      {
        q: "Comment publier une annonce ?",
        a: "Créez un compte gratuit, puis cliquez sur « Déposer une annonce ». Remplissez les informations du véhicule ou de la pièce (marque, modèle, prix, description), ajoutez des photos de qualité et publiez. Votre annonce sera visible immédiatement.",
      },
      {
        q: "La publication d'annonces est-elle gratuite ?",
        a: "Oui, la publication d'annonces est entièrement gratuite sur Voito. Aucun frais caché.",
      },
      {
        q: "Combien de photos puis-je ajouter ?",
        a: "Vous pouvez ajouter plusieurs photos à votre annonce. Nous recommandons d'inclure des photos claires du véhicule sous différents angles pour attirer plus d'acheteurs.",
      },
      {
        q: "Comment modifier ou supprimer mon annonce ?",
        a: "Connectez-vous à votre compte et accédez à « Mes annonces ». Vous pourrez modifier les informations ou supprimer l'annonce à tout moment.",
      },
    ],
  },
  {
    title: "Inscription & Compte",
    questions: [
      {
        q: "Comment créer un compte ?",
        a: "Cliquez sur « Inscription » en haut de la page, remplissez vos informations (nom, email, mot de passe) et validez votre adresse email via le lien de confirmation envoyé dans votre boîte de réception.",
      },
      {
        q: "J'ai oublié mon mot de passe, que faire ?",
        a: "Contactez-nous par email à contact@voito.info pour réinitialiser votre mot de passe. Nous vous répondrons dans les plus brefs délais.",
      },
      {
        q: "Puis-je modifier mes informations personnelles ?",
        a: "Oui, accédez à « Mes informations » depuis votre compte pour mettre à jour votre nom, votre numéro de téléphone et d'autres détails.",
      },
    ],
  },
  {
    title: "Sécurité",
    questions: [
      {
        q: "Quels conseils de sécurité pour les transactions ?",
        a: "Rencontrez toujours le vendeur dans un lieu public et fréquenté. Vérifiez le véhicule ou la pièce en personne avant tout paiement. Ne versez jamais d'acompte ou de paiement avant d'avoir vu le produit. Méfiez-vous des prix anormalement bas.",
      },
      {
        q: "Comment signaler une annonce suspecte ?",
        a: "Si vous repérez une annonce frauduleuse ou suspecte, contactez notre équipe à contact@voito.info en indiquant le lien de l'annonce. Nous examinerons le signalement rapidement.",
      },
      {
        q: "Mes données personnelles sont-elles protégées ?",
        a: "Oui, nous prenons la protection de vos données très au sérieux. Consultez notre politique de confidentialité pour en savoir plus sur la collecte et l'utilisation de vos informations.",
      },
    ],
  },
  {
    title: "Contact",
    questions: [
      {
        q: "Comment contacter l'équipe Voito ?",
        a: "Envoyez-nous un email à contact@voito.info. Nous répondons généralement sous 24 heures.",
      },
      {
        q: "Voito est-il disponible en dehors de la Tunisie ?",
        a: "Voito est actuellement dédié au marché tunisien. Toutes les annonces concernent des véhicules et pièces disponibles en Tunisie, avec des prix en dinars tunisiens (TND).",
      },
    ],
  },
];

export default function FAQPage() {
  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${baseUrl}/faq` },
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
          <Link
            href="/"
            className="flex items-center hover:text-primary transition-colors shrink-0"
          >
            <Home className="h-4 w-4 mr-1" />
            Voito
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
          <span className="text-foreground font-medium">FAQ</span>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          Questions <span className="text-primary">fréquentes</span>
        </h1>

        <div className="space-y-8">
          {faqSections.map((section) => (
            <div key={section.title} className="card-metallic p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {section.title}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${section.title}-${index}`}
                  >
                    <AccordionTrigger className="text-foreground text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
