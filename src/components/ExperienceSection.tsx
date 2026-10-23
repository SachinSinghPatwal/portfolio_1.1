"use client";

import React from "react";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    period: "2023 — Present",
    role: "Staff Design Engineer",
    company: "Vesper Labs",
    location: "San Francisco, CA (Remote)",
    description:
      "Spearheaded design system architecture and high-performance WebGL interfaces. Partnered directly with CEO and core product team to elevate interaction fidelity and component accessibility.",
    tags: ["Design Systems", "Next.js", "WebGL", "Framer Motion", "Turborepo"],
  },
  {
    period: "2021 — 2023",
    role: "Senior UI/UX Engineer",
    company: "Linear Systems Inc.",
    location: "New York, NY",
    description:
      "Built custom token pipeline syncing Figma tokens to CSS/Tailwind variables. Rebuilt the web app command palette (⌘K) and keyboard navigation engine.",
    tags: ["TypeScript", "Tailwind CSS", "Keyboard Navigation", "WCAG 2.1"],
  },
  {
    period: "2019 — 2021",
    role: "Product Designer & Frontend Dev",
    company: "Hyperion Digital",
    location: "Austin, TX",
    description:
      "Designed and shipped consumer-facing SaaS applications and analytics dashboards. Created responsive UI kits utilized across 15+ client projects.",
    tags: ["React", "CSS Architecture", "Design Prototyping", "Figma"],
  },
];

export function ExperienceSection() {
  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
          Milestones
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Experience</h2>
      </div>

      <div className="relative pl-6 border-l border-dashed border-white/[0.07] space-y-9">
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="relative group">
            
            <div className="absolute -left-[30px] top-1.5 h-2.5 w-2.5 border border-white/[0.15] bg-black group-hover:border-white/[0.4] transition-colors" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-zinc-500 mb-1.5">
              <span className="text-zinc-400">{exp.period}</span>
              <span className="text-zinc-500">{exp.location}</span>
            </div>

            <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
              <span>{exp.role}</span>
              <span className="text-zinc-600">at</span>
              <span className="text-zinc-300">{exp.company}</span>
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-mono text-zinc-500 bg-white/[0.02] border border-white/[0.05]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
