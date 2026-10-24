"use client";

import React from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Briefcase, Sparkles, Layers, Mail, Command } from "lucide-react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { DockIcon } from "./DockIcon";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
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
