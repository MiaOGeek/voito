import { AllBrandsPage } from "@/components/all-brands-page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Toutes les marques de motos en Tunisie | Voito",
  description:
    "Parcourez toutes les marques de motos disponibles sur Voito. Trouvez des motos d'occasion par marque en Tunisie.",
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL || ""}/motos/marques`,
  },
};

export default function MotosMarquesPage() {
  return <AllBrandsPage category="MOTOS" />;
}
