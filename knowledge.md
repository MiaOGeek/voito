# Voito - Knowledge Base

## Vue d'ensemble

**Voito** est une plateforme de petites annonces automobiles en Tunisie. Les utilisateurs peuvent publier, rechercher et consulter des annonces de voitures, motos et pieces detachees d'occasion. Le site est entierement en francais, cible le marche tunisien (villes tunisiennes, prix en TND, numeros +216).

## Stack technique

| Couche       | Technologie                                      |
|--------------|--------------------------------------------------|
| Framework    | **Next.js 14** (App Router, `force-dynamic`)     |
| Langage      | TypeScript                                       |
| Base de donnees | **PostgreSQL** via **Prisma 6.7**              |
| Auth         | **NextAuth 4** (Credentials provider, JWT)       |
| Stockage fichiers | **AWS S3** (presigned URLs, uploads publics) |
| UI           | **Tailwind CSS 3** + **shadcn/ui** (Radix)       |
| Animations   | **Framer Motion**                                |
| Notifications| **Sonner** (toasts)                              |
| Email        | **Nodemailer** + Abacus.ai notification API      |
| Deploiement  | Cible Linux ARM64 (Ubuntu)                       |

## Architecture du projet

```
voito/
  app/                          # Next.js App Router
    layout.tsx                  # Layout global (Header + Footer + Providers)
    providers.tsx               # SessionProvider + ThemeProvider (dark force)
    globals.css                 # Theme industriel/metallic, couleurs CSS vars
    voitures/page.tsx           # Liste voitures (SSR + filtres)
    motos/page.tsx              # Liste motos (SSR + filtres)
    pieces/page.tsx             # Liste pieces detachees (SSR + filtres)
    voitures-occasion-tunis/    # Landing page SEO pour "voitures occasion Tunis"
    annonces/[id]/page.tsx      # Detail d'une annonce (client-side fetch)
    connexion/page.tsx          # Page de connexion
    inscription/page.tsx        # Page d'inscription
    publier/page.tsx            # Page intermediaire (non-connecte -> choix login/signup)
    deposer/page.tsx            # Formulaire de depot d'annonce (protege)
    mes-annonces/page.tsx       # Gestion des annonces de l'utilisateur
    api/
      auth/[...nextauth]/       # NextAuth handler
      auth/verify-email/        # Verification email via token
      signup/                   # Inscription (POST)
      listings/                 # CRUD annonces (GET paginee, POST creation)
      listings/[id]/            # GET/PATCH/DELETE annonce individuelle
      listings/[id]/contact/    # Formulaire de contact vendeur (email)
      brands/                   # Liste marques + modeles
      upload/presigned/         # Generation URL presignee S3
      upload/complete/          # Finalisation upload + retour URL publique
      user/check-email-verified/# Verification statut email utilisateur
  components/
    header.tsx                  # Navigation principale (responsive, mobile menu)
    footer.tsx                  # Pied de page
    search-filters.tsx          # Filtres de recherche (marque, modele, ville, prix, etc.)
    listing-card.tsx            # Carte d'annonce (image S3 + infos)
    listing-grid.tsx            # Grille de cartes d'annonces
    contact-form.tsx            # Formulaire de contact vendeur
    image-upload.tsx            # Upload multiple d'images vers S3
    theme-provider.tsx          # next-themes wrapper
    ui/                         # Composants shadcn/ui (button, card, dialog, etc.)
  lib/
    db.ts                       # Singleton Prisma Client
    auth-options.ts             # Config NextAuth (Credentials, JWT, PrismaAdapter)
    s3.ts                       # Helpers S3 (presigned upload, getFileUrl, deleteFile)
    aws-config.ts               # S3Client factory + bucket config
    mail.ts                     # Envoi email verification (nodemailer)
    types.ts                    # Types Expense (semble legacy/inutilise)
    utils.ts                    # Utilitaires (cn, etc.)
  prisma/
    schema.prisma               # Schema BDD
  scripts/
    seed.ts                     # Seed BDD (marques, modeles, user test)
  public/
    favicon.svg, og-image.png, robots.txt
```

## Modele de donnees (Prisma)

### Entites principales

- **User** : id, name, email (unique), password (hashed bcrypt), phone, emailVerified, image
- **Brand** : id, name (unique), slug (unique) -- ex: Volkswagen, Peugeot, Renault...
- **Model** : id, name, brandId -- ex: Golf, 208, Clio... (unique par marque)
- **Listing** : id, title, description, category (VOITURES|MOTOS|PIECES), price, year, mileage, fiscalPower, fuelType (ESSENCE|DIESEL|HYBRIDE|ELECTRIQUE|GPL), transmission (MANUELLE|AUTOMATIQUE), city, images[] (S3 paths), brandId?, modelId?, userId, status (ACTIVE|INACTIVE|SOLD)
- **Message** : id, content, senderId, receiverId, listingId, read
- **Account/Session/VerificationToken** : Tables NextAuth standard

### Relations

- User -> Listings (1:N)
- User -> Messages sent/received (1:N chaque)
- Brand -> Models (1:N)
- Brand -> Listings (1:N optionnel)
- Model -> Listings (1:N optionnel)
- Listing -> Messages (1:N) -- Note: relation definie dans schema mais model Message non utilise dans les routes API (le contact passe par email direct)

### Index

- Listing : category, city, brandId, status, createdAt

## Flux utilisateur

