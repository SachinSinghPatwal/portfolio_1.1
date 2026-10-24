"use client";

import React from "react";
import { CheckCircle, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { ProjectItem } from "@/store/usePortfolioStore";

export function ProjectSpecsPane({
  selectedProject,
}: {
  selectedProject: ProjectItem;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-left">
      <div>
        <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2">
          Project Architecture
        </h4>
        <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
          {selectedProject.description}
        </p>
      </div>

      {selectedProject.metrics && (
        <div className="p-3.5 bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center gap-2 max-w-xl">
          <span className="h-2 w-2 bg-zinc-300" />
          <span>{selectedProject.metrics}</span>
        </div>
      )}

      {selectedProject.highlights.length > 0 && (
        <div className="border-t border-dashed border-white/[0.07] pt-6">
          <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-3">
            Technical Milestones
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {selectedProject.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 p-3 border border-white/[0.04] bg-white/[0.015] text-xs text-zinc-400"
              >
                <CheckCircle className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-dashed border-white/[0.07] pt-6">
        <h4 className="font-mono text-xs text-zinc-500 mb-2">
          Engineered with:
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {selectedProject.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[11px] font-mono text-zinc-400 bg-white/[0.02] border border-white/[0.06]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-6 border-t border-white/[0.07]">
        {selectedProject.liveUrl && (
          <a
            href={selectedProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-950 text-xs font-medium hover:bg-white transition-colors"
          >
            <span>Launch Live App</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {selectedProject.githubUrl && (
          <a
            href={selectedProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-white/[0.08] bg-white/[0.02] text-zinc-300 text-xs font-medium hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <FaGithub className="h-3.5 w-3.5" />
            <span>Source Repository</span>
          </a>
        )}
      </div>
    </div>
  );
}
