import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publier une annonce | Voito",
  description: "Publiez gratuitement votre annonce de voiture, moto ou pièces détachées d'occasion sur Voito. Photos illimitées, contact sécurisé, zéro commission.",
  robots: { index: false, follow: true },
};

export default function PublierLayout({ children }: { children: React.ReactNode }) {
  return children;
}
