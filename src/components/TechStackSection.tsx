"use client";

import React from "react";
import { TECH_STACK_GROUPS } from "./tech-stack/tech-stack-data";
import { TechStackCard } from "./tech-stack/TechStackCard";

export function TechStackSection() {
  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
          Capabilities
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Stack &amp; Architecture</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TECH_STACK_GROUPS.map((group, idx) => (
          <TechStackCard key={idx} group={group} />
        ))}
      </div>
    </div>
  );
}
