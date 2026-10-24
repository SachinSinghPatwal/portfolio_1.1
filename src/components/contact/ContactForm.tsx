"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { contactSchema, ContactFormData } from "./contact-schema";

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function ContactForm({ onSubmit, isSubmitting }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectType: "Design System",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-mono text-zinc-400 mb-1.5">
            Your Name *
          </label>
          <input
            {...register("name")}
            placeholder="Jane Doe"
            className={`w-full px-3.5 py-2.5 border bg-white/[0.02] text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors ${
              errors.name
                ? "border-rose-500/80"
                : "border-white/[0.07] focus:border-white/[0.2]"
            }`}
          />
          {errors.name && (
            <p className="text-[10px] font-mono text-rose-400 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-400 mb-1.5">
            Email Address *
          </label>
          <input
            {...register("email")}
            placeholder="jane@domain.com"
            type="email"
            className={`w-full px-3.5 py-2.5 border bg-white/[0.02] text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors ${
              errors.email
                ? "border-rose-500/80"
                : "border-white/[0.07] focus:border-white/[0.2]"
            }`}
          />
          {errors.email && (
            <p className="text-[10px] font-mono text-rose-400 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-mono text-zinc-400 mb-1.5">
            Inquiry Scope
          </label>
          <select
            {...register("projectType")}
            className="w-full px-3.5 py-2.5 border border-white/[0.07] bg-black text-xs text-zinc-300 focus:outline-none focus:border-white/[0.2]"
          >
            <option value="Design System">Design System Architecture</option>
            <option value="Frontend Development">Full Frontend Development</option>
            <option value="Interaction Design">Micro-interactions &amp; Motion</option>
            <option value="Advisory">Code / Design Advisory</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-400 mb-1.5">
            Approximate Timeline
          </label>
          <select
            {...register("budget")}
            className="w-full px-3.5 py-2.5 border border-white/[0.07] bg-black text-xs text-zinc-300 focus:outline-none focus:border-white/[0.2]"
          >
            <option value="Immediate">Immediate (&lt; 2 weeks)</option>
            <option value="Next Month">Next Month</option>
            <option value="Q3/Q4">Flexible Q3/Q4</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-zinc-400 mb-1.5">
          Project Brief *
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Outline key goals, deliverables, and constraints..."
          className={`w-full px-3.5 py-2.5 border bg-white/[0.02] text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors ${
            errors.message
              ? "border-rose-500/80"
              : "border-white/[0.07] focus:border-white/[0.2]"
          }`}
        />
        {errors.message && (
          <p className="text-[10px] font-mono text-rose-400 mt-1">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-sm cursor-pointer"
      >
        {isSubmitting ? (
          <span>Sending inquiry...</span>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
