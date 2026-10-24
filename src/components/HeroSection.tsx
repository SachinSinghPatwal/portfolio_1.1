"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { usePortfolioStore, ProjectItem } from "@/store/usePortfolioStore";
import { PROJECTS } from "@/data/projects";
import { RotateCw, ExternalLink, Code2 } from "lucide-react";
import { FaGithub, FaCss3Alt } from "react-icons/fa6";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiReact,
  SiTailwindcss,
  SiBabel,
  SiVite,
  SiGreensock,
  SiWebgl,
  SiThreedotjs,
  SiFramer,
  SiNextdotjs,
  SiFigma,
  SiRadixui,
  SiMongodb,
  SiRabbitmq,
  SiGithubactions,
  SiZod,
} from "react-icons/si";
import { TbDatabase, TbLayoutDashboard } from "react-icons/tb";

function AcornIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2c0 1.8-.8 2.8-1.8 3.5"
        stroke="#E0A96D"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 8.5C5 6.8 8 5.5 12 5.5s7 1.3 7 3c0 .8-.5 1.5-1.2 2H6.2C5.5 10 5 9.3 5 8.5z"
        fill="#8B5A2B"
        stroke="#A0522D"
        strokeWidth="0.8"
      />
      <path
        d="M6.2 10.5C6.5 15.5 9 19.5 12 21c3-1.5 5.5-5.5 5.8-10.5H6.2z"
        fill="#CD853F"
        stroke="#A0522D"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function PlaywrightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="11.5" r="4.8" fill="#2EAD33" />
      <circle cx="6.5" cy="10.5" r="0.75" fill="#ffffff" />
      <circle cx="9.5" cy="10.5" r="0.75" fill="#ffffff" />
      <path
        d="M6.7 12.8a2 2 0 0 0 2.6 0"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx="15.5" cy="13" r="4.8" fill="#E84335" />
      <circle cx="14" cy="12" r="0.75" fill="#ffffff" />
      <circle cx="17" cy="12" r="0.75" fill="#ffffff" />
      <path
        d="M14.2 14.3a2 2 0 0 0 2.6 0"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ZustandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.2" cy="7.2" r="2.8" fill="#784421" />
      <circle cx="6.2" cy="7.2" r="1.5" fill="#C68B59" />
      <circle cx="17.8" cy="7.2" r="2.8" fill="#784421" />
      <circle cx="17.8" cy="7.2" r="1.5" fill="#C68B59" />
      <circle cx="12" cy="13.5" r="7.2" fill="#784421" />
      <ellipse cx="12" cy="15.2" rx="3.5" ry="2.4" fill="#E5B887" />
      <ellipse cx="12" cy="14.3" rx="1.2" ry="0.8" fill="#1C1917" />
      <circle cx="9.3" cy="12" r="1" fill="#1C1917" />
      <circle cx="14.7" cy="12" r="1" fill="#1C1917" />
      <circle cx="9.6" cy="11.7" r="0.35" fill="#FFFFFF" />
      <circle cx="15" cy="11.7" r="0.35" fill="#FFFFFF" />
      <path
        d="M11 15.8c.6.4 1.4.4 2 0"
        stroke="#1C1917"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GuiIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" y1="6" x2="20" y2="6" strokeOpacity="0.4" />
      <line x1="4" y1="12" x2="20" y2="12" strokeOpacity="0.4" />
      <line x1="4" y1="18" x2="20" y2="18" strokeOpacity="0.4" />
      <circle cx="8" cy="6" r="2.5" fill="currentColor" />
      <circle cx="16" cy="12" r="2.5" fill="currentColor" />
      <circle cx="10" cy="18" r="2.5" fill="currentColor" />
    </svg>
  );
}

function MernIcon({ className }: { className?: string }) {
  return (
    <span
      className={`font-mono font-bold tracking-tight text-[9px] text-emerald-400 whitespace-nowrap leading-none pt-1 -ml-1.25 ${
        className || ""
      }`}
    >
      MERN
    </span>
  );
}

