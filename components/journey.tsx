import { SectionReveal } from "@/components/section-reveal";

const journey = [
  { title: "Техническая основа", copy: "Программирование, устройство систем, алгоритмическое мышление.", meta: "Основа" },
  { title: "Разработка продуктов", copy: "Интерфейсы, API, данные и real-time как единая система.", meta: "2 года" },
  { title: "Инфраструктура", copy: "Linux, Docker, Nginx и жизненный цикл приложения после разработки.", meta: "1 год" },
  { title: "Новые дисциплины", copy: "Безопасность, AI, mobile и 3D расширяют набор рабочих методов.", meta: "Сейчас" },
] as const;

export function Journey() {
  return (
    <section className="border-t border-white/14 bg-[#070707] py-[clamp(4.5rem,8vw,7.5rem)] text-white" aria-labelledby="journey-title">
      <SectionReveal className="site-container">
        <p className="mb-5 text-xs uppercase tracking-[.08em] text-white/45" data-reveal>Путь / 04</p>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <h2 id="journey-title" className="max-w-3xl text-[clamp(2.5rem,5.5vw,5.2rem)] font-normal leading-[.95] tracking-[-.065em]" data-reveal>Профиль вырос из практики, а не из списка ролей.</h2>
          <p className="max-w-xl text-base leading-7 text-white/58 lg:justify-self-end" data-reveal>Каждый следующий слой появился как ответ на реальную задачу: понять систему глубже, собрать её надёжнее и контролировать больше этапов.</p>
        </div>

        <div className="mt-16 grid border-t border-white/18 md:grid-cols-2 lg:grid-cols-4">
          {journey.map((item, index) => (
            <article key={item.title} data-reveal className="flex min-h-[270px] flex-col border-b border-white/18 py-6 md:border-r md:px-6 lg:border-b-0 first:pl-0 last:border-r-0">
              <p className="text-xs text-[#a895ff]">0{index + 1}</p>
              <h3 className="mt-10 text-2xl font-normal leading-tight tracking-[-.04em]">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/55">{item.copy}</p>
              <p className="mt-auto pt-8 text-xs uppercase tracking-[.08em] text-white/35">{item.meta}</p>
            </article>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
