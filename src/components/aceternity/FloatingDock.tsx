"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Briefcase, Sparkles, Layers, Mail, Command } from "lucide-react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { usePortfolioStore } from "@/store/usePortfolioStore";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

function DockIcon({
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
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md border border-white/60 bg-zinc-950/95 text-[11px] font-mono text-white whitespace-nowrap shadow-xl"
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

  if (href) {
    return (
      <a href={href} className="flex items-end justify-center">
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

export function FloatingDock({ className = "" }: { className?: string }) {
  const mouseX = useMotionValue(Infinity);
  const { toggleCommand } = usePortfolioStore();

  const items: DockItem[] = [
    {
      title: "Top / Overview",
      icon: <Home className="h-4 w-4" />,
      href: "#",
    },
    {
      title: "Selected Works",
      icon: <Briefcase className="h-4 w-4" />,
      href: "#work",
    },
    {
      title: "Interactive Craft",
      icon: <Sparkles className="h-4 w-4" />,
      href: "#craft",
    },
    {
      title: "Experience",
      icon: <Layers className="h-4 w-4" />,
      href: "#experience",
    },
    {
      title: "Direct Contact",
      icon: <Mail className="h-4 w-4" />,
      href: "#contact",
    },
    {
      title: "Command Palette (⌘K)",
      icon: <Command className="h-4 w-4" />,
      onClick: toggleCommand,
    },
    {
      title: "GitHub Repository",
      icon: <FaGithub className="h-4 w-4" />,
      href: "https://github.com",
    },
    {
      title: "X / Twitter",
      icon: <FaXTwitter className="h-4 w-4" />,
      href: "https://twitter.com",
    },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4",
        className,
      )}
    >
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end h-16 gap-2.5 px-3 pb-3 rounded-2xl border border-white/40 bg-black/80 backdrop-blur-2xl shadow-2xl shadow-black/80"
      >
        {items.map((item) => (
          <React.Fragment key={item.title}>
            <DockIcon
              mouseX={mouseX}
              title={item.title}
              icon={item.icon}
              href={item.href}
              onClick={item.onClick}
            />
          </React.Fragment>
        ))}
      </motion.nav>
    </div>
  );
}
