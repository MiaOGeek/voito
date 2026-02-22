import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription | Voito",
  description: "Créez votre compte Voito gratuitement et commencez à publier vos annonces de voitures, motos et pièces détachées d'occasion en Tunisie.",
  robots: { index: false, follow: true },
};

export default function InscriptionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
