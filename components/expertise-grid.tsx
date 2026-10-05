import { expertise } from "@/lib/constants";

export function ExpertiseGrid() {
  return (
    <div className="border-b border-white/14">
      {expertise.map((item) => (
        <article key={item.title} data-reveal className="grid gap-5 border-t border-white/14 py-7 md:grid-cols-[58px_1.05fr_.45fr_1.5fr] md:gap-7 md:py-9">
          <p className="text-xs text-white/32">{item.index}</p>
          <h3 className="text-[clamp(1.6rem,2.5vw,2.4rem)] font-normal leading-none tracking-[-.045em]">{item.title}</h3>
          <p className="text-sm font-semibold text-[#a994ff]">{item.experience}</p>
          <div>
            <p className="max-w-2xl text-[.98rem] leading-7 text-white/62">{item.description}</p>
            <p className="mt-5 text-sm leading-6 text-white/34">{item.technologies.join(" / ")}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
