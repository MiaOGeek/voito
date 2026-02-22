import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// New brands to create (not in original seed)
const newBrands = [
  { name: 'Seat', slug: 'seat', models: ['Ateca', 'Leon'] },
  { name: 'Jaguar', slug: 'jaguar', models: ['F-Pace', 'XF'] },
  { name: 'Land Rover', slug: 'land-rover', models: ['Freelander', 'Range Rover Evoque'] },
  { name: 'Volvo', slug: 'volvo', models: ['EX30'] },
  { name: 'Porsche', slug: 'porsche', models: ['Panamera', 'Cayenne'] },
];

// New models to add to existing brands
const existingBrandNewModels: Record<string, string[]> = {
  'mercedes': ['CLA', 'Classe S'],
  'bmw': ['Série 4 Gran Coupé'],
};

interface CarListing {
  title: string;
  description: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: 'ESSENCE' | 'DIESEL' | 'HYBRIDE' | 'ELECTRIQUE';
  transmission: 'MANUELLE' | 'AUTOMATIQUE';
  fiscalPower: number | null;
  city: string;
  images: string[];
  brandSlug: string;
  modelName: string;
}

const listings: CarListing[] = [
  {
    title: 'Mercedes-Benz Classe A AMG 250e EQ Power 218cv',
    description: 'Hybride rechargeable essence, 163 cv thermique, 218 cv combinés. Toit panoramique, caméras 360°, Android Auto/Apple CarPlay, sièges chauffants et ventilés, conduite semi-autonome, pneus Run-Flat. Première main, très bon état. Plein LED Xenon.',
    price: 133000,
    year: 2023,
    mileage: 29000,
    fuelType: 'HYBRIDE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 9,
    city: 'Monastir',
    images: ['https://catalogue.automobile.tn/max/2026/02/123402_max.jpeg?t=1770987305'],
    brandSlug: 'mercedes',
    modelName: 'Classe A',
  },
  {
    title: 'Volkswagen Golf 8 GTE eHybrid 204cv DSG6',
    description: 'Hybride rechargeable, très bon prix. Première main, excellent état, 58 000 km. LED, sièges chauffants, Apple CarPlay, Android Auto, aide au stationnement, conduite semi-autonome. Entretien complet.',
    price: 92000,
    year: 2021,
    mileage: 58000,
    fuelType: 'HYBRIDE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 8,
    city: 'Monastir',
    images: ['https://catalogue.automobile.tn/max/2026/01/122769_max.jpeg?t=1769860529'],
    brandSlug: 'volkswagen',
    modelName: 'Golf',
  },
  {
    title: 'Volkswagen Golf 6 Team 1.2 TSI 105cv',
    description: 'Importée d\'Allemagne, première main. Couleur Blue Graphite Pearl (bleu nacré métallisé). Moteur essence 1.2 TSI 105 ch. Véhicule très bien entretenu, aucune dépense à prévoir. Historique clair, sans accident.',
    price: 38500,
    year: 2010,
    mileage: 182000,
    fuelType: 'ESSENCE',
    transmission: 'MANUELLE',
    fiscalPower: 7,
    city: 'Ariana',
    images: ['https://catalogue.automobile.tn/max/2025/11/120090_max.jpeg?t=1770728840'],
    brandSlug: 'volkswagen',
    modelName: 'Golf',
  },
  {
    title: 'Seat Ateca Xperience 1.4 TSI 150cv Automatique',
    description: 'Particulier vend son Ateca Xperience, entretien régulier auprès du concessionnaire. SUV, première main, traction avant. Moteur 1.4L TSI 150 ch, cylindrée 1395 cm³.',
    price: 78000,
    year: 2021,
    mileage: 118000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 8,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2026/02/123217_max.jpeg?t=1771238080'],
    brandSlug: 'seat',
    modelName: 'Ateca',
  },
  {
    title: 'Jaguar F-Pace Prestige 2.0D 180cv',
    description: 'Design sportif et finitions haut de gamme. Toit panoramique, peinture noire brillante, système multimédia InControl Touch Pro avec navigation, contrôle à distance via app Jaguar. ABS, airbags multiples, alerte franchissement de ligne, aide au démarrage en côte. Entretien exclusivement chez le concessionnaire Jaguar agréé.',
    price: 85000,
    year: 2017,
    mileage: 136000,
    fuelType: 'DIESEL',
    transmission: 'MANUELLE',
    fiscalPower: 10,
    city: 'Sousse',
    images: ['https://catalogue.automobile.tn/max/2026/02/123514_max.jpeg?t=1771238802'],
    brandSlug: 'jaguar',
    modelName: 'F-Pace',
  },
  {
    title: 'BMW Série 3 Confort Modern Line 318d 143cv Auto',
    description: 'Berline diesel, boîte automatique. Intérieur beige, extérieur marron. Très bon prix, bien en dessous de la moyenne du marché pour un véhicule comparable.',
    price: 54000,
    year: 2013,
    mileage: 242000,
    fuelType: 'DIESEL',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 7,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2026/02/123513_max.jpeg?t=1771238567'],
    brandSlug: 'bmw',
    modelName: 'Série 3',
  },
  {
    title: 'Seat Leon Dynamic 1.4 TSI 150cv Automatique',
    description: 'Seat Leon 1.4 TSI 150 ch, 4 cylindres, 83 000 km, boîte automatique. Tous les entretiens chez VW. Première main, très bon état. Compacte noire, intérieur gris.',
    price: 79900,
    year: 2021,
    mileage: 83000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 8,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2025/12/121353_max.jpeg?t=1770818483'],
    brandSlug: 'seat',
    modelName: 'Leon',
  },
  {
    title: 'Seat Ateca Dynamic 1.4 TSI 150cv Automatique',
    description: 'SUV, première main, très bon état, 54 000 km. Immatriculée mars 2023. Android Auto, Apple CarPlay, toit panoramique, phares LED, aide au stationnement. Intérieur gris, extérieur blanc.',
    price: 99900,
    year: 2023,
    mileage: 54000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 8,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2026/02/121657_max.jpeg?t=1770818507'],
    brandSlug: 'seat',
    modelName: 'Ateca',
  },
  {
    title: 'Citroën Berlingo Van Business 1.5 BlueHDi 75cv',
    description: 'Importé de France, 3 places. Moteur 1.5 BlueHDi avec chaîne de distribution. Kilométrage 120 000 réel. Limiteur et régulateur de vitesse, radar de recul, frein main électrique, rétroviseurs électriques, climatisation.',
    price: 44500,
    year: 2021,
    mileage: 120000,
    fuelType: 'DIESEL',
    transmission: 'MANUELLE',
    fiscalPower: 4,
    city: 'Nabeul',
    images: ['https://catalogue.automobile.tn/max/2026/02/123512_max.jpeg?t=1771238802'],
    brandSlug: 'citroen',
    modelName: 'Berlingo',
  },
  {
    title: 'Mercedes-Benz GLA Progressive 180 CDi 109cv',
    description: 'Mercedes GLA 180 diesel, première main, très bon état. Boîte manuelle, éclairage LED, jantes alu, assistance à la conduite. Caméra de recul, direction assistée, ordinateur de bord, rétroviseurs électriques.',
    price: 76000,
    year: 2016,
    mileage: 151000,
    fuelType: 'DIESEL',
    transmission: 'MANUELLE',
    fiscalPower: 5,
    city: 'Sousse',
    images: ['https://catalogue.automobile.tn/max/2026/02/123511_max.jpeg?t=1771237573'],
    brandSlug: 'mercedes',
    modelName: 'GLA',
  },
  {
    title: 'Land Rover Freelander TD4 SUV Diesel',
    description: 'SUV 4x4 en très bon état, intérieur cuir complet. ABS, airbags multiples, anti-vol électronique. Climatisation automatique, vitres électriques, toit panoramique. Transmission intégrale automatique.',
    price: 55000,
    year: 2009,
    mileage: 200000,
    fuelType: 'DIESEL',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 11,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2023/04/90178_max.jpeg?t=1770892174'],
    brandSlug: 'land-rover',
    modelName: 'Freelander',
  },
  {
    title: 'Land Rover Range Rover Evoque R-Dynamic 2.0 TD4 180cv',
    description: 'Importée d\'Allemagne en 2017, finition R-Dynamic, 10 cv, 4x4. Diesel, boîte automatique BVA9. Intérieur cuir synthétique noir, extérieur blanc. SUV 5 places.',
    price: 92000,
    year: 2016,
    mileage: 160000,
    fuelType: 'DIESEL',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 10,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2024/09/106073_max.jpeg?t=1770480841'],
    brandSlug: 'land-rover',
    modelName: 'Range Rover Evoque',
  },
  {
    title: 'Volvo EX30 Core Single Motor 272cv - Électrique',
    description: 'Volvo EX30 neuf dans l\'emballage, 0 km. Prix 102 000 DT au lieu de 115 900 DT prix maison. SUV électrique, 5 cv fiscaux, automatique. Blanc.',
    price: 102000,
    year: 2025,
    mileage: 0,
    fuelType: 'ELECTRIQUE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 5,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2026/01/122679_max.jpeg?t=1770479412'],
    brandSlug: 'volvo',
    modelName: 'EX30',
  },
  {
    title: 'Porsche Panamera 4 V6 3.6 PDK 300cv',
    description: 'Porsche Panamera 4 avec kilométrage certifié à la maison Porsche. Première main. Voiture très très propre comme neuve. Moteur V6 3.6L 24V, 300 ch. Berline 4 portes, intérieur beige.',
    price: 129000,
    year: 2010,
    mileage: 78000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 21,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2026/02/123223_max.jpeg?t=1770557178'],
    brandSlug: 'porsche',
    modelName: 'Panamera',
  },
  {
    title: 'BMW Série 4 Gran Coupé Luxury Line 418i 136cv',
    description: 'BMW 418i Gran Coupé finition Luxury Line, toit ouvrant électrique, jantes 18 pouces neuves. Moteur 1.5i 12V Steptronic8. Première main, très bon état. Prix légèrement négociable.',
    price: 105000,
    year: 2019,
    mileage: 79000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 7,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2025/09/118015_max.jpeg?t=1757846329'],
    brandSlug: 'bmw',
    modelName: 'Série 4 Gran Coupé',
  },
  {
    title: 'Mercedes-Benz CLA AMG 180 1.3i 7G-DCT 136cv',
    description: 'Mercedes CLA 180 Kit AMG fin 2021. Berline noire, intérieur Alcantara. Première main, très bon état. Boîte automatique 7G-DCT. Prix légèrement négociable.',
    price: 117000,
    year: 2021,
    mileage: 85000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 7,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2025/10/119568_max.jpeg?t=1769248957'],
    brandSlug: 'mercedes',
    modelName: 'CLA',
  },
  {
    title: 'Porsche Cayenne 3.6 V6 Tiptronic S 300cv',
    description: 'Porsche Cayenne blanc pack night, V6 3.6 cm3. Importée en 2015, état presque neuf. Boule de remorquage électrique. Intérieur cuir noir, SUV 5 places. Première main.',
    price: 106000,
    year: 2012,
    mileage: 195000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 21,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2024/10/107279_max.jpeg?t=1770989089'],
    brandSlug: 'porsche',
    modelName: 'Cayenne',
  },
  {
    title: 'Mercedes-Benz Classe C AMG 180 1.5i 9G-Tronic 156cv',
    description: 'Mercedes C180 Kit AMG, 8 cv essence, 1598 cm3. Toit panoramique ouvrant, très bon état. Berline noire, intérieur cuir intégral noir. Première main, sous leasing. Prix légèrement négociable.',
    price: 132000,
    year: 2019,
    mileage: 147000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 8,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2025/07/116476_max.jpeg?t=1771165727'],
    brandSlug: 'mercedes',
    modelName: 'Classe C',
  },
  {
    title: 'Mercedes-Benz Classe S Executive 350 V6 7G-Tronic 306cv',
    description: 'Mercedes Classe S, très très propre comme neuve. Jantes AMG 20 pouces, équipement optionnel complet. Berline noire, intérieur cuir intégral noir. Prix légèrement négociable. Moteur V6 3.5i 24V.',
    price: 99000,
    year: 2010,
    mileage: 165000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 18,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2025/02/103089_max.jpeg?t=1770894550'],
    brandSlug: 'mercedes',
    modelName: 'Classe S',
  },
  {
    title: 'Jaguar XF R-Sport 2.0D mHEV 204cv Automatique',
    description: 'Jaguar XF Kit R-Dynamic, diesel toute option. Entretien maison Jaguar régulier. Phares LED, toit panoramique, intérieur cuir, sièges électriques, navigation, Bluetooth, caméra de recul, radar arrière, pneus Run-Flat, climatisation.',
    price: 145000,
    year: 2022,
    mileage: 110000,
    fuelType: 'DIESEL',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 10,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2026/02/123207_max.jpeg?t=1770480394'],
    brandSlug: 'jaguar',
    modelName: 'XF',
  },
  {
    title: 'Audi Q3 Sport 35 TFSI S-tronic 150cv',
    description: 'Audi Q3 toute option, essence 9 cv, couleur gris Nardo. SUV, première main, très bon état. Traction avant, intérieur gris. Moteur 1498 cm³, 150 ch. Prix négociable.',
    price: 115000,
    year: 2020,
    mileage: 110000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 9,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2026/01/122677_max.jpeg?t=1769175580'],
    brandSlug: 'audi',
    modelName: 'Q3',
  },
  {
    title: 'Jaguar XF Pure 2.0 Ti 250cv Automatique',
    description: 'Magnifique Jaguar XF 25t essence 2017. Boîte automatique ZF 8 rapports. Berline sportive et élégante, première main, très bien entretenue. Moteur turbo 2.0L 250 ch, conso ~7-8L/100km. Caméra de recul, radar, park assist, cruise control, LED, cuir, sièges électriques, navigation, toit panoramique.',
    price: 85000,
    year: 2017,
    mileage: 109000,
    fuelType: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    fiscalPower: 15,
    city: 'Tunis',
    images: ['https://catalogue.automobile.tn/max/2026/02/123271_max.jpeg?t=1770719565'],
    brandSlug: 'jaguar',
    modelName: 'XF',
  },
];

