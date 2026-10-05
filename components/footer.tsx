import { portfolioConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/14 bg-[#070707] py-8 text-white">
      <div className="site-container flex flex-col gap-4 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-white">{portfolioConfig.name}<span className="text-[#a895ff]">.</span></p>
        <p>Инженер программных систем / {new Date().getFullYear()}</p>
        <a href="#main-content" className="catalog-link self-start sm:self-auto">Наверх ↑</a>
      </div>
    </footer>
  );
}
