import { FaArrowRight } from "react-icons/fa";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { DEPARTMENTS } from "../../data/departments";

export default function Departments() {
  return (
    <section id="departments" className="section-pad bg-primary-50/40">
      <div className="container-clinic flex flex-col gap-12">
        <SectionHeading
          eyebrow="Departments"
          title="Specialized care across every stage of life"
          description="Explore our ten core departments, each staffed by dedicated specialists and equipped with modern diagnostic tools."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map(({ id, icon: Icon, name, description }, i) => (
            <Reveal key={id} delay={(i % 3) * 0.08} direction="up">
              <a
                href="#appointment"
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-primary-50 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg hover:ring-teal-200"
              >
                <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-teal-50 text-primary-600 transition-all duration-300 group-hover:from-primary-600 group-hover:to-teal-500 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <div className="relative flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-ink-900">{name}</h3>
                  <p className="text-sm leading-relaxed text-ink-500">{description}</p>
                </div>
                <span className="relative mt-1 inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
                  View Details
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
