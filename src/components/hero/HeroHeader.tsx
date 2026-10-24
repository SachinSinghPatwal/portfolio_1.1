"use client";

import React from "react";
import { motion } from "framer-motion";

export function HeroHeader() {
  return (
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
  );
}
