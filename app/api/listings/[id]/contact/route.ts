import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        brand: true,
        model: true,
      },
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Annonce non trouvée" },
        { status: 404 }
      );
    }

    if (!listing.user.email) {
      return NextResponse.json(
        { error: "Le vendeur n'a pas d'email" },
        { status: 400 }
      );
    }

    // Create HTML email body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2C2C2C; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; color: #FF6B35;">🚗 Nouveau message pour votre annonce</h2>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #FF6B35;">
            <h3 style="color: #2C2C2C; margin-top: 0;">Annonce concernée</h3>
            <p style="margin: 10px 0; color: #555;"><strong>Titre:</strong> ${listing.title}</p>
            <p style="margin: 10px 0; color: #555;"><strong>Véhicule:</strong> ${listing.brand?.name ?? ""} ${listing.model?.name ?? ""}</p>
            <p style="margin: 10px 0; color: #555;"><strong>Prix:</strong> ${listing.price.toLocaleString()} TND</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #00A8E8;">
            <h3 style="color: #2C2C2C; margin-top: 0;">Informations du contact</h3>
            <p style="margin: 10px 0; color: #555;"><strong>Nom:</strong> ${name}</p>
            <p style="margin: 10px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #00A8E8;">${email}</a></p>
            ${phone ? `<p style="margin: 10px 0; color: #555;"><strong>Téléphone:</strong> ${phone}</p>` : ""}
            
            <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 4px;">
              <p style="margin: 0 0 10px 0; color: #2C2C2C; font-weight: bold;">Message:</p>
              <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
            Reçu le ${new Date().toLocaleDateString("fr-FR", { 
              year: "numeric", 
              month: "long", 
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        </div>
      </div>
    `;

    const appUrl = process.env.NEXTAUTH_URL || "";
    const appName = appUrl ? new URL(appUrl).hostname.split(".")[0] : "Voito";

    const response = await fetch("https://apps.abacus.ai/api/sendNotificationEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY,
        app_id: process.env.WEB_APP_ID,
        notification_id: process.env.NOTIF_ID_CONTACT_VENDEUR,
        subject: `🚗 Nouveau message pour votre ${listing.brand?.name ?? ""} ${listing.model?.name ?? ""}`,
        body: htmlBody,
        is_html: true,
        recipient_email: listing.user.email,
        sender_email: `noreply@${appUrl ? new URL(appUrl).hostname : "voito.app"}`,
        sender_alias: appName,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      if (result.notification_disabled) {
        console.log("Notification disabled by user, skipping email");
        return NextResponse.json({
          success: true,
          message: "Message envoyé (notification désactivée)",
        });
      }
      throw new Error(result.message || "Failed to send notification");
    }

    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès",
    });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
