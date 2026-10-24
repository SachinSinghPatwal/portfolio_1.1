"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="relative w-full overflow-visible">
      <div className="relative max-w-6xl mx-auto px-4 py-10 md:px-8">
        <div className="absolute left-0 top-0 bottom-0 dashed-line-v pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 dashed-line-v pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <p className="text-zinc-600 text-[11px]">
            Engineered with Next.js, Framer Motion &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
