import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { content, receiverId, listingId } = await req.json();

    const sender = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!sender) return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });

    const message = await prisma.message.create({
      data: {
        content,
        senderId: sender.id,
        receiverId,
        listingId,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur envoi message" }, { status: 500 });
  }
}
