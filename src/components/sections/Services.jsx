import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { SERVICES } from "../../data/services";

export default function Services() {
  return (
    <section id="services" className="section-pad bg-primary-50/40">
      <div className="container-clinic flex flex-col gap-12">
        <SectionHeading
          eyebrow="Medical Services"
          title="Everything you need for lasting health"
          description="From routine consultations to emergency support, our services are designed to cover your care from every angle."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.07} direction="up">
              <div className="group flex h-full items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-primary-50 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-all duration-300 group-hover:bg-teal-500 group-hover:text-white group-hover:rotate-6">
                  <Icon size={19} />
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
