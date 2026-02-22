import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déposer une annonce | Voito",
  description: "Déposez votre annonce auto, moto ou pièces sur Voito. Remplissez les détails de votre véhicule, ajoutez vos photos et touchez des acheteurs dans toute la Tunisie.",
  robots: { index: false, follow: true },
};

export default function DeposerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
