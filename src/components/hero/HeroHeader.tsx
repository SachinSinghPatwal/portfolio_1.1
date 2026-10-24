"use client";

import React from "react";
import { motion } from "framer-motion";

export function HeroHeader() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-2">
      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4 leading-[1.15] px-1"
      >
        Engineering modern software with{" "}
        <span className="text-zinc-400">tactile weight</span> &amp; clarity.
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xs sm:text-[14px] text-zinc-400 leading-relaxed max-w-lg mb-4 sm:mb-6 px-2"
      >
        Hi, I&apos;m <span className="text-zinc-200 font-medium">Sachin</span> —
        a Full Stack Developer building scalable web applications, fluid user
        interfaces, and high-performance frontend and backend systems.
      </motion.p>
    </div>
  );
}
