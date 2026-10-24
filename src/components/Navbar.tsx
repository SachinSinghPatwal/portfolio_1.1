"use client";

import React, { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Search, Command } from "lucide-react";

export function Navbar() {
  const { toggleCommand } = usePortfolioStore();
  const [isoTime, setIsoTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setIsoTime(`${formattedTime} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full z-30">
      <div className="relative max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <div className="absolute left-0 top-0 bottom-0 dashed-line-v pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 dashed-line-v pointer-events-none" />

        <button
          type="button"
          onClick={toggleCommand}
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-between gap-3 w-64 md:w-80 px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-white/[0.18] bg-white/[0.02] hover:bg-white/[0.05] text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-all shadow-sm group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <span className="text-[12px] text-zinc-500 group-hover:text-zinc-300 transition-colors">
              Search commands or projects
            </span>
          </div>
          <kbd className="grid grid-flow-col gap-1 items-center p-1 rounded-sm border border-white/[0.1] bg-white/[0.04] text-zinc-400">
            <Command className="size-3.25 text-zinc-400 " /> 
            <span>K</span>
          </kbd>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full dashed-line-h pointer-events-none" />
    </header>
  );
}
