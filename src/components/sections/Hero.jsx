import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRegClock,
  FaUserMd,
  FaLayerGroup,
  FaShieldAlt,
  FaWalking,
} from "react-icons/fa";
import Button from "../ui/Button";
import { useOpenNow } from "../../hooks/useOpenNow";
import {
  CLINIC,
  FULL_ADDRESS,
  PRIMARY_PHONE,
  DIRECTIONS_URL,
} from "../../data/clinic";
import { DEPARTMENTS } from "../../data/departments";
import { DOCTORS } from "../../data/doctors";

/**
 * No illustration. The previous hero's hand-drawn SVG of an abstract person
 * was the LCP element, read as clip-art, and said nothing true about the
 * clinic. This leads with type — the fastest possible LCP — and fills the
 * second column with information a patient actually needs before visiting.
 */

const PROOF = [
  { icon: FaUserMd, label: `${DOCTORS.length} specialists`, sub: "On staff" },
  { icon: FaLayerGroup, label: `${DEPARTMENTS.length} departments`, sub: "Under one roof" },
  { icon: FaRegClock, label: "Open 24 hours", sub: "Every day" },
  { icon: FaWalking, label: "Walk-ins welcome", sub: "No referral needed" },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const status = useOpenNow();

  const motionProps = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      /* Padding is driven by the measured header height, so the heading never
         sits underneath it at any breakpoint. Kept modest so the primary CTA
         stays reachable without scrolling on a landscape phone. */
      className="relative overflow-hidden bg-surface-50"
      style={{ paddingTop: "calc(var(--header-h) + 2rem)" }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-brand-100/40 blur-3xl" />
        <div className="absolute top-1/2 left-[-15%] h-[360px] w-[360px] rounded-full bg-accent-100/30 blur-3xl" />
        <div className="absolute inset-0 bg-dot-grid text-ink-900/[0.035]" />
      </div>

      <div className="container-page grid items-center gap-12 pb-16 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-28">
        <motion.div {...motionProps()} className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-700 shadow-e1 ring-1 ring-ink-100">
            <span
              className={`h-2 w-2 rounded-full ${
                status.open ? "bg-accent-600 animate-pulse-ring" : "bg-ink-300"
              }`}
            />
            {status.label}
            <span className="font-semibold normal-case tracking-normal text-ink-500">
              · {status.detail}
            </span>
          </span>

          <h1
            id="hero-heading"
            className="text-5xl font-extrabold text-ink-900"
          >
            Comprehensive care.
            <span className="text-gradient block">Trusted doctors.</span>
            Better health.
          </h1>

          <p className="measure text-lg text-ink-600">
            {CLINIC.name} brings {DEPARTMENTS.length} specialties, {DOCTORS.length}{" "}
            qualified doctors and modern diagnostics together in{" "}
            {CLINIC.address.locality} — so your family never has to look elsewhere.
          </p>

          <div className="flex w-full flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button as="a" href="#booking" size="lg" className="w-full xs:w-auto">
              Book an Appointment
              <FaArrowRight size={13} />
            </Button>
            <Button
              as="a"
              href={PRIMARY_PHONE.href}
              variant="secondary"
              size="lg"
              className="w-full xs:w-auto"
            >
              <FaPhoneAlt size={13} />
              {PRIMARY_PHONE.display}
            </Button>
          </div>

          {/* These four used to be `hidden sm:flex` floating cards, so every
              phone visitor lost them entirely with nothing in their place. */}
          <ul className="mt-2 grid w-full grid-cols-2 gap-3 sm:gap-4 lg:max-w-xl">
            {PROOF.map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-e1 ring-1 ring-ink-100">
                  <Icon size={16} />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block text-sm font-bold text-ink-900">{label}</span>
                  <span className="block text-xs text-ink-500">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Not a picture — the practical details someone needs before they
            travel. Useful, honest, and it costs no image bytes. */}
        <motion.aside
          {...motionProps(0.12)}
          aria-label="Clinic at a glance"
          className="card w-full overflow-hidden p-0 shadow-e3"
        >
          <div className="flex items-center gap-3 border-b border-ink-100 bg-brand-600 px-5 py-4 text-white sm:px-6">
            <FaShieldAlt size={18} className="shrink-0" />
            <p className="text-sm font-bold">Everything you need before you visit</p>
          </div>

          <dl className="divide-y divide-ink-100">
            <div className="flex items-start gap-4 px-5 py-4 sm:px-6">
              <FaRegClock className="mt-0.5 shrink-0 text-brand-600" size={16} />
              <div className="min-w-0">
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Hours
                </dt>
                <dd className="mt-0.5 text-sm font-semibold text-ink-900">
                  Open 24 hours, every day
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4 px-5 py-4 sm:px-6">
              <FaLayerGroup className="mt-0.5 shrink-0 text-brand-600" size={16} />
              <div className="min-w-0">
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Specialties
                </dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {DEPARTMENTS.map((dept) => (
                    <a
                      key={dept.id}
                      href="#care"
                      className="tap inline-flex items-center justify-center rounded-full bg-surface-100 px-3 text-xs font-semibold text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      {dept.name}
                    </a>
                  ))}
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4 px-5 py-4 sm:px-6">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-brand-600" size={16} />
              <div className="min-w-0">
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Address
                </dt>
                <dd className="mt-0.5 text-sm text-ink-700">{FULL_ADDRESS}</dd>
                <dd className="mt-2">
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline"
                  >
                    Get directions
                    <FaArrowRight size={11} />
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </motion.aside>
      </div>
    </section>
  );
}
