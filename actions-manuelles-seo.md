# Actions manuelles SEO — Voito

## Google My Business

1. Aller sur https://business.google.com
2. Créer une fiche "Voito" — catégorie "Service de petites annonces" ou "Concessionnaire automobile en ligne"
3. Renseigner : nom, site web (voito.info), description, pays (Tunisie), horaires
4. Ajouter le logo + captures d'écran du site
5. Valider la fiche (code de vérification par courrier postal ou téléphone)

**Impact :** Apparition dans les résultats locaux Google Maps + Knowledge Panel.

---

## Backlinks — Annuaires tunisiens

| Type | Exemples | Action |
|------|----------|--------|
| Annuaires entreprises TN | Pages Jaunes Tunisie, Tunisie Index | Inscription gratuite |
| Annuaires auto | Sites de référencement auto en Tunisie | Inscription + lien retour |
| Réseaux sociaux | Facebook, Instagram, LinkedIn, TikTok | Créer les pages + lien vers voito.info |
| Forums auto tunisiens | Forums communautaires auto | Participer + signature avec lien |
| Presse / blogs | Sites d'actualité tunisiens | Communiqué de presse ou article invité |

**Conseils :**
- Prioriser les annuaires avec un bon Domain Authority
- Toujours utiliser l'URL complète `https://voito.info`
- Varier les ancres de liens : "voitures occasion tunisie", "Voito", "petites annonces auto"
- Les réseaux sociaux comptent comme backlinks (même en nofollow)

**Note :** Une fois les pages sociales créées, ajouter les URLs dans le back-office admin (Paramètres > Réseaux Sociaux). Le footer les affiche automatiquement.

---

## Google Search Console

### Étape 1 : Créer la propriété

1. Aller sur https://search.google.com/search-console
2. Cliquer sur "Ajouter une propriété"
3. Choisir **"Propriété de domaine"** → saisir `voito.info`
   - Ou choisir **"Préfixe d'URL"** → saisir `https://voito.info`
4. Vérifier la propriété (méthode au choix) :
   - **Enregistrement DNS TXT** (recommandé pour propriété de domaine) : ajouter le TXT fourni par Google dans la zone DNS du domaine
   - **Balise meta HTML** : Google fournit une balise `<meta name="google-site-verification" content="xxx">` à ajouter dans le `<head>` du site
   - **Fichier HTML** : uploader un fichier `googleXXXX.html` dans `public/`

### Étape 2 : Soumettre le sitemap

1. Dans Search Console → menu "Sitemaps"
2. Saisir `sitemap.xml` et cliquer "Envoyer"
3. Google va crawler le sitemap et commencer l'indexation

### Étape 3 : Demander l'indexation des pages prioritaires

Dans Search Console → "Inspection d'URL", soumettre manuellement :
- `https://voito.info`
- `https://voito.info/voitures`
- `https://voito.info/motos`
- `https://voito.info/pieces`
- `https://voito.info/voitures/guides-achat`
- `https://voito.info/voitures/financement`
- `https://voito.info/motos/guides`
- `https://voito.info/pieces/guides`

### Étape 4 : Suivi régulier

- **Performances** : suivre les impressions, clics, CTR et position moyenne par page
- **Couverture** : vérifier les erreurs d'indexation (pages exclues, erreurs 404, redirections)
- **Core Web Vitals** : surveiller LCP, FID/INP et CLS
- **Liens** : voir les backlinks détectés par Google

### Régénérer le sitemap

Le sitemap se régénère automatiquement à chaque accès (`/sitemap.xml`).

Pour forcer la régénération + notifier Google et Bing, accéder à :

```
https://voito.info/api/revalidate-sitemap?secret=VOTRE_SECRET
```

`VOTRE_SECRET` = la valeur de `REVALIDATION_SECRET` dans le `.env` de voito.

Réponse attendue :
```json
{
  "revalidated": true,
  "pings": [
    { "engine": "Google", "ok": true },
    { "engine": "Bing", "ok": true }
  ],
  "sitemapUrl": "https://voito.info/sitemap.xml"
}
```
