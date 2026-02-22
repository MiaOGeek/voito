import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { getSiteConfig } from "@/lib/site-config";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const revalidate = 300; // ISR: revalidate layout config every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = new URL(SITE_URL);

  const config = await getSiteConfig();

  const title = config?.metaTitle || config?.siteTitle || "Voito - Petites Annonces Automobiles en Tunisie";
  const description = config?.metaDesc || config?.siteDescription || "Découvrez des milliers d'annonces de voitures, motos et pièces détachées d'occasion en Tunisie. Achetez et vendez en toute sécurité sur Voito.";
  const ogImage = config?.ogImage || "/og-image.png";
  const favicon = config?.favicon || "/favicon.svg";

  return {
    title,
    description,
    metadataBase,
    alternates: {
      languages: {
        "fr-TN": metadataBase.toString(),
      },
    },
    keywords:
      "voitures occasion tunisie, motos occasion, pièces détachées, annonces automobiles, vente voiture tunisie",
    openGraph: {
      title,
      description,
      images: [ogImage],
      type: (config?.ogType as "website" | "article") || "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    icons: {
      icon: favicon,
      shortcut: favicon,
    },
    robots: {
      index: config?.robotsIndex ?? true,
      follow: config?.robotsIndex ?? true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://apps.abacus.ai" />
        {config?.schemaOrgJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: config.schemaOrgJsonLd }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" theme="dark" />
        </Providers>
        <Script
          src="https://apps.abacus.ai/chatllm/appllm-lib.js"
          strategy="lazyOnload"
        />
        {config?.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${config.googleAnalyticsId}');`,
              }}
            />
          </>
        )}
        {config?.googleAdsenseCode && (
          <Script
            id="adsense"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{ __html: config.googleAdsenseCode }}
          />
        )}
      </body>
    </html>
  );
}
