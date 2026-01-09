import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "HomeSchool - Interactive Learning Platform",
  description: "A production-ready interactive homeschool teaching platform for 4th graders. Aligned to Texas standards with engaging activities and mastery tracking.",
  keywords: ["homeschool", "education", "4th grade", "learning", "Texas", "TEKS"],
  authors: [{ name: "HomeSchool Platform" }],
  openGraph: {
    title: "HomeSchool - Interactive Learning Platform",
    description: "Engaging homeschool curriculum for 4th graders",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
