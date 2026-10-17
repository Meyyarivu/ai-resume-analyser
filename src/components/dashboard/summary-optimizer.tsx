"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, CheckCircle2 } from "lucide-react";
import { ProfessionalSummaryReview } from "@/types/analyzer";

interface SummaryOptimizerProps {
  summaryReview: ProfessionalSummaryReview;
}

export function SummaryOptimizer({ summaryReview }: SummaryOptimizerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryReview.improvedVersion);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="glass-surface premium-card rounded-[26px] p-6">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Professional Summary Optimizer
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              An ATS-tailored executive elevator pitch synthesized directly from your qualifications.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-xs transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Optimized Summary</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {/* Assessment Critique */}
        <div className="rounded-xl border border-neutral-200/70 bg-neutral-50/60 p-4 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-neutral-300">
          <span className="font-bold text-neutral-900 dark:text-white">
            Current Summary Assessment:{" "}
          </span>
          {summaryReview.currentAssessment}
        </div>

        {/* Polished Rewrite Block */}
        <div className="relative rounded-xl border border-purple-500/30 bg-purple-50/20 p-4.5 dark:border-purple-500/20 dark:bg-purple-950/20">
          <div className="flex items-center justify-between pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
              ATS-Optimized Executive Bio
            </span>
          </div>
          <p className="font-serif text-sm italic leading-relaxed text-neutral-800 dark:text-neutral-200">
            &ldquo;{summaryReview.improvedVersion}&rdquo;
          </p>
        </div>

        {/* Changes Made Checklist */}
        {summaryReview.keyChangesMade.length > 0 && (
          <div className="pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Strategic Adjustments Applied
            </h4>
            <div className="mt-2 space-y-1.5">
              {summaryReview.keyChangesMade.map((change, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>{change}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
