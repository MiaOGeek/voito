import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/connexion?error=MissingToken", request.url));
  }

  try {
    // Trouver le token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || verificationToken.expires < new Date()) {
      return NextResponse.redirect(new URL("/connexion?error=InvalidToken", request.url));
    }

    // Marquer l'email comme vérifié
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    // Supprimer le token utilisé
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.redirect(new URL("/deposer?verified=true", request.url));
  } catch (error) {
    console.error("Erreur vérification email:", error);
    return NextResponse.redirect(new URL("/connexion?error=ServerError", request.url));
  }
}
