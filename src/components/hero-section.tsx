import { Sparkles, ShieldCheck, FileSearch, ListChecks } from "lucide-react";

export function HeroSection() {
  return (
    <section id="top" className="relative mx-auto max-w-5xl px-2 pb-10 pt-14 text-center sm:pb-12 sm:pt-20">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-600 shadow-sm">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700"><Sparkles className="h-3 w-3" /></span>
        <span>AI resume analysis</span>
      </div>

      <h1 className="mx-auto max-w-4xl text-[2.65rem] font-semibold leading-[1.06] tracking-[-.055em] text-neutral-950 sm:text-6xl lg:text-[4.5rem]">
        Make your resume <span className="text-blue-700">work harder.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
        Compare your experience with a target role, uncover underrepresented keywords, and get practical suggestions to strengthen your application. Scores are estimates, not employer ATS results.
      </p>

      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200/80 bg-white/70 px-4 py-3">
          <FileSearch className="h-4 w-4 text-blue-700" aria-hidden="true" />
          <p className="mt-2 text-xs font-semibold text-neutral-800">Compare to the role</p>
          <p className="mt-1 text-xs leading-5 text-neutral-500">Review skills and keyword alignment.</p>
        </div>
        <div className="rounded-xl border border-neutral-200/80 bg-white/70 px-4 py-3">
          <ListChecks className="h-4 w-4 text-blue-700" aria-hidden="true" />
          <p className="mt-2 text-xs font-semibold text-neutral-800">Find practical next steps</p>
          <p className="mt-1 text-xs leading-5 text-neutral-500">See specific areas to improve.</p>
        </div>
        <div className="rounded-xl border border-neutral-200/80 bg-white/70 px-4 py-3">
          <ShieldCheck className="h-4 w-4 text-blue-700" aria-hidden="true" />
          <p className="mt-2 text-xs font-semibold text-neutral-800">Private by design</p>
          <p className="mt-1 text-xs leading-5 text-neutral-500">No account or resume history.</p>
        </div>
      </div>
      <p className="mt-8 text-xs font-medium text-neutral-500">Start by adding your resume and the job description below.</p>
    </section>
  );
}