function FallbackTechIcon({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const slug = tag.toLowerCase().replace(/[\s.\-_]/g, "");

  if (imgError) {
    return <Code2 className={className || "size-3.5 text-zinc-400"} />;
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`https://cdn.simpleicons.org/${slug}/white`}
      alt={tag}
      className={`${className || "size-3.5"} object-contain`}
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}

function renderTechIcon(
  tag: string,
  className: string = "size-3.5",
): React.ReactNode {
  const normalized = tag.toLowerCase().replace(/[\s\-_.]/g, "");

  switch (normalized) {
    case "js":
    case "javascript":
      return <SiJavascript className={`${className} text-[#F7DF1E]`} />;
    case "ts":
    case "typescript":
      return <SiTypescript className={`${className} text-[#3178C6]`} />;
    case "html":
    case "html5":
      return <SiHtml5 className={`${className} text-[#E34F26]`} />;
    case "css":
    case "css3":
      return <FaCss3Alt className={`${className} text-[#1572B6]`} />;
    case "acorn":
      return <AcornIcon className={className} />;
    case "babel":
      return <SiBabel className={`${className} text-[#F9DC3E]`} />;
    case "tailwindcss":
    case "tailwind":
      return <SiTailwindcss className={`${className} text-[#06B6D4]`} />;
    case "react":
    case "react19":
      return <SiReact className={`${className} text-[#61DAFB]`} />;
    case "zustand":
      return <ZustandIcon className={className} />;
    case "motion":
    case "framermotion":
      return <SiFramer className={`${className} text-[#0055FF]`} />;
    case "mern":
      return <MernIcon className={className} />;
    case "mongodb":
      return <SiMongodb className={`${className} text-[#47A248]`} />;
    case "playwright":
      return <PlaywrightIcon className={className} />;
    case "rabbitmq":
      return <SiRabbitmq className={`${className} text-[#FF6600]`} />;
    case "cicd":
    case "ci":
    case "cd":
      return <SiGithubactions className={`${className} text-[#2088FF]`} />;
    case "zod":
      return <SiZod className={`${className} text-[#3E67B1]`} />;
    case "gsap":
    case "scrolltrigger":
      return <SiGreensock className={`${className} text-[#88CE02]`} />;
    case "webgl":
    case "webgpu":
      return <SiWebgl className={`${className} text-[#990000]`} />;
    case "threejs":
    case "threedotjs":
    case "three":
      return <SiThreedotjs className={`${className} text-white`} />;
    case "gui":
    case "lilgui":
      return <GuiIcon className={`${className} text-zinc-300`} />;
    case "vite":
      return <SiVite className={`${className} text-[#646CFF]`} />;
    case "nextjs":
    case "nextdotjs":
      return <SiNextdotjs className={`${className} text-white`} />;
    case "figma":
      return <SiFigma className={`${className} text-[#F24E1E]`} />;
    case "radix":
      return <SiRadixui className={`${className} text-white`} />;
    case "dashboard":
      return <TbLayoutDashboard className={className} />;
    case "database":
    case "cms":
      return <TbDatabase className={className} />;
    default:
      return <FallbackTechIcon tag={tag} className={className} />;
  }
}

function TechIconItem({ tag }: { tag: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center min-w-7 h-7 px-1.5 w-auto rounded-md bg-white/[0.05] border border-white/[0.14] hover:border-white/80 hover:bg-white/[0.12] transition-all cursor-pointer shrink-0 text-white"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-[20.5px] px-2 py-0.5 rounded-md border border-white/60 bg-zinc-950/95 text-[10px] font-mono text-white whitespace-nowrap shadow-2xl z-50"
          >
            {tag}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center pointer-events-none">
        {renderTechIcon(tag, "size-3.5")}
      </div>
    </div>
  );
}

function GitHubIconItem({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="GitHub Repository"
      className="relative flex items-center justify-center size-7 rounded-md bg-white/[0.05] border border-white/[0.14] hover:border-white/80 hover:bg-white/[0.12] transition-all cursor-pointer shrink-0 text-white"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-full mb-2 right-0 px-2 py-0.5 rounded-md border border-white/60 bg-zinc-950/95 text-[10px] font-mono text-white whitespace-nowrap shadow-2xl z-50"
          >
            GitHub
          </motion.div>
        )}
      </AnimatePresence>

      <FaGithub className="size-3.5" />
    </a>
  );
}

interface BentoBlock {
  id: string;
  projectIndex: number;
  projectId?: string;
  slotLabel: string;
  dimensions: string;
  aspectDesc: string;
  className: string;
}

const PANORAMIC_RIBBON_BLOCKS: BentoBlock[] = [
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
    <div className="relative w-full flex-1 min-h-[140px] md:min-h-[160px] overflow-visible bg-[#040405]">
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#040405] transition-opacity duration-300 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <RotateCw className="h-4 w-4 animate-spin text-zinc-500" />
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
        <BentoLivePreview
          previewUrl={project.previewUrl}
          title={project.title}
        />
      ) : (
        <div className="flex flex-col items-center justify-center my-auto py-4 text-center">
          <div className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
            {project ? project.title : "Module"}
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
            className="absolute inset-x-0 bottom-0 z-30 max-h-[85%] h-auto bg-[#09090c]/95 backdrop-blur-md border-t border-white/[0.14] px-3 p-2 text-left flex items-center justify-between gap-2 shadow-2xl overflow-visible cursor-default"
          >
            {/* Tech Tags from project.tags: wraps to next line if exceeds, with hover title tooltip */}
            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
              {project?.tags.map((tag) => (
                <TechIconItem key={tag} tag={tag} />
              ))}
            </div>

            {/* Action buttons on the right: GitHub matching others on right edge */}
            {project?.githubUrl && (
              <div className="shrink-0 self-center ml-auto">
                <GitHubIconItem href={project.githubUrl} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-2">
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

      <div
        id="work"
        className="relative grid grid-cols-1 md:grid-cols-10 md:grid-rows-10 gap-3.5 w-full h-auto md:h-[700px]"
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
