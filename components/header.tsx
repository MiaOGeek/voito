"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Car, User, LogOut, PlusCircle, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession() || {};
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full metallic-bg border-b border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Car className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
            <span className="text-2xl font-bold text-foreground">
              voi<span className="text-primary">to</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/voitures"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Voitures
            </Link>
            <Link
              href="/motos"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Motos
            </Link>
            <Link
              href="/pieces"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Pièces détachées
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* BOUTON PUBLIER - Toujours visible */}
            <Link
              href={session ? "/deposer" : "/publier"}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium inline-flex items-center gap-2"
            >
              <PlusCircle className="h-5 w-5" />
              Publier
            </Link>

            {session ? (
              <>
                <Link
                  href="/mes-annonces"
                  className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium inline-flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  Mes annonces
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 text-foreground hover:text-destructive transition-colors font-medium inline-flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/connexion"
                className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <Link
              href="/voitures"
              className="block text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Voitures
            </Link>
            <Link
              href="/motos"
              className="block text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Motos
            </Link>
            <Link
              href="/pieces"
              className="block text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pièces détachées
            </Link>
            <Link
              href={session ? "/deposer" : "/publier"}
              className="block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <PlusCircle className="inline h-5 w-5 mr-2" />
              Publier
            </Link>
            {session ? (
              <>
                <Link
                  href="/mes-annonces"
                  className="block text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mes annonces
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-foreground hover:text-destructive transition-colors font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/connexion"
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
