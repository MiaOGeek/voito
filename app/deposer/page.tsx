"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PlusCircle, Car as CarIcon, Mail, AlertCircle } from "lucide-react";
import ImageUpload from "@/components/image-upload";
import { toast } from "sonner";

interface Brand {
  id: string;
  name: string;
  models: { id: string; name: string }[];
}

const tunisianCities = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
  "Béja", "Jendouba", "Kef", "Siliana", "Sousse", "Monastir", "Mahdia",
  "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabès", "Médenine",
  "Tataouine", "Gafsa", "Tozeur", "Kébili",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

export default function DeposerPage() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "VOITURES",
    price: "",
    year: "",
    mileage: "",
    fiscalPower: "",
    fuelType: "",
    transmission: "",
    city: "",
    brandId: "",
    modelId: "",
  });

  // Vérification authentification
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/publier");
    }
  }, [status, router]);

  // Vérification email
  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user/check-email-verified`)
        .then((res) => res.json())
        .then((data) => {
          setEmailVerified(data.verified);
        })
        .catch(() => {
          setEmailVerified(false);
        });
    }
  }, [session]);

  // Charger les marques selon la catégorie
  useEffect(() => {
    const url = formData.category
      ? `/api/brands?category=${formData.category}`
      : "/api/brands";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
        setFormData((prev) => ({ ...prev, brandId: "", modelId: "" }));
        setModels([]);
      })
      .catch((err) => console.error("Erreur chargement marques:", err));
  }, [formData.category]);

  // Charger les modèles selon la marque
  useEffect(() => {
    if (formData.brandId) {
      const brand = brands.find((b) => b.id === formData.brandId);
      setModels(brand?.models || []);
      setFormData((prev) => ({ ...prev, modelId: "" }));
    } else {
      setModels([]);
    }
  }, [formData.brandId, brands]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailVerified) {
      toast.error("Veuillez vérifier votre email avant de publier.");
      return;
    }

    if (images.length === 0) {
      toast.error("Veuillez ajouter au moins une photo.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        year: formData.year ? parseInt(formData.year) : null,
        mileage: formData.mileage ? parseInt(formData.mileage) : null,
        fiscalPower: formData.fiscalPower ? parseInt(formData.fiscalPower) : null,
        images,
      };

      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la création");
      }

      const data = await response.json();
      toast.success("Annonce publiée avec succès !");
      router.push(`/annonces/${data.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la publication");
    } finally {
      setLoading(false);
    }
  };

  // Si pas authentifié, ne rien afficher (redirection en cours)
  if (status === "loading" || status === "unauthenticated") {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  // Si email non vérifié, afficher page de blocage
  if (emailVerified === false) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 metallic-bg">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Mail className="h-24 w-24 text-primary" />
              <AlertCircle className="h-12 w-12 text-destructive absolute -bottom-2 -right-2" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground">
            Vérifiez votre <span className="text-primary">email</span>
          </h1>

          <div className="card-metallic p-8 space-y-4">
            <p className="text-lg text-muted-foreground">
              Pour publier une annonce, vous devez d'abord confirmer votre adresse email.
            </p>
            <p className="text-muted-foreground">
              Un email de vérification a été envoyé à{" "}
              <span className="font-semibold text-foreground">{session?.user?.email}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Cliquez sur le lien dans l'email pour activer votre compte.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => router.refresh()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              J'ai vérifié mon email
            </button>
            <button
              onClick={async () => {
                try {
                  const res = await fetch("/api/auth/resend-verification", { method: "POST" });
                  const data = await res.json();
                  if (data.success) {
                    toast.success("Email de vérification renvoyé !");
                  } else {
                    toast.error(data.error || "Erreur lors de l'envoi");
                  }
                } catch {
                  toast.error("Erreur lors de l'envoi");
                }
              }}
              className="px-6 py-3 border border-border text-foreground rounded-md hover:bg-muted transition-colors font-medium"
            >
              Renvoyer l'email
            </button>
          </div>

          <div className="pt-4">
            <button
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              ← Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Si email vérifié ou en cours de vérification, afficher le formulaire
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Publier une <span className="text-primary">annonce</span>
          </h1>
          <p className="text-muted-foreground">
            Remplissez les détails de votre véhicule ou pièce détachée
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-metallic p-8 space-y-6">
          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Catégorie *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-industrial"
            >
              <option value="VOITURES">Voitures</option>
              <option value="MOTOS">Motos</option>
              <option value="PIECES">Pièces détachées</option>
            </select>
          </div>

          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titre de l'annonce *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Renault Clio 2019 - Excellent état"
              className="input-industrial"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez votre véhicule ou pièce en détail..."
              className="input-industrial"
            />
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Prix (TND) *
            </label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="25000"
              className="input-industrial"
            />
          </div>

          {/* Marque et Modèle */}
          {formData.category !== "PIECES" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Marque *
                </label>
                <select
                  required
                  value={formData.brandId}
                  onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                  className="input-industrial"
                >
                  <option value="">Sélectionnez une marque</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Modèle *
                </label>
                <select
                  required
                  value={formData.modelId}
                  onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
                  disabled={!formData.brandId}
                  className="input-industrial"
                >
                  <option value="">Sélectionnez un modèle</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Année, Kilométrage, Puissance fiscale */}
          {formData.category !== "PIECES" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Année</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="input-industrial"
                >
                  <option value="">Année</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Kilométrage
                </label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  placeholder="120000"
                  className="input-industrial"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Puissance fiscale (CV)
                </label>
                <input
                  type="number"
                  value={formData.fiscalPower}
                  onChange={(e) => setFormData({ ...formData, fiscalPower: e.target.value })}
                  placeholder="7"
                  className="input-industrial"
                />
              </div>
            </div>
          )}

          {/* Carburant et Transmission */}
          {formData.category !== "PIECES" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Carburant
                </label>
                <select
                  value={formData.fuelType}
                  onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                  className="input-industrial"
                >
                  <option value="">Sélectionnez</option>
                  <option value="ESSENCE">Essence</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="HYBRIDE">Hybride</option>
                  <option value="ELECTRIQUE">Électrique</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Transmission
                </label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                  className="input-industrial"
                >
                  <option value="">Sélectionnez</option>
                  <option value="MANUELLE">Manuelle</option>
                  <option value="AUTOMATIQUE">Automatique</option>
                </select>
              </div>
            </div>
          )}

          {/* Ville */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Ville *</label>
            <select
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="input-industrial"
            >
              <option value="">Sélectionnez une ville</option>
              {tunisianCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Images */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Photos * (au moins 1)
            </label>
            <ImageUpload images={images} onImagesChange={setImages} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              "Publication en cours..."
            ) : (
              <>
                <PlusCircle className="h-5 w-5" />
                Publier l'annonce
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
