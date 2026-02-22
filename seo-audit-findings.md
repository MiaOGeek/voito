# Audit SEO Complet — voito.info

**Date :** 2026-02-22 | **Score global : 62/100** | **Objectif : 85+/100**

---

## Score par Catégorie

| Catégorie | Score | Poids |
|-----------|-------|-------|
| Technical SEO | 72/100 | 25% |
| Contenu / E-E-A-T | 58/100 | 25% |
| On-Page SEO | 70/100 | 20% |
| Schema / Données structurées | 68/100 | 10% |
| Performance (CWV) | 30/100 | 10% |
| Images | 65/100 | 5% |
| AI Search Readiness | 50/100 | 5% |

---

## 23 Findings — Classement par Priorité

### CRITIQUES (2)

| # | Problème | Fichier | Statut |
|---|----------|---------|--------|
| 1 | **`force-dynamic` sur layout racine** — toutes les pages rendues dynamiquement, TTFB 4-5s, SSG/ISR impossible | `app/layout.tsx:16` | ⬜ |
| 2 | **Formats canonicaux incohérents** — mix relatif/absolu, certains `baseUrl` = `""` (chaîne vide) | `app/voitures/[brand]/page.tsx:18` et autres | ⬜ |

### HAUTS (10)

| # | Problème | Fichier | Statut |
|---|----------|---------|--------|
| 3 | **Page "Qui sommes-nous" thin content** — 120 mots, E-E-A-T 24/100, pas d'équipe/adresse/histoire | `app/qui-sommes-nous/page.tsx` | ⬜ |
| 4 | **Homepage thin content** — ~80 mots, pas de stats, pas de "comment ça marche" | `app/page.tsx` | ⬜ |
| 5 | **Article JSON-LD sans `image`** — propriété requise pour rich results Google | `app/blog/[slug]/page.tsx:68-88` | ⬜ |
| 6 | **Scripts tiers dans `<head>` non optimisés** — Abacus AI + GA + AdSense bloquent le rendu | `app/layout.tsx:72-89` | ⬜ |
| 7 | **Pas de Content-Security-Policy header** | `next.config.js` | ⬜ |
| 8 | **SiteConfig JSON-LD global injecté sur TOUTES les pages** — risque duplication Organization/WebSite | `app/layout.tsx:91-96` | ⬜ |
| 9 | **Pages catégorie thin content** — ~150 mots chacune (min 800), structure templated identique | `app/voitures/page.tsx`, `motos/`, `pieces/` | ⬜ |
| 10 | **Images listing detail chargées client-side** — LCP waterfall via useEffect | `app/annonces/[id]/listing-detail-client.tsx:25-30` | ⬜ |
| 11 | **Dépendances massives inutilisées** — plotly.js (~1MB), mapbox-gl (~200KB), chart.js, recharts, 3 form libs | `package.json` | ⬜ |
| 12 | **CLS fade-in-up animation** sur listing cards above-fold | `components/listing-card.tsx:28-29` | ⬜ |

### MOYENS (9)

| # | Problème | Fichier | Statut |
|---|----------|---------|--------|
| 13 | **BreadcrumbList JSON-LD manquant** sur `/voitures`, `/motos`, `/pieces`, `/faq`, `/qui-sommes-nous` | Pages catégorie + FAQ + About | ⬜ |
| 14 | **Organization schema sans `sameAs`/`contactPoint`** | `app/page.tsx:41-56` | ⬜ |
| 15 | **ItemList `ListItem` format incorrect** — `url`/`name` au lieu de `item` property | Pages catégorie | ⬜ |
| 16 | **Pas d'OG tags spécifiques** sur catégories, blog index, FAQ | Multiples pages | ⬜ |
| 17 | **Meta description `/voitures` trop longue** — 199 chars (max 160) | `app/voitures/page.tsx:14` | ⬜ |
| 18 | **SearchAction URL mismatch** — `?q=` ne matche pas les filtres réels | `app/page.tsx:69` | ⬜ |
| 19 | **`browserslist` inclut IE 11** — polyfills inutiles +15% bundle | `package.json:125-130` | ⬜ |
| 20 | **`next/image` wildcard hostname `**`** — risque sécurité proxy abuse | `next.config.js:18-23` | ⬜ |
| 21 | **Vendeur pages keyword stuffing** — nom vendeur répété 10+ fois | `app/vendeurs/[id]/page.tsx:163-191` | ⬜ |

### BAS (2)

| # | Problème | Fichier | Statut |
|---|----------|---------|--------|
| 22 | **Pas de `llms.txt`** ni de règles AI crawler dans robots.txt | `public/` | ⬜ |
| 23 | **Article `dateModified` = `datePublished`** + blog title 67 chars | `app/blog/[slug]/page.tsx` | ⬜ |

---

## Top 10 Actions — Plan d'Implémentation

| # | Action | Findings corrigés | Gain estimé | Effort |
|---|--------|-------------------|------------|--------|
| 1 | Remplacer `force-dynamic` par ISR | #1 | +15 pts | Faible |
| 2 | Standardiser canonicaux en relatif | #2 | +5 pts | Faible |
| 3 | Passer URLs images server-side au listing detail | #10 | +5 pts | Faible |
| 4 | Migrer scripts → `next/script` + preconnect | #6 | +5 pts | Faible |
| 5 | Réécrire "Qui sommes-nous" | #3 | +4 pts | Moyen |
| 6 | Enrichir homepage | #4 | +4 pts | Moyen |
| 7 | Expandre contenu catégories 800+ mots | #9, #17 | +3 pts | Moyen |
| 8 | Article `image` JSON-LD + BreadcrumbList ×5 | #5, #13 | +3 pts | Faible |
| 9 | Supprimer deps inutiles + IE11 | #11, #19 | +3 pts | Moyen |
| 10 | Enrichir Organization schema + `llms.txt` | #14, #22 | +2 pts | Faible |

---

## TTFB Mesuré (avant corrections)

| Page | TTFB | Verdict |
|------|------|---------|
| `/` | 4.86s | FAIL (>800ms) |
| `/voitures` | 2.21s | FAIL |
| `/blog` | 0.34s | PASS |
| `/faq` | 5.09s | FAIL |
| `/sitemap.xml` | 2.61s | FAIL |

## Scores par Page (avant corrections)

| Page | Contenu | E-E-A-T | Schema |
|------|---------|---------|--------|
| `/` | 30/100 | 38/100 | OK |
| `/voitures` | 42/100 | 44/100 | -BreadcrumbList |
| `/motos` | 38/100 | 39/100 | -BreadcrumbList |
| `/pieces` | 40/100 | 44/100 | -BreadcrumbList |
| `/faq` | 62/100 | 56/100 | -BreadcrumbList |
| `/blog` | 72/100 | 57/100 | OK |
| `/blog/[slug]` | 75/100 | 57/100 | -image |
| `/qui-sommes-nous` | 18/100 | 24/100 | Vide |
