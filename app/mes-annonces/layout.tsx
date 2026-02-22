import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes annonces | Voito",
  description: "Gérez vos annonces de véhicules d'occasion sur Voito. Modifiez, renouvelez ou supprimez vos offres depuis votre espace personnel.",
  robots: { index: false, follow: false },
};

export default function MesAnnoncesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
