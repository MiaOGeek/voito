import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const motoBrands = [
  {
    name: 'Zimota',
    slug: 'zimota',
    models: ['Superlight Keeway', 'RKS', 'Eagle', 'Partner', 'Sinus', 'Tapo', 'Kee', 'Joy', 'Target', 'Evo', 'Vera']
  },
  {
    name: 'Forza',
    slug: 'forza',
    models: ['Max', 'FTM', 'First Maxi', 'BBM', 'Somim']
  },
  {
    name: 'SLC',
    slug: 'slc',
    models: ['Cappuccino S', 'Tank']
  },
  {
    name: 'SYM',
    slug: 'sym',
    models: ['NHX']
  },
  {
    name: 'FTM',
    slug: 'ftm',
    models: ['Hammer 3']
  },
];

interface ListingData {
  title: string;
  description: string;
  price: number;
  year: number | null;
  mileage: number | null;
  fuelType: 'ESSENCE';
  city: string;
  images: string[];
  brandSlug: string;
  modelName: string;
}

const listings: ListingData[] = [
  {
    title: 'CAPPUCINO S SLC - 125 CC - BLEU',
    description: 'Scooteur SLC | CAPPUCINO S - 4 TEMPS - 4 Vitesses - Frein Avant : disque / Arrière : Tambour - Freins avant et arrière à la main - Réservoir : 4.5 Litres - Vitesse Max : 90 Km/h - Système Alarme - Pneu Tubeless - Garantie 5000 Km ou 6 mois',
    price: 5499,
    year: 2025,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Nabeul',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2025/12/bleu-6945051da287b8.27377951-1024x682.jpg'],
    brandSlug: 'slc',
    modelName: 'Cappuccino S',
  },
  {
    title: 'ZIMOTA SUPERLIGHT KEEWAY 124CC',
    description: 'Monocylindre 4 temps - Refroidissement par air - Réservoir : 12.5 litres - Démarrage électrique - Boîte 5 vitesses - Transmission par chaîne - Cadre double acier - Suspension avant télescopique (110mm) - Double amortisseurs arrière (80mm) - Frein avant disque (275mm) - Couple maxi : 7.8 kW à 9000 RPM',
    price: 7499,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sousse',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/486380699_1075227314649953_8514328509648710066_n-67f8d07fe720a5.40747360-1024x683.jpg'],
    brandSlug: 'zimota',
    modelName: 'Superlight Keeway',
  },
  {
    title: 'ZIMOTA RKS 125 CC',
    description: 'Monocylindre 4 temps - Refroidissement à air - Réservoir : 16 litres - Puissance max : 8.4 ch à 8500 tr/min - Couple max : 10.0 Nm à 7000 tr/min - Freins : disque avant (240mm) / tambour arrière (130mm) - Pneus : 90/90-17 / 110/80-17 - Dimensions : 2040 x 780 x 1070 mm - Poids : 117 kg',
    price: 5749,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sousse',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/moto-zimota-rks-125-1024x683.jpg'],
    brandSlug: 'zimota',
    modelName: 'RKS',
  },
  {
    title: 'Zimota Eagle Bleu - Scooter 50CC',
    description: 'Scooter Zimota Eagle - Monocylindre 2 temps - Refroidissement à air - Réservoir : 5.5 litres - Couple maxi : 4.0 Nm/6500 tr/pm - Batterie : 12V 7Ah - Pneus : 120/70-12 - Suspension avant : fourche hydraulique (70mm) - Suspension arrière : amortisseur (45mm)',
    price: 3749,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sfax',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/scooter-zimota-eagle-bleu-3.webp'],
    brandSlug: 'zimota',
    modelName: 'Eagle',
  },
  {
    title: 'Zimota Partner 109CC - Bleu',
    description: 'Monocylindre 4 temps - Refroidissement à air - Frein avant : mono disque (217mm) - Frein arrière : tambour (110mm) - Réservoir : 3.6L - Suspension avant hydraulique - Suspension arrière à ressort - Pneus 17 pouces - Batterie YB 5Lb - Dimensions : 1950 x 700 x 1100mm',
    price: 3349,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sfax',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/motocycle-zimota-partner-bleu.webp'],
    brandSlug: 'zimota',
    modelName: 'Partner',
  },
  {
    title: 'Zimota Sinus 125 CC - Scooter',
    description: 'Scooter Zimota Sinus - Monocylindre 4 temps - 4 vitesses - Refroidissement à air - Réservoir : 6.2 litres - Couple maxi : 4.0 Nm - Suspension avant : fourche hydraulique - Suspension arrière : amortisseur - Freins : disque avant / tambour arrière - Dimensions : 1900 x 685 x 1135 mm - Poids : 112 kg - Garantie : 1500 km',
    price: 4599,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Ariana',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/moto-zimota-sinus-125-cc.jpg'],
    brandSlug: 'zimota',
    modelName: 'Sinus',
  },
  {
    title: 'ZIMOTA RKS 124CC - Noir/Gris',
    description: 'Monocylindre 4 temps - Refroidissement à air - Réservoir : 16 litres - Couple max : 10.0 Nm à 7000 tr/min - Puissance max : 8.4 kW à 8500 tr/min - Carburation - Freins : disque avant 240mm / tambour arrière 130mm - Pneus : 90/90-17 / 110/80-17 - Dimensions : 2040 x 780 x 1070 mm - Poids : 117 kg',
    price: 5799,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Ariana',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/havasu-nutri-extra-streng-argini.jpg'],
    brandSlug: 'zimota',
    modelName: 'RKS',
  },
  {
    title: 'ZIMOTA TAPO 49 CC - Scooter',
    description: 'Monocylindre 2 temps - Refroidissement par air - Alésage x course : 40x39.2 - Couple maxi : 4.0 Nm/6500 tr/pm - Démarrage : électrique/kick - Poids à sec : 87 kg - Réservoir : 5.5L - Freins : disque avant / tambour arrière - Pneus : 120/70-12 - Suspension avant : fourche hydraulique (70mm) - Suspension arrière : amortisseur (45mm) - Garantie : 1500 km / 6 mois',
    price: 3999,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Ariana',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/scooteur-zimota-tapo-49-cc-.jpg'],
    brandSlug: 'zimota',
    modelName: 'Tapo',
  },
  {
    title: 'Zimota KEE Noir 110CC',
    description: 'Motocycle Zimota KEE - Monocylindre 4 temps - Refroidissement à air - Réservoir : 4.8 Litres - Couple : 8.3 Nm - Poids à sec : 103 kg - Dimensions : 1950 x 685 x 1120 mm',
    price: 4099,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Ariana',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/motocycle-zimota-kee-noir.jpg'],
    brandSlug: 'zimota',
    modelName: 'Kee',
  },
  {
    title: 'ZIMOTA JOY 107CC ROUGE',
    description: 'Monocylindre 4 temps - Refroidissement à air - Réservoir : 3.5 Litres - Pneus : 2.50-17 / 2.75-17 - Suspension avant télescopique - Suspension arrière amortisseur à huile - Freins tambour AV/AR (110mm) - Couple maxi : 7.8 Nm à 5500 tr/min - Poids à sec : 98 kg - Dimensions : 1900 x 685 x 1120 mm',
    price: 3475,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Ariana',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/moto-cyclomoteur-zimota-joy-107cc.jpg'],
    brandSlug: 'zimota',
    modelName: 'Joy',
  },
  {
    title: 'ZIMOTA Target 125 - Rouge',
    description: 'Réservoir : 13.8 litres - 4 vitesses - Moteur 4 temps - Freins : mono disque avant 217/10, tambour arrière 130 - Refroidissement à air - Dimensions : 1970 x 720 x 1100 mm - Garantie : 1500 km',
    price: 4335,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Ariana',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/motocycle-zimota-target-125.jpg'],
    brandSlug: 'zimota',
    modelName: 'Target',
  },
  {
    title: 'Scooter ZIMOTA EVO 50CC - Noir',
    description: 'Scooter Zimota Evo - Monocylindre 2 temps - Refroidissement à air - Réservoir : 4.8L - Démarrage : électronique/kick - Freins : disque avant / tambour arrière - Suspension avant : fourche hydraulique - Poids : 92 kg - Dimensions : 1870 x 700 mm',
    price: 3999,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Ariana',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/moto-scooter-zimota-evo-49cc.jpg'],
    brandSlug: 'zimota',
    modelName: 'Evo',
  },
  {
    title: 'ZIMOTA SCOOTER VERA BLEU 80CC',
    description: 'Monocylindre 4 temps - Refroidissement à air - Freins : disque avant / tambour arrière - Pneus : 90/90-10 - Suspension avant : fourche hydraulique - Suspension arrière : amortisseur - Réservoir : 6.8L - Couple maxi : 4.5 Nm à 6500 tr/min - Dimensions : 1755 x 775 mm - Batterie : 12V 7Ah',
    price: 4705,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Ariana',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/moto-zimota-scooter-vera-bleu-79cc.png'],
    brandSlug: 'zimota',
    modelName: 'Vera',
  },
  {
    title: 'FORZA MAX 124CC - Digital Frein à Main',
    description: 'Motocycle FORZA MAX - Moteur : 124 cm³ 4 temps - Monocylindre 4 temps - Refroidissement à air - 4 vitesses - Réservoir : 3.5L - Démarrage : électrique/kick - Freins : disque avant / tambour arrière - Roues 17 pouces',
    price: 3059,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sousse',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/motocyclebbmforza107ccgris_1-6615078acb33c3.32118179.jpg'],
    brandSlug: 'forza',
    modelName: 'Max',
  },
  {
    title: 'FORZA MAX 107CC UNISCOOT - Gris',
    description: 'Motocycle FORZA MAX - Moteur 4 temps - Refroidissement à air - Cylindrée : 110 cm3 - Démarrage : Électrique/kick - Allumage : CDI - Réservoir : 4.5 Litres - Pneus : 2.25-17/2.75-17 - Freins : Disque/Tambour ABS - Transmission : Automatique / 4 Vitesses - Alarme + 2 commandes',
    price: 2869,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sousse',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/forzamax2-5fe43ced137c1.jpg'],
    brandSlug: 'forza',
    modelName: 'Max',
  },
  {
    title: 'FORZA FTM 125CC - Noir',
    description: 'Motocycle Forza FTM - Monocylindre 4 temps - Dimensions : 1950 x 685 x 1140 mm - Empattement : 1290 mm - Garde au sol : 110 mm - Poids net : 88 kg - Charge max : 150 kg',
    price: 3039,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sousse',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/gauche-602645e2e9d54-1-1024x614.jpg'],
    brandSlug: 'forza',
    modelName: 'FTM',
  },
  {
    title: 'FORZA FIRST MAXI III 125CC - Digital',
    description: 'Motocycle FORZA FIRST - Transmission automatique CVT - Démarrage : Électrique + Kick - Vitesse maximale : environ 90 km/h - Transmission par courroie - Frein avant : disque - Frein arrière : tambour/disque - Double suspension arrière hydraulique - Jantes aluminium 12 pouces - Compteur digital LED',
    price: 2999,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sousse',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/votretextedeparagraphe-68753762908a23.72790284.png'],
    brandSlug: 'forza',
    modelName: 'First Maxi',
  },
  {
    title: 'FORZA BBM 107CC - Digital Frein Pied',
    description: 'Motocycle FORZA BBM - Moteur 4 temps monocylindre - Refroidissement à air - Transmission par chaîne, 4 vitesses - Réservoir : 3.5 litres - Démarrage : électrique/kick - Allumage CDI - Freins : disque avant / tambour arrière - Roues 17 pouces - Pneus : 2.50-17 / 2.75-17 - Suspension : fourche télescopique / hydraulique arrière - Longueur : 1950 mm',
    price: 2949,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sousse',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/motocyclebbmforza107ccnoir2-661506581f6121.17037042.jpg'],
    brandSlug: 'forza',
    modelName: 'BBM',
  },
  {
    title: 'FORZA 107CC SOMIM - Automatique',
    description: 'Moto FORZA 107CC SOMIM Automatique - Frein à main - Garantie : 2000 km/moteur - Monocylindre 4 temps - Refroidissement à air - Puissance : 4.8 kW - Allumage CDI - Réservoir : 4.5L - Transmission automatique 4 vitesses - Freins : disque/tambour ABS - Système alarme + 2 commandes',
    price: 2949,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sousse',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/ChatGPT-Image-6-sept.-2025-10_48_24-1024x683.png'],
    brandSlug: 'forza',
    modelName: 'Somim',
  },
  {
    title: 'FTM HAMMER 3 120CC - Noir',
    description: 'Cyclomoteur 120cc - Homologation CEE - Charge utile : 125 kg - Vitesse max : 150 km/h - Transmission par chaîne - Réservoir : 4.6 litres - Freins à disque AV/AR - Embrayage automatique - Consommation : 2L/100km - Carburation',
    price: 4089,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sousse',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/03aef9ef210731c43ac1ea816f1e788a_IMG_2151.jpg'],
    brandSlug: 'ftm',
    modelName: 'Hammer 3',
  },
  {
    title: 'TANK 125CC BY SLC - Scooter Gris',
    description: 'Scooter Tank SLC - Monocylindre 4 temps GY6 - Refroidissement par air - Transmission automatique CVT - Vitesse maximale : 80 km/h - Consommation : 2.6L/100km - Réservoir : 6.5L',
    price: 5099,
    year: 2026,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Sousse',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/01/518043994_734408355864696_3447614775479995680_n-removebg-preview.png'],
    brandSlug: 'slc',
    modelName: 'Tank',
  },
  {
    title: 'SYM NHX 124CC - Beige',
    description: 'Légère, nerveuse et ultra-maniable, la compagne idéale pour gratter les secondes dans le trafic. Moteur punchy de 125cc. Freinage CBS pour une sécurité totale. Look Roadster qui fait tourner les têtes. Transmission par chaîne. Moteur 4 temps.',
    price: 8200,
    year: 2025,
    mileage: 0,
    fuelType: 'ESSENCE',
    city: 'Nabeul',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/02/Screenshot_2026-02-04-18-16-47-579_com.facebook.katana-3-460x1024.png'],
    brandSlug: 'sym',
    modelName: 'NHX',
  },
  {
    title: 'Peugeot Satelis 125 - Occasion',
    description: 'Monocylindre 4 temps, 4 soupapes (SOHC) - Injection électronique - Variateur automatique (CVT) par courroie - Refroidissement liquide - Suspension avant : fourche télescopique hydraulique - Suspension arrière réglable - 20 500 km',
    price: 3500,
    year: 2014,
    mileage: 20500,
    fuelType: 'ESSENCE',
    city: 'Gabes',
    images: ['https://www.mototunisie.tn/wp-content/uploads/2026/02/Messenger_creation_FC041C4C-49ED-4591-B8B0-C52E06913795.jpeg'],
    brandSlug: 'peugeot',
    modelName: 'Satelis',
  },
];

