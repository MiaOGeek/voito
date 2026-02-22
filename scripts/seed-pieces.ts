import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Brands needed for pieces (most already exist from voitures seed)
const pieceBrands = [
  {
    name: 'Volkswagen',
    slug: 'volkswagen',
    models: ['Golf 7', 'Golf 5', 'Golf 6', 'Polo 5', 'Polo 6', 'Caddy', 'Passat B8'],
  },
  {
    name: 'Fiat',
    slug: 'fiat',
    models: ['500', 'Punto', 'Panda', 'Punto Evo', 'Doblo', 'Palio'],
  },
  {
    name: 'Peugeot',
    slug: 'peugeot',
    models: ['301', 'Partner', '208', '308', '2008', '207'],
  },
  {
    name: 'Citroen',
    slug: 'citroen',
    models: ['Berlingo', 'C-Elysee', 'C3', 'C4', 'DS3'],
  },
  {
    name: 'Toyota',
    slug: 'toyota',
    models: ['Yaris'],
  },
  {
    name: 'Renault',
    slug: 'renault',
    models: ['Scenic', 'Scenic 2', 'Megane'],
  },
  {
    name: 'Kia',
    slug: 'kia',
    models: ['Rio', 'Cerato'],
  },
  {
    name: 'Hyundai',
    slug: 'hyundai',
    models: ['Accent', 'Elantra'],
  },
  {
    name: 'Seat',
    slug: 'seat',
    models: ['Ibiza', 'Leon'],
  },
];

interface PieceData {
  title: string;
  description: string;
  price: number;
  city: string;
  images: string[];
  brandSlug: string;
  modelName: string;
}

