"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZoneName: "short",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-visible">
      <div className="relative max-w-6xl mx-auto px-4 py-10 md:px-8">
        <div className="absolute left-0 top-0 bottom-0 dashed-line-v pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 dashed-line-v pointer-events-none" />
      </div>
    </footer>
  );
}
