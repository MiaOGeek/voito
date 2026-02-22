interface SeoContentProps {
  h2?: string | null;
  description?: string | null;
  className?: string;
}

export default function SeoContent({ h2, description, className }: SeoContentProps) {
  if (!h2 && !description) return null;

  return (
    <section className={className}>
      {h2 && (
        <h2 className="text-2xl font-bold text-foreground mb-4">{h2}</h2>
      )}
      {description && (
        <div
          className="prose prose-invert max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </section>
  );
}
