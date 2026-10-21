"use client";

import React, { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Eye, EyeOff, FileText, Sparkles, Trash2, Upload } from "lucide-react";
import { formatFileSize, cn } from "@/lib/utils";
import { SAMPLE_RESUMES } from "@/lib/sample-data";

interface FileUploaderProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
  isExtracting: boolean;
  setIsExtracting: (val: boolean) => void;
  isInvalid?: boolean;
}

export function FileUploader({ resumeText, setResumeText, fileName, setFileName, isExtracting, setIsExtracting, isInvalid = false }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{ size?: number; pages?: number; words?: number } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxFileBytes = 5 * 1024 * 1024;

  const handleFileProcess = async (file: File) => {
    setErrorMessage(null);
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setErrorMessage("Please choose a PDF document (.pdf).");
      return;
    }
    if (file.size > maxFileBytes) {
      setErrorMessage("This file is larger than 5 MB. Please choose a smaller PDF.");
      return;
    }

    setIsExtracting(true);
    setFileName(file.name);
    setFileMeta({ size: file.size });
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/extract-pdf", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Could not extract text from this PDF.");
      setResumeText(data.text);
      setFileMeta({ size: data.fileSize || file.size, pages: data.pageCount, words: data.wordCount });
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "Could not read this PDF. Please try another file.");
      setResumeText("");
      setFileName("");
      setFileMeta(null);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSampleResume = (index: number) => {
    const sample = SAMPLE_RESUMES[index];
    setFileName(`${sample.title} — sample`);
    setResumeText(sample.text);
    setFileMeta({ words: sample.text.split(/\s+/).length });
    setErrorMessage(null);
  };

  const handleClear = () => {
    setResumeText("");
    setFileName("");
    setFileMeta(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openFilePicker = () => fileInputRef.current?.click();

  return (
    <section className="surface-card interactive-surface flex h-full flex-col p-5 sm:p-6" aria-labelledby="resume-heading">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-neutral-700"><FileText className="h-4 w-4" aria-hidden="true" /></span>
          <div>
            <h2 id="resume-heading" className="text-sm font-semibold text-neutral-900">Your resume</h2>
            <p className="mt-0.5 text-xs text-neutral-500">Step 1 · PDF or plain text</p>
          </div>
        </div>
        <div role="tablist" aria-label="Resume input method" className="flex rounded-xl bg-[var(--surface-secondary)] p-1">
          {([ ["upload", "Upload PDF"], ["paste", "Paste text"] ] as const).map(([tab, label]) => (
            <button id={`resume-tab-${tab}`} key={tab} type="button" role="tab" aria-selected={activeTab === tab} aria-controls="resume-input-panel" onClick={() => setActiveTab(tab)} className={cn("min-h-10 rounded-lg px-3 text-xs font-medium transition", activeTab === tab ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-600 hover:text-neutral-900")}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div id="resume-input-panel" role="tabpanel" aria-labelledby={`resume-tab-${activeTab}`} className="mt-5 flex-1">
        {activeTab === "upload" ? (
          <div>
            {!resumeText && !isExtracting ? (
              <div onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(event) => { event.preventDefault(); setIsDragging(false); const file = event.dataTransfer.files?.[0]; if (file) void handleFileProcess(file); }} className={cn("flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center transition-colors", isDragging ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--border-strong)] bg-[#fbfbfa] hover:border-neutral-400")}>
                <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" className="sr-only" aria-label="Choose resume PDF" onChange={(event) => { const file = event.target.files?.[0]; if (file) void handleFileProcess(file); }} />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 shadow-sm"><Upload className="h-5 w-5" aria-hidden="true" /></span>
                <p className="mt-4 text-sm font-semibold text-neutral-900">Drop your PDF here</p>
                <p id="resume-upload-hint" className="mt-1 text-xs text-neutral-500">Text-based PDF · Up to 5 MB</p>
                <button type="button" onClick={openFilePicker} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-50 active:scale-[.98]">Choose PDF</button>
              </div>
            ) : isExtracting ? (
              <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-[#fbfbfa] p-6 text-center" role="status" aria-live="polite">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent motion-reduce:animate-none" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium text-neutral-800">Reading your PDF</p>
                <p className="mt-1 text-xs text-neutral-500">Extracting selectable text securely on the server.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-green-200 bg-[var(--success-soft)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--success)]"><CheckCircle2 className="h-5 w-5" aria-hidden="true" /></span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-neutral-900">{fileName || "Resume ready"}</p>
                      <p className="mt-1 text-xs text-neutral-600">{fileMeta?.size ? formatFileSize(fileMeta.size) : "Sample resume"}{fileMeta?.words ? ` · ${fileMeta.words} words` : ""}{fileMeta?.pages ? ` · ${fileMeta.pages} ${fileMeta.pages === 1 ? "page" : "pages"}` : ""}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button type="button" onClick={() => setShowPreview((value) => !value)} aria-label={showPreview ? "Hide extracted resume text" : "Preview extracted resume text"} className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 hover:bg-white"><span className="sr-only">{showPreview ? "Hide text" : "Preview text"}</span>{showPreview ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}</button>
                    <button type="button" onClick={handleClear} aria-label="Remove resume" className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 hover:bg-white hover:text-[var(--danger)]"><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
                  </div>
                </div>
                {showPreview && <pre className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-neutral-200 bg-white p-3 text-xs leading-5 text-neutral-700">{resumeText}</pre>}
              </div>
            )}
          </div>
        ) : (
          <div>
            <label htmlFor="resume-text" className="mb-2 block text-sm font-medium text-neutral-800">Paste resume text</label>
            <textarea id="resume-text" rows={8} maxLength={50000} value={resumeText} onChange={(event) => { setResumeText(event.target.value); setFileName(event.target.value ? "Pasted resume text" : ""); setFileMeta(null); }} placeholder="Paste your resume text here…" aria-invalid={isInvalid} aria-describedby="resume-text-count resume-invalid" className="field-control w-full resize-y p-3.5 text-sm leading-6" />
            <div id="resume-text-count" className="mt-2 flex justify-between gap-3 text-xs text-neutral-500"><span>At least 50 characters, up to 50,000.</span><span className="tabular-nums">{resumeText.length.toLocaleString()} / 50,000</span></div>
          </div>
        )}
        {isInvalid && <p id="resume-invalid" className="mt-2 text-xs font-medium text-red-800">Add 50–50,000 characters of resume text to continue.</p>}
        {errorMessage && <p role="alert" className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-[var(--danger-soft)] p-3 text-sm leading-5 text-red-800"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{errorMessage}</p>}
      </div>

      <div className="mt-5 border-t border-neutral-100 pt-4">
        <p className="text-xs font-medium text-neutral-600">Try a clearly labeled sample</p>
        <div className="mt-2 flex flex-wrap gap-2">{SAMPLE_RESUMES.map((sample, index) => <button key={sample.title} type="button" onClick={() => handleSampleResume(index)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50"><Sparkles className="h-3 w-3 text-neutral-500" aria-hidden="true" />{sample.role}</button>)}</div>
      </div>
    </section>
  );
}
