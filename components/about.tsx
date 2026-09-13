import { SectionReveal } from "@/components/section-reveal";

export function About() {
  return (
    <section id="about" className="section-shell" aria-labelledby="about-title">
      <SectionReveal className="site-container">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <div>
            <span className="eyebrow" data-reveal>Обо мне</span>
            <h2 id="about-title" className="section-title" data-reveal>Развиваюсь на стыке дисциплин.</h2>
          </div>
          <div>
            <p className="section-copy max-w-none text-lg md:text-xl" data-reveal>
              Я в IT около трёх лет и развиваюсь как многопрофильный software developer, соединяя программирование, системное мышление и работу с цифровой инфраструктурой.
            </p>
            <p className="section-copy mt-5 max-w-none" data-reveal>
              В моём опыте есть frontend и backend, базы данных, real-time коммуникации, DevOps и Linux. Также владею 3D-моделированием: работаю в Blender, ZBrush и Substance 3D Painter. Параллельно расширяю знания в кибербезопасности, AI и мобильной разработке.
            </p>
          </div>
        </div>
      </SectionReveal>
      <div className="site-container mt-20"><div className="hairline" /></div>
    </section>
  );
}
