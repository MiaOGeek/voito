import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Category, FuelType, Transmission, ListingStatus, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") as Category | null;
    const brandId = searchParams.get("brandId");
    const modelId = searchParams.get("modelId");
    const city = searchParams.get("city");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minYear = searchParams.get("minYear");
    const maxYear = searchParams.get("maxYear");
    const minMileage = searchParams.get("minMileage");
    const maxMileage = searchParams.get("maxMileage");
    const fiscalPower = searchParams.get("fiscalPower");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "12") || 12));

    const where: Prisma.ListingWhereInput = {
      status: ListingStatus.ACTIVE,
    };

    if (category) where.category = category;
    if (brandId) where.brandId = brandId;
    if (modelId) where.modelId = modelId;
    if (city) where.city = { contains: city };
    if (fiscalPower) where.fiscalPower = parseInt(fiscalPower);

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (minYear || maxYear) {
      where.year = {};
      if (minYear) where.year.gte = parseInt(minYear);
      if (maxYear) where.year.lte = parseInt(maxYear);
    }

    if (minMileage || maxMileage) {
      where.mileage = {};
      if (minMileage) where.mileage.gte = parseInt(minMileage);
      if (maxMileage) where.mileage.lte = parseInt(maxMileage);
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          brand: true,
          model: true,
          user: {
            select: {
              name: true,
              phone: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.listing.count({ where }),
    ]);

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erreur GET /api/listings:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des annonces" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Vérification authentification
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    // Vérification email vérifié
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, emailVerified: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable." },
        { status: 404 }
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: "Veuillez confirmer votre email avant de publier une annonce." },
        { status: 403 }
      );
    }

    // Validation des données
    const body = await request.json();
    const {
      title,
      description,
      category,
      price,
      year,
      mileage,
      fiscalPower,
      fuelType,
      transmission,
      city,
      brandId,
      modelId,
      images,
    } = body;

    if (!title || !description || !category || !price || !city) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "Au moins une image est requise." },
        { status: 400 }
      );
    }

    // Création de l'annonce
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        category: category as Category,
        price: parseFloat(price),
        year: year ? parseInt(year) : null,
        mileage: mileage ? parseInt(mileage) : null,
        fiscalPower: fiscalPower ? parseInt(fiscalPower) : null,
        fuelType: fuelType ? (fuelType as FuelType) : null,
        transmission: transmission ? (transmission as Transmission) : null,
        city,
        brandId: brandId || null,
        modelId: modelId || null,
        images,
        userId: user.id,
        status: ListingStatus.ACTIVE,
      },
      include: {
        brand: true,
        model: true,
        user: {
          select: { name: true, phone: true },
        },
      },
    });

    revalidatePath("/voitures");
    revalidatePath("/motos");
    revalidatePath("/pieces");
    revalidatePath("/sitemap.xml");

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("Erreur POST /api/listings:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'annonce." },
      { status: 500 }
    );
  }
}
