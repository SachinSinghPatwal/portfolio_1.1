"use client";

import React from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { PROJECTS } from "@/data/projects";
import { BentoBlock } from "./hero/types";
import { PANORAMIC_RIBBON_BLOCKS } from "./hero/bento-data";
import { HeroHeader } from "./hero/HeroHeader";
import { BentoCardItem } from "./hero/BentoCardItem";

export function HeroSection() {
  const { setSelectedProject } = usePortfolioStore();

  const pingWarmup = (url?: string) => {
    if (!url || typeof window === "undefined") return;
    try {
      fetch(url, { mode: "no-cors" }).catch(() => {});
    } catch {}
  };

  const getProject = (block: BentoBlock) => {
    if (block.projectId) {
      const match = PROJECTS.find((p) => p.id === block.projectId);
      if (match) return match;
    }
    if (block.projectIndex !== undefined && PROJECTS[block.projectIndex]) {
      return PROJECTS[block.projectIndex];
    }
    return null;
  };

  return (
    <div className="relative pt-23 overflow-visible">
      <HeroHeader />

      <div
        id="work"
        className="relative grid grid-cols-1 mb-6 md:grid-cols-10 md:grid-rows-10 gap-3.5 w-full h-auto md:h-[700px] scroll-mt-20"
      >
        {PANORAMIC_RIBBON_BLOCKS.map((block) => {
          const project = getProject(block);
          return (
            <BentoCardItem
              key={block.id}
              block={block}
              project={project}
              onSelectProject={setSelectedProject}
              onPingWarmup={pingWarmup}
            />
          );
        })}
      </div>
    </div>
  );
}
