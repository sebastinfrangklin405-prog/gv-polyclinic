import Reveal from "./Reveal";

/**
 * `id` is required wherever the heading names a landmark — the parent section
 * points at it with aria-labelledby, so screen-reader users get "Our doctors,
 * region" instead of an anonymous "region".
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  onDark = false,
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <Reveal direction="up" className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] ${
            onDark
              ? "bg-white/10 text-white ring-1 ring-white/25"
              : "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {eyebrow}
        </span>
      )}

      <h2
        id={id}
        className={`text-3xl font-extrabold measure-tight ${
          onDark ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p className={`text-base measure ${onDark ? "text-white/75" : "text-ink-600"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
