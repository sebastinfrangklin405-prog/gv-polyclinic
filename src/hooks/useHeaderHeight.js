import { useEffect, useRef } from "react";

/**
 * Publishes the header's measured height to `--header-h`, which index.css uses
 * for `scroll-padding-top`.
 *
 * This replaces a hardcoded `scroll-padding-top: 88px`, which was wrong in
 * most of the header's states — it shrinks on scroll, and it is shorter on
 * mobile — so anchored sections landed underneath it.
 */
export function useHeaderHeight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`
      );
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
