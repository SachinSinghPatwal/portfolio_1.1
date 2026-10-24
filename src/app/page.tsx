"use client";

import React from "react";
import { DashedGridBackground } from "@/components/aceternity/DashedGridBackground";
import { DashedSection } from "@/components/aceternity/DashedSection";
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
    <main className="relative min-h-screen bg-[#040405] overflow-x-hidden ">
      <DashedGridBackground />
      <Navbar />

      <DashedSection id="hero">
        <HeroSection />
      </DashedSection>

      {/* <DashedSection id="craft">
        <CraftSection />
      </DashedSection> */}

      <DashedSection id="experience">
        <ExperienceSection />
      </DashedSection>

      {/* <DashedSection>
        <TechStackSection />
      </DashedSection> */}

      <DashedSection id="contact">
        <ContactSection />
      </DashedSection>

      <Footer />
      <FloatingDock />
    </main>
  );
}
