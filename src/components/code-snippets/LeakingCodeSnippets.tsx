"use client";

import React from "react";
import { TypeScriptSnippet, TypeScriptSnippetProps } from "./TypeScriptSnippet";
import { JavaScriptSnippet, JavaScriptSnippetProps } from "./JavaScriptSnippet";
import { TypeScriptSnippetTwo, TypeScriptSnippetTwoProps } from "./TypeScriptSnippetTwo";

export interface LeakingCodeSnippetsProps {
  className?: string;
  tsProps?: Partial<TypeScriptSnippetProps>;
  jsProps?: Partial<JavaScriptSnippetProps>;
  tsTwoProps?: Partial<TypeScriptSnippetTwoProps>;
}

export function LeakingCodeSnippets({
  className = "",
  tsProps,
  jsProps,
  tsTwoProps,
}: LeakingCodeSnippetsProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 h-[650px] overflow-visible z-10 ${className}`}
    >
      <TypeScriptSnippet
        className={
          tsProps?.className ||
          "absolute top-24 left-0 z-10 hidden md:block"
        }
        style={tsProps?.style}
      />

      <JavaScriptSnippet
        className={
          jsProps?.className ||
          "absolute top-20 right-0 z-10 hidden md:block"
        }
        style={jsProps?.style}
      />

      <TypeScriptSnippetTwo
        className={
          tsTwoProps?.className ||
          "absolute top-[480px] right-0 z-10 hidden lg:block"
        }
        style={tsTwoProps?.style}
      />
    </div>
  );
}
