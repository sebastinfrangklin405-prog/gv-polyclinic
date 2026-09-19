import { useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Keeps keyboard focus inside an open overlay, closes on Escape, and returns
 * focus to whatever opened it.
 *
 * Without this a keyboard user tabs straight out of an open dialog into the
 * page behind it, which is still visually covered — focus disappears.
 */
export function useFocusTrap(active, onClose) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const restoreTo = document.activeElement;

    // Re-queried on each Tab: the visible set changes as the panel animates.
    const focusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (node) => node.offsetWidth > 0 || node.offsetHeight > 0
      );

    focusable()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (restoreTo instanceof HTMLElement) restoreTo.focus();
    };
  }, [active, onClose]);

  return ref;
}