async function main() {
  console.log('🏍️  Starting moto data seeding...');

  // Get the test user
  const user = await prisma.user.findUnique({ where: { email: 'john@doe.com' } });
  if (!user) {
    console.error('❌ Test user john@doe.com not found. Run seed.ts first.');
    process.exit(1);
  }
  console.log('✅ Found test user:', user.email);

  // Create moto brands and models
  const brandMap: Record<string, string> = {};
  const modelMap: Record<string, string> = {};

  for (const brandData of motoBrands) {
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
    console.log(`  ✓ ${brand.name} with ${brandData.models.length} models`);
  }

  // Add Satelis model to existing Peugeot brand
  const peugeot = await prisma.brand.findUnique({ where: { slug: 'peugeot' } });
  if (peugeot) {
    brandMap['peugeot'] = peugeot.id;
    const satelis = await prisma.model.upsert({
      where: { brandId_name: { brandId: peugeot.id, name: 'Satelis' } },
      update: {},
      create: { name: 'Satelis', brandId: peugeot.id },
    });
    modelMap['peugeot:Satelis'] = satelis.id;
    console.log('  ✓ Peugeot: added Satelis model');
  }

  // Create listings
  console.log('📋 Creating moto listings...');
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
        category: 'MOTOS',
        price: listing.price,
        year: listing.year,
        mileage: listing.mileage,
        fuelType: listing.fuelType,
        transmission: null,
        city: listing.city,
        images: listing.images,
        brandId,
        modelId: modelId || null,
        userId: user.id,
        status: 'ACTIVE',
      },
    });
    created++;
    console.log(`  ✓ ${listing.title} - ${listing.price} TND`);
  }

  console.log(`\n✅ Seeding complete! ${created} moto listings created.`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
