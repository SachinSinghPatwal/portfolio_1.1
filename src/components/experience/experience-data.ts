export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "Oct 2025 — Mar 2026",
    role: "Frontend Developer",
    company: "MileWeb (Startup)",
    location: "Gujrat, Bharuch (Remote)",
    description:
      "Built e-commerce websites using React, JavaScript, HTML and CSS, with AI-powered (GPT) search and recommendation feature that helps users find relevant products faster. Developed an analytics dashboard using TypeScript, PostgreSQL, Node.js and REST APIs for managing products, reviewing user sessions to guide UI improvements. Worked with the project lead in an Agile environment, turning requirements into technical tasks and using Git, Docker and CI/CD to catch issues early and meet deadlines.",
    tags: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "AI",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Docker",
      "CI/CD",
      "Agile",
      "TypeScript",
      "REST",
      "Jest",
      "RRWeb",
      "Zod",
      "Zustand",
      "AWS",
      "Cloudflare",
    ],
  },
  {
    period: "Jun 2025 – Oct 2025",
    role: "Frontend Developer",
    company: "Contract (Startup)",
    location: "Israel (Remote)",
    description:
      "Developed and improved web pages with Next.js, React, TypeScript, JavaScript, HTML and CSS, simplifying navigation and reducing user errors for a smoother customer experience. Built reusable interface components and integrated backend REST APIs using Next.js, NoSql (MongoDB) and Node.js, with AI-assisted (GPT) debugging and testing, enabling faster features delivery and consistent UI across pages. Worked with UI/UX designers through design reviews to refine pages so they matched approved designs, delivering changes through Git and CI/CD in an Agile workflow",
    tags: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "AI",
      "Node.js",
      "Git",
      "Docker",
      "CI/CD",
      "Agile",
      "TypeScript",
      "REST",
      "Jest",
      "MongoDB",
      "GSAP",
      "Motion",
    ],
  },
];
