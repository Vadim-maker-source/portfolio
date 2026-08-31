"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, portfolioConfig } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <header className="fixed top-3 right-0 left-0 z-50 flex justify-center px-3">
      <nav aria-label="Основная навигация" className="w-full max-w-4xl rounded-full bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl">
        <div className="flex h-12 items-center justify-between gap-6 pr-2 pl-5">
          <a href="#main-content" aria-label="Vadim67okak, вернуться наверх" className="flex shrink-0 items-center gap-2 rounded-full">
            <span className="grid size-7 place-items-center rounded-full bg-violet-500 text-[.7rem] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.22)]">V67</span>
            <span className="hidden text-lg font-bold tracking-tight sm:inline">{portfolioConfig.name}</span>
          </a>

          <div className="hidden items-center gap-6 text-[.88rem] font-medium text-white/70 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <a href="#contact" className="rounded-full bg-violet-500 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-violet-400">
              Связаться
            </a>
            <button type="button" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center rounded-full bg-white/[.04] text-white/80 transition-colors hover:bg-white/[.08] hover:text-white md:hidden">
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute top-14 right-3 left-3 rounded-[1.5rem] bg-[#0b0c11]/80 p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_18px_50px_rgba(0,0,0,.3)] backdrop-blur-2xl md:hidden">
            {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-zinc-300 hover:bg-white/[.05] hover:text-white"><span>{item.label}</span><span className="text-[.78rem] font-medium text-zinc-500">{item.href}</span></a>)}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
