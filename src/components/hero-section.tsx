import { Sparkles, ShieldCheck, Zap, Target, ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="animate-enter-soft relative mx-auto max-w-5xl px-2 pb-10 pt-14 text-center sm:pb-14 sm:pt-20">
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/70 px-3.5 py-1.5 text-[11px] font-medium text-neutral-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[.045] dark:text-neutral-300">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"><Sparkles className="h-3 w-3" /></span>
        <span>ATS intelligence, thoughtfully designed</span>
        <span className="ml-1 hidden items-center gap-1.5 border-l border-neutral-200 pl-2.5 text-neutral-400 dark:border-white/10 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Groq LPU</span>
      </div>

      <h1 className="mx-auto max-w-4xl text-[2.7rem] font-semibold leading-[1.02] tracking-[-.065em] text-neutral-950 sm:text-6xl lg:text-[5.1rem] dark:text-white">
        Make your next move <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">count.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base dark:text-neutral-400">
        See your resume through the eyes of an ATS. Find the gaps, sharpen your story, and move closer to the role you want.
      </p>

      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
        <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />Private by design</span>
        <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-500" />Fast, focused analysis</span>
        <span className="inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5 text-indigo-500" />Role-specific insights</span>
      </div>
      <div className="mt-9 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-neutral-400 dark:text-neutral-500"><span className="h-px w-7 bg-neutral-300 dark:bg-neutral-700" />Start with two documents<ArrowDown className="h-3 w-3" /><span className="h-px w-7 bg-neutral-300 dark:bg-neutral-700" /></div>
    </section>
  );
}
