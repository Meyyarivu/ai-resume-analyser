"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Search } from "lucide-react";
import { MissingKeyword } from "@/types/analyzer";

interface KeywordGapAnalysisProps {
  matchedKeywords: string[];
  missingKeywords: MissingKeyword[];
}

export function KeywordGapAnalysis({
  matchedKeywords,
  missingKeywords,
}: KeywordGapAnalysisProps) {
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [search, setSearch] = useState("");

  const filteredMissing = missingKeywords.filter((item) => {
    const matchesFilter = filter === "all" || item.importance === filter;
    const matchesSearch =
      item.keyword.toLowerCase().includes(search.toLowerCase()) ||
      item.context.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getBadgeStyle = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700";
    }
  };

  return (
    <section className="surface-card p-5 sm:p-6">
      <div className="flex flex-col gap-3 border-b border-neutral-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            ATS Keyword Gap Analysis
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Compare keywords present in your resume against critical terms identified in the job description.
          </p>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {matchedKeywords.length} Matched
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
            <AlertCircle className="h-3.5 w-3.5" />
            {missingKeywords.length} Gaps
          </span>
        </div>
      </div>

      {/* Matched Keywords Grid */}
      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Detected & Matched Keywords
        </h4>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {matchedKeywords.length > 0 ? (
            matchedKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-1 text-xs font-medium text-emerald-800 transition dark:border-emerald-800/60 dark:bg-emerald-950/30 dark:text-emerald-300"
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                {kw}
              </span>
            ))
          ) : (
            <span className="text-xs text-neutral-400 italic">
              No direct keyword matches detected.
            </span>
          )}
        </div>
      </div>

      {/* Missing Keywords Section with Priority Filter */}
      <div className="mt-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Missing or Underrepresented Keywords ({missingKeywords.length})
          </h4>

          {/* Filter and Search Bar */}
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-auto">
              <Search className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                aria-label="Search missing keywords and their context"
                placeholder="Search gap keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="field-control min-h-10 w-full py-1 pl-8 pr-3 text-xs sm:w-56"
              />
            </div>

            <div role="group" aria-label="Filter keywords by priority" className="flex w-fit max-w-full flex-wrap items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 p-0.5">
              {(["all", "high", "medium", "low"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  aria-pressed={filter === lvl}
                  onClick={() => setFilter(lvl)}
                  className={`min-h-10 rounded-md px-2 text-[11px] font-medium capitalize transition ${
                    filter === lvl
                      ? "bg-white text-neutral-900 shadow-xs dark:bg-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Missing Keyword Detail Cards */}
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {filteredMissing.length > 0 ? (
            filteredMissing.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-neutral-200/90 bg-neutral-50/50 p-3.5 transition hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950/40 dark:hover:border-neutral-700"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-900 text-sm dark:text-white">
                      {item.keyword}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle(
                        item.importance
                      )}`}
                    >
                      {item.importance} Priority
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item.context}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-4 text-center text-xs text-neutral-400">
              No keywords match your current filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
