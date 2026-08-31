import { expertise } from "@/lib/constants";

export function ExpertiseGrid() {
  return (
    <div className="grid gap-x-12 md:grid-cols-2">
      {expertise.map((item) => (
        <article key={item.title} data-reveal className="flex flex-col border-t border-white/[.11] py-8 md:min-h-[310px]">
          <div>
            <h3 className="text-[1.7rem] font-semibold tracking-[-.04em] text-zinc-50 md:text-[2rem]">{item.title}</h3>
            <p className="mt-2 text-sm font-medium text-violet-300">{item.experience}</p>
          </div>
          <p className="mt-6 max-w-2xl text-[.95rem] leading-7 text-zinc-300/80">{item.description}</p>
          <p className="mt-auto pt-7 text-sm leading-6 text-zinc-500">{item.technologies.join(" · ")}</p>
        </article>
      ))}
    </div>
  );
}
