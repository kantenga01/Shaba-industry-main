export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-ink-foreground md:py-20">
      <div className="absolute inset-y-0 right-0 w-1/2 opacity-10">
        <div className="gradient-gold h-full w-full [clip-path:polygon(35%_0,100%_0,100%_100%,0%_100%)]" />
      </div>
      <div className="container-page relative">
        {eyebrow && (
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl font-bold uppercase md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
