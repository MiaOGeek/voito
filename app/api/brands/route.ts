import { NextResponse } from "next/server";
import { Category } from "@prisma/client";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as Category | null;

    const brands = await prisma.brand.findMany({
      where: category ? { category } : undefined,
      orderBy: {
        name: "asc",
      },
      include: {
        models: {
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    return NextResponse.json(brands);
  } catch (error) {
    console.error("Get brands error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des marques" },
      { status: 500 }
    );
  }
}
