"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundBeams } from "@/components/aceternity/BackgroundBeams";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { PROJECTS } from "@/data/projects";
import {
  ChevronDown,
  LayoutGrid,
  Check,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

interface BentoBlock {
  id: string;
  projectIndex: number;
  projectId?: string;
  slotLabel: string;
  dimensions: string;
  aspectDesc: string;
  className: string;
}

interface BentoPreset {
  id: string;
  name: string;
  sub: string;
  gridClass: string;
  blocks: BentoBlock[];
}

const BENTO_PRESETS: BentoPreset[] = [
  {
    id: "rotated-fibonacci",
    name: "Rotated Fibonacci",
    sub: "5×8 • Golden Spiral (Top Flagship)",
    gridClass: "grid-cols-1 md:grid-cols-5 md:grid-rows-8",
    blocks: [
      {
        id: "rf-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "5 × 5",
        aspectDesc: "Primary Horizontal Flagship",
        className: "md:col-start-1 md:col-span-5 md:row-start-1 md:row-span-5",
      },
      {
        id: "rf-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "3 × 3",
        aspectDesc: "Square Canvas Block",
        className: "md:col-start-1 md:col-span-3 md:row-start-6 md:row-span-3",
      },
      {
        id: "rf-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "2 × 2",
        aspectDesc: "Editorial Ratio Block",
        className: "md:col-start-4 md:col-span-2 md:row-start-6 md:row-span-2",
      },
      {
        id: "rf-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "1 × 1",
        aspectDesc: "Physics Micro-tile",
        className: "md:col-start-4 md:col-span-1 md:row-start-8 md:row-span-1",
      },
      {
        id: "rf-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "1 × 1",
        aspectDesc: "Signal / Custom Tile",
        className: "md:col-start-5 md:col-span-1 md:row-start-8 md:row-span-1",
      },
    ],
  },
  {
    id: "golden-spiral",
    name: "Vertical Golden Spiral",
    sub: "8×5 • Classic Fibonacci (Left Flagship)",
    gridClass: "grid-cols-1 md:grid-cols-8 md:grid-rows-5",
    blocks: [
      {
        id: "gs-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "5 × 5",
        aspectDesc: "Vertical Flagship Square",
        className: "md:col-start-1 md:col-span-5 md:row-start-1 md:row-span-5",
      },
      {
        id: "gs-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "3 × 3",
        aspectDesc: "Upper Right Module",
        className: "md:col-start-6 md:col-span-3 md:row-start-1 md:row-span-3",
      },
      {
        id: "gs-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "2 × 2",
        aspectDesc: "Lower Mid Module",
        className: "md:col-start-6 md:col-span-2 md:row-start-4 md:row-span-2",
      },
      {
        id: "gs-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "1 × 1",
        aspectDesc: "Perimeter Top Micro",
        className: "md:col-start-8 md:col-span-1 md:row-start-4 md:row-span-1",
      },
      {
        id: "gs-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "1 × 1",
        aspectDesc: "Perimeter Bottom Micro",
        className: "md:col-start-8 md:col-span-1 md:row-start-5 md:row-span-1",
      },
    ],
  },
  {
    id: "editorial-12col",
    name: "Editorial 12-Column",
    sub: "12×6 • Linear / Asymmetric Showcase",
    gridClass: "grid-cols-1 md:grid-cols-12 md:grid-rows-6",
    blocks: [
      {
        id: "ed-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "7 × 4",
        aspectDesc: "Dominant Hero Pane",
        className: "md:col-span-7 md:row-span-4",
      },
      {
        id: "ed-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "5 × 2",
        aspectDesc: "Upper Right Strip",
        className: "md:col-span-5 md:row-span-2",
      },
      {
        id: "ed-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "5 × 2",
        aspectDesc: "Mid Right Strip",
        className: "md:col-span-5 md:row-span-2",
      },
      {
        id: "ed-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "4 × 2",
        aspectDesc: "Lower Base Left",
        className: "md:col-span-4 md:row-span-2",
      },
      {
        id: "ed-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "4 × 2",
        aspectDesc: "Lower Base Center",
        className: "md:col-span-4 md:row-span-2",
      },
      {
        id: "ed-6",
        projectIndex: 5,
        slotLabel: "Slot 06",
        dimensions: "4 × 2",
        aspectDesc: "Lower Base Right",
        className: "md:col-span-4 md:row-span-2",
      },
    ],
  },
  {
    id: "dual-flagship",
    name: "Dual Flagship Split",
    sub: "12×6 • Twin Horizon (2 Top + 3 Bottom)",
    gridClass: "grid-cols-1 md:grid-cols-12 md:grid-rows-6",
    blocks: [
      {
        id: "df-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "6 × 3",
        aspectDesc: "Twin Flagship Alpha",
        className: "md:col-span-6 md:row-span-3",
      },
      {
        id: "df-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "6 × 3",
        aspectDesc: "Twin Flagship Beta",
        className: "md:col-span-6 md:row-span-3",
      },
      {
        id: "df-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "4 × 3",
        aspectDesc: "Tertiary Triplet Left",
        className: "md:col-span-4 md:row-span-3",
      },
      {
        id: "df-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "4 × 3",
        aspectDesc: "Tertiary Triplet Center",
        className: "md:col-span-4 md:row-span-3",
      },
      {
        id: "df-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "4 × 3",
        aspectDesc: "Tertiary Triplet Right",
        className: "md:col-span-4 md:row-span-3",
      },
    ],
  },
  {
    id: "focus-matrix",
    name: "Quadrant Focus",
    sub: "4×4 • Minimalist Matrix (Pillar + Grid)",
    gridClass: "grid-cols-1 md:grid-cols-4 md:grid-rows-4",
    blocks: [
      {
        id: "fm-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "2 × 3",
        aspectDesc: "Monolithic Vertical Pillar",
        className: "md:col-span-2 md:row-span-3",
      },
      {
        id: "fm-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "2 × 2",
        aspectDesc: "Quadrant Upper Square",
        className: "md:col-span-2 md:row-span-2",
      },
      {
        id: "fm-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "2 × 1",
        aspectDesc: "Mid Accent Strip",
        className: "md:col-span-2 md:row-span-1",
      },
      {
        id: "fm-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "2 × 1",
        aspectDesc: "Foundation Left Strip",
        className: "md:col-span-2 md:row-span-1",
      },
      {
        id: "fm-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "2 × 1",
        aspectDesc: "Foundation Right Strip",
        className: "md:col-span-2 md:row-span-1",
      },
    ],
  },
];

function BentoLivePreview({
  previewUrl,
  title,
}: {
  previewUrl: string;
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full flex-1 min-h-[140px] md:min-h-[160px] overflow-hidden bg-[#040405] border border-white/[0.08] shadow-inner">
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center bg-[#040405] transition-opacity duration-300 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="text-[10px] font-mono text-zinc-600 animate-pulse">
          Connecting preview...
        </span>
      </div>
      <iframe
        src={previewUrl}
        title={title}
        onLoad={() => {
          setTimeout(() => setLoaded(true), 500);
        }}
        className={`w-[300%] h-[300%] origin-top-left scale-[0.333333] border-0 pointer-events-none select-none bg-[#040405] transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          colorScheme: "dark",
          backgroundColor: "#040405",
        }}
        tabIndex={-1}
        loading="lazy"
      />
    </div>
  );
}

export function HeroSection() {
  const [selectedPresetId, setSelectedPresetId] = useState("rotated-fibonacci");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setSelectedProject } = usePortfolioStore();

  const currentPreset =
    BENTO_PRESETS.find((p) => p.id === selectedPresetId) || BENTO_PRESETS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="relative pt-6 pb-8 md:pt-10 overflow-visible">
      <BackgroundBeams />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-zinc-400 mb-5"
        >
          <span className="h-1.5 w-1.5 bg-zinc-300" />
          <span>Alex Rivera — Staff Design Engineer</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.14]"
        >
          Designing software with{" "}
          <span className="text-zinc-400">tactile weight</span> &amp; clarity.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mb-6"
        >
          Selected projects and production systems built at the intersection of
          mathematical typography, fluid interaction design, and
          high-performance frontend architecture.
        </motion.p>
      </div>

      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 max-w-5xl mx-auto px-1">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Sparkles className="size-3.5 text-zinc-500" />
          <span className="text-zinc-300 font-medium">Bento Architecture</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-500">
            {currentPreset.blocks.length} Container Blocks
          </span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 px-3.5 py-1.5 border border-white/[0.1] bg-[#0c0c0e] hover:bg-white/[0.04] text-xs font-mono text-zinc-200 transition-colors cursor-pointer shadow-lg"
          >
            <LayoutGrid className="size-3.5 text-zinc-400" />
            <span className="font-medium">{currentPreset.name}</span>
            <span className="text-[10px] text-zinc-500 hidden md:inline">
              ({currentPreset.sub.split("•")[0].trim()})
            </span>
            <ChevronDown
              className={`size-3.5 text-zinc-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-72 border border-white/[0.12] bg-[#09090c]/95 backdrop-blur-xl p-1.5 shadow-2xl z-50 text-left"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-white/[0.06] mb-1">
                  Select Bento Combination
                </div>
                <div className="space-y-1">
                  {BENTO_PRESETS.map((preset) => {
                    const isSelected = preset.id === currentPreset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedPresetId(preset.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-white/[0.08] text-white"
                            : "hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <div>
                          <div className="text-xs font-mono font-medium flex items-center gap-1.5">
                            <span>{preset.name}</span>
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500">
                            {preset.sub}
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="size-3.5 text-zinc-200 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        id="work"
        className={`relative grid ${currentPreset.gridClass} gap-3.5 w-full h-auto md:h-[620px]`}
      >
        {currentPreset.blocks.map((block) => {
          const project = getProject(block);

          return (
            <motion.div
              key={block.id}
              layoutId={project ? `bento-slot-${project.id}` : undefined}
              transition={{
                type: "spring",
                stiffness: 520,
                damping: 38,
                mass: 0.5,
              }}
              onClick={() => {
                if (project) {
                  setSelectedProject(project);
                }
              }}
              onMouseEnter={() => {
                if (project) {
                  pingWarmup(project.healthCheckUrl || project.previewUrl);
                }
              }}
              className={`group relative ${block.className} border border-white/[0.08] hover:border-white/[0.24] bg-white/[0.015] hover:bg-[#0c0c0f] transition-colors duration-200 z-10 hover:z-20 hover:shadow-2xl hover:shadow-black/90 cursor-pointer flex flex-col justify-between overflow-hidden transform-gpu will-change-transform`}
            >

              {project?.isLive && project?.previewUrl ? (
                <BentoLivePreview
                  previewUrl={project.previewUrl}
                  title={project.title}
                />
              ) : (
                <div className="flex flex-col items-center justify-center my-auto py-4 text-center">
                  <div className="h-10 w-10 border border-dashed border-white/[0.12] group-hover:border-white/[0.3] flex items-center justify-center font-mono text-xs text-zinc-400 group-hover:text-white transition-colors mb-2 bg-black/30">
                    {block.dimensions}
                  </div>
                  <div className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    {project ? project.title : "Custom Module"}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-600 tracking-tight mt-0.5">
                    {block.aspectDesc}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 mt-10 text-zinc-500 text-xs font-mono">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors"
        >
          <FaGithub className="h-3.5 w-3.5" />
          <span>GitHub</span>
        </a>
        <span>•</span>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors"
        >
          <FaXTwitter className="h-3.5 w-3.5" />
          <span>X / Twitter</span>
        </a>
        <span>•</span>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors"
        >
          <FaLinkedinIn className="h-3.5 w-3.5" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
