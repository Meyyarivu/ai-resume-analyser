"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import { AnalysisResult } from "@/types/analyzer";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FileUploader } from "@/components/file-uploader";
import { JobDescriptionInput } from "@/components/job-description-input";
import { LoadingState } from "@/components/loading-state";
import { AnalysisDashboard } from "@/components/dashboard/analysis-dashboard";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
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
  const [hasAttemptedAnalysis, setHasAttemptedAnalysis] = useState(false);

  const updateResumeText = (value: string) => { setResumeText(value); setErrorMessage(null); };
  const updateJobDescription = (value: string) => { setJobDescription(value); setErrorMessage(null); };

  const handleAnalyze = async () => {
    setHasAttemptedAnalysis(true);
    setErrorMessage(null);

    if (!resumeText || resumeText.trim().length < 50) {
      setErrorMessage("Please upload a resume or paste your resume text (min 50 characters).");
      return;
    }
    if (resumeText.length > 50000) {
      setErrorMessage("Resume text must be 50,000 characters or fewer. Please shorten it and try again.");
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      setErrorMessage("Please provide a job description (min 30 characters).");
      return;
    }
    if (jobDescription.length > 30000) {
      setErrorMessage("Job description must be 30,000 characters or fewer. Please shorten it and try again.");
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
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Navbar */}
      <Navbar
        customApiKey={customApiKey}
        setCustomApiKey={setCustomApiKey}
        isDemo={isDemo}
      />

      <main id="main-content" className="mx-auto w-full max-w-[1280px] px-4 pb-10 sm:px-7 lg:px-10">
        <AnimatePresence mode="wait" initial={false}>
          {!analysisResult ? (
            <motion.div key="analysis-input" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: .24, ease: [.2, .8, .2, 1] }}>
              <HeroSection />
              {errorMessage && <div role="alert" className="mx-auto mb-5 flex max-w-5xl items-start gap-2.5 rounded-xl border border-red-200 bg-[var(--danger-soft)] p-4 text-sm leading-5 text-red-800"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>{errorMessage}</span></div>}
              {isLoading ? <LoadingState /> : <>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-2">
                  <FileUploader resumeText={resumeText} setResumeText={updateResumeText} fileName={fileName} setFileName={setFileName} isExtracting={isExtracting} setIsExtracting={setIsExtracting} isInvalid={hasAttemptedAnalysis && (resumeText.trim().length < 50 || resumeText.length > 50000)} />
                  <JobDescriptionInput jobDescription={jobDescription} setJobDescription={updateJobDescription} isInvalid={hasAttemptedAnalysis && (jobDescription.trim().length < 30 || jobDescription.length > 30000)} />
                </div>
                <div className="mx-auto flex max-w-5xl flex-col items-center pt-6">
                  <ShimmerButton onClick={handleAnalyze} disabled={isExtracting || isLoading} shimmerColor="#ffffff" shimmerDuration="4s" background="#2563eb" className="min-h-12 w-full max-w-md rounded-xl px-6 py-3 text-sm font-semibold shadow-md transition hover:-translate-y-px hover:bg-[#1d4ed8] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none">
                    <span className="flex items-center justify-center gap-2 text-white"><Sparkles className="h-4 w-4" aria-hidden="true" /><span>Analyze my resume</span><ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                  </ShimmerButton>
                  <p className="mt-3 max-w-xl text-center text-xs leading-5 text-neutral-500">Your resume and job description are sent for this analysis and are not saved to an account or history.</p>
                </div>
                <section className="mx-auto mt-10 max-w-4xl border-t border-neutral-200 pt-6" aria-label="How the analysis works">
                  <ol className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 sm:gap-6">
                    <li className="flex items-center justify-center gap-2 text-xs text-neutral-600"><span className="tabular-nums text-[11px] font-semibold text-neutral-400">01</span><span>Add a resume</span></li>
                    <li className="flex items-center justify-center gap-2 text-xs text-neutral-600"><span className="tabular-nums text-[11px] font-semibold text-neutral-400">02</span><span>Compare with a job description</span></li>
                    <li className="flex items-center justify-center gap-2 text-xs text-neutral-600"><span className="tabular-nums text-[11px] font-semibold text-neutral-400">03</span><span>Review the analysis and suggestions</span></li>
                  </ol>
                </section>
              </>}
            </motion.div>
          ) : (
            <motion.div key="analysis-results" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: .24, ease: [.2, .8, .2, 1] }}>
              <AnalysisDashboard data={analysisResult} onReset={handleReset} modelUsed={modelUsed} isDemo={isDemo} fileName={fileName} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="border-t border-neutral-200 bg-white/60 px-4 py-5 text-center text-xs text-neutral-500 sm:px-7">
        <p>ATS Pulse · Resume analysis estimates are informational and do not guarantee employer ATS outcomes.</p>
      </footer>
    </div>
  );
}
