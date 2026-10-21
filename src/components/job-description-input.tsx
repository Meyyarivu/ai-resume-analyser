"use client";

import { Briefcase, Check, Sparkles, Trash2 } from "lucide-react";
import { SAMPLE_JOB_DESCRIPTIONS } from "@/lib/sample-data";

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (val: string) => void;
  isInvalid?: boolean;
}

export function JobDescriptionInput({ jobDescription, setJobDescription, isInvalid = false }: JobDescriptionInputProps) {
  const wordCount = jobDescription.trim().split(/\s+/).filter(Boolean).length;
  const meetsMinimum = jobDescription.trim().length >= 30;

  return (
    <section className="surface-card interactive-surface flex h-full flex-col p-5 sm:p-6" aria-labelledby="job-description-heading">
      <div className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-neutral-700"><Briefcase className="h-4 w-4" aria-hidden="true" /></span>
          <div>
            <h2 id="job-description-heading" className="text-sm font-semibold text-neutral-900">Target job description</h2>
            <p className="mt-0.5 text-xs text-neutral-500">Step 2 · Required for comparison</p>
          </div>
        </div>
        {jobDescription && <button type="button" onClick={() => setJobDescription("")} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100" aria-label="Clear job description"><Trash2 className="h-3.5 w-3.5" aria-hidden="true" /><span>Clear</span></button>}
      </div>

      <div className="mt-5 flex-1">
        <label htmlFor="job-description" className="mb-2 block text-sm font-medium text-neutral-800">Paste the role details</label>
        <textarea id="job-description" rows={9} maxLength={30000} value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} placeholder="Paste the job description, responsibilities, and qualifications…" aria-invalid={isInvalid} aria-describedby="job-description-count job-description-invalid" className="field-control w-full resize-y p-3.5 text-sm leading-6" />
        <div id="job-description-count" className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-neutral-500 tabular-nums">{wordCount} words · {jobDescription.length.toLocaleString()} / 30,000 characters</span>
          <span className={meetsMinimum ? "inline-flex items-center gap-1 font-medium text-green-800" : "text-neutral-500"}>
            {meetsMinimum ? <><Check className="h-3.5 w-3.5" aria-hidden="true" />Ready to compare</> : "At least 30 characters"}
          </span>
        </div>
        {isInvalid && <p id="job-description-invalid" className="mt-2 text-xs font-medium text-red-800">Enter at least 30 characters, up to 30,000, to compare the role.</p>}
      </div>

      <div className="mt-5 border-t border-neutral-100 pt-4">
        <p className="text-xs font-medium text-neutral-600">Try a sample job description</p>
        <div className="mt-2 flex flex-wrap gap-2">{SAMPLE_JOB_DESCRIPTIONS.map((sample) => <button key={sample.title} type="button" onClick={() => setJobDescription(sample.text)} className="inline-flex min-h-10 max-w-full items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 text-left text-xs font-medium text-neutral-700 transition hover:bg-neutral-50"><Sparkles className="h-3 w-3 shrink-0 text-neutral-500" aria-hidden="true" /><span className="truncate">{sample.title}</span></button>)}</div>
      </div>
    </section>
  );
}
