import { FaCheck } from "react-icons/fa";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { FACILITIES } from "../../data/facilities";

/**
 * Presented as a spec sheet rather than a card grid.
 *
 * The previous version put a 36px icon inside a 128px-tall gradient box, which
 * reads as an image that failed to load. A plain, dense list is both more
 * honest with no photography available and easier to scan — this is reference
 * information, not a gallery.
 */
export default function Facilities() {
  return (
    <section
      id="facilities"
      aria-labelledby="facilities-heading"
      className="section-pad bg-white"
    >
      <div className="container-page flex flex-col gap-10">
        <SectionHeading
          id="facilities-heading"
          eyebrow="Facilities"
          title="What's inside the building"
          description="Everything below is on site, so a consultation, a test and a prescription do not mean three separate trips."
        />

        <Reveal>
          {/* The 1px grid gap over a tinted background draws every divider,
              so there is no nth-child arithmetic to get wrong when the number
              of facilities or columns changes. */}
          <ul className="grid gap-px overflow-hidden rounded-xl border border-ink-100 bg-ink-100 md:grid-cols-2">
            {FACILITIES.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="flex items-start gap-4 bg-white p-5 sm:p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon size={17} />
                </span>
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 text-base font-bold text-ink-900">
                    {title}
                    <FaCheck className="shrink-0 text-accent-600" size={11} />
                  </h3>
                  <p className="mt-1 text-sm text-ink-600">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
