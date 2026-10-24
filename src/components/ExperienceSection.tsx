"use client";
import { EXPERIENCES } from "./experience/experience-data";
import { ExperienceCard } from "./experience/ExperienceCard";

export function ExperienceSection() {
  return (
    <div>
      <div className="my-4">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Experience
        </h2>
      </div>

      <div className="relative pl-6 mb-4 border-l border-dashed  border-white/[0.07] space-y-9">
        {EXPERIENCES.map((exp, idx) => (
          <ExperienceCard key={idx} exp={exp} />
        ))}
      </div>
    </div>
  );
}
