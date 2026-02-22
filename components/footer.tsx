import Link from "next/link";
import { Car, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { getSiteConfig } from "@/lib/site-config";
import GuideLinks from "@/components/guide-links";

export default async function Footer() {
  const config = await getSiteConfig();

  const socialLinks = [
    { url: config?.facebookUrl, icon: Facebook, label: "Facebook" },
    { url: config?.instagramUrl, icon: Instagram, label: "Instagram" },
    {
      url: config?.twitterUrl,
      label: "X (Twitter)",
      svg: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    { url: config?.youtubeUrl, icon: Youtube, label: "YouTube" },
    {
      url: config?.tiktokUrl,
      label: "TikTok",
      svg: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
        </svg>
      ),
    },
    { url: config?.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
  ].filter((s) => s.url);

  return (
    <footer className="metallic-bg border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo & description */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <Car className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
              <span className="text-xl font-bold text-foreground">
                voi<span className="text-primary">to</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Plateforme de petites annonces automobiles en Tunisie.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title={social.label}
                  >
                    {social.svg ? social.svg : social.icon && <social.icon className="h-5 w-5" />}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Categories</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/voitures" className="text-muted-foreground hover:text-primary transition-colors text-sm py-2">
                Voitures
              </Link>
              <Link href="/motos" className="text-muted-foreground hover:text-primary transition-colors text-sm py-2">
                Motos
              </Link>
              <Link href="/pieces" className="text-muted-foreground hover:text-primary transition-colors text-sm py-2">
                Pieces detachees
              </Link>
            </nav>
          </div>

          <GuideLinks />

          {/* Informations legales */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Informations legales</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/qui-sommes-nous" className="text-muted-foreground hover:text-primary transition-colors text-sm py-2">
                Qui sommes-nous ?
              </Link>
              <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors text-sm py-2">
                Mentions Legales
              </Link>
              <Link href="/confidentialite" className="text-muted-foreground hover:text-primary transition-colors text-sm py-2">
                Politique de Confidentialite
              </Link>
              <Link href="/conditions" className="text-muted-foreground hover:text-primary transition-colors text-sm py-2">
                Conditions d'utilisation
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm py-2">
                Questions fréquentes
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6">
          <p className="text-muted-foreground text-sm text-center">
            &copy; {new Date().getFullYear()} Voito. Tous droits reserves.
          </p>
        </div>
      </div>
    </footer>
  );
}
