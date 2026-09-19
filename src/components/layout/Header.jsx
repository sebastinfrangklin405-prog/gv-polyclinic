import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaPhoneAlt } from "react-icons/fa";
import { NAV_LINKS } from "../../data/navigation";
import { PRIMARY_PHONE } from "../../data/clinic";
import { useHeaderHeight } from "../../hooks/useHeaderHeight";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const headerRef = useHeaderHeight();

  // A one-pixel sentinel at the top of the document replaces a scroll listener
  // that fired on every frame of every scroll.
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting)
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Active-section tracking. The previous version set the active link from
  // every intersecting entry in callback order, so with two sections on screen
  // the winner was whichever the browser happened to report last. This keeps a
  // ratio per section and picks the largest.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean);

    if (sections.length === 0) return;

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId) setActiveHash(`#${bestId}`);
      },
      {
        threshold: [0, 0.15, 0.35, 0.6, 0.85, 1],
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-[--dur-base] ${
          scrolled
            ? "bg-white/90 py-2 shadow-e2 backdrop-blur-md"
            : "bg-transparent py-3"
        }`}
      >
        {/* Same container as every section — the header used to cap at 1640px
            while content capped at 1280px, so they visibly disagreed on any
            display wider than 1280px. */}
        <div className="container-page flex items-center justify-between gap-4">
          <Logo />

          {/* Full nav from lg (1024px). It previously needed 1400px, so every
              1280px and 1366px laptop got a hamburger menu. */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold transition-colors ${
                    isActive ? "text-brand-700" : "text-ink-700 hover:text-brand-700"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={PRIMARY_PHONE.href}
              className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-full px-2 text-sm font-semibold text-ink-700 transition-colors hover:text-brand-700 xl:flex"
            >
              <FaPhoneAlt className="shrink-0 text-brand-600" />
              {PRIMARY_PHONE.display}
            </a>

            {/* Show/hide lives on a wrapper, never on the Button itself.
                Button's base class sets `inline-flex`, and a `hidden` passed
                through className is the same specificity — which of the two
                wins is decided by Tailwind's stylesheet order, not by the
                order they appear in the attribute. `inline-flex` won, so the
                full-width "Book Appointment" rendered and overflowed the
                header at every width below 640px. */}
            <div className="hidden sm:block">
              <Button as="a" href="#booking" size="sm">
                Book Appointment
              </Button>
            </div>

            {/* Below sm the label alone would push the header past 320px. */}
            <div className="sm:hidden">
              <Button
                as="a"
                href={PRIMARY_PHONE.href}
                size="icon"
                aria-label={`Call ${PRIMARY_PHONE.display}`}
              >
                <FaPhoneAlt size={15} />
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="tap flex items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors hover:bg-brand-100 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <FaBars size={18} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-nav">
        <MobileNav open={open} onClose={() => setOpen(false)} activeHash={activeHash} />
      </div>
    </>
  );
}
