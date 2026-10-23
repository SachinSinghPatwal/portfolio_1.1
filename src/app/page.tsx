"use client";

import React from "react";
import { DashedGridBackground, DashedSection } from "@/components/aceternity/DashedBorderContainer";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CraftSection } from "@/components/CraftSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { TechStackSection } from "@/components/TechStackSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingDock } from "@/components/aceternity/FloatingDock";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#040405] overflow-x-hidden pb-24">
      <DashedGridBackground />
      <Navbar />

      <DashedSection id="work">
        <HeroSection />
      </DashedSection>

      <DashedSection id="craft">
        <CraftSection />
      </DashedSection>

      <DashedSection id="experience">
        <ExperienceSection />
      </DashedSection>

      <DashedSection>
        <TechStackSection />
      </DashedSection>

      <DashedSection id="contact">
        <ContactSection />
      </DashedSection>

      <Footer />
      <FloatingDock />
    </main>
  );
}
