import { AllCitiesPage } from "@/components/all-cities-page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Motos d'occasion par ville en Tunisie | Voito",
  description:
    "Trouvez des motos d'occasion par ville en Tunisie. Parcourez toutes les villes disponibles sur Voito.",
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL || ""}/motos/villes`,
  },
};

export default function MotosVillesPage() {
  return <AllCitiesPage category="MOTOS" />;
}
