import { BlogArticle } from "./types";
import { voituresArticles } from "./voitures-articles";
import { motosArticles } from "./motos-articles";
import { piecesArticles } from "./pieces-articles";

export const allArticles: BlogArticle[] = [
  ...voituresArticles,
  ...motosArticles,
  ...piecesArticles,
].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: BlogArticle["category"]): BlogArticle[] {
  return allArticles.filter((a) => a.category === category);
}

export function getRelatedArticles(article: BlogArticle): BlogArticle[] {
  return article.relatedSlugs
    .map((slug) => allArticles.find((a) => a.slug === slug))
    .filter(Boolean) as BlogArticle[];
}

export type { BlogArticle } from "./types";
