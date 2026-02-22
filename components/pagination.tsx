import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 20;

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string | undefined>
) {
  const params = new URLSearchParams();
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") params.set(key, value);
    });
  }
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export { ITEMS_PER_PAGE };

export default function Pagination({
  currentPage,
  totalItems,
  basePath,
  searchParams,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  if (totalPages <= 1) return null;

  // Build page numbers with ellipsis
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const prevHref = currentPage > 1 ? buildHref(basePath, currentPage - 1, searchParams) : null;
  const nextHref = currentPage < totalPages ? buildHref(basePath, currentPage + 1, searchParams) : null;

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
      {prevHref && <link rel="prev" href={prevHref} />}
      {nextHref && <link rel="next" href={nextHref} />}
      {currentPage > 1 ? (
        <Link
          href={buildHref(basePath, currentPage - 1, searchParams)}
          className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-muted-foreground/40 cursor-not-allowed">
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </span>
      )}

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-muted-foreground">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(basePath, page, searchParams)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={buildHref(basePath, currentPage + 1, searchParams)}
          className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          Suivant
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-muted-foreground/40 cursor-not-allowed">
          Suivant
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
