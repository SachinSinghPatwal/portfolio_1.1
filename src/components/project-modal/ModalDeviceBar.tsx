"use client";

import React from "react";
import {
  X,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Lock,
  Copy,
  Maximize2,
  Minimize2,
} from "lucide-react";

export type DeviceMode = "desktop" | "tablet" | "mobile";

interface ModalDeviceBarProps {
  activeDevice: DeviceMode;
  isDesktopOnly: boolean;
  setDevice: (d: DeviceMode) => void;
  previewUrl?: string;
  liveUrl?: string;
  onCopyUrl: (url?: string) => void;
  onReload: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onClose: () => void;
}

export function ModalDeviceBar({
  activeDevice,
  isDesktopOnly,
  setDevice,
  previewUrl,
  liveUrl,
  onCopyUrl,
  onReload,
  isFullscreen,
  onToggleFullscreen,
  onClose,
}: ModalDeviceBarProps) {
  const currentUrl = previewUrl || liveUrl || "https://preview.local";

  return (
    <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 border-b border-white/[0.06] bg-[#09090b] text-xs font-mono shrink-0">
      <div className="hidden sm:flex items-center gap-1 bg-white/[0.02] p-0.5 border border-white/[0.06]">
        <button
          type="button"
          onClick={() => setDevice("desktop")}
          className={`p-1.5 transition-colors cursor-pointer ${
            activeDevice === "desktop"
              ? "bg-white/[0.1] text-white"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
          title="Desktop Preview (100%)"
        >
          <Monitor className="h-3.5 w-3.5" />
        </button>
        {!isDesktopOnly && (
          <>
            <button
              type="button"
              onClick={() => setDevice("tablet")}
              className={`p-1.5 transition-colors cursor-pointer ${
                activeDevice === "tablet"
                  ? "bg-white/[0.1] text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Tablet Viewport (768px)"
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              className={`p-1.5 transition-colors cursor-pointer ${
                activeDevice === "mobile"
                  ? "bg-white/[0.1] text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Mobile Viewport (375px)"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>

      <div className="flex-1 max-w-lg mx-2 flex items-center justify-between px-3 py-1 border border-white/[0.08] bg-black/60 text-zinc-400 text-[11px]">
        <div className="flex items-center gap-2 truncate">
          <Lock className="h-3 w-3 text-zinc-500 shrink-0" />
          <span className="truncate">{currentUrl}</span>
        </div>
        <button
          type="button"
          onClick={() => onCopyUrl(previewUrl || liveUrl)}
          className="ml-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
          title="Copy URL"
        >
          <Copy className="h-3 w-3" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReload}
          className="p-1.5 border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
          title="Reload live preview"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={onToggleFullscreen}
          className="p-1.5 border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
        >
          {isFullscreen ? (
            <Minimize2 className="h-3.5 w-3.5" />
          ) : (
            <Maximize2 className="h-3.5 w-3.5" />
          )}
        </button>

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
            title="Open in new window"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