async function main() {
  console.log('🚗 Starting car data seeding from automobile.tn...');

  // Get the test user
  const user = await prisma.user.findUnique({ where: { email: 'john@doe.com' } });
  if (!user) {
    console.error('❌ Test user john@doe.com not found. Run seed.ts first.');
    process.exit(1);
  }
  console.log('✅ Found test user:', user.email);

  const brandMap: Record<string, string> = {};
  const modelMap: Record<string, string> = {};

  // Create new brands + models
  for (const brandData of newBrands) {
    const brand = await prisma.brand.upsert({
      where: { slug: brandData.slug },
      update: {},
      create: { name: brandData.name, slug: brandData.slug },
    });
    brandMap[brandData.slug] = brand.id;

    for (const modelName of brandData.models) {
      const model = await prisma.model.upsert({
        where: { brandId_name: { brandId: brand.id, name: modelName } },
        update: {},
        create: { name: modelName, brandId: brand.id },
      });
      modelMap[`${brandData.slug}:${modelName}`] = model.id;
    }
    console.log(`  ✓ ${brand.name} (new) with ${brandData.models.length} models`);
  }

  // Add new models to existing brands
  for (const [slug, models] of Object.entries(existingBrandNewModels)) {
    const brand = await prisma.brand.findUnique({ where: { slug } });
    if (!brand) {
      console.warn(`  ⚠ Existing brand ${slug} not found, skipping`);
      continue;
    }
    brandMap[slug] = brand.id;

    for (const modelName of models) {
      const model = await prisma.model.upsert({
        where: { brandId_name: { brandId: brand.id, name: modelName } },
        update: {},
        create: { name: modelName, brandId: brand.id },
      });
      modelMap[`${slug}:${modelName}`] = model.id;
    }
    console.log(`  ✓ ${brand.name}: added ${models.join(', ')}`);
  }

  // Load existing brands/models into maps
  const existingSlugs = ['volkswagen', 'bmw', 'mercedes', 'audi', 'citroen'];
  for (const slug of existingSlugs) {
    if (brandMap[slug]) continue;
    const brand = await prisma.brand.findUnique({ where: { slug } });
    if (brand) {
      brandMap[slug] = brand.id;
      const models = await prisma.model.findMany({ where: { brandId: brand.id } });
      for (const m of models) {
        modelMap[`${slug}:${m.name}`] = m.id;
      }
    }
  }

  // Create listings
  console.log('📋 Creating car listings...');
  let created = 0;

  for (const listing of listings) {
    const brandId = brandMap[listing.brandSlug];
    const modelKey = `${listing.brandSlug}:${listing.modelName}`;
    const modelId = modelMap[modelKey];

    if (!brandId) {
      console.warn(`  ⚠ Brand not found: ${listing.brandSlug}, skipping ${listing.title}`);
      continue;
    }

    await prisma.listing.create({
      data: {
        title: listing.title,
        description: listing.description,
        category: 'VOITURES',
        price: listing.price,
        year: listing.year,
        mileage: listing.mileage,
        fiscalPower: listing.fiscalPower,
        fuelType: listing.fuelType,
        transmission: listing.transmission,
        city: listing.city,
        images: listing.images,
        brandId,
        modelId: modelId || null,
        userId: user.id,
        status: 'ACTIVE',
      },
    });
    created++;
    console.log(`  ✓ ${listing.title} - ${listing.price.toLocaleString()} TND`);
  }

  console.log(`\n✅ Seeding complete! ${created} car listings created.`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
