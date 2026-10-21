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
  title: "ATS Pulse — AI Resume Analyzer",
  description:
    "Compare your resume with a target job description, find underrepresented keywords, and get practical suggestions. ATS scores are estimates, not hiring guarantees.",
  keywords: [
    "ATS resume checker",
    "AI resume analyzer",
    "Groq Llama 3.3",
    "resume optimizer",
    "job description match",
    "applicant tracking system",
  ],
  authors: [{ name: "ATS Pulse" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
