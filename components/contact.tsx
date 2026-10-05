import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { portfolioConfig } from "@/lib/constants";

const links = [
  { name: "Telegram", detail: "Сообщения и техническое общение", href: portfolioConfig.socials.telegram },
  { name: "GitHub", detail: "Код, эксперименты и репозитории", href: portfolioConfig.socials.github },
] as const;

export function Contact() {
  return (
    <section id="contact" className="section-shell bg-[#0b0b0c]" aria-labelledby="contact-title">
      <SectionReveal className="site-container">
        <p className="section-kicker" data-reveal>Контакты / 05</p>
        <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:gap-24">
          <h2 id="contact-title" className="section-title" data-reveal>Найти меня в сети.</h2>
          <p className="section-copy" data-reveal>Telegram для связи. GitHub для просмотра кода и технических экспериментов.</p>
        </div>

        <div className="mt-12 border-b border-white/14 md:mt-16">
          {links.map((link) => (
            <a key={link.name} data-reveal href={link.href} target="_blank" rel="noopener noreferrer" className="group grid gap-2 border-t border-white/14 py-6 transition-colors hover:bg-white hover:text-black md:grid-cols-[1fr_1fr_auto] md:items-center md:px-4 md:py-7">
              <span className="text-[clamp(1.65rem,3vw,2.6rem)] font-normal tracking-[-.045em]">{link.name}</span>
              <span className="text-sm text-white/42 transition-colors group-hover:text-black/55">{link.detail}</span>
              <ArrowUpRight className="size-5 transition-colors group-hover:text-[#7657e8]" aria-hidden="true" />
            </a>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
