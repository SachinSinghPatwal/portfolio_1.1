"use client";

import React from "react";

export function PlaywrightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="11.5" r="4.8" fill="#2EAD33" />
      <circle cx="6.5" cy="10.5" r="0.75" fill="#ffffff" />
      <circle cx="9.5" cy="10.5" r="0.75" fill="#ffffff" />
      <path
        d="M6.7 12.8a2 2 0 0 0 2.6 0"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx="15.5" cy="13" r="4.8" fill="#E84335" />
      <circle cx="14" cy="12" r="0.75" fill="#ffffff" />
      <circle cx="17" cy="12" r="0.75" fill="#ffffff" />
      <path
        d="M14.2 14.3a2 2 0 0 0 2.6 0"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
