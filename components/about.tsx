import { SectionReveal } from "@/components/section-reveal";

export function About() {
  return (
    <section id="about" className="section-shell" aria-labelledby="about-title">
      <SectionReveal className="site-container">
        <p className="section-kicker" data-reveal>Профиль / 01</p>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:gap-24">
          <h2 id="about-title" className="section-title" data-reveal>Работаю с системой, а не с одним её слоем.</h2>
          <div className="space-y-6" data-reveal>
            <p className="section-copy text-[#d7d3cc]">Основная практика связана с программированием, системным мышлением и цифровой инфраструктурой.</p>
            <p className="section-copy">Frontend и backend, базы данных, real-time, DevOps и Linux. Дополняю этот профиль кибербезопасностью, мобильной разработкой и 3D-моделированием в Blender, ZBrush и Substance 3D Painter.</p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
