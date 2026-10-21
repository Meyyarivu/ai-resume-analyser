import { CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

export function StrengthsWeaknesses({
  strengths,
  weaknesses,
}: StrengthsWeaknessesProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {/* Strengths Card */}
      <section className="surface-card p-5 sm:p-6">
        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 dark:border-neutral-800">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Core Strengths & Highlights
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Areas where your profile strongly resonates with the role requirements.
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-3">
          {strengths.length === 0 && <li className="text-sm text-neutral-600">No strengths were returned for this analysis.</li>}
          {strengths.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Weaknesses / Opportunities Card */}
      <section className="surface-card p-5 sm:p-6">
        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 dark:border-neutral-800">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Areas for Improvement & Risks
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Gaps, ambiguous bullet points, or under-specified competencies.
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-3">
          {weaknesses.length === 0 && <li className="text-sm text-neutral-600">No areas for improvement were returned for this analysis.</li>}
          {weaknesses.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300"
            >
              <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
