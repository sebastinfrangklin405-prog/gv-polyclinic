import { FaUserMd, FaLayerGroup, FaHospitalAlt, FaCalendarCheck } from "react-icons/fa";
import Reveal from "../ui/Reveal";

const ITEMS = [
  {
    icon: FaUserMd,
    title: "Experienced Doctors",
    description: "Specialists averaging over a decade of clinical expertise.",
  },
  {
    icon: FaLayerGroup,
    title: "Multiple Specialties",
    description: "Ten+ departments coordinated under a single care plan.",
  },
  {
    icon: FaHospitalAlt,
    title: "Modern Facilities",
    description: "Advanced diagnostics and treatment infrastructure.",
  },
  {
    icon: FaCalendarCheck,
    title: "Easy Appointment Booking",
    description: "Reserve your visit online in under two minutes.",
  },
];

export default function QuickInfo() {
  return (
    <section className="relative -mt-10 sm:-mt-14 z-10">
      <div className="container-clinic">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08} direction="up">
              <div className="group card-surface flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink-900">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
