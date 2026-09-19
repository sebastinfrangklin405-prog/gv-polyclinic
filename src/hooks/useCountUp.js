import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function useCountUp(target, { duration = 1600, start = 0 } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [animated, setAnimated] = useState(start);

  useEffect(() => {
    if (prefersReducedMotion || !inView) return;

    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(start + (target - start) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, start, prefersReducedMotion]);

  // A counting number is motion, so with reduced motion we show the final
  // figure. Derived during render rather than pushed through an effect, which
  // also keeps it correct if the OS setting is changed while the page is open.
  const value = prefersReducedMotion ? target : animated;

  return { ref, value };
}
