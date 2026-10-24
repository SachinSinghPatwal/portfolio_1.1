"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SnippetFrameProps {
  filename: string;
  badgeText: string;
  badgeBg: string;
  badgeTextColor?: string;
  lintCount?: { warnings?: number; errors?: number };
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  rotation?: number;
  glowColor?: string;
}

export function SnippetFrame({
  filename,
  badgeText,
  badgeBg,
  badgeTextColor = "#ffffff",
  lintCount = { warnings: 1, errors: 0 },
  children,
  className = "",
  style = {},
  rotation = 0,
  glowColor = "rgba(59, 130, 246, 0.15)",
}: SnippetFrameProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02, rotate: 0, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...style,
        transform: isHovered ? "rotate(0deg)" : `rotate(${rotation}deg)`,
      }}
      className={`pointer-events-auto select-none font-mono transition-transform duration-300 ${className}`}
    >
      {/* Ambient Glow */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-40 blur-xl pointer-events-none transition-opacity duration-300"
        style={{
          background: glowColor,
          opacity: isHovered ? 0.7 : 0.35,
        }}
      />

      {/* Editor Window Container */}
      <div className="relative rounded-xl border border-white/10 bg-[#16161a]/90 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden text-xs text-zinc-300 transition-colors duration-200 hover:border-white/20">
        {/* Top Window Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#121215]/95 border-b border-white/[0.07] gap-3">
          {/* Traffic Light Window Controls */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 hover:bg-[#ff5f56] transition-colors inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 hover:bg-[#ffbd2e] transition-colors inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 hover:bg-[#27c93f] transition-colors inline-block" />
          </div>

          {/* Active File Tab */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#1e1e24] border border-white/[0.08] text-[11px] font-medium text-zinc-300 shadow-xs">
            <span
              className="text-[9px] font-bold px-1 rounded tracking-tighter"
              style={{ backgroundColor: badgeBg, color: badgeTextColor }}
            >
              {badgeText}
            </span>
            <span className="truncate max-w-[120px]">{filename}</span>
          </div>

          {/* Lint / Problem Badge */}
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 shrink-0">
            {lintCount.warnings !== undefined && lintCount.warnings > 0 && (
              <span className="flex items-center gap-0.5 text-amber-400/90 font-medium bg-amber-400/10 px-1.5 py-0.5 rounded-full border border-amber-400/20">
                <span className="text-[9px]">▲</span>
                <span>{lintCount.warnings}</span>
              </span>
            )}
            {lintCount.errors !== undefined && lintCount.errors > 0 && (
              <span className="flex items-center gap-0.5 text-rose-400/90 font-medium bg-rose-400/10 px-1.5 py-0.5 rounded-full border border-rose-400/20">
                <span className="text-[9px]">●</span>
                <span>{lintCount.errors}</span>
              </span>
            )}
          </div>
        </div>

        {/* Code Viewport with Line Numbers */}
        <div className="p-3 overflow-x-auto text-[11.5px] sm:text-[12px] leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
