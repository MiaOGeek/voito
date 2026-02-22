import { AllCitiesPage } from "@/components/all-cities-page";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Pièces détachées par ville en Tunisie | Voito",
  description:
    "Trouvez des pièces détachées par ville en Tunisie. Parcourez toutes les villes disponibles sur Voito.",
  alternates: {
    canonical: "/pieces/villes",
  },
};

export default function PiecesVillesPage() {
  return <AllCitiesPage category="PIECES" />;
}
