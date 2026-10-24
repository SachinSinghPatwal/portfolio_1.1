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
    <section id={id} className="relative w-full overflow-visible scroll-mt-20">
      {showTopBorder && (
        <div className="absolute top-0 left-0 right-0 w-full dashed-line-h z-10 pointer-events-none" />
      )}

      <div
        className={cn(
          "relative max-w-[55rem] mx-auto px-4 pb-2 pt-2",
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
