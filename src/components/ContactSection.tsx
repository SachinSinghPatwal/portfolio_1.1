"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, Copy, Check, Mail, Clock } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select an inquiry type"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = "alex.rivera.craft@gmail.com";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectType: "Design System",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setSubmitted(true);

    toast.success("Message dispatched successfully", {
      description: "Thanks for reaching out! I typically respond within 24 hours.",
      duration: 4000,
    });

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.7 },
      colors: ["#ffffff", "#a1a1aa", "#71717a"],
    });

    reset();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
          Contact
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Initiate Discussion</h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg leading-relaxed">
          Open for select design engineering contracts and advisory. Fill out the brief below or write directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        <div className="md:col-span-3">
          {submitted ? (
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center flex flex-col items-center">
              <CheckCircle2 className="h-8 w-8 text-zinc-300 mb-3" />
              <h3 className="text-base font-semibold text-white">Inquiry Dispatched</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                Your message has been sent directly. I look forward to connecting.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-4 py-2 text-xs font-mono rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-300 hover:text-white hover:border-white/[0.18]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Jane Doe"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white/[0.02] text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors ${
                      errors.name ? "border-rose-500/80" : "border-white/[0.07] focus:border-white/[0.2]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[10px] font-mono text-rose-400 mt-1">{errors.name.message}</p>
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
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white/[0.02] text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors ${
                      errors.email ? "border-rose-500/80" : "border-white/[0.07] focus:border-white/[0.2]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] font-mono text-rose-400 mt-1">{errors.email.message}</p>
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.07] bg-black text-xs text-zinc-300 focus:outline-none focus:border-white/[0.2]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.07] bg-black text-xs text-zinc-300 focus:outline-none focus:border-white/[0.2]"
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
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white/[0.02] text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors ${
                    errors.message ? "border-rose-500/80" : "border-white/[0.07] focus:border-white/[0.2]"
                  }`}
                />
                {errors.message && (
                  <p className="text-[10px] font-mono text-rose-400 mt-1">{errors.message.message}</p>
                )}
              </div>

              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-sm"
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
          )}
        </div>

        
        <div className="md:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.015]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
              <Mail className="h-3.5 w-3.5 text-zinc-400" />
              <span>Direct Electronic Mail</span>
            </div>
            <p className="font-mono text-xs text-zinc-200 select-all mb-3">{email}</p>
            <button
              onClick={copyEmail}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 text-xs font-mono transition-colors"
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

          <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.015]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
              <Clock className="h-3.5 w-3.5 text-zinc-400" />
              <span>Turnaround Guarantee</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All messages receive an individual human response within 24 hours. NDAs accommodated on request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
