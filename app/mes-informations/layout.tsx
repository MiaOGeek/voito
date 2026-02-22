import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes informations | Voito",
  description: "Modifiez vos informations personnelles, votre mot de passe et vos préférences sur votre compte Voito.",
  robots: { index: false, follow: false },
};

export default function MesInformationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
