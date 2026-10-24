"use client";

import React from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { PROJECTS } from "@/data/projects";
import { BentoBlock } from "./hero/types";
import { PANORAMIC_RIBBON_BLOCKS } from "./hero/bento-data";
import { HeroHeader } from "./hero/HeroHeader";
import { BentoCardItem } from "./hero/BentoCardItem";
import { MobileProjectShowcase } from "./hero/MobileProjectShowcase";
import { useResponsive } from "@/lib/useResponsive";

export function HeroSection() {
  const { setSelectedProject } = usePortfolioStore();
  const { mounted, isDesktop } = useResponsive();

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

  // Curated projects for mobile/tablet showcase (first 5 to match desktop bento slots)
  const mobileProjects = PROJECTS.slice(0, 5);

  return (
    <div className="relative pt-18 sm:pt-20 md:pt-23 overflow-visible">
      <HeroHeader />

      {/* Desktop View: Full Panoramic 10x10 Ribbon Bento with Live Previews (Preserved for PC) */}
      <div
        id="work"
        className="relative hidden lg:grid grid-cols-10 grid-rows-10 gap-3.5 w-full h-[700px] mb-6 scroll-mt-20"
      >
        {/* Render heavy bento cards on desktop or before mount */}
        {(!mounted || isDesktop) &&
          PANORAMIC_RIBBON_BLOCKS.map((block) => {
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

      {/* Mobile & Tablet View: Clean, high-performance card showcase */}
      <div className="block lg:hidden scroll-mt-20" id="work-mobile">
        <MobileProjectShowcase
          projects={mobileProjects}
          onSelectProject={setSelectedProject}
          onPingWarmup={pingWarmup}
        />
      </div>
    </div>
  );
}