### Inscription & Connexion
1. `/inscription` : Formulaire (nom, email, tel, mot de passe) -> `POST /api/signup` -> creation user + auto-login via NextAuth
2. `/connexion` : Email + mot de passe -> `signIn("credentials")` -> JWT
3. Verification email : `POST /api/signup` devrait envoyer un email de verification (import present mais non appele dans le code actuel -- **bug potentiel**)
4. Verification : `GET /api/auth/verify-email?token=...` -> marque emailVerified -> redirige `/deposer`

### Publication d'annonce
1. Non connecte : `/publier` -> choix inscription ou connexion (callback vers `/deposer`)
2. Connecte : `/deposer` -> verification email obligatoire -> formulaire complet
3. Upload images : presigned URL S3 -> upload direct client -> finalisation
4. Soumission : `POST /api/listings` -> creation en BDD (verifie auth + email verifie)

### Recherche & Consultation
1. Pages liste (`/voitures`, `/motos`, `/pieces`) : SSR avec Prisma, filtres via searchParams
2. Filtres : marque, modele, ville, prix min/max, annee min/max, kilometrage min/max, puissance fiscale
3. Detail annonce : `/annonces/[id]` -> fetch client-side -> galerie images + infos + contact
4. Contact vendeur : formulaire -> `POST /api/listings/[id]/contact` -> email via Abacus.ai API

### Gestion annonces
1. `/mes-annonces` : liste des annonces de l'utilisateur connecte
2. Toggle statut ACTIVE/INACTIVE : `PATCH /api/listings/[id]`
3. Suppression : `DELETE /api/listings/[id]` (supprime aussi images S3)

## Design & Theme

- **Theme force : Dark** (pas de toggle light/dark)
- **Palette** :
  - Primary : Orange industriel (`hsl(24 95% 53%)` ~ `#f97316`)
  - Secondary : Bleu electrique (`hsl(217 91% 60%)` ~ `#3b82f6`)
  - Background : Gris tres fonce (`hsl(240 10% 3.9%)`)
  - Foreground : Blanc (`hsl(0 0% 98%)`)
- **Style** : Industriel/metallic avec texture "brushed aluminum"
- **Classes custom** : `metallic-bg`, `card-metallic`, `switch-industrial`, `font-industrial`, `text-glow-orange`, `border-glow-blue`
- **Composants UI** : shadcn/ui complet (accordion, dialog, dropdown, etc.)

## Donnees de seed

15 marques automobiles avec 4-5 modeles chacune (Volkswagen, Peugeot, Renault, Toyota, BMW, Mercedes, Audi, Fiat, Hyundai, Kia, Nissan, Mazda, Honda, Ford, Citroen). Un utilisateur test : `john@doe.com` / `johndoe123`.

24 villes tunisiennes : Tunis, Ariana, Ben Arous, Manouba, Nabeul, Zaghouan, Bizerte, Beja, Jendouba, Kef, Siliana, Sousse, Monastir, Mahdia, Sfax, Kairouan, Kasserine, Sidi Bouzid, Gabes, Medenine, Tataouine, Gafsa, Tozeur, Kebili.

## Services externes

- **AWS S3** : Stockage images (presigned upload + URLs publiques)
- **Abacus.ai** : Envoi d'emails de notification (contact vendeur) + chatbot integre dans le layout (`appllm-lib.js`)
- **Nodemailer** : Envoi email de verification de compte

## Variables d'environnement requises

- `DATABASE_URL` : URL PostgreSQL
- `NEXTAUTH_SECRET` : Secret JWT
- `NEXTAUTH_URL` : URL de base de l'app
- `AWS_REGION`, `AWS_BUCKET_NAME`, `AWS_FOLDER_PREFIX` : Config S3
- `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_FROM` : Config SMTP
- `ABACUSAI_API_KEY`, `WEB_APP_ID`, `NOTIF_ID_CONTACT_VENDEUR` : Config Abacus.ai

## Points d'attention / Bugs potentiels

1. **Email de verification non envoye a l'inscription** : `lib/mail.ts` importe `sendVerificationEmail` et `app/api/signup/route.ts` l'importe aussi, mais ne l'appelle jamais. Le VerificationToken n'est jamais cree non plus. L'utilisateur ne peut donc pas verifier son email et donc pas publier d'annonce (sauf insertion manuelle en BDD).

2. **`lib/types.ts` legacy** : Contient des types `Expense`/`ExpenseFormData` qui n'ont rien a voir avec le projet automobile. Probablement un reste d'un autre projet.

3. **`image-upload.tsx` utilise `useState` au lieu de `useEffect`** (ligne 25) : `useState(() => { ... })` est utilise comme initializer mais contient des side effects (appels reseau). Devrait etre un `useEffect`.

4. **Filtrage client-side dans mes-annonces** : La page `/mes-annonces` fetch toutes les annonces actives puis filtre cote client par userId. Devrait utiliser un parametre API pour ne recuperer que les annonces de l'utilisateur.

5. **Pas de pagination front-end** : L'API listings supporte la pagination mais aucune page ne l'utilise. Les pages SSR (`/voitures`, `/motos`, `/pieces`) fetchent toutes les annonces sans limit.

6. **Model `Message` non utilise** : Le schema Prisma definit un modele Message avec relations, mais le contact vendeur passe par email direct (Abacus.ai API). Aucune route API n'utilise ce modele.

7. **`Listing` n'a pas de relation `messages`** : Le schema definit `Message.listingId` mais `Listing` ne declare pas la relation inverse, ce qui pourrait causer des erreurs Prisma.

8. **Prisma output path code en dur** : `schema.prisma` a un output path `/home/ubuntu/voito/nextjs_space/node_modules/.prisma/client` qui ne fonctionnera pas sur d'autres environnements.
