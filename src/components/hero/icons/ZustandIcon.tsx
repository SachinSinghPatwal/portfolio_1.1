"use client";

import React from "react";

export function ZustandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.2" cy="7.2" r="2.8" fill="#784421" />
      <circle cx="6.2" cy="7.2" r="1.5" fill="#C68B59" />
      <circle cx="17.8" cy="7.2" r="2.8" fill="#784421" />
      <circle cx="17.8" cy="7.2" r="1.5" fill="#C68B59" />
      <circle cx="12" cy="13.5" r="7.2" fill="#784421" />
      <ellipse cx="12" cy="15.2" rx="3.5" ry="2.4" fill="#E5B887" />
      <ellipse cx="12" cy="14.3" rx="1.2" ry="0.8" fill="#1C1917" />
      <circle cx="9.3" cy="12" r="1" fill="#1C1917" />
      <circle cx="14.7" cy="12" r="1" fill="#1C1917" />
      <circle cx="9.6" cy="11.7" r="0.35" fill="#FFFFFF" />
      <circle cx="15" cy="11.7" r="0.35" fill="#FFFFFF" />
      <path
        d="M11 15.8c.6.4 1.4.4 2 0"
        stroke="#1C1917"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
