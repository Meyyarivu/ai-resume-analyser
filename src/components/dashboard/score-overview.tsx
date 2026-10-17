"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Award, CheckCircle2, TrendingUp, BarChart3, AlertTriangle } from "lucide-react";
import { AnalysisResult } from "@/types/analyzer";
import { AnimatedCircularProgress } from "@/components/magicui/animated-circular-progress";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BorderBeam } from "@/components/magicui/border-beam";

interface ScoreOverviewProps {
  data: AnalysisResult;
}

export function ScoreOverview({ data }: ScoreOverviewProps) {
  useEffect(() => {
    if (data.atsCompatibilityScore >= 80) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3b82f6", "#6366f1", "#10b981", "#a855f7"],
        });
      } catch {
        // Safe confetti fallback
      }
    }
  }, [data.atsCompatibilityScore]);

  const getAtsGrade = (score: number) => {
    if (score >= 85)
      return {
        label: "Excellent Fit (Tier 1)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-300 dark:text-emerald-400 dark:bg-emerald-950/50 dark:border-emerald-800",
        description: "High probability of passing automated enterprise screening.",
        icon: CheckCircle2,
      };
    if (score >= 70)
      return {
        label: "Strong Contender (Tier 2)",
        color: "text-blue-700 bg-blue-50 border-blue-300 dark:text-blue-400 dark:bg-blue-950/50 dark:border-blue-800",
        description: "Competitive match. Minor keyword additions can push into top 10%.",
        icon: TrendingUp,
      };
    if (score >= 55)
      return {
        label: "Moderate Alignment (Tier 3)",
        color: "text-amber-700 bg-amber-50 border-amber-300 dark:text-amber-400 dark:bg-amber-950/50 dark:border-amber-800",
        description: "Meets baseline criteria but misses critical keywords or metrics.",
        icon: AlertTriangle,
      };
    return {
      label: "Needs Optimization (Tier 4)",
      color: "text-rose-700 bg-rose-50 border-rose-300 dark:text-rose-400 dark:bg-rose-950/50 dark:border-rose-800",
      description: "Significant structural or skill gaps compared to role expectations.",
      icon: AlertTriangle,
    };
  };

  const grade = getAtsGrade(data.atsCompatibilityScore);
  const GradeIcon = grade.icon;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {/* Main Score Hero Card */}
      <div className="glass-surface premium-card relative overflow-hidden rounded-[26px] p-6 lg:col-span-1">
        <BorderBeam size={220} duration={12} delay={0} />

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
            ATS Compatibility Score
          </span>
          <Award className="h-4 w-4 text-indigo-500" />
        </div>

        <div className="mt-4 flex flex-col items-center justify-center">
          <AnimatedCircularProgress
            value={data.atsCompatibilityScore}
            size={160}
            strokeWidth={14}
            label="ATS MATCH"
          />

          <div
            className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${grade.color}`}
          >
            <GradeIcon className="h-3.5 w-3.5" />
            <span>{grade.label}</span>
          </div>

          <p className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
            {grade.description}
          </p>
        </div>
      </div>

      {/* Sub-Metrics and Breakdown */}
      <div className="glass-surface premium-card flex flex-col justify-between rounded-[26px] p-6 lg:col-span-2">
        <div>
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-indigo-500" />
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Detailed Match Diagnostics
              </h3>
            </div>
            <span className="text-xs text-neutral-400">
              Role: <strong className="text-neutral-700 dark:text-neutral-300">{data.targetRole || "Target Position"}</strong>
            </span>
          </div>

          {/* Quick Metrics 3-Col Bar */}
          <div className="mt-4 grid grid-cols-3 gap-3">
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
                <span className="text-sm text-neutral-400">/100</span>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-3 text-center dark:border-neutral-800 dark:bg-neutral-950/60">
              <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Overall Weighted
              </span>
              <div className="mt-1 flex items-baseline justify-center">
                <NumberTicker
                  value={data.overallScore}
                  className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
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
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out"
                    style={{ width: `${section.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Summary Quote */}
        <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50/40 p-3.5 text-xs leading-relaxed text-neutral-700 dark:border-indigo-950 dark:bg-indigo-950/20 dark:text-neutral-300">
          <strong className="text-indigo-950 dark:text-indigo-300 font-semibold">
            Executive Summary:{" "}
          </strong>
          {data.resumeSummary}
        </div>
      </div>
    </div>
  );
}
