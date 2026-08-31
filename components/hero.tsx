"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { Button } from "@/components/ui/button";
import { portfolioConfig } from "@/lib/constants";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) { gsap.set("[data-hero]", { opacity: 1, y: 0 }); return; }
      gsap.fromTo("[data-hero]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.68, stagger: 0.1, ease: "power3.out", delay: 0.18 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate flex min-h-[100svh] items-center overflow-hidden border-b border-white/[.06] pb-12 pt-28 md:pt-32" aria-labelledby="hero-title">
      <HeroBackdrop />
      <div className="site-container relative z-10">
        <div className="max-w-[900px]">
          <p data-hero className="mb-6 text-base font-medium text-violet-300 opacity-0">
            Software Engineer, <span className="text-zinc-500">3 года в IT</span>
          </p>
          <h1 id="hero-title" data-hero className="font-display max-w-[1020px] text-[clamp(2.2rem,5.6vw,5.65rem)] font-semibold leading-[1.02] tracking-[-.05em] opacity-0">
            <span className="text-gradient">Vadim67okak</span>
          </h1>
          <p data-hero className="mt-7 max-w-[680px] text-[clamp(1.1rem,2vw,1.45rem)] leading-[1.55] tracking-[-.02em] text-zinc-400 opacity-0">
            Создаю современные цифровые продукты: от продуманных интерфейсов до backend-сервисов, real-time систем и инфраструктуры.
          </p>
          <div data-hero className="mt-8 flex flex-wrap gap-3 opacity-0">
            <Button asChild size="lg"><a href="#experience">Посмотреть навыки <ArrowDownRight className="size-4" /></a></Button>
            <Button asChild size="lg" variant="outline"><a href="#contact">Связаться <ArrowRight className="size-4" /></a></Button>
          </div>
          <div data-hero className="mt-7 flex items-center gap-6 opacity-0">
            <a href={portfolioConfig.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub, откроется в новой вкладке" className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"><FaGithub className="size-4" />GitHub</a>
            <a href={portfolioConfig.socials.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram, откроется в новой вкладке" className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-violet-300"><FaTelegramPlane className="size-4" />Telegram</a>
          </div>
        </div>
      </div>
    </section>
  );
}
