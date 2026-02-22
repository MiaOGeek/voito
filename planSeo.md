# Plan SEO - Site Voito

## Objectif
Améliorer le référencement naturel du site de petites annonces automobiles en Tunisie.

---

## Phase 1 : Audit & Base Technique

### 1.1 Métadonnées
- [ ] Ajouter `hreflang` pour `fr-TN` (français Tunisie)
- [ ] Renforcer les titles avec "Tunisie" sur toutes les pages catégories
- [ ] Ajouter des meta descriptions uniques par catégorie

### 1.2 Schema.org
- [ ] Ajouter `Organization` JSON-LD sur homepage
- [ ] Ajouter `FAQPage` sur pages catégories
- [ ] Implémenter `Review` schema sur pages annonces

### 1.3 Technique
- [ ] Optimiser le chargement des images (WebP, lazy loading)
- [ ] Améliorer le Core Web Vitals (LCP, CLS)
- [ ] Vérifier le rendu JavaScript pour le SEO

---

## Phase 2 : Architecture SILO

### 2.1 Pages Hub (Contenu thématiques)
- [ ] `/voitures/guides-achat` - Guide d'achat voiture Tunisie
- [ ] `/voitures/financement` - Crédit auto Tunisie
- [ ] `/motos/guides` - Conseils achat moto
- [ ] `/pieces/guides` - Tutoriels pièces auto

### 2.2 Pages catégories enrichies
- [ ] Ajouter texte SEO introductif (300+ mots) sur :
  - `/voitures`
  - `/motos`
  - `/pieces`
- [ ] Ajouter FAQ sur chaque catégorie

### 2.3 Fil d'Ariane
- [ ] Améliorer le breadcrumb (plus de niveaux)
- [ ] Ajouter microdata BreadcrumbList sur toutes les pages

---

## Phase 3 : Contenu & Mots-clés

### 3.1 Stratégie mots-clés
| Page | Mot-clé principal | Mots-clés long-tail |
|------|-------------------|---------------------|
| Home | voiture occasion tunisie | achat voiture tunisie, petites annonces auto |
| /voitures | voitures occasion tunisie | voiture d'occasion tunis, voitureepas cher tunisie |
| /voitures/[marque] | [marque] occasion tunisie | bmw occasion tunisie, Mercedes occasion tunisie |
| /annonces/[id] | [titre annonce] | - |

### 3.2 Contenu à créer
- [ ] Page "Marques populaires" avec statistiques
- [ ] Page "Villes" avec Annonces par ville
- [ ] Blog/Guides (si pas encore implémenté)

---

## Phase 4 : Local SEO (GEO)

### 4.1 Google My Business
- [ ] Créer/optimiser la fiche GMB
- [ ] Ajouter schema LocalBusiness

### 4.2 Pages villes
- [ ] Renforcer les pages `/voitures/ville/[ville]`
- [ ] Ajouter contenu unique par ville (ex: "Voitures occasion à Tunis")

### 4.3 Annuaires & Backlinks
- [ ] Soumettre aux annuaires tunisiens
- [ ] Partenariats avec sites auto tunisiens

---

## Phase 5 : Suivi & Optimisation

### 5.1 Analytics
- [ ] Configurer Google Search Console
- [ ] Suivre les Core Web Vitals
- [ ] Analyser les taux de rebond

### 5.2 Audit mensuel
- [ ] Vérifier les pages indexées
- [ ] Identifier le contenu thin
- [ ] Analyser les backlinks

---

## Priorités d'implémentation

| Ordre | Action | Difficulté |
|-------|--------|------------|
| 1 | Texte SEO pages catégories | Facile |
| 2 | hreflang fr-TN | Facile |
| 3 | Schema LocalBusiness | Moyen |
| 4 | Pages guides | Moyen |
| 5 | Backlinks annuaires | Difficile |
