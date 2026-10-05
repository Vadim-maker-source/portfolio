"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, portfolioConfig } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnDesktop = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[#070707] text-white">
      <nav aria-label="Основная навигация" className="site-container">
        <div className="flex h-[66px] items-center justify-between">
          <a href="#main-content" className="text-[1.12rem] font-semibold tracking-[-.035em]" aria-label="Vadim67okak, вернуться наверх">
            {portfolioConfig.name}<span className="text-[#9175ff]">.</span>
          </a>

          <div className="hidden items-center gap-8 text-sm md:flex">
            {navItems.map((item) => <a key={item.href} href={item.href} className="catalog-link text-white/58 hover:text-white">{item.label}</a>)}
            <a href={portfolioConfig.socials.telegram} target="_blank" rel="noopener noreferrer" className="catalog-link text-white">Telegram ↗</a>
          </div>

          <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} className="grid size-10 place-items-center border border-white/25 md:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open ? (
          <div className="border-t border-white/12 py-2 md:hidden">
            {navItems.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/12 py-4 text-base">
                <span>{item.label}</span><span className="text-xs text-white/35">0{index + 1}</span>
              </a>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
