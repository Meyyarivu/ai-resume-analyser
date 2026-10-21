"use client";

import { useState } from "react";
import { Lightbulb, Copy, Check } from "lucide-react";
import { ActionableSuggestion } from "@/types/analyzer";

interface ActionableSuggestionsProps {
  suggestions: ActionableSuggestion[];
}

export function ActionableSuggestions({
  suggestions,
}: ActionableSuggestionsProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800";
    }
  };

  return (
    <section className="surface-card p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Actionable Improvement Suggestions
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Practical suggestions based on the resume and target role.
            </p>
          </div>
        </div>

        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          {suggestions.length} Actions
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {suggestions.length === 0 && <p className="rounded-xl bg-[var(--surface-secondary)] p-4 text-sm text-neutral-600">No improvement suggestions were returned for this analysis.</p>}
        {suggestions.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-neutral-200/90 bg-neutral-50/50 p-4 transition dark:border-neutral-800 dark:bg-neutral-950/40"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {item.category}
                </span>
              </div>
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getImpactBadge(
                  item.impact
                )}`}
              >
                {item.impact} Impact
              </span>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
              {item.suggestion}
            </p>

            {/* Before / After Rewrite Card */}
            {item.exampleBeforeAfter && (
              <div className="mt-3.5 space-y-2 rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-2 text-xs">
                  <span className="shrink-0 rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 dark:bg-rose-950 dark:text-rose-400">
                    Original
                  </span>
                  <p className="font-mono text-[11px] text-neutral-600 line-through decoration-rose-400 dark:text-neutral-400">
                    {item.exampleBeforeAfter.before}
                  </p>
                </div>

                <div className="flex items-start justify-between gap-2 pt-1 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      Optimized
                    </span>
                    <p className="font-mono text-[11px] font-medium text-emerald-900 dark:text-emerald-300">
                      {item.exampleBeforeAfter.after}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(item.exampleBeforeAfter!.after, idx)
                    }
                    aria-label={copiedIdx === idx ? "Optimized bullet copied" : "Copy optimized bullet"}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    {copiedIdx === idx ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
