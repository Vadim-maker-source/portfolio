import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { portfolioConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="pb-6 pt-10">
      <div className="site-container flex flex-col gap-5 border-t border-white/[.07] pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {portfolioConfig.name}</p>
        <p>Создано с помощью Next.js, TypeScript и Tailwind CSS</p>
        <div className="flex items-center gap-4">
          <a href={portfolioConfig.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub, откроется в новой вкладке" className="transition-colors hover:text-white"><FaGithub className="size-4" /></a>
          <a href={portfolioConfig.socials.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram, откроется в новой вкладке" className="transition-colors hover:text-violet-300"><FaTelegramPlane className="size-4" /></a>
        </div>
      </div>
    </footer>
  );
}
