import { ExpertiseGrid } from "@/components/expertise-grid";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";

export function Experience() {
  return (
    <section id="experience" className="section-shell" aria-labelledby="experience-title">
      <SectionReveal className="site-container">
        <div id="experience-title">
          <SectionHeading label="Опыт и направления" title="Широкий инструментарий, подкреплённый практикой." description="Работаю с интерфейсами, backend-системами, инфраструктурой и 3D-графикой, развивая каждое направление через практику." />
        </div>
        <ExpertiseGrid />
      </SectionReveal>
    </section>
  );
}
