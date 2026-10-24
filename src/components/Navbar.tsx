"use client";

import React from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Search, Command } from "lucide-react";

export function Navbar() {
  const { toggleCommand } = usePortfolioStore();

  return (
    <header className="fixed w-full z-30 bg-black/85 backdrop-blur-md border-b border-white/20">
      <div className="relative max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="absolute left-0 top-0 bottom-0 dashed-line-v pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 dashed-line-v pointer-events-none" />

        <button
          type="button"
          onClick={toggleCommand}
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-between gap-3 w-64 md:w-80 px-3 py-1.5 rounded-lg border border-white/70 hover:border-white/90 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-white transition-all shadow-sm group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-white group-hover:text-white transition-colors" />
            <span className="text-[12px] text-zinc-100 group-hover:text-white transition-colors">
              Search commands or projects
            </span>
          </div>
          <kbd className="grid grid-flow-col gap-1 items-center p-1 rounded-sm border border-white/40 bg-white/[0.06] text-white">
            <Command className="size-3.25 text-white" /> 
            <span>K</span>
          </kbd>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full dashed-line-h pointer-events-none" />
    </header>
  );
}
