import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATS Pulse — Precision AI Resume Analyzer & Job Fit Engine",
  description:
    "Audit your resume for Applicant Tracking Systems (ATS) with Llama 3.3 on Groq. Extract keywords, detect missing qualifications, and receive executive bullet improvements instantly.",
  keywords: [
    "ATS resume checker",
    "AI resume analyzer",
    "Groq Llama 3.3",
    "resume optimizer",
    "job description match",
    "applicant tracking system",
  ],
  authors: [{ name: "ATS Pulse Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
