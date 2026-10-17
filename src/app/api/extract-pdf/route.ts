import { NextRequest, NextResponse } from "next/server";
import { extractPdfText, MAX_PDF_SIZE_BYTES } from "@/lib/pdf";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, error: "No PDF file was provided in the upload." },
        { status: 400 }
      );
    }

    if (file.size > MAX_PDF_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is ${MAX_PDF_SIZE_BYTES / (1024 * 1024)}MB.`,
        },
        { status: 400 }
      );
    }

    // Check name extension
    const fileName = "name" in file ? (file as { name: string }).name : "uploaded.pdf";
    if (!fileName.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Please upload a standard .pdf document.",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const { text, pageCount, wordCount } = await extractPdfText(arrayBuffer);

    return NextResponse.json({
      success: true,
      text,
      pageCount,
      wordCount,
      fileName,
      fileSize: file.size,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to extract text from the PDF.";
    return NextResponse.json({ success: false, error: message }, { status: 422 });
  }
}
