import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Category, FuelType, Transmission } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { deleteFile } from "@/lib/s3";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: {
        brand: true,
        model: true,
        user: {
          select: {
            name: true,
            phone: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Annonce non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Get listing error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'annonce" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Annonce non trouvée" },
        { status: 404 }
      );
    }

    if (listing.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

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
      images,
      brandId,
      modelId,
      status,
    } = body;

    const updatedListing = await prisma.listing.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category: category as Category }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(year !== undefined && { year: year ? parseInt(year) : null }),
        ...(mileage !== undefined && { mileage: mileage ? parseInt(mileage) : null }),
        ...(fiscalPower !== undefined && { fiscalPower: fiscalPower ? parseInt(fiscalPower) : null }),
        ...(fuelType !== undefined && { fuelType: fuelType as FuelType | null }),
        ...(transmission !== undefined && { transmission: transmission as Transmission | null }),
        ...(city && { city }),
        ...(images && { images }),
        ...(brandId !== undefined && { brandId }),
        ...(modelId !== undefined && { modelId }),
        ...(status && { status }),
      },
      include: {
        brand: true,
        model: true,
      },
    });

    revalidatePath(`/annonces/${params.id}`);
    revalidatePath("/voitures");
    revalidatePath("/motos");
    revalidatePath("/pieces");

    return NextResponse.json(updatedListing);
  } catch (error) {
    console.error("Update listing error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'annonce" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Annonce non trouvée" },
        { status: 404 }
      );
    }

    if (listing.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    // Delete images from S3
    const images = listing.images as string[] | null;
    if (images && images.length > 0) {
      await Promise.all(
        images.map((imagePath: string) => deleteFile(imagePath))
      );
    }

    await prisma.listing.delete({
      where: { id: params.id },
    });

    revalidatePath(`/annonces/${params.id}`);
    revalidatePath("/voitures");
    revalidatePath("/motos");
    revalidatePath("/pieces");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete listing error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'annonce" },
      { status: 500 }
    );
  }
}
