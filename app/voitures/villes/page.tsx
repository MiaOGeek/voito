import { AllCitiesPage } from "@/components/all-cities-page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Voitures d'occasion par ville en Tunisie | Voito",
  description:
    "Trouvez des voitures d'occasion par ville en Tunisie. Parcourez toutes les villes disponibles sur Voito.",
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL || ""}/voitures/villes`,
  },
};

export default function VoituresVillesPage() {
  return <AllCitiesPage category="VOITURES" />;
}
