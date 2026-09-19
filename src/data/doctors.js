/**
 * Every entry in `specializations` must exactly match a `name` in
 * departments.js — the Care section and the booking form both filter on it.
 * It is a list because several doctors here practise in more than one
 * department, and a single string forced them to be hidden from all but one.
 *
 * The optional fields below are what patients most often look for when
 * choosing a doctor, and the UI renders each one only when it is filled in.
 * They are deliberately left empty rather than guessed: consultation timings
 * and years of experience are factual claims about named medical
 * professionals, and inventing them on a live clinic site is not acceptable.
 * Ask the clinic, then fill them in.
 *
 *   languages       — e.g. ["Tamil", "English"]
 *   experienceYears — a number, e.g. 12
 *   timings         — e.g. "Mon–Sat, 10:00 AM – 1:00 PM"
 *
 * Portraits: the cards render a locally generated <Monogram> until real
 * photographs are supplied. Add `image: "/doctors/name.webp"` to use one.
 */
export const DOCTORS = [
  {
    id: "dr-p-manikannan",
    name: "Dr. P. Manikannan",
    qualification: "MBBS, DLO",
    role: "ENT Specialist",
    specializations: ["ENT"],
    languages: [],
    experienceYears: null,
    timings: "",
  },
  {
    id: "dr-kamala-deepak",
    name: "Dr. Kamala Deepak",
    qualification: "MBBS, MD, DOTO, MCh",
    role: "Gynecologist, Paediatrician & Diabetologist",
    specializations: ["Gynecology", "Paediatrics", "Diabetology"],
    languages: [],
    experienceYears: null,
    timings: "",
  },
  {
    id: "dr-deepak",
    name: "Dr. Deepak",
    qualification: "MBBS, MS, MCh, FRCS",
    role: "Urologist",
    specializations: ["Urology"],
    languages: [],
    experienceYears: null,
    timings: "",
  },
  {
    id: "dr-s-vignesh",
    name: "Dr. S. Vignesh",
    qualification: "MBBS, MD",
    role: "General Physician & Dermatologist",
    specializations: ["General Medicine", "Dermatology"],
    languages: [],
    experienceYears: null,
    timings: "",
  },
  {
    id: "dr-nandhini",
    name: "Dr. Nandhini",
    qualification: "MBBS, MS, FMAS, FFMAS",
    role: "Gynecologist & Fertility Consultant",
    specializations: ["Gynecology"],
    languages: [],
    experienceYears: null,
    timings: "",
  },
];
