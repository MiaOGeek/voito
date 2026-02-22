"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FileText,
  MessageSquare,
  Receipt,
  UserCircle,
  Shield,
  LogOut,
  Home,
  Rocket,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { href: "/mes-annonces", label: "Mes annonces", icon: FileText },
  { href: "/mes-messages", label: "Mes Messages", icon: MessageSquare },
  { href: "/mes-transactions", label: "Mes transactions", icon: Receipt },
  { href: "/mes-informations", label: "Mes informations", icon: UserCircle },
  { href: "/securite", label: "Securite", icon: Shield },
];

const quickLinks = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/mes-informations", label: "Profile", icon: UserCircle },
  { href: "/mes-annonces", label: "Mes annonces", icon: FileText },
];

export default function DashboardSidebar({ listingsCount }: { listingsCount?: number }) {
  const pathname = usePathname();

  return (
    <aside className="space-y-5">
      {/* Main navigation */}
      <div className="card-metallic p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
                {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
              </Link>
            );
          })}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Se deconnecter
          </button>
        </nav>
      </div>

      {/* Quick links */}
      <div className="card-metallic p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
          Acces rapide
        </h3>
        <nav className="space-y-1">
          {quickLinks.map((item) => (
            <Link
              key={item.label + item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Listings count */}
      {listingsCount !== undefined && (
        <div className="card-metallic p-4">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">{listingsCount}</span>{" "}
            {listingsCount === 1 ? "annonce trouvee" : "annonces trouvees"} dans votre liste
          </p>
        </div>
      )}

      {/* Boost CTA */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Rocket className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">Planifier mes boosts</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Boostez vos annonces pour plus de visibilite et vendez plus vite.
        </p>
        <button
          onClick={() => {}}
          className="w-full py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Decouvrir les boosts
        </button>
      </div>
    </aside>
  );
}
