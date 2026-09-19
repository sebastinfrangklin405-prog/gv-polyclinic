import { motion } from "framer-motion";
import { FaUserMd, FaClock, FaHospitalAlt, FaHeartbeat, FaStar, FaArrowRight, FaGoogle } from "react-icons/fa";
import Button from "../ui/Button";

const FLOATERS = [
  {
    icon: FaUserMd,
    title: "Experienced Doctors",
    subtitle: "50+ Specialists",
    className: "top-6 -left-4 sm:-left-8 animate-float",
    tone: "text-primary-600 bg-primary-50",
  },
  {
    icon: FaClock,
    title: "24/7 Support",
    subtitle: "Always available",
    className: "top-1/3 -right-4 sm:-right-8 animate-float-delay",
    tone: "text-teal-600 bg-teal-50",
  },
  {
    icon: FaHospitalAlt,
    title: "Modern Facilities",
    subtitle: "Advanced equipment",
    className: "bottom-24 -left-6 sm:-left-10 animate-float-slow",
    tone: "text-mint-500 bg-mint-50",
  },
  {
    icon: FaHeartbeat,
    title: "Patient-Centered Care",
    subtitle: "You always come first",
    className: "-bottom-6 right-2 sm:right-6 animate-float",
    tone: "text-amber-400 bg-amber-50/60",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-teal-100/50 blur-3xl" />
        <div className="absolute top-1/2 left-[-15%] h-[380px] w-[380px] rounded-full bg-primary-100/60 blur-3xl" />
        <div className="text-primary-900/[0.035] absolute inset-0 bg-dot-grid" />
      </div>

      <div className="container-clinic grid items-center gap-16 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-600 ring-1 ring-primary-100 shadow-soft">
            <span className="flex h-2 w-2 rounded-full bg-mint-500 animate-pulse-ring" />
            Now accepting new patients
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl md:text-6xl">
            <span className="block">GV Polyclinic</span>
            <span className="text-gradient block mt-1">Comprehensive Care.</span>
            <span className="block">Trusted Doctors.<br className="hidden sm:block" /> Better Health.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
            GV Polyclinic brings together experienced specialists, modern diagnostics, and
            genuine, patient-first care — all under one roof, so your family never has to
            look elsewhere.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="#appointment" variant="primary" className="text-base">
              Book an Appointment <FaArrowRight className="text-xs" />
            </Button>
            <Button as="a" href="#services" variant="secondary" className="text-base">
              Explore Our Services
            </Button>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-primary-50">
              <FaGoogle className="text-primary-600" size={18} />
            </span>
            <div className="text-sm">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-ink-900">5.0</span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} size={12} />
                  ))}
                </div>
              </div>
              <p className="font-semibold text-ink-700">6 Google Reviews</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-500 to-teal-500 shadow-soft-lg sm:max-w-md">
            <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
              <defs>
                <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#14609e" />
                  <stop offset="1" stopColor="#0fb3a0" />
                </linearGradient>
              </defs>
              <rect width="400" height="500" fill="url(#heroBg)" />
              <circle cx="330" cy="80" r="120" fill="#ffffff" opacity="0.06" />
              <circle cx="40" cy="440" r="150" fill="#ffffff" opacity="0.07" />
              <g opacity="0.95">
                <ellipse cx="200" cy="230" rx="88" ry="98" fill="#ffffff" opacity="0.12" />
                <circle cx="200" cy="165" r="46" fill="#ffe9d6" />
                <path d="M154 205c0-26 20-46 46-46s46 20 46 46v18c0 8-6 14-14 14h-64c-8 0-14-6-14-14v-18z" fill="#ffffff" />
                <path d="M150 300c6-34 30-52 50-52s44 18 50 52l10 90H140l10-90z" fill="#ffffff" />
                <path d="M150 300c6-34 30-52 50-52s44 18 50 52l6 54H144l6-54z" fill="#eaf3fb" />
              </g>
              <g stroke="#ffffff" strokeWidth="3" opacity="0.35">
                <path d="M40 420h50l10-30 12 60 10-40 8 20h40" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent" />
          </div>

          {FLOATERS.map(({ icon: Icon, title, subtitle, className, tone }) => (
            <div
              key={title}
              className={`absolute hidden sm:flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-soft-lg ring-1 ring-black/5 backdrop-blur ${className}`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                <Icon size={16} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-ink-900">{title}</p>
                <p className="text-xs text-ink-500">{subtitle}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
