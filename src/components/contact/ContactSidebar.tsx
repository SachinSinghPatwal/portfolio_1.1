"use client";

import React from "react";
import { Mail, Clock, Check, Copy } from "lucide-react";

interface ContactSidebarProps {
  email: string;
  copied: boolean;
  onCopyEmail: () => void;
}

export function ContactSidebar({
  email,
  copied,
  onCopyEmail,
}: ContactSidebarProps) {
  return (
    <div className="md:col-span-2 space-y-4">
      <div className="p-5 border border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
          <Mail className="h-3.5 w-3.5 text-zinc-400" />
          <span>Direct Electronic Mail</span>
        </div>
        <p className="font-mono text-xs text-zinc-200 select-all mb-3">{email}</p>
        <button
          onClick={onCopyEmail}
          className="w-full flex items-center justify-center gap-1.5 py-2 border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 text-xs font-mono transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-zinc-200" />
              <span className="text-zinc-200">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-zinc-400" />
              <span>Copy Address</span>
            </>
          )}
        </button>
      </div>

      <div className="p-5 border border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
          <Clock className="h-3.5 w-3.5 text-zinc-400" />
          <span>Turnaround Guarantee</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          All messages receive an individual human response within 24 hours. NDAs accommodated on request.
        </p>
      </div>
    </div>
  );
}
