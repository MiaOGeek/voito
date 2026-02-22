import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ verified: false }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { emailVerified: true }
    });

    return NextResponse.json({
      verified: user?.emailVerified !== null
    });
  } catch (error) {
    console.error("Erreur vérification email:", error);
    return NextResponse.json({ verified: false }, { status: 500 });
  }
}
