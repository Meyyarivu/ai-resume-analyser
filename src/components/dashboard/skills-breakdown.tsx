import { Code2, HeartHandshake, Wrench } from "lucide-react";
import { SkillsIdentified } from "@/types/analyzer";

interface SkillsBreakdownProps {
  skills: SkillsIdentified;
}

export function SkillsBreakdown({ skills }: SkillsBreakdownProps) {
  return (
    <section className="surface-card p-5 sm:p-6">
      <div className="border-b border-neutral-100 pb-3 dark:border-neutral-800">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white">
          Extracted Competencies & Skill Matrix
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Identified skills parsed directly from your curriculum vitae and categorized by domain.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Technical Hard Skills */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Code2 className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Technical & Core ({skills.technical.length})
            </h4>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.technical.length === 0 && <span className="text-sm text-neutral-500">No skills returned.</span>}
            {skills.technical.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-neutral-200 bg-neutral-50/80 px-2 py-0.5 text-xs text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-neutral-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tools and Frameworks */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Wrench className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Tools, Cloud & DevOps ({skills.toolsAndFrameworks.length})
            </h4>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.toolsAndFrameworks.length === 0 && <span className="text-sm text-neutral-500">No tools returned.</span>}
            {skills.toolsAndFrameworks.map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-neutral-200 bg-neutral-50/80 px-2 py-0.5 text-xs text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-neutral-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <HeartHandshake className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Soft Skills & Leadership ({skills.soft.length})
            </h4>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.soft.length === 0 && <span className="text-sm text-neutral-500">No soft skills returned.</span>}
            {skills.soft.map((softSkill) => (
              <span
                key={softSkill}
                className="rounded-md border border-neutral-200 bg-neutral-50/80 px-2 py-0.5 text-xs text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-neutral-200"
              >
                {softSkill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
