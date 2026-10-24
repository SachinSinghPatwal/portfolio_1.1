"use client";

import React, { useState } from "react";

export function FluidDynamicsTab() {
  const [sliderVal, setSliderVal] = useState(64);

  return (
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
          className="w-full h-1.5 bg-zinc-900 appearance-none cursor-pointer accent-white focus:outline-none"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-zinc-400 pointer-events-none transition-all"
          style={{ width: `${sliderVal}%` }}
        />
      </div>

      <div className="w-full grid grid-cols-3 gap-2 mt-6">
        {[25, 50, 75].map((preset) => (
          <button
            key={preset}
            onClick={() => setSliderVal(preset)}
            className={`py-1.5 text-[11px] font-mono border transition-colors cursor-pointer ${
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
  );
}
