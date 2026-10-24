"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechIconRenderer } from "./TechIconRenderer";

export function TechIconItem({ tag }: { tag: string }) {
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
        <TechIconRenderer tag={tag} className="size-3.5" />
      </div>
    </div>
  );
}
