export type ImportanceLevel = "high" | "medium" | "low";

export interface MissingKeyword {
  keyword: string;
  importance: ImportanceLevel;
  context: string;
}

export interface ActionableSuggestion {
  category: string;
  impact: ImportanceLevel;
  suggestion: string;
  exampleBeforeAfter?: {
    before: string;
    after: string;
  };
}

export interface ProfessionalSummaryReview {
  currentAssessment: string;
  improvedVersion: string;
  keyChangesMade: string[];
}

export interface SectionScores {
  impactAndMetrics: number; // 0-100
  formattingAndClarity: number; // 0-100
  keywordOptimization: number; // 0-100
  brevityAndRelevance: number; // 0-100
}

export interface SkillsIdentified {
  technical: string[];
  soft: string[];
  toolsAndFrameworks: string[];
}

export interface AnalysisResult {
  candidateName?: string;
  targetRole?: string;
  atsCompatibilityScore: number; // 0-100
  overallScore: number; // 0-100
  skillMatchPercentage: number; // 0-100
  experienceRelevanceScore: number; // 0-100
  resumeSummary: string;
  skillsIdentified: SkillsIdentified;
  matchedKeywords: string[];
  missingKeywords: MissingKeyword[];
  strengths: string[];
  weaknesses: string[];
  actionableSuggestions: ActionableSuggestion[];
  professionalSummaryReview: ProfessionalSummaryReview;
  sectionScores: SectionScores;
  analyzedAt: string;
}

export interface AnalyzeSuccessResponse {
  success: true;
  data: AnalysisResult;
  modelUsed: string;
  isDemo?: boolean;
}

export interface AnalyzeErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

export type AnalyzeApiResponse = AnalyzeSuccessResponse | AnalyzeErrorResponse;
