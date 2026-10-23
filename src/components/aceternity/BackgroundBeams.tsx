"use client";

import React from "react";
import { motion } from "framer-motion";

export function BackgroundBeams({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] ${className}`}
    >
      
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-white/[0.025] blur-[140px] pointer-events-none" />

      
      <motion.div
        initial={{ opacity: 0.15 }}
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/2 left-1/3 h-[700px] w-[1px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent rotate-[-12deg]"
      />
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-1/2 right-1/3 h-[700px] w-[1px] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent rotate-[14deg]"
      />
    </div>
  );
}
