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
  fileName?: string;
}

export function AnalysisDashboard({
  data,
  onReset,
  modelUsed,
  isDemo,
  fileName,
}: AnalysisDashboardProps) {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="mx-auto max-w-[1200px] py-8 sm:py-10">
      {/* Top Action Bar */}
      <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-[-.04em] text-neutral-950">
              {data.candidateName ? `${data.candidateName}’s analysis` : "Analysis results"}
            </h1>
            {isDemo && (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                Sample analysis
              </span>
            )}
          </div>
          <p className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-neutral-600">
            {fileName && <span className="max-w-full truncate">Resume: <strong className="font-medium text-neutral-800">{fileName}</strong></span>}
            {fileName && <span aria-hidden="true">·</span>}
            <span>Role: <strong className="font-medium text-neutral-800">{data.targetRole || "Specified position"}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Analyzed {new Date(data.analyzedAt).toLocaleDateString("en-US", { timeZone: "UTC" })}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={onReset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-50 active:scale-[.98]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Analyze Another Resume</span>
          </button>

          <button
            id="export-report-trigger"
            onClick={() => setShowExportModal(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--accent-hover)] active:scale-[.98]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Grid of Sections with Staggered Fade */}
      <div className="mx-auto mt-7 max-w-[1100px] space-y-5">
        {/* 1. Score Overview */}
        <BlurFade delay={0} duration={0.28}>
          <ScoreOverview data={data} />
        </BlurFade>

        {/* 2. Keyword Gap Analysis */}
        <BlurFade delay={0.04} duration={0.28}>
          <KeywordGapAnalysis
            matchedKeywords={data.matchedKeywords}
            missingKeywords={data.missingKeywords}
          />
        </BlurFade>

        {/* 3. Actionable Improvements */}
        <BlurFade delay={0.08} duration={0.28}>
          <ActionableSuggestions suggestions={data.actionableSuggestions} />
        </BlurFade>

        {/* 4. Professional Summary Optimizer */}
        <BlurFade delay={0.12} duration={0.28}>
          <SummaryOptimizer summaryReview={data.professionalSummaryReview} />
        </BlurFade>

        {/* 5. Strengths & Opportunities */}
        <BlurFade delay={0.16} duration={0.28}>
          <StrengthsWeaknesses
            strengths={data.strengths}
            weaknesses={data.weaknesses}
          />
        </BlurFade>

        {/* 6. Skills Matrix */}
        <BlurFade delay={0.2} duration={0.28}>
          <SkillsBreakdown skills={data.skillsIdentified} />
        </BlurFade>

        {/* Footer Disclaimer */}
        <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-center text-xs leading-relaxed text-neutral-600">
          <p>
            <strong>Disclaimer:</strong> The ATS compatibility score and recommendations are algorithmic estimates designed for career coaching and self-optimization. Corporate applicant tracking systems (e.g. Workday, Greenhouse, Taleo) employ varied filtering rules. This platform does not guarantee interview offers or hiring decisions.
          </p>
          {modelUsed && (
            <p className="mt-1 text-xs text-neutral-500">
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
