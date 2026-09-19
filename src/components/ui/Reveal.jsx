import { motion, useReducedMotion } from "framer-motion";

/**
 * Vertical only, deliberately.
 *
 * Horizontal variants used to exist and were the cause of a real bug: an
 * element offset by `translateX(24px)` is 24px wider than its container until
 * it animates in, which produced 8px of horizontal page scroll at 320–480px
 * where the reveal sat in a full-width column. A reveal effect should never be
 * able to add a scrollbar, so the axis that can do that is gone.
 */
const DIRECTIONS = {
  up: { y: 24 },
  down: { y: -24 },
  none: { y: 0 },
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  as: Component = motion.div,
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();
  const offset = DIRECTIONS[direction] ?? DIRECTIONS.up;

  // The CSS `prefers-reduced-motion` block in index.css is not sufficient on
  // its own here. This component's initial state is opacity: 0, so zeroing the
  // transition duration would still leave content invisible until it scrolls
  // into view — and never visible at all if the observer does not fire.
  // With reduced motion we render the final state outright.
  if (prefersReducedMotion) {
    return (
      <Component className={className} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
