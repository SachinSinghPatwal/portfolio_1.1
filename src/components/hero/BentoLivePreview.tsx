"use client";

import React, { useState, useEffect, useRef } from "react";
import { RotateCw } from "lucide-react";

export function BentoLivePreview({
  previewUrl,
  title,
}: {
  previewUrl: string;
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Safety fallback: auto-reveal preview after 1s so it never stays stuck
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [previewUrl]);

  return (
    <div className="relative w-full flex-1 min-h-[140px] md:min-h-[160px] overflow-visible bg-[#040405]">
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#040405] transition-opacity duration-300 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <RotateCw className="h-4 w-4 animate-spin text-zinc-500" />
      </div>
      <iframe
        ref={iframeRef}
        src={previewUrl}
        title={title}
        onLoad={() => {
          setTimeout(() => setLoaded(true), 300);
        }}
        className={`w-[300%] h-[300%] origin-top-left scale-[0.333333] border-0 pointer-events-none select-none bg-[#040405] transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          colorScheme: "dark",
          backgroundColor: "#040405",
        }}
        tabIndex={-1}
        loading="eager"
      />
    </div>
  );
}
