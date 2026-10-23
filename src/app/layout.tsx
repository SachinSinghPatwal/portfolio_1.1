import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Toaster } from "sonner";
import { CommandPalette } from "@/components/CommandPalette";
import { ProjectModal } from "@/components/ProjectModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Rivera — Staff Design Engineer & UI Craftsman",
  description:
    "Clean, minimal, centered dark portfolio of Alex Rivera. Specializing in high-density design systems, micro-interactions, and performant frontend architectures.",
  keywords: [
    "Design Engineer",
    "Staff Frontend Engineer",
    "Design Systems",
    "UI/UX",
    "Next.js Portfolio",
    "Framer Motion",
  ],
  authors: [{ name: "Alex Rivera" }],
  openGraph: {
    title: "Alex Rivera — Design Engineer Portfolio",
    description: "Designing software with tactile weight and clarity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#040405] text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white">
        <SmoothScrollProvider>
          {children}
          <CommandPalette />
          <ProjectModal />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#09090b",
                border: "1px solid #27272a",
                color: "#f4f4f5",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
              },
            }}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
