"use client";
import { DashedGridBackground } from "@/components/aceternity/DashedGridBackground";
import { DashedSection } from "@/components/aceternity/DashedSection";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingDock } from "@/components/aceternity/FloatingDock";

import {
  TypeScriptSnippet,
  JavaScriptSnippet,
} from "@/components/code-snippets";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#040405] overflow-x-hidden ">
      {/* Half-written tiny code snippets: top-left corner & bottom-right corner of the site */}
      <TypeScriptSnippet
        className="absolute top-20 left-5 z-20 hidden sm:block"
      />
      <TypeScriptSnippet
        className="absolute top-48/100 right-1/5 bottom-1/2 z-20 hidden sm:block"
      />
      <JavaScriptSnippet
        className="absolute bottom-25 right-3 z-20 hidden sm:block"
      />
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
