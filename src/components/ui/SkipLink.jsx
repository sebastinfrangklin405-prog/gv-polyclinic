/**
 * First focusable element on the page. Without it, a keyboard or screen-reader
 * user re-traverses the whole nav on every arrival.
 *
 * It is visually hidden until focused rather than `display: none`, because a
 * hidden element cannot receive focus at all.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
                 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-full
                 focus:bg-brand-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold
                 focus:text-white focus:shadow-e3"
    >
      Skip to main content
    </a>
  );
}
