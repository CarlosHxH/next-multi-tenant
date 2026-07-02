import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SonnerProvider } from "@/providers/SonnerProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plataforma Multi-Tenant",
  description: "Cardápios digitais multi-tenant baseados em subdomínio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SonnerProvider />
      </body>
    </html>
  );
}
