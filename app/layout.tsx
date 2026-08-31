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
    "Портфолио Vadim67okak, software engineer с опытом в Next.js, TypeScript, Python, FastAPI, NestJS, базах данных, DevOps и кибербезопасности.",
  keywords: ["Vadim67okak", "Software Engineer", "Next.js", "TypeScript", "Python", "FastAPI"],
  authors: [{ name: "Vadim67okak" }],
  openGraph: {
    title: "Vadim67okak | Software Engineer",
    description: "Современные веб-приложения, backend-сервисы и real-time системы.",
    type: "website",
    siteName: "Vadim67okak Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadim67okak | Software Engineer",
    description: "Современные веб-приложения, backend-сервисы и real-time системы.",
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
