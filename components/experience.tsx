import { ExpertiseGrid } from "@/components/expertise-grid";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";

export function Experience() {
  return (
    <section id="experience" className="section-shell bg-[#0b0b0c]" aria-labelledby="experience-title">
      <SectionReveal className="site-container">
        <div id="experience-title">
          <SectionHeading label="Практика / 02" title="Семь направлений. Одна инженерная логика." description="Фактический опыт, задачи и инструменты без условных процентов и декоративных оценок." />
        </div>
        <ExpertiseGrid />
      </SectionReveal>
    </section>
  );
}
