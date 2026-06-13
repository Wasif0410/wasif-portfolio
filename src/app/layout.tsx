import type { Metadata } from "next";
import { Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wasif Saeed",
  description:
    "Portfolio for Wasif Saeed, an AI and software developer building intelligent systems, automation tools, and AI-powered products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${jetbrainsMono.variable} ${archivoBlack.variable}`}>
      <body suppressHydrationWarning className="min-h-full w-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
