"use client";

import React from "react";

export interface CssSnippetProps {
  className?: string;
  style?: React.CSSProperties;
}

export function CssSnippet({
  className = "absolute top-[480px] right-0 z-10",
  style,
}: CssSnippetProps) {
  return (
    <pre
      style={style}
      className={`font-mono text-[12px] sm:text-[13px] leading-relaxed select-none pointer-events-auto whitespace-pre text-zinc-500/80 ${className}`}
    >
      <div>{"/* Tactile glass layer */"}</div>
      <div>{".ambient-glass {"}</div>
      <div className="pl-4">{"position: relative;"}</div>
      <div className="pl-4">{"background: #00f2fe15;"}</div>
      <div className="pl-4">{"backdrop-filter: blur(16px);"}</div>
      <div className="pl-4">{"border: 1px solid #ffffff15;"}</div>
      <div className="pl-4">{"will-change: transform;"}</div>
      <div>{"}"}</div>
    </pre>
  );
}
