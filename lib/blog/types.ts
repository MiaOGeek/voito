export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: "VOITURES" | "MOTOS" | "PIECES";
  type: "comparaison" | "roundup" | "guide";
  publishedAt: string;
  excerpt: string;
  content: string; // HTML content
  relatedSlugs: string[]; // slugs of related articles
  internalLinks: Array<{ label: string; href: string }>; // maillage
}
