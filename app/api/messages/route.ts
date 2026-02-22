import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
    }

    const { content, receiverId, listingId } = body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ error: "Message requis" }, { status: 400 });
    }
    if (!receiverId || typeof receiverId !== "string") {
      return NextResponse.json({ error: "Destinataire requis" }, { status: 400 });
    }
    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Annonce requise" }, { status: 400 });
    }

    // Verify receiver and listing exist
    const [receiver, listing] = await Promise.all([
      prisma.user.findUnique({ where: { id: receiverId }, select: { id: true } }),
      prisma.listing.findUnique({ where: { id: listingId }, select: { id: true } }),
    ]);
    if (!receiver) return NextResponse.json({ error: "Destinataire introuvable" }, { status: 404 });
    if (!listing) return NextResponse.json({ error: "Annonce introuvable" }, { status: 404 });

    const sender = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!sender) return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });

    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        senderId: sender.id,
        receiverId,
        listingId,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Message error:", error);
    return NextResponse.json({ error: "Erreur envoi message" }, { status: 500 });
  }
}
