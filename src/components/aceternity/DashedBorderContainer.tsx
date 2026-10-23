"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DashedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  showTopBorder?: boolean;
  showBottomBorder?: boolean;
}

export function DashedSection({
  children,
  className,
  id,
  showTopBorder = false,
  showBottomBorder = true,
}: DashedSectionProps) {
  return (
    <section id={id} className="relative w-full overflow-visible">
      {showTopBorder && (
        <div className="absolute top-0 left-0 right-0 w-full dashed-line-h z-10 pointer-events-none" />
      )}

      <div
        className={cn(
          "relative max-w-3xl mx-auto px-6 py-12 md:px-12 md:py-16",
          className,
        )}
      >
        <div className="absolute left-0 top-0 bottom-0 dashed-line-v pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 dashed-line-v pointer-events-none z-10" />

        {children}
      </div>

      {showBottomBorder && (
        <div className="absolute bottom-0 left-0 right-0 w-full dashed-line-h z-10 pointer-events-none" />
      )}
    </section>
  );
}

export function DashedGridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
      <div className="absolute inset-0 bg-dashed-grid [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px]" />
    </div>
  );
}
