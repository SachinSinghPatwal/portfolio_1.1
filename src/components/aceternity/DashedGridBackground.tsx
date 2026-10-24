"use client";

import React from "react";

export function DashedGridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
      <div className="absolute inset-0 bg-dashed-grid [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px]" />
    </div>
  );
}
