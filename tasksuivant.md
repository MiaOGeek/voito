# Tâches suivantes

## Bug trouvé dans l'admin

- **Bug** : `City.indexable` ignoré à la création
- **Fichier** : `voito-admin/app/api/cities/route.ts` (POST)
- **Détail** : Le champ `indexable` n'est pas extrait du body et pas passé à `prisma.city.create()`. Il fonctionne en PATCH (édition) mais pas en POST (création). Les nouvelles villes prennent la valeur par défaut Prisma.