const pieces: PieceData[] = [
  {
    title: 'Kit Chaîne Distribution Golf 7 1.2 TSI',
    description: 'Kit chaîne de distribution INA pour VW Golf 7 1.2 TSI, référence 553012710. Pièce de qualité OEM pour moteurs 1.2 TSI. Compatible Golf 7, Polo 6R/6C 1.2 TSI. Inclut chaîne, tendeur et guides.',
    price: 743,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/5233-large_default/kit-chaine-paliopunto124d.jpg'],
    brandSlug: 'volkswagen',
    modelName: 'Golf 7',
  },
  {
    title: 'Plaquettes de Frein Avant Toyota Yaris',
    description: 'Plaquettes de frein avant Akebono pour Toyota Yaris 2005+, référence A1N025. Fabricant : Akebono Europe SAS. Épaisseur : 15.7mm, Largeur : 131.4mm, Hauteur : 47.4mm. Système de freinage TRW. Compatible Toyota Yaris (P9) 1.0/1.3 VVT-i.',
    price: 64,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/3852-large_default/plaquettes-de-frein-avant-grande-punto-evo-05.jpg'],
    brandSlug: 'toyota',
    modelName: 'Yaris',
  },
  {
    title: 'Plaquettes de Frein Avant Berlingo Partner',
    description: 'Plaquettes de frein LPR pour Peugeot Partner / Citroën Berlingo M59, référence 05P867. Budget-friendly. Compatible : Berlingo, Partner, C4, DS4, 5008. Épaisseur : 18.3mm. Système TRW. Derniers articles en stock.',
    price: 54,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/3853-home_default/plaquettes-de-frein-avant-grande-punto-evo-05.jpg'],
    brandSlug: 'peugeot',
    modelName: 'Partner',
  },
  {
    title: 'Plaquettes de Frein Avant Fiat 500 / Punto',
    description: 'Plaquettes de frein LPR pour FIAT 500 et Punto, référence 05P1653. Épaisseur : 17.8mm, Largeur : 149.5mm, Hauteur : 52.5mm. Système de freinage ATE. Compatible : Fiat 500 (2007+), Punto Evo (2008+), Punto (2012+). OEM : 77366538.',
    price: 54,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/3852-large_default/plaquettes-de-frein-avant-grande-punto-evo-05.jpg'],
    brandSlug: 'fiat',
    modelName: '500',
  },
  {
    title: 'Kit Embrayage Peugeot 301 Berlingo 1.6 HDi',
    description: 'Kit embrayage OEM pour Peugeot 301 / Citroën Berlingo / C-Elysée 1.6 HDi 8V. Inclut disque, mécanisme et butée. Volant bimasse. Compatible 11+ modèles PSA partageant le moteur 1.6 HDi 8V.',
    price: 647,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/4843-large_default/kit-d-embrayage-g45-16-golf-56passat-b8-14tsi.jpg'],
    brandSlug: 'peugeot',
    modelName: '301',
  },
  {
    title: 'Kit Embrayage Toyota Yaris 1.0/1.3 VVT-i',
    description: 'Kit embrayage complet pour Toyota Yaris. Inclut disque, mécanisme et butée. Compatible Yaris (P9) moteurs 1.0 et 1.3 VVT-i. Pièce de qualité aux meilleurs prix du marché tunisien.',
    price: 512,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/4843-home_default/kit-d-embrayage-g45-16-golf-56passat-b8-14tsi.jpg'],
    brandSlug: 'toyota',
    modelName: 'Yaris',
  },
  {
    title: 'Kit Embrayage SACHS Golf 5/6 Passat B8 1.4 TSI',
    description: 'Kit embrayage SACHS pour VW Golf IV/V/VI, Golf Plus, Passat B6. Référence 3000950019. Diamètre : 220mm, 28 dents. Compatible Audi A1/A2/A3, Seat Ibiza/Leon, VW Golf 5/6/7 Caddy TSI. Moteurs 1.6/1.4 TSI, 75-115 CH.',
    price: 501,
    city: 'Gafsa',
    images: [
      'https://www.karhabtk.tn/4843-large_default/kit-d-embrayage-g45-16-golf-56passat-b8-14tsi.jpg',
      'https://www.karhabtk.tn/4844-home_default/kit-d-embrayage-g45-16-golf-56passat-b8-14tsi.jpg',
    ],
    brandSlug: 'volkswagen',
    modelName: 'Golf 5',
  },
  {
    title: 'Amortisseur Arrière Fiat Panda 2015',
    description: 'Amortisseur arrière LTM pour FIAT PANDA [169], référence D02579. Type hydraulique arrière. Compatible Panda 2WD avec moteurs 1.1L, 1.2L ou 1.3L JTD. Depuis 09/2003. Équivalences : KYB 343415, MONROE 23977, DELPHI DG9848.',
    price: 106,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/4673-large_default/amortisseur-arriere-panda-2-2015.jpg'],
    brandSlug: 'fiat',
    modelName: 'Panda',
  },
  {
    title: 'Émetteur Embrayage Fiat Punto 3',
    description: 'Émetteur d\'embrayage CIFAM pour Fiat Punto III, référence 505-103. Matériau : fonte. Compatible Punto II 3/5 portes (188) 09/1999 à 03/2012, 60-130 CH. Punto II Van (188) 02/2000 à 10/2009. Derniers articles en stock.',
    price: 96,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/4430-large_default/emetteur-d-embrayage-punto-3.jpg'],
    brandSlug: 'fiat',
    modelName: 'Punto',
  },
  {
    title: 'Kit Chaîne Distribution Fiat 500 Punto 1.2/1.4',
    description: 'Kit chaîne distribution FIAT original, 124 dents, référence 71736717. Compatible : Fiat 500L, 500, Punto Evo, Grande Punto, Panda MK2/MK3, Bravo MK2, Stilo, Idea, Abarth 500. Moteurs 1.2-1.4L 16v et 1.4L Turbo, 1993-2012.',
    price: 238,
    city: 'Gafsa',
    images: [
      'https://www.karhabtk.tn/5233-large_default/kit-chaine-paliopunto124d.jpg',
      'https://www.karhabtk.tn/5234-large_default/kit-chaine-paliopunto124d.jpg',
    ],
    brandSlug: 'fiat',
    modelName: 'Punto',
  },
  {
    title: 'Amortisseur Avant Renault Scenic 2',
    description: 'Amortisseur avant LTM pour Renault Scenic II, référence D28478. Type hydraulique avant. Compatible Scenic II (12/2002-04/2009) moteurs 1.4/1.6/2.0 16V, 1.5/1.9 DCi. Également compatible Grand Scenic II (12/2003-04/2009).',
    price: 170,
    city: 'Gafsa',
    images: [
      'https://www.karhabtk.tn/4797-large_default/amortisseur-avant-renault-scenic2.jpg',
      'https://www.karhabtk.tn/4798-large_default/amortisseur-avant-renault-scenic2.jpg',
    ],
    brandSlug: 'renault',
    modelName: 'Scenic 2',
  },
  {
    title: 'Joint de Culasse VW Polo 5 / Seat Ibiza 1.2',
    description: 'Joint de culasse BGA pour VW Polo 5, référence CH0510. Compatible : VW Polo (9N) 2001-2014, VW Fox (5Z) 2003-2015, Seat Ibiza III (6L1) 2002-2009, Skoda Fabia I/II 1999-2014. Moteurs 1.2L 1 arbre à cames.',
    price: 69,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/4454-large_default/joint-de-culasse-polo5.jpg'],
    brandSlug: 'volkswagen',
    modelName: 'Polo 5',
  },
  {
    title: 'Kit Distribution Dayco Kia Rio / Hyundai Accent',
    description: 'Kit courroie de distribution DAYCO 105 dents pour Kia Rio 2, Hyundai Accent, Elantra, Cerato. Référence KTB600, EAN 8021787037586. Compatible Hyundai Accent I/II/III (1994-2012), Kia Cerato I, Rio II (2005+).',
    price: 216,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/5196-large_default/kit-courroie-distribution-105-dst-rio.jpg'],
    brandSlug: 'kia',
    modelName: 'Rio',
  },
  {
    title: 'Amortisseur Arrière Renault Scenic 1',
    description: 'Amortisseur arrière LTM pour Renault Scenic I, référence D02495. Type hydraulique arrière. Compatible Scenic I (12/1995-05/2003) moteurs 1.4, 1.6, 1.8, 2.0 16V, 1.9D, 1.9DT, 1.9DCi. Manuelle et automatique.',
    price: 110,
    city: 'Gafsa',
    images: ['https://www.karhabtk.tn/4663-large_default/amortisseur-arriere-megane-senic.jpg'],
    brandSlug: 'renault',
    modelName: 'Scenic',
  },
];

