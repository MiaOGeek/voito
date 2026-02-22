import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import prisma from "@/lib/db";
import { randomUUID } from "crypto";

const TOKEN = "aec69ddd727ecbbc57371375f94f8fd3";

const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: "hello@demomailtrap.co",
  name: "Voito",
};

export async function generateVerificationToken(email: string): Promise<string> {
  const token = randomUUID();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  // Create new token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return token;
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 40px; text-align: center;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #262626; border: 1px solid #333; border-radius: 8px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
        <h1 style="color: #f97316; font-size: 28px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;">VOITO</h1>
        <h2 style="font-size: 20px; margin-bottom: 20px;">Confirmez votre adresse email</h2>
        <p style="color: #a3a3a3; line-height: 1.6; margin-bottom: 30px;">
          Merci de rejoindre la communauté Voito. Pour commencer à publier vos annonces, veuillez valider votre compte en cliquant sur le bouton ci-dessous.
        </p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #f97316; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; text-transform: uppercase; transition: background-color 0.3s;">
          Vérifier mon compte
        </a>
        <p style="color: #737373; font-size: 12px; margin-top: 40px; border-top: 1px solid #333; padding-top: 20px;">
          Si vous n'avez pas créé de compte sur Voito, vous pouvez ignorer cet email.<br>
          &copy; 2026 Voito - Plateforme Automobile Moderne
        </p>
      </div>
    </div>
  `;

  await transport.sendMail({
    from: sender,
    to: [email],
    subject: "Vérifiez votre compte Voito",
    html: htmlContent,
    category: "Email Verification",
  } as any);
};
