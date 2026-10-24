"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa6";

export function GitHubIconItem({ href }: { href: string }) {
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
