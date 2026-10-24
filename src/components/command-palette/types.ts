import { LucideIcon } from "lucide-react";

export interface CommandAction {
  id: string;
  label: string;
  category: string;
  icon: LucideIcon;
  action: () => void;
}
