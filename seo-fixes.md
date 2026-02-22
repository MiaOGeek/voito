# Plan de corrections SEO - Voito.tn

**Date :** 2026-02-22
**Score SEO actuel :** 30/100
**Score SEO cible :** 75+/100

---

## Sommaire des corrections

| # | Correction | Priorite | Impact | Effort | Fichier(s) |
|---|-----------|----------|--------|--------|------------|
| 1 | Corriger le conflit robots.txt | CRITIQUE | Crawl | 2 min | `public/robots.txt` |
| 2 | Creer la route `/annonces-{city}` (ex: `/annonces-tunis`) | CRITIQUE | SEO local | 30 min | `app/ville/[slug]/page.tsx`, `sitemap.ts`, `next.config.js` |
| 2b | Maillage interne vers `/annonces-{city}` (homepage + pages ville) | HAUTE | Maillage | 15 min | `app/page.tsx`, `components/city-listing-page.tsx` |
| 3 | Supprimer le `mounted` check dans Providers | CRITIQUE | LCP/CLS | 2 min | `app/providers.tsx` |
| 4 | Ajouter `async` au script Abacus | CRITIQUE | LCP | 1 min | `app/layout.tsx` |
| 5 | Resoudre les images cote serveur | HAUTE | LCP | 20 min | `listing-card.tsx`, `listing-grid.tsx`, `page.tsx` (homepage + categories) |
| 6 | Corriger canonical/hreflang en URLs absolues | HAUTE | Indexation | 5 min | `app/layout.tsx` |
| 7 | Supprimer FAQPage schema (3 pages) | HAUTE | Schema | 10 min | `app/voitures/page.tsx`, `app/motos/page.tsx`, `app/pieces/page.tsx` |
| 8 | Remplacer LocalBusiness par WebSite schema | HAUTE | Schema | 10 min | `app/page.tsx` |
| 9 | Ajouter les security headers | HAUTE | Securite | 5 min | `next.config.js` |
| 10 | Ajouter `/voitures-occasion-tunis` au sitemap | MOYENNE | Couverture | 2 min | `app/sitemap.ts` |
| 11 | Remplacer framer-motion par CSS | MOYENNE | Perf JS | 15 min | `listing-card.tsx`, `globals.css` |
| 12 | Convertir ListingGrid/ListingCard en Server Components | MOYENNE | Perf JS | 15 min | `listing-grid.tsx`, `listing-card.tsx` |
| 13 | Auto-heberger la texture CSS | MOYENNE | Perf | 5 min | `globals.css` |
| 14 | Agrandir les touch targets footer/hamburger | MOYENNE | Mobile | 5 min | `footer.tsx`, `header.tsx` |
| 15 | Utiliser `next/font` pour Inter | BASSE | CLS | 5 min | `app/layout.tsx` |
| 16 | Cacher `X-Powered-By` | BASSE | Securite | 1 min | `next.config.js` |

---

## Correction 1 : Corriger le conflit robots.txt

**Probleme :** `public/robots.txt` (fichier statique) et `app/robots.ts` (route dynamique) co-existent, causant une erreur 500 sur `/robots.txt`. Les crawlers ne peuvent ni lire robots.txt ni decouvrir le sitemap.

**Solution :** Supprimer `app/robots.ts` et mettre a jour `public/robots.txt` pour inclure la reference au sitemap.

**Fichier : `public/robots.txt`** (remplacer le contenu)
```
User-agent: *
Allow: /

Sitemap: https://voito.info/sitemap.xml
```

**Fichier a supprimer : `app/robots.ts`**

> **Note :** La fonctionnalite de desactivation d'indexation via `config.robotsIndex` (dans `app/robots.ts`) sera perdue. Si cette fonctionnalite est necessaire, on pourra la gerer autrement (ex: via `next.config.js` headers ou middleware).

---

## Correction 2 : Creer la route `/annonces-{city}`

**Probleme :** `/?city=Tunis` est un duplicat de `/` (le parametre `city` est ignore cote serveur). L'URL cible est `/annonces-tunis` qui doit afficher les annonces multi-categories filtrees par ville.

**Etat actuel :** `next.config.js` contient deja un rewrite `/annonces-:city` → `/ville/:city`, mais la route `/ville/[slug]` n'existe pas.

### 2a. Creer `app/ville/[slug]/page.tsx`

