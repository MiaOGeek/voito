import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Calendar, Tag } from "lucide-react";
import { allArticles, getArticlesByCategory } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog automobile Tunisie - Comparatifs, guides et conseils | Voito",
  description:
    "Comparatifs de voitures, motos et pièces détachées en Tunisie. Guides d'achat, classements et conseils pour acheter d'occasion au meilleur prix en TND.",
  alternates: { canonical: "/blog" },
};

const categoryConfig = {
  VOITURES: { label: "Voitures", path: "/voitures", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  MOTOS: { label: "Motos", path: "/motos", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  PIECES: { label: "Pièces", path: "/pieces", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
};

const typeLabels = {
  comparaison: "Comparatif",
  roundup: "Classement",
  guide: "Guide",
};

export default function BlogPage() {
  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link
              href="/"
              className="flex items-center hover:text-primary transition-colors shrink-0"
            >
              <Home className="h-4 w-4 mr-1" />
              Voito
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Blog</span>
          </nav>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            Blog <span className="text-primary">automobile</span>
          </h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Comparatifs, guides d'achat et classements pour vous aider à faire
            le bon choix sur le marché de l'occasion en Tunisie.
          </p>

          {/* Category sections */}
          {(["VOITURES", "MOTOS", "PIECES"] as const).map((cat) => {
            const articles = getArticlesByCategory(cat);
            const config = categoryConfig[cat];
            if (articles.length === 0) return null;

            return (
              <section key={cat} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    {config.label}
                  </h2>
                  <Link
                    href={config.path}
                    className="text-sm text-primary hover:underline"
                  >
                    Voir les annonces {config.label.toLowerCase()}
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/blog/${article.slug}`}
                      className="card-metallic p-5 group hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded border ${config.color}`}
                        >
                          {typeLabels[article.type]}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.publishedAt).toLocaleDateString(
                            "fr-FR",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </span>
                      </div>
                      <h3 className="text-foreground font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
