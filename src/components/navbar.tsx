"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Sun, Moon, Key, Check, Info, X } from "lucide-react";
import { useTheme } from "./theme-provider";

interface NavbarProps {
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
  isDemo?: boolean;
}

export function Navbar({
  customApiKey,
  setCustomApiKey,
  isDemo = false,
}: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState(customApiKey);
  const [keySaved, setKeySaved] = useState(false);

  const handleSaveKey = () => {
    setCustomApiKey(inputKey.trim());
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowKeyModal(false);
    }, 1200);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200/60 bg-white/70 backdrop-blur-2xl transition-colors duration-300 dark:border-white/[.08] dark:bg-black/65">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-[13px] bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-600 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/30">
              <Sparkles className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold tracking-[-.04em] text-neutral-900 dark:text-neutral-50">
                  ATS Pulse
                </span>
                <span className="hidden rounded-full border border-indigo-500/30 bg-indigo-50/50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-950/50 dark:text-indigo-300 sm:inline-block">
                  Groq LPU Engine
                </span>
              </div>
              <span className="hidden text-[11px] text-neutral-500 dark:text-neutral-400 sm:block">
                Precision AI Resume & ATS Match Engine
              </span>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status / Demo Indicator */}
            {isDemo && (
              <span className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                Demo Mode
              </span>
            )}

            {/* Custom API Key Button */}
            <button
              onClick={() => {
                setInputKey(customApiKey);
                setShowKeyModal(true);
              }}
              title="Configure Groq API Key"
              className="flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-white/65 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[.05] dark:text-neutral-300 dark:hover:bg-white/10"
            >
              <Key className="h-3.5 w-3.5 text-neutral-500" />
              <span className="hidden sm:inline">
                {customApiKey ? "Custom Key Active" : "Set Groq Key"}
              </span>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-white/65 text-neutral-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[.05] dark:text-neutral-300 dark:hover:bg-white/10"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-neutral-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Groq API Key Modal */}
      <AnimatePresence>
      {showKeyModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setShowKeyModal(false); }} className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/35 p-4 backdrop-blur-md dark:bg-black/60">
          <motion.div role="dialog" aria-modal="true" aria-labelledby="api-key-title" initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .98 }} transition={{ type: "spring", stiffness: 300, damping: 28 }} className="glass-surface w-full max-w-md rounded-[26px] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-950/60">
                  <Key className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 id="api-key-title" className="font-semibold text-neutral-900 dark:text-white">
                  Groq API Key (Optional)
                </h3>
              </div>
              <button aria-label="Close dialog"
                onClick={() => setShowKeyModal(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              By default, ATS Pulse reads <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-[11px] dark:bg-neutral-800">GROQ_API_KEY</code> from your server environment or <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-[11px] dark:bg-neutral-800">.env.local</code>.
              You can also paste a temporary key here for direct browser-initiated sessions. Keys are stored only in memory for this session.
            </p>

            <div className="mt-4">
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
              />
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-lg bg-blue-50/70 p-2.5 text-[11px] text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                Don&apos;t have a key? Get one free in 30 seconds at{" "}
                <a
                  href="https://console.groq.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-semibold"
                >
                  console.groq.com
                </a>
                . Or test immediately using the built-in demo mode!
              </span>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  setInputKey("");
                  setCustomApiKey("");
                  setShowKeyModal(false);
                }}
                className="rounded-lg px-3 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                Clear
              </button>
              <button
                onClick={handleSaveKey}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
              >
                {keySaved ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Saved
                  </>
                ) : (
                  "Apply Key"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
