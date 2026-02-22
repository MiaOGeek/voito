import { AllBrandsPage } from "@/components/all-brands-page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Toutes les marques de voitures en Tunisie | Voito",
  description:
    "Parcourez toutes les marques de voitures disponibles sur Voito. Trouvez des voitures d'occasion par marque en Tunisie.",
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL || ""}/voitures/marques`,
  },
};

export default function VoituresMarquesPage() {
  return <AllBrandsPage category="VOITURES" />;
}
