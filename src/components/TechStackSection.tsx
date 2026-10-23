"use client";

import React from "react";
import { Layers, Terminal, Cpu } from "lucide-react";

export function TechStackSection() {
  const groups = [
    {
      title: "Design & Systems",
      icon: Layers,
      items: ["Figma", "Framer", "Design Systems", "Typography", "Motion Choreography", "Design Tokens"],
    },
    {
      title: "Frontend Engineering",
      icon: Terminal,
      items: ["Next.js (App Router)", "React 19", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis", "Radix Primitives"],
    },
    {
      title: "Architecture & Core",
      icon: Cpu,
      items: ["TypeScript", "Zustand", "React Hook Form", "Zod", "WebGL / Three.js", "Vite", "Turborepo"],
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
          Capabilities
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Stack &amp; Architecture</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groups.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-semibold mb-4">
                  <Icon className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{group.title}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded text-[11px] font-mono text-zinc-400 bg-white/[0.02] border border-white/[0.05] hover:text-white hover:border-white/[0.15] transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
