import React from "react";
import Link from "next/link";
import { DashedGridBackground } from "@/components/aceternity/DashedGridBackground";
import { ArrowLeft, Briefcase, Mail, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#040405] text-zinc-100 flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-zinc-700 selection:text-white">
      <DashedGridBackground />

      {/* Main framed container */}
      <div className="relative w-full max-w-xl mx-auto border border-white/[0.12] bg-[#070709]/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl z-10">
        {/* Decorative corner markers */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-white/50 pointer-events-none" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-white/50 pointer-events-none" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-white/50 pointer-events-none" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-white/50 pointer-events-none" />

        {/* Top system status header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400/90 animate-pulse" />
            <span className="text-zinc-400">STATUS // 404</span>
          </div>
          <span className="text-zinc-500">NULL_POINTER_EXCEPTION</span>
        </div>

        {/* Content */}
        <div className="py-8 space-y-4 text-center sm:text-left">
          <div className="inline-block px-2.5 py-1 text-[11px] font-mono border border-white/15 bg-white/[0.02] text-zinc-300">
            Route Resolution Failure
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Lost in execution context.
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
            The target URL you requested cannot be located in the current workspace or has been refactored into a separate branch.
          </p>

          {/* Diagnostic Box */}
          <div className="p-3.5 bg-black/60 border border-white/[0.08] font-mono text-[11px] text-zinc-400 space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-500">ERROR_CODE:</span>
              <span className="text-white">ERR_PAGE_NOT_FOUND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">ENVIRONMENT:</span>
              <span className="text-zinc-300">Production // Dark Mode</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center gap-2.5">
          <Link
            href="/"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono text-black bg-white hover:bg-zinc-200 transition-colors shadow-sm font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Portfolio</span>
          </Link>

          <Link
            href="/#work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/20 transition-colors"
          >
            <Briefcase className="h-3.5 w-3.5 text-zinc-400" />
            <span>Featured Work</span>
          </Link>

          <Link
            href="/#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/20 transition-colors"
          >
            <Mail className="h-3.5 w-3.5 text-zinc-400" />
            <span>Contact</span>
          </Link>
        </div>
      </div>

      {/* Subtle branding footer */}
      <div className="mt-8 text-center text-xs font-mono text-zinc-600 flex items-center gap-2 z-10">
        <Compass className="h-3.5 w-3.5" />
        <span>Sachin Singh Patwal — Minimal Dark Architecture</span>
      </div>
    </main>
  );
}
