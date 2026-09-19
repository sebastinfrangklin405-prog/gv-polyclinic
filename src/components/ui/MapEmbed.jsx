import { useState } from "react";
import { FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import { MAP_EMBED_SRC, DIRECTIONS_URL, FULL_ADDRESS } from "../../data/clinic";

/**
 * Click-to-load facade over the Google Maps embed.
 *
 * The previous version mounted the iframe on page load, so Google received a
 * request and set third-party cookies before the visitor had done anything —
 * on a medical site, where the mere visit is sensitive. It also cost a
 * third-party frame in the critical path.
 *
 * The facade is a real, useful panel in its own right: the address is legible
 * and a directions link works without loading anything.
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-ink-100 sm:aspect-video">
        <iframe
          title={`Map showing ${FULL_ADDRESS}`}
          src={MAP_EMBED_SRC}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-ink-100 bg-surface-50 p-6 text-center sm:aspect-video"
      data-print="hide"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="300" fill="#faf8f7" />
          <g stroke="#e4e0dd" strokeWidth="2" fill="none">
            <path d="M-10 90h420M-10 200h420M90 -10v320M250 -10v320" />
            <path d="M0 250L120 130L250 190L400 60" strokeWidth="6" stroke="#eeeae7" />
          </g>
          <circle cx="200" cy="150" r="46" fill="#a81e26" opacity="0.08" />
        </svg>
      </div>

      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-e2">
        <FaMapMarkerAlt size={20} />
      </span>

      <p className="relative measure text-sm text-ink-700">{FULL_ADDRESS}</p>

      <div className="relative flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="tap inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-brand-700 shadow-e1 ring-1 ring-ink-200 transition-colors hover:bg-brand-50"
        >
          Load interactive map
        </button>
        <p className="text-xs text-ink-500">Loads Google Maps and sets its cookies</p>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="tap inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 underline underline-offset-2 hover:text-brand-700"
        >
          Or open directions <FaExternalLinkAlt size={10} />
        </a>
      </div>
    </div>
  );
}
