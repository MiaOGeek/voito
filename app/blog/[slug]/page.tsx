import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home, Calendar, ArrowLeft, Tag } from "lucide-react";
import { allArticles, getArticleBySlug, getRelatedArticles } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

const categoryConfig = {
  VOITURES: { label: "Voitures", path: "/voitures" },
  MOTOS: { label: "Motos", path: "/motos" },
  PIECES: { label: "Pièces", path: "/pieces" },
};

const typeLabels = {
  comparaison: "Comparatif",
  roundup: "Classement",
  guide: "Guide",
};

export function generateStaticParams() {
  return allArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const baseUrl = SITE_URL;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const config = categoryConfig[article.category];
  const baseUrl = SITE_URL;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Voito", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${baseUrl}/blog/${article.slug}` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: `${baseUrl}/og-image.png`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Voito",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Voito",
      url: baseUrl,
      logo: { "@type": "ImageObject", url: `${baseUrl}/og-image.png` },
    },
    mainEntityOfPage: `${baseUrl}/blog/${article.slug}`,
    inLanguage: "fr",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link
              href="/"
              className="flex items-center hover:text-primary transition-colors shrink-0"
            >
              <Home className="h-4 w-4 mr-1" />
              Voito
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
            <Link
              href="/blog"
              className="hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 shrink-0 text-muted-foreground/50" />
            <span className="text-foreground font-medium truncate">
              {article.title}
            </span>
          </nav>

          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium px-2 py-0.5 rounded border border-primary/30 text-primary">
                {typeLabels[article.type]}
              </span>
              <Link
                href={config.path}
                className="text-xs font-medium px-2 py-0.5 rounded border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                {config.label}
              </Link>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>
          </header>

          {/* Article content */}
          <article
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground
              prose-li:text-muted-foreground
              prose-table:border-collapse
              prose-th:bg-muted/50 prose-th:text-foreground prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:border prose-th:border-border
              prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-border prose-td:text-muted-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Internal links */}
          {article.internalLinks.length > 0 && (
            <div className="mt-10 card-metallic p-6">
              <h2 className="text-lg font-bold text-foreground mb-3">
                Liens utiles
              </h2>
              <div className="flex flex-wrap gap-2">
                {article.internalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Articles similaires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="card-metallic p-4 group hover:border-primary/50 transition-colors"
                  >
                    <span className="text-xs text-muted-foreground">
                      {typeLabels[r.type]}
                    </span>
                    <h3 className="text-foreground font-semibold mt-1 group-hover:text-primary transition-colors line-clamp-2">
                      {r.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
