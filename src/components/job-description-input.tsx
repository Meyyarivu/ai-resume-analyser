"use client";

import { Briefcase, Sparkles, Trash2 } from "lucide-react";
import { SAMPLE_JOB_DESCRIPTIONS } from "@/lib/sample-data";

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (val: string) => void;
}

export function JobDescriptionInput({
  jobDescription,
  setJobDescription,
}: JobDescriptionInputProps) {
  const wordCount = jobDescription.split(/\s+/).filter(Boolean).length;

  return (
    <div className="glass-surface premium-card flex h-full flex-col rounded-[26px] p-5 sm:p-6">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Briefcase className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
              2. Target Job Description
            </h2>
          </div>
        </div>

        {jobDescription && (
          <button
            type="button"
            onClick={() => setJobDescription("")}
            title="Clear job description"
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Textarea Area */}
      <div className="mt-4 flex-1">
        <textarea
          rows={7}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the target job description or requirements here..."
          className="w-full rounded-xl border border-neutral-300 bg-neutral-50/70 p-3.5 text-xs leading-relaxed text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950/60 dark:text-white"
        />

        <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-500">
          <span>
            {wordCount} words ({jobDescription.length} chars)
          </span>
          <span
            className={
              jobDescription.length >= 50
                ? "text-emerald-600 dark:text-emerald-400 font-medium"
                : "text-neutral-400"
            }
          >
            {jobDescription.length >= 50 ? "✓ Sufficient for analysis" : "Min 30 chars"}
          </span>
        </div>
      </div>

      {/* Quick Sample Selector */}
      <div className="mt-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
        <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
          Or load sample target role:
        </span>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {SAMPLE_JOB_DESCRIPTIONS.map((sample) => (
            <button
              key={sample.title}
              type="button"
              onClick={() => setJobDescription(sample.text)}
              className="flex items-center gap-1 rounded-md border border-neutral-200/80 bg-neutral-50 px-2 py-1 text-[11px] font-medium text-neutral-700 transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40"
            >
              <Sparkles className="h-3 w-3 text-indigo-500" />
              <span className="max-w-[200px] truncate">{sample.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
