import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luigi Carl Brezuela | Aspiring Backend Developer",
  description: "Portfolio of Luigi Carl Brezuela, a BS Information Technology student at Sorsogon State University – Bulan Campus, graduating in 2027 and seeking Backend Developer Internship opportunities.",
  openGraph: {
    title: "Luigi Carl Brezuela — Developer Portfolio",
    description: "Explore my web and mobile application projects, technical skills, and backend development experience.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
