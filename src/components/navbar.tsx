"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, KeyRound, Sparkles, X } from "lucide-react";

interface NavbarProps {
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
  isDemo?: boolean;
}

export function Navbar({ customApiKey, setCustomApiKey, isDemo = false }: NavbarProps) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState(customApiKey);
  const [keySaved, setKeySaved] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!showKeyModal) {
      if (wasOpenRef.current) triggerRef.current?.focus();
      wasOpenRef.current = false;
      return;
    }
    wasOpenRef.current = true;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowKeyModal(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href]'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showKeyModal]);

  const closeDialog = () => setShowKeyModal(false);
  const saveKey = () => {
    setCustomApiKey(inputKey.trim());
    setKeySaved(true);
    window.setTimeout(() => {
      setKeySaved(false);
      closeDialog();
    }, 700);
  };

  return (
    <>
      <header className="glass-surface sticky top-3 z-40 mx-4 mt-3 rounded-2xl sm:mx-6 lg:mx-auto lg:max-w-[1200px]">
        <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#main-content" className="flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-offset-2" aria-label="ATS Pulse home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold tracking-[-.03em] text-neutral-900">ATS Pulse</span>
              <span className="hidden text-[11px] text-neutral-500 sm:block">Resume analysis, made clear</span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            {isDemo && <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">Sample data</span>}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => { setInputKey(customApiKey); setShowKeyModal(true); }}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white/80 px-3 text-xs font-medium text-neutral-700 transition hover:bg-white hover:shadow-sm active:scale-[.98] sm:px-4"
              aria-haspopup="dialog"
            >
              <KeyRound className="h-4 w-4 text-neutral-500" aria-hidden="true" />
              <span>{customApiKey ? "Key configured" : "Groq API key"}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showKeyModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/35 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) closeDialog(); }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog" aria-modal="true" aria-labelledby="api-key-title" aria-describedby="api-key-description"
              className="w-full max-w-md rounded-[22px] border border-neutral-200 bg-white p-6 shadow-[0_18px_48px_rgba(0,0,0,.14)]"
              initial={{ opacity: 0, y: 10, scale: .99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: .99 }}
              transition={{ duration: .2, ease: [.2, .8, .2, 1] }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="api-key-title" className="text-lg font-semibold tracking-tight text-neutral-900">Groq API key</h2>
                  <p id="api-key-description" className="mt-1 text-sm leading-6 text-neutral-600">
                    The app uses <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">GROQ_API_KEY</code> from the server by default. You can enter a temporary key for this tab; it is sent to the analysis route only when you run an analysis and is not saved.
                  </p>
                </div>
                <button type="button" onClick={closeDialog} aria-label="Close API key dialog" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900">
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <label htmlFor="groq-key" className="mt-5 block text-sm font-medium text-neutral-800">Temporary key</label>
              <input ref={inputRef} id="groq-key" type="password" autoComplete="off" value={inputKey} onChange={(event) => setInputKey(event.target.value)} placeholder="gsk_…" className="field-control mt-2 min-h-11 w-full px-3.5 text-sm" />
              <p className="mt-2 text-xs leading-5 text-neutral-500">Leave this blank to use the server-configured key. The key stays in memory for this tab.</p>

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => { setInputKey(""); setCustomApiKey(""); closeDialog(); }} className="min-h-11 rounded-xl px-4 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100">Clear key</button>
                <button type="button" onClick={saveKey} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-medium text-white transition hover:bg-[var(--accent-hover)] active:scale-[.98]">
                  {keySaved ? <><Check className="h-4 w-4" aria-hidden="true" />Saved</> : "Apply key"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
