import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import { NAV_LINKS } from "../../data/navigation";
import Logo from "../ui/Logo";
import Button from "../ui/Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(13,92,158,0.15)] py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-header flex items-center justify-between gap-3">
        <Logo />

        <nav className="hidden items-center gap-0.5 min-[1400px]:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-2.5 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 ${
                activeHash === link.href
                  ? "text-primary-600"
                  : "text-ink-700 hover:text-primary-600"
              }`}
            >
              {link.label}
              {activeHash === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-teal-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+918610351469"
            className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink-700 hover:text-primary-600 transition-colors min-[1650px]:flex"
          >
            <FaPhoneAlt className="text-teal-500 shrink-0" />
            +91 86103 51469
          </a>
          <div className="hidden min-[1400px]:block">
            <Button as="a" href="#appointment" variant="primary">
              Book an Appointment
            </Button>
          </div>
          <div className="min-[1400px]:hidden">
            <Button as="a" href="#appointment" variant="primary" className="!px-4 !py-2.5 text-xs">
              Book Now
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-600 min-[1400px]:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-primary-50 bg-white min-[1400px]:hidden"
          >
            <nav className="container-clinic flex flex-col gap-1 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                    activeHash === link.href
                      ? "bg-primary-50 text-primary-600"
                      : "text-ink-700 hover:bg-primary-50"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-2 flex flex-col gap-3 px-4">
                <a
                  href="tel:+918610351469"
                  className="flex items-center gap-2 text-sm font-semibold text-ink-700"
                >
                  <FaPhoneAlt className="text-teal-500" />
                  +91 86103 51469
                </a>
                <Button as="a" href="#appointment" variant="primary" onClick={() => setOpen(false)}>
                  Book an Appointment
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
