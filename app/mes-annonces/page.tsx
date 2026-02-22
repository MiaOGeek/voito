"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Edit, Trash2, Eye, PlusCircle, Home, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import ListingCard from "@/components/listing-card";
import DashboardSidebar from "@/components/dashboard-sidebar";

export default function MesAnnoncesPage() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  interface UserListing {
    id: string;
    title: string;
    price: number;
    year?: number | null;
    mileage?: number | null;
    fiscalPower?: number | null;
    city: string;
    images: string[];
    status: string;
    userId: string;
    brand?: { name: string } | null;
    model?: { name: string } | null;
    fuelType?: string | null;
    resolvedImageUrl?: string | null;
  }
  const [listings, setListings] = useState<UserListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/connexion");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchListings();
    }
  }, [session]);

  const fetchListings = async () => {
    try {
      const response = await fetch("/api/listings");
      const data = await response.json();
      
      // Filter to only show current user's listings
      const userListings = data.listings?.filter(
        (listing: UserListing) => listing.userId === session?.user?.id
      );
      setListings(userListings || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      toast.success("Annonce supprimée avec succès");
      fetchListings();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression");
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      toast.success("Statut mis à jour");
      fetchListings();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-primary transition-colors shrink-0">
            <Home className="h-4 w-4 mr-1" />
            Voito
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
          <span className="text-foreground font-medium">Mes annonces</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <DashboardSidebar listingsCount={listings.length} />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center">
                  <FileText className="h-7 w-7 mr-3 text-primary" />
                  Mes <span className="text-primary ml-2">annonces</span>
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Gerez vos annonces publiees
                </p>
              </div>
              <Link href="/deposer" className="btn-primary">
                <PlusCircle className="inline h-4 w-4 mr-2" />
                Nouvelle annonce
              </Link>
            </div>

            {listings.length === 0 ? (
              <div className="card-metallic p-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Aucune annonce
                </h3>
                <p className="text-muted-foreground mb-6">
                  Vous n'avez pas encore depose d'annonce
                </p>
                <Link href="/deposer" className="btn-primary inline-block">
                  <PlusCircle className="inline h-4 w-4 mr-2" />
                  Deposer une annonce
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="card-metallic p-5">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-3">
                        <ListingCard listing={listing} />
                      </div>
                      <div className="flex md:flex-col gap-2">
                        <Link
                          href={`/annonces/${listing.id}`}
                          className="btn-outline flex-1 md:flex-none text-center text-sm"
                        >
                          <Eye className="inline h-4 w-4 mr-1" />
                          Voir
                        </Link>
                        <button
                          onClick={() => toggleStatus(listing.id, listing.status)}
                          className={`flex-1 md:flex-none text-sm px-3 py-2 rounded-md font-medium transition-colors ${
                            listing.status === "ACTIVE"
                              ? "bg-green-500/10 text-green-500 border border-green-500/20"
                              : "bg-muted text-muted-foreground border border-border"
                          }`}
                        >
                          {listing.status === "ACTIVE" ? "Actif" : "Inactif"}
                        </button>
                        <button
                          onClick={() => handleDelete(listing.id)}
                          className="flex-1 md:flex-none text-sm px-3 py-2 rounded-md font-medium bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors"
                        >
                          <Trash2 className="inline h-4 w-4 mr-1" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
