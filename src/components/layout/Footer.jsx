import { FaMapMarkerAlt, FaPhoneAlt, FaRegClock, FaEnvelope } from "react-icons/fa";
import Logo from "../ui/Logo";
import { NAV_LINKS } from "../../data/navigation";
import { DEPARTMENTS } from "../../data/departments";
import { CLINIC, FULL_ADDRESS } from "../../data/clinic";

/**
 * Every link here goes somewhere real.
 *
 * The previous footer shipped `href="#"` for Privacy and Terms, social icons
 * pointing at facebook.com / twitter.com homepages, and a hardcoded "© 2026".
 * Placeholder links read as an abandoned site, which is the opposite of what a
 * clinic footer is for — so anything unresolved is omitted until it exists.
 *
 * Body text is white/70 rather than the old white/30 and white/40, both of
 * which failed WCAG AA against this background.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const legalLinks = Object.entries(CLINIC.legal).filter(([, href]) => Boolean(href));

  return (
    <footer className="on-dark bg-ink-900 text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo onDark />
          <p className="text-sm text-white/70">
            Comprehensive, patient-first healthcare across {DEPARTMENTS.length}{" "}
            specialties — skilled doctors and modern diagnostics under one roof.
          </p>

          {CLINIC.socials.length > 0 && (
            <ul className="flex items-center gap-3 pt-1">
              {CLINIC.socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="tap flex items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-600"
                  >
                    <Icon size={15} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="text-sm font-bold uppercase tracking-wide text-white">
            Explore
          </h2>
          <ul className="mt-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="tap flex items-center text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-departments">
          <h2 id="footer-departments" className="text-sm font-bold uppercase tracking-wide text-white">
            Departments
          </h2>
          <ul className="mt-4 flex flex-col gap-1">
            {DEPARTMENTS.map((dept) => (
              <li key={dept.id}>
                <a
                  href="#care"
                  className="tap flex items-center text-sm text-white/70 transition-colors hover:text-white"
                >
                  {dept.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-white">Contact</h2>
          <ul className="mt-4 flex flex-col gap-3">
            <li className="flex items-start gap-2.5 text-sm text-white/70">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-brand-400" />
              <address className="not-italic">{FULL_ADDRESS}</address>
            </li>
            {CLINIC.phones.map((phone) => (
              <li key={phone.href} className="flex items-center gap-2.5 text-sm text-white/70">
                <FaPhoneAlt className="shrink-0 text-brand-400" />
                <a
                  href={phone.href}
                  className="inline-flex min-h-11 items-center hover:text-white"
                >
                  {phone.display}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2.5 text-sm text-white/70">
              <FaEnvelope className="mt-3.5 shrink-0 text-brand-400" />
              <a
                href={`mailto:${CLINIC.email}`}
                className="inline-flex min-h-11 items-center break-all hover:text-white"
              >
                {CLINIC.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/70">
              <FaRegClock className="shrink-0 text-brand-400" />
              Open 24 hours, every day
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/70 sm:flex-row">
          <p>
            © {year} {CLINIC.name}. All rights reserved.
          </p>

          {legalLinks.length > 0 && (
            <ul className="flex items-center gap-5">
              {legalLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="capitalize hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
