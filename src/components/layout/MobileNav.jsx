import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaTimes, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { NAV_LINKS } from "../../data/navigation";
import { CLINIC, PRIMARY_PHONE, WHATSAPP_URL } from "../../data/clinic";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import Logo from "../ui/Logo";
import Button from "../ui/Button";

/**
 * Replaces the old inline dropdown, which had three problems:
 *   1. `overflow-hidden` on an animated-height container with no scroll area —
 *      on a landscape phone the lower links were clipped and unreachable.
 *   2. No focus trap, no Escape, no focus return.
 *   3. The page behind stayed tabbable while visually covered.
 *
 * Rendered in a portal so it escapes the header's stacking context, and the
 * link list scrolls internally so every item is reachable at any viewport
 * height.
 */
export default function MobileNav({ open, onClose, activeHash }) {
  const prefersReducedMotion = useReducedMotion();
  const close = useCallback(() => onClose(), [onClose]);
  const trapRef = useFocusTrap(open, close);

  // Lock the page behind the sheet. Compensating for the scrollbar width stops
  // the content jumping sideways as it disappears.
  useEffect(() => {
    if (!open) return;

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    // `inert` removes everything in <main> from the tab order and the
    // accessibility tree while the sheet is open.
    const main = document.getElementById("main");
    main?.setAttribute("inert", "");

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      main?.removeAttribute("inert");
    };
  }, [open]);

  const duration = prefersReducedMotion ? 0 : 0.28;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          className="fixed inset-0 z-[90] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            ref={trapRef}
            initial={{ x: prefersReducedMotion ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: prefersReducedMotion ? 0 : "100%" }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            /* h-dvh, not h-screen: 100vh is wrong on mobile browsers whose
               toolbars collapse, and catastrophically wrong in landscape. */
            className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-sm flex-col bg-white shadow-e3"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-ink-100 px-4 py-3">
              <Logo />
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="tap flex items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* The scroll container. This is the fix for the clipped landscape
                menu — overscroll-contain stops the scroll chaining to the
                locked page behind. */}
            <nav
              aria-label="Site"
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeHash === link.href;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={close}
                        aria-current={isActive ? "page" : undefined}
                        className={`tap flex items-center rounded-xl px-4 text-base font-semibold transition-colors ${
                          isActive
                            ? "bg-brand-50 text-brand-700"
                            : "text-ink-700 hover:bg-surface-100"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex flex-col gap-3 border-t border-ink-100 pt-6">
                <a
                  href={PRIMARY_PHONE.href}
                  className="tap flex items-center gap-3 rounded-xl px-4 text-sm font-semibold text-ink-700 transition-colors hover:bg-surface-100"
                >
                  <FaPhoneAlt className="shrink-0 text-brand-600" />
                  {PRIMARY_PHONE.display}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap flex items-center gap-3 rounded-xl px-4 text-sm font-semibold text-ink-700 transition-colors hover:bg-surface-100"
                >
                  <FaWhatsapp className="shrink-0 text-accent-600" size={16} />
                  WhatsApp us
                </a>
                <p className="px-4 text-xs text-ink-500">
                  {CLINIC.hours.alwaysOpen ? "Open 24 hours, every day" : "See full hours"}
                </p>
              </div>
            </nav>

            <div className="shrink-0 border-t border-ink-100 p-4 pb-safe">
              <Button as="a" href="#booking" onClick={close} size="lg" className="w-full">
                Book an Appointment
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
