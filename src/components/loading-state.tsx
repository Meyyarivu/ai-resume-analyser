"use client";

import { LoaderCircle, Sparkles } from "lucide-react";

export function LoadingState() {
  return (
    <section className="surface-card mx-auto my-10 max-w-xl px-6 py-10 text-center sm:px-10" aria-labelledby="analysis-loading-title" aria-live="polite" aria-busy="true">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      </div>
      <h2 id="analysis-loading-title" className="mt-5 text-lg font-semibold tracking-tight text-neutral-900">Reviewing your resume</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-600">Comparing your resume with the job description and preparing your feedback.</p>
      <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
        <LoaderCircle className="h-4 w-4 animate-spin text-[var(--accent)] motion-reduce:animate-none" aria-hidden="true" />
        Analysis in progress
      </div>
    </section>
  );
}
