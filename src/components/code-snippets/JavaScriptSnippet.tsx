"use client";

import React from "react";

export interface JavaScriptSnippetProps {
  className?: string;
  style?: React.CSSProperties;
}

export function JavaScriptSnippet({
  className = "absolute bottom-4 right-4 z-20",
  style,
}: JavaScriptSnippetProps) {
  return (
    <pre
      style={style}
      className={`font-mono text-[10.5px] sm:text-[11px] leading-relaxed select-none pointer-events-none whitespace-pre text-zinc-600/70 ${className}`}
    >
      <div>{"export async function dispatch(event) {"}</div>
      <div className="pl-3">{"if (event.delta > 0) return await pipeline.push("}</div>
    </pre>
  );
}
