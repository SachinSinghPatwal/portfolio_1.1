import { Layers, Terminal, Cpu, LucideIcon } from "lucide-react";

export interface TechStackGroup {
  title: string;
  icon: LucideIcon;
  items: string[];
}

export const TECH_STACK_GROUPS: TechStackGroup[] = [
  {
    title: "Design & Systems",
    icon: Layers,
    items: [
      "Figma",
      "Framer",
      "Design Systems",
      "Typography",
      "Motion Choreography",
      "Design Tokens",
    ],
  },
  {
    title: "Frontend Engineering",
    icon: Terminal,
    items: [
      "Next.js (App Router)",
      "React 19",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Lenis",
      "Radix Primitives",
    ],
  },
  {
    title: "Architecture & Core",
    icon: Cpu,
    items: [
      "TypeScript",
      "Zustand",
      "React Hook Form",
      "Zod",
      "WebGL / Three.js",
      "Vite",
      "Turborepo",
    ],
  },
];
