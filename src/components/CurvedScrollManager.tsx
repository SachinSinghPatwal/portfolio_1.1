"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CurvedScrollManager({ children }: { children: React.ReactNode }) {
  // Spring animations for scaling left/right and vertical stretch (ZERO tilt/skew)
  const scaleXSpring = useSpring(1, { stiffness: 260, damping: 24 });
  const scaleYSpring = useSpring(1, { stiffness: 260, damping: 24 });
  const topBendSpring = useSpring(0, { stiffness: 260, damping: 24 });
  const bottomBendSpring = useSpring(0, { stiffness: 260, damping: 24 });

  const [topBend, setTopBend] = useState(0);
  const [bottomBend, setBottomBend] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let resetTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Clamped scroll velocity
      const velocity = Math.max(-60, Math.min(60, delta));

      if (Math.abs(velocity) > 0.5) {
        // Scale content on left and right like an inverted curved scroll (up to 4% wider)
        const scaleXAmount = 1 + Math.min(Math.abs(velocity) * 0.0012, 0.04);
        scaleXSpring.set(scaleXAmount);

        // Subtle vertical elastic stretch without any tilting
        const scaleYAmount = 1 + Math.min(Math.abs(velocity) * 0.0015, 0.035);
        scaleYSpring.set(scaleYAmount);

        // Inverted concave curved bend (center curves inward, left & right curve outward)
        if (velocity > 0) {
          // Scrolling down: inverted curve on top & bottom
          const bend = Math.min(Math.abs(velocity) * 0.7, 36);
          topBendSpring.set(bend);
          bottomBendSpring.set(bend * 0.7);
        } else {
          // Scrolling up: inverted curve on bottom & top
          const bend = Math.min(Math.abs(velocity) * 0.7, 36);
          bottomBendSpring.set(bend);
          topBendSpring.set(bend * 0.7);
        }

        // Snap back smoothly when scrolling settles
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          scaleXSpring.set(1);
          scaleYSpring.set(1);
          topBendSpring.set(0);
          bottomBendSpring.set(0);
        }, 90);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const unsubscribeTop = topBendSpring.on("change", (v) => setTopBend(v));
    const unsubscribeBottom = bottomBendSpring.on("change", (v) => setBottomBend(v));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (resetTimer) clearTimeout(resetTimer);
      unsubscribeTop();
      unsubscribeBottom();
    };
  }, [scaleXSpring, scaleYSpring, topBendSpring, bottomBendSpring]);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Top Inverted Curved Arch (Center dips inward, left & right flare outward) */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 z-40 h-14 overflow-hidden">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full text-[#040405] fill-current"
        >
          <path d={`M 0 0 L 100 0 L 100 0 Q 50 ${topBend} 0 0 Z`} />
        </svg>
      </div>

      {/* Bottom Inverted Curved Arch (Center dips upward, left & right flare outward) */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-14 overflow-hidden">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full text-[#040405] fill-current"
        >
          <path d={`M 0 100 L 100 100 L 100 100 Q 50 ${100 - bottomBend} 0 100 Z`} />
        </svg>
      </div>

      {/* Centered content scaled on left and right with zero tilting */}
      <motion.div
        style={{
          scaleX: scaleXSpring,
          scaleY: scaleYSpring,
          transformOrigin: "center center",
        }}
        className="w-full transition-transform will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
