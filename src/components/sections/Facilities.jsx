import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { FACILITIES } from "../../data/facilities";

export default function Facilities() {
  return (
    <section id="facilities" className="section-pad bg-primary-50/40">
      <div className="container-clinic flex flex-col gap-12">
        <SectionHeading
          eyebrow="Facilities"
          title="Built for comfort, equipped for care"
          description="Every corner of GV Polyclinic is designed with patients in mind, from consultation rooms to accessible pathways."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.07} direction="up">
              <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-primary-50 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
                <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-teal-50">
                  <Icon size={36} className="text-primary-500 transition-transform duration-500 group-hover:scale-110" />
                </div>
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
