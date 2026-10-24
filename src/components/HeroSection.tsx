"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { usePortfolioStore, ProjectItem } from "@/store/usePortfolioStore";
import { PROJECTS } from "@/data/projects";
import {
  ChevronDown,
  LayoutGrid,
  Check,
  Sparkles,
  RotateCw,
  ArrowUpRight,
  ExternalLink,
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
    id: "dual-flagship",
    name: "Dual Flagship Split",
    sub: "10×10 • Twin Horizon (2 Top + 3 Base)",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "df-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "5 × 5",
        aspectDesc: "Twin Flagship Alpha",
        className: "md:col-start-1 md:col-span-5 md:row-start-1 md:row-span-5",
      },
      {
        id: "df-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "5 × 5",
        aspectDesc: "Twin Flagship Beta",
        className: "md:col-start-6 md:col-span-5 md:row-start-1 md:row-span-5",
      },
      {
        id: "df-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "3 × 5",
        aspectDesc: "Tertiary Triplet Left",
        className: "md:col-start-1 md:col-span-3 md:row-start-6 md:row-span-5",
      },
      {
        id: "df-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "4 × 5",
        aspectDesc: "Tertiary Triplet Center",
        className: "md:col-start-4 md:col-span-4 md:row-start-6 md:row-span-5",
      },
      {
        id: "df-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "3 × 5",
        aspectDesc: "Tertiary Triplet Right",
        className: "md:col-start-8 md:col-span-3 md:row-start-6 md:row-span-5",
      },
    ],
  },
  {
    id: "center-monolith",
    name: "Center Stage Monolith",
    sub: "10×10 • Symmetrical Cathedral (Flanked 2-1-2)",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "cm-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "4 × 10",
        aspectDesc: "Monolithic Center Pillar",
        className: "md:col-start-4 md:col-span-4 md:row-start-1 md:row-span-10",
      },
      {
        id: "cm-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "3 × 5",
        aspectDesc: "Left Wing Upper",
        className: "md:col-start-1 md:col-span-3 md:row-start-1 md:row-span-5",
      },
      {
        id: "cm-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "3 × 5",
        aspectDesc: "Left Wing Lower",
        className: "md:col-start-1 md:col-span-3 md:row-start-6 md:row-span-5",
      },
      {
        id: "cm-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "3 × 5",
        aspectDesc: "Right Wing Upper",
        className: "md:col-start-8 md:col-span-3 md:row-start-1 md:row-span-5",
      },
      {
        id: "cm-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "3 × 5",
        aspectDesc: "Right Wing Lower",
        className: "md:col-start-8 md:col-span-3 md:row-start-6 md:row-span-5",
      },
    ],
  },
  {
    id: "golden-spiral",
    name: "Golden Spiral 10×10",
    sub: "10×10 • Golden Ratio (Top-Left Flagship)",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "gs-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "6 × 6",
        aspectDesc: "Primary Flagship Square",
        className: "md:col-start-1 md:col-span-6 md:row-start-1 md:row-span-6",
      },
      {
        id: "gs-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "4 × 3",
        aspectDesc: "Upper Right Module",
        className: "md:col-start-7 md:col-span-4 md:row-start-1 md:row-span-3",
      },
      {
        id: "gs-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "4 × 3",
        aspectDesc: "Mid Right Module",
        className: "md:col-start-7 md:col-span-4 md:row-start-4 md:row-span-3",
      },
      {
        id: "gs-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "5 × 4",
        aspectDesc: "Lower Horizon Left",
        className: "md:col-start-1 md:col-span-5 md:row-start-7 md:row-span-4",
      },
      {
        id: "gs-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "5 × 4",
        aspectDesc: "Lower Horizon Right",
        className: "md:col-start-6 md:col-span-5 md:row-start-7 md:row-span-4",
      },
    ],
  },
  {
    id: "triad-duo",
    name: "Triad & Duo Symphony",
    sub: "10×10 • 3 Balanced Top + 2 Cinematic Base",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "td-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "3 × 5",
        aspectDesc: "Upper Triad Left",
        className: "md:col-start-1 md:col-span-3 md:row-start-1 md:row-span-5",
      },
      {
        id: "td-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "4 × 5",
        aspectDesc: "Upper Triad Center",
        className: "md:col-start-4 md:col-span-4 md:row-start-1 md:row-span-5",
      },
      {
        id: "td-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "3 × 5",
        aspectDesc: "Upper Triad Right",
        className: "md:col-start-8 md:col-span-3 md:row-start-1 md:row-span-5",
      },
      {
        id: "td-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "5 × 5",
        aspectDesc: "Cinematic Base Left",
        className: "md:col-start-1 md:col-span-5 md:row-start-6 md:row-span-5",
      },
      {
        id: "td-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "5 × 5",
        aspectDesc: "Cinematic Base Right",
        className: "md:col-start-6 md:col-span-5 md:row-start-6 md:row-span-5",
      },
    ],
  },
  {
    id: "panoramic-ribbon",
    name: "Panoramic Ribbon",
    sub: "10×10 • Full-Width Cinema Band + Duos",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "pr-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "5 × 3",
        aspectDesc: "Top Gallery Left",
        className: "md:col-start-1 md:col-span-5 md:row-start-1 md:row-span-3",
      },
      {
        id: "pr-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "5 × 3",
        aspectDesc: "Top Gallery Right",
        className: "md:col-start-6 md:col-span-5 md:row-start-1 md:row-span-3",
      },
      {
        id: "pr-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "10 × 4",
        aspectDesc: "Full Horizon Cinema Ribbon",
        className: "md:col-start-1 md:col-span-10 md:row-start-4 md:row-span-4",
      },
      {
        id: "pr-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "5 × 3",
        aspectDesc: "Base Gallery Left",
        className: "md:col-start-1 md:col-span-5 md:row-start-8 md:row-span-3",
      },
      {
        id: "pr-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "5 × 3",
        aspectDesc: "Base Gallery Right",
        className: "md:col-start-6 md:col-span-5 md:row-start-8 md:row-span-3",
      },
    ],
  },
  {
    id: "inverted-anchor",
    name: "Inverted Studio Anchor",
    sub: "10×10 • Right Flagship + Stacked Left",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "ia-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "4 × 3",
        aspectDesc: "Upper Left Module",
        className: "md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-3",
      },
      {
        id: "ia-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "4 × 3",
        aspectDesc: "Mid Left Module",
        className: "md:col-start-1 md:col-span-4 md:row-start-4 md:row-span-3",
      },
      {
        id: "ia-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "6 × 6",
        aspectDesc: "Right Flagship Hero",
        className: "md:col-start-5 md:col-span-6 md:row-start-1 md:row-span-6",
      },
      {
        id: "ia-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "5 × 4",
        aspectDesc: "Foundation Left",
        className: "md:col-start-1 md:col-span-5 md:row-start-7 md:row-span-4",
      },
      {
        id: "ia-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "5 × 4",
        aspectDesc: "Foundation Right",
        className: "md:col-start-6 md:col-span-5 md:row-start-7 md:row-span-4",
      },
    ],
  },
  {
    id: "left-tower",
    name: "Vertical Pillar & Quadrant",
    sub: "10×10 • Monolith Pillar + 2×2 Wing",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "lt-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "4 × 10",
        aspectDesc: "Vertical Monolith Tower",
        className: "md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-10",
      },
      {
        id: "lt-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "3 × 5",
        aspectDesc: "Upper Mid Block",
        className: "md:col-start-5 md:col-span-3 md:row-start-1 md:row-span-5",
      },
      {
        id: "lt-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "3 × 5",
        aspectDesc: "Upper Right Block",
        className: "md:col-start-8 md:col-span-3 md:row-start-1 md:row-span-5",
      },
      {
        id: "lt-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "3 × 5",
        aspectDesc: "Lower Mid Block",
        className: "md:col-start-5 md:col-span-3 md:row-start-6 md:row-span-5",
      },
      {
        id: "lt-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "3 × 5",
        aspectDesc: "Lower Right Block",
        className: "md:col-start-8 md:col-span-3 md:row-start-6 md:row-span-5",
      },
    ],
  },
  {
    id: "right-tower",
    name: "Right Pillar & Quadrant",
    sub: "10×10 • 2×2 Wing + Monolith Pillar",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "rt-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "3 × 5",
        aspectDesc: "Upper Left Block",
        className: "md:col-start-1 md:col-span-3 md:row-start-1 md:row-span-5",
      },
      {
        id: "rt-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "3 × 5",
        aspectDesc: "Upper Mid Block",
        className: "md:col-start-4 md:col-span-3 md:row-start-1 md:row-span-5",
      },
      {
        id: "rt-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "3 × 5",
        aspectDesc: "Lower Left Block",
        className: "md:col-start-1 md:col-span-3 md:row-start-6 md:row-span-5",
      },
      {
        id: "rt-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "3 × 5",
        aspectDesc: "Lower Mid Block",
        className: "md:col-start-4 md:col-span-3 md:row-start-6 md:row-span-5",
      },
      {
        id: "rt-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "4 × 10",
        aspectDesc: "Vertical Monolith Tower",
        className: "md:col-start-7 md:col-span-4 md:row-start-1 md:row-span-10",
      },
    ],
  },
  {
    id: "staggered-horizon",
    name: "Staggered Horizon",
    sub: "10×10 • Dominant 7×5 Hero + Baseline Trio",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "sh-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "7 × 5",
        aspectDesc: "Dominant Upper Anchor",
        className: "md:col-start-1 md:col-span-7 md:row-start-1 md:row-span-5",
      },
      {
        id: "sh-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "3 × 5",
        aspectDesc: "Upper Right Module",
        className: "md:col-start-8 md:col-span-3 md:row-start-1 md:row-span-5",
      },
      {
        id: "sh-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "3 × 5",
        aspectDesc: "Base Module Left",
        className: "md:col-start-1 md:col-span-3 md:row-start-6 md:row-span-5",
      },
      {
        id: "sh-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "3 × 5",
        aspectDesc: "Base Module Center",
        className: "md:col-start-4 md:col-span-3 md:row-start-6 md:row-span-5",
      },
      {
        id: "sh-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "4 × 5",
        aspectDesc: "Base Module Right",
        className: "md:col-start-7 md:col-span-4 md:row-start-6 md:row-span-5",
      },
    ],
  },
  {
    id: "inverted-staggered",
    name: "Inverted Staggered Horizon",
    sub: "10×10 • Left Module + Dominant 7×5 Hero",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "ish-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "3 × 5",
        aspectDesc: "Upper Left Module",
        className: "md:col-start-1 md:col-span-3 md:row-start-1 md:row-span-5",
      },
      {
        id: "ish-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "7 × 5",
        aspectDesc: "Dominant Upper Anchor",
        className: "md:col-start-4 md:col-span-7 md:row-start-1 md:row-span-5",
      },
      {
        id: "ish-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "4 × 5",
        aspectDesc: "Base Module Left",
        className: "md:col-start-1 md:col-span-4 md:row-start-6 md:row-span-5",
      },
      {
        id: "ish-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "3 × 5",
        aspectDesc: "Base Module Center",
        className: "md:col-start-5 md:col-span-3 md:row-start-6 md:row-span-5",
      },
      {
        id: "ish-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "3 × 5",
        aspectDesc: "Base Module Right",
        className: "md:col-start-8 md:col-span-3 md:row-start-6 md:row-span-5",
      },
    ],
  },
  {
    id: "dynamic-matrix",
    name: "Dynamic Matrix",
    sub: "10×10 • Asymmetric Interlocking Masonry",
    gridClass: "grid-cols-1 md:grid-cols-10 md:grid-rows-10",
    blocks: [
      {
        id: "dm-1",
        projectIndex: 0,
        slotLabel: "Slot 01",
        dimensions: "5 × 6",
        aspectDesc: "Primary Left Anchor",
        className: "md:col-start-1 md:col-span-5 md:row-start-1 md:row-span-6",
      },
      {
        id: "dm-2",
        projectIndex: 1,
        slotLabel: "Slot 02",
        dimensions: "5 × 4",
        aspectDesc: "Upper Right Module",
        className: "md:col-start-6 md:col-span-5 md:row-start-1 md:row-span-4",
      },
      {
        id: "dm-3",
        projectIndex: 2,
        slotLabel: "Slot 03",
        dimensions: "5 × 6",
        aspectDesc: "Lower Right Anchor",
        className: "md:col-start-6 md:col-span-5 md:row-start-5 md:row-span-6",
      },
      {
        id: "dm-4",
        projectIndex: 3,
        slotLabel: "Slot 04",
        dimensions: "2 × 4",
        aspectDesc: "Lower Left Module",
        className: "md:col-start-1 md:col-span-2 md:row-start-7 md:row-span-4",
      },
      {
        id: "dm-5",
        projectIndex: 4,
        slotLabel: "Slot 05",
        dimensions: "3 × 4",
        aspectDesc: "Lower Mid Module",
        className: "md:col-start-3 md:col-span-3 md:row-start-7 md:row-span-4",
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Safety fallback: auto-reveal preview after 1s so it never stays stuck
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [previewUrl]);

  return (
    <div className="relative w-full flex-1 min-h-[140px] md:min-h-[160px] overflow-hidden bg-[#040405]">
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#040405] transition-opacity duration-300 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <RotateCw className="h-4 w-4 animate-spin text-zinc-500" />
        <span className="text-[10px] font-mono text-zinc-600 animate-pulse">
          Connecting preview...
        </span>
      </div>
      <iframe
        ref={iframeRef}
        src={previewUrl}
        title={title}
        onLoad={() => {
          setTimeout(() => setLoaded(true), 300);
        }}
        className={`w-[300%] h-[300%] origin-top-left scale-[0.333333] border-0 pointer-events-none select-none bg-[#040405] transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          colorScheme: "dark",
          backgroundColor: "#040405",
        }}
        tabIndex={-1}
        loading="eager"
      />
    </div>
  );
}

function BentoCardItem({
  block,
  project,
  onSelectProject,
  onPingWarmup,
}: {
  block: BentoBlock;
  project: ProjectItem | null;
  onSelectProject: (p: ProjectItem) => void;
  onPingWarmup: (url?: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOverSlideBar, setIsOverSlideBar] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setIsHovered(true);
    if (project) {
      onPingWarmup(project.healthCheckUrl || project.previewUrl);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsOverSlideBar(false);
  };

  const showCustomCursor = Boolean(project && isHovered && !isOverSlideBar);

  return (
    <motion.div
      key={block.id}
      layoutId={project ? `bento-slot-${project.id}` : undefined}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 32,
        mass: 0.8,
      }}
      onClick={() => {
        if (project) {
          onSelectProject(project);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative ${block.className} border border-black hover:border-black bg-transparent z-10 hover:z-20 ${
        showCustomCursor ? "cursor-none" : "cursor-pointer"
      } flex flex-col justify-between overflow-hidden`}
    >
      {/* Custom Mouse Follower: blobby link icon, inverted color, mild white semi-transparent with instant tracking */}
      {project && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: showCustomCursor ? 1 : 0,
            opacity: showCustomCursor ? 1 : 0,
          }}
          className="pointer-events-none absolute z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white outline outline-1 outline-black outline-offset-[-1.5px]"
        >
          <ExternalLink className="size-5 stroke-[1.5] text-black" />
        </motion.div>
      )}

      {project?.isLive && project?.previewUrl ? (
        <>
          <BentoLivePreview
            previewUrl={project.previewUrl}
            title={project.title}
          />
          <div className="px-3 py-1.5 border-t border-white/[0.06] bg-[#070709] flex items-center justify-between text-[11px] font-mono text-zinc-400 shrink-0">
            <span>React, Next, HTML, CSS</span>
          </div>
        </>
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

      {/* Slide bar from bottom to top: max 50% element height, stops propagation & opens tab view */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key={`slidebar-${block.id}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setIsOverSlideBar(true)}
            onMouseLeave={() => setIsOverSlideBar(false)}
            onClick={(e) => {
              e.stopPropagation();
              if (project) {
                onSelectProject(project);
              }
            }}
            className="absolute inset-x-0 bottom-0 z-30 max-h-[50%] h-auto bg-[#09090c]/95 backdrop-blur-md border-t border-white/[0.14] p-2.5 sm:p-3 text-left flex flex-col justify-between gap-1.5 shadow-2xl overflow-hidden cursor-default"
          >
            <div className="flex items-start justify-between gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  <h4 className="text-xs font-mono font-semibold text-white truncate">
                    {project ? project.title : "Custom Module"}
                  </h4>
                  {project?.category && (
                    <span className="text-[9px] font-mono text-zinc-400 px-1 py-0.5 border border-white/[0.08] bg-white/[0.04] shrink-0">
                      {project.category}
                    </span>
                  )}
                </div>
                <p className="text-[10px] font-mono text-zinc-400 line-clamp-1 mt-0.5">
                  {project?.tagline || block.aspectDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/[0.06] mt-auto">
              <div className="flex items-center gap-1 overflow-hidden">
                {project?.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono text-zinc-400 px-1.5 py-0.5 bg-white/[0.03] border border-white/[0.06] truncate"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {project?.liveUrl && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                    }}
                    className="p-1 text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                    title="Live Demo"
                  >
                    <ExternalLink className="size-3" />
                  </button>
                )}
                {project?.githubUrl && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        project.githubUrl,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                    className="p-1 text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                    title="GitHub Repository"
                  >
                    <FaGithub className="size-3" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (project) {
                      onSelectProject(project);
                    }
                  }}
                  className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-white/[0.08] hover:bg-white/[0.16] text-zinc-200 hover:text-white border border-white/[0.12] transition-colors cursor-pointer"
                  title="Open Tab View"
                >
                  <ArrowUpRight className="size-3" />
                  <span>Tab View</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HeroSection() {
  const [selectedPresetId, setSelectedPresetId] = useState("dual-flagship");
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
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-8">
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

      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 w-full px-1">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Sparkles className="size-3.5 text-zinc-500" />
          <span className="text-zinc-300 font-medium">Bento Architecture</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-500">
            10×10 Matrix • {currentPreset.blocks.length} Modules
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
                className="absolute right-0 top-full mt-2 w-80 sm:w-84 max-h-[460px] flex flex-col border border-white/[0.12] bg-[#09090c]/95 backdrop-blur-xl p-1.5 shadow-2xl z-50 text-left"
              >
                <div className="flex items-center justify-between px-2.5 py-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-white/[0.06] mb-1 shrink-0">
                  <span>Select Bento Combination</span>
                  <span className="text-zinc-600 font-mono">
                    {BENTO_PRESETS.length} Layouts
                  </span>
                </div>
                <div className="space-y-1 overflow-y-auto overscroll-contain pr-1 flex-1">
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
        className={`relative grid ${currentPreset.gridClass} gap-3.5 w-full h-auto md:h-[700px]`}
      >
        {currentPreset.blocks.map((block) => (
          <BentoCardItem
            key={block.id}
            block={block}
            project={getProject(block)}
            onSelectProject={setSelectedProject}
            onPingWarmup={pingWarmup}
          />
        ))}
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
