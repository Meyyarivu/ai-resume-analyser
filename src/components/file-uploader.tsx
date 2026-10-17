"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  Sparkles,
} from "lucide-react";
import { formatFileSize, cn } from "@/lib/utils";
import { SAMPLE_RESUMES } from "@/lib/sample-data";

interface FileUploaderProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
  isExtracting: boolean;
  setIsExtracting: (val: boolean) => void;
}

export function FileUploader({
  resumeText,
  setResumeText,
  fileName,
  setFileName,
  isExtracting,
  setIsExtracting,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{
    size: number;
    pages?: number;
    words?: number;
  } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    setErrorMessage(null);

    // Validation
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setErrorMessage("Please upload a valid PDF document (.pdf format).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File exceeds 5MB size limit. Please upload a smaller PDF.");
      return;
    }

    setIsExtracting(true);
    setFileName(file.name);
    setFileMeta({ size: file.size });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to extract text from PDF.");
      }

      setResumeText(data.text);
      setFileMeta({
        size: data.fileSize || file.size,
        pages: data.pageCount,
        words: data.wordCount,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error parsing PDF.";
      setErrorMessage(msg);
      setResumeText("");
    } finally {
      setIsExtracting(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSampleResume = (index: number) => {
    const sample = SAMPLE_RESUMES[index];
    setFileName(sample.title + ".pdf");
    setResumeText(sample.text);
    setFileMeta({
      size: 42000,
      pages: 1,
      words: sample.text.split(/\s+/).length,
    });
    setErrorMessage(null);
  };

  const handleClear = () => {
    setResumeText("");
    setFileName("");
    setFileMeta(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="glass-surface premium-card flex h-full flex-col rounded-[26px] p-5 sm:p-6">
      {/* Card Header & Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
              1. Your Resume
            </h2>
          </div>
        </div>

        {/* Tab switch: Upload PDF vs Paste */}
        <div className="flex rounded-lg bg-neutral-100 p-0.5 dark:bg-neutral-800">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition",
              activeTab === "upload"
                ? "bg-white text-neutral-900 shadow-xs dark:bg-neutral-950 dark:text-white"
                : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            )}
          >
            Upload PDF
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("paste")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition",
              activeTab === "paste"
                ? "bg-white text-neutral-900 shadow-xs dark:bg-neutral-950 dark:text-white"
                : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            )}
          >
            Paste Text
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-4 flex-1">
        {activeTab === "upload" ? (
          <div>
            {!resumeText && !isExtracting ? (
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center transition-all duration-300",
                  isDragging
                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30"
                    : "border-neutral-300 bg-neutral-50/50 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-950/40 dark:hover:border-neutral-600"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xs dark:bg-neutral-800">
                  <Upload className="h-6 w-6 text-neutral-600 dark:text-neutral-300" />
                </div>
                <p className="mt-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Drop your resume PDF here, or{" "}
                  <span className="text-indigo-600 dark:text-indigo-400">browse</span>
                </p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Supports standard text-based PDFs up to 5 MB
                </p>
              </div>
            ) : isExtracting ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50/60 p-8 dark:border-neutral-800 dark:bg-neutral-950/50">
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent dark:border-indigo-400" />
                </div>
                <p className="mt-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  Extracting and parsing resume text securely...
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Validating PDF structure and character tokens
                </p>
              </div>
            ) : (
              /* Uploaded & Parsed File Card */
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/20 p-4 transition dark:border-emerald-500/20 dark:bg-emerald-950/20">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 line-clamp-1 dark:text-white">
                        {fileName || "Resume uploaded"}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {fileMeta?.size ? formatFileSize(fileMeta.size) : "Ready"} •{" "}
                        {fileMeta?.words ? `${fileMeta.words} words` : "Parsed"}
                        {fileMeta?.pages ? ` • ${fileMeta.pages} page(s)` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      title={showPreview ? "Hide Preview" : "View Extracted Text"}
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                    >
                      {showPreview ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      title="Remove and upload different resume"
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-rose-100 hover:text-rose-600 dark:text-neutral-400 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {showPreview && (
                  <div className="mt-3 max-h-48 overflow-y-auto rounded-lg border border-neutral-200 bg-white p-3 font-mono text-[11px] leading-relaxed text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
                    {resumeText}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Paste Plain Text Area */
          <div>
            <textarea
              rows={7}
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                setFileName("Pasted Resume Text");
              }}
              placeholder="Paste your plain text resume or Markdown CV here..."
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50/70 p-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950/60 dark:text-white"
            />
            <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-500">
              <span>{resumeText.length} characters</span>
              {resumeText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-rose-500 hover:underline"
                >
                  Clear text
                </button>
              )}
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-50/50 p-3 text-xs text-rose-700 dark:border-rose-500/20 dark:bg-rose-950/30 dark:text-rose-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Quick Sample Selector */}
      <div className="mt-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
        <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
          Or load test resume:
        </span>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {SAMPLE_RESUMES.map((sample, idx) => (
            <button
              key={sample.title}
              type="button"
              onClick={() => handleSampleResume(idx)}
              className="flex items-center gap-1 rounded-md border border-neutral-200/80 bg-neutral-50 px-2 py-1 text-[11px] font-medium text-neutral-700 transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40"
            >
              <Sparkles className="h-3 w-3 text-indigo-500" />
              <span>{sample.role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
