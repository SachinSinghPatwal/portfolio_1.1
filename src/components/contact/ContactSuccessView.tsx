"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function ContactSuccessView({ onReset }: { onReset: () => void }) {
  return (
    <div className="p-8 border border-white/[0.08] bg-white/[0.02] text-center flex flex-col items-center">
      <CheckCircle2 className="h-8 w-8 text-zinc-300 mb-3" />
      <h3 className="text-base font-semibold text-white">Inquiry Dispatched</h3>
      <p className="text-xs text-zinc-400 mt-1 max-w-xs">
        Your message has been sent directly. I look forward to connecting.
      </p>
      <button
        onClick={onReset}
        className="mt-6 px-4 py-2 text-xs font-mono border border-white/[0.08] bg-white/[0.04] text-zinc-300 hover:text-white hover:border-white/[0.18]"
      >
        Send Another Message
      </button>
    </div>
  );
}
