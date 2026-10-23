"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  color?: string;
}

export function CardSpotlight({
  children,
  className,
  ...props
}: CardSpotlightProps) {
  return (
    <div
      className={cn(
        "relative border border-white/[0.06] bg-white/[0.015] p-6 md:p-7 overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.025] backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
