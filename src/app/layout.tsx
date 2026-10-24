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
  title: "Sachin Singh Patwal — Full Stack Developer",
  description:
    "Clean, minimal, centered dark portfolio of Sachin Singh Patwal — Full Stack Developer.",
  keywords: [
    "Full Stack Developer",
    "Full Stack Engineer",
    "Frontend Engineer",
    "Backend Architecture",
    "Design Systems",
    "Next.js Portfolio",
    "React",
    "TypeScript",
    "Framer Motion",
  ],
  authors: [{ name: "Sachin Singh Patwal" }],
  openGraph: {
    title: "Sachin Singh Patwal — Full Stack Developer Portfolio",
    description: "I build fast, scalable and beautiful full-stack web applications.",
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
