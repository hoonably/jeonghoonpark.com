import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./modal.css";
import "./blog.css";
import "./sections.css";
import Navbar from "@/components/layout/Navbar";
import { profile } from "@/data/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: profile.name,
    template: `%s | ${profile.name}`,
  },
  description: `${profile.role} at ${profile.affiliation}. ${profile.location}.`,
  authors: [{ name: profile.name }],
  alternates: {
    canonical: "https://jeonghoonpark.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jeonghoonpark.com",
    siteName: profile.name,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
