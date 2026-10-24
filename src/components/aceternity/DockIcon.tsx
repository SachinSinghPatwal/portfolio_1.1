"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";

export function DockIcon({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-120, 0, 120], [40, 60, 40]);
  const heightTransform = useTransform(distance, [-120, 0, 120], [40, 60, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 12,
  });

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center rounded-xl border border-white/70 bg-white/[0.05] hover:bg-white/[0.12] hover:border-white/90 transition-colors cursor-pointer text-white shadow-sm"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md border border-white/60 bg-zinc-950/95 text-[11px] font-mono text-white whitespace-nowrap shadow-xl hidden md:block"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center pointer-events-none text-white">
        {icon}
      </div>
    </motion.div>
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick();
    }

    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        window.history.pushState(null, "", href);

        const win = window as unknown as {
          lenis?: {
            scrollTo: (
              target: Element | string | number,
              options?: {
                offset?: number;
                duration?: number;
                easing?: (t: number) => number;
                immediate?: boolean;
              }
            ) => void;
          };
        };

        if (win?.lenis && typeof win.lenis.scrollTo === "function") {
          win.lenis.scrollTo(target, {
            duration: 1.2,
          });
        } else {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }
  };

  if (href) {
    const isExternal =
      href.startsWith("http://") || href.startsWith("https://");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        className="flex items-end justify-center"
      >
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className="flex items-end justify-center">
      {content}
    </div>
  );
}
