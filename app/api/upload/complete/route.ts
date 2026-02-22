import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getFileUrl } from "@/lib/s3";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const { cloud_storage_path } = await request.json();

    if (!cloud_storage_path) {
      return NextResponse.json(
        { error: "cloud_storage_path requis" },
        { status: 400 }
      );
    }

    const fileUrl = await getFileUrl(cloud_storage_path, true);

    return NextResponse.json({ cloud_storage_path, fileUrl });
  } catch (error) {
    console.error("Complete upload error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la finalisation de l'upload" },
      { status: 500 }
    );
  }
}
