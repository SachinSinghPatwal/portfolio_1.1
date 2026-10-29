"use client";

import React from "react";
import { motion } from "framer-motion";

export function HeroHeader() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mb-2">
      {/* Main Headline: Name, who I am, and what I do */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4 leading-[1.15] px-1"
      >
        Hi, I&apos;m Sachin — a{" "}
        <span className="text-zinc-400">Full Stack Developer</span> building
        scalable web applications.
      </motion.h1>

      {/* Description: Summary */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xs sm:text-[14px] text-zinc-400 leading-relaxed max-w-lg mb-4 sm:mb-6 px-2"
      >
        Engineering modern software with tactile weight and clarity. Crafting
        fluid user interfaces, resilient backend architectures, and
        high-performance web systems.
      </motion.p>
    </div>
  );
}
