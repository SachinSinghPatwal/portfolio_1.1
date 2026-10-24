"use client";

import React, { useState } from "react";
import { MagneticPhysicsTab } from "./craft/MagneticPhysicsTab";
import { FluidDynamicsTab } from "./craft/FluidDynamicsTab";

export function CraftSection() {
  const [activeTab, setActiveTab] = useState<"spring" | "matrix">("spring");

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
            Interactive Playground
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Micro-Interactions &amp; Craft
          </h2>
        </div>

        <div className="flex gap-1 bg-white/[0.02] p-1 border border-white/[0.07]">
          <button
            onClick={() => setActiveTab("spring")}
            className={`px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
              activeTab === "spring"
                ? "bg-white/[0.1] text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Magnetic Physics
          </button>
          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
              activeTab === "matrix"
                ? "bg-white/[0.1] text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Fluid Dynamics
          </button>
        </div>
      </div>

      <div className="border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.025] p-6 md:p-8 relative overflow-hidden transition-all duration-300">
        {activeTab === "spring" && <MagneticPhysicsTab />}
        {activeTab === "matrix" && <FluidDynamicsTab />}
      </div>
    </div>
  );
}
