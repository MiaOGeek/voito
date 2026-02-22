import Link from "next/link";

const allGuides = [
  { label: "Guide d'achat voiture", href: "/voitures/guides-achat" },
  { label: "Financement auto", href: "/voitures/financement" },
  { label: "Guide d'achat moto", href: "/motos/guides" },
  { label: "Guide pieces detachees", href: "/pieces/guides" },
];

export default function GuideLinks() {
  return (
    <div>
      <h3 className="font-semibold text-foreground mb-3">Guides</h3>
      <nav className="flex flex-col gap-2">
        {allGuides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            {guide.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
