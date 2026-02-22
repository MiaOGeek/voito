import Image from "next/image";
import Link from "next/link";
import { Calendar, Gauge, MapPin, Fuel } from "lucide-react";

interface ListingCardProps {
  listing: {
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
  };
  index?: number;
}

export default function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const imageUrl = listing.resolvedImageUrl ?? null;

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/annonces/${listing.id}`}>
        <div className="card-metallic group cursor-pointer">
          <div className="relative aspect-video bg-muted overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${listing.title}${listing.brand ? ` ${listing.brand.name}` : ""}${listing.model ? ` ${listing.model.name}` : ""} - ${listing.city}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Gauge className="h-16 w-16 text-muted-foreground opacity-20" />
              </div>
            )}
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-bold">
              {listing.price.toLocaleString()} TND
            </div>
          </div>

          <div className="p-4 space-y-3">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {listing.title}
            </h3>

            {(listing.brand || listing.model) && (
              <p className="text-muted-foreground text-sm">
                {listing.brand?.name ?? ""} {listing.model?.name ?? ""}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {listing.year && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-secondary" />
                  {listing.year}
                </div>
              )}
              {listing.mileage && (
                <div className="flex items-center">
                  <Gauge className="h-4 w-4 mr-1 text-secondary" />
                  {listing.mileage.toLocaleString()} km
                </div>
              )}
              {listing.fiscalPower && (
                <div className="flex items-center">
                  <Fuel className="h-4 w-4 mr-1 text-secondary" />
                  {listing.fiscalPower} CV
                </div>
              )}
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-secondary" />
                {listing.city}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
