"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import {
  Search,
  Mail,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { CommandAction } from "./command-palette/types";
import { CommandPaletteItem } from "./command-palette/CommandPaletteItem";

export function CommandPalette() {
  const { isCommandOpen, setCommandOpen } = usePortfolioStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(!isCommandOpen);
      }
      if (e.key === "Escape" && isCommandOpen) {
        setCommandOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandOpen, setCommandOpen]);

  if (!isCommandOpen) return null;

  const actions: CommandAction[] = [
    {
      id: "work",
      label: "Jump to Selected Works",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        setCommandOpen(false);
        const win = window as unknown as {
          lenis?: { scrollTo: (t: string | Element) => void };
        };
        if (win?.lenis) {
          win.lenis.scrollTo("#work");
        } else {
          document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", "#work");
      },
    },
    {
      id: "craft",
      label: "Explore Interactive Craft Lab",
      category: "Navigation",
      icon: Sparkles,
      action: () => {
        setCommandOpen(false);
        const win = window as unknown as {
          lenis?: { scrollTo: (t: string | Element) => void };
        };
        if (win?.lenis) {
          win.lenis.scrollTo("#craft");
        } else {
          document.querySelector("#craft")?.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", "#craft");
      },
    },
    {
      id: "experience",
      label: "Review Timeline & Experience",
      category: "Navigation",
      icon: Layers,
      action: () => {
        setCommandOpen(false);
        const win = window as unknown as {
          lenis?: { scrollTo: (t: string | Element) => void };
        };
        if (win?.lenis) {
          win.lenis.scrollTo("#experience");
        } else {
          document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", "#experience");
      },
    },
    {
      id: "contact",
      label: "Open Inquiry Form",
      category: "Navigation",
      icon: Mail,
      action: () => {
        setCommandOpen(false);
        const win = window as unknown as {
          lenis?: { scrollTo: (t: string | Element) => void };
        };
        if (win?.lenis) {
          win.lenis.scrollTo("#contact");
        } else {
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", "#contact");
      },
    },
    {
      id: "copy-email",
      label: "Copy Direct Email (alex.rivera.craft@gmail.com)",
      category: "Actions",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText("alex.rivera.craft@gmail.com");
        toast.success("Email copied to clipboard");
        setCommandOpen(false);
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-lg border border-white/[0.08] bg-zinc-950 shadow-2xl overflow-hidden z-10"
        >
          <div className="flex items-center px-4 border-b border-white/[0.07]">
            <Search className="h-4 w-4 text-zinc-500 mr-2 shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or jump to section..."
              className="w-full py-3.5 bg-transparent text-xs text-white placeholder:text-zinc-600 focus:outline-none font-mono"
            />
            <button
              onClick={() => setCommandOpen(false)}
              className="text-[10px] font-mono px-1.5 py-0.5 border border-white/[0.08] text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              ESC
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-zinc-500">
                No commands matching &ldquo;{query}&rdquo;
              </div>
            ) : (
              filtered.map((item) => (
                <CommandPaletteItem key={item.id} item={item} />
              ))
            )}
          </div>

          <div className="px-4 py-2 border-t border-white/[0.05] bg-white/[0.01] flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>Navigation &amp; Shortcuts</span>
            <span>Press ↵ to run</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
