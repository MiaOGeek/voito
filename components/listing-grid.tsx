import ListingCard from "./listing-card";
import { AlertCircle } from "lucide-react";

interface ListingGridProps {
  listings: {
    id: string;
    title: string;
    price: number;
    year?: number | null;
    mileage?: number | null;
    fiscalPower?: number | null;
    city: string;
    brand?: { name: string } | null;
    model?: { name: string } | null;
    fuelType?: string | null;
    resolvedImageUrl?: string | null;
  }[];
}

export default function ListingGrid({ listings }: ListingGridProps) {
  if (!listings || listings.length === 0) {
    return (
      <div className="card-metallic p-12 text-center">
        <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">
          Aucune annonce trouvée
        </h3>
        <p className="text-muted-foreground">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing, index) => (
        <ListingCard key={listing.id} listing={listing} index={index} />
      ))}
    </div>
  );
}
