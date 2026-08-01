"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { contact, nav, profile, ticker } from "@/content/site";
import { EASE_EXPO } from "@/lib/motion";
import { IconDocument, IconGithub, IconLinkedin } from "@/components/ui/Glyph";
import Marquee from "@/components/motion/Marquee";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const isHome = pathname === "/";
  const activeSection = isHome ? active : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll and close on Escape while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Highlight whichever section is in view.
  useEffect(() => {
    if (!isHome) return;

    const sections = nav
      .map((item) => document.getElementById(item.href.replace("/#", "")))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          open ? "z-[82]" : "z-50"
        } ${
          scrolled && !open
            ? "border-b border-[var(--line)] bg-[rgba(5,6,11,0.72)] backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        {/* Three tracks so the nav sits dead centre regardless of how wide the
            action cluster on the right grows. */}
        <div className="shell flex h-[64px] items-center justify-between gap-4 md:h-[72px] lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="shrink-0 text-[17px] font-semibold tracking-tight lg:hidden"
            aria-label={`${profile.fullName} — home`}
          >
            {profile.firstName}
            <span className="text-brand">.</span>
          </Link>
          {/* Status ticker rides the left track so it never crowds the nav. */}
          <div className="hidden min-w-0 items-center gap-2.5 lg:flex">
            {ticker.show && (
              <>
                {ticker.label && (
                  <span className="shrink-0 rounded-full border border-[var(--line)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-soft">
                    {ticker.label}
                  </span>
                )}
                <Marquee
                  items={ticker.items}
                  speed="fast"
                  separator="•"
                  fadeColor="mask"
                  className="w-[13rem] text-[11px] text-white/45 xl:w-[17rem]"
                />
              </>
            )}
          </div>

          <nav
            aria-label="Primary"
            className="hidden items-center justify-center gap-7 lg:flex xl:gap-9"
          >
            {nav.map((item) => {
              const id = item.href.replace("/#", "");
              const isActive = activeSection === id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-[13px] font-medium transition-colors duration-300 hover:text-white ${
                    isActive ? "text-white" : "text-white/55"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2.5">
            {contact.resumeUrl && (
              <a
                href={contact.resumeUrl}
                download
                className="hidden h-9 items-center gap-2 rounded-full border border-[var(--line-strong)] px-3.5 text-[12px] font-medium text-white/80 transition-all duration-400 hover:border-white/40 hover:bg-white/5 hover:text-white sm:inline-flex"
              >
                <IconDocument className="size-3.5" />
                Resume
              </a>
            )}

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden size-9 items-center justify-center rounded-full border border-[var(--line)] text-white/70 transition-all duration-400 hover:border-white/30 hover:text-white sm:inline-flex"
            >
              <IconGithub />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hidden size-9 items-center justify-center rounded-full border border-[var(--line)] text-white/70 transition-all duration-400 hover:border-white/30 hover:text-white sm:inline-flex"
            >
              <IconLinkedin />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex size-10 items-center justify-center rounded-full border border-[var(--line-strong)] transition-colors duration-300 hover:border-white/40 lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
                <span
                  className={`block h-px w-full bg-current transition-transform duration-300 ${
                    open ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="fixed inset-0 z-[80] flex flex-col bg-void lg:hidden"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0.15 : 0.7, ease: EASE_EXPO }}
          >
            <div className="h-[64px] shrink-0 md:h-[72px]" aria-hidden="true" />

            <nav
              aria-label="Mobile"
              className="shell flex flex-1 flex-col justify-center overflow-y-auto py-6"
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) setOpen(false);
              }}
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.12 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-4 border-b border-[var(--line)] py-3.5"
                  >
                    <span className="text-[10px] font-medium text-white/25">
                      0{i + 1}
                    </span>
                    <span className="headline headline-md headline-light transition-colors duration-300 group-hover:text-white">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="shell shrink-0 space-y-4 border-t border-[var(--line)] py-6"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) setOpen(false);
              }}
            >
              <a
                href={`mailto:${contact.email}`}
                className="block text-sm text-white/70 transition-colors hover:text-white"
              >
                {contact.email}
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex size-10 items-center justify-center rounded-full border border-[var(--line)] text-white/70"
                >
                  <IconGithub />
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex size-10 items-center justify-center rounded-full border border-[var(--line)] text-white/70"
                >
                  <IconLinkedin />
                </a>
                {contact.resumeUrl && (
                  <a
                    href={contact.resumeUrl}
                    download
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-white text-[12px] font-semibold uppercase tracking-[0.1em] text-void"
                  >
                    <IconDocument className="size-4" />
                    Resume
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
