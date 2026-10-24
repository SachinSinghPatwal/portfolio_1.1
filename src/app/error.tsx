"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { DashedGridBackground } from "@/components/aceternity/DashedGridBackground";
import { RotateCw, Home, AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception to diagnostic console
    console.error("Runtime exception captured:", error);
  }, [error]);

  return (
    <main className="relative min-h-screen bg-[#040405] text-zinc-100 flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-zinc-700 selection:text-white">
      <DashedGridBackground />

      {/* Main framed container */}
      <div className="relative w-full max-w-xl mx-auto border border-rose-500/30 bg-[#070709]/95 backdrop-blur-xl p-6 sm:p-10 shadow-2xl z-10">
        {/* Decorative corner markers */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-rose-500/60 pointer-events-none" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-rose-500/60 pointer-events-none" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-rose-500/60 pointer-events-none" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-rose-500/60 pointer-events-none" />

        {/* Top system status header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-rose-400 font-semibold">ERROR // 500</span>
          </div>
          <span className="text-zinc-500">RUNTIME_INTERRUPT</span>
        </div>

        {/* Content */}
        <div className="py-8 space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono border border-rose-500/20 bg-rose-500/10 text-rose-300">
            <AlertTriangle className="h-3 w-3" />
            <span>Uncaught Process Exception</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Something went wrong.
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
            An unexpected error occurred during execution. The system has paused the thread to preserve data integrity.
          </p>

          {/* Diagnostic Box */}
          <div className="p-3.5 bg-black/70 border border-white/[0.08] font-mono text-[11px] text-zinc-400 space-y-1 text-left">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="text-zinc-500">DIGEST:</span>
              <span className="text-rose-300 truncate max-w-[240px]">
                {error.digest || "HASH_UNAVAILABLE"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">MESSAGE:</span>
              <span className="text-zinc-300 truncate max-w-[240px]">
                {error.message || "Unknown runtime disruption"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono text-black bg-white hover:bg-zinc-200 transition-colors shadow-sm font-semibold cursor-pointer"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span>Try Again / Reload</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/20 transition-colors"
          >
            <Home className="h-3.5 w-3.5 text-zinc-400" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
