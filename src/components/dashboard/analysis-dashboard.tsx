"use client";

import { useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import { AnalysisResult } from "@/types/analyzer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ScoreOverview } from "./score-overview";
import { KeywordGapAnalysis } from "./keyword-gap-analysis";
import { ActionableSuggestions } from "./actionable-suggestions";
import { SummaryOptimizer } from "./summary-optimizer";
import { StrengthsWeaknesses } from "./strengths-weaknesses";
import { SkillsBreakdown } from "./skills-breakdown";
import { ExportModal } from "./export-modal";

interface AnalysisDashboardProps {
  data: AnalysisResult;
  onReset: () => void;
  modelUsed?: string;
  isDemo?: boolean;
}

export function AnalysisDashboard({
  data,
  onReset,
  modelUsed,
  isDemo,
}: AnalysisDashboardProps) {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200/80 pb-6 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {data.candidateName ? `${data.candidateName}'s Audit` : "Resume Audit Results"}
            </span>
            {isDemo && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                Demo Preview Mode
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Targeting: <strong className="text-neutral-700 dark:text-neutral-300">{data.targetRole || "Specified Position"}</strong> • Analyzed {new Date(data.analyzedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 shadow-xs transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Analyze Another Resume</span>
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-500"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Grid of Sections with Staggered Fade */}
      <div className="mt-8 space-y-8">
        {/* 1. Score Overview */}
        <BlurFade delay={0.05}>
          <ScoreOverview data={data} />
        </BlurFade>

        {/* 2. Keyword Gap Analysis */}
        <BlurFade delay={0.12}>
          <KeywordGapAnalysis
            matchedKeywords={data.matchedKeywords}
            missingKeywords={data.missingKeywords}
          />
        </BlurFade>

        {/* 3. Actionable Improvements */}
        <BlurFade delay={0.18}>
          <ActionableSuggestions suggestions={data.actionableSuggestions} />
        </BlurFade>

        {/* 4. Professional Summary Optimizer */}
        <BlurFade delay={0.24}>
          <SummaryOptimizer summaryReview={data.professionalSummaryReview} />
        </BlurFade>

        {/* 5. Strengths & Opportunities */}
        <BlurFade delay={0.3}>
          <StrengthsWeaknesses
            strengths={data.strengths}
            weaknesses={data.weaknesses}
          />
        </BlurFade>

        {/* 6. Skills Matrix */}
        <BlurFade delay={0.36}>
          <SkillsBreakdown skills={data.skillsIdentified} />
        </BlurFade>

        {/* Footer Disclaimer */}
        <div className="rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-4 text-center text-[11px] leading-relaxed text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400">
          <p>
            <strong>Disclaimer:</strong> The ATS compatibility score and recommendations are algorithmic estimates designed for career coaching and self-optimization. Corporate applicant tracking systems (e.g. Workday, Greenhouse, Taleo) employ varied filtering rules. This platform does not guarantee interview offers or hiring decisions.
          </p>
          {modelUsed && (
            <p className="mt-1 text-[10px] text-neutral-400 dark:text-neutral-500">
              Inference engine: {modelUsed}
            </p>
          )}
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        data={data}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}
