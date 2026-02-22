# Récapitulatif rédaction — Pages à enrichir

## Priorité 1 : Pages THIN (contenu critique)

### Homepage `/`
- **Contenu actuel :** ~70 mots (H1 + sous-titre + titres de sections)
- **Manque :** texte d'introduction sur Voito, proposition de valeur, contexte marché tunisien, trust signals
- **À rédiger :** 1 paragraphe d'accroche (3-4 lignes) sous le hero + 1 bloc SEO en bas de page (~200 mots) expliquant ce qu'est Voito, pourquoi c'est gratuit, combien de villes/marques sont couvertes

---

### Pages "Toutes les marques" (`/voitures/marques`, `/motos/marques`, `/pieces/marques`)
- **Contenu actuel :** ~10 mots (juste le H1 "Toutes les marques" + grille)
- **Manque :** texte introductif SEO
- **À rédiger (3 textes différents, ~100 mots chacun) :**

**Voitures `/voitures/marques` :**
> Texte à rédiger — Sujet : présenter les marques auto disponibles en Tunisie (Peugeot, VW, Renault, Toyota, BMW, Hyundai...), pourquoi chercher par marque, variété de l'offre. Ton : informatif, orienté achat. Mots-clés : "marque voiture occasion tunisie", "toutes les marques auto".

**Motos `/motos/marques` :**
> Texte à rédiger — Sujet : marques de motos populaires en Tunisie, scooters, sportives, trails. Mots-clés : "marque moto tunisie", "scooter occasion marque".

**Pièces `/pieces/marques` :**
> Texte à rédiger — Sujet : trouver des pièces par marque, compatibilité, OEM vs adaptable. Mots-clés : "pièces détachées par marque", "pièces auto tunisie marque".

---

### Pages "Toutes les villes" (`/voitures/villes`, `/motos/villes`, `/pieces/villes`)
- **Contenu actuel :** ~10 mots (juste le H1 + grille de villes)
- **Manque :** texte introductif SEO
- **À rédiger (3 textes différents, ~100 mots chacun) :**

**Voitures `/voitures/villes` :**
> Texte à rédiger — Sujet : couverture nationale (24 gouvernorats), intérêt de la recherche locale, marchés auto les plus actifs (Tunis, Sfax, Sousse). Mots-clés : "voiture occasion par ville", "annonces auto tunisie ville".

**Motos `/motos/villes` :**
> Texte à rédiger — Sujet : moto d'occasion par ville, marchés motos actifs, acheter près de chez soi. Mots-clés : "moto occasion ville tunisie".

**Pièces `/pieces/villes` :**
> Texte à rédiger — Sujet : pièces détachées par région, proximité vendeur, livraison locale. Mots-clés : "pièces détachées par ville tunisie".

---

## Priorité 2 : Pages ADEQUATE (à renforcer)

### Qui sommes-nous `/qui-sommes-nous`
- **Contenu actuel :** ~150 mots (mission + vision + contact)
- **Manque :** histoire de la plateforme, chiffres clés, équipe, valeurs, différenciateurs
- **À rédiger :** enrichir à ~400 mots minimum. Ajouter : date de création, nombre de villes couvertes, nombre de marques, pourquoi le service est gratuit, vision long terme

---

### Connexion `/connexion`
- **Contenu actuel :** ~15 mots (H1 + sous-titre + formulaire)
- **Note :** page noindex potentielle, enrichissement optionnel
- **Idée :** ajouter un court texte sous le formulaire rappelant les avantages d'avoir un compte (publier, gérer annonces, favoris)

### Inscription `/inscription`
- **Contenu actuel :** ~10 mots
- **Note :** même remarque que connexion
- **Idée :** ajouter un texte "Pourquoi s'inscrire ?" (3 bullet points : gratuit, photos illimitées, contact sécurisé)

---

## Priorité 3 : Contenu dynamique à vérifier en base de données

### Pages marques `/voitures/[brand]` (ex: `/voitures/volkswagen`)
- **Architecture :** h2Top, descriptionTop, h2Bottom, descriptionBottom stockés dans la table `Brand`
- **Statut :** ✅ 27 marques remplies avec contenu SEO unique (~200 mots chacune)
  - 15 VOITURES : Audi, BMW, Citroën, Ford, Honda, Hyundai, Jaguar, Land Rover, Mazda, Mercedes, Nissan, Porsche, Seat, Volkswagen, Volvo
  - 6 MOTOS : Forza, FTM, Peugeot, SLC, SYM, Zimota
  - 6 PIECES : Fiat, Kia, Peugeot, Renault, Toyota, Volkswagen

### Pages modèles `/voitures/[brand]/[model]` (ex: `/voitures/volkswagen/golf`)
- **Architecture :** même structure que les marques, dans la table `Model`
- **Action :** vérifier que chaque modèle indexable a ses champs SEO remplis

### Pages villes `/annonces-[slug]` (ex: `/annonces-tunis`)
- **Statut :** ✅ 24 villes déjà remplies avec contenu SEO unique (~200 mots chacune)

---

## Pages bien fournies (aucune action)

| Page | Mots | Statut |
|------|------|--------|
| `/voitures` | 340+ | ✅ RICH |
| `/motos` | 290+ | ✅ RICH |
| `/pieces` | 310+ | ✅ RICH |
| `/voitures/guides-achat` | 400+ | ✅ RICH |
| `/voitures/financement` | 450+ | ✅ RICH |
| `/motos/guides` | 400+ | ✅ RICH |
| `/pieces/guides` | 420+ | ✅ RICH |
| `/faq` | 800+ | ✅ RICH |
| `/confidentialite` | 1500+ | ✅ RICH |
| `/mentions-legales` | 200+ | ✅ OK |
| `/conditions` | 200+ | ✅ OK |
| `/publier` | 280+ | ✅ OK |
| `/annonces-[ville]` | 200+ par ville | ✅ RICH (24 villes) |

---

## Règles de rédaction

1. **Ton :** informatif, professionnel, orienté utilisateur tunisien
2. **Langue :** français avec termes locaux si pertinents (TND, gouvernorat, souk)
3. **Mots-clés :** intégrer naturellement les expressions long tail (occasion, entre particuliers, vente, offre, occaz, prix TND)
4. **Unicité :** chaque texte doit être unique — pas de copier-coller entre pages similaires
5. **Longueur minimum :** 100 mots pour les textes d'introduction, 200+ mots pour les blocs SEO complets
6. **Pas de promesses :** ne pas promettre de résultats spécifiques (ex: "vendez en 24h")
7. **CTA discrets :** orienter vers l'action (publier, chercher, filtrer) sans être agressif
