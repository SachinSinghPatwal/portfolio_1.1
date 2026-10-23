import { create } from "zustand";

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  role: string;
  category: "Design System" | "Web App" | "Micro-tool" | "Experiment";
  tags: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  previewUrl?: string;
  healthCheckUrl?: string;
  isLive?: boolean;
  desktopOnly?: boolean;
  highlights: string[];
  gradient: string;
}

interface PortfolioStore {
  isCommandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;
  
  selectedProject: ProjectItem | null;
  setSelectedProject: (project: ProjectItem | null) => void;
  cachedProjectIds: string[];
  
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  isCommandOpen: false,
  setCommandOpen: (open) => set({ isCommandOpen: open }),
  toggleCommand: () => set((state) => ({ isCommandOpen: !state.isCommandOpen })),

  selectedProject: null,
  cachedProjectIds: [],
  setSelectedProject: (project) =>
    set((state) => ({
      selectedProject: project,
      cachedProjectIds:
        project && !state.cachedProjectIds.includes(project.id)
          ? [...state.cachedProjectIds, project.id]
          : state.cachedProjectIds,
    })),

  activeFilter: "All",
  setActiveFilter: (filter) => set({ activeFilter: filter }),
}));
