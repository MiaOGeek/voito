import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const brandsWithModels = [
  {
    name: 'Volkswagen',
    slug: 'volkswagen',
    models: ['Golf', 'Polo', 'Tiguan', 'Passat', 'T-Roc']
  },
  {
    name: 'Peugeot',
    slug: 'peugeot',
    models: ['208', '308', '2008', '3008', '508']
  },
  {
    name: 'Renault',
    slug: 'renault',
    models: ['Clio', 'Megane', 'Captur', 'Kadjar', 'Scenic']
  },
  {
    name: 'Toyota',
    slug: 'toyota',
    models: ['Corolla', 'Yaris', 'RAV4', 'Camry', 'Hilux']
  },
  {
    name: 'BMW',
    slug: 'bmw',
    models: ['Série 3', 'Série 5', 'X1', 'X3', 'X5']
  },
  {
    name: 'Mercedes',
    slug: 'mercedes',
    models: ['Classe A', 'Classe C', 'Classe E', 'GLA', 'GLC']
  },
  {
    name: 'Audi',
    slug: 'audi',
    models: ['A3', 'A4', 'Q3', 'Q5', 'A6']
  },
  {
    name: 'Fiat',
    slug: 'fiat',
    models: ['500', 'Panda', 'Tipo', 'Punto']
  },
  {
    name: 'Hyundai',
    slug: 'hyundai',
    models: ['i10', 'i20', 'Tucson', 'Santa Fe', 'Kona']
  },
  {
    name: 'Kia',
    slug: 'kia',
    models: ['Picanto', 'Rio', 'Sportage', 'Sorento', 'Ceed']
  },
  {
    name: 'Nissan',
    slug: 'nissan',
    models: ['Micra', 'Qashqai', 'Juke', 'X-Trail']
  },
  {
    name: 'Mazda',
    slug: 'mazda',
    models: ['Mazda3', 'CX-3', 'CX-5', 'MX-5']
  },
  {
    name: 'Honda',
    slug: 'honda',
    models: ['Civic', 'CR-V', 'Jazz', 'Accord']
  },
  {
    name: 'Ford',
    slug: 'ford',
    models: ['Fiesta', 'Focus', 'Kuga', 'Mustang']
  },
  {
    name: 'Citroën',
    slug: 'citroen',
    models: ['C3', 'C4', 'C5 Aircross', 'Berlingo']
  }
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create default test user
  const hashedPassword = await bcrypt.hash('johndoe123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@doe.com',
      password: hashedPassword,
      phone: '+21612345678'
    }
  });
  console.log('✅ Test user created:', user.email);

  // Create brands and models
  console.log('📦 Creating brands and models...');
  for (const brandData of brandsWithModels) {
    const brand = await prisma.brand.upsert({
      where: { slug: brandData.slug },
      update: {},
      create: {
        name: brandData.name,
        slug: brandData.slug
      }
    });

    // Create models for this brand
    for (const modelName of brandData.models) {
      await prisma.model.upsert({
        where: {
          brandId_name: {
            brandId: brand.id,
            name: modelName
          }
        },
        update: {},
        create: {
          name: modelName,
          brandId: brand.id
        }
      });
    }
    console.log(`  ✓ ${brand.name} with ${brandData.models.length} models`);
  }

  console.log('✅ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