Page multi-categories (voitures + motos + pieces) filtree par ville.

```tsx
import SearchFilters from "@/components/search-filters";
import ListingGrid from "@/components/listing-grid";
import SeoContent from "@/components/seo-content";
import Pagination, { ITEMS_PER_PAGE } from "@/components/pagination";
import { ListingStatus } from "@prisma/client";
import prisma from "@/lib/db";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const city = await prisma.city.findUnique({
    where: { slug: params.slug },
  });
  if (!city) return {};

  const siteUrl = process.env.NEXTAUTH_URL || "https://voito.info";

  return {
    title: `Annonces automobiles a ${city.name} - Voitures, Motos, Pieces | Voito`,
    description: `Decouvrez toutes les annonces de voitures, motos et pieces detachees d'occasion a ${city.name}, Tunisie. Prix en TND, vendeurs verifies.`,
    alternates: {
      canonical: `${siteUrl}/annonces-${params.slug}`,
    },
  };
}

export default async function VillePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) {
  const page = Math.max(1, parseInt(searchParams?.page) || 1);

  const city = await prisma.city.findUnique({
    where: { slug: params.slug },
  });
  if (!city) notFound();

  const where: any = {
    city: city.name,
    status: ListingStatus.ACTIVE,
  };

  if (searchParams?.category) where.category = searchParams.category;

  if (searchParams?.minPrice || searchParams?.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) where.price.gte = parseFloat(searchParams.minPrice);
    if (searchParams.maxPrice) where.price.lte = parseFloat(searchParams.maxPrice);
  }

  const [listings, totalItems] = await Promise.all([
    prisma.listing.findMany({
      where,
      include: {
        brand: true,
        model: true,
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.listing.count({ where }),
  ]);

  const siteUrl = process.env.NEXTAUTH_URL || "https://voito.info";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: siteUrl },
      { "@type": "ListItem", position: 2, name: city.name },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Annonces automobiles a ${city.name}`,
    url: `${siteUrl}/annonces-${params.slug}`,
    numberOfItems: totalItems,
    itemListElement: listings.map((listing: any, index: number) => ({
      "@type": "ListItem",
      position: (page - 1) * ITEMS_PER_PAGE + index + 1,
      url: `${siteUrl}/annonces/${listing.id}`,
      name: listing.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link href="/" className="flex items-center hover:text-primary transition-colors">
              <Home className="h-4 w-4 mr-1" />
              Voito
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
            <span className="text-foreground font-medium">{city.name}</span>
          </nav>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            Annonces a <span className="text-primary">{city.name}</span>
          </h1>

          <SeoContent
            h2={city.h2Top}
            description={city.descriptionTop}
            className="mb-8"
          />

          <div className="mb-8">
            <SearchFilters
              showCategoryFilter={true}
              cityName={city.name}
              citySlug={params.slug}
            />
          </div>

          <div className="mb-4">
            <p className="text-muted-foreground">
              {totalItems} {totalItems === 1 ? "annonce trouvee" : "annonces trouvees"}
            </p>
          </div>

          {/* Liens vers les sous-categories par ville */}
          <div className="flex gap-4 mb-8 text-sm">
            <Link href={`/voitures/ville/${params.slug}`} className="text-primary hover:underline">
              Voitures a {city.name}
            </Link>
            <Link href={`/motos/ville/${params.slug}`} className="text-primary hover:underline">
              Motos a {city.name}
            </Link>
            <Link href={`/pieces/ville/${params.slug}`} className="text-primary hover:underline">
              Pieces a {city.name}
            </Link>
          </div>

          <ListingGrid listings={listings} />

          <Pagination
            currentPage={page}
            totalItems={totalItems}
            basePath={`/ville/${params.slug}`}
            searchParams={searchParams}
          />

          <SeoContent
            h2={city.h2Bottom}
            description={city.descriptionBottom}
            className="mt-12"
          />
        </div>
      </div>
    </>
  );
}
```

### 2b. Ajouter au sitemap

**Fichier : `app/sitemap.ts`** -- Ajouter les URLs `/annonces-{slug}` pour chaque ville indexable.

Apres la section `cityPages` (ligne ~77), ajouter :
```tsx
// Pages multi-categories par ville (/annonces-{slug})
const annoncesVillePages: MetadataRoute.Sitemap = cities.map((city) => ({
  url: `${BASE_URL}/annonces-${city.slug}`,
  lastModified: city.createdAt,
  changeFrequency: "daily" as const,
  priority: 0.8,
}));
```

Et inclure `...annoncesVillePages` dans le `return`.

### 2c. Verifier le rewrite dans `next.config.js`

Le rewrite existe deja (ligne 27) :
```js
{ source: '/annonces-:city', destination: '/ville/:city' }
```

C'est correct. Rien a changer ici.

### 2d. Maillage interne vers `/annonces-{city}`

#### Dans la homepage (`app/page.tsx`) -- Section "Explorer par ville"

Ajouter une nouvelle section entre "Explorer par categorie" et "Annonces recentes".
La page serveur charge les villes indexables depuis Prisma et affiche une grille de liens.

Ajouter dans les imports :
```tsx
import { MapPin } from "lucide-react";
```

Ajouter dans la fonction `Home()`, apres la requete `recentListings` :
```tsx
const topCities = await prisma.city.findMany({
  where: { indexable: true },
  orderBy: { name: "asc" },
  take: 8,
});
```

Ajouter le JSX entre la section "Explorer par categorie" (`</section>` ligne 106) et "Annonces recentes" (`<section>` ligne 109) :

```tsx
{/* Villes populaires */}
<section className="py-16 metallic-bg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
      Annonces par <span className="text-primary">ville</span>
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {topCities.map((city) => (
        <Link
          key={city.id}
          href={`/annonces-${city.slug}`}
          className="card-metallic p-4 flex items-center gap-3 hover:border-primary/50 transition-colors group"
        >
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
            {city.name}
          </span>
        </Link>
      ))}
    </div>
  </div>
</section>
```

#### Dans les pages ville par categorie (`components/city-listing-page.tsx`) -- Lien contextuel

Ajouter un lien "Toutes les annonces a {ville}" apres le breadcrumb et avant le H1.

**Fichier : `components/city-listing-page.tsx`** -- Ajouter apres le `</nav>` du breadcrumb (ligne 133), avant le `<h1>` (ligne 135) :

```tsx
<div className="mb-4">
  <Link
    href={`/annonces-${citySlug}`}
    className="inline-flex items-center text-sm text-primary hover:underline"
  >
    <MapPin className="h-4 w-4 mr-1" />
    Toutes les annonces a {city.name}
  </Link>
</div>
```

Et ajouter `MapPin` a l'import lucide-react existant (ligne 9) :
```tsx
import { ChevronRight, Home, MapPin } from "lucide-react";
```

---

## Correction 3 : Supprimer le `mounted` check dans Providers

**Probleme :** `Providers` retourne `null` jusqu'a l'execution du JS, rendant la page entierement blanche au premier rendu. Cela detruit le SSR, cause un LCP de 3-6s et un CLS catastrophique.

**Fichier : `app/providers.tsx`** (remplacer tout le contenu)
```tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        forcedTheme="dark"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
```

**Justification :** Le theme est force a `"dark"` (`forcedTheme="dark"`), donc il n'y a aucun flash de theme a eviter. Le `mounted` check est inutile.

---

## Correction 4 : Ajouter `async` au script Abacus

**Probleme :** Le script chat Abacus est charge de facon synchrone dans `<head>`, bloquant le rendu pendant ~650ms.

**Fichier : `app/layout.tsx`** (ligne 68)

Avant :
```tsx
<script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
```

Apres :
```tsx
<script src="https://apps.abacus.ai/chatllm/appllm-lib.js" async></script>
```

---

## Correction 5 : Resoudre les images cote serveur

**Probleme :** `ListingCard` utilise `useEffect` + `getFileUrl()` pour charger les URLs d'images. Cela cree un waterfall client-side de 4 etapes. La plupart des images sont des URLs Cloudinary (`https://...`) qui n'ont pas besoin de traitement.

### 5a. Ajouter une fonction utilitaire de resolution d'URL

**Fichier : `lib/s3.ts`** (ajouter a la fin)
```tsx
/**
 * Resout une URL d'image de facon synchrone pour les URLs externes.
 * Pour les cles S3, retourne l'URL publique directe.
 */
export function resolveImageUrl(cloud_storage_path: string): string | null {
  if (!cloud_storage_path) return null;
  if (cloud_storage_path.startsWith("http://") || cloud_storage_path.startsWith("https://")) {
    return cloud_storage_path;
  }
  // Cle S3 : construire l'URL publique
  const region = process.env.AWS_REGION || "us-east-1";
  const bucket = getBucketConfig().bucketName;
  return `https://${bucket}.s3.${region}.amazonaws.com/${cloud_storage_path}`;
}
```

### 5b. Resoudre les images dans les pages serveur

**Fichier : `app/page.tsx`** (apres la requete Prisma, avant le return)
```tsx
import { resolveImageUrl } from "@/lib/s3";

// Apres le findMany (ligne 19), ajouter :
const listingsWithImages = recentListings.map((listing) => ({
  ...listing,
  resolvedImageUrl: listing.images?.[0] ? resolveImageUrl(listing.images[0]) : null,
}));
```

Puis passer `listingsWithImages` au lieu de `recentListings` a `<ListingGrid>`.

### 5c. Modifier `ListingCard` pour accepter `resolvedImageUrl`

**Fichier : `components/listing-card.tsx`**

Ajouter `resolvedImageUrl?: string | null` a l'interface `ListingCardProps.listing`.

Remplacer le `useState`/`useEffect` par un usage direct :
```tsx
const imageUrl = listing.resolvedImageUrl ?? null;
```

> Appliquer la meme logique dans `app/voitures/page.tsx`, `app/motos/page.tsx`, `app/pieces/page.tsx`, `components/city-listing-page.tsx`.

### 5d. Convertir en Server Components (si plus de "use client" necessaire)

Apres avoir supprime `useEffect`/`useState` des images ET framer-motion (correction 11), `ListingCard` et `ListingGrid` n'ont plus besoin d'etre des client components. Supprimer `"use client"` des deux fichiers.

---

## Correction 6 : Corriger canonical/hreflang en URLs absolues

**Probleme :** Le canonical est `<link rel="canonical" href="/"/>` (relatif). Google exige des URLs absolues.

**Fichier : `app/layout.tsx`** (lignes 12-14 et 26-31)

Avant :
```tsx
const metadataBase = process.env.NEXTAUTH_URL
  ? new URL(process.env.NEXTAUTH_URL)
  : undefined;
```

Apres :
```tsx
const metadataBase = new URL(process.env.NEXTAUTH_URL || "https://voito.info");
```

Cela garantit que `metadataBase` n'est jamais `undefined`, donc canonical et hreflang seront toujours des URLs absolues.

Et pour le canonical (ligne 28) :
```tsx
canonical: metadataBase.toString(),
```

---

## Correction 7 : Supprimer FAQPage schema (3 pages)

**Probleme :** Depuis aout 2023, Google limite les rich results FAQ aux sites gouvernementaux et de sante. Le schema sera ignore et peut signaler un abus.

**Action :** Supprimer les blocs JSON-LD `FAQPage` et les `<script>` correspondants dans :

- **`app/voitures/page.tsx`** : supprimer lignes 65-102 (objet `faqJsonLd`) et lignes 124-127 (balise `<script>`)
- **`app/motos/page.tsx`** : supprimer l'objet `faqJsonLd` et sa balise `<script>`
- **`app/pieces/page.tsx`** : supprimer l'objet `faqJsonLd` et sa balise `<script>`

> Le contenu FAQ visible en HTML peut rester sur les pages pour les utilisateurs. Seul le balisage JSON-LD est a supprimer.

---

## Correction 8 : Remplacer LocalBusiness par WebSite + Organization ameliore

**Probleme :** Avoir `Organization` + `LocalBusiness` pour la meme entite est contradictoire. `LocalBusiness` est incomplet (pas d'adresse, pas de telephone). Voito est une plateforme en ligne, pas un commerce physique.

**Fichier : `app/page.tsx`** (remplacer lignes 23-51)

```tsx
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Voito",
  "url": siteUrl,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteUrl}/og-image.png`,
  },
  "description": "Plateforme de petites annonces automobiles en Tunisie. Voitures, motos et pieces detachees d'occasion.",
  "areaServed": {
    "@type": "Country",
    "name": "Tunisie",
  },
  "knowsLanguage": "fr",
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Voito",
  "url": siteUrl,
  "description": "Petites annonces automobiles en Tunisie",
  "inLanguage": "fr",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/voitures?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
```

