"use client";

import React from "react";

export interface TypeScriptSnippetProps {
  className?: string;
  style?: React.CSSProperties;
}

export function TypeScriptSnippet({
  className = "absolute top-4 left-4 z-20",
  style,
}: TypeScriptSnippetProps) {
  return (
    <pre
      style={style}
      className={`font-mono text-[10.5px] sm:text-[11px] leading-relaxed select-none pointer-events-none whitespace-pre text-zinc-600/70 ${className}`}
    >
      <div>
        {
          "export default function RaceForResponseOrTimeOut<T>(process: Promise<T>,): "
        }
      </div>
      <div className="pl-3">
        {"Promise<T> {return Promise.race([process, TimeOut()]);}"}
      </div>
    </pre>
  );
}
