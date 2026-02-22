const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const citiesSeo = [
  {
    slug: "tunis",
    metaTitle: "Annonces voitures occasion Tunis — Vente entre particuliers | Voito",
    metaDesc: "Parcourez les meilleures offres de voitures, motos et pièces détachées d'occasion à Tunis. Petites annonces entre particuliers, prix en TND. Trouvez votre véhicule sur Voito.",
    h2Top: "Offres de véhicules d'occasion à Tunis",
    descriptionTop: "Tunis, capitale et premier bassin automobile du pays, concentre le plus grand nombre d'annonces de véhicules d'occasion en Tunisie. Que vous habitiez la Marsa, le Bardo, l'Ariana ou le centre-ville, Voito rassemble des milliers d'offres à portée de main : berlines, citadines, SUV, utilitaires, scooters et motos. Chaque annonce est déposée par un particulier, sans intermédiaire ni commission — vous négociez directement avec le vendeur. Consultez les prix affichés en dinars tunisiens, comparez les kilométrages et contactez le propriétaire via notre formulaire sécurisé.",
    h2Bottom: "Acheter ou vendre un véhicule d'occasion à Tunis",
    descriptionBottom: "La vente entre particuliers à Tunis n'a jamais été aussi simple. Publiez gratuitement votre annonce auto avec photos illimitées et touchez des acheteurs dans tout le Grand Tunis. Vous cherchez une occaz fiable ? Filtrez par marque, modèle, année, kilométrage ou budget pour dénicher la bonne affaire sans perdre de temps. Voito facilite la mise en relation directe entre vendeurs et acheteurs tunisois, sans frais cachés.",
  },
  {
    slug: "ariana",
    metaTitle: "Voitures occasion Ariana — Annonces particuliers | Voito",
    metaDesc: "Annonces de voitures et motos d'occasion à Ariana. Offres entre particuliers, prix en dinars. Achetez ou vendez votre véhicule facilement sur Voito.",
    h2Top: "Annonces auto et moto d'occasion à Ariana",
    descriptionTop: "L'Ariana, gouvernorat résidentiel aux portes de Tunis, attire de nombreux acheteurs et vendeurs de véhicules d'occasion. Sur Voito, retrouvez des annonces déposées par des particuliers de Soukra, Raoued, la Cité Ennasr ou Mnihla. Berlines familiales, petites citadines économiques, SUV pour les sorties du week-end ou motos urbaines : l'offre est variée et les prix restent compétitifs. Chaque fiche détaille le kilométrage réel, la puissance fiscale et le type de carburant pour vous aider à faire le bon choix.",
    h2Bottom: "Vente directe entre particuliers à Ariana",
    descriptionBottom: "Vendez votre voiture à Ariana sans passer par un intermédiaire. Déposez votre annonce gratuitement, ajoutez vos photos et recevez des propositions d'acheteurs locaux. Côté acheteur, profitez d'offres négociables directement avec le propriétaire : pas de marge concessionnaire, pas de frais de dossier. Voito met en relation les habitants de l'Ariana pour des transactions automobiles simples et transparentes.",
  },
  {
    slug: "ben-arous",
    metaTitle: "Annonces véhicules occasion Ben Arous — Particuliers | Voito",
    metaDesc: "Trouvez votre prochaine voiture ou moto d'occasion à Ben Arous. Annonces entre particuliers, offres vérifiées, prix en TND sur Voito.",
    h2Top: "Véhicules d'occasion à Ben Arous et banlieue sud",
    descriptionTop: "Ben Arous, pôle économique de la banlieue sud de Tunis, regorge d'opportunités pour acheter un véhicule d'occasion. Les habitants d'Ezzahra, Hammam Lif, Radès ou Mourouj publient régulièrement sur Voito des annonces de voitures, motos et pièces détachées. Vous y trouverez aussi bien des utilitaires pour les professionnels que des citadines idéales pour les trajets quotidiens vers la capitale. Les annonces précisent systématiquement le prix en dinars, l'état du véhicule et les coordonnées du vendeur particulier.",
    h2Bottom: "Achetez malin à Ben Arous",
    descriptionBottom: "Pourquoi payer le prix fort chez un revendeur quand vous pouvez traiter directement avec le propriétaire ? À Ben Arous, Voito facilite la vente de particulier à particulier sans commission. Déposez votre offre en quelques minutes ou explorez les annonces disponibles dans votre quartier. Filtrez par budget, marque ou kilométrage pour repérer rapidement la bonne occaz.",
  },
  {
    slug: "manouba",
    metaTitle: "Voitures occasion Manouba — Offres entre particuliers | Voito",
    metaDesc: "Petites annonces véhicules d'occasion à Manouba. Voitures, motos, pièces — vente directe entre particuliers sur Voito.",
    h2Top: "Petites annonces véhicules à Manouba",
    descriptionTop: "Le gouvernorat de la Manouba, à l'ouest du Grand Tunis, abrite une communauté active d'acheteurs et de vendeurs de véhicules d'occasion. Sur Voito, les habitants de Douar Hicher, Oued Ellil, Tébourba ou Den Den publient des annonces variées : voitures de tourisme, utilitaires légers, deux-roues et pièces de rechange. Les prix sont fixés librement par les particuliers et affichés en TND, sans surprise. Parcourez les fiches détaillées avec photos pour repérer l'offre qui correspond à votre budget.",
    h2Bottom: "Vendez rapidement votre véhicule à Manouba",
    descriptionBottom: "Vous souhaitez vendre votre voiture à Manouba ? Créez votre annonce gratuite sur Voito en moins de cinq minutes. Ajoutez des photos sous plusieurs angles, indiquez le kilométrage et le prix souhaité. Les acheteurs de la région vous contacteront directement — aucun frais, aucune commission. La vente entre particuliers reste le moyen le plus économique de céder ou d'acquérir un véhicule dans le gouvernorat de la Manouba.",
  },
  {
    slug: "nabeul",
    metaTitle: "Annonces voitures occasion Nabeul & Hammamet | Voito",
    metaDesc: "Offres de véhicules d'occasion à Nabeul, Hammamet et Cap Bon. Vente entre particuliers, prix en dinars. Annonces auto sur Voito.",
    h2Top: "Marché auto d'occasion à Nabeul et au Cap Bon",
    descriptionTop: "Le Cap Bon est l'une des régions les plus dynamiques de Tunisie pour le marché de l'occasion. Entre Nabeul, Hammamet, Kélibia, Korba et Grombalia, les particuliers vendent et achètent des voitures toute l'année. Sur Voito, retrouvez un large choix de véhicules : des citadines compactes pour circuler dans les ruelles du centre-ville, des berlines pour les longs trajets vers Tunis, ou des SUV adaptés aux pistes agricoles du Cap Bon. Chaque annonce est publiée par un particulier local avec prix en TND et photos.",
    h2Bottom: "Vente auto entre particuliers à Nabeul",
    descriptionBottom: "Acheter entre particuliers à Nabeul, c'est éviter les frais de concession et négocier le juste prix. Voito connecte vendeurs et acheteurs du gouvernorat sans intermédiaire. Publiez votre annonce avec toutes les informations essentielles — marque, modèle, année, kilométrage, carburant — et laissez les intéressés venir à vous. La plateforme est gratuite et vos coordonnées restent protégées jusqu'à ce que vous décidiez de les partager.",
  },
  {
    slug: "bizerte",
    metaTitle: "Voitures occasion Bizerte — Vente particulier | Voito",
    metaDesc: "Découvrez les annonces de voitures et motos d'occasion à Bizerte. Vente directe entre particuliers, prix en TND. Offres sur Voito.",
    h2Top: "Annonces véhicules d'occasion à Bizerte",
    descriptionTop: "Port méditerranéen au nord de la Tunisie, Bizerte dispose d'un marché automobile d'occasion bien fourni. Les résidents de Bizerte-ville, Menzel Bourguiba, Mateur, Ras Jebel ou Sejnane déposent chaque semaine de nouvelles annonces sur Voito. Des voitures compactes aux pick-up robustes, en passant par les motos et les pièces détachées, vous trouverez forcément l'offre adaptée à vos besoins et à votre budget. Tous les prix sont en dinars tunisiens, fixés par le vendeur particulier.",
    h2Bottom: "Trouvez la bonne occaz à Bizerte",
    descriptionBottom: "Plutôt que de parcourir les marchés de voitures en plein air, consultez les annonces de Bizerte depuis chez vous. Voito vous permet de filtrer par prix, marque, année ou kilométrage pour cibler rapidement les meilleures opportunités. Vendeurs, publiez gratuitement votre offre et touchez des acheteurs dans tout le gouvernorat. La vente entre particuliers à Bizerte passe désormais par le digital.",
  },
  {
    slug: "beja",
    metaTitle: "Annonces auto occasion Béja — Particuliers | Voito",
    metaDesc: "Achetez ou vendez votre véhicule d'occasion à Béja. Annonces entre particuliers, offres auto et moto, prix en dinars sur Voito.",
    h2Top: "Véhicules d'occasion à Béja",
    descriptionTop: "Béja, cœur agricole du nord-ouest tunisien, possède un marché de l'occasion tourné vers les véhicules pratiques et robustes. Sur Voito, les particuliers de Béja, Medjez el-Bab, Nefza et Testour proposent des utilitaires, des voitures diesel économiques et des motos tout-terrain. Chaque annonce affiche clairement le prix en TND, le kilométrage, l'année de mise en circulation et le type de carburant. Vous pouvez contacter directement le propriétaire sans passer par un revendeur.",
    h2Bottom: "Déposez votre annonce auto à Béja",
    descriptionBottom: "Vendre un véhicule à Béja n'a jamais été aussi simple. Inscrivez-vous sur Voito, remplissez votre annonce avec les détails techniques et ajoutez vos photos. Votre offre sera visible par les acheteurs de tout le gouvernorat et au-delà. Pas de commission, pas d'abonnement : la plateforme est entièrement gratuite pour les particuliers.",
  },
  {
    slug: "jendouba",
    metaTitle: "Voitures occasion Jendouba — Offres particuliers | Voito",
    metaDesc: "Petites annonces véhicules d'occasion à Jendouba. Voitures, motos et pièces entre particuliers, prix TND. Trouvez votre offre sur Voito.",
    h2Top: "Offres auto d'occasion à Jendouba",
    descriptionTop: "Située à l'extrême nord-ouest de la Tunisie, Jendouba est une ville où la voiture reste indispensable au quotidien. Sur Voito, les vendeurs particuliers de Jendouba, Tabarka, Aïn Draham, Ghardimaou et Bou Salem publient des annonces de véhicules d'occasion adaptés aux routes de la région : berlines, 4x4, utilitaires et motos. Les prix en dinars sont fixés directement par le propriétaire, ce qui ouvre la porte à la négociation.",
    h2Bottom: "Achetez votre véhicule à Jendouba sans intermédiaire",
    descriptionBottom: "Trouver une bonne occaz à Jendouba est désormais possible sans se déplacer au souk hebdomadaire. Consultez les annonces sur Voito, comparez les offres et contactez le vendeur en toute sécurité. Vous vendez ? Publiez gratuitement votre annonce et recevez des messages d'acheteurs intéressés dans la région.",
  },
  {
    slug: "le-kef",
    metaTitle: "Annonces véhicules occasion Le Kef | Voito",
    metaDesc: "Vente de voitures et motos d'occasion au Kef. Annonces entre particuliers, prix négociables en TND. Consultez les offres sur Voito.",
    h2Top: "Annonces auto et moto au Kef",
    descriptionTop: "Perché dans les hauteurs du nord-ouest tunisien, le gouvernorat du Kef possède un marché automobile d'occasion modeste mais actif. Les particuliers de la ville du Kef, Dahmani, Tajerouine ou Nebeur y proposent des véhicules robustes adaptés au relief : berlines diesel, 4x4, pick-up et motos trail. Chaque annonce Voito inclut le prix en TND, les caractéristiques techniques et les photos du véhicule pour que vous puissiez évaluer l'offre avant de vous déplacer.",
    h2Bottom: "Vendez ou achetez au Kef en toute simplicité",
    descriptionBottom: "Au Kef, la vente de particulier à particulier reste la solution la plus courante pour changer de véhicule. Voito digitalise cette pratique : déposez votre annonce gratuitement, précisez vos conditions et laissez les acheteurs vous contacter. Côté acheteur, filtrez les résultats par prix et kilométrage pour repérer l'offre qui correspond à vos attentes.",
  },
  {
    slug: "siliana",
    metaTitle: "Voitures occasion Siliana — Annonces particuliers | Voito",
    metaDesc: "Trouvez des voitures et motos d'occasion à Siliana. Offres de particuliers, prix TND, annonces vérifiées sur Voito.",
    h2Top: "Marché automobile d'occasion à Siliana",
    descriptionTop: "Siliana, gouvernorat du centre-nord tunisien, se distingue par un marché de l'occasion axé sur les véhicules pratiques et accessibles. Sur Voito, les vendeurs particuliers de Siliana, Makthar, Bargou et Gaâfour proposent des voitures économiques, des utilitaires adaptés aux activités agricoles et des motos pour les déplacements courts. Les annonces détaillent le kilométrage, l'année, le carburant et le prix demandé en dinars, sans frais cachés ni commission.",
    h2Bottom: "Publiez votre offre auto à Siliana",
    descriptionBottom: "Vendeur à Siliana ? Déposez votre annonce sur Voito en quelques clics. Indiquez la marque, le modèle, le prix et ajoutez des photos de votre véhicule. Votre offre apparaîtra dans les résultats de recherche des acheteurs du gouvernorat. C'est gratuit, rapide et sans engagement — la meilleure façon de vendre entre particuliers à Siliana.",
  },
  {
    slug: "sousse",
    metaTitle: "Annonces voitures occasion Sousse — Vente particulier | Voito",
    metaDesc: "Les meilleures offres de véhicules d'occasion à Sousse. Annonces entre particuliers, voitures, motos, pièces. Prix en TND sur Voito.",
    h2Top: "Véhicules d'occasion à Sousse et dans le Sahel",
    descriptionTop: "Troisième ville de Tunisie, Sousse est un carrefour automobile incontournable. Son marché de l'occasion brasse des milliers de transactions chaque année. Sur Voito, les particuliers de Sousse-ville, Msaken, Kalâa Kébira, Enfidha et Hammam Sousse publient des annonces de tous types : citadines pour la médina, berlines confortables, SUV familiaux, motos sportives et pièces de rechange. Les prix en dinars sont affichés sans ambiguïté et les photos permettent d'évaluer l'état réel du véhicule.",
    h2Bottom: "Achetez et vendez à Sousse sans commission",
    descriptionBottom: "Sousse regorge de bonnes affaires automobiles et Voito vous les rend accessibles en quelques clics. Filtrez les annonces par marque, prix, kilométrage ou type de carburant pour trouver exactement ce que vous cherchez. Vendeurs, profitez de la visibilité gratuite pour toucher des acheteurs dans tout le Sahel. La plateforme garantit un contact sécurisé entre les deux parties.",
  },
  {
    slug: "monastir",
    metaTitle: "Voitures occasion Monastir — Offres auto particuliers | Voito",
    metaDesc: "Annonces de véhicules d'occasion à Monastir et Moknine. Vente entre particuliers, offres auto et moto, prix TND sur Voito.",
    h2Top: "Petites annonces auto à Monastir",
    descriptionTop: "Monastir, ville côtière du Sahel tunisien, dispose d'un marché de l'occasion vivant et diversifié. Les résidents de Monastir, Moknine, Jemmal, Ksar Hellal et Sahline alimentent Voito en annonces de voitures compactes, berlines, utilitaires et deux-roues. Que vous cherchiez une première voiture abordable ou un modèle récent à prix réduit, vous trouverez des offres publiées directement par des particuliers du gouvernorat. Chaque annonce précise le prix en dinars, les spécifications du véhicule et inclut des photos.",
    h2Bottom: "Vendez votre véhicule à Monastir gratuitement",
    descriptionBottom: "Déposez votre annonce auto à Monastir sur Voito sans débourser un centime. Renseignez les caractéristiques de votre véhicule, fixez votre prix et attendez les contacts. Les acheteurs de Monastir et des villes voisines pourront vous écrire via le formulaire sécurisé. Vente directe, sans intermédiaire, sans délai.",
  },
  {
    slug: "mahdia",
    metaTitle: "Annonces véhicules occasion Mahdia | Voito",
    metaDesc: "Offres de voitures et motos d'occasion à Mahdia. Vente directe entre particuliers, annonces gratuites, prix en TND sur Voito.",
    h2Top: "Annonces véhicules d'occasion à Mahdia",
    descriptionTop: "Mahdia, joyau côtier du centre-est tunisien, accueille un marché de l'occasion discret mais régulier. Les particuliers de Mahdia, Ksour Essef, El Jem, Chebba et Bou Merdes y proposent des véhicules adaptés à la vie locale : voitures économiques, fourgonnettes pour le commerce, motos légères et pièces auto. Sur Voito, parcourez les offres récentes, consultez les prix en dinars et les photos, puis contactez le vendeur pour organiser une visite du véhicule.",
    h2Bottom: "Trouver une bonne affaire auto à Mahdia",
    descriptionBottom: "Les bonnes occaz ne manquent pas à Mahdia pour qui sait chercher. Voito centralise les annonces du gouvernorat et vous permet de comparer les offres en un coup d'œil. Vendeurs, faites connaître votre véhicule au-delà de votre quartier en publiant une annonce visible dans toute la région. Service gratuit, contact sécurisé, zéro commission.",
  },
  {
    slug: "sfax",
    metaTitle: "Annonces voitures occasion Sfax — Vente entre particuliers | Voito",
    metaDesc: "Découvrez les annonces auto d'occasion à Sfax. Vente entre particuliers, offres voitures, motos et pièces détachées. Prix en TND sur Voito.",
    h2Top: "Offres de véhicules d'occasion à Sfax",
    descriptionTop: "Deuxième ville de Tunisie et capitale économique du Sud, Sfax génère un volume considérable de transactions automobiles entre particuliers. Sur Voito, les Sfaxiens proposent un éventail complet de véhicules : berlines pour les professionnels, citadines pour les étudiants, SUV pour les familles, camionnettes pour les artisans et motos pour les trajets urbains. Les annonces couvrent Sfax-ville, Sakiet Ezzit, Sakiet Eddaïer, Thyna, Agareb et toutes les délégations du gouvernorat. Prix en dinars, photos et détails techniques sont disponibles sur chaque fiche.",
    h2Bottom: "Vendez votre véhicule à Sfax en toute confiance",
    descriptionBottom: "À Sfax, la vente auto entre particuliers est une tradition bien ancrée. Voito la modernise en offrant une plateforme gratuite où chaque annonce est structurée et consultable en ligne. Publiez votre offre, gérez vos contacts depuis votre espace personnel et concluez la vente à votre rythme. Les acheteurs sfaxiens apprécient la transparence des annonces Voito : prix clair, photos réelles, aucune mauvaise surprise.",
  },
  {
    slug: "kairouan",
    metaTitle: "Voitures occasion Kairouan — Offres particuliers | Voito",
    metaDesc: "Petites annonces auto d'occasion à Kairouan. Voitures, motos et pièces entre particuliers. Offres en TND sur Voito.",
    h2Top: "Marché auto d'occasion à Kairouan",
    descriptionTop: "Kairouan, ville sainte et carrefour du centre tunisien, héberge un marché de l'occasion tourné vers les véhicules fiables et économiques. Sur Voito, les vendeurs de Kairouan, Haffouz, Sbikha, Nasrallah et Oueslatia publient des annonces de berlines diesel, de voitures GPL, de motos et de pièces mécaniques. Chaque offre indique le prix en dinars, le kilométrage certifié par le compteur et le type de transmission. Comparez plusieurs annonces avant de contacter le propriétaire.",
    h2Bottom: "Achetez et vendez sans frais à Kairouan",
    descriptionBottom: "Finies les longues attentes au souk automobile. Consultez les annonces de Kairouan sur Voito depuis votre téléphone, repérez l'offre intéressante et prenez rendez-vous avec le vendeur. Vous mettez en vente ? Publiez gratuitement, décrivez honnêtement votre véhicule et recevez des propositions sérieuses d'acheteurs locaux.",
  },
  {
    slug: "kasserine",
    metaTitle: "Annonces auto occasion Kasserine — Particuliers | Voito",
    metaDesc: "Vente de véhicules d'occasion à Kasserine. Annonces entre particuliers, voitures et motos. Prix en dinars sur Voito.",
    h2Top: "Annonces véhicules d'occasion à Kasserine",
    descriptionTop: "Au cœur de la dorsale tunisienne, Kasserine possède un marché automobile tourné vers les véhicules solides et les petits budgets. Les particuliers de Kasserine, Sbeitla, Feriana, Foussana et Thélepte mettent en vente sur Voito des voitures diesel éprouvées, des pick-up pour les terrains accidentés et des motos utilitaires. Chaque annonce fournit le prix en TND, l'état général et des photos pour que vous puissiez évaluer le véhicule avant tout déplacement.",
    h2Bottom: "Publiez gratuitement à Kasserine",
    descriptionBottom: "Voito offre aux habitants de Kasserine un espace de vente auto entièrement gratuit. Déposez votre annonce en quelques minutes, précisez le prix et les caractéristiques, et attendez les contacts. Les acheteurs de la région consultent régulièrement la plateforme à la recherche de véhicules abordables. Vente directe, sans commission ni intermédiaire.",
  },
  {
    slug: "sidi-bouzid",
    metaTitle: "Voitures occasion Sidi Bouzid — Annonces | Voito",
    metaDesc: "Offres de véhicules d'occasion à Sidi Bouzid. Annonces auto entre particuliers, prix en dinars. Achetez ou vendez sur Voito.",
    h2Top: "Offres auto et moto à Sidi Bouzid",
    descriptionTop: "Sidi Bouzid, gouvernorat du centre-ouest tunisien, connaît une demande croissante en véhicules d'occasion abordables. Sur Voito, les résidents de Sidi Bouzid, Regueb, Meknassy, Jelma et Bir El Hafey proposent des voitures compactes, des utilitaires légers, des motos et des pièces de rechange à prix négociables. Les annonces sont rédigées par les propriétaires eux-mêmes, avec prix en dinars, photos et description détaillée du véhicule.",
    h2Bottom: "Vendez votre véhicule depuis Sidi Bouzid",
    descriptionBottom: "Pas besoin de vous rendre dans une grande ville pour vendre votre voiture. Publiez votre annonce sur Voito depuis Sidi Bouzid et soyez visible auprès des acheteurs de toute la région. L'inscription est rapide, la publication gratuite et le contact sécurisé. Les particuliers de Sidi Bouzid ont désormais leur plateforme de petites annonces auto.",
  },
  {
    slug: "gabes",
    metaTitle: "Annonces voitures occasion Gabès | Voito",
    metaDesc: "Trouvez des véhicules d'occasion à Gabès. Annonces auto et moto entre particuliers, offres en TND. Consultez Voito.",
    h2Top: "Véhicules d'occasion à Gabès",
    descriptionTop: "Gabès, porte du sud tunisien et oasis maritime, abrite un marché automobile actif alimenté par une population jeune et mobile. Sur Voito, les particuliers de Gabès, Mareth, El Hamma, Matmata et Ghannouch publient des annonces de voitures, motos et pièces détachées. Des citadines économiques aux véhicules tout-terrain adaptés aux pistes du sud, le choix est large et les prix restent accessibles. Chaque fiche d'annonce inclut le tarif en dinars, les caractéristiques et les photos du véhicule.",
    h2Bottom: "Acheter une occaz à Gabès",
    descriptionBottom: "Dénicher une bonne occasion à Gabès, c'est facile avec Voito. Parcourez les annonces, appliquez vos filtres et repérez le véhicule idéal. Vendeurs gabésiens, profitez de la visibilité de la plateforme pour toucher des acheteurs au-delà de votre ville. Publication gratuite, mise en relation sécurisée, négociation directe entre particuliers.",
  },
  {
    slug: "medenine",
    metaTitle: "Voitures occasion Médenine & Djerba — Particuliers | Voito",
    metaDesc: "Annonces de véhicules d'occasion à Médenine, Djerba et Zarzis. Vente entre particuliers, offres en TND sur Voito.",
    h2Top: "Annonces auto d'occasion à Médenine et Djerba",
    descriptionTop: "Le gouvernorat de Médenine englobe des zones à forte activité automobile : Médenine-ville, Djerba (Houmt Souk, Midoun), Zarzis et Ben Guerdane. Les résidents de la région utilisent Voito pour vendre et acheter des véhicules d'occasion en toute simplicité. Vous y trouverez des voitures de tourisme, des 4x4 pour les pistes sahariennes, des utilitaires commerciaux et des motos. Les prix sont fixés par les vendeurs particuliers en dinars tunisiens, sans marge intermédiaire.",
    h2Bottom: "Vendez et achetez sans intermédiaire à Médenine",
    descriptionBottom: "De Djerba à Ben Guerdane, la vente auto entre particuliers est une réalité quotidienne. Voito simplifie cette pratique en proposant un espace structuré où chaque annonce est claire et détaillée. Publiez votre offre gratuitement, recevez des contacts qualifiés et concluez votre transaction sans frais. Acheteurs, explorez les offres du sud-est tunisien depuis votre écran.",
  },
  {
    slug: "tataouine",
    metaTitle: "Annonces véhicules occasion Tataouine | Voito",
    metaDesc: "Offres de voitures et motos d'occasion à Tataouine. Petites annonces entre particuliers, prix TND. Découvrez Voito.",
    h2Top: "Offres véhicules d'occasion à Tataouine",
    descriptionTop: "Tataouine, gouvernorat le plus vaste de Tunisie, nécessite des véhicules adaptés à ses longues distances et à ses terrains variés. Sur Voito, les habitants de Tataouine, Remada, Ghomrassen et Dhéhiba proposent des 4x4 résistants, des pick-up, des berlines diesel économiques et des motos légères. Les annonces entre particuliers affichent le prix en dinars, les caractéristiques mécaniques et des photos, pour une transparence maximale avant tout contact.",
    h2Bottom: "Déposez votre annonce auto à Tataouine",
    descriptionBottom: "Même dans le sud profond, Voito rend la vente entre particuliers accessible. Publiez gratuitement votre offre depuis Tataouine et touchez des acheteurs de tout le gouvernorat. Les habitants de la région consultent la plateforme pour trouver des véhicules robustes à prix raisonnable. Pas de déplacement nécessaire pour comparer les annonces : tout se fait en ligne.",
  },
  {
    slug: "gafsa",
    metaTitle: "Voitures occasion Gafsa — Annonces auto | Voito",
    metaDesc: "Annonces de voitures d'occasion à Gafsa. Vente entre particuliers, offres auto et moto, prix en dinars. Trouvez votre véhicule sur Voito.",
    h2Top: "Petites annonces auto à Gafsa",
    descriptionTop: "Gafsa, bassin minier du sud-ouest tunisien, dispose d'un marché automobile où les véhicules robustes et économiques sont les plus recherchés. Les particuliers de Gafsa, Metlaoui, Redeyef, Moulares et El Guettar déposent sur Voito des annonces de voitures diesel, de camionnettes, de motos et de pièces d'usure. Les prix en dinars sont clairement affichés et chaque vendeur détaille l'historique et l'état de son véhicule. Consultez les offres disponibles et contactez directement le propriétaire.",
    h2Bottom: "Achetez ou vendez à Gafsa sans commission",
    descriptionBottom: "Voito permet aux habitants de Gafsa de vendre leur véhicule sans passer par un intermédiaire ni payer de commission. Créez votre compte, publiez votre annonce avec photos et attendez les propositions. Acheteurs, comparez les offres du gouvernorat et trouvez le véhicule qui convient à votre budget et à vos besoins quotidiens.",
  },
  {
    slug: "tozeur",
    metaTitle: "Annonces voitures occasion Tozeur | Voito",
    metaDesc: "Véhicules d'occasion à Tozeur et Nefta. Annonces auto entre particuliers, prix en TND. Offres sur Voito.",
    h2Top: "Véhicules d'occasion à Tozeur",
    descriptionTop: "Tozeur, oasis du Jérid et destination touristique prisée, possède un marché automobile modeste mais ciblé. Les particuliers de Tozeur, Nefta, Degache et Hazoua recherchent et vendent des véhicules adaptés au climat désertique et aux routes du sud-ouest : berlines climatisées, 4x4, fourgonnettes de livraison et motos. Sur Voito, chaque annonce mentionne le prix en TND, le kilométrage, le carburant et l'état général, accompagnés de photos prises par le vendeur.",
    h2Bottom: "Vendez votre véhicule à Tozeur",
    descriptionBottom: "À Tozeur, la vente de voiture entre particuliers se fait souvent par le bouche-à-oreille. Voito élargit votre audience en rendant votre annonce visible à tous les acheteurs du gouvernorat et au-delà. Publication gratuite, contact protégé, aucune commission. Faites le premier pas et déposez votre offre en quelques minutes.",
  },
  {
    slug: "kebili",
    metaTitle: "Voitures occasion Kébili — Offres auto | Voito",
    metaDesc: "Petites annonces véhicules d'occasion à Kébili et Douz. Vente entre particuliers, prix en dinars. Annonces sur Voito.",
    h2Top: "Annonces auto d'occasion à Kébili",
    descriptionTop: "Kébili, aux portes du Sahara, est un gouvernorat où le véhicule tout-terrain et la berline diesel dominent le marché de l'occasion. Les particuliers de Kébili, Douz, Souk Lahad et Jemna publient sur Voito des annonces de 4x4 éprouvés, de voitures familiales, d'utilitaires et de motos. Les prix sont en dinars tunisiens, établis par le propriétaire, et chaque fiche comporte les informations techniques indispensables : année, kilométrage, puissance et carburant.",
    h2Bottom: "Trouvez votre véhicule à Kébili",
    descriptionBottom: "Que vous soyez acheteur ou vendeur à Kébili, Voito vous simplifie la vie. Acheteurs, parcourez les offres du gouvernorat et filtrez par budget ou type de véhicule. Vendeurs, publiez votre annonce gratuitement et recevez les contacts des intéressés. La vente entre particuliers dans le sud tunisien passe par Voito.",
  },
  {
    slug: "zaghouan",
    metaTitle: "Annonces véhicules occasion Zaghouan | Voito",
    metaDesc: "Offres de voitures et motos d'occasion à Zaghouan. Annonces entre particuliers, prix TND. Achetez ou vendez sur Voito.",
    h2Top: "Véhicules d'occasion à Zaghouan",
    descriptionTop: "Zaghouan, gouvernorat verdoyant entre Tunis et le Sahel, accueille un marché automobile d'occasion orienté vers les véhicules polyvalents. Les vendeurs particuliers de Zaghouan, El Fahs, Nadhour et Bir Mcherga proposent sur Voito des voitures compactes, des berlines diesel pour les trajets vers la capitale, des utilitaires agricoles et des motos. Les annonces précisent le prix en dinars, les caractéristiques du véhicule et proposent des photos pour une évaluation à distance.",
    h2Bottom: "Vente auto entre particuliers à Zaghouan",
    descriptionBottom: "Zaghouan est à mi-chemin entre les grands marchés automobiles de Tunis et de Sousse. Profitez de cette position stratégique pour vendre ou acheter un véhicule via Voito. La publication d'annonce est gratuite, la mise en contact sécurisée et la négociation se fait directement entre les deux parties. Pas de commission, pas de surprise.",
  },
];

async function main() {
  let updated = 0;
  let errors = 0;

  for (const city of citiesSeo) {
    try {
      await prisma.city.update({
        where: { slug: city.slug },
        data: {
          metaTitle: city.metaTitle,
          metaDesc: city.metaDesc,
          h2Top: city.h2Top,
          descriptionTop: city.descriptionTop,
          h2Bottom: city.h2Bottom,
          descriptionBottom: city.descriptionBottom,
        },
      });
      updated++;
      console.log(`✓ ${city.slug}`);
    } catch (err) {
      errors++;
      console.error(`✗ ${city.slug}:`, err.message);
    }
  }

  console.log(`\nTerminé : ${updated} mises à jour, ${errors} erreurs`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