Remplacer aussi les deux `<script>` JSON-LD (lignes 55-62) par :
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
/>
```

---

## Correction 9 : Ajouter les security headers

**Fichier : `next.config.js`** (ajouter apres `rewrites()`)

```js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ];
},
```

Ajouter aussi `poweredByHeader: false` dans l'objet `nextConfig` (correction 16).

---

## Correction 10 : Ajouter `/voitures-occasion-tunis` au sitemap

**Fichier : `app/sitemap.ts`** -- Ajouter dans `staticPages` :

```tsx
{ url: `${BASE_URL}/voitures-occasion-tunis`, changeFrequency: "daily", priority: 0.8 },
```

---

## Correction 11 : Remplacer framer-motion par CSS

**Probleme :** framer-motion ajoute ~120KB de JS pour une simple animation fade-in. CSS natif fait la meme chose sans JS.

### 11a. Ajouter l'animation CSS

**Fichier : `app/globals.css`** (ajouter dans `@layer base`)
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out both;
}
```

### 11b. Modifier ListingCard

**Fichier : `components/listing-card.tsx`**

Supprimer l'import `framer-motion` et remplacer `<motion.div>` par :
```tsx
<div
  className="animate-fade-in-up"
  style={{ animationDelay: `${index * 100}ms` }}
>
```

