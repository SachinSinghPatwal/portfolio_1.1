"use client";

import React from "react";

export function MernIcon({ className }: { className?: string }) {
  return (
    <span
      className={`font-mono font-bold tracking-tight text-[9px] text-emerald-400 whitespace-nowrap leading-none pt-1 -ml-1.25 ${
        className || ""
      }`}
    >
      MERN
    </span>
  );
}
