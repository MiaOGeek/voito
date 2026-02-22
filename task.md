# Voito — Tâches restantes

## Priorité haute (SEO / maillage interne)

- [x] 1. Pages "Toutes les marques" et "Toutes les villes" — 6 pages index pour le maillage interne
- [x] 2. Schema.org JSON-LD par page — Vehicle/Product sur annonces, ItemList sur catégories, BreadcrumbList structuré
- [x] 3. OG images dynamiques — Pages marque (brand.logo), modèle (model.logo || brand.logo), ville (title+desc)
- [x] 4. Redirection page hardcodée — `voitures-occasion-tunis/` → permanentRedirect vers `/voitures/ville/tunis`

## Priorité moyenne (UX / navigation)

- [x] 5. Page 404 personnalisée — Suggestions et liens vers catégories + accueil
- [x] 6. Liens "annonces similaires" — 6 annonces similaires (même modèle/marque/ville) en bas de page annonce
- [x] 7. Fil d'Ariane sur la page annonce — Breadcrumb + BreadcrumbList JSON-LD ajouté
- [x] 8. Alt text des images — Alt descriptifs avec titre + marque + modèle + ville sur listing-card et listing-detail

## Priorité basse (technique)

- [x] 9. Filtres URL sur pages ville — Filtrage côté serveur (brand/model via searchParams, navigation preservée sur page ville)
- [x] 10. Performance images — Next.js image optimization activée (remotePatterns), priority sur first 3 cards, sizes corrects
- [x] 11. Script de vérification SEO — `npx tsx scripts/check-seo.ts` (sitemap, robots, canonical, metadata, JSON-LD, redirect, 404)
