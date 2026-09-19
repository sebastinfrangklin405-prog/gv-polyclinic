import { forwardRef } from "react";

const VARIANTS = {
  // Brand red fills a surface here and in no other component — that is what
  // keeps it readable as "action" rather than "error". See index.css.
  primary:
    "bg-brand-600 text-white shadow-e1 hover:bg-brand-700 hover:shadow-e2 hover:-translate-y-0.5",
  secondary:
    "bg-white text-brand-700 border border-ink-200 hover:border-brand-300 hover:bg-brand-50 hover:-translate-y-0.5",
  accent:
    "bg-accent-600 text-white shadow-e1 hover:bg-accent-700 hover:shadow-e2 hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-brand-700 hover:bg-brand-50",
  // For use inside the single dark band.
  onDark:
    "bg-white text-brand-700 hover:bg-brand-50 hover:-translate-y-0.5",
  onDarkOutline:
    "bg-transparent text-white border border-white/40 hover:bg-white/10 hover:-translate-y-0.5",
};

const SIZES = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
  // Square, for an icon-only button. A real size rather than a caller
  // overriding padding — and note Tailwind v4 spells important as a suffix
  // (`px-0!`), so the v3-style `!px-0` such a caller would reach for is
  // silently ignored.
  icon: "w-11 px-0 text-sm",
};

const Button = forwardRef(function Button(
  {
    as: Component = "button",
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
  },
  ref
) {
  // min-h-11 is 44px — the usable touch target. WCAG 2.2 SC 2.5.8 only floors
  // at 24px, but 44px is what stops mis-taps on a phone.
  // shrink-0: a button is a touch target, so it must not be squeezed below its
  // size by a cramped flex row — that is how the header's icon-only call
  // button collapsed to 6px wide at 320px.
  const base =
    "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full font-semibold " +
    "whitespace-nowrap transition-all duration-[--dur-base] ease-[--ease-soft] " +
    "disabled:pointer-events-none disabled:opacity-60";

  return (
    <Component
      ref={ref}
      className={`${base} ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Button;
