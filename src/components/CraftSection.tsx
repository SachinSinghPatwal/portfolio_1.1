"use client";

import React, { useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { toast } from "sonner";

export function CraftSection() {
  
  const [sliderVal, setSliderVal] = useState(64);
  const [activeTab, setActiveTab] = useState<"spring" | "matrix">("spring");

  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22 });
  const springY = useSpring(y, { stiffness: 280, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
            Interactive Playground
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Micro-Interactions &amp; Craft</h2>
        </div>

        
        <div className="flex gap-1 bg-white/[0.02] p-1 rounded-lg border border-white/[0.07]">
          <button
            onClick={() => setActiveTab("spring")}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              activeTab === "spring" ? "bg-white/[0.1] text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Magnetic Physics
          </button>
          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              activeTab === "matrix" ? "bg-white/[0.1] text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Fluid Dynamics
          </button>
        </div>
      </div>

      
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.025] p-6 md:p-8 relative overflow-hidden transition-all duration-300">
        {activeTab === "spring" && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="text-xs font-mono text-zinc-500 mb-6 flex items-center gap-1.5">
              <MousePointerClick className="h-3.5 w-3.5 text-zinc-400" />
              Hover &amp; pull the magnetic element below
            </span>

            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative p-10 flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.01]" />
              <motion.div
                style={{ x: springX, y: springY }}
                whileTap={{ scale: 0.94 }}
                onClick={() => toast.success("Physical spring triggered with 280 stiffness / 22 damping")}
                className="relative px-6 py-3 rounded-xl border border-white/[0.12] bg-zinc-900/80 text-white font-mono text-xs font-medium shadow-md hover:border-white/[0.25] transition-colors flex items-center gap-2 select-none"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                <span>Elastic Magnetic Trigger</span>
              </motion.div>
            </div>

            <p className="font-mono text-[11px] text-zinc-500 mt-6 max-w-sm">
              Second-order differential motion equation tuned for tactile physical feedback.
            </p>
          </div>
        )}

        {activeTab === "matrix" && (
          <div className="py-6 flex flex-col items-center max-w-md mx-auto">
            <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-400 mb-4">
              <span>Haptic Threshold</span>
              <span className="text-white font-semibold">{sliderVal}%</span>
            </div>

            
            <div className="relative w-full py-4">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-white focus:outline-none"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-zinc-400 rounded-lg pointer-events-none transition-all"
                style={{ width: `${sliderVal}%` }}
              />
            </div>

            <div className="w-full grid grid-cols-3 gap-2 mt-6">
              {[25, 50, 75].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setSliderVal(preset)}
                  className={`py-1.5 text-[11px] font-mono rounded border transition-colors ${
                    sliderVal === preset
                      ? "border-white/[0.25] bg-white/[0.08] text-white"
                      : "border-white/[0.06] bg-white/[0.02] text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  Preset {preset}%
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
