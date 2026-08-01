import { contact, footer, profile } from "@/content/site";
import BackToTop from "@/components/layout/BackToTop";
import { IconGithub, IconLinkedin, IconMail, IconWhatsapp } from "@/components/ui/Glyph";

const socials = [
  { label: "Email", href: `mailto:${contact.email}`, Icon: IconMail, external: false },
  {
    label: "WhatsApp",
    href: `https://wa.me/${contact.whatsappNumber}`,
    Icon: IconWhatsapp,
    external: true,
  },
  { label: "LinkedIn", href: contact.linkedin, Icon: IconLinkedin, external: true },
  { label: "GitHub", href: contact.github, Icon: IconGithub, external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--line)] bg-base">
      <div className="shell py-12 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              {profile.fullName}
              <span className="text-brand">.</span>
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
              {profile.heroRole}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/45">
              {footer.statement}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <ul className="flex items-center gap-2.5">
              {socials.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="grid size-10 place-items-center rounded-full border border-[var(--line)] text-white/60 transition-all duration-400 hover:border-white/30 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
            >
              {contact.email}
            </a>
            <p className="text-sm text-white/35">{profile.location}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/25">
            © {year} {footer.copyrightName}. All rights reserved.
          </p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/25">
            {footer.colophon}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
