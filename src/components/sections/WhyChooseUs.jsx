import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { WHY_CHOOSE_US } from "../../data/whyChooseUs";

export default function WhyChooseUs() {
  return (
    <section className="section-pad relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-teal-600">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid text-white/[0.06]" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[380px] w-[380px] rounded-full bg-white/5 blur-3xl" />

      <div className="container-clinic relative flex flex-col gap-12">
        <SectionHeading
          light
          eyebrow="Why Choose GV Polyclinic"
          title="Care that puts you first, every single visit"
          description="We combine clinical expertise with genuine hospitality, so every patient leaves feeling heard, informed, and cared for."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.07} direction="up">
              <div className="group flex h-full flex-col gap-4 rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/15">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white transition-all duration-300 group-hover:bg-white group-hover:text-primary-600">
                  <Icon size={19} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
