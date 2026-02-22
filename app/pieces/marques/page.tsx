import { AllBrandsPage } from "@/components/all-brands-page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Toutes les marques de pièces détachées en Tunisie | Voito",
  description:
    "Parcourez toutes les marques de pièces détachées disponibles sur Voito. Trouvez des pièces par marque en Tunisie.",
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL || ""}/pieces/marques`,
  },
};

export default function PiecesMarquesPage() {
  return <AllBrandsPage category="PIECES" />;
}
