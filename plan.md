# Plan - Back Office Voito (Projet Independant)

## Decisions prises

- **Projet separe** : `E:/fakeclaudecode/voito-admin/` (Next.js independant, deployable sur un autre serveur)
- **Meme BDD** : se connecte a la meme base TiDB Cloud MySQL que voito.info
- **Stack UI** : Next.js 14 + Tailwind + shadcn/ui + Recharts (meme stack que le site)
- **Auth** : table `Admin` separee dans le schema Prisma (independant des Users du site)

---

## Phase 1 : Init projet + Schema + Auth

### 1.1 - Creer le projet Next.js

```bash
E:/fakeclaudecode/voito-admin/
```

- `npx create-next-app@14` avec TypeScript, Tailwind, App Router
- Installer : Prisma, shadcn/ui, Recharts, bcryptjs, jsonwebtoken, lucide-react, sonner, react-quill (editeur riche pour marques)
- Copier le theme dark/industriel depuis voito (globals.css, tailwind.config)

### 1.2 - Schema Prisma (meme BDD, schema etendu)

Le schema Prisma du back office **pointe vers la meme `DATABASE_URL`** mais ajoute un modele `Admin` :

```prisma
model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Le schema reprend aussi tous les modeles existants (User, Listing, Brand, Model, Message, etc.) en **lecture/ecriture** pour l'administration.

Extension du modele `Listing` (2 champs SEO) :

```prisma
model Listing {
  ...
  metaTitle     String?              # Meta title SEO
  metaDesc      String?  @db.Text    # Meta description SEO
}
```

- Migration : `prisma migrate dev` (ajoute table Admin + champs SEO sur Brand, City, Listing)
- Seed : creer un admin par defaut (`admin@voito.info`)

### 1.3 - Auth admin standalone

Pas de NextAuth. Auth custom plus simple :

- **Login** : `POST /api/auth/login` → verifie email/password bcrypt dans table `Admin` → genere un JWT signe (jsonwebtoken)
- **JWT** : stocke dans un cookie HttpOnly (`admin-token`)
- **Middleware** (`middleware.ts`) : verifie le JWT sur toutes les routes sauf `/connexion` et `/api/auth/*`
- **Helper** : `lib/auth.ts` → `verifyAdmin(request)` qui decode le JWT et retourne l'admin
- **Logout** : `POST /api/auth/logout` → supprime le cookie

### 1.4 - Page de connexion (`/connexion`)

- Formulaire email/password minimaliste
- Appel `POST /api/auth/login`
- Redirect vers `/` (dashboard) apres succes
- Gestion erreurs (mauvais identifiants)

---

## Phase 2 : Layout & Dashboard

### 2.1 - Layout admin (`app/layout.tsx`)

Structure globale :

```
+------------------+----------------------------------------+
|                  |  Header (breadcrumb + admin menu)       |
|    Sidebar       +----------------------------------------+
|    - Dashboard   |                                        |
|    - Annonces    |          Contenu page                  |
|    - Utilisateurs|                                        |
|    - Marques     |                                        |
|    - Parametres  |                                        |
+------------------+----------------------------------------+
```

- **Sidebar** : navigation fixe, icones Lucide, highlight page active
  - Dashboard
  - Automobiles (VOITURES)
  - Motos (MOTOS)
  - Pieces detachees (PIECES)
  - Utilisateurs
  - Marques
  - Modeles
  - Villes
  - Parametres
- **Header** : breadcrumb dynamique, nom admin, bouton deconnexion, lien vers voito.info
- **Responsive** : sidebar en sheet/drawer sur mobile
- **Theme** : dark industriel (reprendre les CSS vars de voito)

### 2.2 - Dashboard (`/` = page d'accueil)

KPIs en cartes :

| KPI | Query Prisma |
|-----|-------------|
| Annonces actives | `listing.count({ where: { status: ACTIVE } })` |
| Total utilisateurs | `user.count()` |
| Nouvelles annonces (7j) | `listing.count({ where: { createdAt: { gte: 7j } } })` |
| Nouveaux users (7j) | `user.count({ where: { createdAt: { gte: 7j } } })` |
| Annonces vendues | `listing.count({ where: { status: SOLD } })` |

Graphiques Recharts :
- **Courbe** : annonces creees par mois (12 derniers mois)
- **Barres** : annonces par categorie (VOITURES/MOTOS/PIECES)
- **Camembert** : top 5 villes
- **Courbe** : inscriptions par mois

API : `GET /api/stats` (retourne toutes les stats en un appel)

---

## Phase 3 : CRUD Annonces (3 sections separees)

Chaque categorie a son propre onglet dans la sidebar et ses propres pages. Le composant `DataTable` et la page detail sont **reutilisables** (un seul composant, filtre par categorie).

### 3.1 - Automobiles (`/automobiles`)

- Annonces filtrees par `category = VOITURES`
- Colonnes : Titre, Marque, Modele, Prix (TND), Ville, Annee, Km, Statut (badge), Auteur, Date
- **Filtres** : statut, ville, marque, recherche texte
- **Pagination** serveur
- **Actions par ligne** : voir detail, changer statut, supprimer

### 3.2 - Motos (`/motos`)

- Annonces filtrees par `category = MOTOS`
- Memes colonnes et fonctionnalites que Automobiles

### 3.3 - Pieces detachees (`/pieces`)

- Annonces filtrees par `category = PIECES`
- Colonnes adaptees : Titre, Marque, Prix (TND), Ville, Statut, Auteur, Date
- Pas de colonnes Annee/Km/Carburant/Transmission (non pertinent pour les pieces)

### 3.4 - Detail annonce (`/automobiles/[id]`, `/motos/[id]`, `/pieces/[id]`)

Page detail partagee (meme composant) :
- Galerie images (depuis S3/Cloudinary)
- Toutes les infos selon la categorie
- **Champs SEO editables** : Meta Title, Meta Description
- Infos vendeur (lien vers sa fiche)
- **Actions** : changer statut (ACTIVE/INACTIVE/SOLD), supprimer avec confirmation

### 3.5 - API

```
GET    /api/listings?category=VOITURES   # Liste paginee + filtres (param category obligatoire)
GET    /api/listings/[id]                # Detail
PATCH  /api/listings/[id]                # Modifier (statut, etc.)
DELETE /api/listings/[id]                # Supprimer
```

Toutes protegees par `verifyAdmin(request)`. Une seule API, le filtre `category` determine la section.

---

## Phase 4 : Gestion Utilisateurs

### 4.1 - Liste (`/utilisateurs`)

- Colonnes : Nom, Email, Telephone, Email verifie (badge), Nb annonces, Date inscription
- **Filtres** : email verifie (oui/non), recherche
- **Actions** : voir detail, supprimer

### 4.2 - Detail utilisateur (`/utilisateurs/[id]`)

- Profil complet
- Liste de ses annonces (avec liens)
- **Actions** : supprimer le compte (cascade: annonces supprimees aussi)

### 4.3 - API

```
GET    /api/users              # Liste paginee
GET    /api/users/[id]         # Detail + annonces
DELETE /api/users/[id]         # Supprimer (cascade)
```

---

## Phase 5 : Gestion Marques & Modeles

### 5.0 - Extension du schema Brand (migration sur la BDD partagee)

Le modele `Brand` actuel est minimal (name, slug, category). Il faut ajouter les champs SEO + contenu :

```prisma
model Brand {
  id            String    @id @default(cuid())
  name          String
  slug          String
  category      Category  @default(VOITURES)
  logo          String?                        # URL image (S3/Cloudinary)
  metaTitle     String?                        # Meta title SEO
  metaDesc      String?   @db.Text             # Meta description SEO
  h2Top         String?                        # H2 haut de page
  descriptionTop String?  @db.Text             # Contenu riche (HTML) - bloc haut
  h2Bottom      String?                        # H2 bas de page
  descriptionBottom String? @db.Text           # Contenu riche (HTML) - bloc bas
  createdAt     DateTime  @default(now())
  models        Model[]
  listings      Listing[]

  @@unique([slug, category])
}
```

Migration Prisma : `ALTER TABLE` pour ajouter les nouveaux champs (nullable, pas de cassure).

### 5.0b - Extension du schema Model

Le modele `Model` actuel est minimal (name, brandId). Meme traitement que Brand :

```prisma
model Model {
  id                String    @id @default(cuid())
  name              String
  slug              String?
  brandId           String
  brand             Brand     @relation(fields: [brandId], references: [id], onDelete: Cascade)
  logo              String?                        # URL image (S3/Cloudinary)
  metaTitle         String?                        # Meta title SEO
  metaDesc          String?   @db.Text             # Meta description SEO
  h2Top             String?                        # H2 haut de page
  descriptionTop    String?  @db.Text              # Contenu riche (HTML) - bloc haut
  h2Bottom          String?                        # H2 bas de page
  descriptionBottom String?  @db.Text              # Contenu riche (HTML) - bloc bas
  createdAt         DateTime  @default(now())
  listings          Listing[]

  @@unique([brandId, name])
}
```

### 5.1 - Liste marques (`/marques`)

- Colonnes : Logo (miniature), Nom, Slug, Categorie (badge), Nb modeles, Nb annonces
- **Filtres** : categorie (VOITURES/MOTOS/PIECES)
- **Actions** : ajouter, modifier, supprimer
- Tri par nom ou categorie

### 5.2 - Formulaire marque (`/marques/[id]` et `/marques/nouveau`)

Formulaire complet inspire de l'ancien back office :

| Champ | Type | Requis |
|-------|------|--------|
| Marque (name) | Input text | Oui |
| Slug | Input text | Oui |
| Categorie | Select (VOITURES/MOTOS/PIECES) | Oui |
| Meta Title | Input text | Non |
| Meta Description | Textarea | Non |
| H2 (haut) | Input text | Non |
| Description (1) | Editeur riche (Quill/TipTap) | Non |
| H2 (bas) | Input text | Non |
| Description (2) | Editeur riche (Quill/TipTap) | Non |
| Logo/Photo | Upload image + preview + suppression | Non |

- Editeur riche : **React-Quill** ou **TipTap** (headings, bold, italic, underline, links, listes)
- Upload logo : meme pattern S3/Cloudinary que le site principal
- Boutons : Sauvegarder, Exporter JSON, Annuler
- **Section modeles** en bas : tableau des modeles de cette marque avec lien vers leur fiche complete

### 5.3 - Liste modeles (`/modeles`)

- Colonnes : Logo (miniature), Nom, Marque parente, Slug, Nb annonces
- **Filtres** : marque, recherche texte
- **Actions** : ajouter, modifier, supprimer

### 5.4 - Formulaire modele (`/modeles/[id]` et `/modeles/nouveau`)

Meme structure que le formulaire marque :

| Champ | Type | Requis |
|-------|------|--------|
| Nom | Input text | Oui |
| Slug | Input text | Oui |
| Marque parente | Select (liste des marques) | Oui |
| Meta Title | Input text | Non |
| Meta Description | Textarea | Non |
| H2 (haut) | Input text | Non |
| Description (1) | Editeur riche (React-Quill) | Non |
| H2 (bas) | Input text | Non |
| Description (2) | Editeur riche (React-Quill) | Non |
| Logo/Photo | Upload image + preview + suppression | Non |

### 5.5 - API

```
GET    /api/brands                # Liste marques (filtrable par categorie)
POST   /api/brands                # Creer marque
GET    /api/brands/[id]           # Detail marque
PATCH  /api/brands/[id]           # Modifier marque
DELETE /api/brands/[id]           # Supprimer marque

GET    /api/models                # Liste modeles (filtrable par brandId)
POST   /api/models                # Creer modele (tous les champs)
GET    /api/models/[id]           # Detail modele
PATCH  /api/models/[id]           # Modifier modele
DELETE /api/models/[id]           # Supprimer modele
```

---

## Phase 6 : Gestion Villes

### 6.0 - Nouveau modele City (migration sur la BDD partagee)

Actuellement les villes sont de simples strings dans `Listing.city`. On cree un modele `City` pour le contenu SEO :

```prisma
model City {
  id                String   @id @default(cuid())
  name              String   @unique       # "Tunis", "Sousse", etc.
  slug              String   @unique       # "tunis", "sousse"
  metaTitle         String?                # Meta title SEO
  metaDesc          String?  @db.Text      # Meta description SEO
  h2Top             String?                # H2 haut de page
  descriptionTop    String?  @db.Text      # Contenu riche (HTML) - bloc haut
  h2Bottom          String?                # H2 bas de page
  descriptionBottom String?  @db.Text      # Contenu riche (HTML) - bloc bas
  createdAt         DateTime @default(now())
}
```

- Migration : cree la table City
- Seed : inserer les 24 villes tunisiennes existantes (Tunis, Ariana, Ben Arous, etc.)
- Le champ `Listing.city` reste un string pour l'instant (pas de FK, juste une table de reference SEO)

### 6.1 - Liste villes (`/villes`)

- Colonnes : Nom, Slug, Meta Title (tronque), Nb annonces (count Listing par city name), Date
- **Actions** : ajouter, modifier, supprimer
- Recherche par nom

### 6.2 - Formulaire ville (`/villes/[id]` et `/villes/nouveau`)

| Champ | Type | Requis |
|-------|------|--------|
| Nom | Input text | Oui |
| Slug | Input text (auto-genere depuis le nom) | Oui |
| Meta Title | Input text | Non |
| Meta Description | Textarea | Non |
| H2 (haut) | Input text | Non |
| Description (1) | Editeur riche (React-Quill) | Non |
| H2 (bas) | Input text | Non |
| Description (2) | Editeur riche (React-Quill) | Non |

- Boutons : Sauvegarder, Annuler

### 6.3 - API

```
GET    /api/cities              # Liste
POST   /api/cities              # Creer
GET    /api/cities/[id]         # Detail
PATCH  /api/cities/[id]         # Modifier
DELETE /api/cities/[id]         # Supprimer
```

---

## Phase 7 : Parametres

### 7.0 - Nouveau modele SiteConfig (migration)

Table a ligne unique pour stocker la config globale du site :

```prisma
model SiteConfig {
  id                String   @id @default("singleton")  # Toujours 1 seule ligne

  # Identite du site
  siteTitle         String?              # "Voito - Petites Annonces Automobiles"
  siteDescription   String?  @db.Text    # Description globale du site
  favicon           String?              # URL favicon (upload)
  logo              String?              # URL logo du site (upload)

  # SEO & Indexation
  metaTitle         String?              # Meta title par defaut (homepage)
  metaDesc          String?  @db.Text    # Meta description par defaut
  robotsIndex       Boolean  @default(true)   # true = indexable, false = noindex,nofollow
  schemaOrgJsonLd   String?  @db.Text    # JSON-LD Schema.org (code brut)

  # Analytics & Ads
  googleAnalyticsId String?              # "G-XXXXXXXXXX"
  googleAdsenseCode String?  @db.Text    # Code AdSense complet (header)

  # Reseaux Sociaux & Open Graph
  ogImage           String?              # URL image OG par defaut (upload)
  ogType            String?  @default("website")
  facebookUrl       String?              # URL page Facebook
  instagramUrl      String?              # URL profil Instagram
  twitterUrl        String?              # URL profil Twitter/X
  youtubeUrl        String?              # URL chaine YouTube
  tiktokUrl         String?              # URL profil TikTok
  linkedinUrl       String?              # URL page LinkedIn

  updatedAt         DateTime @updatedAt
}
```

- Seed : creer la ligne singleton avec les valeurs actuelles du site (copiees depuis `layout.tsx`)

### 7.1 - Page Parametres (`/parametres`)

Page organisee en **onglets** (Tabs shadcn) :

#### Onglet 1 : Profil Admin
- Nom, email de l'admin connecte
- Changer le mot de passe (ancien + nouveau + confirmation)
- Liste des autres admins (si multi-admin) avec possibilite d'en creer

#### Onglet 2 : General
| Champ | Type |
|-------|------|
| Titre du site | Input text |
| Description du site | Textarea |
| Favicon | Upload image + preview |
| Logo du site | Upload image + preview |

#### Onglet 3 : SEO & Indexation
| Champ | Type |
|-------|------|
| Meta Title (homepage) | Input text |
| Meta Description (homepage) | Textarea |
| Bloquer l'indexation | Switch (on/off) → genere `<meta name="robots" content="noindex,nofollow">` |
| Schema.org JSON-LD | Textarea code (monospace) |

#### Onglet 4 : Analytics & Publicite
| Champ | Type |
|-------|------|
| Google Analytics ID | Input text (placeholder: G-XXXXXXXXXX) |
| Code AdSense (header) | Textarea code (monospace, multi-lignes) |

#### Onglet 5 : Reseaux Sociaux & Open Graph
| Champ | Type |
|-------|------|
| Image Open Graph | Upload image + preview |
| Type OG | Select (website, article) |
| Facebook | Input URL |
| Instagram | Input URL |
| Twitter/X | Input URL |
| YouTube | Input URL |
| TikTok | Input URL |
| LinkedIn | Input URL |

#### Onglet 6 : Export
- Export CSV des annonces (filtrable par categorie, statut)
- Export CSV des utilisateurs
- Export CSV des marques/modeles

### 7.2 - API

```
GET    /api/config              # Lire la config du site
PATCH  /api/config              # Modifier la config
GET    /api/admin/me            # Profil admin connecte
PATCH  /api/admin/me            # Modifier profil admin
POST   /api/admin/admins        # Creer un autre admin
GET    /api/admin/admins        # Liste des admins
DELETE /api/admin/admins/[id]   # Supprimer un admin
GET    /api/export/listings     # Export CSV annonces
GET    /api/export/users        # Export CSV utilisateurs
GET    /api/export/brands       # Export CSV marques
```

---

## Structure finale du projet

```
voito-admin/
  app/
    layout.tsx                      # Root layout (sidebar + header + auth check)
    page.tsx                        # Dashboard
    connexion/page.tsx              # Login admin
    automobiles/
      page.tsx                      # Liste annonces VOITURES
      [id]/page.tsx                 # Detail/edit annonce
    motos/
      page.tsx                      # Liste annonces MOTOS
      [id]/page.tsx                 # Detail/edit annonce
    pieces/
      page.tsx                      # Liste annonces PIECES
      [id]/page.tsx                 # Detail/edit annonce
    utilisateurs/
      page.tsx                      # Liste utilisateurs
      [id]/page.tsx                 # Detail utilisateur
    marques/
      page.tsx                      # Liste marques
      [id]/page.tsx                 # Detail/edit marque
      nouveau/page.tsx              # Nouvelle marque
    modeles/
      page.tsx                      # Liste modeles
      [id]/page.tsx                 # Detail/edit modele
      nouveau/page.tsx              # Nouveau modele
    villes/
      page.tsx                      # Liste villes
      [id]/page.tsx                 # Detail ville
      nouveau/page.tsx              # Nouvelle ville
    parametres/
      page.tsx                      # Parametres (onglets: Profil, General, SEO, Analytics, Sociaux, Export)
    api/
      auth/login/route.ts          # POST login
      auth/logout/route.ts         # POST logout
      auth/me/route.ts             # GET admin courant
      stats/route.ts               # GET dashboard stats
      listings/route.ts            # GET liste
      listings/[id]/route.ts       # GET, PATCH, DELETE
      users/route.ts               # GET liste
      users/[id]/route.ts          # GET, DELETE
      brands/route.ts              # GET, POST
      brands/[id]/route.ts         # PATCH, DELETE
      brands/[id]/models/route.ts  # GET modeles
      models/route.ts              # POST
      models/[id]/route.ts         # PATCH, DELETE
      cities/route.ts              # GET, POST
      cities/[id]/route.ts         # GET, PATCH, DELETE
      config/route.ts              # GET, PATCH (SiteConfig singleton)
      admin/me/route.ts            # GET, PATCH (profil admin connecte)
      admin/admins/route.ts        # GET, POST (liste/creer admins)
      admin/admins/[id]/route.ts   # DELETE (supprimer admin)
      export/listings/route.ts     # GET (CSV annonces)
      export/users/route.ts        # GET (CSV utilisateurs)
      export/brands/route.ts       # GET (CSV marques)
  components/
    sidebar.tsx                     # Sidebar navigation (9 items)
    header.tsx                      # Header admin
    stats-card.tsx                  # Carte KPI dashboard
    data-table.tsx                  # Tableau generique (tri, pagination)
    listings-table.tsx              # Tableau annonces reutilisable (colonnes adaptees par categorie)
    listing-detail.tsx              # Detail annonce reutilisable
    brand-form.tsx                  # Formulaire marque (SEO + contenu riche + logo)
    model-form.tsx                  # Formulaire modele (SEO + contenu riche + logo)
    city-form.tsx                   # Formulaire ville (SEO + contenu riche, sans logo)
    rich-editor.tsx                 # Wrapper React-Quill (editeur WYSIWYG)
    image-upload.tsx                # Upload image avec preview + suppression
    ui/                             # shadcn/ui components
  lib/
    db.ts                           # Singleton Prisma Client
    auth.ts                         # verifyAdmin(), signToken(), etc.
    utils.ts                        # cn() etc.
  prisma/
    schema.prisma                   # Schema complet (meme BDD + table Admin)
  middleware.ts                     # Protection JWT toutes routes
  .env                              # DATABASE_URL, JWT_SECRET
```

---

## Variables d'environnement

```env
DATABASE_URL=mysql://...           # Meme URL que voito
JWT_SECRET=...                     # Secret pour signer les tokens admin
NEXT_PUBLIC_SITE_URL=https://voito.info  # Lien retour vers le site
```

---

## Ordre d'implementation

| Etape | Description | Effort |
|-------|-------------|--------|
| 1 | Init projet + deps + theme | Leger |
| 2 | Schema Prisma + migration (table Admin) | Leger |
| 3 | Auth (login, JWT, middleware, cookie) | Moyen |
| 4 | Layout (sidebar, header, page connexion) | Moyen |
| 5 | Dashboard + API stats | Moyen |
| 6 | CRUD Automobiles (API + pages) | Moyen |
| 7 | CRUD Motos (reutilise composants etape 6) | Leger |
| 8 | CRUD Pieces (reutilise composants etape 6) | Leger |
| 9 | CRUD Utilisateurs (API + pages) | Moyen |
| 10 | CRUD Marques (API + pages + editeur riche) | Moyen |
| 11 | CRUD Modeles (API + pages, meme formulaire que marques) | Moyen |
| 12 | CRUD Villes (API + pages, reutilise editeur riche) | Leger |
| 13 | Schema SiteConfig + seed | Leger |
| 14 | Parametres : onglet Profil Admin | Leger |
| 15 | Parametres : onglets General + SEO + Indexation | Moyen |
| 16 | Parametres : onglets Analytics + Reseaux Sociaux | Leger |
| 17 | Parametres : onglet Export CSV | Leger |

Etapes 6-7-8 sont quasi identiques (meme composant DataTable, juste le filtre categorie change). Etapes 9, 10, 11 peuvent etre parallelisees.

---

## Ce qu'on ne touche PAS sur voito.info

Le site principal reste intact. On ajoute seulement la table `Admin` dans la BDD partagee. Aucune modification du code de voito/.
