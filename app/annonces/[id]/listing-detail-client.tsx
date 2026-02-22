"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Gauge, MapPin, Fuel, Car as CarIcon, ChevronRight, Home, MessageCircle, Shield, AlertTriangle, Copy, Zap, Facebook } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import ListingGrid from "@/components/listing-grid";
import { getFileUrl } from "@/lib/s3";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";

interface ListingData {
  id: string;
  title: string;
  description: string;
  price: number;
  year?: number | null;
  mileage?: number | null;
  fiscalPower?: number | null;
  fuelType?: string | null;
  transmission?: string | null;
  city: string;
  category: string;
  images: string[];
  userId: string;
  brand?: { name: string; slug: string } | null;
  model?: { name: string } | null;
  user?: { name?: string | null; phone?: string | null; createdAt?: string | null } | null;
}

interface SimilarListing {
  id: string;
  title: string;
  price: number;
  year?: number | null;
  mileage?: number | null;
  fiscalPower?: number | null;
  city: string;
  images: string[];
  brand?: { name: string } | null;
  model?: { name: string } | null;
  fuelType?: string | null;
  resolvedImageUrl?: string | null;
}

interface ListingDetailClientProps {
  listing: ListingData;
  similarListings?: SimilarListing[];
  serverImageUrls?: string[];
}

