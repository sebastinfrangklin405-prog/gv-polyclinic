/**
 * The mark is 603×413 — it was previously forced into a square `h-9 w-9` box
 * with object-contain, which shrank it and wasted the space. Width and height
 * attributes are set so the browser reserves the right box before the image
 * loads, which is what stops the header shifting.
 *
 * It sits on a white chip because the source file has a white background baked
 * in; that keeps it usable on the dark footer.
 */
export default function Logo({ className = "", onDark = false, compact = false }) {
  return (
    <a
      href="#home"
      className={`group flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg ${className}`}
    >
      <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-e1 ring-1 ring-black/5">
        <img
          src="/logo.webp"
          alt=""
          width={603}
          height={413}
          className="h-7 w-auto sm:h-8"
        />
      </span>

      {/* min-w-0 so the wordmark, not the buttons beside it, is what gives way
          when the header runs out of room at 320px. */}
      {!compact && (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={`truncate text-base font-extrabold tracking-tight sm:text-lg ${
              onDark ? "text-white" : "text-ink-900"
            }`}
          >
            GV Polyclinic
          </span>
          <span
            className={`mt-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] ${
              onDark ? "text-white/60" : "text-ink-500"
            }`}
          >
            Chennai
          </span>
        </span>
      )}
    </a>
  );
}
