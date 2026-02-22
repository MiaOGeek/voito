"use client";

import Link from "next/link";
import { PlusCircle, UserPlus, LogIn, Car, Camera, Shield, Zap } from "lucide-react";

export default function PublierPage() {
  return (
    <div className="min-h-screen px-4 metallic-bg">
      <div className="max-w-4xl w-full mx-auto py-16 space-y-16">

      <div className="max-w-2xl mx-auto space-y-8 text-center">
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

      {/* Avantages */}
      <section>
        <h2 className="text-3xl font-bold text-foreground text-center mb-10">
          Pourquoi publier sur <span className="text-primary">Voito</span> ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-metallic p-6 text-center">
            <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">100% gratuit</h3>
            <p className="text-muted-foreground text-sm">
              Publiez autant d'annonces que vous voulez, sans aucun frais. Pas d'abonnement, pas de commission, pas de surprises.
            </p>
          </div>
          <div className="card-metallic p-6 text-center">
            <Camera className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Photos illimitées</h3>
            <p className="text-muted-foreground text-sm">
              Ajoutez plusieurs photos haute qualité à chaque annonce pour donner envie aux acheteurs. Plus de photos = plus de contacts.
            </p>
          </div>
          <div className="card-metallic p-6 text-center">
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Contact sécurisé</h3>
            <p className="text-muted-foreground text-sm">
              Les acheteurs vous contactent via notre formulaire sécurisé. Votre numéro de téléphone reste privé jusqu'à ce que vous décidiez de le partager.
            </p>
          </div>
        </div>
      </section>

      {/* Guide étapes */}
      <section>
        <h2 className="text-3xl font-bold text-foreground text-center mb-10">
          Comment ça <span className="text-primary">marche</span> ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Créez votre compte", desc: "Inscription rapide avec votre email. Vérifiez votre adresse en un clic." },
            { step: "2", title: "Déposez votre annonce", desc: "Remplissez les détails : marque, modèle, prix, kilométrage, ville et ajoutez vos photos." },
            { step: "3", title: "Recevez des contacts", desc: "Les acheteurs intéressés vous envoient des messages directement via Voito." },
            { step: "4", title: "Concluez la vente", desc: "Rencontrez l'acheteur, négociez et finalisez la vente en toute tranquillité." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="space-y-6 text-muted-foreground">
        <h2 className="text-2xl font-bold text-foreground">
          Vendez votre véhicule rapidement en Tunisie
        </h2>
        <p>
          Voito est la plateforme de référence pour vendre votre voiture, moto ou pièces détachées d'occasion en Tunisie. Que vous soyez à Tunis, Sousse, Sfax, Nabeul, Bizerte ou dans n'importe quel gouvernorat, votre annonce sera visible par des milliers d'acheteurs potentiels dans tout le pays.
        </p>
        <p>
          Notre plateforme est conçue pour faciliter la vente entre particuliers. En quelques minutes, vous créez une annonce complète avec toutes les informations importantes : marque, modèle, année, kilométrage, puissance fiscale, type de carburant, transmission et bien sûr le prix en dinars tunisiens (TND). Ajoutez plusieurs photos pour mettre en valeur votre véhicule et maximiser vos chances de vente.
        </p>
        <p>
          Toutes les marques populaires en Tunisie sont représentées sur Voito : Volkswagen, Peugeot, Renault, Toyota, BMW, Mercedes-Benz, Audi, Hyundai, Kia, Fiat, Nissan, Honda, Ford et Citroën. Que vous vendiez une citadine, une berline, un SUV, un utilitaire, un scooter, une moto sportive ou des pièces détachées, Voito est la bonne plateforme.
        </p>
        <p>
          La publication est entièrement gratuite et sans engagement. Vous gardez le contrôle total : modifiez votre annonce à tout moment, changez le prix, ajoutez des photos ou marquez-la comme vendue depuis votre espace personnel. Les acheteurs vous contactent via un formulaire sécurisé — vous choisissez à qui répondre.
        </p>
      </section>

      </div>
    </div>
  );
}