export default function ListingDetailClient({ listing, similarListings = [], serverImageUrls = [] }: ListingDetailClientProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>(serverImageUrls);
  const [showContactForm, setShowContactForm] = useState(false);

  // Fallback: only fetch client-side if server didn't provide URLs
  useEffect(() => {
    if (imageUrls.length === 0 && listing.images && listing.images.length > 0) {
      Promise.all(listing.images.map((path: string) => getFileUrl(path, true)))
        .then((urls) => setImageUrls(urls))
        .catch((error) => console.error("Error loading images:", error));
    }
  }, [listing.images, imageUrls.length]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm text-muted-foreground overflow-x-auto">
          <Link href="/" className="flex items-center hover:text-primary transition-colors shrink-0">
            <Home className="h-4 w-4 mr-1" />
            Voito
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
          <Link
            href={`/${listing.category === "VOITURES" ? "voitures" : listing.category === "MOTOS" ? "motos" : "pieces"}`}
            className="hover:text-primary transition-colors shrink-0"
          >
            {listing.category === "VOITURES" ? "Voitures" : listing.category === "MOTOS" ? "Motos" : "Pièces"}
          </Link>
          {listing.brand && (
            <>
              <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
              <Link
                href={`/${listing.category === "VOITURES" ? "voitures" : listing.category === "MOTOS" ? "motos" : "pieces"}/${listing.brand.slug}`}
                className="hover:text-primary transition-colors shrink-0"
              >
                {listing.brand.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
          <span className="text-foreground font-medium truncate">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="card-metallic overflow-hidden">
              <div className="relative aspect-video bg-muted">
                {imageUrls.length > 0 ? (
                  <Image
                    src={imageUrls[currentImageIndex]}
                    alt={`${listing.title}${listing.brand ? ` ${listing.brand.name}` : ""}${listing.model ? ` ${listing.model.name}` : ""} - Photo ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CarIcon className="h-24 w-24 text-muted-foreground opacity-20" />
                  </div>
                )}
              </div>
              {imageUrls.length > 1 && (
                <div className="p-4 grid grid-cols-6 gap-2">
                  {imageUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Voir la photo ${index + 1}`}
                      className={`relative aspect-video rounded-md overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={url}
                        alt={`${listing.title} - Photo ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="card-metallic p-6 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {listing.title}
                </h1>
                {(listing.brand || listing.model) && (
                  <p className="text-xl text-muted-foreground">
                    {listing.brand?.name ?? ""} {listing.model?.name ?? ""}
                  </p>
                )}
              </div>

              <div className="text-4xl font-bold text-primary">
                {listing.price.toLocaleString()} TND
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border">
                {listing.year && (
                  <div>
                    <Calendar className="h-5 w-5 text-secondary mb-1" />
                    <p className="text-sm text-muted-foreground">Année</p>
                    <p className="font-semibold text-foreground">{listing.year}</p>
                  </div>
                )}
                {listing.mileage && (
                  <div>
                    <Gauge className="h-5 w-5 text-secondary mb-1" />
                    <p className="text-sm text-muted-foreground">Kilométrage</p>
                    <p className="font-semibold text-foreground">
                      {listing.mileage.toLocaleString()} km
                    </p>
                  </div>
                )}
                {listing.fiscalPower && (
                  <div>
                    <Fuel className="h-5 w-5 text-secondary mb-1" />
                    <p className="text-sm text-muted-foreground">Puissance</p>
                    <p className="font-semibold text-foreground">{listing.fiscalPower} CV</p>
                  </div>
                )}
                <div>
                  <MapPin className="h-5 w-5 text-secondary mb-1" />
                  <p className="text-sm text-muted-foreground">Ville</p>
                  <Link
                    href={`/${listing.category === "VOITURES" ? "voitures" : listing.category === "MOTOS" ? "motos" : "pieces"}?city=${listing.city}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {listing.city}
                  </Link>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {listing.description}
                </p>
                {listing.city && (() => {
                  const catPath = listing.category === "VOITURES" ? "voitures" : listing.category === "MOTOS" ? "motos" : "pieces";
                  const catLabel = listing.category === "VOITURES" ? "voitures" : listing.category === "MOTOS" ? "motos" : "pièces détachées";
                  const cityHref = `/${catPath}/ville/${slugify(listing.city)}`;
                  const cityLink = <Link href={cityHref} className="text-primary hover:underline">{catLabel} d'occasion à {listing.city}</Link>;

                  const variants = [
                    <>Découvrez d'autres annonces de {cityLink} sur Voito.</>,
                    <>Retrouvez toutes nos annonces de {cityLink} disponibles.</>,
                    <>Parcourez notre sélection de {cityLink} sur notre plateforme.</>,
                    <>Explorez les offres de {cityLink} publiées récemment.</>,
                    <>Vous cherchez d'autres {cityLink} ? Consultez nos annonces.</>,
                  ];

                  // Stable pick based on listing id
                  const hash = listing.id.split("").reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
                  const variant = variants[hash % variants.length];

                  return <p className="text-muted-foreground mt-4">{variant}</p>;
                })()}
              </div>

              {listing.fuelType && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Type de carburant</h3>
                  <p className="text-muted-foreground">{listing.fuelType}</p>
                </div>
              )}

              {listing.transmission && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Transmission</h3>
                  <p className="text-muted-foreground">{listing.transmission}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Seller Profile */}
            <div className="card-metallic p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                  {(listing.user?.name ?? "A").charAt(0).toUpperCase()}
                </div>
                <div>
                  <Link
                    href={`/vendeurs/${listing.userId}`}
                    className="text-foreground font-semibold hover:text-primary transition-colors"
                  >
                    {listing.user?.name ?? "Anonyme"}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Membre depuis{" "}
                    {listing.user?.createdAt
                      ? new Date(listing.user.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
                      : "récemment"}
                  </p>
                  <Link
                    href={`/vendeurs/${listing.userId}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Voir toutes ses annonces
                  </Link>
                </div>
              </div>

              {/* WhatsApp Button */}
              {listing.user?.phone && (
                <a
                  href={`https://wa.me/${listing.user.phone.replace(/[\s\-\(\)]/g, "")}?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par votre annonce : ${listing.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium transition-colors mb-3"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Contacter sur WhatsApp
                </a>
              )}

              {/* Message Button */}
              <button
                onClick={() => setShowContactForm(!showContactForm)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-md border border-[#333] text-foreground hover:border-primary hover:text-primary font-medium transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Envoyer un message
              </button>

              {/* Contact Form (toggle) */}
              {showContactForm && (
                <div className="mt-4 pt-4 border-t border-[#333]">
                  <ContactForm listingId={listing.id} />
                </div>
              )}
            </div>

            {/* Security Tips */}
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-500" />
                Conseils de sécurité
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">·</span>
                  Rencontrez le vendeur dans un lieu public
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">·</span>
                  Vérifiez le produit avant de payer
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">·</span>
                  Ne payez jamais d'avance
                </li>
              </ul>
            </div>

            {/* Share */}
            <div className="card-metallic p-5">
              <h3 className="font-semibold text-foreground mb-3">Partager</h3>
              <div className="flex items-center gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#1877F2] transition-colors"
                  title="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(listing.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="X (Twitter)"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent((typeof window !== "undefined" ? window.location.href : "") + " - " + listing.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#25D366] transition-colors"
                  title="WhatsApp"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Lien copié !");
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="Copier le lien"
                >
                  <Copy className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Report & Response */}
            <div className="flex flex-col items-center gap-3 text-sm">
              <button
                onClick={() => toast.info("Fonctionnalité bientôt disponible")}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors"
              >
                <AlertTriangle className="h-4 w-4" />
                Signaler un abus
              </button>
              <p className="flex items-center gap-1.5 text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                Répond généralement en quelques heures
              </p>
            </div>
          </div>
        </div>
      {similarListings.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Annonces similaires
            </h2>
            <ListingGrid listings={similarListings} />
          </div>
        )}
      </div>
    </div>
  );
}
