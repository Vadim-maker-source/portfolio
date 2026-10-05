import type { Metadata } from "next";
import { Geologica, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Vadim67okak | Software Engineer",
  description:
    "Портфолио Vadim67okak: разработка программных систем, DevOps, кибербезопасность и 3D-моделирование в Blender, ZBrush и Substance 3D Painter.",
  keywords: ["Vadim67okak", "Software Engineer", "Next.js", "TypeScript", "Python", "FastAPI", "Blender", "ZBrush", "Substance 3D Painter"],
  authors: [{ name: "Vadim67okak" }],
  openGraph: {
    title: "Vadim67okak | Software Engineer",
    description: "Интерфейсы, backend, инфраструктура, безопасность и 3D как единая инженерная практика.",
    type: "website",
    siteName: "Vadim67okak Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadim67okak | Software Engineer",
    description: "Интерфейсы, backend, инфраструктура, безопасность и 3D как единая инженерная практика.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${manrope.variable} ${geologica.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Перейти к содержимому</a>
        {children}
      </body>
    </html>
  );
}
