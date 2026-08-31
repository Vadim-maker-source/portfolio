export function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <span className="eyebrow" data-reveal>{label}</span>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="section-title" data-reveal>{title}</h2>
        {description ? <p className="section-copy" data-reveal>{description}</p> : null}
      </div>
    </div>
  );
}
