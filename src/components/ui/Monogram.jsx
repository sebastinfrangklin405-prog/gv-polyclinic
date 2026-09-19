/**
 * Replaces the ui-avatars.com initials the doctor cards used to load.
 *
 * That was a third-party network request sitting in the render path of the
 * section that carries the site's whole trust argument — and if the service is
 * slow or blocked, the doctors simply have no faces. This renders locally as
 * inline SVG: no request, no layout shift, and tinted from the brand palette
 * with the ECG line from the logo, so it reads as designed rather than default.
 *
 * Swap for real portraits when the clinic supplies them — the aspect ratio
 * matches the photo slot exactly.
 */

const TINTS = [
  { bg: "#FDF3F3", fg: "#8A171C", line: "#E99699" },
  { bg: "#EAF6F3", fg: "#0B6255", line: "#8FCFC2" },
  { bg: "#F4F1EF", fg: "#2E3238", line: "#C3C8CF" },
  { bg: "#FAE3E4", fg: "#6E161A", line: "#D9565C" },
];

function initialsFrom(name) {
  return name
    .replace(/^(Dr|Prof|Mr|Mrs|Ms)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.replace(/[^A-Za-z]/g, "").charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function tintFor(name) {
  const sum = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return TINTS[sum % TINTS.length];
}

export default function Monogram({ name, className = "" }) {
  const initials = initialsFrom(name);
  const { bg, fg, line } = tintFor(name);

  return (
    <svg
      viewBox="0 0 320 400"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${name} — portrait not yet available`}
    >
      <rect width="320" height="400" fill={bg} />
      <circle cx="270" cy="70" r="90" fill={fg} opacity="0.05" />
      <circle cx="40" cy="350" r="70" fill={fg} opacity="0.04" />

      <text
        x="160"
        y="200"
        textAnchor="middle"
        dominantBaseline="central"
        fill={fg}
        fontSize="120"
        fontWeight="800"
        fontFamily="Plus Jakarta Sans Variable, system-ui, sans-serif"
        letterSpacing="2"
      >
        {initials}
      </text>

      {/* Echoes the ECG line in the clinic's logo. */}
      <path
        d="M60 300h50l12-26 16 52 13-34 9 18h100"
        fill="none"
        stroke={line}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
