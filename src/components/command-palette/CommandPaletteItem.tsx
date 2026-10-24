"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { CommandAction } from "./types";

export function CommandPaletteItem({ item }: { item: CommandAction }) {
  const Icon = item.icon;

  return (
    <button
      onClick={item.action}
      className="w-full flex items-center justify-between px-3 py-2.5 text-left text-xs text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors group cursor-pointer"
    >
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-zinc-500 group-hover:text-zinc-200" />
        <span>{item.label}</span>
      </div>
      <ArrowRight className="h-3 w-3 text-zinc-600 group-hover:text-zinc-300 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
