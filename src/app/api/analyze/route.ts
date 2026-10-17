import { NextRequest, NextResponse } from "next/server";
import { analyzeRequestSchema } from "@/lib/validation";
import { analyzeResumeWithGroq, GroqApiError } from "@/lib/groq";

export const maxDuration = 60; // 60s timeout for complex AI generation

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    // Validate request schema with Zod
    const validation = analyzeRequestSchema.safeParse(rawBody);
    if (!validation.success) {
      const errorDetails = validation.error.issues
        .map((issue) => issue.message)
        .join("; ");
      return NextResponse.json(
        {
          success: false,
          error: `Invalid input: ${errorDetails}`,
        },
        { status: 400 }
      );
    }

    const { resumeText, jobDescription, userApiKey } = validation.data;

    // Execute server-side AI analysis via Groq SDK
    const { result, modelUsed, isDemo } = await analyzeResumeWithGroq({
      resumeText,
      jobDescription,
      customApiKey: userApiKey,
    });

    return NextResponse.json({
      success: true,
      data: result,
      modelUsed,
      isDemo,
    });
  } catch (err: unknown) {
    if (err instanceof GroqApiError) {
      return NextResponse.json(
        {
          success: false,
          error: err.message,
        },
        { status: err.statusCode }
      );
    }

    const message =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred during resume analysis.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
