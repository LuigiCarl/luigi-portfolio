import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.luigicarl.tech"),
  title: "Luigi Carl Brezuela | Full-Stack & Backend Developer",
  description:
    "Portfolio of Luigi Carl Brezuela, a BS Information Technology student at Sorsogon State University – Bulan Campus, graduating in 2027 and seeking Software Development & Backend Internship opportunities.",
  keywords: [
    "Luigi Carl Brezuela",
    "Luigi Carl",
    "Full-Stack Developer",
    "Backend Developer",
    "React",
    "React Native",
    "Next.js",
    "Laravel",
    "PHP",
    "TypeScript",
    "PostgreSQL",
    "Sorsogon State University",
    "Software Engineer Intern",
  ],
  authors: [{ name: "Luigi Carl Brezuela", url: "https://github.com/LuigiCarl" }],
  creator: "Luigi Carl Brezuela",
  openGraph: {
    title: "Luigi Carl Brezuela — Developer Portfolio",
    description:
      "Explore my web and mobile application projects, technical skills, and full-stack development experience.",
    url: "https://portfolio.luigicarl.tech",
    siteName: "Luigi Carl Brezuela Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luigi Carl Brezuela — Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luigi Carl Brezuela — Developer Portfolio",
    description:
      "Explore my web and mobile application projects, technical skills, and full-stack development experience.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
