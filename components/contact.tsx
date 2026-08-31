import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { SectionReveal } from "@/components/section-reveal";
import { portfolioConfig } from "@/lib/constants";

const contactLinks = [
  { name: "GitHub", copy: "Мои репозитории, эксперименты и open-source разработки", href: portfolioConfig.socials.github, icon: FaGithub },
  { name: "Telegram", copy: "Техническое общение и обмен опытом", href: portfolioConfig.socials.telegram, icon: FaTelegramPlane },
] as const;

export function Contact() {
  return (
    <section id="contact" className="section-shell pb-8" aria-labelledby="contact-title">
      <SectionReveal className="site-container">
        <div className="border-t border-white/[.12] pt-8 md:pt-10">
          <span className="eyebrow" data-reveal>Связаться со мной</span>
          <h2 id="contact-title" data-reveal className="max-w-3xl text-[clamp(2.15rem,5vw,4.6rem)] font-semibold leading-[.98] tracking-[-.055em]">Найти меня <span className="text-violet-300">в сети.</span></h2>
          <p data-reveal className="section-copy mt-6">GitHub для кода и разработок, Telegram для технического общения.</p>

          <div className="mt-10 divide-y divide-white/[.09] border-y border-white/[.09]">
            {contactLinks.map(({ name, copy, href, icon: Icon }) => (
              <a key={name} data-reveal href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-5 transition-colors hover:text-violet-200 md:py-6" aria-label={`${name}, откроется в новой вкладке`}>
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                <span><span className="block font-medium">{name}</span><span className="mt-1 block text-sm leading-5 text-zinc-500">{copy}</span></span>
                <ArrowUpRight className="ml-auto size-5 text-zinc-600 transition-colors group-hover:text-violet-300" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
