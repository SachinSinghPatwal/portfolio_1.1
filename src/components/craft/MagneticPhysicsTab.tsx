"use client";

import React from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { toast } from "sonner";

export function MagneticPhysicsTab() {
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
        <div className="absolute inset-0 border border-dashed border-white/[0.06] bg-white/[0.01]" />
        <motion.div
          style={{ x: springX, y: springY }}
          whileTap={{ scale: 0.94 }}
          onClick={() =>
            toast.success("Physical spring triggered with 280 stiffness / 22 damping")
          }
          className="relative px-6 py-3 border border-white/[0.12] bg-zinc-900/80 text-white font-mono text-xs font-medium shadow-md hover:border-white/[0.25] transition-colors flex items-center gap-2 select-none"
        >
          <span className="h-1.5 w-1.5 bg-zinc-300" />
          <span>Elastic Magnetic Trigger</span>
        </motion.div>
      </div>

      <p className="font-mono text-[11px] text-zinc-500 mt-6 max-w-sm">
        Second-order differential motion equation tuned for tactile physical feedback.
      </p>
    </div>
  );
}
