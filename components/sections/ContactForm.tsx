"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { contact, contactSection } from "@/content/site";
import { EASE_EXPO } from "@/lib/motion";
import Pill from "@/components/ui/Pill";
import { IconCheck } from "@/components/ui/Glyph";
import { FieldWrap, Select, TextArea, TextInput } from "@/components/ui/Field";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<
  Record<"name" | "email" | "phone" | "projectType" | "budget" | "details", string>
>;

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  details: "",
  // Honeypot. Real people never see it, bots fill it in.
  company: "",
};

const form = contactSection.form;

export default function ContactForm({ onDone }: { onDone?: () => void }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const set = (key: keyof typeof EMPTY) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    // Optional — only checked when something was actually typed.
    const phone = values.phone.trim();
    if (phone && !/^\+?[\d\s().-]{7,20}$/.test(phone))
      next.phone = "Please enter a valid phone number, or leave it blank.";
    if (!values.projectType) next.projectType = "Pick the closest match.";
    if (values.details.trim().length < 20)
      next.details = "A couple of sentences helps me reply properly.";
    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first problem field so keyboard users aren't stranded.
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: Errors;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerMessage(data.message ?? null);
        setStatus("error");
        return;
      }

      setValues(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const busy = status === "sending";

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="flex min-h-[18rem] flex-col items-center justify-center gap-5 px-2 text-center"
        >
          <span className="grid size-14 place-items-center rounded-full bg-brand/15 text-brand-soft ring-1 ring-brand/40">
            <IconCheck className="size-6" />
          </span>
          <div>
            <p className="headline headline-md font-semibold">{form.successTitle}</p>
            <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-white/55">
              {form.successBody}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Pill variant="outline" size="md" onClick={() => setStatus("idle")}>
              Send another
            </Pill>
            {onDone && (
              <Pill variant="white" size="md" onClick={onDone}>
                Close
              </Pill>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          initial={false}
          exit={{ opacity: 0 }}
          className="space-y-5"
        >
          {/* Honeypot — hidden from people and from assistive tech. */}
          <div className="absolute left-[-9999px] top-0" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.company}
              onChange={(e) => set("company")(e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name spans the row so the five fields still pair off cleanly below. */}
            <FieldWrap
              id="contact-name"
              label="Name"
              required
              error={errors.name}
              className="sm:col-span-2"
            >
              <TextInput
                id="contact-name"
                name="name"
                value={values.name}
                onChange={set("name")}
                placeholder="Your name"
                autoComplete="name"
                error={errors.name}
                disabled={busy}
              />
            </FieldWrap>

            <FieldWrap id="contact-email" label="Email" required error={errors.email}>
              <TextInput
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={set("email")}
                placeholder="you@company.com"
                autoComplete="email"
                error={errors.email}
                disabled={busy}
              />
            </FieldWrap>

            <FieldWrap id="contact-phone" label="Phone" error={errors.phone} hint="Optional">
              <TextInput
                id="contact-phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={set("phone")}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                error={errors.phone}
                disabled={busy}
              />
            </FieldWrap>

            <FieldWrap
              id="contact-projectType"
              label="Project type"
              required
              error={errors.projectType}
            >
              <Select
                id="contact-projectType"
                name="projectType"
                value={values.projectType}
                onChange={set("projectType")}
                options={form.projectTypes}
                error={errors.projectType}
                disabled={busy}
              />
            </FieldWrap>

            <FieldWrap id="contact-budget" label="Budget range" error={errors.budget}>
              <Select
                id="contact-budget"
                name="budget"
                value={values.budget}
                onChange={set("budget")}
                options={form.budgetRanges}
                error={errors.budget}
                disabled={busy}
              />
            </FieldWrap>
          </div>

          <FieldWrap
            id="contact-details"
            label="Project details"
            required
            error={errors.details}
            hint="What are you building, what's the deadline, and what's blocking you?"
          >
            <TextArea
              id="contact-details"
              name="details"
              value={values.details}
              onChange={set("details")}
              placeholder="Tell me about the project…"
              rows={5}
              error={errors.details}
              disabled={busy}
            />
          </FieldWrap>

          {status === "error" && (
            <div role="alert" className="rounded-xl border border-[#ff8080]/40 bg-[#ff8080]/[0.07] p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#ff8080]">
                {form.errorTitle}
              </p>
              <p className="mt-1.5 text-sm text-white/60">{serverMessage ?? form.errorBody}</p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
            <Pill type="submit" variant="white" size="md" disabled={busy} magnetic={false}>
              {busy ? (
                <>
                  <span
                    aria-hidden="true"
                    className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                  {form.submitPendingLabel}
                </>
              ) : (
                form.submitLabel
              )}
            </Pill>

            <p className="text-[12px] text-white/35">
              Or email{" "}
              <a href={`mailto:${contact.email}`} className="text-brand-soft hover:text-white">
                {contact.email}
              </a>
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
