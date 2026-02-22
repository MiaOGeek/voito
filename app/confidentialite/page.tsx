import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_DOMAIN, CONTACT_EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Politique de Confidentialite | Voito",
  description: "Politique de confidentialité de Voito — découvrez comment nous collectons, utilisons et protégeons vos données personnelles sur notre plateforme d'annonces auto en Tunisie.",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-primary transition-colors shrink-0">
            <Home className="h-4 w-4 mr-1" />
            Voito
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
          <span className="text-foreground font-medium">Politique de Confidentialite</span>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          Politique de <span className="text-primary">Confidentialite</span>
        </h1>
        <div className="card-metallic p-8 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Chez <strong className="text-foreground">Voito</strong>, la protection de vos donnees personnelles est une priorite. La presente politique de confidentialite a pour objectif de vous informer de maniere transparente sur la collecte, le traitement et la protection de vos donnees, conformement au <strong className="text-foreground">Reglement General sur la Protection des Donnees (RGPD - Reglement UE 2016/679)</strong> et a la legislation tunisienne relative a la protection des donnees personnelles (Loi organique n°2004-63).
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Responsable du traitement</h2>
          <p>
            Le responsable du traitement des donnees personnelles est <strong className="text-foreground">Voito</strong>, plateforme de petites annonces automobiles accessible a l'adresse <strong className="text-foreground">{SITE_DOMAIN}</strong>.
          </p>
          <p>
            Pour toute question relative a vos donnees personnelles :{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Base legale du traitement</h2>
          <p>Le traitement de vos donnees repose sur les bases legales suivantes :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Execution du contrat</strong> : le traitement est necessaire pour fournir nos services (creation de compte, publication d'annonces, mise en relation)</li>
            <li><strong className="text-foreground">Consentement</strong> : pour l'envoi de communications marketing et l'utilisation de cookies non essentiels</li>
            <li><strong className="text-foreground">Interet legitime</strong> : pour la securite du site, la prevention des fraudes et l'amelioration de nos services</li>
            <li><strong className="text-foreground">Obligation legale</strong> : pour repondre a nos obligations legales et reglementaires</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4">Donnees collectees</h2>
          <p>Nous collectons les donnees suivantes :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Donnees d'identification</strong> : nom, prenom, adresse email</li>
            <li><strong className="text-foreground">Coordonnees</strong> : numero de telephone (optionnel)</li>
            <li><strong className="text-foreground">Donnees de contenu</strong> : annonces publiees, images uploadees, messages echanges</li>
            <li><strong className="text-foreground">Donnees techniques</strong> : adresse IP, type de navigateur, pages visitees, date et heure de connexion</li>
            <li><strong className="text-foreground">Donnees de cookies</strong> : identifiants de session, preferences utilisateur</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4">Finalites du traitement</h2>
          <p>Vos donnees sont traitees pour les finalites suivantes :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Creation et gestion de votre compte utilisateur</li>
            <li>Publication, affichage et gestion de vos annonces</li>
            <li>Mise en relation entre acheteurs et vendeurs</li>
            <li>Envoi d'emails transactionnels (verification de compte, notifications)</li>
            <li>Amelioration de nos services et de l'experience utilisateur</li>
            <li>Securite du site et prevention des fraudes</li>
            <li>Affichage de publicites personnalisees via Google AdSense</li>
            <li>Mesure d'audience et analyse statistique</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4">Duree de conservation</h2>
          <p>Vos donnees personnelles sont conservees pour la duree suivante :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Donnees de compte</strong> : conservees tant que votre compte est actif, puis supprimees 3 ans apres la derniere connexion</li>
            <li><strong className="text-foreground">Annonces</strong> : conservees tant qu'elles sont actives, puis archivees pendant 1 an</li>
            <li><strong className="text-foreground">Donnees techniques</strong> : conservees pendant 13 mois maximum</li>
            <li><strong className="text-foreground">Cookies</strong> : duree maximale de 13 mois</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4">Partage des donnees et destinataires</h2>
          <p>
            Vos donnees personnelles ne sont jamais vendues a des tiers. Elles peuvent etre partagees avec les destinataires suivants dans le cadre strict du fonctionnement du service :
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Prestataires d'hebergement</strong> : Vercel Inc. (hebergement du site)</li>
            <li><strong className="text-foreground">Base de donnees</strong> : TiDB Cloud (stockage des donnees)</li>
            <li><strong className="text-foreground">Service d'email</strong> : Mailtrap (envoi d'emails transactionnels)</li>
            <li><strong className="text-foreground">Stockage d'images</strong> : Cloudinary (hebergement des photos d'annonces)</li>
            <li><strong className="text-foreground">Regie publicitaire</strong> : Google AdSense (affichage de publicites - peut collecter des donnees via cookies)</li>
          </ul>
          <p>
            Certains de ces prestataires peuvent etre situes en dehors de l'Union europeenne. Dans ce cas, des garanties appropriees sont mises en place (clauses contractuelles types, decisions d'adequation) pour assurer un niveau de protection adequat de vos donnees.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Cookies et technologies de suivi</h2>
          <p>Notre site utilise differents types de cookies :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Cookies strictement necessaires</strong> : indispensables au fonctionnement du site (authentification, session). Ils ne necessitent pas votre consentement.</li>
            <li><strong className="text-foreground">Cookies analytiques</strong> : permettent de mesurer l'audience et d'ameliorer nos services. Deposes uniquement avec votre consentement.</li>
            <li><strong className="text-foreground">Cookies publicitaires</strong> : utilises par Google AdSense pour afficher des annonces pertinentes. Deposes uniquement avec votre consentement. Google peut collecter des informations sur votre navigation pour personnaliser les publicites.</li>
          </ul>
          <p>
            Vous pouvez gerer vos preferences en matiere de cookies a tout moment via les parametres de votre navigateur ou via notre bandeau de consentement.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Google AdSense</h2>
          <p>
            Notre site utilise Google AdSense, un service de regie publicitaire fourni par Google LLC. Google AdSense utilise des cookies pour diffuser des annonces adaptees a vos centres d'interet. Vous pouvez desactiver la personnalisation des annonces en visitant les{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">parametres de publicite Google</a>.
          </p>
          <p>
            Pour en savoir plus sur la maniere dont Google utilise vos donnees, consultez la{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">politique de confidentialite de Google</a>.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Vos droits (RGPD)</h2>
          <p>
            Conformement au RGPD et a la legislation applicable, vous disposez des droits suivants sur vos donnees personnelles :
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Droit d'acces</strong> (Article 15 RGPD) : obtenir une copie de vos donnees personnelles</li>
            <li><strong className="text-foreground">Droit de rectification</strong> (Article 16 RGPD) : corriger des donnees inexactes ou incompletes</li>
            <li><strong className="text-foreground">Droit a l'effacement</strong> (Article 17 RGPD) : demander la suppression de vos donnees ("droit a l'oubli")</li>
            <li><strong className="text-foreground">Droit a la limitation du traitement</strong> (Article 18 RGPD) : restreindre le traitement de vos donnees</li>
            <li><strong className="text-foreground">Droit a la portabilite</strong> (Article 20 RGPD) : recevoir vos donnees dans un format structure et lisible par machine</li>
            <li><strong className="text-foreground">Droit d'opposition</strong> (Article 21 RGPD) : vous opposer au traitement de vos donnees pour des motifs legitimes</li>
            <li><strong className="text-foreground">Droit de retirer votre consentement</strong> : a tout moment, sans affecter la legalite du traitement effectue avant le retrait</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>. Nous nous engageons a repondre a votre demande dans un delai de 30 jours.
          </p>
          <p>
            Vous disposez egalement du droit d'introduire une reclamation aupres d'une autorite de controle competente (CNIL en France, INPDP en Tunisie).
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Securite des donnees</h2>
          <p>
            Nous mettons en oeuvre des mesures techniques et organisationnelles appropriees pour proteger vos donnees personnelles contre tout acces non autorise, perte, alteration ou divulgation. Ces mesures incluent le chiffrement des donnees en transit (HTTPS/SSL), le hachage des mots de passe et le controle d'acces strict aux bases de donnees.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Modifications de la politique</h2>
          <p>
            Nous nous reservons le droit de modifier cette politique de confidentialite a tout moment. En cas de modification substantielle, nous vous en informerons par email ou via une notification sur le site. La date de derniere mise a jour est indiquee ci-dessous.
          </p>

          <p className="text-sm text-muted-foreground/70 pt-4 border-t border-border">
            Derniere mise a jour : 16 fevrier 2026
          </p>
        </div>
      </div>
    </div>
  );
}
