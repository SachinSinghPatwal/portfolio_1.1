"use client";

import React from "react";
import { TechStackGroup } from "./tech-stack-data";

export function TechStackCard({ group }: { group: TechStackGroup }) {
  const Icon = group.icon;

  return (
    <div className="p-5 border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] transition-colors flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-semibold mb-4">
          <Icon className="h-3.5 w-3.5 text-zinc-500" />
          <span>{group.title}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {group.items.map((item) => (
            <span
              key={item}
              className="px-2 py-1 text-[11px] font-mono text-zinc-400 bg-white/[0.02] border border-white/[0.05] hover:text-white hover:border-white/[0.15] transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
