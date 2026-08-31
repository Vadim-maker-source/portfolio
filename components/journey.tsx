import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { cn } from "@/lib/utils";

const journey = [
  {
    title: "Техническая основа",
    copy: "Программирование, устройство систем, алгоритмическое мышление и уверенная работа с цифровой средой.",
    meta: "База",
    placement: "lg:col-start-1 lg:row-start-1",
  },
  {
    title: "Разработка продуктов",
    copy: "Frontend и backend как единая система: интерфейсы, API, данные и real-time коммуникации.",
    meta: "2 года практики",
    placement: "lg:col-start-2 lg:row-start-2",
  },
  {
    title: "Системы и инфраструктура",
    copy: "Linux, Docker, Nginx, deployment и понимание того, как приложение живёт за пределами редактора кода.",
    meta: "DevOps · 1 год",
    placement: "lg:col-start-1 lg:row-start-3",
  },
  {
    title: "Новые дисциплины",
    copy: "Кибербезопасность, AI и mobile-разработка расширяют взгляд на технологии и подходы к решению задач.",
    meta: "Продолжаю изучать",
    placement: "lg:col-start-2 lg:row-start-4",
  },
] as const;

export function Journey() {
  return (
    <section className="section-shell overflow-hidden" aria-labelledby="journey-title">
      <SectionReveal className="site-container">
        <div id="journey-title">
          <SectionHeading
            label="Путь развития"
            title="Каждый новый слой расширяет возможности."
            description="Не линейная карьерная лестница, а последовательное расширение технического кругозора: от фундаментальных принципов к смежным дисциплинам."
          />
        </div>

        <div className="journey-route relative mt-14">
          <div className="relative z-10 grid gap-0 lg:grid-cols-2 lg:grid-rows-4 lg:gap-x-32 lg:gap-y-24">
            {journey.map((item, index) => {
              return (
                <div key={item.title} data-reveal className={cn("relative", item.placement)}>
                  <article className="relative z-10 min-h-[220px] overflow-hidden rounded-[1.5rem] border border-white/[.12] bg-[#0d0f14] p-6 md:p-7">
                    <p className="text-sm font-medium text-violet-300">Этап {index + 1}</p>

                    <div className="mt-9 max-w-xl">
                      <h3 className="text-2xl font-semibold tracking-[-.045em] text-zinc-100 md:text-[1.7rem]">{item.title}</h3>
                      <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400">{item.copy}</p>
                    </div>

                    <p className="mt-6 text-sm text-zinc-500">{item.meta}</p>
                  </article>

                  {index < journey.length - 1 ? <JourneyConnector index={index} /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

function JourneyConnector({ index }: { index: number }) {
  const desktopMarker = `journey-arrow-${index}`;
  const mobileMarker = `journey-mobile-arrow-${index}`;
  const goesRight = index % 2 === 0;

  return (
    <>
      <svg
        aria-hidden="true"
        className={cn(
          "journey-connector hidden overflow-visible lg:block",
          goesRight ? "journey-connector-right" : "journey-connector-left",
        )}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <marker id={desktopMarker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path className="journey-route-arrow" d="M 1 1 L 8 5 L 1 9" />
          </marker>
        </defs>
        <path
          className="journey-route-line"
          d="M 0 4 C 22 0, 30 28, 53 26 C 75 24, 79 7, 91 18 C 99 27, 87 54, 95 75 C 99 84, 100 91, 100 98"
          markerEnd={`url(#${desktopMarker})`}
        />
      </svg>

      <div aria-hidden="true" className="flex h-24 items-center justify-center lg:hidden">
        <svg className="journey-mobile-connector overflow-visible" viewBox="0 0 64 100" preserveAspectRatio="none">
          <defs>
            <marker id={mobileMarker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path className="journey-route-arrow" d="M 1 1 L 8 5 L 1 9" />
            </marker>
          </defs>
          <path
            className="journey-route-line"
            d="M 32 1 C 7 16, 56 29, 27 47 C 6 61, 51 72, 32 98"
            markerEnd={`url(#${mobileMarker})`}
          />
        </svg>
      </div>
    </>
  );
}
