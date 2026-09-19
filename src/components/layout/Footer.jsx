import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Logo from "../ui/Logo";
import { DEPARTMENTS } from "../../data/departments";
import { SERVICES } from "../../data/services";

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Doctors", href: "#doctors" },
  { label: "Facilities", href: "#facilities" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaTwitter, label: "Twitter", href: "https://twitter.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      <div className="container-clinic grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="text-sm leading-relaxed text-white/60">
            GV Polyclinic delivers comprehensive, patient-first healthcare across ten+
            specialties — combining experienced doctors with modern facilities.
          </p>
          <div className="flex items-center gap-3 pt-1">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-teal-500"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white/80">Quick Links</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-white/60 transition-colors hover:text-teal-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white/80">Departments</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {DEPARTMENTS.slice(0, 6).map((dept) => (
              <li key={dept.id}>
                <a href="#departments" className="text-sm text-white/60 transition-colors hover:text-teal-400">
                  {dept.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white/80">Contact</h4>
          <ul className="mt-4 flex flex-col gap-3">
            <li className="flex items-start gap-2.5 text-sm text-white/60">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-teal-400" />
              64/58, Kamarajar Salai, Bishop Garden, Raja Annamalaipuram, Chennai, Tamil Nadu 600028
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/60">
              <FaPhoneAlt className="shrink-0 text-teal-400" />
              <a href="tel:+918610351469" className="hover:text-teal-400">+91 86103 51469</a>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-white/60">
              <FaEnvelope className="shrink-0 text-teal-400" />
              <a href="mailto:care@gvpolyclinic.example" className="hover:text-teal-400">
                care@gvpolyclinic.example
              </a>
            </li>
          </ul>
          <p className="mt-3 text-[11px] text-white/30">
            {SERVICES.length}+ services available across departments
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-clinic flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© 2026 GV Polyclinic. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-teal-400">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
