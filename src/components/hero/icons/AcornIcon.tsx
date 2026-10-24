"use client";

import React from "react";

export function AcornIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2c0 1.8-.8 2.8-1.8 3.5"
        stroke="#E0A96D"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 8.5C5 6.8 8 5.5 12 5.5s7 1.3 7 3c0 .8-.5 1.5-1.2 2H6.2C5.5 10 5 9.3 5 8.5z"
        fill="#8B5A2B"
        stroke="#A0522D"
        strokeWidth="0.8"
      />
      <path
        d="M6.2 10.5C6.5 15.5 9 19.5 12 21c3-1.5 5.5-5.5 5.8-10.5H6.2z"
        fill="#CD853F"
        stroke="#A0522D"
        strokeWidth="0.8"
      />
    </svg>
  );
}
