"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { PROJECTS } from "@/data/projects";
import {
  X,
  ExternalLink,
  CheckCircle,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Lock,
  Copy,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { toast } from "sonner";

type DeviceMode = "desktop" | "tablet" | "mobile";

export function ProjectModal() {
  const { selectedProject, setSelectedProject, cachedProjectIds } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<"preview" | "specs">("preview");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [reloadKeys, setReloadKeys] = useState<Record<string, number>>({});
  const [loadedUrls, setLoadedUrls] = useState<Record<string, boolean>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedProject]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (modalRef.current?.requestFullscreen) {
        modalRef.current.requestFullscreen().catch(() => {
          setIsFullscreen((prev) => !prev);
        });
      } else {
        setIsFullscreen((prev) => !prev);
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleCopyUrl = (url?: string) => {
    if (url) {
      navigator.clipboard.writeText(url);
      toast.success("Live URL copied to clipboard!");
    }
  };

  const handleReload = () => {
    if (selectedProject) {
      setLoadedUrls((prev) => ({ ...prev, [selectedProject.id]: false }));
      setReloadKeys((prev) => ({
        ...prev,
        [selectedProject.id]: (prev[selectedProject.id] || 0) + 1,
      }));
    }
  };

  const getCachedProject = (id: string) => {
    return (
      PROJECTS.find((p) => p.id === id) ||
      (selectedProject?.id === id ? selectedProject : null)
    );
  };

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          key="project-modal-backdrop-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 overflow-hidden pointer-events-auto"
        >
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            ref={modalRef}
            layoutId={`bento-slot-${selectedProject.id}`}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className={`relative flex flex-col bg-[#070709] text-left z-10 overflow-hidden shadow-2xl transform-gpu will-change-transform ${
              isFullscreen
                ? "w-screen h-screen max-w-none border-0"
                : "w-full max-w-5xl h-full md:h-[88vh] border border-white/[0.1]"
            }`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex-1 flex flex-col min-h-0 bg-[#040405] overflow-hidden"
            >
              {activeTab === "preview" ? (
                <div className="flex-1 flex flex-col min-h-0 bg-[#040405]">
                  <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-white/[0.06] bg-[#09090b] text-xs font-mono shrink-0">
                    <div className="flex items-center gap-1 bg-white/[0.02] p-0.5 border border-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => setDevice("desktop")}
                        className={`p-1.5 transition-colors cursor-pointer ${
                          device === "desktop"
                            ? "bg-white/[0.1] text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                        title="Desktop Preview (100%)"
                      >
                        <Monitor className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDevice("tablet")}
                        className={`p-1.5 transition-colors cursor-pointer ${
                          device === "tablet"
                            ? "bg-white/[0.1] text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                        title="Tablet Viewport (768px)"
                      >
                        <Tablet className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDevice("mobile")}
                        className={`p-1.5 transition-colors cursor-pointer ${
                          device === "mobile"
                            ? "bg-white/[0.1] text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                        title="Mobile Viewport (375px)"
                      >
                        <Smartphone className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex-1 max-w-lg mx-2 flex items-center justify-between px-3 py-1 border border-white/[0.08] bg-black/60 text-zinc-400 text-[11px]">
                      <div className="flex items-center gap-2 truncate">
                        <Lock className="h-3 w-3 text-zinc-500 shrink-0" />
                        <span className="truncate">
                          {selectedProject.previewUrl ||
                            selectedProject.liveUrl ||
                            "https://preview.local"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyUrl(
                            selectedProject.previewUrl || selectedProject.liveUrl,
                          )
                        }
                        className="ml-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                        title="Copy URL"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleReload}
                        className="p-1.5 border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
                        title="Reload live preview"
                      >
                        <RotateCw className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="p-1.5 border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
                        title={
                          isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"
                        }
                      >
                        {isFullscreen ? (
                          <Minimize2 className="h-3.5 w-3.5" />
                        ) : (
                          <Maximize2 className="h-3.5 w-3.5" />
                        )}
                      </button>

                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
                          title="Open in new window"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(null)}
                          className="p-1.5 border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
                          title="Close"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full overflow-hidden p-2 flex items-center justify-center bg-[#020203]">
                    <div
                      className={`h-full w-full transition-[max-width] duration-300 overflow-hidden border border-white/[0.08] bg-[#040405] shadow-inner flex items-center justify-center relative ${
                        device === "mobile"
                          ? "max-w-[375px]"
                          : device === "tablet"
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
                            {!isLoaded && isActive && (
                              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#040405] text-zinc-400 font-mono text-xs gap-3">
                                <RotateCw className="h-5 w-5 animate-spin text-zinc-500" />
                                <span>Connecting to instance...</span>
                              </div>
                            )}

                            <iframe
                              src={targetUrl}
                              title={proj.title}
                              onLoad={() =>
                                setLoadedUrls(
                                  (prev: Record<string, boolean>) => ({
                                    ...prev,
                                    [id]: true,
                                  }),
                                )
                              }
                              className="w-full h-full border-0 select-none bg-[#040405]"
                              style={{
                                colorScheme: "dark",
                                backgroundColor: "#040405",
                              }}
                              loading="eager"
                            />
                          </div>
                        );
                      })}

                      {!selectedProject.previewUrl &&
                        !selectedProject.liveUrl && (
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
                </div>
              ) : (
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
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
