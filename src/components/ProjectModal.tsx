"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { PROJECTS } from "@/data/projects";
import { toast } from "sonner";
import { ModalDeviceBar, DeviceMode } from "./project-modal/ModalDeviceBar";
import { ProjectPreviewPane } from "./project-modal/ProjectPreviewPane";
import { ProjectSpecsPane } from "./project-modal/ProjectSpecsPane";

export function ProjectModal() {
  const { selectedProject, setSelectedProject, cachedProjectIds } = usePortfolioStore();
  const [activeTab] = useState<"preview" | "specs">("preview");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [reloadKeys, setReloadKeys] = useState<Record<string, number>>({});
  const [loadedUrls, setLoadedUrls] = useState<Record<string, boolean>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const isDesktopOnly = Boolean(
    selectedProject?.desktopOnly ||
    selectedProject?.id === "JAV" ||
    selectedProject?.id === "gsap-studio"
  );
  const activeDevice = isDesktopOnly ? "desktop" : device;

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

  useEffect(() => {
    if (selectedProject) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Pause Lenis smooth scroll while project is active
      const win =
        typeof window !== "undefined"
          ? (window as unknown as {
              lenis?: { stop: () => void; start: () => void };
            })
          : null;
      if (win?.lenis) {
        win.lenis.stop();
      }

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        if (win?.lenis) {
          win.lenis.start();
        }
      };
    }
  }, [selectedProject]);

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

  const handleIframeLoad = (id: string) => {
    setTimeout(() => {
      setLoadedUrls((prev) => ({
        ...prev,
        [id]: true,
      }));
    }, 400);
  };

  useEffect(() => {
    if (selectedProject) {
      const timer = setTimeout(() => {
        setLoadedUrls((prev) => ({
          ...prev,
          [selectedProject.id]: true,
        }));
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  const getCachedProject = (id: string) => {
    return (
      PROJECTS.find((p) => p.id === id) ||
      (selectedProject?.id === id ? selectedProject : null)
    );
  };

  return (
    <AnimatePresence>
      {selectedProject && (
        <div
          key="project-modal-backdrop-wrapper"
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 overflow-hidden pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            ref={modalRef}
            layoutId={`bento-slot-${selectedProject.id}`}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 32,
              mass: 0.8,
            }}
            className={`relative flex flex-col bg-[#070709] text-left z-10 overflow-hidden shadow-2xl ${
              isFullscreen
                ? "w-screen h-screen max-w-none border-0"
                : "w-full max-w-7xl h-full md:h-[88vh] border border-white/[0.1]"
            }`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex-1 flex flex-col min-h-0 bg-[#040405] overflow-hidden"
            >
              {activeTab === "preview" ? (
                <div className="flex-1 flex flex-col min-h-0 bg-[#040405]">
                  <ModalDeviceBar
                    activeDevice={activeDevice}
                    isDesktopOnly={isDesktopOnly}
                    setDevice={setDevice}
                    previewUrl={selectedProject.previewUrl}
                    liveUrl={selectedProject.liveUrl}
                    onCopyUrl={handleCopyUrl}
                    onReload={handleReload}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={toggleFullscreen}
                    onClose={() => setSelectedProject(null)}
                  />

                  <ProjectPreviewPane
                    selectedProject={selectedProject}
                    activeDevice={activeDevice}
                    cachedProjectIds={cachedProjectIds}
                    getCachedProject={getCachedProject}
                    reloadKeys={reloadKeys}
                    loadedUrls={loadedUrls}
                    onIframeLoad={handleIframeLoad}
                  />
                </div>
              ) : (
                <ProjectSpecsPane selectedProject={selectedProject} />
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
