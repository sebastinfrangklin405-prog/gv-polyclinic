import { FaPhoneAlt, FaWhatsapp, FaRegCalendarCheck } from "react-icons/fa";
import { PRIMARY_PHONE, WHATSAPP_URL } from "../../data/clinic";

/**
 * The three things someone on a phone actually wants from a clinic site, kept
 * permanently in reach. Previously the bottom-right corner held a back-to-top
 * button instead — useful to nobody trying to reach a doctor.
 *
 * Hidden from `lg` up, where the header already carries the phone number and a
 * booking button.
 */
export default function MobileActionBar() {
  const items = [
    {
      label: "Call",
      href: PRIMARY_PHONE.href,
      icon: FaPhoneAlt,
      className: "text-brand-700",
    },
    {
      label: "WhatsApp",
      href: WHATSAPP_URL,
      icon: FaWhatsapp,
      className: "text-accent-600",
      external: true,
    },
    {
      label: "Book",
      href: "#booking",
      icon: FaRegCalendarCheck,
      primary: true,
    },
  ];

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 backdrop-blur-md pb-safe lg:hidden"
      data-print="hide"
    >
      <nav aria-label="Quick actions" className="grid grid-cols-3 gap-1 px-2 py-2">
        {items.map(({ label, href, icon: Icon, className = "", primary, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`tap flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-xs font-bold transition-colors ${
              primary
                ? "bg-brand-600 text-white hover:bg-brand-700"
                : `hover:bg-surface-100 ${className}`
            }`}
          >
            <Icon size={17} />
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