Et fermer avec `</div>` au lieu de `</motion.div>`.

---

## Correction 12 : Convertir en Server Components

**Apres** les corrections 5 et 11, `ListingCard` et `ListingGrid` n'auront plus besoin de state ni d'effets.

**Fichier : `components/listing-card.tsx`** -- Supprimer `"use client"` (ligne 1), supprimer imports `useState`, `useEffect`, `motion`, `getFileUrl`.

**Fichier : `components/listing-grid.tsx`** -- Supprimer `"use client"` (ligne 1).

---

## Correction 13 : Auto-heberger la texture CSS

**Probleme :** Une image de texture est chargee depuis `transparenttextures.com` a 5% d'opacite. Dependance externe inutile.

**Option A (recommandee) :** Telecharger l'image dans `public/patterns/brushed-alum.png` et modifier `globals.css` :
```css
background-image: url("/patterns/brushed-alum.png");
```

**Option B :** Supprimer completement (a 5% d'opacite, quasiment invisible).

---

## Correction 14 : Agrandir les touch targets

### Footer

**Fichier : `components/footer.tsx`** -- Ajouter `py-2` aux liens du footer :

```tsx
// Avant :
<Link href="/voitures" className="text-muted-foreground hover:text-primary transition-colors text-sm">

// Apres :
<Link href="/voitures" className="text-muted-foreground hover:text-primary transition-colors text-sm py-2">
```

Appliquer a tous les `<Link>` dans les sections Categories et Informations legales.

### Hamburger menu

**Fichier : `components/header.tsx`** (ligne 86)

```tsx
// Avant :
<button className="md:hidden p-2 text-foreground" ...>

// Apres :
<button className="md:hidden p-3 text-foreground" ...>
```

---

## Correction 15 : Utiliser `next/font` pour Inter

**Fichier : `app/layout.tsx`**

Ajouter en haut :
```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
```

Modifier la balise `<html>` :
```tsx
<html lang="fr" className={inter.variable} suppressHydrationWarning>
```

---

## Correction 16 : Cacher `X-Powered-By`

**Fichier : `next.config.js`** -- Ajouter dans `nextConfig` :
```js
poweredByHeader: false,
```

---

## Ordre d'implementation recommande

1. Corrections 3 + 4 (providers + async script) -- impact immediat, 3 min
2. Correction 1 (robots.txt) -- debloquer le crawl, 2 min
3. Correction 6 (canonical/hreflang) -- corriger l'indexation, 5 min
4. Correction 9 + 16 (security headers + powered by) -- securite, 5 min
5. Corrections 7 + 8 (schemas) -- corriger le balisage, 15 min
6. Correction 2 (route `/annonces-{city}`) -- nouvelle page, 30 min
7. Corrections 5 + 11 + 12 (images serveur + CSS anim + server components) -- gros refactoring perf, 40 min
8. Corrections 10, 13, 14, 15 (sitemap, texture, touch, font) -- finitions, 15 min

**Temps total estime : ~2h**
