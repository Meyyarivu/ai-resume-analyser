"use client";

import { useEffect, useState } from "react";
import { Sparkles, CheckCircle2, Clock } from "lucide-react";

const STAGES = [
  "Inspecting resume formatting and structure...",
  "Extracting candidate hard & soft skills...",
  "Comparing keyword match density against job requirements...",
  "Evaluating semantic experience relevance with Groq Llama 3.3...",
  "Generating targeted executive summary & bullet point rewrites...",
];

export function LoadingState() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto my-12 max-w-xl rounded-2xl border border-neutral-200/80 bg-white/90 p-8 text-center shadow-lg backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/90">
      {/* Animated Glowing Ring */}
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/20" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30">
          <Sparkles className="h-7 w-7 animate-pulse" />
        </div>
      </div>

      <h3 className="mt-5 text-lg font-bold text-neutral-900 dark:text-white">
        Analyzing Resume Compatibility
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Groq LPU high-throughput inference running across 100+ ATS evaluation vectors
      </p>

      {/* Progress Steps */}
      <div className="mt-6 space-y-2.5 text-left">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;

          return (
            <div
              key={stage}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-all duration-300 ${
                isCurrent
                  ? "bg-indigo-50/80 font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
                  : isDone
                  ? "text-neutral-400 dark:text-neutral-500"
                  : "text-neutral-300 dark:text-neutral-600 opacity-60"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              ) : isCurrent ? (
                <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent dark:border-indigo-400" />
              ) : (
                <Clock className="h-4 w-4 shrink-0" />
              )}
              <span>{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
