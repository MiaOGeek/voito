# Voito — Issues restantes

> Audit du 22/02/2026 — 43 issues (0 critique, 31 medium, 12 low)

---

## Priorite haute (Medium)

### 1. Types `any` restants (14 occurrences)

| Fichier | Ligne | Issue |
|---------|-------|-------|
| `app/voitures/page.tsx` | 29, 92 | `const where: any`, `listing: any` dans map |
| `app/motos/page.tsx` | 29, 85 | idem |
| `app/pieces/page.tsx` | 29, 79 | idem |
| `app/ville/[slug]/page.tsx` | 61, 119 | idem |
| `components/city-listing-page.tsx` | 45 | `const where: any` |
| `components/brand-listing-page.tsx` | 31 | `const where: any` |
| `components/listing-grid.tsx` | 5 | `listings: any[]` en props |
| `app/annonces/[id]/listing-detail-client.tsx` | 15-16 | `listing: any`, `similarListings?: any[]` |
| `app/annonces/[id]/page.tsx` | 168 | `const similarWhere: any[]` |
| `app/mes-annonces/page.tsx` | 37 | `(listing: any)`, `(session?.user as any)?.id` |
| `app/api/listings/route.ts` | 27 | `const where: any` |
| `app/api/listings/[id]/route.ts` | 73, 157 | `(session.user as any).id` |
| `app/api/user/profile/route.ts` | 43 | `const updateData: any` |

**Action** : definir des types Prisma partages (Listing, Brand, Model, User) et typer les filtres `where` avec `Prisma.ListingWhereInput`.

---

### 2. Pages sans metadata (7 pages)

| Page | Fichier |
|------|---------|
| Connexion | `app/connexion/page.tsx` |
| Inscription | `app/inscription/page.tsx` |
| Deposer | `app/deposer/page.tsx` |
| Publier | `app/publier/page.tsx` |
| Mes Annonces | `app/mes-annonces/page.tsx` |
| Mes Informations | `app/mes-informations/page.tsx` |
| Voitures occasion Tunis | `app/voitures-occasion-tunis/page.tsx` |

**Action** : ajouter `export const metadata = { title, description, robots: { index: false } }` pour les pages auth/dashboard (noindex). La page voitures-occasion-tunis doit avoir des meta si elle est indexable.

---

### 3. Securite API (4 problemes)

| Fichier | Ligne | Issue |
|---------|-------|-------|
| `app/api/listings/[id]/contact/route.ts` | 64 | `${message}` injecte en HTML dans l'email sans sanitization — risque XSS |
| `app/blog/[slug]/page.tsx` | 164 | `dangerouslySetInnerHTML={{ __html: article.content }}` — risque XSS si contenu non fiable |
| `app/api/messages/route.ts` | 11 | `await req.json()` sans try-catch — crash si JSON malformed |
| `app/api/messages/route.ts` | 11, 20 | `content`, `receiverId`, `listingId` non valides avant creation |

**Action** :
- Sanitizer le message dans le template email (echapper les caracteres HTML)
- Wrapper `req.json()` dans un try-catch
- Valider l'existence de receiverId/listingId avant creation du message

---

### 4. Double requete Prisma non cachee

| Fichier | Issue |
|---------|-------|
| `app/annonces/[id]/page.tsx` | `getListing(params.id)` appele dans `generateMetadata` (ligne 36) ET dans le composant (ligne 67) sans `React.cache()` |

**Action** : wrapper `getListing` avec `import { cache } from "react"` comme fait pour `getCity` et `getSeller`.

---

### 5. Validation API manquante (3 routes)

| Route | Issue |
|-------|-------|
| `app/api/listings/route.ts` | Pas de validation page > 0, pas de limite max sur les resultats |
| `app/api/upload/presigned/route.ts` | Pas de validation du type MIME (accepte tout fichier) |
| `app/api/listings/[id]/contact/route.ts` | Pas de limite de longueur sur le champ message |

**Action** : ajouter des checks Zod ou manuels sur chaque route.

---

## Priorite basse (Low)

### 6. Accessibilite (4 problemes)

| Composant | Issue |
|-----------|-------|
| `components/header.tsx` (ligne 91-96) | Bouton menu mobile sans `aria-label` ni `aria-expanded` |
| `components/search-filters.tsx` (lignes 174-240) | Inputs sans `id`/`htmlFor` lies aux labels |
| `components/pagination.tsx` (ligne 60) | Bouton page active sans `aria-current="page"` |
| `app/annonces/[id]/listing-detail-client.tsx` (ligne 88-108) | Boutons thumbnails sans `aria-label` |

---

### 7. SEO complementaire (3 problemes)

| Issue | Detail |
|-------|--------|
| Pagination SEO | Pas de `rel="next"` / `rel="prev"` dans les metadonnees des pages paginees |
| OpenGraph images | `annonces/[id]/page.tsx` metadata ne retourne pas d'images OpenGraph |
| Sitemap resilience | `app/sitemap.ts` n'a pas de gestion d'erreur si les requetes DB echouent |

---

### 8. Divers (5 problemes)

| Issue | Fichier | Detail |
|-------|---------|--------|
| Alt text generique | `components/image-upload.tsx` | `alt="Image ${index + 1}"` — non descriptif |
| Cache invalidation | Global | Pas de `revalidateTag()` quand un listing est publie/supprime/modifie |
| Blog types | `lib/blog/` | Articles non types proprement (pas d'interface Article) |
| ISR manquant | `app/faq/page.tsx`, `app/qui-sommes-nous/page.tsx` | Pages statiques sans `revalidate` |
| OpenGraph images | `app/annonces/[id]/page.tsx` | `openGraph` dans metadata n'inclut pas les images du listing |

---

## Deja corrige dans cette session

Pour reference, voici ce qui a ete traite :

- `searchParams: any` → type strict dans 13 pages + 2 composants
- Helper `p()` pour extraction safe des query params
- Breadcrumb JSON-LD `item` complete sur 16 fichiers
- `React.cache()` pour `getCity` et `getSeller`
- `baseUrl` standardise (`|| "https://voito.info"`) sur 6 fichiers
- `baseUrl || undefined` elimine sur 8 fichiers
- `baseUrl` inutilise supprime de 10 `generateMetadata`
- `error: any` → `error instanceof Error` dans 8 catch blocks
- `.toNumber()` → `Number()` dans opengraph-image

**Total fichiers modifies : ~40 | 0 erreur TypeScript**
