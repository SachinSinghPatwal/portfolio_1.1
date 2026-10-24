"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ProjectItem } from "@/store/usePortfolioStore";
import { BentoBlock } from "./types";
import { BentoLivePreview } from "./BentoLivePreview";
import { TechIconItem } from "./TechIconItem";
import { GitHubIconItem } from "./GitHubIconItem";

export function BentoCardItem({
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
