import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

/**
 * Desktop only — below `lg` the bottom corner belongs to MobileActionBar,
 * whose Call / WhatsApp / Book are worth far more to a patient on a phone.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const frame = useRef(0);

  useEffect(() => {
    // rAF-throttled: the previous version called setState on every scroll event.
    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        setVisible(window.scrollY > 640);
        frame.current = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: prefersReducedMotion ? "auto" : "smooth",
            })
          }
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          aria-label="Back to top"
          data-print="hide"
          className="tap fixed bottom-8 right-8 z-40 hidden items-center justify-center rounded-full bg-ink-900 text-white shadow-e3 transition-colors hover:bg-ink-700 lg:flex"
        >
          <FaArrowUp size={15} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
