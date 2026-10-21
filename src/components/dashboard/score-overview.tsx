"use client";

import { Award, CheckCircle2, TrendingUp, BarChart3, AlertTriangle } from "lucide-react";
import { AnalysisResult } from "@/types/analyzer";
import { AnimatedCircularProgress } from "@/components/magicui/animated-circular-progress";
import { NumberTicker } from "@/components/magicui/number-ticker";

interface ScoreOverviewProps {
  data: AnalysisResult;
}

export function ScoreOverview({ data }: ScoreOverviewProps) {
  const getAtsGrade = (score: number) => {
    if (score >= 85)
      return {
        label: "Strong alignment",
        color: "text-emerald-700 bg-emerald-50 border-emerald-300 dark:text-emerald-400 dark:bg-emerald-950/50 dark:border-emerald-800",
        description: "The resume aligns well with the provided role details.",
        icon: CheckCircle2,
      };
    if (score >= 70)
      return {
        label: "Good alignment",
        color: "text-blue-700 bg-blue-50 border-blue-300 dark:text-blue-400 dark:bg-blue-950/50 dark:border-blue-800",
        description: "A few focused changes may improve the role match.",
        icon: TrendingUp,
      };
    if (score >= 55)
      return {
        label: "Some alignment",
        color: "text-amber-700 bg-amber-50 border-amber-300 dark:text-amber-400 dark:bg-amber-950/50 dark:border-amber-800",
        description: "Review the missing skills and keywords below.",
        icon: AlertTriangle,
      };
    return {
      label: "More tailoring needed",
      color: "text-rose-700 bg-rose-50 border-rose-300 dark:text-rose-400 dark:bg-rose-950/50 dark:border-rose-800",
      description: "The resume could be tailored more closely to this role.",
      icon: AlertTriangle,
    };
  };

  const grade = getAtsGrade(data.atsCompatibilityScore);
  const GradeIcon = grade.icon;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {/* Main Score Hero Card */}
      <section className="surface-card relative overflow-hidden p-5 sm:p-6 lg:col-span-1" aria-labelledby="estimated-score-title">

        <div className="flex items-center justify-between">
          <span id="estimated-score-title" className="text-sm font-semibold text-neutral-800">
            Estimated ATS compatibility
          </span>
          <Award className="h-4 w-4 text-blue-700" />
        </div>

        <div className="mt-4 flex flex-col items-center justify-center">
          <AnimatedCircularProgress
            value={data.atsCompatibilityScore}
            size={160}
            strokeWidth={14}
            label="ESTIMATE"
          />

          <div
            className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${grade.color}`}
          >
            <GradeIcon className="h-3.5 w-3.5" />
            <span>{grade.label}</span>
          </div>

          <p className="mt-3 max-w-xs text-center text-xs leading-5 text-neutral-600">
            {grade.description}
          </p>
          <p className="mt-2 max-w-xs text-center text-[11px] leading-5 text-neutral-500">An estimate based on this resume and job description. Employers use different systems and criteria.</p>
        </div>
      </section>

      {/* Sub-Metrics and Breakdown */}
      <section className="surface-card flex flex-col justify-between p-5 sm:p-6 lg:col-span-2">
        <div>
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-700" />
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Detailed Match Diagnostics
              </h3>
            </div>
            <span className="text-xs text-neutral-400">
              Role: <strong className="text-neutral-700 dark:text-neutral-300">{data.targetRole || "Target Position"}</strong>
            </span>
          </div>

          {/* Quick Metrics 3-Col Bar */}
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-3 text-center dark:border-neutral-800 dark:bg-neutral-950/60">
              <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Skill Match
              </span>
              <div className="mt-1 flex items-baseline justify-center">
                <NumberTicker
                  value={data.skillMatchPercentage}
                  className="text-2xl font-bold text-neutral-900 dark:text-white"
                />
                <span className="text-sm text-neutral-400">%</span>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-3 text-center dark:border-neutral-800 dark:bg-neutral-950/60">
              <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Experience Relevance
              </span>
              <div className="mt-1 flex items-baseline justify-center">
                <NumberTicker
                  value={data.experienceRelevanceScore}
                  className="text-2xl font-bold text-neutral-900 dark:text-white"
                />
                <span className="text-sm text-neutral-500">/100</span>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-3 text-center dark:border-neutral-800 dark:bg-neutral-950/60">
              <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Overall Weighted
              </span>
              <div className="mt-1 flex items-baseline justify-center">
                <NumberTicker
                  value={data.overallScore}
                  className="text-2xl font-semibold text-blue-700"
                />
                <span className="text-sm text-neutral-400">/100</span>
              </div>
            </div>
          </div>

          {/* Section Progress Bars */}
          <div className="mt-5 space-y-3">
            {[
              {
                label: "Impact & Measurable Metrics",
                score: data.sectionScores.impactAndMetrics,
              },
              {
                label: "Formatting & Structure Readability",
                score: data.sectionScores.formattingAndClarity,
              },
              {
                label: "Keyword Optimization & Density",
                score: data.sectionScores.keywordOptimization,
              },
              {
                label: "Brevity & Seniority Alignment",
                score: data.sectionScores.brevityAndRelevance,
              },
            ].map((section) => (
              <div key={section.label}>
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    {section.label}
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {section.score}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-700 ease-out motion-reduce:duration-0"
                    style={{ width: `${section.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Summary Quote */}
        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-6 text-neutral-700">
          <strong className="font-semibold text-neutral-900">
            Executive Summary:{" "}
          </strong>
          {data.resumeSummary}
        </div>
      </section>
    </div>
  );
}
