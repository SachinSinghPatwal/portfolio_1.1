"use client";

import React from "react";
import { FaCss3Alt } from "react-icons/fa6";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiReact,
  SiTailwindcss,
  SiBabel,
  SiVite,
  SiGreensock,
  SiWebgl,
  SiThreedotjs,
  SiFramer,
  SiNextdotjs,
  SiFigma,
  SiRadixui,
  SiMongodb,
  SiRabbitmq,
  SiGithubactions,
  SiZod,
} from "react-icons/si";
import { TbDatabase, TbLayoutDashboard } from "react-icons/tb";
import { AcornIcon } from "./icons/AcornIcon";
import { PlaywrightIcon } from "./icons/PlaywrightIcon";
import { ZustandIcon } from "./icons/ZustandIcon";
import { GuiIcon } from "./icons/GuiIcon";
import { MernIcon } from "./icons/MernIcon";
import { FallbackTechIcon } from "./icons/FallbackTechIcon";

export function TechIconRenderer({
  tag,
  className = "size-3.5",
}: {
  tag: string;
  className?: string;
}) {
  const normalized = tag.toLowerCase().replace(/[\s\-_.]/g, "");

  switch (normalized) {
    case "js":
    case "javascript":
      return <SiJavascript className={`${className} text-[#F7DF1E]`} />;
    case "ts":
    case "typescript":
      return <SiTypescript className={`${className} text-[#3178C6]`} />;
    case "html":
    case "html5":
      return <SiHtml5 className={`${className} text-[#E34F26]`} />;
    case "css":
    case "css3":
      return <FaCss3Alt className={`${className} text-[#1572B6]`} />;
    case "acorn":
      return <AcornIcon className={className} />;
    case "babel":
      return <SiBabel className={`${className} text-[#F9DC3E]`} />;
    case "tailwindcss":
    case "tailwind":
      return <SiTailwindcss className={`${className} text-[#06B6D4]`} />;
    case "react":
    case "react19":
      return <SiReact className={`${className} text-[#61DAFB]`} />;
    case "zustand":
      return <ZustandIcon className={className} />;
    case "motion":
    case "framermotion":
      return <SiFramer className={`${className} text-[#0055FF]`} />;
    case "mern":
      return <MernIcon className={className} />;
    case "mongodb":
      return <SiMongodb className={`${className} text-[#47A248]`} />;
    case "playwright":
      return <PlaywrightIcon className={className} />;
    case "rabbitmq":
      return <SiRabbitmq className={`${className} text-[#FF6600]`} />;
    case "cicd":
    case "ci":
    case "cd":
      return <SiGithubactions className={`${className} text-[#2088FF]`} />;
    case "zod":
      return <SiZod className={`${className} text-[#3E67B1]`} />;
    case "gsap":
    case "scrolltrigger":
      return <SiGreensock className={`${className} text-[#88CE02]`} />;
    case "webgl":
    case "webgpu":
      return <SiWebgl className={`${className} text-[#990000]`} />;
    case "threejs":
    case "threedotjs":
    case "three":
      return <SiThreedotjs className={`${className} text-white`} />;
    case "gui":
    case "lilgui":
      return <GuiIcon className={`${className} text-zinc-300`} />;
    case "vite":
      return <SiVite className={`${className} text-[#646CFF]`} />;
    case "nextjs":
    case "nextdotjs":
      return <SiNextdotjs className={`${className} text-white`} />;
    case "figma":
      return <SiFigma className={`${className} text-[#F24E1E]`} />;
    case "radix":
      return <SiRadixui className={`${className} text-white`} />;
    case "dashboard":
      return <TbLayoutDashboard className={className} />;
    case "database":
    case "cms":
      return <TbDatabase className={className} />;
    default:
      return <FallbackTechIcon tag={tag} className={className} />;
  }
}