async function main() {
  console.log('🔧 Starting pieces detachees seeding...');

  // Get the test user
  const user = await prisma.user.findUnique({ where: { email: 'john@doe.com' } });
  if (!user) {
    console.error('❌ Test user john@doe.com not found. Run seed.ts first.');
    process.exit(1);
  }
  console.log('✅ Found test user:', user.email);

  // Create/upsert brands and models
  const brandMap: Record<string, string> = {};
  const modelMap: Record<string, string> = {};

  for (const brandData of pieceBrands) {
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

  // Create listings
  console.log('📋 Creating pieces listings...');
  let created = 0;

  for (const piece of pieces) {
    const brandId = brandMap[piece.brandSlug];
    const modelKey = `${piece.brandSlug}:${piece.modelName}`;
    const modelId = modelMap[modelKey];

    if (!brandId) {
      console.warn(`  ⚠ Brand not found: ${piece.brandSlug}, skipping ${piece.title}`);
      continue;
    }

    await prisma.listing.create({
      data: {
        title: piece.title,
        description: piece.description,
        category: 'PIECES',
        price: piece.price,
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        city: piece.city,
        images: piece.images,
        brandId,
        modelId: modelId || null,
        userId: user.id,
        status: 'ACTIVE',
      },
    });
    created++;
    console.log(`  ✓ ${piece.title} - ${piece.price} TND`);
  }

  console.log(`\n✅ Seeding complete! ${created} pieces listings created.`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
