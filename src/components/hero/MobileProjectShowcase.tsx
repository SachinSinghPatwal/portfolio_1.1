"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Eye, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { ProjectItem } from "@/store/usePortfolioStore";

interface MobileProjectShowcaseProps {
  projects: ProjectItem[];
  onSelectProject: (p: ProjectItem) => void;
  onPingWarmup: (url?: string) => void;
}

export function MobileProjectShowcase({
  projects,
  onSelectProject,
  onPingWarmup,
}: MobileProjectShowcaseProps) {
  return (
    <div className="w-full space-y-4 mb-6">
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Selected Works ({projects.length})</span>
        </div>
        <span className="text-zinc-400">Mobile &amp; Tablet Edition</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            onClick={() => {
              onPingWarmup(project.healthCheckUrl || project.previewUrl);
              onSelectProject(project);
            }}
            className="group relative flex flex-col justify-between p-4 sm:p-5 border border-white/[0.12] hover:border-white/40 bg-zinc-950/70 hover:bg-zinc-900/40 transition-all cursor-pointer overflow-hidden shadow-lg"
          >
            {/* Top row: Slot index & Live badge */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 text-[10px] text-zinc-300 border border-white/20 bg-white/[0.03]">
                    0{index + 1}
                  </span>
                  <span className="text-zinc-400">{project.category}</span>
                </div>

                {project.isLive && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors flex items-center justify-between">
                <span>{project.title}</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>

              {project.tagline && (
                <p className="text-xs text-zinc-400 font-mono mt-1 line-clamp-1">
                  {project.tagline}
                </p>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Bottom: Tags & Actions */}
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex flex-col gap-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono text-zinc-300 bg-white/[0.03] border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                    +{project.tags.length - 5}
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div
                className="flex items-center justify-between gap-2 pt-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => {
                    onPingWarmup(project.healthCheckUrl || project.previewUrl);
                    onSelectProject(project);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/30 hover:border-white/60 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Interactive View</span>
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/20 transition-colors"
                    title="Open live URL"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/20 transition-colors"
                    title="View GitHub repository"
                  >
                    <FaGithub className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
