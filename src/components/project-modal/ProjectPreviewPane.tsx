"use client";

import React from "react";
import { RotateCw } from "lucide-react";
import { ProjectItem } from "@/store/usePortfolioStore";
import { DeviceMode } from "./ModalDeviceBar";

interface ProjectPreviewPaneProps {
  selectedProject: ProjectItem;
  activeDevice: DeviceMode;
  cachedProjectIds: string[];
  getCachedProject: (id: string) => ProjectItem | null;
  reloadKeys: Record<string, number>;
  loadedUrls: Record<string, boolean>;
  onIframeLoad: (id: string) => void;
}

export function ProjectPreviewPane({
  selectedProject,
  activeDevice,
  cachedProjectIds,
  getCachedProject,
  reloadKeys,
  loadedUrls,
  onIframeLoad,
}: ProjectPreviewPaneProps) {
  return (
    <div className="flex-1 w-full overflow-hidden p-2 flex items-center justify-center bg-[#020203]">
      <div
        className={`h-full w-full transition-[max-width] duration-300 overflow-hidden border border-white/[0.08] bg-[#040405] shadow-inner flex items-center justify-center relative ${
          activeDevice === "mobile"
            ? "max-w-[375px]"
            : activeDevice === "tablet"
              ? "max-w-[768px]"
              : "max-w-full"
        }`}
      >
        {cachedProjectIds.map((id) => {
          const proj = getCachedProject(id);
          if (!proj) return null;
          const targetUrl = proj.previewUrl || proj.liveUrl;
          if (!targetUrl) return null;

          const isActive = selectedProject.id === id;
          const reloadCount = reloadKeys[id] || 0;
          const isLoaded = loadedUrls[id];

          return (
            <div
              key={`${id}-${reloadCount}`}
              className={`w-full h-full bg-[#040405] transition-opacity duration-200 ${
                isActive
                  ? "relative opacity-100 z-10"
                  : "absolute inset-0 opacity-0 pointer-events-none -z-10"
              }`}
            >
              <div
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#040405] text-zinc-400 font-mono text-xs gap-3 transition-opacity duration-300 ${
                  isLoaded && isActive
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <RotateCw className="h-5 w-5 animate-spin text-zinc-500" />
                <span>Connecting to instance...</span>
              </div>

              <iframe
                src={targetUrl}
                title={proj.title}
                onLoad={() => onIframeLoad(id)}
                className={`w-full h-full border-0 select-none bg-[#040405] transition-opacity duration-500 ${
                  isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{
                  colorScheme: "dark",
                  backgroundColor: "#040405",
                }}
                loading="eager"
              />
            </div>
          );
        })}

        {!selectedProject.previewUrl && !selectedProject.liveUrl && (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <p className="text-zinc-400 text-xs font-mono mb-2">
              No live preview link provided yet.
            </p>
            <p className="text-zinc-600 text-[11px] font-mono">
              Add a valid previewUrl to src/data/projects.ts
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
