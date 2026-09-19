import { FaGraduationCap, FaStethoscope, FaRegCalendarAlt } from "react-icons/fa";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { DOCTORS } from "../../data/doctors";

export default function Doctors() {
  return (
    <section id="doctors" className="section-pad bg-white">
      <div className="container-clinic flex flex-col gap-12">
        <SectionHeading
          eyebrow="Our Doctors"
          title="Meet the specialists behind your care"
          description="A multidisciplinary team of board-certified doctors, each dedicated to attentive, evidence-based treatment."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOCTORS.map((doctor, i) => (
            <Reveal key={doctor.id} delay={(i % 3) * 0.08} direction="up">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-primary-50 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-primary-50">
                  <img
                    src={doctor.image}
                    alt={`Portrait of ${doctor.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary-600 shadow-soft">
                    {doctor.specialization}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div>
                    <h3 className="text-lg font-bold text-ink-900">{doctor.name}</h3>
                    <p className="flex items-center gap-1.5 text-sm text-ink-500">
                      <FaGraduationCap className="text-teal-500" /> {doctor.qualification}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 text-sm text-ink-500">
                    <p className="flex items-center gap-1.5">
                      <FaStethoscope className="text-teal-500" /> {doctor.experience}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <FaRegCalendarAlt className="text-teal-500" /> {doctor.availability}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-3 pt-3">
                    <Button as="a" href="#appointment" variant="secondary" className="flex-1 !px-4 !py-2.5 text-xs">
                      View Profile
                    </Button>
                    <Button as="a" href="#appointment" variant="primary" className="flex-1 !px-4 !py-2.5 text-xs">
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
