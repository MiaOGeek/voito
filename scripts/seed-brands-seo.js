const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const brandsSeo = [
  // ═══════════════════════════════════════════
  // VOITURES (15 marques)
  // ═══════════════════════════════════════════
  {
    slug: "audi",
    category: "VOITURES",
    metaTitle: "Audi occasion Tunisie — Annonces A3, A4, Q5 entre particuliers | Voito",
    metaDesc: "Trouvez votre Audi d'occasion en Tunisie : A3, A4, A6, Q3, Q5. Annonces entre particuliers, prix en dinars tunisiens. Comparez et achetez sur Voito.",
    h2Top: "Audi d'occasion en Tunisie : berlines et SUV premium",
    descriptionTop: "Symbole de raffinement technique et de confort haut de gamme, Audi attire une clientèle tunisienne exigeante. Sur Voito, les particuliers proposent un choix varié de modèles : la compacte A3 pour la ville, la polyvalente A4 pour les trajets quotidiens, la routière A6 pour les longues distances, ou encore les SUV Q3 et Q5 pour combiner espace et prestations. Chaque annonce détaille la motorisation (essence, diesel ou hybride), la boîte de vitesses, le kilométrage réel et le prix en dinars. Consultez les photos intérieures et extérieures avant de contacter le vendeur.",
    h2Bottom: "Acheter une Audi entre particuliers en Tunisie",
    descriptionBottom: "Acquérir une Audi d'occasion sans passer par un concessionnaire, c'est possible grâce à Voito. Les propriétaires tunisiens revendent leurs modèles à des tarifs plus accessibles que le neuf, tout en offrant des véhicules entretenus et bien équipés. Filtrez par année, kilométrage ou budget pour cibler l'Audi qui correspond à vos critères. La transaction se fait directement entre particuliers, sans commission ni frais cachés.",
  },
  {
    slug: "bmw",
    category: "VOITURES",
    metaTitle: "BMW occasion Tunisie — Série 3, Série 5, X1, X3 | Voito",
    metaDesc: "Annonces BMW d'occasion en Tunisie. Série 1, 3, 5, X1, X3, X5 entre particuliers. Prix en TND, photos détaillées sur Voito.",
    h2Top: "BMW d'occasion : le plaisir de conduire à prix accessible",
    descriptionTop: "La marque à l'hélice jouit d'une réputation solide auprès des automobilistes tunisiens. Berlines sportives, coupés élégants, SUV familiaux : BMW décline une gamme complète que l'on retrouve sur le marché de l'occasion. Sur Voito, les vendeurs particuliers affichent des Série 1, Série 3, Série 5, X1, X3 et X5 avec toutes les informations utiles — motorisation, finition, kilométrage, historique d'entretien. Les prix sont en dinars tunisiens et négociables directement avec le propriétaire.",
    h2Bottom: "Vendre ou acheter une BMW d'occasion en Tunisie",
    descriptionBottom: "Passionné de conduite ou simplement à la recherche d'une berline confortable, vous trouverez sur Voito des BMW pour tous les budgets. La vente entre particuliers supprime la marge du revendeur et rend le premium plus abordable. Publiez votre BMW gratuitement ou parcourez les annonces disponibles dans tout le pays. Chaque fiche inclut des photos sous plusieurs angles pour évaluer l'état du véhicule avant toute visite.",
  },
  {
    slug: "citroen",
    category: "VOITURES",
    metaTitle: "Citroën occasion Tunisie — C3, C4, Berlingo particuliers | Voito",
    metaDesc: "Achetez une Citroën d'occasion en Tunisie : C3, C4, C-Elysée, Berlingo. Petites annonces entre particuliers, prix en dinars sur Voito.",
    h2Top: "Citroën d'occasion en Tunisie : confort et accessibilité",
    descriptionTop: "Présente en Tunisie depuis des décennies, Citroën reste l'une des marques les plus recherchées sur le marché de l'occasion. La C3 séduit par sa compacité et son coût d'entretien réduit, la C-Elysée répond aux besoins des familles avec un coffre généreux, tandis que le Berlingo s'impose chez les professionnels et les grandes familles. Sur Voito, les particuliers tunisiens publient leurs Citroën avec le prix en TND, le kilométrage exact, le type de carburant et des clichés permettant de juger l'état général.",
    h2Bottom: "Trouvez votre Citroën idéale entre particuliers",
    descriptionBottom: "La marque aux chevrons offre un excellent rapport confort-prix sur le marché de l'occasion tunisien. Que vous cherchiez une citadine économique ou un utilitaire spacieux, Voito regroupe des offres déposées par des propriétaires de tout le pays. Pas de marge intermédiaire : vous négociez le tarif directement. Déposez aussi votre annonce gratuitement si vous souhaitez revendre votre Citroën.",
  },
  {
    slug: "ford",
    category: "VOITURES",
    metaTitle: "Ford occasion Tunisie — Focus, Fiesta, Kuga annonces | Voito",
    metaDesc: "Annonces Ford d'occasion en Tunisie : Fiesta, Focus, Kuga, Ranger. Vente entre particuliers, prix TND. Offres sur Voito.",
    h2Top: "Ford d'occasion : fiabilité américaine sur les routes tunisiennes",
    descriptionTop: "Reconnue pour la robustesse de ses mécaniques et la polyvalence de sa gamme, Ford occupe une place de choix dans le parc automobile tunisien. La Fiesta, compacte et nerveuse, convient parfaitement à la circulation urbaine. La Focus allie habitabilité et tenue de route, tandis que le Kuga répond à ceux qui privilégient l'espace et la hauteur de conduite. Les vendeurs particuliers sur Voito précisent la puissance fiscale, le carburant, l'année et le tarif en dinars pour faciliter votre comparaison.",
    h2Bottom: "Acheter une Ford d'occasion sans intermédiaire",
    descriptionBottom: "Ford reste une valeur sûre pour quiconque recherche un véhicule endurant à tarif raisonnable. Sur Voito, la vente se fait de particulier à particulier : aucune commission, aucun frais de dossier. Explorez les annonces, contactez les propriétaires et organisez un essai. Vous vendez votre Ford ? Publiez votre offre en quelques minutes et recevez les propositions d'acheteurs tunisiens.",
  },
  {
    slug: "honda",
    category: "VOITURES",
    metaTitle: "Honda occasion Tunisie — Civic, Jazz, CR-V particuliers | Voito",
    metaDesc: "Honda d'occasion en Tunisie : Civic, Jazz, HR-V, CR-V. Annonces entre particuliers avec prix en dinars. Trouvez votre Honda sur Voito.",
    h2Top: "Honda d'occasion en Tunisie : ingénierie japonaise et longévité",
    descriptionTop: "Honda inspire confiance grâce à des moteurs réputés pour leur fiabilité et leur faible consommation. En Tunisie, la Civic demeure une référence parmi les berlines compactes, la Jazz attire par sa modularité intérieure, et le CR-V satisfait les amateurs de SUV familiaux. Sur Voito, chaque annonce Honda est rédigée par le propriétaire : kilométrage vérifié au compteur, historique de révisions, état de la carrosserie et prix souhaité en dinars tunisiens. Comparez les offres et prenez rendez-vous pour un essai.",
    h2Bottom: "Vente Honda entre particuliers sur Voito",
    descriptionBottom: "Les Honda d'occasion conservent une bonne cote en Tunisie, gage de qualité perçue par les acheteurs. Profitez-en pour vendre la vôtre au juste prix sur Voito, sans commission ni intermédiaire. Côté acheteur, la plateforme vous permet de filtrer par modèle, année et budget pour aller droit à l'essentiel. Chaque fiche propose des photos et les coordonnées du vendeur pour une mise en relation rapide.",
  },
  {
    slug: "hyundai",
    category: "VOITURES",
    metaTitle: "Hyundai occasion Tunisie — Tucson, i10, i20, Accent | Voito",
    metaDesc: "Voitures Hyundai d'occasion en Tunisie : i10, i20, Accent, Tucson. Annonces entre particuliers, prix en TND sur Voito.",
    h2Top: "Hyundai d'occasion : le best-seller coréen en Tunisie",
    descriptionTop: "Hyundai figure parmi les marques les plus vendues en Tunisie grâce à un positionnement prix attractif et une garantie généreuse. La petite i10 convient aux budgets serrés, l'i20 offre davantage d'équipements, l'Accent assure un confort de berline, et le Tucson domine le segment des SUV compacts. Sur Voito, retrouvez des centaines d'annonces Hyundai publiées par des particuliers : prix en dinars, photos haute qualité, détails techniques et localisation du véhicule pour une recherche ciblée.",
    h2Bottom: "Acheter ou vendre une Hyundai en Tunisie",
    descriptionBottom: "Le succès de Hyundai sur le marché tunisien se traduit par un large choix d'occasion. Profitez de cette offre abondante sur Voito pour trouver le modèle, l'année et le kilométrage qui vous conviennent. Les prix sont fixés par les propriétaires et restent ouverts à la négociation. Vendeurs, mettez en ligne votre Hyundai gratuitement et touchez des acheteurs dans les 24 gouvernorats.",
  },
  {
    slug: "jaguar",
    category: "VOITURES",
    metaTitle: "Jaguar occasion Tunisie — XE, XF, F-Pace annonces | Voito",
    metaDesc: "Jaguar d'occasion en Tunisie : XE, XF, F-Pace, E-Pace. Annonces entre particuliers, prix en dinars. Offres premium sur Voito.",
    h2Top: "Jaguar d'occasion : l'élégance britannique à portée de main",
    descriptionTop: "Posséder une Jaguar en Tunisie n'est plus réservé aux budgets illimités. Le marché de l'occasion offre des XE au design tranchant, des XF spacieuses pour les trajets d'affaires et des F-Pace alliant sportivité et espace familial. Sur Voito, les propriétaires cèdent leurs Jaguar avec une fiche complète : motorisation, puissance, finition, kilométrage et tarif en dinars tunisiens. Vous pouvez évaluer chaque véhicule à travers des photos détaillées avant de planifier une visite.",
    h2Bottom: "Vendez ou acquérez une Jaguar sans intermédiaire",
    descriptionBottom: "Le segment premium d'occasion séduit une clientèle tunisienne avertie, à la recherche de prestations haut de gamme sans le prix du neuf. Sur Voito, la mise en relation est directe : pas de revendeur, pas de marge supplémentaire. Publiez votre Jaguar pour atteindre les amateurs de belles mécaniques à travers le pays, ou parcourez les annonces pour dénicher le modèle rare que vous convoitez.",
  },
  {
    slug: "land-rover",
    category: "VOITURES",
    metaTitle: "Land Rover occasion Tunisie — Evoque, Discovery, Defender | Voito",
    metaDesc: "Land Rover d'occasion en Tunisie : Evoque, Discovery, Defender. Annonces 4x4 entre particuliers, prix TND sur Voito.",
    h2Top: "Land Rover d'occasion : aventure et confort tout-terrain",
    descriptionTop: "Référence mondiale du tout-terrain, Land Rover dispose d'une communauté fidèle en Tunisie. L'Evoque séduit par son allure urbaine et sa compacité, le Discovery offre sept places et une polyvalence sans faille, le Defender incarne l'esprit baroudeur originel. Les particuliers tunisiens revendent ces modèles sur Voito avec des fiches exhaustives : type de transmission, version courte ou longue, état de la mécanique, carrosserie et tarif négociable en dinars.",
    h2Bottom: "Trouver un Land Rover d'occasion en Tunisie",
    descriptionBottom: "Si vous rêvez d'un 4x4 capable d'affronter les pistes du sud autant que les boulevards de Tunis, un Land Rover d'occasion est un choix judicieux. Voito réunit les offres de particuliers de tout le pays, sans commission. Comparez les annonces, vérifiez les options et contactez directement le propriétaire. Vendeurs, profitez d'une audience nationale pour céder votre Land Rover rapidement.",
  },
  {
    slug: "mazda",
    category: "VOITURES",
    metaTitle: "Mazda occasion Tunisie — Mazda 3, CX-5, CX-3 annonces | Voito",
    metaDesc: "Annonces Mazda d'occasion en Tunisie : Mazda 2, 3, CX-3, CX-5. Vente entre particuliers, prix en dinars sur Voito.",
    h2Top: "Mazda d'occasion en Tunisie : design et plaisir de conduite",
    descriptionTop: "Mazda se démarque par un design soigné et une conduite dynamique qui plaisent aux automobilistes tunisiens. La Mazda 3 rivalise avec les meilleures compactes européennes, la CX-3 propose un format SUV urbain séduisant, et la CX-5 répond aux familles en quête d'espace sans renoncer au style. Sur Voito, chaque annonce Mazda est publiée par un particulier avec un descriptif précis : année de première immatriculation, kilométrage, type de boîte, équipements et prix souhaité en TND.",
    h2Bottom: "Acheter une Mazda d'occasion sans commission",
    descriptionBottom: "La technologie Skyactiv de Mazda assure des consommations maîtrisées, un atout considérable quand le carburant pèse sur le budget quotidien. Retrouvez ces véhicules sur Voito à des tarifs de particulier, sans la surcote d'un intermédiaire. Filtrez par modèle et par fourchette de prix pour affiner vos résultats. Vendeurs, publiez votre Mazda gratuitement et recevez des contacts d'acheteurs intéressés.",
  },
  {
    slug: "mercedes",
    category: "VOITURES",
    metaTitle: "Mercedes occasion Tunisie — Classe A, C, E, GLC particuliers | Voito",
    metaDesc: "Mercedes-Benz d'occasion en Tunisie : Classe A, C, E, GLA, GLC. Annonces entre particuliers, prix en dinars. Offres sur Voito.",
    h2Top: "Mercedes-Benz d'occasion : prestige et ingénierie allemande",
    descriptionTop: "Marque de prestige par excellence, Mercedes-Benz attire une large clientèle tunisienne sur le marché de l'occasion. La Classe A ouvre les portes du premium à un tarif contenu, la Classe C allie sportivité et distinction, la Classe E incarne le confort routier de haut vol, et le GLC domine le segment des SUV haut de gamme. Les vendeurs sur Voito détaillent chaque annonce : motorisation, boîte automatique ou manuelle, options (toit ouvrant, cuir, aide au stationnement) et prix en dinars tunisiens.",
    h2Bottom: "Vendre sa Mercedes ou en acquérir une sur Voito",
    descriptionBottom: "Le marché Mercedes d'occasion en Tunisie est dynamique : les modèles conservent leur valeur et trouvent preneur rapidement. Publiez votre annonce sur Voito pour bénéficier d'une visibilité gratuite auprès d'acheteurs dans tout le pays. Si vous êtes acheteur, comparez les offres disponibles, vérifiez l'historique d'entretien et négociez directement avec le propriétaire. Aucune commission ne s'applique sur la plateforme.",
  },
  {
    slug: "nissan",
    category: "VOITURES",
    metaTitle: "Nissan occasion Tunisie — Micra, Qashqai, Juke annonces | Voito",
    metaDesc: "Nissan d'occasion en Tunisie : Micra, Juke, Qashqai, X-Trail. Annonces entre particuliers, prix TND. Recherchez sur Voito.",
    h2Top: "Nissan d'occasion en Tunisie : robustesse japonaise",
    descriptionTop: "Nissan propose une gamme étendue qui répond aux usages variés des Tunisiens. La Micra, petite et agile, se faufile dans les rues étroites des médinas. Le Juke affiche un tempérament de crossover urbain original, le Qashqai domine le segment des SUV compacts familiaux, et le X-Trail offre sept places pour les grandes tribus. Sur Voito, les propriétaires publient leurs Nissan avec l'ensemble des caractéristiques : motorisation essence ou diesel, kilométrage, transmission et prix en dinars.",
    h2Bottom: "Vente Nissan entre particuliers en Tunisie",
    descriptionBottom: "La fiabilité des mécaniques Nissan en fait un choix prisé sur le marché tunisien de la seconde main. Voito facilite la transaction : pas de revendeur entre vous et l'acheteur ou le vendeur. Déposez votre annonce ou parcourez celles des autres particuliers, filtrez par budget et localisez le véhicule le plus proche de chez vous. Service entièrement gratuit.",
  },
  {
    slug: "porsche",
    category: "VOITURES",
    metaTitle: "Porsche occasion Tunisie — Cayenne, Macan, 911 | Voito",
    metaDesc: "Porsche d'occasion en Tunisie : Cayenne, Macan, Panamera, 911. Annonces entre particuliers, prix en dinars sur Voito.",
    h2Top: "Porsche d'occasion : performance et exclusivité en Tunisie",
    descriptionTop: "Conduire une Porsche en Tunisie est un rêve que le marché de l'occasion rend réalisable. Le Cayenne associe puissance et confort familial, le Macan offre l'agilité d'un SUV compact sportif, la Panamera conjugue grand tourisme et luxe, et la mythique 911 reste l'icône absolue du constructeur de Stuttgart. Sur Voito, les vendeurs particuliers partagent des annonces soignées : motorisation, nombre de chevaux, finition, historique de maintenance et prix en dinars tunisiens accompagnés de photos qui rendent justice au véhicule.",
    h2Bottom: "Acquérir une Porsche d'occasion entre particuliers",
    descriptionBottom: "Le segment ultra-premium d'occasion en Tunisie est restreint mais qualitatif. Chaque Porsche mise en vente sur Voito est proposée par son propriétaire, sans marge de revente. Vous bénéficiez ainsi du meilleur rapport qualité-prix pour un véhicule d'exception. Parcourez les offres, posez vos questions au vendeur et planifiez un essai routier. La plateforme reste gratuite pour les deux parties.",
  },
  {
    slug: "seat",
    category: "VOITURES",
    metaTitle: "Seat occasion Tunisie — Ibiza, Leon, Arona annonces | Voito",
    metaDesc: "Annonces Seat d'occasion en Tunisie : Ibiza, Leon, Arona, Ateca. Vente entre particuliers, prix en TND. Offres sur Voito.",
    h2Top: "Seat d'occasion en Tunisie : tempérament sportif, budget maîtrisé",
    descriptionTop: "Filiale espagnole du groupe Volkswagen, Seat combine plateforme technique germanique et design latin. L'Ibiza est l'une des citadines les plus appréciées en Tunisie pour son dynamisme et son équipement de série. La Leon rivalise avec les meilleures compactes du marché, l'Arona cible les amateurs de crossover urbain et l'Ateca complète l'offre SUV. Les particuliers tunisiens affichent sur Voito le prix en dinars, le kilométrage, la boîte (manuelle ou DSG) et des photos sous tous les angles.",
    h2Bottom: "Trouvez votre Seat d'occasion sur Voito",
    descriptionBottom: "Seat offre le meilleur compromis entre qualité de construction et tarif accessible sur le marché tunisien. Les modèles d'occasion bénéficient de la même plateforme que les Volkswagen et Audi, ce qui garantit une bonne tenue dans le temps. Parcourez les annonces de particuliers sur Voito, comparez les offres et contactez le vendeur sans intermédiaire. Publication d'annonce gratuite pour les propriétaires souhaitant revendre.",
  },
  {
    slug: "volkswagen",
    category: "VOITURES",
    metaTitle: "Volkswagen occasion Tunisie — Golf, Polo, Tiguan particuliers | Voito",
    metaDesc: "VW d'occasion en Tunisie : Golf, Polo, Tiguan, Passat, T-Roc. Annonces entre particuliers, prix en dinars. Comparez sur Voito.",
    h2Top: "Volkswagen d'occasion : la référence allemande en Tunisie",
    descriptionTop: "Volkswagen figure régulièrement en tête des marques les plus recherchées sur le marché tunisien de l'occasion. La Polo, compacte et économe, séduit les jeunes conducteurs. La Golf, icône des compactes depuis plus de quarante ans, reste une valeur refuge. Le Tiguan domine le créneau des SUV familiaux, et la Passat s'adresse aux conducteurs qui privilégient l'espace et le confort routier. Chaque annonce sur Voito détaille la finition (Trendline, Comfortline, Highline), la motorisation TSI ou TDI, le kilométrage et le tarif en dinars tunisiens.",
    h2Bottom: "Acheter ou vendre une Volkswagen entre particuliers",
    descriptionBottom: "Les Volkswagen d'occasion conservent une excellente cote de revente en Tunisie, signe de confiance des acheteurs. Voito met en relation vendeurs et acquéreurs sans commission ni intermédiaire. Déposez votre annonce VW gratuitement ou explorez les offres disponibles dans les 24 gouvernorats. Filtrez par modèle, année, kilométrage et budget pour trouver rapidement le véhicule qu'il vous faut.",
  },
  {
    slug: "volvo",
    category: "VOITURES",
    metaTitle: "Volvo occasion Tunisie — XC40, XC60, V40 annonces | Voito",
    metaDesc: "Volvo d'occasion en Tunisie : XC40, XC60, V40, S60. Annonces entre particuliers, prix en dinars. Offres sécurité sur Voito.",
    h2Top: "Volvo d'occasion en Tunisie : sécurité et sérénité scandinave",
    descriptionTop: "Volvo est synonyme de sécurité maximale et de confort scandinave. En Tunisie, le constructeur suédois attire des acheteurs sensibles à la protection de leurs passagers. Le XC40, SUV compact primé, s'intègre parfaitement à la vie urbaine. Le XC60 offre un habitacle spacieux et des technologies de pointe, tandis que le V40 et le S60 séduisent ceux qui préfèrent une silhouette berline ou break. Sur Voito, les annonces Volvo d'occasion incluent la liste des équipements de sécurité, le type de motorisation et le prix en TND.",
    h2Bottom: "Vendre ou acheter un Volvo d'occasion sur Voito",
    descriptionBottom: "Le marché Volvo d'occasion en Tunisie reste une niche qualitative. Les propriétaires soignent généralement l'entretien de ces véhicules, ce qui se traduit par des exemplaires en bon état sur le marché secondaire. Profitez de la plateforme Voito pour acheter directement au propriétaire ou pour céder votre Volvo à un acheteur sérieux. Aucune commission, publication gratuite, contact sécurisé.",
  },

  // ═══════════════════════════════════════════
  // MOTOS (6 marques)
  // ═══════════════════════════════════════════
  {
    slug: "forza",
    category: "MOTOS",
    metaTitle: "Honda Forza occasion Tunisie — Scooter Forza 125, 300 | Voito",
    metaDesc: "Scooter Forza d'occasion en Tunisie : Forza 125 et 300. Annonces entre particuliers, prix en dinars. Offres sur Voito.",
    h2Top: "Forza d'occasion : le scooter GT prisé en Tunisie",
    descriptionTop: "Le Forza s'est imposé comme la référence des scooters grand tourisme en Tunisie grâce à son confort routier, sa protection aérodynamique et sa fiabilité mécanique. Disponible en 125 cc pour les déplacements urbains ou en 300 cc pour les trajets périurbains, ce scooter séduit aussi bien les navetteurs quotidiens que les adeptes des escapades côtières. Les annonces sur Voito précisent la cylindrée, l'année de mise en circulation, le kilométrage au compteur et le prix en dinars tunisiens. Photos et description permettent d'évaluer l'état du deux-roues avant visite.",
    h2Bottom: "Acheter un Forza d'occasion entre particuliers",
    descriptionBottom: "Sur le marché tunisien, le Forza conserve une cote élevée qui témoigne de la confiance des utilisateurs. En achetant sur Voito, vous traitez directement avec le propriétaire actuel sans surcoût. Vendeurs, publiez votre annonce gratuitement pour atteindre les passionnés de scooter dans les 24 gouvernorats. Acheteurs, comparez les tarifs et contactez le vendeur en quelques clics.",
  },
  {
    slug: "ftm",
    category: "MOTOS",
    metaTitle: "FTM occasion Tunisie — Motos FTM annonces particuliers | Voito",
    metaDesc: "Motos FTM d'occasion en Tunisie. Annonces entre particuliers, scooters et motos FTM, prix en TND. Trouvez sur Voito.",
    h2Top: "FTM d'occasion : motos accessibles en Tunisie",
    descriptionTop: "FTM (Forza Tunisie Motors) propose des deux-roues assemblés localement à des tarifs compétitifs. Les modèles FTM — scooters urbains, motos utilitaires et trails légers — correspondent aux besoins de mobilité quotidienne des Tunisiens. Sur Voito, les propriétaires revendent leurs FTM d'occasion avec des annonces détaillées : cylindrée, kilométrage, état mécanique, état de la carrosserie et prix en dinars. La disponibilité des pièces détachées locales facilite l'entretien et maintient le coût de possession à un niveau bas.",
    h2Bottom: "Vente FTM entre particuliers sur Voito",
    descriptionBottom: "Les motos FTM d'occasion représentent une solution économique pour les étudiants, les livreurs et tous ceux qui recherchent un deux-roues abordable en Tunisie. Sur Voito, la vente s'effectue sans intermédiaire : le tarif est fixé par le vendeur, la discussion se fait en direct. Déposez votre annonce FTM en quelques minutes ou explorez les offres disponibles dans votre gouvernorat.",
  },
  {
    slug: "peugeot",
    category: "MOTOS",
    metaTitle: "Peugeot Motocycles occasion Tunisie — Scooters Peugeot | Voito",
    metaDesc: "Scooters Peugeot d'occasion en Tunisie : Kisbee, Speedfight, Django. Annonces entre particuliers, prix en TND sur Voito.",
    h2Top: "Scooters Peugeot d'occasion en Tunisie",
    descriptionTop: "Peugeot Motocycles bénéficie de la notoriété du lion en Tunisie. Les scooters Kisbee, Speedfight et Django figurent parmi les deux-roues les plus répandus dans les villes tunisiennes pour leur fiabilité et leur facilité d'entretien. Le Kisbee, léger et maniable, excelle en circulation dense. Le Speedfight attire les amateurs de look sportif, tandis que le Django séduit par son esthétique néo-rétro. Sur Voito, les particuliers publient leurs scooters Peugeot avec photos, kilométrage, année et prix en dinars.",
    h2Bottom: "Trouver un scooter Peugeot d'occasion entre particuliers",
    descriptionBottom: "Un scooter Peugeot d'occasion en Tunisie, c'est la garantie d'un réseau de pièces de rechange étendu et d'un savoir-faire mécanique local. Achetez directement au propriétaire via Voito et évitez les frais d'un intermédiaire. Vendeurs, rendez visible votre scooter auprès de milliers de recherches quotidiennes. La plateforme est gratuite et le contact reste sécurisé.",
  },
  {
    slug: "slc",
    category: "MOTOS",
    metaTitle: "SLC occasion Tunisie — Motos et scooters SLC | Voito",
    metaDesc: "Motos SLC d'occasion en Tunisie. Scooters et motos SLC entre particuliers, prix en dinars. Annonces sur Voito.",
    h2Top: "SLC d'occasion : deux-roues populaires en Tunisie",
    descriptionTop: "La marque SLC propose des scooters et motos pensés pour le quotidien tunisien : cylindrées modestes, consommation réduite et entretien simplifié. Ces deux-roues trouvent leur public auprès des jeunes conducteurs, des professionnels de la livraison et de tous ceux qui souhaitent un moyen de transport pratique à moindre coût. Sur Voito, retrouvez des annonces SLC d'occasion déposées par des particuliers avec le prix en TND, le kilométrage, la cylindrée et des photos de l'état actuel du véhicule.",
    h2Bottom: "Acheter ou vendre un SLC d'occasion",
    descriptionBottom: "Le marché SLC d'occasion offre des tarifs parmi les plus abordables du segment deux-roues en Tunisie. Sur Voito, vendeurs et acheteurs se rencontrent sans intermédiaire. Publiez votre SLC gratuitement ou parcourez les offres proches de chez vous. La négociation se fait directement entre les deux parties, en toute transparence.",
  },
  {
    slug: "sym",
    category: "MOTOS",
    metaTitle: "SYM occasion Tunisie — Scooters SYM annonces particuliers | Voito",
    metaDesc: "Scooters SYM d'occasion en Tunisie : Symphony, Crox, Fiddle. Annonces entre particuliers, prix TND. Offres sur Voito.",
    h2Top: "SYM d'occasion : scooters taïwanais fiables en Tunisie",
    descriptionTop: "SYM, constructeur taïwanais présent en Tunisie depuis plusieurs années, séduit par le rapport qualité-prix de ses scooters. Le Symphony offre un coffre sous la selle généreux pour les courses quotidiennes, le Crox joue la carte du crossover urbain, et le Fiddle attire avec ses lignes rétro modernes. Les vendeurs particuliers sur Voito détaillent la cylindrée (50 cc, 125 cc ou plus), le kilométrage, l'état des pneus et de la batterie, et le prix demandé en dinars tunisiens.",
    h2Bottom: "Trouver un scooter SYM d'occasion sur Voito",
    descriptionBottom: "Les scooters SYM d'occasion allient économie d'usage et coût d'acquisition réduit. Sur Voito, la vente entre particuliers vous garantit un tarif sans marge de revendeur. Que vous soyez à Tunis, Sousse, Sfax ou ailleurs, consultez les annonces disponibles et contactez le vendeur directement. Publication gratuite pour ceux qui souhaitent revendre leur SYM.",
  },
  {
    slug: "zimota",
    category: "MOTOS",
    metaTitle: "Zimota occasion Tunisie — Motos Zimota annonces | Voito",
    metaDesc: "Motos Zimota d'occasion en Tunisie. Annonces entre particuliers, prix en dinars. Trouvez votre Zimota sur Voito.",
    h2Top: "Zimota d'occasion : la marque tunisienne de référence",
    descriptionTop: "Zimota est la marque de motos et scooters la plus emblématique de l'industrie tunisienne. Assemblés localement, les modèles Zimota offrent une accessibilité tarifaire inégalée et un réseau de maintenance couvrant l'ensemble du territoire. Des scooters 50 cc pour les premiers permis aux trails 150 cc pour les routes secondaires, la gamme répond à une multitude de besoins. Les particuliers publient sur Voito des annonces complètes : modèle, année, kilométrage, état général et tarif en dinars tunisiens, accompagnés de photos récentes.",
    h2Bottom: "Vendre ou acheter un Zimota d'occasion en Tunisie",
    descriptionBottom: "Acheter un Zimota d'occasion sur Voito, c'est choisir un deux-roues dont les pièces détachées sont disponibles dans toutes les régions du pays. La plateforme met en relation acheteurs et vendeurs particuliers sans commission. Publiez votre Zimota gratuitement ou parcourez les annonces dans votre ville. Négociation directe, pas de frais cachés.",
  },

  // ═══════════════════════════════════════════
  // PIECES (6 marques)
  // ═══════════════════════════════════════════
  {
    slug: "fiat",
    category: "PIECES",
    metaTitle: "Pièces Fiat occasion Tunisie — Punto, Tipo, Panda | Voito",
    metaDesc: "Pièces détachées Fiat en Tunisie : Punto, Tipo, Panda, 500. Neuves et occasion entre particuliers, prix en TND sur Voito.",
    h2Top: "Pièces détachées Fiat en Tunisie : neuves et occasion",
    descriptionTop: "Fiat reste une marque très répandue en Tunisie, ce qui génère une demande constante en pièces de rechange. Que vous cherchiez un alternateur pour votre Punto, des plaquettes de frein pour votre Tipo, un rétroviseur de Panda ou un pare-chocs de Fiat 500, Voito regroupe les annonces de vendeurs particuliers et de professionnels du démontage. Chaque annonce précise la référence de la pièce, la compatibilité par modèle, l'état (neuf, occasion ou reconditionné) et le prix en dinars tunisiens.",
    h2Bottom: "Trouvez vos pièces Fiat au meilleur prix",
    descriptionBottom: "Réparer une Fiat en Tunisie ne devrait pas coûter une fortune. Sur Voito, comparez les offres de pièces détachées publiées par des particuliers et des professionnels locaux. Vous trouverez des composants moteur, transmission, carrosserie, éclairage et habitacle à des tarifs inférieurs à ceux du réseau officiel. Contactez le vendeur, vérifiez la compatibilité et récupérez la pièce près de chez vous.",
  },
  {
    slug: "kia",
    category: "PIECES",
    metaTitle: "Pièces Kia occasion Tunisie — Picanto, Sportage, Ceed | Voito",
    metaDesc: "Pièces détachées Kia en Tunisie : Picanto, Ceed, Sportage, Sorento. Neuves et occasion, prix en dinars. Annonces sur Voito.",
    h2Top: "Pièces détachées Kia disponibles en Tunisie",
    descriptionTop: "Le parc Kia en Tunisie a fortement progressé ces dernières années, entraînant un besoin croissant en pièces de rechange. Filtres, amortisseurs, disques de frein, optiques, pare-brise, garnitures intérieures : sur Voito, vous trouverez des pièces compatibles avec les Picanto, Ceed, Sportage, Sorento et autres modèles Kia. Les vendeurs indiquent la référence constructeur, la compatibilité, l'état de la pièce et le tarif en TND. Photos à l'appui pour vérifier l'état avant achat.",
    h2Bottom: "Acheter des pièces Kia entre particuliers",
    descriptionBottom: "Sur Voito, les pièces Kia d'occasion et neuves sont proposées par des particuliers et des casseurs automobiles tunisiens. Cela permet d'obtenir des tarifs bien en dessous du catalogue officiel, tout en disposant de composants compatibles et fonctionnels. Contactez directement le vendeur pour négocier le prix ou vérifier la disponibilité. Service gratuit, sans commission.",
  },
  {
    slug: "peugeot",
    category: "PIECES",
    metaTitle: "Pièces Peugeot occasion Tunisie — 208, 308, 3008 | Voito",
    metaDesc: "Pièces détachées Peugeot en Tunisie : 208, 301, 308, 3008, Partner. Neuves et occasion, prix en dinars. Annonces sur Voito.",
    h2Top: "Pièces détachées Peugeot : le plus grand choix en Tunisie",
    descriptionTop: "Peugeot domine le parc automobile tunisien, ce qui en fait la marque avec l'offre de pièces détachées la plus fournie. Sur Voito, retrouvez des composants pour la 208, la 301, la 308, le 3008 et le Partner : moteurs, boîtes de vitesses, embrayages, radiateurs, phares, feux arrière, rétroviseurs et éléments de carrosserie. Les vendeurs — particuliers comme professionnels du recyclage auto — publient la référence exacte, la compatibilité modèle et année, l'état de la pièce et le prix en dinars tunisiens.",
    h2Bottom: "Pièces Peugeot à prix réduit sur Voito",
    descriptionBottom: "Entretenir ou réparer une Peugeot en Tunisie est plus économique quand on accède à des pièces d'occasion de qualité. Voito centralise les offres de tout le pays pour que vous puissiez comparer les tarifs et choisir le vendeur le plus proche. Pas de commission sur la transaction : le prix affiché est celui que vous payez au vendeur. Déposez aussi vos propres pièces à vendre si vous démontez un véhicule.",
  },
  {
    slug: "renault",
    category: "PIECES",
    metaTitle: "Pièces Renault occasion Tunisie — Clio, Symbol, Megane | Voito",
    metaDesc: "Pièces détachées Renault en Tunisie : Clio, Symbol, Megane, Duster. Neuves et occasion entre particuliers, prix TND sur Voito.",
    h2Top: "Pièces détachées Renault en Tunisie",
    descriptionTop: "Renault compte parmi les constructeurs les mieux représentés sur les routes tunisiennes. Les Clio, Symbol, Megane et Duster circulent en grand nombre, ce qui alimente un marché dynamique de pièces détachées. Sur Voito, les vendeurs proposent des composants mécaniques (courroie de distribution, pompe à eau, turbo), des pièces de carrosserie (capots, ailes, portières), de l'éclairage (phares, clignotants) et des éléments d'habitacle (sièges, tableaux de bord). Chaque annonce indique la compatibilité, l'état et le prix en dinars.",
    h2Bottom: "Trouvez la bonne pièce Renault au bon prix",
    descriptionBottom: "Inutile de chercher dans plusieurs casses ou magasins : Voito réunit les offres de pièces Renault de tout le pays sur une seule plateforme. Comparez les prix, vérifiez les photos et contactez le vendeur pour vous assurer de la compatibilité avec votre véhicule. La plateforme est gratuite pour les acheteurs comme pour les vendeurs, et aucune commission n'est prélevée sur la vente.",
  },
  {
    slug: "toyota",
    category: "PIECES",
    metaTitle: "Pièces Toyota occasion Tunisie — Yaris, Corolla, Hilux | Voito",
    metaDesc: "Pièces détachées Toyota en Tunisie : Yaris, Corolla, RAV4, Hilux. Neuves et occasion, prix en dinars. Annonces sur Voito.",
    h2Top: "Pièces détachées Toyota disponibles en Tunisie",
    descriptionTop: "Toyota bénéficie d'une réputation de fiabilité légendaire en Tunisie. Les Yaris, Corolla, RAV4 et Hilux parcourent des centaines de milliers de kilomètres, mais finissent par nécessiter des pièces de remplacement. Sur Voito, les vendeurs proposent tout ce qu'il faut : démarreurs, pompes d'injection, joints de culasse, plaquettes de frein, phares, pare-chocs et accessoires divers. Chaque annonce mentionne la référence OEM ou adaptable, le modèle concerné, l'état de la pièce et le prix en TND.",
    h2Bottom: "Pièces Toyota à petit prix entre particuliers",
    descriptionBottom: "Les pièces Toyota d'occasion permettent de prolonger la vie de votre véhicule sans grever votre budget. Sur Voito, acheteurs et vendeurs se retrouvent sans intermédiaire. Que vous possédiez une Yaris urbaine ou un Hilux de chantier, vous trouverez les composants nécessaires à des tarifs compétitifs. Publiez aussi vos pièces Toyota disponibles pour qu'elles trouvent preneur rapidement.",
  },
  {
    slug: "volkswagen",
    category: "PIECES",
    metaTitle: "Pièces Volkswagen occasion Tunisie — Golf, Polo, Tiguan | Voito",
    metaDesc: "Pièces détachées VW en Tunisie : Golf, Polo, Caddy, Tiguan. Neuves et occasion, prix en dinars. Annonces sur Voito.",
    h2Top: "Pièces détachées Volkswagen en Tunisie",
    descriptionTop: "Volkswagen occupe une place importante dans le parc automobile tunisien, en particulier avec la Golf, la Polo, le Caddy et le Tiguan. La demande en pièces de rechange suit cette popularité. Sur Voito, vous trouverez des composants moteur (TSI et TDI), des éléments de boîte DSG, des pièces de suspension, de freinage, d'éclairage et de carrosserie. Les vendeurs précisent le code pièce, la génération du véhicule compatible (Golf 5, 6, 7…), l'état et le tarif en dinars tunisiens.",
    h2Bottom: "Trouvez vos pièces VW d'occasion sur Voito",
    descriptionBottom: "Entretenir une Volkswagen en Tunisie devient plus abordable grâce aux pièces d'occasion disponibles sur Voito. Comparez les offres de particuliers et de professionnels du démontage, vérifiez les références et négociez le prix directement. La plateforme ne prélève aucune commission. Vendeurs, déposez vos pièces VW gratuitement pour les rendre visibles aux propriétaires de Volkswagen dans tout le pays.",
  },
];

async function main() {
  let updated = 0;
  let errors = 0;

  for (const brand of brandsSeo) {
    try {
      await prisma.brand.update({
        where: {
          slug_category: {
            slug: brand.slug,
            category: brand.category,
          },
        },
        data: {
          metaTitle: brand.metaTitle,
          metaDesc: brand.metaDesc,
          h2Top: brand.h2Top,
          descriptionTop: brand.descriptionTop,
          h2Bottom: brand.h2Bottom,
          descriptionBottom: brand.descriptionBottom,
        },
      });
      updated++;
      console.log(`✓ [${brand.category}] ${brand.slug}`);
    } catch (err) {
      errors++;
      console.error(`✗ [${brand.category}] ${brand.slug}:`, err.message);
    }
  }

  console.log(`\nTerminé : ${updated} mises à jour, ${errors} erreurs`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
