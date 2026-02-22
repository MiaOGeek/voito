"use client";

import Link from "next/link";
import { PlusCircle, UserPlus, LogIn, Car } from "lucide-react";

export default function PublierPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 metallic-bg">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Icône */}
        <div className="flex justify-center">
          <div className="relative">
            <Car className="h-24 w-24 text-primary" />
            <PlusCircle className="h-12 w-12 text-secondary absolute -bottom-2 -right-2" />
          </div>
        </div>

        {/* Titre */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">
            Publiez votre <span className="text-primary">annonce</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Pour publier une annonce sur Voito, vous devez avoir un compte.
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Créer un compte */}
          <Link
            href="/inscription?callbackUrl=/deposer"
            className="card-metallic p-8 hover:scale-105 transition-transform duration-200 group"
          >
            <UserPlus className="h-16 w-16 text-primary mx-auto mb-4 group-hover:text-secondary transition-colors" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Créer un compte</h2>
            <p className="text-muted-foreground">
              Nouveau sur Voito ? Inscrivez-vous en quelques secondes.
            </p>
          </Link>

          {/* Se connecter */}
          <Link
            href="/connexion?callbackUrl=/deposer"
            className="card-metallic p-8 hover:scale-105 transition-transform duration-200 group"
          >
            <LogIn className="h-16 w-16 text-primary mx-auto mb-4 group-hover:text-secondary transition-colors" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Se connecter</h2>
            <p className="text-muted-foreground">
              Vous avez déjà un compte ? Connectez-vous ici.
            </p>
          </Link>
        </div>

        {/* Retour */}
        <div className="pt-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
