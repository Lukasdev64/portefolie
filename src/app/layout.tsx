import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Background } from "@/components/background";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lukas Andries - Développeur Web Fullstack",
    template: "%s | Lukas Andries"
  },
  description: "Portfolio de Lukas Andries, développeur web fullstack spécialisé en React, NestJS et architectures modernes. Découvrez mes projets et compétences.",
  keywords: ["Développeur Web", "Fullstack", "React", "NestJS", "Next.js", "TypeScript", "Freelance", "France"],
  authors: [{ name: "Lukas Andries" }],
  creator: "Lukas Andries",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://andries-pro.fr",
    title: "Lukas Andries - Développeur Web Fullstack",
    description: "Portfolio de Lukas Andries, développeur web fullstack spécialisé en React, NestJS et architectures modernes.",
    siteName: "Lukas Andries Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lukas Andries - Développeur Web Fullstack",
    description: "Portfolio de Lukas Andries, développeur web fullstack spécialisé en React, NestJS et architectures modernes.",
    creator: "@lukasandries",
  },
  metadataBase: new URL("https://andries-pro.fr"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Background />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
