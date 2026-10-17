import { extractText } from "unpdf";

export const MAX_PDF_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface PdfExtractionResult {
  text: string;
  pageCount: number;
  wordCount: number;
}

/**
 * Validates that the buffer has the standard PDF header magic bytes "%PDF-"
 */
export function isValidPdfBuffer(buffer: Uint8Array): boolean {
  if (buffer.length < 5) return false;
  // %PDF- in ASCII: 0x25, 0x50, 0x44, 0x46, 0x2D
  return (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    buffer[4] === 0x2d
  );
}

/**
 * Extracts and sanitizes text from a PDF buffer securely on the server.
 */
export async function extractPdfText(
  buffer: ArrayBuffer | Uint8Array
): Promise<PdfExtractionResult> {
  const uint8 = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

  if (!isValidPdfBuffer(uint8)) {
    throw new Error(
      "The uploaded file is not a valid PDF document (missing PDF signature)."
    );
  }

  if (uint8.length > MAX_PDF_SIZE_BYTES) {
    throw new Error(
      `PDF file exceeds the maximum allowed size of ${MAX_PDF_SIZE_BYTES / (1024 * 1024)}MB.`
    );
  }

  try {
    const { text, totalPages } = await extractText(uint8, { mergePages: true });

    // Clean up null bytes, excessive spaces, and carriage returns
    const sanitizedText = text
      .replace(/\0/g, "")
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (!sanitizedText || sanitizedText.length < 40) {
      throw new Error(
        "Could not extract sufficient text from the PDF. It may be an image-only/scanned document. Please upload a PDF generated with selectable text."
      );
    }

    const wordCount = sanitizedText.split(/\s+/).filter(Boolean).length;

    return {
      text: sanitizedText,
      pageCount: totalPages,
      wordCount,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Failed to process the PDF document.");
  }
}
