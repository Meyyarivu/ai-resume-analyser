"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import { AnalysisResult } from "@/types/analyzer";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FileUploader } from "@/components/file-uploader";
import { JobDescriptionInput } from "@/components/job-description-input";
import { LoadingState } from "@/components/loading-state";
import { AnalysisDashboard } from "@/components/dashboard/analysis-dashboard";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [customApiKey, setCustomApiKey] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [modelUsed, setModelUsed] = useState<string>("");
  const [isDemo, setIsDemo] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setErrorMessage(null);

    if (!resumeText || resumeText.trim().length < 50) {
      setErrorMessage("Please upload a resume or paste your resume text (min 50 characters).");
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      setErrorMessage("Please provide a job description (min 30 characters).");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          userApiKey: customApiKey || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze resume.");
      }

      setAnalysisResult(data.data);
      setModelUsed(data.modelUsed || "Groq LPU");
      setIsDemo(!!data.isDemo);

      // Smooth scroll to top of results
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "An error occurred during analysis.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setErrorMessage(null);
    // Keep resume and JD so user can easily tweak them without re-uploading
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f7fa] text-neutral-900 transition-colors duration-500 dark:bg-[#08080b] dark:text-neutral-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[720px] overflow-hidden">
        <div className="absolute left-1/2 top-[-360px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(129,140,248,.14),transparent_68%)] dark:bg-[radial-gradient(ellipse,rgba(99,102,241,.12),transparent_68%)]" />
        <div className="absolute left-[8%] top-52 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,.07),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,.08),transparent_70%)]" />
      </div>
      {/* Background Dot Pattern */}
      <DotPattern
        width={32}
        height={32}
        cx={1}
        cy={1}
        cr={1}
        className="opacity-[.16] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] dark:opacity-[.12]"
      />

      {/* Navbar */}
      <Navbar
        customApiKey={customApiKey}
        setCustomApiKey={setCustomApiKey}
        isDemo={isDemo}
      />

      <main className="relative z-10">
        {!analysisResult ? (
          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
            <HeroSection />

            {/* Error Banner */}
            {errorMessage && (
              <div className="mx-auto mb-6 max-w-3xl flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-50/70 p-4 text-xs font-medium text-rose-800 dark:border-rose-500/20 dark:bg-rose-950/40 dark:text-rose-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {isLoading ? (
              <LoadingState />
            ) : (
          <div className="mx-auto max-w-5xl space-y-6 pb-4">
                {/* 2-Column Input Grid */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <FileUploader
                    resumeText={resumeText}
                    setResumeText={setResumeText}
                    fileName={fileName}
                    setFileName={setFileName}
                    isExtracting={isExtracting}
                    setIsExtracting={setIsExtracting}
                  />

                  <JobDescriptionInput
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                  />
                </div>

                {/* Primary Action Button */}
                <div className="flex flex-col items-center justify-center pt-3">
                  <ShimmerButton
                    onClick={handleAnalyze}
                    disabled={isExtracting || isLoading}
                    shimmerColor="#818cf8"
                    shimmerDuration="2.5s"
                    className="w-full max-w-md rounded-2xl py-4 text-sm font-semibold shadow-xl shadow-indigo-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <div className="flex items-center justify-center gap-2 text-white dark:text-white">
                      <Sparkles className="h-4 w-4 text-indigo-300" />
                      <span>Run Precision ATS Analysis</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </ShimmerButton>

                  <p className="mt-3 text-center text-xs text-neutral-500 dark:text-neutral-400">
                    Free instant analysis • No registration required • Strict zero data retention
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Results Dashboard View */
          <AnalysisDashboard
            data={analysisResult}
            onReset={handleReset}
            modelUsed={modelUsed}
            isDemo={isDemo}
          />
        )}
      </main>
    </div>
  );
}
