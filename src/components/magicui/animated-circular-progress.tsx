"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NumberTicker } from "./number-ticker";

interface AnimatedCircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
  subLabel?: string;
}

export function AnimatedCircularProgress({
  value,
  max = 100,
  size = 140,
  strokeWidth = 12,
  className,
  label,
  subLabel,
}: AnimatedCircularProgressProps) {
  const uniqueId = useId();
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color scheme based on score
  const getGradientColors = () => {
    if (value >= 80) return { start: "#10b981", end: "#059669", ring: "text-emerald-500" };
    if (value >= 65) return { start: "#3b82f6", end: "#6366f1", ring: "text-indigo-500" };
    if (value >= 50) return { start: "#f59e0b", end: "#d97706", ring: "text-amber-500" };
    return { start: "#ef4444", end: "#dc2626", ring: "text-rose-500" };
  };

  const { start, end } = getGradientColors();
  const gradientId = `score-grad-${value}-${uniqueId.replace(/:/g, "")}`;

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg] transform"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={start} />
            <stop offset="100%" stopColor={end} />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-neutral-200/80 dark:text-neutral-800/80"
        />

        {/* Animated Progress Ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </svg>

      {/* Center Score Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="flex items-baseline">
          <NumberTicker
            value={value}
            className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl"
          />
          <span className="ml-0.5 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            /{max}
          </span>
        </div>
        {label && (
          <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
            {label}
          </span>
        )}
      </div>

      {subLabel && (
        <span className="mt-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
          {subLabel}
        </span>
      )}
    </div>
  );
}
