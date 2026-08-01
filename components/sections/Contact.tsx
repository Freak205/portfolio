"use client";

import { useState } from "react";
import { contact, contactSection, profile } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Headline from "@/components/ui/Headline";
import Pill from "@/components/ui/Pill";
import Modal from "@/components/ui/Modal";
import ContactForm from "@/components/sections/ContactForm";
import {
  IconDocument,
  IconGithub,
  IconLinkedin,
  IconMail,
  IconWhatsapp,
} from "@/components/ui/Glyph";

const channels = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    Icon: IconMail,
    external: false,
  },
  {
    label: "WhatsApp",
    value: contact.phone,
    href: `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`,
    Icon: IconWhatsapp,
    external: true,
  },
  {
    label: "LinkedIn",
    value: contact.linkedinLabel,
    href: contact.linkedin,
    Icon: IconLinkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: contact.github.replace(/^https?:\/\/(www\.)?/, ""),
    href: contact.github,
    Icon: IconGithub,
    external: true,
  },
];

export default function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="bloom left-1/2 top-1/4 size-[40rem] -translate-x-1/2" />

      <div className="shell relative flex flex-col items-center text-center">
        <Headline
          light={contactSection.headingLight}
          bold={contactSection.headingBold}
          size="xl"
          align="center"
        />

        <Reveal delay={0.1}>
          <p className="lede mx-auto mt-6 max-w-2xl">{contactSection.intro}</p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Pill variant="white" size="lg" onClick={() => setOpen(true)}>
              <IconMail className="size-4" />
              {contactSection.primaryCta}
            </Pill>
            {contact.resumeUrl && (
              <Pill variant="outline" size="lg" href={contact.resumeUrl} download>
                <IconDocument className="size-4" />
                {contactSection.secondaryCta}
              </Pill>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-6 inline-flex items-center gap-2.5 text-[12px] text-white/40">
            <span className="relative flex size-2 items-center justify-center">
              {profile.available && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ring-out rounded-full bg-brand"
                />
              )}
              <span
                aria-hidden="true"
                className={`relative size-2 rounded-full ${
                  profile.available ? "animate-pulse-dot bg-brand" : "bg-white/30"
                }`}
              />
            </span>
            {profile.available ? profile.availabilityLine : "Currently at capacity"}
            <span aria-hidden="true" className="text-white/20">
              ·
            </span>
            {profile.responseLine}
          </div>
        </Reveal>

        {/* Direct channels, for people who would rather not use a form. */}
        <Reveal delay={0.28} className="w-full">
          <ul className="mx-auto mt-14 grid w-full max-w-3xl gap-3 sm:grid-cols-2">
            {channels.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="panel panel-hover group flex items-center gap-4 px-5 py-4 text-left"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white/60 transition-colors duration-400 group-hover:bg-brand/20 group-hover:text-brand-soft">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
                      {label}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-white/75 transition-colors duration-400 group-hover:text-white">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={contactSection.form.title}
        subtitle={contactSection.form.subtitle}
      >
        <ContactForm onDone={() => setOpen(false)} />
      </Modal>
    </section>
  );
}
