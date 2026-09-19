/**
 * Single source of truth for every clinic detail that appears on the page.
 *
 * Before this existed the phone number was hardcoded in Header, Contact and
 * Footer, and the address and email in two files each — so updating a number
 * meant remembering three places. The JSON-LD in index.html is generated from
 * this same object, which is what stops structured data drifting away from
 * what the page actually says.
 *
 * Anything marked PLACEHOLDER must be resolved with the clinic before launch.
 */

export const CLINIC = {
  name: "GV Polyclinic",
  tagline: "Comprehensive Care. Trusted Doctors. Better Health.",

  address: {
    street: "64/58, Kamarajar Salai, Bishop Garden",
    locality: "Raja Annamalaipuram",
    region: "Tamil Nadu",
    city: "Chennai",
    postalCode: "600028",
    country: "IN",
  },

  // Exact pin from the clinic's Google Maps listing.
  coords: { lat: 13.0205262, lng: 80.2594959 },
  mapsUrl: "https://maps.app.goo.gl/UJsNmY37dtTccCht6",

  // OPTIONAL — paste the URL from Google Maps > Share > Embed a map (the long
  // ".../maps/embed?pb=..." one). It carries the listing's place ID, which is
  // the only way the embedded marker can open a real info card. Left empty,
  // MAP_EMBED_SRC falls back to a name-and-address search, which resolves the
  // listing in most cases but is not guaranteed.
  mapEmbedUrl: "",

  phones: [
    { label: "Mobile", display: "+91 86103 51469", href: "tel:+918610351469", primary: true },
    { label: "Landline", display: "044 4816 1589", href: "tel:04448161589" },
  ],

  whatsapp: "918610351469",

  email: "gvpolyclinic2026@gmail.com",

  // The clinic operates round the clock. Kept as a structured range rather
  // than the string "Open 24 hours" so useOpenNow and the JSON-LD
  // openingHoursSpecification can both be derived from it.
  hours: {
    alwaysOpen: true,
    timezone: "Asia/Kolkata",
    days: [
      { day: "Monday", opens: "00:00", closes: "23:59" },
      { day: "Tuesday", opens: "00:00", closes: "23:59" },
      { day: "Wednesday", opens: "00:00", closes: "23:59" },
      { day: "Thursday", opens: "00:00", closes: "23:59" },
      { day: "Friday", opens: "00:00", closes: "23:59" },
      { day: "Saturday", opens: "00:00", closes: "23:59" },
      { day: "Sunday", opens: "00:00", closes: "23:59" },
    ],
  },

  // PLACEHOLDER — left empty on purpose. Which languages the staff speak is a
  // factual claim about a real clinic and is not recorded anywhere in this
  // project, so it is not guessed. The UI hides this row until it is filled in.
  languages: [],

  // PLACEHOLDER — these point at the networks' homepages, which reads as an
  // abandoned site. Supply real URLs or leave the array empty to hide the row.
  socials: [],

  // PLACEHOLDER — no legal pages exist yet. Empty entries are not rendered,
  // which is better than a link to "#".
  legal: {
    privacy: "",
    terms: "",
  },
};

export const FULL_ADDRESS = [
  CLINIC.address.street,
  CLINIC.address.locality,
  CLINIC.address.city,
  `${CLINIC.address.region} ${CLINIC.address.postalCode}`,
].join(", ");

export const PRIMARY_PHONE =
  CLINIC.phones.find((p) => p.primary) ?? CLINIC.phones[0];

export const WHATSAPP_URL = `https://wa.me/${CLINIC.whatsapp}`;

export const DIRECTIONS_URL = CLINIC.mapsUrl;

/**
 * Embed URL for the interactive map.
 *
 * Querying by bare coordinates drops an anonymous pin: it has no place ID, so
 * clicking it makes Google fetch details for a place that does not exist and
 * the info card fails with "Place info couldn't load". Searching by name and
 * address instead resolves the clinic's actual listing, and its marker opens
 * the real card. `ll` keeps the map centred on the surveyed pin either way.
 */
export const MAP_EMBED_SRC =
  CLINIC.mapEmbedUrl ||
  `https://www.google.com/maps?q=${encodeURIComponent(
    `${CLINIC.name}, ${FULL_ADDRESS}`
  )}&ll=${CLINIC.coords.lat},${CLINIC.coords.lng}&z=17&hl=en&output=embed`;
