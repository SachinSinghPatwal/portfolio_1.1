"use client";

import React from "react";

export interface TypeScriptSnippetTwoProps {
  className?: string;
  style?: React.CSSProperties;
}

export function TypeScriptSnippetTwo({
  className = "absolute top-[480px] right-0 z-10",
  style,
}: TypeScriptSnippetTwoProps) {
  return (
    <pre
      style={style}
      className={`font-mono text-[12px] sm:text-[13px] leading-relaxed select-none pointer-events-auto whitespace-pre text-zinc-500/80 ${className}`}
    >
      <div>{"// Atomic state synchronizer"}</div>
      <div>{"export class StateSync<T> {"}</div>
      <div className="pl-4">{"private state: T;"}</div>
      <div className="pl-4">{"constructor(initial: T) {"}</div>
      <div className="pl-8">{"this.state = initial;"}</div>
      <div className="pl-4">{"}"}</div>
      <div className="pl-4">{"public mutate(fn: (s: T) => T): void {"}</div>
      <div className="pl-8">{"this.state = fn(this.state);"}</div>
      <div className="pl-4">{"}"}</div>
      <div>{"}"}</div>
    </pre>
  );
}
