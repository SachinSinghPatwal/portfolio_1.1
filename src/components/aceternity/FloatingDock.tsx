"use client";

import React from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Briefcase, Mail, FolderBookmark, File } from "lucide-react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { DockIcon } from "./DockIcon";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export function FloatingDock({ className = "" }: { className?: string }) {
  const mouseX = useMotionValue(Infinity);

  const items: DockItem[] = [
    {
      title: "Work",
      icon: <FolderBookmark className="h-4 w-4" />,
      href: "#work",
    },
    {
      title: "Experience",
      icon: <Briefcase className="h-4 w-4" />,
      href: "#experience",
    },
    {
      title: "Contact",
      icon: <Mail className="h-4 w-4" />,
      href: "#contact",
    },
    {
      title: "Resume",
      icon: <File className="h-4 w-4" />,
      href: "https://drive.google.com/file/d/1gFVarOUavAghFUYxRCG-PfXZvGunYRxV/view?usp=drive_link",
    },
    {
      title: "GitHub",
      icon: <FaGithub className="h-4 w-4" />,
      href: "https://github.com/SachinSinghPatwal",
    },
    {
      title: "X / Twitter",
      icon: <FaXTwitter className="h-4 w-4" />,
      href: "https://x.com/Sachin_S_Patwal",
    },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-3 sm:bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-2 sm:px-4",
        className,
      )}
    >
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end h-14 sm:h-16 gap-1.5 sm:gap-2.5 px-2.5 sm:px-3 pb-2.5 sm:pb-3 rounded-2xl border border-white/40 bg-black/85 backdrop-blur-2xl shadow-2xl shadow-black/80 max-w-[calc(100vw-1.5rem)]"
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
