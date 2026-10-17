import { z } from "zod";

// Zod schema for validating the incoming analysis request (raw text or PDF text)
export const analyzeRequestSchema = z.object({
  resumeText: z
    .string()
    .min(50, { message: "Resume text must be at least 50 characters." })
    .max(50000, { message: "Resume text cannot exceed 50,000 characters." }),
  jobDescription: z
    .string()
    .min(30, { message: "Job description must be at least 30 characters." })
    .max(30000, { message: "Job description cannot exceed 30,000 characters." }),
  userApiKey: z.string().optional(),
});

// Zod schema for validating the structured JSON returned by Groq
export const groqAnalysisSchema = z.object({
  candidateName: z.string().optional().default("Candidate"),
  targetRole: z.string().optional().default("Target Role"),
  atsCompatibilityScore: z.number().min(0).max(100),
  overallScore: z.number().min(0).max(100),
  skillMatchPercentage: z.number().min(0).max(100),
  experienceRelevanceScore: z.number().min(0).max(100),
  resumeSummary: z.string(),
  skillsIdentified: z.object({
    technical: z.array(z.string()).default([]),
    soft: z.array(z.string()).default([]),
    toolsAndFrameworks: z.array(z.string()).default([]),
  }),
  matchedKeywords: z.array(z.string()).default([]),
  missingKeywords: z.array(
    z.object({
      keyword: z.string(),
      importance: z.enum(["high", "medium", "low"]).default("medium"),
      context: z.string(),
    })
  ).default([]),
  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(z.string()).default([]),
  actionableSuggestions: z.array(
    z.object({
      category: z.string(),
      impact: z.enum(["high", "medium", "low"]).default("medium"),
      suggestion: z.string(),
      exampleBeforeAfter: z
        .object({
          before: z.string(),
          after: z.string(),
        })
        .optional(),
    })
  ).default([]),
  professionalSummaryReview: z.object({
    currentAssessment: z.string(),
    improvedVersion: z.string(),
    keyChangesMade: z.array(z.string()).default([]),
  }),
  sectionScores: z.object({
    impactAndMetrics: z.number().min(0).max(100).default(70),
    formattingAndClarity: z.number().min(0).max(100).default(75),
    keywordOptimization: z.number().min(0).max(100).default(65),
    brevityAndRelevance: z.number().min(0).max(100).default(80),
  }),
});

export type GroqAnalysisOutput = z.infer<typeof groqAnalysisSchema>;
