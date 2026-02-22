"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  UserCircle,
  Home,
  ChevronRight,
  Save,
  Upload,
  X,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import DashboardSidebar from "@/components/dashboard-sidebar";

export default function MesInformationsPage() {
  const { data: session, status, update: updateSession } = useSession() || {};
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/connexion");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();

      if (data.user) {
        setName(data.user.name || "");
        setPhone(data.user.phone || "");
        setImage(data.user.image || "");
        setEmail(data.user.email || "");
        setEmailVerified(data.user.emailVerified);
        setCreatedAt(data.user.createdAt);
      }
    } catch (error) {
      toast.error("Erreur lors du chargement du profil");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas depasser 5MB");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload/presigned", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur lors de l'upload");

      const { url } = await res.json();
      setImage(url);
      toast.success("Photo mise a jour");
    } catch (error) {
      toast.error("Erreur lors de l'upload de l'image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length < 2) {
      toast.error("Le nom doit contenir au moins 2 caracteres");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), image }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la sauvegarde");
      }

      // Update the NextAuth session with new data
      await updateSession({ name: name.trim(), image });

      toast.success("Informations mises a jour avec succes");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
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
          <span className="text-foreground font-medium">Mes informations</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <DashboardSidebar />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <UserCircle className="h-7 w-7 mr-3 text-primary" />
                Mes <span className="text-primary ml-2">informations</span>
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Gerez votre profil public et vos coordonnees
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo de profil */}
              <div className="card-metallic p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Photo de profil</h2>
                <div className="flex items-center gap-6">
                  <div className="relative h-24 w-24 shrink-0">
                    {image ? (
                      <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary/30">
                        <Image
                          src={image}
                          alt="Photo de profil"
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                        <button
                          type="button"
                          onClick={() => setImage("")}
                          className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center">
                        <UserCircle className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="btn-outline text-sm"
                    >
                      <Upload className="inline h-4 w-4 mr-1" />
                      {uploading ? "Upload..." : "Changer la photo"}
                    </button>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG ou WebP. Max 5MB.
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Informations personnelles */}
              <div className="card-metallic p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Informations personnelles</h2>
                <div className="space-y-4">
                  {/* Nom */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Nom affiche publiquement *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                      className="input-industrial w-full"
                      required
                      minLength={2}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Ce nom sera visible sur vos annonces
                    </p>
                  </div>

                  {/* Telephone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Telephone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+216 XX XXX XXX"
                      className="input-industrial w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Email (lecture seule) */}
              <div className="card-metallic p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Adresse email</h2>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{email}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {emailVerified ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-500">Email verifie</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <span className="text-xs text-amber-500">Email non verifie</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info compte */}
              <div className="card-metallic p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Informations du compte</h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="h-5 w-5 shrink-0" />
                  <span>
                    Membre depuis le{" "}
                    <span className="text-foreground font-medium">
                      {createdAt
                        ? new Date(createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "—"}
                    </span>
                  </span>
                </div>
              </div>

              {/* Bouton sauvegarder */}
              <div className="flex justify-end">
                <button type="submit" disabled={saving} className="btn-primary">
                  <Save className="inline h-4 w-4 mr-2" />
                  {saving ? "Sauvegarde..." : "Sauvegarder les modifications"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
