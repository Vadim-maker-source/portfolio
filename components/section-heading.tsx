export function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="section-kicker" data-reveal>{label}</p>
      <div className="grid gap-7 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:gap-24">
        <h2 className="section-title" data-reveal>{title}</h2>
        {description ? <p className="section-copy" data-reveal>{description}</p> : null}
      </div>
    </div>
  );
}
