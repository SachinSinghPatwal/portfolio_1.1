"use client";

import React from "react";

export function GuiIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" y1="6" x2="20" y2="6" strokeOpacity="0.4" />
      <line x1="4" y1="12" x2="20" y2="12" strokeOpacity="0.4" />
      <line x1="4" y1="18" x2="20" y2="18" strokeOpacity="0.4" />
      <circle cx="8" cy="6" r="2.5" fill="currentColor" />
      <circle cx="16" cy="12" r="2.5" fill="currentColor" />
      <circle cx="10" cy="18" r="2.5" fill="currentColor" />
    </svg>
  );
}
