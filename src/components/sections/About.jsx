import { FaCheckCircle } from "react-icons/fa";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { useCountUp } from "../../hooks/useCountUp";

const STATS = [
  { target: 10, suffix: "+", label: "Medical Specialists" },
  { target: 5000, suffix: "+", label: "Happy Patients" },
  { target: 10, suffix: "+", label: "Years of Experience" },
  { target: 24, suffix: "/7", label: "Patient Support" },
];

const POINTS = [
  "Patient-focused care built around your comfort and outcomes",
  "Experienced medical professionals across ten+ specialties",
  "Modern healthcare facilities with advanced diagnostics",
  "Transparent pricing and honest, unhurried guidance",
];

function Stat({ target, suffix, label }) {
  const { ref, value } = useCountUp(target);
  return (
    <div ref={ref} className="flex flex-col gap-1 rounded-2xl bg-white p-5 text-center shadow-soft ring-1 ring-primary-50">
      <span className="text-3xl font-extrabold text-primary-600 sm:text-4xl">
        {value}
        {suffix}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-pad bg-white">
      <div className="container-clinic grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="right" className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-50 to-teal-50 shadow-soft">
            <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
              <circle cx="200" cy="200" r="180" fill="#ffffff" opacity="0.5" />
              <circle cx="120" cy="120" r="70" fill="#0d5c9e" opacity="0.08" />
              <circle cx="290" cy="290" r="90" fill="#0fb3a0" opacity="0.1" />
              <g transform="translate(90,70)">
                <rect x="0" y="60" width="220" height="180" rx="24" fill="#ffffff" stroke="#e3eef8" strokeWidth="2" />
                <circle cx="60" cy="120" r="30" fill="#eaf3fb" />
                <path d="M45 120a15 15 0 1 1 30 0 15 15 0 0 1-30 0z" fill="#0d5c9e" />
                <rect x="105" y="105" width="95" height="10" rx="5" fill="#cfe4f5" />
                <rect x="105" y="128" width="70" height="10" rx="5" fill="#e6faf7" />
                <rect x="24" y="170" width="176" height="10" rx="5" fill="#eaf3fb" />
                <rect x="24" y="192" width="120" height="10" rx="5" fill="#eaf3fb" />
                <path d="M0 60l110-50 110 50" fill="none" stroke="#0fb3a0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M175 30l10 10 18-20" fill="none" stroke="#2fae63" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,-10)" />
              </g>
            </svg>
          </div>
          <div className="absolute -bottom-6 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl bg-white p-4 shadow-soft-lg ring-1 ring-primary-50 sm:-bottom-8 sm:w-4/5">
            <div className="grid grid-cols-2 gap-3">
              {STATS.slice(0, 2).map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6 pt-6 lg:pt-0">
          <SectionHeading
            align="left"
            eyebrow="About GV Polyclinic"
            title="Comprehensive healthcare, delivered with genuine care."
            description="GV Polyclinic was founded on a simple idea: quality healthcare should be accessible, coordinated, and personal. Our mission is to deliver accurate diagnosis and compassionate treatment across every stage of life, while our vision is to become the region's most trusted name in outpatient care."
          />

          <ul className="flex flex-col gap-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 shrink-0 text-teal-500" />
                <span className="text-sm text-ink-700 sm:text-base">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-2 grid grid-cols-2 gap-4">
            {STATS.slice(2).map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
