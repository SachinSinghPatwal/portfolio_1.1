"use client";

import React from "react";
import { ExperienceItem } from "./experience-data";

export function ExperienceCard({ exp }: { exp: ExperienceItem }) {
  return (
    <div className="relative group">
      <div className="absolute -left-[30px] top-1.5 h-2.5 w-2.5 border border-white/[0.15] bg-black group-hover:border-white/[0.4] transition-colors" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-zinc-500 mb-1.5">
        <span className="text-zinc-200">{exp.period}</span>
        <span className="text-zinc-200">{exp.location}</span>
      </div>

      <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
        <span>{exp.role}</span>
        <span className="text-zinc-300">at</span>
        <span className="text-zinc-300">{exp.company}</span>
      </h3>

      <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
        {exp.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] font-mono text-zinc-300 bg-white/[0.02] border border-white/75"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
