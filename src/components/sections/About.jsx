import { FaCheck } from "react-icons/fa";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { useCountUp } from "../../hooks/useCountUp";
import { CLINIC } from "../../data/clinic";
import { DOCTORS } from "../../data/doctors";
import { DEPARTMENTS } from "../../data/departments";
import { SERVICES } from "../../data/services";
import { WHY_CHOOSE_US } from "../../data/whyChooseUs";

/**
 * About and "Why choose us" were two consecutive sections making the same
 * argument. Merged, they become the page's single dark band — one emotional
 * peak rather than six interchangeable white card grids in a row.
 *
 * `on-dark` switches the focus ring to white (index.css) and strips the band
 * back to black on white when printed.
 */

const STATS = [
  { target: DOCTORS.length, suffix: "", label: "Specialists on staff" },
  { target: DEPARTMENTS.length, suffix: "", label: "Departments" },
  { target: SERVICES.length, suffix: "", label: "Services offered" },
  { target: 24, suffix: "/7", label: "Always open" },
];

const PRINCIPLES = [
  "Care built around your comfort and your outcome, not the schedule",
  "Coordinated specialties, so your records never leave the building",
  "Transparent pricing and unhurried, honest guidance",
  "Modern diagnostics on site, with results back quickly",
];

function Stat({ target, suffix, label }) {
  const { ref, value } = useCountUp(target);

  return (
    <div ref={ref} className="flex flex-col gap-1 rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
      <span className="text-3xl font-extrabold text-white">
        {value}
        {suffix}
      </span>
      <span className="text-xs font-bold uppercase tracking-wide text-white/70">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="on-dark section-pad relative overflow-hidden bg-brand-900"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-dot-grid text-white/[0.05]" />
        <div className="absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[360px] w-[360px] rounded-full bg-accent-600/15 blur-3xl" />
      </div>

      <div className="container-page relative flex flex-col gap-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              id="about-heading"
              align="left"
              onDark
              eyebrow={`About ${CLINIC.name}`}
              title="Quality healthcare should be accessible, coordinated and personal"
              description="We opened with a simple conviction: that a patient should not have to travel between buildings to be treated as one person. Every specialty here works from the same records, in the same place, at any hour."
            />

            <ul className="flex flex-col gap-3">
              {PRINCIPLES.map((principle) => (
                <li key={principle} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-600 text-white">
                    <FaCheck size={10} />
                  </span>
                  <span className="text-base text-white/80">{principle}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </Reveal>
        </div>

        <Reveal className="flex flex-col gap-6 border-t border-white/15 pt-10">
          <h3 className="text-2xl font-bold text-white">What that looks like in practice</h3>

          <ul className="auto-grid-sm">
            {WHY_CHOOSE_US.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="flex flex-col gap-3 rounded-xl bg-white/[0.07] p-5 ring-1 ring-white/10 transition-colors duration-[--dur-base] hover:bg-white/[0.12]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white">
                  <Icon size={17} />
                </span>
                <span>
                  <span className="block text-base font-bold text-white">{title}</span>
                  <span className="mt-1 block text-sm text-white/70">{description}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
