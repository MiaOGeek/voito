"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Brand {
  id: string;
  name: string;
  slug: string;
  models: { id: string; name: string }[];
}

interface SearchFiltersProps {
  category?: "VOITURES" | "MOTOS" | "PIECES" | null;
  showCategoryFilter?: boolean;
  brandSlug?: string;
  modelSlug?: string;
  cityName?: string;
  citySlug?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const tunisianCities = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
  "Béja", "Jendouba", "Kef", "Siliana", "Sousse", "Monastir", "Mahdia",
  "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabès", "Médenine",
  "Tataouine", "Gafsa", "Tozeur", "Kébili",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

export default function SearchFilters({
  category,
  showCategoryFilter = true,
  brandSlug,
  modelSlug,
  cityName,
  citySlug,
}: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [filters, setFilters] = useState({
    category: category || (searchParams?.get("category") as any) || "",
    brandSlug: brandSlug || "",
    modelSlug: modelSlug || "",
    city: cityName || searchParams?.get("city") || "",
    minPrice: searchParams?.get("minPrice") || "",
    maxPrice: searchParams?.get("maxPrice") || "",
    minYear: searchParams?.get("minYear") || "",
    maxYear: searchParams?.get("maxYear") || "",
    minMileage: searchParams?.get("minMileage") || "",
    maxMileage: searchParams?.get("maxMileage") || "",
    fiscalPower: searchParams?.get("fiscalPower") || "",
  });

  useEffect(() => {
    const cat = filters.category || category;
    const url = cat ? `/api/brands?category=${cat}` : "/api/brands";
    fetch(url)
      .then((res) => res.json())
      .then((data: Brand[]) => {
        setBrands(data);
        // If brandSlug is set, populate models
        if (filters.brandSlug) {
          const brand = data.find((b: Brand) => b.slug === filters.brandSlug);
          setModels(brand?.models || []);
        }
      })
      .catch((error) => console.error("Error fetching brands:", error));
  }, [filters.category]);

  // Update models when brand changes
  useEffect(() => {
    if (filters.brandSlug) {
      const selectedBrand = brands.find((b) => b.slug === filters.brandSlug);
      setModels(selectedBrand?.models || []);
    } else {
      setModels([]);
      setFilters((prev) => ({ ...prev, modelSlug: "" }));
    }
  }, [filters.brandSlug, brands]);

  const handleSearch = () => {
    const catPath = filters.category ? `/${filters.category.toLowerCase()}` : "/";

    // On a city page: stay on the city page URL, pass other filters as query params
    if (citySlug) {
      const path = `${catPath}/ville/${citySlug}`;
      const params = new URLSearchParams();
      // City is already in the URL path, don't duplicate in query params
      if (filters.brandSlug) params.set("brandSlug", filters.brandSlug);
      if (filters.modelSlug) params.set("modelSlug", filters.modelSlug);
      const filterKeys = ["minPrice", "maxPrice", "minYear", "maxYear", "minMileage", "maxMileage", "fiscalPower"] as const;
      filterKeys.forEach((key) => {
        if (filters[key]) params.set(key, filters[key]);
      });
      const queryString = params.toString();
      router.push(`${path}${queryString ? `?${queryString}` : ""}`);
      return;
    }

    // Default: build path segments /category/brand/model
    let path = catPath;
    if (filters.brandSlug) {
      path += `/${filters.brandSlug}`;
      if (filters.modelSlug) {
        path += `/${filters.modelSlug}`;
      }
    }

    // Build query params (everything except category, brand, model)
    const params = new URLSearchParams();
    const queryKeys = ["city", "minPrice", "maxPrice", "minYear", "maxYear", "minMileage", "maxMileage", "fiscalPower"] as const;
    queryKeys.forEach((key) => {
      if (filters[key]) params.set(key, filters[key]);
    });

    const queryString = params.toString();
    router.push(`${path}${queryString ? `?${queryString}` : ""}`);
  };

  const handleReset = () => {
    setFilters({
      category: category || "",
      brandSlug: brandSlug || "",
      modelSlug: modelSlug || "",
      city: cityName || "",
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: "",
      minMileage: "",
      maxMileage: "",
      fiscalPower: "",
    });
  };

  return (
    <div className="card-metallic p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center">
          <Search className="h-5 w-5 mr-2 text-primary" />
          Rechercher un véhicule
        </h2>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-primary hover:text-secondary transition-colors flex items-center"
        >
          <SlidersHorizontal className="h-4 w-4 mr-1" />
          {showAdvanced ? "Moins" : "Plus"} de filtres
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {showCategoryFilter && (
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Catégorie
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="input-industrial"
            >
              <option value="">Toutes catégories</option>
              <option value="VOITURES">Voitures</option>
              <option value="MOTOS">Motos</option>
              <option value="PIECES">Pièces détachées</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Marque
          </label>
          <select
            value={filters.brandSlug}
            onChange={(e) => setFilters({ ...filters, brandSlug: e.target.value, modelSlug: "" })}
            className="input-industrial"
          >
            <option value="">Toutes marques</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.slug}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Modèle
          </label>
          <select
            value={filters.modelSlug}
            onChange={(e) => setFilters({ ...filters, modelSlug: e.target.value })}
            className="input-industrial"
            disabled={!filters.brandSlug}
          >
            <option value="">Tous modèles</option>
            {models.map((model) => (
              <option key={model.id} value={slugify(model.name)}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Ville
          </label>
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="input-industrial"
          >
            <option value="">Toutes villes</option>
            {tunisianCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Prix min (TND)
            </label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="input-industrial"
              placeholder="Ex: 10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Prix max (TND)
            </label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="input-industrial"
              placeholder="Ex: 50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Année min
            </label>
            <select
              value={filters.minYear}
              onChange={(e) => setFilters({ ...filters, minYear: e.target.value })}
              className="input-industrial"
            >
              <option value="">Toutes années</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Année max
            </label>
            <select
              value={filters.maxYear}
              onChange={(e) => setFilters({ ...filters, maxYear: e.target.value })}
              className="input-industrial"
            >
              <option value="">Toutes années</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Kilométrage min
            </label>
            <input
              type="number"
              value={filters.minMileage}
              onChange={(e) => setFilters({ ...filters, minMileage: e.target.value })}
              className="input-industrial"
              placeholder="Ex: 50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Kilométrage max
            </label>
            <input
              type="number"
              value={filters.maxMileage}
              onChange={(e) => setFilters({ ...filters, maxMileage: e.target.value })}
              className="input-industrial"
              placeholder="Ex: 150000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Puissance fiscale (CV)
            </label>
            <input
              type="number"
              value={filters.fiscalPower}
              onChange={(e) => setFilters({ ...filters, fiscalPower: e.target.value })}
              className="input-industrial"
              placeholder="Ex: 7"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button onClick={handleSearch} className="btn-primary flex-1">
          <Search className="inline h-4 w-4 mr-2" />
          Rechercher
        </button>
        <button onClick={handleReset} className="btn-outline">
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
