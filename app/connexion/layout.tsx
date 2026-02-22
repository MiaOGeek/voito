import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | Voito",
  description: "Connectez-vous à votre compte Voito pour gérer vos annonces de véhicules d'occasion, contacter des vendeurs et publier de nouvelles offres en Tunisie.",
  robots: { index: false, follow: true },
};

export default function ConnexionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
