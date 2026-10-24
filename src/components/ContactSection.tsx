"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { ContactFormData } from "./contact/contact-schema";
import { ContactForm } from "./contact/ContactForm";
import { ContactSuccessView } from "./contact/ContactSuccessView";
import { ContactSidebar } from "./contact/ContactSidebar";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = "alex.rivera.craft@gmail.com";

  const handleSubmit = async (_data: ContactFormData) => {
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
            <ContactSuccessView onReset={() => setSubmitted(false)} />
          ) : (
            <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          )}
        </div>

        <ContactSidebar
          email={email}
          copied={copied}
          onCopyEmail={copyEmail}
        />
      </div>
    </div>
  );
}
